import { useEffect, useRef, useState } from "react";
import {
	fetchTransitSnapshot,
	mergeTransitSnapshots,
	SELECTED_TRANSIT_REFRESH_INTERVAL_MS,
	TRANSIT_REFRESH_INTERVAL_MS
} from "@/data/transit.ts";
import type TransitSnapshot from "@/types/transit/models/transitSnapshot.ts";

function getTransitErrorMessage(caughtError: unknown) {
	return caughtError instanceof Error ? caughtError.message : "Couldn't load Rutgers transit data.";
}

function getBoardRefreshSnapshot(
	currentSnapshot: TransitSnapshot | null,
	nextSnapshot: TransitSnapshot,
	selectedRouteId: string | null
) {
	if (!currentSnapshot) return nextSnapshot;

	const routeIdsToUpdate = new Set<string>();

	for (const route of nextSnapshot.routes) if (route.id !== selectedRouteId) routeIdsToUpdate.add(route.id);

	return mergeTransitSnapshots(currentSnapshot, nextSnapshot, routeIdsToUpdate, {
		updatedAt: nextSnapshot.updatedAt,
		alerts: nextSnapshot.alerts,
		systemStatus: nextSnapshot.systemStatus
	});
}

function getSelectedRouteRefreshSnapshot(
	currentSnapshot: TransitSnapshot | null,
	nextSnapshot: TransitSnapshot,
	selectedRouteId: string
) {
	return currentSnapshot
		? mergeTransitSnapshots(currentSnapshot, nextSnapshot, new Set([selectedRouteId]))
		: nextSnapshot;
}

export default function useTransitSnapshot(selectedRouteId: string | null) {
	const [snapshot, setSnapshot] = useState<TransitSnapshot | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isManualRefreshing, setIsManualRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [boardClockAnchorMs, setBoardClockAnchorMs] = useState<number | null>(null);
	const snapshotRef = useRef<TransitSnapshot | null>(null);
	const hasStartedBoardClockRef = useRef(false);
	const selectedRouteIdRef = useRef<string | null>(selectedRouteId);
	const boardRefreshVersionRef = useRef(0);
	const selectedRefreshVersionRef = useRef(0);

	const commitSnapshot = (nextSnapshot: TransitSnapshot) => {
		snapshotRef.current = nextSnapshot;
		setSnapshot(nextSnapshot);
	};

	useEffect(() => {
		selectedRouteIdRef.current = selectedRouteId;
	}, [selectedRouteId]);

	useEffect(() => {
		let isDisposed = false;
		const abortController = new AbortController();

		const loadSnapshot = async () => {
			try {
				const nextSnapshot = await fetchTransitSnapshot(abortController.signal);

				if (isDisposed) return;

				commitSnapshot(nextSnapshot);
				setError(null);

				if (!hasStartedBoardClockRef.current) {
					hasStartedBoardClockRef.current = true;
					setBoardClockAnchorMs(Date.now());
				}
			} catch (caughtError) {
				if (isDisposed || abortController.signal.aborted) return;

				setError(getTransitErrorMessage(caughtError));
			} finally {
				if (!isDisposed) setIsLoading(false);
			}
		};

		void loadSnapshot();

		return () => {
			isDisposed = true;
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		if (boardClockAnchorMs === null) return;

		const refreshBoardSnapshot = async () => {
			const requestVersion = boardRefreshVersionRef.current + 1;
			boardRefreshVersionRef.current = requestVersion;

			try {
				const nextSnapshot = await fetchTransitSnapshot();

				if (boardRefreshVersionRef.current !== requestVersion) return;

				const mergedSnapshot = getBoardRefreshSnapshot(
					snapshotRef.current,
					nextSnapshot,
					selectedRouteIdRef.current
				);
				commitSnapshot(mergedSnapshot);
				setError(null);
			} catch (caughtError) {
				setError(getTransitErrorMessage(caughtError));
			}
		};

		const refreshTimer = globalThis.setInterval(() => void refreshBoardSnapshot(), TRANSIT_REFRESH_INTERVAL_MS);

		return () => globalThis.clearInterval(refreshTimer);
	}, [boardClockAnchorMs]);

	useEffect(() => {
		if (boardClockAnchorMs === null || !selectedRouteId) return;

		const refreshSelectedRoute = async () => {
			const activeSelectedRouteId = selectedRouteIdRef.current;

			if (!activeSelectedRouteId) return;

			const requestVersion = selectedRefreshVersionRef.current + 1;
			selectedRefreshVersionRef.current = requestVersion;

			try {
				const nextSnapshot = await fetchTransitSnapshot();

				if (
					selectedRefreshVersionRef.current !== requestVersion ||
					selectedRouteIdRef.current !== activeSelectedRouteId
				)
					return;

				const mergedSnapshot = getSelectedRouteRefreshSnapshot(
					snapshotRef.current,
					nextSnapshot,
					activeSelectedRouteId
				);
				commitSnapshot(mergedSnapshot);
				setError(null);
			} catch (caughtError) {
				setError(getTransitErrorMessage(caughtError));
			}
		};

		const refreshTimer = globalThis.setInterval(
			() => void refreshSelectedRoute(),
			SELECTED_TRANSIT_REFRESH_INTERVAL_MS
		);

		return () => {
			selectedRefreshVersionRef.current += 1;
			globalThis.clearInterval(refreshTimer);
		};
	}, [boardClockAnchorMs, selectedRouteId]);

	const refreshNow = async () => {
		const requestVersion = boardRefreshVersionRef.current + 1;
		boardRefreshVersionRef.current = requestVersion;
		setIsManualRefreshing(true);

		try {
			const nextSnapshot = await fetchTransitSnapshot();

			if (boardRefreshVersionRef.current !== requestVersion) return;

			commitSnapshot(nextSnapshot);
			setError(null);
		} catch (caughtError) {
			setError(getTransitErrorMessage(caughtError));
		} finally {
			setIsManualRefreshing(false);
		}
	};

	return {
		snapshot,
		isLoading,
		isManualRefreshing,
		error,
		refreshNow
	};
}

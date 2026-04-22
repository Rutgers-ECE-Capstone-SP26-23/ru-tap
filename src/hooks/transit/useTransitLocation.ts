import { useEffect, useRef, useState } from "react";
import type TransitLocationState from "@/types/transit/pages/transitLocationState.ts";

const FINE_LOCATION_ACCURACY_THRESHOLD_METERS = 150;
const LOCATION_RESOLUTION_TIMEOUT_MS = 10_000;

function requestCurrentPosition(options: PositionOptions) {
	return new Promise<GeolocationPosition>((resolve, reject) => {
		if (!("geolocation" in navigator)) {
			reject(new Error("Geolocation is unavailable."));
			return;
		}

		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

export default function useTransitLocation(isMobileDevice: boolean) {
	const [locationState, setLocationState] = useState<TransitLocationState | null>(null);
	const [isResolvingLocation, setIsResolvingLocation] = useState(() => isMobileDevice);
	const hasRequestedLocationRef = useRef(false);

	useEffect(() => {
		if (!isMobileDevice || hasRequestedLocationRef.current) return;

		hasRequestedLocationRef.current = true;
		let isDisposed = false;
		const resolutionTimeoutId = globalThis.setTimeout(() => {
			if (isDisposed) return;

			setIsResolvingLocation(false);
			setLocationState(null);
		}, LOCATION_RESOLUTION_TIMEOUT_MS);

		const commitLocation = (position: GeolocationPosition, precision: TransitLocationState["precision"]) => {
			if (isDisposed) return;

			globalThis.clearTimeout(resolutionTimeoutId);
			setLocationState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				accuracy: position.coords.accuracy,
				precision
			});
			setIsResolvingLocation(false);
		};

		const requestLocation = async () => {
			try {
				const highAccuracyPosition = await requestCurrentPosition({
					enableHighAccuracy: true,
					maximumAge: 60_000,
					timeout: 8_000
				});
				const locationPrecision =
					highAccuracyPosition.coords.accuracy <= FINE_LOCATION_ACCURACY_THRESHOLD_METERS ? "fine" : "coarse";

				commitLocation(highAccuracyPosition, locationPrecision);
				return;
			} catch {
				try {
					const coarsePosition = await requestCurrentPosition({
						enableHighAccuracy: false,
						maximumAge: 300_000,
						timeout: 8_000
					});

					commitLocation(coarsePosition, "coarse");
				} catch {
					if (!isDisposed) {
						globalThis.clearTimeout(resolutionTimeoutId);
						setLocationState(null);
						setIsResolvingLocation(false);
					}
				}
			}
		};

		void requestLocation();

		return () => {
			isDisposed = true;
			globalThis.clearTimeout(resolutionTimeoutId);
			hasRequestedLocationRef.current = false;
		};
	}, [isMobileDevice]);

	return {
		locationState,
		isResolvingLocation
	};
}

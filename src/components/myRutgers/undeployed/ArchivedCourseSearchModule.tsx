import { startTransition, useEffect, useRef, useState } from "react";
import { loadAcademicCatalog } from "@/data/academics.ts";
import useMediaQuery from "@/hooks/useMediaQuery.ts";
import "@/styles/components/ArchivedCourseSearchModule.css";
import type AcademicCourse from "@/types/academics/models/academicCourse.ts";
import type AcademicCourseMeeting from "@/types/academics/models/academicCourseMeeting.ts";
import type AcademicCourseSection from "@/types/academics/models/academicCourseSection.ts";

// Undeployed archive of the earlier two-panel course-search browser.
type IndexedCourse = Readonly<{
	campuses: readonly string[];
	code: string;
	course: AcademicCourse;
	professorCount: number;
	searchText: string;
	sectionCount: number;
	summaryLine: string;
}>;

type CourseCatalogIndex = Readonly<{
	allCourses: readonly IndexedCourse[];
	campusOptions: readonly string[];
	coursesByCampus: Readonly<Record<string, readonly IndexedCourse[]>>;
}>;

type ScopedCourse = Readonly<{
	campuses: readonly string[];
	code: string;
	course: AcademicCourse;
	professorCount: number;
	sectionCount: number;
	sections: readonly AcademicCourseSection[];
	summaryLine: string;
}>;

const campusSortOrder = [
	"College Ave",
	"Busch",
	"Livingston",
	"Cook/Douglass",
	"Downtown NB",
	"Online",
	"Off Campus",
	"Study Abroad",
	"Campus TBA"
] as const;
const hiddenCampusOptions = new Set(["Campus TBA"]);
const STACKED_LAYOUT_QUERY = "(max-width: 1099px)";
const stringCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function getAcademicCourseCode(course: Pick<AcademicCourse, "dept" | "number" | "school">) {
	return `${course.school}:${course.dept}:${course.number}`;
}

function getUniqueStrings(values: readonly string[]) {
	return [...new Set(values.filter(value => value.trim() !== ""))];
}

function getCourseProfessors(course: AcademicCourse) {
	return getUniqueStrings(course.sections.flatMap(section => section.professors));
}

function getSectionProfessors(sections: readonly AcademicCourseSection[]) {
	return getUniqueStrings(sections.flatMap(section => section.professors));
}

function getCourseCampuses(course: AcademicCourse) {
	return getUniqueStrings(course.sections.flatMap(section => section.meetings.map(meeting => meeting.campus)));
}

function getSectionCampuses(sections: readonly AcademicCourseSection[]) {
	return getUniqueStrings(sections.flatMap(section => section.meetings.map(meeting => meeting.campus)));
}

function formatCampusName(campus: string) {
	return campus;
}

function sortCampusNames(leftCampus: string, rightCampus: string) {
	const leftIndex = campusSortOrder.indexOf(leftCampus as (typeof campusSortOrder)[number]);
	const rightIndex = campusSortOrder.indexOf(rightCampus as (typeof campusSortOrder)[number]);

	if (leftIndex === -1 && rightIndex === -1) {
		return stringCollator.compare(leftCampus, rightCampus);
	}

	if (leftIndex === -1) {
		return 1;
	}

	if (rightIndex === -1) {
		return -1;
	}

	return leftIndex - rightIndex;
}

function formatMilitaryTime(time: string) {
	if (!/^\d{4}$/.test(time)) {
		return null;
	}

	const hours = Number(time.slice(0, 2));
	const minutes = time.slice(2);
	const date = new Date(Date.UTC(2026, 0, 1, hours, Number(minutes)));

	return new Intl.DateTimeFormat(undefined, {
		hour: "numeric",
		minute: "2-digit",
		timeZone: "UTC"
	}).format(date);
}

function formatMeetingDay(day: string) {
	switch (day) {
		case "M":
			return "Mon";
		case "T":
			return "Tue";
		case "W":
			return "Wed";
		case "H":
			return "Thu";
		case "F":
			return "Fri";
		case "S":
			return "Sat";
		case "U":
			return "Sun";
		case "":
			return "Day TBA";
		default:
			return day;
	}
}

function formatMeetingWindow(meeting: AcademicCourseMeeting) {
	const start = formatMilitaryTime(meeting.start);
	const end = formatMilitaryTime(meeting.end);

	if (start && end) {
		return `${formatMeetingDay(meeting.day)} · ${start}–${end}`;
	}

	if (start) {
		return `${formatMeetingDay(meeting.day)} · ${start}`;
	}

	if (meeting.day.trim() !== "") {
		return `${formatMeetingDay(meeting.day)} · Time TBA`;
	}

	return "Time TBA";
}

function formatMeetingLocation(meeting: AcademicCourseMeeting) {
	const roomLabel = [meeting.building, meeting.room].filter(part => part.trim() !== "").join(" ");

	if (meeting.campus === "Campus TBA") {
		return roomLabel === "" ? "Location TBA" : roomLabel;
	}

	if (roomLabel !== "" && meeting.campus.trim() !== "") {
		return `${formatCampusName(meeting.campus)} · ${roomLabel}`;
	}

	if (meeting.campus.trim() !== "") {
		return formatCampusName(meeting.campus);
	}

	if (roomLabel !== "") {
		return roomLabel;
	}

	return "Location TBA";
}

function getCourseSummaryLine(sectionCount: number, professorCount: number, campuses: readonly string[]) {
	const visibleCampuses = campuses.filter(campus => !hiddenCampusOptions.has(campus)).sort(sortCampusNames);

	return [
		`${sectionCount} ${sectionCount === 1 ? "section" : "sections"}`,
		`${professorCount} ${professorCount === 1 ? "instructor" : "instructors"}`,
		visibleCampuses.slice(0, 2).join(" · ")
	]
		.filter(part => part !== "")
		.join(" · ");
}

function createCourseSearchText(course: AcademicCourse, code: string, campuses: readonly string[]) {
	return [
		code,
		course.name,
		course.school,
		course.dept,
		course.number,
		...campuses,
		...course.sections.flatMap(section => [
			section.id,
			section.index,
			section.openTo ?? "",
			section.eligibility ?? "",
			section.notes ?? "",
			section.comments ?? "",
			...section.professors,
			...section.meetings.flatMap(meeting => [
				meeting.campus,
				meeting.building,
				meeting.room,
				meeting.mode,
				meeting.modeCode
			]),
			...(section.crossListings ?? []).flatMap(crossListing => [
				crossListing.dept,
				crossListing.number,
				crossListing.section,
				crossListing.index
			])
		])
	]
		.join(" ")
		.toLowerCase();
}

function getIndexedCourse(course: AcademicCourse): IndexedCourse {
	const code = getAcademicCourseCode(course);
	const campuses = getCourseCampuses(course);
	const professorCount = getCourseProfessors(course).length;

	return {
		campuses,
		code,
		course,
		professorCount,
		searchText: createCourseSearchText(course, code, campuses),
		sectionCount: course.sections.length,
		summaryLine: getCourseSummaryLine(course.sections.length, professorCount, campuses)
	};
}

function createCourseCatalogIndex(courses: readonly AcademicCourse[]): CourseCatalogIndex {
	const allCourses = courses.map(getIndexedCourse).sort(sortCourses);
	const coursesByCampus = new Map<string, IndexedCourse[]>();

	for (const course of allCourses) {
		for (const campus of course.campuses) {
			const campusCourses = coursesByCampus.get(campus);

			if (campusCourses) {
				campusCourses.push(course);
				continue;
			}

			coursesByCampus.set(campus, [course]);
		}
	}

	return {
		allCourses,
		campusOptions: [...coursesByCampus.keys()]
			.filter(campus => !hiddenCampusOptions.has(campus))
			.sort(sortCampusNames),
		coursesByCampus: Object.fromEntries(coursesByCampus)
	};
}

function matchesCourseQuery(indexedCourse: IndexedCourse, normalizedQueryTokens: readonly string[]) {
	if (normalizedQueryTokens.length === 0) {
		return true;
	}

	return normalizedQueryTokens.every(queryToken => indexedCourse.searchText.includes(queryToken));
}

function getSectionsForSelectedCampus(indexedCourse: IndexedCourse, selectedCampus: string | null) {
	if (selectedCampus === null) {
		return indexedCourse.course.sections;
	}

	return indexedCourse.course.sections.filter(section =>
		section.meetings.some(meeting => meeting.campus === selectedCampus)
	);
}

function getScopedCourse(indexedCourse: IndexedCourse, selectedCampus: string | null): ScopedCourse {
	const sections = getSectionsForSelectedCampus(indexedCourse, selectedCampus);
	const campuses = getSectionCampuses(sections);
	const professorCount = getSectionProfessors(sections).length;

	return {
		campuses,
		code: indexedCourse.code,
		course: indexedCourse.course,
		professorCount,
		sectionCount: sections.length,
		sections,
		summaryLine: getCourseSummaryLine(sections.length, professorCount, campuses)
	};
}

function sortCourses(leftCourse: IndexedCourse, rightCourse: IndexedCourse) {
	const codeComparison = stringCollator.compare(leftCourse.code, rightCourse.code);

	return codeComparison === 0
		? stringCollator.compare(leftCourse.course.name, rightCourse.course.name)
		: codeComparison;
}

export default function ArchivedCourseSearchModule() {
	const [catalogIndex, setCatalogIndex] = useState<CourseCatalogIndex>({
		allCourses: [],
		campusOptions: [],
		coursesByCampus: {}
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [loadAttempt, setLoadAttempt] = useState(0);
	const isStackedLayout = useMediaQuery(STACKED_LAYOUT_QUERY);
	const detailsRef = useRef<HTMLElement | null>(null);
	const resultsScrollRef = useRef<HTMLDivElement | null>(null);
	const shouldScrollToDetailsRef = useRef(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
	const [selectedCourseCode, setSelectedCourseCode] = useState<string | null>(null);
	const normalizedQueryTokens = searchQuery
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter(token => token !== "");
	const campusScopedCourses =
		selectedCampus === null ? catalogIndex.allCourses : (catalogIndex.coursesByCampus[selectedCampus] ?? []);
	const sortedCourses =
		normalizedQueryTokens.length === 0
			? campusScopedCourses
			: campusScopedCourses.filter(indexedCourse => matchesCourseQuery(indexedCourse, normalizedQueryTokens));
	const scopedCourses = sortedCourses
		.map(indexedCourse => getScopedCourse(indexedCourse, selectedCampus))
		.filter(course => course.sectionCount > 0);
	const selectedCourse = scopedCourses.find(course => course.code === selectedCourseCode) ?? null;
	const activeCourse = selectedCourse ?? scopedCourses[0] ?? null;
	const visibleSectionCount = scopedCourses.reduce(
		(totalSections, indexedCourse) => totalSections + indexedCourse.sectionCount,
		0
	);

	useEffect(() => {
		let isCancelled = false;

		loadAcademicCatalog()
			.then(nextCatalog => {
				if (isCancelled) {
					return;
				}

				setCatalogIndex(createCourseCatalogIndex(nextCatalog.courses));
			})
			.catch(error => {
				if (isCancelled) {
					return;
				}

				setErrorMessage(
					error instanceof Error ? error.message : "Unable to load the condensed course catalog."
				);
			})
			.finally(() => {
				if (!isCancelled) {
					setIsLoading(false);
				}
			});

		return () => {
			isCancelled = true;
		};
	}, [loadAttempt]);

	useEffect(() => {
		if (scopedCourses.length === 0) {
			if (selectedCourseCode !== null) {
				startTransition(() => {
					setSelectedCourseCode(null);
				});
			}

			return;
		}

		if (selectedCourseCode !== null && scopedCourses.some(course => course.code === selectedCourseCode)) {
			return;
		}

		startTransition(() => {
			setSelectedCourseCode(scopedCourses[0].code);
		});
	}, [scopedCourses, selectedCourseCode]);

	useEffect(() => {
		if (resultsScrollRef.current !== null) {
			resultsScrollRef.current.scrollTop = 0;
		}
	}, [searchQuery, selectedCampus]);

	useEffect(() => {
		if (!isStackedLayout) {
			shouldScrollToDetailsRef.current = false;
			return;
		}

		if (!activeCourse || !shouldScrollToDetailsRef.current) {
			return;
		}

		shouldScrollToDetailsRef.current = false;
		const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const animationFrameId = globalThis.requestAnimationFrame(() => {
			const detailsTop = detailsRef.current?.getBoundingClientRect().top;

			if (detailsTop === undefined) {
				return;
			}

			globalThis.scrollTo({
				top: Math.max(0, globalThis.scrollY + detailsTop - 16),
				behavior: prefersReducedMotion ? "auto" : "smooth"
			});
		});

		return () => globalThis.cancelAnimationFrame(animationFrameId);
	}, [activeCourse, isStackedLayout]);

	if (isLoading) {
		return (
			<div className="course-search-module course-search-status-view" role="status" aria-live="polite">
				<p className="course-search-card-label">Course search</p>
				<h3>Loading course search.</h3>
				<p>Bringing the Rutgers catalog into this workspace.</p>
			</div>
		);
	}

	if (errorMessage) {
		return (
			<div className="course-search-module course-search-status-view" role="alert">
				<p className="course-search-card-label">Course search</p>
				<h3>Course search is unavailable right now.</h3>
				<p>{errorMessage}</p>
				<button
					type="button"
					className="course-search-clear-button"
					onClick={() => {
						setIsLoading(true);
						setErrorMessage(null);
						setLoadAttempt(value => value + 1);
					}}>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className="course-search-module">
			<div className="course-search-layout">
				<section className="course-search-directory" aria-label="Course search results">
					<div className="course-search-panel-head">
						<div>
							<p className="course-search-card-label">Course search</p>
							<h3>Find a course</h3>
						</div>
						<div className="course-search-results-meta" aria-live="polite">
							<strong>{scopedCourses.length}</strong>
							<span>matches</span>
						</div>
					</div>

					<div className="course-search-search-bar">
						<label className="course-search-search-label" htmlFor="course-search-input">
							Search the catalog
						</label>
						<input
							id="course-search-input"
							className="course-search-search-input"
							type="search"
							placeholder="Try 01:198:111, calculus, Murray Hall, 15934, or an instructor"
							value={searchQuery}
							onChange={event => setSearchQuery(event.target.value)}
						/>
					</div>

					<div className="course-search-campus-filter" aria-label="Meeting campus filter">
						<button
							type="button"
							className={
								selectedCampus === null
									? "course-search-campus-chip selected"
									: "course-search-campus-chip"
							}
							onClick={() => setSelectedCampus(null)}>
							All campuses
						</button>
						{catalogIndex.campusOptions.map(campus => (
							<button
								key={campus}
								type="button"
								className={
									selectedCampus === campus
										? "course-search-campus-chip selected"
										: "course-search-campus-chip"
								}
								onClick={() => setSelectedCampus(campus)}>
								{formatCampusName(campus)}
							</button>
						))}
					</div>

					<div ref={resultsScrollRef} className="course-search-results-scroll">
						{scopedCourses.length === 0 ? (
							<div className="course-search-empty-state">
								<h3>No matches yet.</h3>
								<p>Try a broader search, switch campuses, or clear the current filters.</p>
								<button
									type="button"
									className="course-search-clear-button"
									onClick={() => {
										setSearchQuery("");
										setSelectedCampus(null);
									}}>
									Clear filters
								</button>
							</div>
						) : (
							scopedCourses.map(course => {
								const courseCode = course.code;

								return (
									<button
										key={courseCode}
										type="button"
										className={
											activeCourse?.code === courseCode
												? "course-search-result-card selected"
												: "course-search-result-card"
										}
										onClick={() => {
											shouldScrollToDetailsRef.current = isStackedLayout;
											setSelectedCourseCode(courseCode);
										}}>
										<div className="course-search-result-head">
											<p className="course-search-result-code">{courseCode}</p>
											{course.course.prereqs ? (
												<span className="course-search-result-badge">Prereqs</span>
											) : null}
										</div>
										<h4>{course.course.name}</h4>
										<p className="course-search-result-meta-line">{course.summaryLine}</p>
									</button>
								);
							})
						)}
					</div>
				</section>

				<aside ref={detailsRef} className="course-search-details" aria-label="Selected course details">
					{activeCourse ? (
						<>
							<div className="course-search-panel-head">
								<div>
									<p className="course-search-card-label">Selected course</p>
									<h3>{activeCourse.course.name}</h3>
									<p className="course-search-details-code">{activeCourse.code}</p>
								</div>
								<div className="course-search-results-meta">
									<strong>{activeCourse.sectionCount}</strong>
									<span>{activeCourse.sectionCount === 1 ? "section" : "sections"}</span>
								</div>
							</div>

							<div className="course-search-details-stack">
								<section className="course-search-detail-card">
									<h4>Overview</h4>
									<ul className="course-search-stat-list">
										<li>School code {activeCourse.course.school}</li>
										<li>Department code {activeCourse.course.dept}</li>
										<li>Course number {activeCourse.course.number}</li>
										<li>{activeCourse.professorCount} instructors in view</li>
										<li>
											{activeCourse.campuses
												.filter(campus => !hiddenCampusOptions.has(campus))
												.sort(sortCampusNames)
												.map(formatCampusName)
												.join(" · ") || "Campus TBA"}
										</li>
										<li>{visibleSectionCount} sections in the current list</li>
									</ul>
								</section>

								{activeCourse.course.prereqs ? (
									<section className="course-search-detail-card">
										<h4>Prerequisites</h4>
										<p>{activeCourse.course.prereqs}</p>
									</section>
								) : null}

								<section className="course-search-detail-card">
									<h4>Sections</h4>
									<div className="course-search-section-list">
										{activeCourse.sections.map(section => (
											<article
												key={`${activeCourse.code}-${section.index}`}
												className="course-search-section-card">
												<div className="course-search-section-head">
													<div>
														<p className="course-search-section-eyebrow">
															Section {section.id}
														</p>
														<h5>Index {section.index}</h5>
													</div>
													<span className="course-search-section-chip">
														{section.professors.length === 0
															? "Instructor TBA"
															: section.professors.length === 1
																? "1 instructor"
																: `${section.professors.length} instructors`}
													</span>
												</div>

												{section.professors.length > 0 ? (
													<p className="course-search-section-professors">
														{section.professors.join(" · ")}
													</p>
												) : null}

												<div className="course-search-meeting-list">
													{section.meetings.map((meeting, index) => (
														<div
															key={`${section.index}-${meeting.day}-${meeting.start}-${meeting.room}-${index}`}
															className="course-search-meeting-row">
															<div>
																<p className="course-search-meeting-window">
																	{formatMeetingWindow(meeting)}
																</p>
																<p className="course-search-meeting-location">
																	{formatMeetingLocation(meeting)}
																</p>
															</div>
															<span className="course-search-meeting-mode">
																{meeting.mode.trim() === "" ? "Mode TBA" : meeting.mode}
															</span>
														</div>
													))}
												</div>

												{section.crossListings?.length ? (
													<p className="course-search-section-note">
														Cross-listed as{" "}
														{section.crossListings
															.map(
																crossListing =>
																	`${crossListing.dept}:${crossListing.number}:${crossListing.section} (${crossListing.index})`
															)
															.join(" · ")}
													</p>
												) : null}
												{section.openTo ? (
													<p className="course-search-section-note">
														<strong>Open to:</strong> {section.openTo}
													</p>
												) : null}
												{section.eligibility ? (
													<p className="course-search-section-note">
														<strong>Eligibility:</strong> {section.eligibility}
													</p>
												) : null}
												{section.notes ? (
													<p className="course-search-section-note">
														<strong>Notes:</strong> {section.notes}
													</p>
												) : null}
												{section.comments ? (
													<p className="course-search-section-note">
														<strong>Comments:</strong> {section.comments}
													</p>
												) : null}
											</article>
										))}
									</div>
								</section>
							</div>
						</>
					) : (
						<div className="course-search-empty-state">
							<h3>Pick a course to see its sections.</h3>
							<p>The first result in the current list will appear here automatically.</p>
						</div>
					)}
				</aside>
			</div>
		</div>
	);
}

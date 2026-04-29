import { useEffect, useState } from "react";
import { loadAcademicCatalog } from "@/data/academics.ts";
import "@/styles/components/CourseSearchModule.css";
import type AcademicCourse from "@/types/academics/models/academicCourse.ts";
import type AcademicCourseMeeting from "@/types/academics/models/academicCourseMeeting.ts";

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
}>;

type CourseSearchResultsParams = Readonly<{
	activeCourse: IndexedCourse | null;
	hasQuery: boolean;
	matchedCourses: readonly IndexedCourse[];
	matchedSectionCount: number;
	onClearSearch: () => void;
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
const stringCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const courseSearchTimeZone = "America/New_York";
const courseSearchTimeFormatter = new Intl.DateTimeFormat(undefined, {
	hour: "numeric",
	minute: "2-digit",
	timeZone: courseSearchTimeZone
});
const courseSearchTimePartsFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "2-digit",
	hourCycle: "h23",
	minute: "2-digit",
	timeZone: courseSearchTimeZone
});

/**
 * Builds the canonical course code displayed and indexed by search.
 */
function getAcademicCourseCode(course: Pick<AcademicCourse, "dept" | "number" | "school">) {
	return `${course.school}:${course.dept}:${course.number}`;
}

/**
 * Removes empty and duplicate values while preserving first-seen order.
 */
function getUniqueStrings(values: readonly string[]) {
	return [...new Set(values.filter(value => value.trim() !== ""))];
}

/**
 * Collects every unique professor listed on a course's sections.
 */
function getCourseProfessors(course: AcademicCourse) {
	return getUniqueStrings(course.sections.flatMap(section => section.professors));
}

/**
 * Collects every unique campus represented by a course's meetings.
 */
function getCourseCampuses(course: AcademicCourse) {
	return getUniqueStrings(course.sections.flatMap(section => section.meetings.map(meeting => meeting.campus)));
}

/**
 * Sorts campus labels in Rutgers-facing order, with unknown labels last.
 */
function sortCampusNames(firstCampus: string, secondCampus: string) {
	const firstIndex = campusSortOrder.indexOf(firstCampus as (typeof campusSortOrder)[number]);
	const secondIndex = campusSortOrder.indexOf(secondCampus as (typeof campusSortOrder)[number]);
	const fallbackIndex = campusSortOrder.length;
	const firstOrder = firstIndex === -1 ? fallbackIndex : firstIndex;
	const secondOrder = secondIndex === -1 ? fallbackIndex : secondIndex;

	return firstOrder === secondOrder ? stringCollator.compare(firstCampus, secondCampus) : firstOrder - secondOrder;
}

/**
 * Normalizes a campus label for display.
 */
function formatCampusName(campus: string) {
	return campus;
}

/**
 * Builds the compact campus summary shown in cards and search results.
 */
function formatCampusSummary(campuses: readonly string[]) {
	const visibleCampuses = campuses.filter(campus => !hiddenCampusOptions.has(campus)).sort(sortCampusNames);

	return visibleCampuses.length > 0 ? visibleCampuses.map(formatCampusName).join(" · ") : "Campus TBA";
}

/**
 * Converts Rutgers SOC military-time strings into Eastern local display time.
 */
function formatMilitaryTime(time: string) {
	if (!/^\d{4}$/.test(time)) {
		return null;
	}

	const hours = Number(time.slice(0, 2));
	const minutes = Number(time.slice(2));
	const targetDate = Date.UTC(2026, 8, 1, hours, minutes);
	const easternDateParts = courseSearchTimePartsFormatter.formatToParts(new Date(targetDate));
	const easternHours = Number(easternDateParts.find(part => part.type === "hour")?.value ?? "0");
	const easternMinutes = Number(easternDateParts.find(part => part.type === "minute")?.value ?? "0");
	const timezoneOffsetMs = targetDate - Date.UTC(2026, 8, 1, easternHours, easternMinutes);
	const date = new Date(targetDate + timezoneOffsetMs);

	return courseSearchTimeFormatter.format(date);
}

/**
 * Expands SOC one-letter meeting-day codes into short weekday labels.
 */
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

/**
 * Formats one meeting's day and time range, preserving TBA states.
 */
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

/**
 * Formats the campus, building, and room information for one meeting.
 */
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

/**
 * Builds the short course summary line used in result metadata.
 */
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

/**
 * Creates a denormalized lowercase search blob from course, section, meeting, and cross-listing data.
 */
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

/**
 * Converts one raw academic course into the enriched record used by search and rendering.
 */
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

/**
 * Builds the in-memory course index after catalog load.
 */
function createCourseCatalogIndex(courses: readonly AcademicCourse[]): CourseCatalogIndex {
	return {
		allCourses: courses.map(getIndexedCourse).sort(sortCourses)
	};
}

/**
 * Checks whether every query token appears in a course's denormalized search text.
 */
function matchesCourseQuery(indexedCourse: IndexedCourse, normalizedQueryTokens: readonly string[]) {
	if (normalizedQueryTokens.length === 0) {
		return false;
	}

	return normalizedQueryTokens.every(queryToken => indexedCourse.searchText.includes(queryToken));
}

/**
 * Sorts indexed courses by code, then by name for duplicate-code stability.
 */
function sortCourses(leftCourse: IndexedCourse, rightCourse: IndexedCourse) {
	const codeComparison = stringCollator.compare(leftCourse.code, rightCourse.code);

	return codeComparison === 0
		? stringCollator.compare(leftCourse.course.name, rightCourse.course.name)
		: codeComparison;
}

/**
 * Chooses the result-count noun shown beside the search controls.
 */
function getCourseResultCountLabel(hasQuery: boolean, matchedCourseCount: number) {
	if (!hasQuery) return "courses indexed";
	return matchedCourseCount === 1 ? "match" : "matches";
}

/**
 * Builds the helper line that explains whether the active result is one of many.
 */
function getCourseResultMetaLine(matchedCourseCount: number) {
	if (matchedCourseCount === 1) return "1 course matched your search.";
	return `Showing the first of ${matchedCourseCount} matching courses. Refine the query to narrow the result.`;
}

/**
 * Formats the section instructor count chip.
 */
function getSectionInstructorLabel(instructorCount: number) {
	if (instructorCount === 0) return "Instructor TBA";
	if (instructorCount === 1) return "1 instructor";
	return `${instructorCount} instructors`;
}

/**
 * Renders optional notes attached to a course section.
 */
function renderCourseSectionNotes(section: AcademicCourse["sections"][number]) {
	return (
		<>
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
		</>
	);
}

/**
 * Renders one course section with its meetings and registration metadata.
 */
function renderCourseSection(activeCourse: IndexedCourse, section: AcademicCourse["sections"][number]) {
	return (
		<article key={`${activeCourse.code}-${section.index}`} className="course-search-section-card">
			<div className="course-search-section-head">
				<div>
					<p className="course-search-section-eyebrow">Section {section.id}</p>
					<h5>Index {section.index}</h5>
				</div>
				<span className="course-search-section-chip">
					{getSectionInstructorLabel(section.professors.length)}
				</span>
			</div>

			{section.professors.length > 0 ? (
				<p className="course-search-section-professors">{section.professors.join(" · ")}</p>
			) : null}

			<div className="course-search-meeting-list">
				{section.meetings.map((meeting, index) => (
					<div
						key={`${section.index}-${meeting.day}-${meeting.start}-${meeting.room}-${index}`}
						className="course-search-meeting-row">
						<div>
							<p className="course-search-meeting-window">{formatMeetingWindow(meeting)}</p>
							<p className="course-search-meeting-location">{formatMeetingLocation(meeting)}</p>
						</div>
						<span className="course-search-meeting-mode">
							{meeting.mode.trim() === "" ? "Mode TBA" : meeting.mode}
						</span>
					</div>
				))}
			</div>

			{renderCourseSectionNotes(section)}
		</article>
	);
}

/**
 * Renders the search-result body for empty, no-match, and active-course states.
 */
function renderCourseSearchResults({
	activeCourse,
	hasQuery,
	matchedCourses,
	matchedSectionCount,
	onClearSearch
}: CourseSearchResultsParams) {
	if (!hasQuery)
		return (
			<div className="course-search-empty-state">
				<h3>Start with a search.</h3>
				<p>Search by course code, title, instructor, or location to pull up the course details you need.</p>
			</div>
		);

	if (!activeCourse)
		return (
			<div className="course-search-empty-state">
				<h3>No matches yet.</h3>
				<p>Refine the query to surface a course information panel from the catalog snapshot.</p>
				<button type="button" className="course-search-clear-button" onClick={onClearSearch}>
					Clear search
				</button>
			</div>
		);

	return (
		<div className="course-search-results-stack">
			<section className="course-search-detail-card">
				<p className="course-search-section-eyebrow">Search results</p>
				<h4>{activeCourse.course.name}</h4>
				<p className="course-search-details-code">{activeCourse.code}</p>
				<p className="course-search-result-meta-line">{getCourseResultMetaLine(matchedCourses.length)}</p>
				<ul className="course-search-stat-list">
					<li>{activeCourse.summaryLine}</li>
					<li>School code {activeCourse.course.school}</li>
					<li>Department code {activeCourse.course.dept}</li>
					<li>Course number {activeCourse.course.number}</li>
					<li>{formatCampusSummary(activeCourse.campuses)}</li>
					<li>{matchedSectionCount} sections across the current search results</li>
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
					{activeCourse.course.sections.map(section => renderCourseSection(activeCourse, section))}
				</div>
			</section>
		</div>
	);
}

/**
 * Search-driven Rutgers catalog preview module for the myRutgers workspace.
 */
export default function CourseSearchModule() {
	const [catalogIndex, setCatalogIndex] = useState<CourseCatalogIndex>({
		allCourses: []
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const normalizedQueryTokens = searchQuery
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter(token => token !== "");
	const hasQuery = normalizedQueryTokens.length > 0;
	const matchedCourses = hasQuery
		? catalogIndex.allCourses.filter(indexedCourse => matchesCourseQuery(indexedCourse, normalizedQueryTokens))
		: [];
	const activeCourse = matchedCourses[0] ?? null;
	const matchedSectionCount = matchedCourses.reduce(
		(totalSections, indexedCourse) => totalSections + indexedCourse.sectionCount,
		0
	);
	const resultCount = hasQuery ? matchedCourses.length : catalogIndex.allCourses.length;
	const resultCountLabel = getCourseResultCountLabel(hasQuery, matchedCourses.length);

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
			<section className="course-search-panel" aria-label="Course search results information">
				<div className="course-search-panel-head">
					<div>
						<p className="course-search-card-label">Course search</p>
						<h3>Find a course</h3>
						<p className="course-search-panel-copy">
							Search by course code, title, professor, building, room, or section index. The first
							matching course surfaces below as the active result.
						</p>
					</div>
					<div className="course-search-results-meta" aria-live="polite">
						<strong>{resultCount}</strong>
						<span>{resultCountLabel}</span>
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

				{renderCourseSearchResults({
					activeCourse,
					hasQuery,
					matchedCourses,
					matchedSectionCount,
					onClearSearch: () => setSearchQuery("")
				})}
			</section>
		</div>
	);
}

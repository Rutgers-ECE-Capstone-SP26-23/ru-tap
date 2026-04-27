import { useState } from "react";
import { academicCalendarEvents, academicCalendarSourceUrl, academicCalendarYears } from "@/data/academicCalendar.ts";
import "@/styles/components/AcademicCalendarModule.css";
import type AcademicCalendarEvent from "@/types/academics/models/academicCalendarEvent.ts";
import type AcademicCalendarYear from "@/types/academics/models/academicCalendarYear.ts";

type CalendarYearFilter = AcademicCalendarYear | "all";

const sectionLabels = {
	fall: "Fall",
	winter: "Winter",
	spring: "Spring",
	summer: "Summer"
} as const satisfies Record<AcademicCalendarEvent["section"], string>;

function getAcademicCalendarSearchText(event: AcademicCalendarEvent) {
	return [
		event.event,
		event.note ?? "",
		sectionLabels[event.section],
		...academicCalendarYears.flatMap(year => [year, ...event.datesByYear[year]])
	]
		.join(" ")
		.toLowerCase();
}

function matchesSearchQuery(event: AcademicCalendarEvent, normalizedSearchTokens: readonly string[]) {
	if (normalizedSearchTokens.length === 0) {
		return true;
	}

	const searchText = getAcademicCalendarSearchText(event);

	return normalizedSearchTokens.every(token => searchText.includes(token));
}

function getVisibleYears(selectedYear: CalendarYearFilter) {
	return selectedYear === "all" ? academicCalendarYears : [selectedYear];
}

function formatYearFilterLabel(year: CalendarYearFilter) {
	return year === "all" ? "All years" : year;
}

export default function AcademicCalendarModule() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedYear, setSelectedYear] = useState<CalendarYearFilter>("all");
	const normalizedSearchTokens = searchQuery
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter(token => token !== "");
	const visibleYears = getVisibleYears(selectedYear);
	const visibleEvents = academicCalendarEvents.filter(event => matchesSearchQuery(event, normalizedSearchTokens));

	return (
		<div className="academic-calendar-module">
			<section className="academic-calendar-panel" aria-label="Academic calendar">
				<div className="academic-calendar-panel-head">
					<div>
						<p className="academic-calendar-card-label">Academic calendar</p>
						<h3>University dates</h3>
						<p className="academic-calendar-panel-copy">
							Reference semester starts, recesses, reading days, exams, commencement, and intersessions
							from the Rutgers academic calendar. Some school calendars may differ.
						</p>
					</div>
					<div className="academic-calendar-results-meta" aria-live="polite">
						<strong>{visibleEvents.length}</strong>
						<span>{visibleEvents.length === 1 ? "event" : "events"}</span>
					</div>
				</div>

				<div className="academic-calendar-controls">
					<div className="academic-calendar-search-bar">
						<label className="academic-calendar-search-label" htmlFor="academic-calendar-search-input">
							Search dates
						</label>
						<input
							id="academic-calendar-search-input"
							className="academic-calendar-search-input"
							type="search"
							placeholder="Try spring recess, exams, commencement, or September"
							value={searchQuery}
							onChange={event => setSearchQuery(event.target.value)}
						/>
					</div>

					<div className="academic-calendar-year-filter" aria-label="Academic year filter">
						{(["all", ...academicCalendarYears] as const).map(year => (
							<button
								key={year}
								type="button"
								className={
									selectedYear === year
										? "academic-calendar-year-chip selected"
										: "academic-calendar-year-chip"
								}
								onClick={() => setSelectedYear(year)}>
								{formatYearFilterLabel(year)}
							</button>
						))}
					</div>
				</div>

				{visibleEvents.length > 0 ? (
					<div className="academic-calendar-table-wrap">
						<table className="academic-calendar-table">
							<thead>
								<tr>
									<th scope="col">Event</th>
									{visibleYears.map(year => (
										<th key={year} scope="col">
											{year}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{visibleEvents.map((event, index) => {
									const previousEvent = visibleEvents[index - 1];
									const startsSection =
										previousEvent === undefined || previousEvent.section !== event.section;

									return (
										<tr
											key={`${event.section}-${event.event}`}
											className={startsSection ? "academic-calendar-section-start" : undefined}>
											<th scope="row">
												<span className="academic-calendar-section-label">
													{sectionLabels[event.section]}
												</span>
												<span className="academic-calendar-event-name">{event.event}</span>
												{event.note ? (
													<span className="academic-calendar-event-note">{event.note}</span>
												) : null}
											</th>
											{visibleYears.map(year => {
												const dates = event.datesByYear[year];

												return (
													<td key={year}>
														{dates.length > 0 ? (
															dates.map(date => <span key={date}>{date}</span>)
														) : (
															<span className="academic-calendar-date-tba">TBA</span>
														)}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<div className="academic-calendar-empty-state">
						<h3>No calendar matches.</h3>
						<p>Clear the search or switch years to restore the Rutgers academic calendar list.</p>
						<button
							type="button"
							className="academic-calendar-clear-button"
							onClick={() => {
								setSearchQuery("");
								setSelectedYear("all");
							}}>
							Clear filters
						</button>
					</div>
				)}

				<a
					className="academic-calendar-source-link"
					href={academicCalendarSourceUrl}
					target="_blank"
					rel="noreferrer noopener">
					Open Rutgers calendar source
				</a>
			</section>
		</div>
	);
}

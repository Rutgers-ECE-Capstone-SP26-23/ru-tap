import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const DEFAULT_YEAR = "2026";
const DEFAULT_TERM = "9";
const DEFAULT_CAMPUS = "NB";
const DATASET_VERSION = 1;
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");

function showHelp() {
	console.log(`Build a condensed Rutgers SOC catalog snapshot.

Usage:
  pnpm build:academics -- [--input <file>] [--output <file>] [--year <year>] [--term <term>] [--campus <campus>] [--no-prereqs] [--pretty]

Examples:
  pnpm build:academics -- --input /tmp/rutgers_courses_2026_9_NB.json
  pnpm build:academics -- --year 2026 --term 9 --campus NB
`);
}

function readOptionValue(argument, argv, index) {
	const equalsIndex = argument.indexOf("=");

	if (equalsIndex >= 0) {
		return {
			nextIndex: index,
			value: argument.slice(equalsIndex + 1)
		};
	}

	const value = argv[index + 1];

	if (value === undefined) {
		throw new Error(`Missing value for ${argument}`);
	}

	return {
		nextIndex: index + 1,
		value
	};
}

function parseArgs(argv) {
	const options = {
		campus: DEFAULT_CAMPUS,
		help: false,
		includePrereqs: true,
		input: undefined,
		output: undefined,
		pretty: false,
		term: DEFAULT_TERM,
		year: DEFAULT_YEAR
	};

	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index];

		if (argument === "--help" || argument === "-h") {
			options.help = true;
			continue;
		}

		if (argument === "--no-prereqs") {
			options.includePrereqs = false;
			continue;
		}

		if (argument === "--pretty") {
			options.pretty = true;
			continue;
		}

		if (!argument.startsWith("--")) {
			throw new Error(`Unsupported argument: ${argument}`);
		}

		const flag = argument.includes("=") ? argument.slice(0, argument.indexOf("=")) : argument;
		const option = readOptionValue(argument, argv, index);

		index = option.nextIndex;

		switch (flag) {
			case "--campus":
				options.campus = option.value;
				break;
			case "--input":
				options.input = option.value;
				break;
			case "--output":
				options.output = option.value;
				break;
			case "--term":
				options.term = option.value;
				break;
			case "--year":
				options.year = option.value;
				break;
			default:
				throw new Error(`Unsupported argument: ${flag}`);
		}
	}

	return options;
}

function normalizeRequiredString(value, label) {
	if (typeof value !== "string") {
		throw new TypeError(`Expected ${label} to be a string`);
	}

	const normalizedValue = value.trim();

	if (normalizedValue.length === 0) {
		throw new Error(`Expected ${label} to be non-empty`);
	}

	return normalizedValue;
}

function normalizeOptionalString(value) {
	if (typeof value !== "string") {
		return undefined;
	}

	const normalizedValue = value.trim();

	return normalizedValue.length > 0 ? normalizedValue : undefined;
}

function normalizeMeetingCampusName(campusName, meetingModeDescription) {
	const normalizedCampusName = normalizeOptionalString(campusName);

	if (normalizedCampusName === undefined) {
		return normalizeOptionalString(meetingModeDescription)?.toUpperCase().includes("ONLINE")
			? "Online"
			: "Campus TBA";
	}

	switch (normalizedCampusName.toUpperCase()) {
		case "BUSCH":
			return "Busch";
		case "COLLEGE AVENUE":
			return "College Ave";
		case "COOK/DOUGLASS":
		case "COOK / DOUGLASS":
		case "DOUGLAS/COOK":
		case "DOUGLASS/COOK":
			return "Cook/Douglass";
		case "DOWNTOWN NB":
			return "Downtown NB";
		case "LIVINGSTON":
			return "Livingston";
		case "OFF CAMPUS":
			return "Off Campus";
		case "ONLINE":
			return "Online";
		case "STUDY ABROAD":
			return "Study Abroad";
		default:
			return normalizedCampusName;
	}
}

function dedupeStrings(values) {
	const seenValues = new Set();
	const dedupedValues = [];

	for (const value of values) {
		const normalizedValue = normalizeOptionalString(value);

		if (normalizedValue === undefined || seenValues.has(normalizedValue)) {
			continue;
		}

		seenValues.add(normalizedValue);
		dedupedValues.push(normalizedValue);
	}

	return dedupedValues;
}

function dedupeObjects(values, getKey) {
	const seenKeys = new Set();
	const dedupedValues = [];

	for (const value of values) {
		const key = getKey(value);

		if (seenKeys.has(key)) {
			continue;
		}

		seenKeys.add(key);
		dedupedValues.push(value);
	}

	return dedupedValues;
}

function getSourceUrl(year, term, campus) {
	return `https://classes.rutgers.edu/soc/api/courses.json?year=${year}&term=${term}&campus=${campus}`;
}

function getDefaultOutputPath(year, term, campus, pretty) {
	const outputFileName = pretty ? "courses.condensed.json" : "courses.condensed.min.json";

	return path.join(repoRoot, "public", "data", "academics", year, term, campus, outputFileName);
}

function getManifestOutputPath(outputPath) {
	return outputPath.replace(/\.json$/u, ".meta.json");
}

async function getSourceText(options) {
	if (options.input !== undefined) {
		const inputPath = path.resolve(process.cwd(), options.input);
		return readFile(inputPath, "utf8");
	}

	const response = await fetch(getSourceUrl(options.year, options.term, options.campus));

	if (!response.ok) {
		throw new Error(`Failed to fetch Rutgers SOC data: ${response.status} ${response.statusText}`);
	}

	return response.text();
}

function getMeeting(meeting) {
	return {
		building: normalizeOptionalString(meeting.buildingCode) ?? "",
		campus: normalizeMeetingCampusName(meeting.campusName, meeting.meetingModeDesc),
		day: normalizeOptionalString(meeting.meetingDay) ?? "",
		end: normalizeOptionalString(meeting.endTimeMilitary) ?? "",
		mode: normalizeOptionalString(meeting.meetingModeDesc) ?? "",
		modeCode: normalizeOptionalString(meeting.meetingModeCode) ?? "",
		room: normalizeOptionalString(meeting.roomNumber) ?? "",
		start: normalizeOptionalString(meeting.startTimeMilitary) ?? ""
	};
}

function getCrossListing(crossListing) {
	return {
		dept: normalizeOptionalString(crossListing.subjectCode) ?? "",
		index: normalizeOptionalString(crossListing.registrationIndex) ?? "",
		number: normalizeOptionalString(crossListing.courseNumber) ?? "",
		section: normalizeOptionalString(crossListing.sectionNumber) ?? ""
	};
}

function getSection(section) {
	const crossListings = dedupeObjects(
		Array.isArray(section.crossListedSections) ? section.crossListedSections.map(getCrossListing) : [],
		crossListing => JSON.stringify(crossListing)
	);

	const compactSection = {
		id: normalizeOptionalString(section.number) ?? "",
		index: normalizeOptionalString(section.index) ?? "",
		meetings: Array.isArray(section.meetingTimes) ? section.meetingTimes.map(getMeeting) : [],
		professors: dedupeStrings(
			Array.isArray(section.instructors) ? section.instructors.map(instructor => instructor.name) : []
		)
	};

	const comments = normalizeOptionalString(section.commentsText);
	const eligibility = normalizeOptionalString(section.sectionEligibility);
	const notes = normalizeOptionalString(section.sectionNotes);
	const openTo = normalizeOptionalString(section.openToText);

	if (crossListings.length > 0) {
		compactSection.crossListings = crossListings;
	}

	if (comments !== undefined) {
		compactSection.comments = comments;
	}

	if (eligibility !== undefined) {
		compactSection.eligibility = eligibility;
	}

	if (notes !== undefined) {
		compactSection.notes = notes;
	}

	if (openTo !== undefined) {
		compactSection.openTo = openTo;
	}

	return compactSection;
}

function getCourse(course, includePrereqs) {
	const compactCourse = {
		code: normalizeOptionalString(course.courseString) ?? "",
		dept: normalizeOptionalString(course.subject) ?? "",
		name:
			normalizeOptionalString(course.expandedTitle) ??
			normalizeOptionalString(course.title) ??
			normalizeOptionalString(course.courseString) ??
			"",
		number: normalizeOptionalString(course.courseNumber) ?? "",
		school: normalizeOptionalString(course.school?.code) ?? "",
		sections: Array.isArray(course.sections) ? course.sections.map(getSection) : []
	};

	const prereqs = includePrereqs ? normalizeOptionalString(course.preReqNotes) : undefined;

	if (prereqs !== undefined) {
		compactCourse.prereqs = prereqs;
	}

	return compactCourse;
}

async function main() {
	const parsedOptions = parseArgs(process.argv.slice(2));

	if (parsedOptions.help) {
		showHelp();
		return;
	}

	const year = normalizeRequiredString(parsedOptions.year, "year");
	const term = normalizeRequiredString(parsedOptions.term, "term");
	const campus = normalizeRequiredString(parsedOptions.campus, "campus").toUpperCase();
	const sourceText = await getSourceText({ ...parsedOptions, campus, term, year });
	const sourceBytes = Buffer.byteLength(sourceText);
	const sourcePayload = JSON.parse(sourceText);

	if (!Array.isArray(sourcePayload)) {
		throw new TypeError("Expected the Rutgers SOC payload root to be an array");
	}

	const courses = sourcePayload.map(course => getCourse(course, parsedOptions.includePrereqs));
	const sectionCount = courses.reduce((totalSections, course) => totalSections + course.sections.length, 0);
	const dataset = {
		courses,
		generatedAt: new Date().toISOString(),
		source: {
			campus,
			courseCount: courses.length,
			includesPrereqs: parsedOptions.includePrereqs,
			originalBytes: sourceBytes,
			sectionCount,
			term,
			url: getSourceUrl(year, term, campus),
			year
		},
		version: DATASET_VERSION
	};
	const manifest = {
		generatedAt: dataset.generatedAt,
		source: dataset.source,
		version: dataset.version
	};
	const outputPath = path.resolve(
		process.cwd(),
		parsedOptions.output ?? getDefaultOutputPath(year, term, campus, parsedOptions.pretty)
	);
	const manifestOutputPath = getManifestOutputPath(outputPath);
	const outputText = JSON.stringify(dataset, null, parsedOptions.pretty ? "\t" : undefined);
	const manifestText = JSON.stringify(manifest, null, parsedOptions.pretty ? "\t" : undefined);
	const outputBytes = Buffer.byteLength(outputText);

	await mkdir(path.dirname(outputPath), { recursive: true });
	await writeFile(outputPath, outputText);
	await writeFile(manifestOutputPath, manifestText);

	console.log(
		JSON.stringify(
			{
				bytesSaved: sourceBytes - outputBytes,
				campus,
				courseCount: courses.length,
				includePrereqs: parsedOptions.includePrereqs,
				manifestOutputPath,
				originalBytes: sourceBytes,
				outputBytes,
				outputPath,
				percentSaved: Number((((sourceBytes - outputBytes) / sourceBytes) * 100).toFixed(2)),
				sectionCount,
				term,
				year
			},
			null,
			2
		)
	);
}

try {
	await main();
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}

import type RoomCampus from "@/types/rooms/models/roomCampus.ts";
import type RoomCatalog from "@/types/rooms/models/roomCatalog.ts";
import type RoomCode from "@/types/rooms/models/roomCode.ts";
import type RoomRecord from "@/types/rooms/models/roomRecord.ts";

export const roomsByCampus = {
	"Busch": {
		"ARC-103": {
			building: "Allison Road Classroom",
			type: "Auditorium",
			capacity: 500,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"ARC-105": {
			building: "Allison Road Classroom",
			type: "Large Classroom",
			capacity: 66,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"ARC-107": {
			building: "Allison Road Classroom",
			type: "Large Classroom",
			capacity: 70,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-108": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-110": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-203": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 18,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-204": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 42,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-205": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-206": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-207": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-212": {
			building: "Allison Road Classroom",
			type: "Seminar Room",
			capacity: 12,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-328": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 20,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"ARC-333": {
			building: "Allison Road Classroom",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "618 Allison Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BME-102": {
			building: "Biomedical Engineering Building",
			type: "Lecture Hall",
			capacity: 141,
			address: {
				street: "599 Taylor Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"BST-114A": {
			building: "BEST West Residence Hall",
			type: "General Purpose Classroom",
			capacity: 50,
			address: {
				street: "54 Bevier Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BST-116": {
			building: "BEST West Residence Hall",
			type: "Chancellor Learning Space",
			capacity: 8,
			address: {
				street: "54 Bevier Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"CCB-1203": {
			building: "Chemistry & Chemical Biology",
			type: "Large Classroom",
			capacity: 56,
			address: {
				street: "123 Bevier Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"CCB-1209": {
			building: "Chemistry & Chemical Biology",
			type: "Large Classroom",
			capacity: 53,
			address: {
				street: "123 Bevier Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"CCB-1303": {
			building: "Chemistry & Chemical Biology",
			type: "Lecture Hall",
			capacity: 117,
			address: {
				street: "123 Bevier Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"COR-101": {
			building: "Computing Research & Education Building",
			type: "Lecture Hall",
			capacity: 113,
			address: {
				street: "96 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"EN-B120": {
			building: "Engineering Building",
			type: "Lecture Hall",
			capacity: 165,
			address: {
				street: "96 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"FBO-108": {
			building: "Fiber Optic Building",
			type: "Lecture Hall",
			capacity: 173,
			address: {
				street: "101 Bevier Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"HLL-009": {
			building: "Hill Center",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "110 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"HLL-114": {
			building: "Hill Center",
			type: "Auditorium",
			capacity: 314,
			address: {
				street: "110 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"HLL-116": {
			building: "Hill Center",
			type: "Lecture Hall",
			capacity: 105,
			address: {
				street: "110 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"PH-111": {
			building: "Pharmacy",
			type: "Lecture Hall",
			capacity: 136,
			address: {
				street: " 160 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"PH-115": {
			building: "Pharmacy",
			type: "Lecture Hall",
			capacity: 136,
			address: {
				street: " 160 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"PHY-001": {
			building: "Physics Building",
			type: "Auditorium",
			capacity: 316,
			address: {
				street: " 120 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"RWH-102": {
			building: "Richard Weeks Hall of Engineering",
			type: "Lecture Hall",
			capacity: 138,
			address: {
				street: "500 Bartholomew Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"RWH-105": {
			building: "Richard Weeks Hall of Engineering",
			type: "Auditorium",
			capacity: 285,
			address: {
				street: "500 Bartholomew Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"RWH-206": {
			building: "Richard Weeks Hall of Engineering",
			type: "Large Classroom",
			capacity: 72,
			address: {
				street: "500 Bartholomew Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"RWH-208": {
			building: "Richard Weeks Hall of Engineering",
			type: "Large Classroom",
			capacity: 36,
			address: {
				street: "500 Bartholomew Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-104": {
			building: "Science & Engineering Research Center",
			type: "Seminar Room",
			capacity: 25,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-106": {
			building: "Science & Engineering Research Center",
			type: "Study Room",
			capacity: 24,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-111": {
			building: "Science & Engineering Research Center",
			type: "Auditorium",
			capacity: 269,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"SEC-117": {
			building: "Science & Engineering Research Center",
			type: "Lecture Hall",
			capacity: 126,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"SEC-118": {
			building: "Science & Engineering Research Center",
			type: "Lecture Hall",
			capacity: 140,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"SEC-202": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 60,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-203": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 60,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-204": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 38,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-205": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 60,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-206": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 38,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-207": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 60,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-208": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 70,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-209": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-210": {
			building: "Science & Engineering Research Center",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-211": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 35,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-212": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-216": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-217": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-218": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"SEC-220": {
			building: "Science & Engineering Research Center",
			type: "Small Classroom",
			capacity: 36,
			address: {
				street: "118 Frelinghuysen Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"WL-128": {
			building: "Wright Labs",
			type: "Lecture Hall",
			capacity: 131,
			address: {
				street: "610 Taylor Road",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		}
	},
	"College Ave": {
		"ABE-1180": {
			building: "Rutgers Academic Building - East Wing",
			type: "Lecture Hall",
			capacity: 123,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ABE-2200": {
			building: "Rutgers Academic Building - East Wing",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABE-2225": {
			building: "Rutgers Academic Building - East Wing",
			type: "Auditorium",
			capacity: 271,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ABE-2250": {
			building: "Rutgers Academic Building - East Wing",
			type: "Seminar Room",
			capacity: 20,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABE-2400": {
			building: "Rutgers Academic Building - East Wing",
			type: "Auditorium",
			capacity: 271,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ABE-3200": {
			building: "Rutgers Academic Building - East Wing",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABE-3450": {
			building: "Rutgers Academic Building - East Wing",
			type: "Seminar Room",
			capacity: 14,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABE-4225": {
			building: "Rutgers Academic Building - East Wing",
			type: "Lecture Hall",
			capacity: 246,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Swivel Chair"
		},
		"ABE-4400": {
			building: "Rutgers Academic Building - East Wing",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABE-4450": {
			building: "Rutgers Academic Building - East Wing",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-1100": {
			building: "Rutgers Academic Building - West Wing",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-1125": {
			building: "Rutgers Academic Building - West Wing",
			type: "Seminar Room",
			capacity: 1,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-1150A": {
			building: "Rutgers Academic Building - West Wing",
			type: "Large Classroom",
			capacity: 30,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-1150B": {
			building: "Rutgers Academic Building - West Wing",
			type: "Large Classroom",
			capacity: 30,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-1170": {
			building: "Rutgers Academic Building - West Wing",
			type: "Lecture Hall",
			capacity: 118,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ABW-1245B": {
			building: "Rutgers Academic Building - West Wing",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-2100": {
			building: "Rutgers Academic Building - West Wing",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-2125": {
			building: "Rutgers Academic Building - West Wing",
			type: "Auditorium",
			capacity: 271,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ABW-2150": {
			building: "Rutgers Academic Building - West Wing",
			type: "Seminar Room",
			capacity: 26,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ABW-2160": {
			building: "Rutgers Academic Building - West Wing",
			type: "Auditorium",
			capacity: 271,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ABW-3100": {
			building: "Rutgers Academic Building - West Wing",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "15 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"BH-211": {
			building: "Bishop Hall",
			type: "Seminar Room",
			capacity: 20,
			address: {
				street: "115 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CA-A1": {
			building: "Campbell Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "617 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CA-A2": {
			building: "Campbell Hall",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "617 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CA-A3": {
			building: "Campbell Hall",
			type: "Small Classroom",
			capacity: 65,
			address: {
				street: "617 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CA-A4": {
			building: "Campbell Hall",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "617 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CA-A5": {
			building: "Campbell Hall",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "617 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CI-101": {
			building: "School of Communication & Information",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "4 Huntington Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CI-103": {
			building: "School of Communication & Information",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "4 Huntington Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CI-201": {
			building: "School of Communication & Information",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "4 Huntington Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CI-203": {
			building: "School of Communication & Information",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "4 Huntington Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CI-212": {
			building: "School of Communication & Information",
			type: "Large Classroom",
			capacity: 95,
			address: {
				street: "4 Huntington Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ED-025A": {
			building: "Graduate School Education",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "10 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ED-025B": {
			building: "Graduate School Education",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "10 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-A1": {
			building: "Frelinghuysen Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-A2": {
			building: "Frelinghuysen Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-A3": {
			building: "Frelinghuysen Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-A4": {
			building: "Frelinghuysen Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-A5": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-A6": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-B1": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 45,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-B2": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 65,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-B3": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 65,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-B4": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 65,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-B5": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 65,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FH-B6": {
			building: "Frelinghuysen Hall",
			type: "Large Classroom",
			capacity: 45,
			address: {
				street: "611 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HC-E128": {
			building: "Honors College",
			type: "Seminar Classroom",
			capacity: 20,
			address: {
				street: "5 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HC-N106": {
			building: "Honors College",
			type: "Seminar Classroom",
			capacity: 20,
			address: {
				street: "5 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HC-S120": {
			building: "Honors College",
			type: "Seminar Classroom",
			capacity: 20,
			address: {
				street: "5 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HC-S124": {
			building: "Honors College",
			type: "Seminar Classroom",
			capacity: 20,
			address: {
				street: "5 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HC-S126": {
			building: "Honors College",
			type: "Seminar Classroom",
			capacity: 20,
			address: {
				street: "5 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A1": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A2": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A3": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A4": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A5": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A6": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-A7": {
			building: "Hardenbergh Hall",
			type: "Large Classroom",
			capacity: 90,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-B2": {
			building: "Hardenbergh Hall",
			type: "Large Classroom",
			capacity: 65,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-B3": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-B4": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-B5": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 65,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HH-B6": {
			building: "Hardenbergh Hall",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "615 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MI-100": {
			building: "Milledoler Hall",
			type: "Lecture Hall",
			capacity: 170,
			address: {
				street: "520 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"MU-111": {
			building: "Murray Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-112": {
			building: "Murray Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-113": {
			building: "Murray Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-114": {
			building: "Murray Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-115": {
			building: "Murray Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-204": {
			building: "Murray Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-207": {
			building: "Murray Hall",
			type: "Seminar Room",
			capacity: 20,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-208": {
			building: "Murray Hall",
			type: "Large Classroom",
			capacity: 61,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-210": {
			building: "Murray Hall",
			type: "Large Classroom",
			capacity: 72,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-211": {
			building: "Murray Hall",
			type: "Large Classroom",
			capacity: 72,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-212": {
			building: "Murray Hall",
			type: "Large Classroom",
			capacity: 75,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-213": {
			building: "Murray Hall",
			type: "Large Classroom",
			capacity: 77,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"MU-301": {
			building: "Murray Hall",
			type: "Large Classroom",
			capacity: 73,
			address: {
				street: "510 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"SC-101": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-102": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-103": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-104": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-105": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-106": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-114": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-115": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-116": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-119": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-120": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-121": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 20,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-123": {
			building: "Scott Hall",
			type: "Auditorium",
			capacity: 450,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"SC-135": {
			building: "Scott Hall",
			type: "Auditorium",
			capacity: 450,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"SC-201": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 35,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-202": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-203": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-204": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-205": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-206": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-207": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-214": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-215": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-216": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-219": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-220": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"SC-221": {
			building: "Scott Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "43 College Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"VD-211": {
			building: "Van Dyck Hall",
			type: "Lecture Hall",
			capacity: 206,
			address: {
				street: "16 Seminary Place",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"VH-104": {
			building: "Voorhees Hall",
			type: "Small Classroom",
			capacity: 39,
			address: {
				street: "71 Hamilton Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"VH-105": {
			building: "Voorhees Hall",
			type: "Auditorium",
			capacity: 265,
			address: {
				street: "71 Hamilton Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ZAM-EDR": {
			building: "Zimmerli Art Museum",
			type: "Large Classroom",
			capacity: 30,
			address: {
				street: "71 Hamilton Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"ZAM-MPR": {
			building: "Zimmerli Art Museum",
			type: "Large Classroom",
			capacity: 55,
			address: {
				street: "71 Hamilton Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		}
	},
	"Cook/Douglass": {
		"ARH-100": {
			building: "Art History Hall",
			type: "Large Classroom",
			capacity: 60,
			address: {
				street: "4 Chapel Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"ARH-200": {
			building: "Art History Hall",
			type: "Lecture Hall",
			capacity: 150,
			address: {
				street: "4 Chapel Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"BIO-205": {
			building: "Biological Sciences",
			type: "Lecture Hall",
			capacity: 49,
			address: {
				street: "1 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"BL-101": {
			building: "Blake Hall",
			type: "Small Classroom",
			capacity: 24,
			address: {
				street: "93 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"BT-123": {
			building: "Bartlett Hall",
			type: "Lecture Hall",
			capacity: 100,
			address: {
				street: "84 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CDL-102": {
			building: "Cook/Douglass Lecture Hall",
			type: "Lecture Hall",
			capacity: 120,
			address: {
				street: "3 College Farm Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CDL-103": {
			building: "Cook/Douglass Lecture Hall",
			type: "Large Classroom",
			capacity: 80,
			address: {
				street: "3 College Farm Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CDL-109": {
			building: "Cook/Douglass Lecture Hall",
			type: "Large Classroom",
			capacity: 80,
			address: {
				street: "3 College Farm Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"CDL-110": {
			building: "Cook/Douglass Lecture Hall",
			type: "Lecture Hall",
			capacity: 120,
			address: {
				street: "3 College Farm Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"DAV-122": {
			building: "Cook/Douglass Lecture Hall",
			type: "Small Classroom",
			capacity: 44,
			address: {
				street: "26 Nichol Avenue",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FNH-101": {
			building: "Institute for Food Nutrition & Health",
			type: "Large Classroom",
			capacity: 70,
			address: {
				street: "61 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FNH-205": {
			building: "Institute for Food Nutrition & Health",
			type: "Small Classroom",
			capacity: 44,
			address: {
				street: "61 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FOR-138A": {
			building: "Foran Hall",
			type: "Large Classroom",
			capacity: 60,
			address: {
				street: "59 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FOR-138B": {
			building: "Foran Hall",
			type: "Small Classroom",
			capacity: 36,
			address: {
				street: "59 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FOR-191B": {
			building: "Foran Hall",
			type: "Small Classroom",
			capacity: 24,
			address: {
				street: "59 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FSW-101": {
			building: "Food Science and Nutrition Sciences West",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "65 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"FSW-105": {
			building: "Food Science and Nutrition Sciences West",
			type: "Lecture Hall",
			capacity: 194,
			address: {
				street: "65 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"FSW-109": {
			building: "Food Science and Nutrition Sciences West",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "65 Dudley Road",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-101": {
			building: "Hickman Hall",
			type: "Auditorium",
			capacity: 288,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"HCK-112": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-113": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-114": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-115": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-117": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-118": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-119": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-122": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-123": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-126": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-127": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-129": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-130": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 32,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-131": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 32,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-132": {
			building: "Hickman Hall",
			type: "Seminar Room",
			capacity: 20,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-138": {
			building: "Hickman Hall",
			type: "Auditorium",
			capacity: 481,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"HCK-201": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-202": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 42,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-204": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-205": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-206": {
			building: "Hickman Hall",
			type: "Seminar Room",
			capacity: 15,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-207": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-209": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-210": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 35,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-211": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 42,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-213": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-214": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-216": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HCK-218": {
			building: "Hickman Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "89 George Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HSB-106": {
			building: "Heldrich Science Building",
			type: "Large Classroom",
			capacity: 75,
			address: {
				street: "35 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"HSB-201": {
			building: "Heldrich Science Building",
			type: "Large Classroom",
			capacity: 75,
			address: {
				street: "35 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HSB-204": {
			building: "Heldrich Science Building",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "35 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"HSB-206": {
			building: "Heldrich Science Building",
			type: "Small Classroom",
			capacity: 37,
			address: {
				street: "35 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"KLG-002": {
			building: "Kathleen W. Ludwig Global Village Living Learning Center",
			type: "Small Classroom",
			capacity: 21,
			address: {
				street: "9 Suydam Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"KLG-008": {
			building: "Kathleen W. Ludwig Global Village Living Learning Center",
			type: "Small Classroom",
			capacity: 24,
			address: {
				street: "9 Suydam Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"KLG-010": {
			building: "Kathleen W. Ludwig Global Village Living Learning Center",
			type: "Auditorium",
			capacity: 198,
			address: {
				street: "9 Suydam Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"KLG-017": {
			building: "Kathleen W. Ludwig Global Village Living Learning Center",
			type: "Seminar Room",
			capacity: 24,
			address: {
				street: "9 Suydam Street",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"LOR-020": {
			building: "Loree Classroom Building",
			type: "Lecture Hall",
			capacity: 111,
			address: {
				street: "72 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"LOR-022": {
			building: "Loree Classroom Building",
			type: "Auditorium",
			capacity: 295,
			address: {
				street: "72 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"LOR-024": {
			building: "Loree Classroom Building",
			type: "Lecture Hall",
			capacity: 143,
			address: {
				street: "72 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"LOR-115": {
			building: "Loree Classroom Building",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "72 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-001": {
			building: "Ruth Adams Building",
			type: "Lecture Hall",
			capacity: 144,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"RAB-104": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-109B": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-110A": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 32,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-110B": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 32,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-204": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-206": {
			building: "Ruth Adams Building",
			type: "Large Classroom",
			capacity: 70,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Fixed Chair"
		},
		"RAB-207": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-208": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 49,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-209A": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 20,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"RAB-209B": {
			building: "Ruth Adams Building",
			type: "Small Classroom",
			capacity: 24,
			address: {
				street: "12 Chemistry Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"TH-101": {
			building: "Thompson Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "96 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"TH-201": {
			building: "Thompson Hall",
			type: "Small Classroom",
			capacity: 14,
			address: {
				street: "96 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"TH-206": {
			building: "Thompson Hall",
			type: "Large Classroom",
			capacity: 55,
			address: {
				street: "96 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"WAL-203": {
			building: "Waller Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "59 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		},
		"WAL-210": {
			building: "Waller Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "59 Lipman Drive",
				city: "New Brunswick",
				state: "NJ",
				zip: "08901"
			},
			seating: "Moveable Chair"
		}
	},
	"Livingston": {
		"BE-003": {
			building: "Beck Hall",
			type: "General Purpose Classroom",
			capacity: 40,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-011": {
			building: "Beck Hall",
			type: "General Purpose Classroom",
			capacity: 40,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-013": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 27,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-100": {
			building: "Beck Hall",
			type: "Auditorium",
			capacity: 391,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"BE-101": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-111": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-119": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-121": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 35,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-201": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-213": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-219": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-221": {
			building: "Beck Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-250": {
			building: "Beck Hall",
			type: "Large Classroom",
			capacity: 70,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-251": {
			building: "Beck Hall",
			type: "Large Classroom",
			capacity: 54,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"BE-252": {
			building: "Beck Hall",
			type: "Large Classroom",
			capacity: 65,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-253": {
			building: "Beck Hall",
			type: "Large Classroom",
			capacity: 70,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-A102": {
			building: "Lucy Stone Hall",
			type: "Auditorium",
			capacity: 400,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"LSH-A121": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 30,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-A139": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 20,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-A140": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 22,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-A142": {
			building: "Lucy Stone Hall",
			type: "Lecture Hall",
			capacity: 112,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"LSH-A143": {
			building: "Lucy Stone Hall",
			type: "Lecture Hall",
			capacity: 114,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"LSH-A232": {
			building: "Lucy Stone Hall",
			type: "Seminar Room",
			capacity: 20,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B105": {
			building: "Lucy Stone Hall",
			type: "General Purpose Classroom",
			capacity: 45,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B109": {
			building: "Lucy Stone Hall",
			type: "General Purpose Classroom",
			capacity: 24,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B110": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 35,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B111": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B112": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B115": {
			building: "Lucy Stone Hall",
			type: "Large Classroom",
			capacity: 78,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"LSH-B116": {
			building: "Lucy Stone Hall",
			type: "Seminar Room",
			capacity: 26,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B117": {
			building: "Lucy Stone Hall",
			type: "Large Classroom",
			capacity: 78,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"LSH-B121": {
			building: "Lucy Stone Hall",
			type: "Seminar Room",
			capacity: 18,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B123": {
			building: "Lucy Stone Hall",
			type: "Small Classroom",
			capacity: 20,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B205": {
			building: "Lucy Stone Hall",
			type: "Seminar Room",
			capacity: 22,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B267": {
			building: "Lucy Stone Hall",
			type: "Large Classroom",
			capacity: 80,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"LSH-B269": {
			building: "Lucy Stone Hall",
			type: "Large Classroom",
			capacity: 80,
			address: {
				street: "54 Joyce Kilmer Avenue",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-103A": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 42,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-103B": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 42,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-103C": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 44,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-103D": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 28,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-105": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-111L": {
			building: "Tillet Hall",
			type: "Seminar Room",
			capacity: 12,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-111M": {
			building: "Tillet Hall",
			type: "Seminar Room",
			capacity: 18,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-111N": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 18,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-111P": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 18,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-116": {
			building: "Tillet Hall",
			type: "Large Classroom",
			capacity: 98,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"TIL-123": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-125": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-127": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 25,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-204": {
			building: "Tillet Hall",
			type: "Large Classroom",
			capacity: 54,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-207": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 45,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-209": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 40,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-224": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 29,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"TIL-226": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 123,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-230": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 48,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-232": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 208,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-242": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 118,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-246": {
			building: "Tillet Hall",
			type: "Large Classroom",
			capacity: 82,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-251": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 44,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"TIL-252": {
			building: "Tillet Hall",
			type: "Small Classroom",
			capacity: 48,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"TIL-253": {
			building: "Tillet Hall",
			type: "Large Classroom",
			capacity: 58,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Swivel Chair"
		},
		"TIL-254": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 204,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-257": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 128,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-258": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 102,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		},
		"TIL-264": {
			building: "Tillet Hall",
			type: "Lecture Hall",
			capacity: 116,
			address: {
				street: "53 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Fixed Chair"
		}
	}
} as const satisfies RoomCatalog;

export const rooms = Object.fromEntries(
	Object.entries(roomsByCampus).flatMap(([campus, campusRooms]) =>
		Object.entries(campusRooms).map(([roomCode, room]) => [
			roomCode,
			{
				...room,
				campus: campus as RoomCampus
			}
		])
	)
) as Readonly<Record<RoomCode<typeof roomsByCampus>, RoomRecord>>;

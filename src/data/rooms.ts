import type RoomCampus from "@/types/rooms/models/roomCampus.ts";
import type RoomCatalog from "@/types/rooms/models/roomCatalog.ts";
import type RoomCode from "@/types/rooms/models/roomCode.ts";
import type RoomRecord from "@/types/rooms/models/roomRecord.ts";

export const roomsByCampus = {
	"College Ave": {
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
		}
	},
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
			type: "General Purpose Classroom",
			capacity: 66,
			address: {
				street: "618 Allison Road",
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
		"PH-111": {
			building: "Pharmacy",
			type: "Lecture Hall",
			capacity: 136,
			address: {
				street: "160 Frelinghuysen Road",
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
				street: "160 Frelinghuysen Road",
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
		"BE-201": {
			building: "Beck Hall",
			type: "General Purpose Classroom",
			capacity: 48,
			address: {
				street: "99 Avenue E",
				city: "Piscataway",
				state: "NJ",
				zip: "08854"
			},
			seating: "Moveable Chair"
		},
		"BE-252": {
			building: "Beck Hall",
			type: "General Purpose Classroom",
			capacity: 65,
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
		"LSH-A212": {
			building: "Lucy Stone Hall",
			type: "General Purpose Classroom",
			capacity: 30,
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
		"TIL-103A": {
			building: "Tillet Hall",
			type: "General Purpose Classroom",
			capacity: 42,
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

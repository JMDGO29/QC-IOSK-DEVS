import IB101 from "../assets/animation/yellow/101a.glb";
import IB102 from "../assets/animation/yellow/102.glb";
import IB103 from "../assets/animation/yellow/103a.glb";
import IB101Voice from "../assets/audio/voice101a.mp3";
import admin from "../assets/animation/admin.glb";
import belmonte from "../assets/animation/belmonte.glb";
import multicasting from "../assets/animation/multicasting.glb";
import techvoc from "../assets/animation/techvoc.glb";
import yellow from "../assets/animation/yellow.glb";
import IL401a from "../assets/animation/academic/Academic-IL401a.glb";
import IL301a from "../assets/animation/academic/Acad - IL301.glb";
export const roomData: Record<
  string,
  Record<
    string,
    {
      buildingName: string;
      floorNumber: string;
      name: string;
      officeName?: string;
      modelPath: string;
      voice: string;
      details: {
        roomName: string;
        roomType: string;
        distance: string;
        eta: string;
        occupiedBy?: string;
        status?: string;
        sqm: string; // Assuming status might be optional
      };
      textGuide: string[];
    }[]
  >
> = {
  "Bautista Building": {
    "1": [
      {
        buildingName: "Bautista Building",
        floorNumber: "Lower Grounds",
        name: "Canteen",
        modelPath: "",
        voice: "",
        details: {
          roomName: "Canteen",
          roomType: "Cafeteria",
          distance: "",
          sqm: "260 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "Lower Grounds",
        name: "Coop Office",
        modelPath: "",
        voice: "",
        details: {
          roomName: "Coop Office",
          roomType: "Coop Office/ CCTV Room ",
          distance: "",
          sqm: "33 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "Lower Grounds",
        name: "BS Entrep Incubation",
        modelPath: "",
        voice: "",
        details: {
          roomName: "BS Entrep Incubation",
          roomType: "Incubation",
          distance: "",
          sqm: "42 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK101",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK101",
          roomType: "ME Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK102",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK102",
          roomType: "CBA Faculty Office (BS Accountancy)",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK103b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK103b",
          roomType: "Working Lab (COE)",
          distance: "",
          sqm: "101 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK104d",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK104d",
          roomType: "Science Lab (COE)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK105",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK105",
          roomType: "COE - Office (Engineering Laboratory)",
          distance: "",
          sqm: "25 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK106",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK106",
          roomType: "Aux Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK107",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK107",
          roomType: "EE Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "1st Floor",
        name: "IK108",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK108",
          roomType: "Utility Room",
          distance: "",
          sqm: "9 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "3": [
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK201",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK201",
          roomType: "QAR - Office",
          distance: "",
          sqm: "16 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK202",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK202",
          roomType: "Inter-Faith",
          distance: "",
          sqm: "16 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK203b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK203b",
          roomType: "Computer Lab (COE)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK204b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK204b",
          roomType: "Computer Lab (COE)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK205",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK205",
          roomType: "Aux Room",
          distance: "",
          sqm: "15 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK206",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK206",
          roomType: "Aux Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK207",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK207",
          roomType: "EE Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "2nd Floor",
        name: "IK208",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK208",
          roomType: "Utility Room",
          distance: "",
          sqm: "9 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "4": [
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK301",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK301",
          roomType: "ME Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK302",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK302",
          roomType: "COEd - Faculty Office",
          distance: "",
          sqm: "54 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK303b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK303b",
          roomType: "Computer Lab (COE)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK304b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK304b",
          roomType: "Computer Lab (COE)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK305",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK305",
          roomType: "Math & Science Faculty Office",
          distance: "",
          sqm: "15 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK306",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK306",
          roomType: "Aux Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK307",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK307",
          roomType: "EE Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "3rd Floor",
        name: "IK308",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK308",
          roomType: "Utility Room",
          distance: "",
          sqm: "9 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "5": [
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK401",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK401",
          roomType: "ME Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK402",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK402",
          roomType: "CBA - Faculty OFfice (BS-Entrep)",
          distance: "",
          sqm: "66 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK403b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK403b",
          roomType: "Computer Lab (CBA)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK404b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK404b",
          roomType: "Computer Lab (CBA)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK405",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK405",
          roomType: "Aux Room",
          distance: "",
          sqm: "15 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK406",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK406",
          roomType: "Aux Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK407",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK407",
          roomType: "EE Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "4th Floor",
        name: "IK408",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK408",
          roomType: "Utility Room",
          distance: "",
          sqm: "9 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "6": [
      {
        buildingName: "Bautista Building",
        floorNumber: "5th Floor",
        name: "IK501",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK501",
          roomType: "ME Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "5th Floor",
        name: "IK502",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK502",
          roomType: "COE - Faculty Office",
          distance: "",
          sqm: "54 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "5th Floor",
        name: "IK503b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK503b",
          roomType: "Computer Lab (CCS)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "5th Floor",
        name: "IK504d",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK504d",
          roomType: "Computer Lab (CCS)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "5th Floor",
        name: "IK505",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK505",
          roomType: "Aux Room",
          distance: "",
          sqm: "15 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "",
        name: "IK506",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK506",
          roomType: "Aux Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "",
        name: "IK507",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK507",
          roomType: "EE Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "",
        name: "IK508",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK508",
          roomType: "Utility Room",
          distance: "",
          sqm: "9 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "7": [
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK601",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK601",
          roomType: "ME Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK602",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK602",
          roomType: "CCS - Faculty Office",
          distance: "",
          sqm: "66 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK603b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK603b",
          roomType: "Computer Lab (CCS)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK604b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK604b",
          roomType: "Computer Lab (CCS)",
          distance: "",
          sqm: "98 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK605",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK605",
          roomType: "Aux Room",
          distance: "",
          sqm: "15 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK606",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK606",
          roomType: "Aux Room",
          distance: "",
          sqm: "12 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK607",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK607",
          roomType: "EE Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Bautista Building",
        floorNumber: "6th Floor",
        name: "IK608",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IK608",
          roomType: "Utility Room",
          distance: "",
          sqm: "9 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "8": [
      {
        buildingName: "Bautista Building",
        floorNumber: "7th Floor",
        name: "Auditorium",
        modelPath: "",
        voice: "",
        details: {
          roomName: "Auditorium",
          roomType: "Auditorium, Function Room, VIP Room, Dance Studio, Dressing Room",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "9": [
      {
        buildingName: "Bautista Building",
        floorNumber: "8th Floor",
        name: "Mezzanine",
        modelPath: "",
        voice: "",
        details: {
          roomName: "Mezzanine",
          roomType: "Auditorium, Radio Room, Control Room",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Academic Building": {
    "1": [
      {
        buildingName: "Academic Building",
        floorNumber: "1st Floor",
        name: "Guidance",
        officeName: "",
        modelPath: "../assets/animation/academic/Acad - IL301.glb",
        voice: "",
        details: {
          roomName: "Guidance",
          roomType: "Guidance Office",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "1st Floor",
        name: "Clinic",
        officeName: "",
        modelPath: "../assets/animation/academic/Acad - IL301.glb",
        voice: "",
        details: {
          roomName: "Clinic",
          roomType: "Clinic & Nurse Office",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      
    ],
    "2": [
      {
        buildingName: "Academic Building",
        floorNumber: "2nd Floor",
        name: "Library",
        modelPath: "",
        voice: "",
        details: {
          roomName: "Library",
          roomType: "Library Room",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    
    ],
    "3": [
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "",
        name: "IL301a",
        modelPath: IL301a,
        voice: "",
        details: {
          roomName: "IL301a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "",
        name: "IL302a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL302a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "",
        name: "IL303a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL303a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "",
        name: "IL304a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL304a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "",
        name: "IL305a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL305a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "",
        name: "IL306a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL306a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      
    ],
    "4": [
      {
        buildingName: "Academic Building",
        floorNumber: "4th",
        officeName: "",
        name: "IL401a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL401a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "4th",
        officeName: "",
        name: "IL402a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL402a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "4th",
        officeName: "",
        name: "IL403a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL403a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "4th",
        officeName: "",
        name: "IL404a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL404a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "4th",
        officeName: "",
        name: "IL405a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL405a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "4th",
        officeName: "",
        name: "IL406a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL406a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "5": [
      {
        buildingName: "Academic Building",
        floorNumber: "5th",
        officeName: "",
        name: "IL501a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL501a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "5th",
        officeName: "",
        name: "IL502a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL502a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "5th",
        officeName: "",
        name: "IL503a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL503a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "5th",
        officeName: "",
        name: "IL504a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL504a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "5th",
        officeName: "",
        name: "IL505a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL505a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "5th",
        officeName: "",
        name: "IL506a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL506a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "6": [
      {
        buildingName: "Academic Building",
        floorNumber: "6th",
        officeName: "",
        name: "IL601a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL601a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "6th",
        officeName: "",
        name: "IL602a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL602a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "6th",
        officeName: "",
        name: "IL603a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL603a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "6th",
        officeName: "",
        name: "IL604a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL604a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "6th",
        officeName: "",
        name: "IL605a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL605a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "6th",
        officeName: "",
        name: "IL606a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL606a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "7": [
      {
        buildingName: "Academic Building",
        floorNumber: "7th",
        officeName: "",
        name: "IL701a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL701a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "7th",
        officeName: "",
        name: "IL702a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL702a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "7th",
        officeName: "",
        name: "IL703a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL703a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "7th",
        officeName: "",
        name: "IL704a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL704a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "7th",
        officeName: "",
        name: "IL705a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL705a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "7th",
        officeName: "",
        name: "IL706a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IL706a",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Admin Building": {
    "1": [
      {
        buildingName: "Admin Building",
        floorNumber: "1st Floor",
        name: "Ground Floor",
        modelPath: "admin",
        voice: "",
        details: {
          roomName: "Ground Floor",
          roomType: "Open Lobby",
          distance: "",
          sqm: "220 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Admin Building",
        floorNumber: "2nd Floor",
        name: "IJ201",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ201",
          roomType: "RAD",
          distance: "",
          sqm: "102 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "2nd Floor",
        name: "IJ202",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ202",
          roomType: "FMD",
          distance: "",
          sqm: "67 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "3": [
      {
        buildingName: "Admin Building",
        floorNumber: "3rd Floor",
        name: "IJ301",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ301",
          roomType: "HRMD & Administrative Service Office",
          distance: "",
          sqm: "208 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "4": [
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ401",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ401",
          roomType: "VPAF Office",
          distance: "",
          sqm: "18 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ402",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ402",
          roomType: "Mini Conference Room",
          distance: "",
          sqm: "18 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ403",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ403",
          roomType: "Office of the President",
          distance: "",
          sqm: "51.45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ404",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ404",
          roomType: "Pantry",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ405",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ405",
          roomType: "Conference Room",
          distance: "",
          sqm: "37.80 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ406",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ406",
          roomType: "Planning and Extension Office",
          distance: "",
          sqm: "18 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ407",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ407",
          roomType: "VPAA",
          distance: "",
          sqm: "14 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Admin Building",
        floorNumber: "4th Floor",
        name: "IJ408",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IJ408",
          roomType: "REPL",
          distance: "",
          sqm: "14.30 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "5": [
      {
        buildingName: "Admin Building",
        floorNumber: "5th Floor",
        name: "Open Deck",
        modelPath: "",
        voice: "",
        details: {
          roomName: "Open Deck",
          roomType: "Roof Top",
          distance: "",
          sqm: "56 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Belmonte Building": {
    "1": [
      {
        buildingName: "Belmonte Building",
        floorNumber: "1st Floor",
        name: "IC101a",
        modelPath: belmonte,
        voice: "",
        details: {
          roomName: "IC101a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "1st Floor",
        name: "IC102a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC102a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "1st Floor",
        name: "IC103a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC103a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "1st Floor",
        name: "IC104",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC104",
          roomType: "",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "1st Floor",
        name: "IC105a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC105a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "1st Floor",
        name: "IC106a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC106a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Belmonte Building",
        floorNumber: "2nd Floor",
        name: "IC201a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC201a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "2nd Floor",
        name: "IC202a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC202a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "2nd Floor",
        name: "IC203a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC203a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "2nd Floor",
        name: "IC204",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC204",
          roomType: "",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "2nd Floor",
        name: "IC205a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC205a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "2nd Floor",
        name: "IC206a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC206a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "3": [
      {
        buildingName: "Belmonte Building",
        floorNumber: "3rd Floor",
        name: "IC301a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC301a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "3rd Floor",
        name: "IC302a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC302a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "3rd Floor",
        name: "IC303a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC303a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "3rd Floor",
        name: "IC304",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC304",
          roomType: "",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "3rd Floor",
        name: "IC305a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC305a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "3rd Floor",
        name: "IC306a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC306a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "4": [
      {
        buildingName: "Belmonte Building",
        floorNumber: "4th Floor",
        name: "IC401a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC401a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "4th Floor",
        name: "IC402a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC402a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "4th Floor",
        name: "IC403a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC403a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "4th Floor",
        name: "IC404",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC404",
          roomType: "",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "4th Floor",
        name: "IC405a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC405a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Belmonte Building",
        floorNumber: "4th Floor",
        name: "IC406a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IC406a",
          roomType: "Lecture Room",
          distance: "",
          sqm: "60 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Techvoc Building": {
    "1": [
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "TVGYM",
        modelPath: techvoc,
        voice: "",
        details: {
          roomName: "TVGYM",
          roomType: "Multipurpose Gym",
          distance: "",
          sqm: "945 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA101c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA101c",
          roomType: "Machine Operation Lab (Engineering Lab)",
          distance: "",
          sqm: "108 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA102c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA102c",
          roomType: "PSPMD - Stock Room",
          distance: "",
          sqm: "108 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA103",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA103",
          roomType: "PFGSD Office",
          distance: "",
          sqm: "86 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA104c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA104c",
          roomType: "PE Faculty Office",
          distance: "",
          sqm: "42 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA105",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA105",
          roomType: "PSPMD Office - Procurement and Supplies Unit",
          distance: "",
          sqm: "72 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA106",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA106",
          roomType: "PSPMD Office - Property Unit",
          distance: "",
          sqm: "48 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA107",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA107",
          roomType: "PSPMD - Stock Room (Laptop)",
          distance: "",
          sqm: "48 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA108c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA108c",
          roomType: "Dress Making (InActive)",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA109",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA109",
          roomType: "Cuisine Arts Lab (InActive)",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA110",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA110",
          roomType: "PSPMD - Stock Room",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA111",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA111",
          roomType: "PFGSD Office (Maintenance)",
          distance: "",
          sqm: "54 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "1st Floor",
        name: "IA112c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA112c",
          roomType: "Cuisine Arts Lab (InActive)",
          distance: "",
          sqm: "54 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA201a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA201a",
          roomType: "Machine Operation Lec (Engineering Lec)",
          distance: "",
          sqm: "108 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA202a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA202a",
          roomType: "PSPMD - Stock Room",
          distance: "",
          sqm: "108 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA203",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA203",
          roomType: "PFGSD Office (EMU)",
          distance: "",
          sqm: "73 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA204c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA204c",
          roomType: "PFGSD - Director's Office",
          distance: "",
          sqm: "22 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA205",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA205",
          roomType: "Culture & Arts Office",
          distance: "",
          sqm: "7 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA206",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA206",
          roomType: "Office",
          distance: "SPARD - Office",
          sqm: "45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA207",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA207",
          roomType: "SASD",
          distance: "",
          sqm: "45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA208",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA208",
          roomType: "ICTO - Office (Technical Staff)",
          distance: "",
          sqm: "45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA209",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA209",
          roomType: "ICTO - Director's Office",
          distance: "",
          sqm: "45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA210",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA210",
          roomType: "Guidance Office",
          distance: "",
          sqm: "45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA211",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA211",
          roomType: "Alumni Office",
          distance: "",
          sqm: "29 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA212",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA212",
          roomType: "Urban Farming Office",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: " 2nd Floor",
        name: "IA213",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA213",
          roomType: "ROTC",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA214a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA214a",
          roomType: "Vacant",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA215a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA215a",
          roomType: "ICTO - Stock Room",
          distance: "",
          sqm: "36 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Techvoc Building",
        floorNumber: "2nd Floor",
        name: "IA216",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IA216",
          roomType: "NSTP Faculty Office",
          distance: "",
          sqm: "45 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Ched Building": {
    "1": [
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID101",
        modelPath: multicasting,
        voice: "",
        details: {
          roomName: "ID101",
          roomType: "Stock Room",
          distance: "",
          sqm: "13 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID102",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID102",
          roomType: "Office - Student Organization (PIIE)",
          distance: "",
          sqm: "25 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID103",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID103",
          roomType: "Conference Room - Student Organization (PIIE)",
          distance: "",
          sqm: "50 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID104",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID104",
          roomType: "Medical Stock Room",
          distance: "",
          sqm: "17 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID105",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID105",
          roomType: "Dental Clinic",
          distance: "",
          sqm: "16 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID106",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID106",
          roomType: "Medical Room",
          distance: "",
          sqm: "36.50 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Ched Building",
        floorNumber: "1st Floor",
        name: "ID107",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID107",
          roomType: "Medical Room",
          distance: "",
          sqm: "35.70 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Ched Building",
        floorNumber: "2nd Floor",
        name: "ID201",
        modelPath: "",
        voice: "",
        details: {
          roomName: "ID201",
          roomType: "Library",
          distance: "",
          sqm: "250 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Simon Building": {
    "1": [
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB101a",
        modelPath: yellow,
        voice: IB101Voice,
        details: {
          roomName: "IB101a",
          roomType: "",
          distance: "",
          sqm: "78 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        textGuide: [
          "Text Guide: 1asdasdasdasd",
          "Text Guide 2",
          "Text Guide 3",
          "Text Guide 4",
          "QWERTY",
        ],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB102a",
        modelPath: IB102,
        voice: "",
        details: {
          roomName: "IB102a",
          roomType: "",
          distance: "",
          sqm: "66 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB103a",
        modelPath: IB103,
        voice: "",
        details: {
          roomName: "IB103a",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB104a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB104a",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB105a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB105a",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB106a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB106a",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB107a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB107a",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB108a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB108a",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB109a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB109a",
          roomType: "",
          distance: "",
          sqm: "66 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st Floor",
        name: "IB110a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB110a",
          roomType: "",
          distance: "",
          sqm: "78 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB201f",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB201f",
          roomType: "",
          distance: "",
          sqm: "78 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB202c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB202c",
          roomType: "",
          distance: "",
          sqm: "66 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB203b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB203b",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB204b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB204b",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB205b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB205b",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB206b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB206b",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB207b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB207b",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB208b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB208b",
          roomType: "",
          distance: "",
          sqm: "75 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB209c",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB209c",
          roomType: "",
          distance: "",
          sqm: "66 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "2nd Floor",
        name: "IB210d",
        modelPath: "",
        voice: "",
        details: {
          roomName: "IB210d",
          roomType: "",
          distance: "",
          sqm: "78 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "ChineseB Building": {
    "1": [
      {
        buildingName: "ChineseB Building",
        floorNumber: "",
        name: "",
        modelPath: "",
        voice: "",
        details: {
          roomName: "",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Urban Farming": {
    "1": [
      {
        buildingName: "Urban Farming",
        floorNumber: "",
        name: "",
        modelPath: "",
        voice: "",
        details: {
          roomName: "",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Multipurpose Building": {
    "1": [
      {
        buildingName: "Multipurpose Building",
        floorNumber: "",
        name: "",
        modelPath: "",
        voice: "",
        details: {
          roomName: "",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "Ballroom Building": {
    "1": [
      {
        buildingName: "Ballroom Building",
        floorNumber: "",
        name: "",
        modelPath: "",
        voice: "",
        details: {
          roomName: "",
          roomType: "",
          distance: "",
          sqm: "",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
  "KorPhil Building": {
    "1": [
      {
        buildingName: "KorPhil Building",
        floorNumber: "1st Floor",
        name: "RM 101a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 101a",
          roomType: "",
          distance: "",
          sqm: "70.50 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "1st Floor",
        name: "RM 102a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 102a",
          roomType: "",
          distance: "",
          sqm: "63 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "1st Floor",
        name: "RM 103a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 103a",
          roomType: "",
          distance: "",
          sqm: "62 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "KorPhil Building",
        floorNumber: "2nd Floor",
        name: "RM 201",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 201",
          roomType: "Admin & Guidance Office",
          distance: "",
          sqm: "70 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "2nd Floor",
        name: "RM 202",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 202",
          roomType: "Library",
          distance: "",
          sqm: "62 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "2nd Floor",
        name: "RM 203",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 203",
          roomType: "Faculty & PESO Room",
          distance: "",
          sqm: "85 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "2nd Floor",
        name: "RM 204",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 204",
          roomType: "Isolation & Clinic",
          distance: "",
          sqm: "62 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "3": [
      {
        buildingName: "KorPhil Building",
        floorNumber: "3rd Floor",
        name: "RM 301a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 301a",
          roomType: "Regular Room",
          distance: "",
          sqm: "70 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "3rd Floor",
        name: "RM 302b",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 302b",
          roomType: "Computer Lab",
          distance: "",
          sqm: "62 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "KorPhil Building",
        floorNumber: "3rd Floor",
        name: "RM 303a",
        modelPath: "",
        voice: "",
        details: {
          roomName: "RM 303a",
          roomType: "Regular Room",
          distance: "",
          sqm: "85 sqm",
          eta: "",
          occupiedBy: "",
          status: "", // Example status
        },
        

        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
};

import IB101 from "../assets/animation/yellow/101a.glb";
import IB102 from "../assets/animation/yellow/102.glb";
import IB103 from "../assets/animation/yellow/103a.glb";
import IB101Voice from "../assets/audio/voice101a.mp3";

import IL401a from "../assets/animation/academic/Academic-IL401a.glb";
import IL301a from "../assets/animation/academic/Acad - IL301.glb";
export const roomData: Record<
  string,
  Record<
    string,
    {
      building: string;
      floor: string;
      officeName?: string;
      modelName: string;
      voice: string;
      details: {
        roomName: string;
        roomType: string;
        distance: string;
        eta: string;
        occupiedBy: string;
        status?: string; // Assuming status might be optional
      };
      textGuide: string[];
    }[]
  >
> = {
  "Academic Building": {
    "1": [
      {
        building: "Academic Building",
        floor: "3rd Floor",
        officeName: "LESIT (Sample)",
        modelName: "../assets/animation/academic/Acad - IL301.glb",
        voice: "",
        details: {
          roomName: "IB301a",
          roomType: "Office",
          distance: "1.9 km (sample)",
          eta: "10 mins.",
          occupiedBy: "LESIT (sample)",
          status: "Occupied", // Example status
        },
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
};

import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { KeyboardRef } from "../Search";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../components/utils/firebase";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: React.MutableRefObject<KeyboardRef | undefined>;
  onSuggestionsUpdate: (suggestions: Suggestion[]) => void;
}

interface Room {
  id: string;
  buildingName: string;
  floors: {
    [floorName: string]: {
      [roomCodeMap: string]: {
        description: string;
        roomCode: string;
        squareMeter: number;
        textGuide: string;
        roomAnimation: string;
        voiceGuide: string;
        status: string;
      };
    };
  };
}

interface Suggestion {
  description: string;
  roomCode: string;
  // Add other properties as needed
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  onSuggestionsUpdate,
}) => {
  const [layoutName, setLayoutName] = useState("default");
  const internalKeyboardRef = useRef<any>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const roomsCollection = collection(db, "roomData");
      const queryRoom = query(roomsCollection);
      const roomsSnapshot = await getDocs(queryRoom);
      const roomsData = roomsSnapshot.docs.map((doc) => {
        const roomData = doc.data() as Room;
        return { ...roomData, id: doc.id } as Room;
      });

      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  const onChangeInput = (input: string) => {
    onChange(input.toLowerCase());

    // Filter room names based on input
    const filteredSuggestions: Suggestion[] = [];
    for (const buildingName in rooms) {
      const floors = rooms[buildingName].floors;
      for (const floorName in floors) {
        const roomCodeMap = floors[floorName];
        for (const roomCode in roomCodeMap) {
          const room = roomCodeMap[roomCode];
          if (
            room.roomCode.toLowerCase().includes(input) ||
            room.description.toLowerCase().includes(input)
          ) {
            // Map room to suggestion
            const suggestion: Suggestion = {
              description: room.description,
              roomCode: room.roomCode,
              // Add other properties as needed
            };
            filteredSuggestions.push(suggestion);
          }
        }
      }
    }
    // Set suggestions state
    setSuggestions(filteredSuggestions);
    onSuggestionsUpdate(filteredSuggestions);
  };

  keyboardRef.current = internalKeyboardRef.current;

  return (
    <div className="w-full h-full flex justify-center">
      <Keyboard
        keyboardRef={(r) => (internalKeyboardRef.current = r)}
        layoutName={layoutName}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default KeyboardWrapper;

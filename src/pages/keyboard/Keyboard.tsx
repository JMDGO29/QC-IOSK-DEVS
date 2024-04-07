import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { KeyboardRef } from "../Search";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/utils/firebase";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: React.MutableRefObject<KeyboardRef | undefined>;
  onFilteredRoomsChange: (filteredRooms: Room[]) => void;
}

interface Room {
  id: string;
  buildingName: string;
  floorLevel: string;
  roomCode: string;
  roomName: string;
  distance: string;
  eta: string;
  squareMeter: string;
  status: string;
  roomAnimation: string;
  voiceGuide: string;
  textGuide: string;
}

interface Suggestion {
  roomCode: string;
  // Add other properties as needed
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  onFilteredRoomsChange,
}) => {
  const [layoutName, setLayoutName] = useState("default");
  const internalKeyboardRef = useRef<any>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const roomsCollection = collection(db, "roomData");
      const roomsSnapshot = await getDocs(roomsCollection);
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
    } else if (button === "{enter}") {
      const inputValue = internalKeyboardRef.current.getInput();
      console.log("Input value:", inputValue);

      if (rooms.length > 0) {
        const filteredRooms = rooms.filter(
          (room) =>
            (room.roomCode &&
              room.roomCode.toLowerCase().includes(inputValue)) ||
            (room.roomName && room.roomName.toLowerCase().includes(inputValue))
        );

        setFilteredRooms(filteredRooms); // Update filtered rooms
        onFilteredRoomsChange(filteredRooms); // Call callback function
        console.log(filteredRooms);
      }
    }
  };

  const onChangeInput = (input: string) => {
    onChange(input); // Update input state
    const inputValue = input.toLowerCase();
    const filteredRooms = rooms.filter(
      (room) =>
        (room.roomCode && room.roomCode.toLowerCase().includes(inputValue)) ||
        (room.roomName && room.roomName.toLowerCase().includes(inputValue))
    );
    onFilteredRoomsChange(filteredRooms); // Update filtered rooms
  };

  keyboardRef.current = internalKeyboardRef.current;

  return (
    <div className="flex justify-center w-full h-full">
      <Keyboard
        keyboardRef={(r) => (internalKeyboardRef.current = r)}
        layoutName={layoutName}
        onKeyPress={onKeyPress}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default KeyboardWrapper;
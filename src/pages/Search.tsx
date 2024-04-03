import React, {
  useState,
  ChangeEvent,
  useRef,
  Suspense,
  useEffect,
} from "react";
import { IonContent, IonPage } from "@ionic/react";
import "react-simple-keyboard/build/css/index.css";
import Backbtn from "../components/navigation/Backbtn";
import "../assets/css/search.css";
import "../assets/css/keyboard.css";
import KeyboardWrapper from "./keyboard/Keyboard";
import Animation from "../components/campus/sanBartolome/animation/Animation";
import SideBar from "../components/sidebar/sidebarLayout";
import WidgetPanel from "../components/widgets/widgetPanel";
import Loading from "../pages/loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../components/utils/firebase";

export interface KeyboardRef {
  setInput: (input: string) => void;
  // Add other methods if needed
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

const SearchTab: React.FC = () => {
  const [input, setInput] = useState("");
  const [selectedModelPath, setSelectedModelPath] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const keyboard = useRef<KeyboardRef | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Fetch data when component mounts
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

  const onChangeInput = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const input = event.target.value.toLowerCase();
    setInput(input);
    keyboard.current?.setInput(input);

    // Filter room names based on input
    const filteredSuggestions: Suggestion[] = [];
    // Filter and map rooms to suggestions
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
  };

  const onSuggestionsUpdate = (suggestions: Suggestion[]) => {
    // Update suggestions state
    setSuggestions(suggestions);
  };

  const clickSearch = () => {
    setIsAnimationActive(false);

    return;
  };

  const handleSearchBarClick = () => {
    setIsClicked(true);
  };

  const handleSearchBarBlur = () => {
    setIsClicked(false);
  };

  const handleSuggestionClick = async (selectedRoom: Suggestion) => {
    try {
      const roomsCollection = collection(db, "roomData");
      const q = query(roomsCollection);

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const roomData = doc.data() as Room;
          const roomAnimation = findRoomAnimation(
            roomData,
            selectedRoom.roomCode
          );
          if (roomAnimation !== null) {
            console.log("Room Animation:", roomAnimation);
            setSelectedModelPath(roomAnimation); // Set selectedModelPath with roomAnimation
            setIsAnimationActive(true);
          }
        });
      } else {
        console.log("No rooms found.");
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const findRoomAnimation = (roomData: Room, roomCode: string) => {
    for (const floorName in roomData.floors) {
      const floor = roomData.floors[floorName];
      for (const roomCodeMap in floor) {
        if (roomCodeMap === roomCode) {
          return floor[roomCodeMap].roomAnimation;
        }
      }
    }
    return null; // Room not found
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <>
          {selectedModelPath && isAnimationActive ? (
            <>
              <Animation
                name={""}
                roomName={selectedRoom}
                modelPath={selectedModelPath}
                voice={selectedVoice}
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                selectedRoom={selectedRoom}
              />
              <button
                onClick={clickSearch}
                className="absolute z-10 mt-10 btn btn-secondary ml-60"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <div className="h-screen overflow-hidden">
                <div className="relative overflow-hidden ">
                  <div className="px-4 py-10 mx-auto max-w-screen sm:px-6 lg:px-8 sm:py-5">
                    <div className="text-center mt-[10px]">
                      <h1 className="w-screen text-4xl font-bold text-center text-white sm:text-6xl">
                        Search
                      </h1>
                      <br />

                      <div className="z-50 flex-col items-center justify-center w-screen h-screen ">
                        <div className="flex items-center justify-center w-screen ">
                          <div className="w-5/12">
                            <input
                              value={input}
                              placeholder={
                                "Tap on the virtual keyboard to start"
                              }
                              onChange={(e) => onChangeInput(e)}
                              onClick={handleSearchBarClick}
                              onBlur={handleSearchBarBlur}
                              className="z-50 w-full h-16 p-5 text-black bg-white outline-none rounded-3xl"
                            />
                          </div>
                        </div>
                        {/* Suggestions Section */}
                        {input && (
                          <div className="flex items-center justify-center w-screen py-2 -mt-7 ">
                            <div className="w-5/12 h-auto bg-white  rounded-b-3xl">
                              {suggestions.length > 0 ? (
                                <div className="w-full h-56 py-6 overflow-auto">
                                  <h1 className="text-black">Result:</h1>
                                  <ul>
                                    {suggestions.map((room, index) => (
                                      <li key={index}>
                                        <button
                                          onClick={() =>
                                            handleSuggestionClick(room)
                                          }
                                          className="btn btn-secondary w-auto m-1"
                                        >
                                          {room.description || room.roomCode}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <div className="w-full h-56 py-6 overflow-auto">
                                  <h1 className="text-black">
                                    No rooms found.
                                  </h1>
                                  <h1 className="text-black">
                                    Enter another entry.
                                  </h1>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="sticky flex items-center justify-center w-screen bottom-10 ">
                          <div className="w-5/12 h-auto mt-56  ">
                            <KeyboardWrapper
                              keyboardRef={keyboard}
                              onChange={setInput}
                              onSuggestionsUpdate={onSuggestionsUpdate}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Backbtn name={"Back"} /> */}
            </>
          )}

          <div className="absolute top-0 left-0 z-50 ">
            <SideBar />
          </div>
          <div className="absolute top-0 right-0 z-50 ">
            <WidgetPanel name={""} />
          </div>
        </>
      </IonContent>
    </IonPage>
  );
};

export default SearchTab;

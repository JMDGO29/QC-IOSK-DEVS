import React, { useState, ChangeEvent, useRef, useEffect, Suspense } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "react-simple-keyboard/build/css/index.css";
import Backbtn from "../components/navigation/Backbtn";
import "../assets/css/search.css";
import "../assets/css/keyboard.css";
import KeyboardWrapper from "./keyboard/Keyboard";
import Animation from "../components/campus/sanBartolome/animation/Animation";
import Loading from "./loading"; // Import your loading component here
import {
  DocumentData,
  Query,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import firebaseConfig, { db } from "../components/utils/firebase";
import { initializeApp } from "firebase/app";

export interface KeyboardRef {
  setInput: (input: string) => void;
  // Add other methods if needed
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
  textGuide: string[];
}

interface Search {
  id: string;
  selectedBuilding: string;
  selectedFloor: string;
  roomCode: string;
  roomAnimation: string;
  selectedRoomName: string;
  selectedTextGuide: string[];
  selectedVoiceGuide: string;
}


interface RoomData {
  buildingName: string;
  roomCode: string;
  roomName: string;
  floorLevel: string;
  roomAnimation: string;
  voiceGuide: string;
  textGuide: string[];
}

const SearchTab: React.FC = () => {
  const [input, setInput] = useState("");
  const [selectedModelPath, setSelectedModelPath] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const keyboard = useRef<KeyboardRef | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [selectedTextGuide, setSelectedTextGuide] = useState<string[]>([""]);
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [recentRoomCodes, setRecentRoomCodes] = useState<RoomData[]>([]);
  useEffect(() => {
    // Fetch data when component mounts
    fetchRooms();
  }, []);

  const fetchRecentRoomCodes = async (): Promise<RoomData[]> => {
    try {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const roomsCollection = collection(db, "visitorData2");
      const queryRoom = query(
        roomsCollection,
        where("createdAt", ">=", startOfDay),
        where("createdAt", "<", endOfDay),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const roomsSnapshot = await getDocs(queryRoom);

      if (!roomsSnapshot.empty) {
        const recentRoomData: RoomData[] = []; // Specify RoomData type
        roomsSnapshot.docs.forEach((doc) => {
          const roomData = doc.data() as Search;
          recentRoomData.push({
            roomCode: roomData.roomCode,
            roomName: roomData.selectedRoomName,
            buildingName: roomData.selectedBuilding,
            floorLevel: roomData.selectedFloor,
            roomAnimation: roomData.roomAnimation,
            voiceGuide: roomData.selectedVoiceGuide,
            textGuide: roomData.selectedTextGuide,
            // Include selected room name
          });
        });
        return recentRoomData; // Return array of recent room data
      } else {
        console.log("No rooms found.");
        return []; // Return an empty array if no rooms found
      }
    } catch (error) {
      console.error("Error fetching recent room data:", error);
      return []; // Return an empty array if an error occurs
    }
  };

  useEffect(() => {
    const fetchRecentCodes = async () => {
      const recentRoomData = await fetchRecentRoomCodes();
      setRecentRoomCodes(recentRoomData);
    };
    fetchRecentCodes();
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
      setLoading(false); // Set loading to false once data is fetched
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

    if (rooms.length > 0) {
      const filteredRooms = rooms.filter(
        (room) =>
          (room.roomCode && room.roomCode.toLowerCase().includes(input)) ||
          (room.roomName && room.roomName.toLowerCase().includes(input)) ||
          (room.buildingName && room.buildingName.toLowerCase().includes(input))
      );

      setFilteredRooms(filteredRooms);
    }
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
    if (!input) {
      setFilteredRooms([]);
    }
  };

  const handleSuggestionClick = async (
    roomCode: string,
    roomName: string,
    floorLevel: string,
    roomAnimation: string,
    voiceGuide: string,
    buildingName: string,
    textGuide: string[],
  ) => {
    const now = serverTimestamp();
    if (roomCode) {
      setSelectedRoom(roomCode);
      setSelectedRoomName(roomName);
      setSelectedFloor(floorLevel);
      setSelectedBuilding(buildingName);
      setSelectedModelPath(roomAnimation);
      setSelectedVoice(voiceGuide);
      setSelectedTextGuide(textGuide);
      setIsAnimationActive(true);

      if (roomAnimation) {
        const firestore = getFirestore(initializeApp(firebaseConfig));
        const roomRef = collection(firestore, "visitorData2");
        await addDoc(roomRef, {
          roomCode: roomCode,
          selectedRoomName: roomName,
          selectedFloor: floorLevel,
          selectedBuilding: buildingName,
          roomAnimation: roomAnimation,
          selectedTextGuide: textGuide,
          selectedVoiceGuide: voiceGuide,
          createdAt: now,
        });
      }
    } else {
      console.error("No room selected.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        {loading ? ( // Render loading component if loading is true
          <div className="h-screen overflow-hidden">
            <div className="relative overflow-hidden ">
              <div className="max-h-screen px-4 mx-auto max-w-screen sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center w-screen h-screen text-center mt-72">
                  <h1 className="w-screen text-4xl font-bold text-center text-white sm:text-6xl">
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                      <div className="w-56 skeleton h-14"></div>
                    </div>
                  </h1>

                  <div className="z-50 flex-col items-center justify-center w-screen h-screen ">
                    <div className="flex items-start justify-center w-screen space-x-3 ">
                      <div className="flex flex-col w-5/12 space-y-3 ">
                        <div className="w-full">
                          <div className="w-full h-16 skeleton"></div>
                        </div>

                        <div className="w-full">
                          <div className="w-auto h-auto bg-white rounded-3xl">
                            <div className="w-full h-64 skeleton"></div>
                          </div>
                        </div>
                      </div>
                      {input && (
                        <div className="w-96">
                          <div className="h-auto p-3 bg-white w-96 rounded-xl">
                            {filteredRooms.length > 0 ? (
                              <div className="w-full py-6 overflow-auto h-96">
                                <h1 className="text-base-content">Result:</h1>
                                <ul className="px-1 space-y-1">

                                </ul>
                              </div>
                            ) : (
                              <div className="w-full h-full py-6 overflow-auto">
                                <h1 className="text-base-content">
                                  No rooms found.
                                </h1>
                                <h1 className="text-base-content">
                                  Enter another entry.
                                </h1>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Your content here */}
            {selectedModelPath && isAnimationActive ? (
              <Suspense fallback={<Loading />}>

                <Animation
                  name={""}
                  roomName={selectedRoomName}
                  modelPath={selectedModelPath}
                  voice={selectedVoice}
                  selectedBuilding={selectedBuilding}
                  selectedFloor={selectedFloor}
                  selectedRoom={selectedRoom}
                  textGuide={selectedTextGuide || []}
                />
                {/* <button
                  onClick={clickSearch}
                  className="absolute z-10 mt-10 btn btn-secondary ml-60"
                >
                  Back
                </button> */}
              </Suspense>
            ) : (
              <>
                {/* Your content here */}


                <div className="w-screen h-screen overflow-hidden">
                  <div className="relative w-screen h-fit">
                    <div className="w-screen max-h-screen mx-auto max-w-screen">
                      <div className="flex flex-col items-center justify-center w-screen h-screen text-center ">


                        <div className="z-50 w-screen h-screen">
                          <div className="flex items-center justify-end w-screen space-x-96 ">
                            <div className="flex flex-col items-center justify-center w-5/12 space-y-3 ">
                              <h1 className="w-full text-4xl font-bold text-center text-white sm:text-6xl">
                                Search
                              </h1>
                              <div className="w-full">
                                <input
                                  value={input}
                                  placeholder={"Are you looking for something?"}
                                  onChange={(e) => onChangeInput(e)}
                                  onClick={handleSearchBarClick}
                                  onBlur={handleSearchBarBlur}
                                  className="z-50 w-full h-16 p-5 bg-white outline-none text-base-content rounded-xl"
                                />
                              </div>



                              <div className="w-full">
                                <div className="w-auto h-auto bg-white rounded-3xl">
                                  <KeyboardWrapper
                                    keyboardRef={keyboard}
                                    onChange={setInput}
                                    onFilteredRoomsChange={setFilteredRooms}
                                  />
                                </div>
                              </div>
                            </div>


                            <div className="w-3/12 h-screen bg-white">
                              <div className="w-full h-full p-3 bg-white shadow-inner rounded-3xl">
                                {input && filteredRooms.length > 0 ? (
                                  <div className="w-full h-full py-6 pt-0 overflow-auto">
                                    <div className="bg-base-100 w-[448px] h-20 fixed -z-1">
                                      <h1 className="text-4xl font-bold text-base-content">Result:</h1>
                                    </div>
                                    <ul className="px-1 space-y-3 mt-28">
                                      {filteredRooms
                                        .sort((a, b) => a.roomCode.localeCompare(b.roomCode))
                                        .map((room, index) => (
                                          <li key={index} className="space-y-3">
                                            <button
                                              className="h-24 text-left shadow-inner btn btn-block btn-primary rounded-3xl"
                                              onClick={() =>
                                                handleSuggestionClick(
                                                  room.roomCode,
                                                  room.roomName,
                                                  room.floorLevel,
                                                  room.roomAnimation,
                                                  room.voiceGuide,
                                                  room.buildingName,
                                                  room.textGuide
                                                )
                                              }
                                            > {room.roomCode === "" ||
                                              room.roomName === "" ? (
                                              <> {room.buildingName}</>
                                            ) : (
                                              <>
                                                <div className="flex flex-col justify-start w-full ">
                                                  <div className="flex justify-between space-x-3 text-sm">
                                                    <div className="flex space-x-3 text-sm">
                                                      <div>{room.buildingName}</div>
                                                      <div>{room.floorLevel}</div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-center">
                                                      <div className="badge badge-md">{room.roomCode}</div>
                                                    </div>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <div className="text-xl">{room.roomName}</div>{" "}

                                                  </div>
                                                </div>
                                              </>
                                            )}

                                            </button>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                ) : (
                                  <div className="w-full h-full p-3 space-y-10 overflow-auto rounded-3xl">
                                    {!input ? ( // Display "Search Suggestions" when input is cleared
                                      <>
                                        <div className="flex flex-col justify-between h-full">
                                          {recentRoomCodes.length > 0 && (
                                            <div>
                                              <div className="bg-base-100 w-[400px] h-20 sticky top-2 -z-1">
                                                <h1 className="text-4xl font-bold text-base-content">Recent Search</h1>
                                              </div>
                                              <ul className="flex flex-col justify-center space-y-3">
                                                {recentRoomCodes
                                                  .filter(
                                                    (room, index, self) =>
                                                      index ===
                                                      self.findIndex(
                                                        (r) => r.roomCode === room.roomCode
                                                      )
                                                  )
                                                  .map((room, index) => (
                                                    <li key={index} className="space-y-3">
                                                      <button
                                                        className="h-16 text-xl btn btn-block rounded-2xl btn-success"
                                                        onClick={() =>
                                                          handleSuggestionClick(
                                                            room.roomCode,
                                                            room.roomName,
                                                            room.floorLevel,
                                                            room.roomAnimation,
                                                            room.voiceGuide,
                                                            room.buildingName,
                                                            room.textGuide
                                                          )
                                                        }
                                                      >
                                                        {room.roomCode} - {room.roomName}
                                                      </button>
                                                    </li>
                                                  ))}
                                              </ul>
                                            </div>
                                          )}
                                          <div>
                                            <div className="bg-base-100 w-[400px] sticky top-2 -z-1">
                                              <h1 className="text-4xl font-bold text-base-content">Search Suggestions</h1>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                              {rooms.map((room, index) => (
                                                <div key={index} className="space-y-3">
                                                  {(room.roomName === "NSTP" ||
                                                    room.roomName === "SASD" ||
                                                    room.roomName === "Admission Office" ||
                                                    room.roomName ===
                                                    "College of Computer Studies" ||
                                                    room.roomName === "Registrar Office") && (
                                                      <button
                                                        className="h-16 my-2 text-xl btn btn-block rounded-2xl btn-primary"
                                                        onClick={() => handleSuggestionClick(
                                                          room.roomCode,
                                                          room.roomName,
                                                          room.floorLevel,
                                                          room.roomAnimation,
                                                          room.voiceGuide,
                                                          room.buildingName,
                                                          room.textGuide
                                                        )}
                                                      >
                                                        {room.roomName}
                                                      </button>
                                                    )}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>


                                      </>
                                    ) : (
                                      // Display "Nothing's found" message when input is not empty but no results are found
                                      <>
                                        <div className="bg-base-100 w-[400px] h-20 -z-1">
                                          <h1 className="text-4xl font-bold text-base-content">Result:</h1>
                                        </div>
                                        <ul className="flex flex-col items-center justify-center px-10 space-y-3 mt-88">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-400">
                                            <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                            <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                            <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                                            <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                                          </svg>
                                          <h1 className="font-semibold text-base-content">Sorry, We can't find your request.</h1>
                                          <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can double check and try again.</p>
                                        </ul>

                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>





                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute z-50 top-5 left-5">
                <Backbtn name={"Back"} />
                </div>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchTab;

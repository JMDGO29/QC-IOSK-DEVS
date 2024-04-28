import React, { useState, useEffect, Suspense } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Switch, Route } from "react-router-dom";
import { themeChange } from "theme-change";
import { Icon } from "@iconify/react";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";
import { Analytics } from "@vercel/analytics/react";
import SanBartolome from "../components/campus/sanBartolome/SanBartolome";
import Batasan from "../components/campus/batasan/Batasan";
import SanFrancisco from "../components/campus/sanFrancisco/SanFrancisco";
import qcuLogo from "../assets/imgs/logo/qculogo.png";
import bg from "../assets/imgs/sc-bg.png";
import "../assets/css/marquee.css";
import { addDoc, collection, getDocs, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../components/utils/firebase";
import Modal from 'react-modal';
import Animation from "../components/campus/sanBartolome/animation/Animation";

// Import your other components here

interface ContainerProps {
  name: string;
  buildingName: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  endDate: string;
  status: string;
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

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    zIndex: '1000' // Ensure overlay is above other content
  },
  content: {
    width: '20%', // Adjust the width as needed
    height: '85%', // Adjust the height as needed
    padding: '20px', // Adjust the padding as needed
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)' // Translate back to center
  }
};

const Layout: React.FC<ContainerProps> = ({ name }) => {
  // State to manage inactivity for showing the ScreenSaver
  const [isActive, setIsActive] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const [searchValue, setSearchValue] = useState(""); 
  const [searchResult, setSearchResult] = useState([] as Room[]);
  const [displayButton, setDisplayButton] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [personName, setPersonName] = useState("");
  const [personDetail, setPersonDetail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [personToMeet, setPersonToMeet] = useState("");
  const [roomName, setRoomName] = useState("");

  const [roomAnimation, setRoomAnimation] = useState("");
  const [voiceGuide, setVoiceGuide] = useState("");
  const [textGuide, setTextGuide] = useState([""]);
  const [buildingName, setBuildingName] = useState("");
  const [floorLevel, setFloorLevel] = useState("");
  const [roomCode, setRoomCode] = useState("");



  useEffect(() => {
    setModalIsOpen(true);
  }, []);

  useEffect(() => {
    // Set a timeout to change isActive to true after 1 minute (30000 milliseconds)
    const timeoutId = setTimeout(() => {
      setIsActive(true);
    }, 10000); // 1 minute timeout

    return () => clearTimeout(timeoutId);
  }, []);

  // Function to handle click event to exit the ScreenSaver
  const handleClick = () => {
    setIsActive(false);
  };

  const handleButtonClick = async () => {
    try {
       // Check if personName is empty
        if (!personName.trim()) {
          alert("Before that. Please complete the form, thank you.");
          return;
        }

        if (!personDetail.trim()) {
          alert("Before that. Please complete the form, thank you.");
          return;
        }

        if (!purpose.trim()) {
          alert("Before that. Please complete the form, thank you.");
          return;
        }

        const now = serverTimestamp();
        // Save the search result data to the "visitorData2" collection
        const visitorDataRef = collection(db, "visitorData2");
        await addDoc(visitorDataRef, {
            personName: personName,
            personDetail: personDetail,
            purpose: purpose,
            personToMeet: personToMeet,
            status: selectedStatus,
            selectedRoomName: roomName,
            roomAnimation: roomAnimation,
            selectedVoiceGuide: voiceGuide,
            selectedTextGuide: textGuide,
            selectedBuilding: buildingName,
            selectedFloor: floorLevel,
            roomCode: roomCode,
            createdAt: now,
            // Add other fields if necessary
        });
        console.log("Data saved to visitorData2 collection successfully!");
        
        setIsAnimationVisible(true);
        setModalIsOpen(false);
        setIsActive(false);
        
    } catch (error) {
        console.error("Error saving data to visitorData2 collection: ", error);
    }
};

  useEffect(() => {
    let unsubscribeAnnouncements: () => void;

    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
        const queryAnnouncement = query(announcementsCollection);

        unsubscribeAnnouncements = onSnapshot(
          queryAnnouncement,
          (querySnapshot) => {
            const announcementData = querySnapshot.docs
              .map((doc) => {
                const data = doc.data();
                const announcement: Announcement = {
                  id: doc.id,
                  name: data.name,
                  announcementSource: data.announcementSource,
                  announcementDesc: data.announcementDesc,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  status: data.status,
                };
                return announcement;
              })
              .filter(
                (announcement) => announcement.status !== "not available"
              );
            setAnnouncements(announcementData);
          }
        );
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();

    return () => {
      if (unsubscribeAnnouncements) {
        unsubscribeAnnouncements();
      }
    };
  }, []);

  useEffect(() => {
    // Initialize an unsubscribe function
    let unsubscribe: (() => void) | undefined;

    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, "roomData");
        const queryRoom = query(roomsCollection);

        // Subscribe to real-time updates
        unsubscribe = onSnapshot(queryRoom, (snapshot) => {
          const roomsData = snapshot.docs.map((doc) => {
            const roomData = doc.data() as Room;
            return { ...roomData, id: doc.id } as Room;
          });
          setRooms(roomsData);
        });
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();

    // Return the cleanup function to unsubscribe when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleSearch = async () => {
    try {
      const roomsCollection = collection(db, "roomData");
      let queryRoom;
  
      // Check if searchValue is empty, fetch all rooms
      if (!searchValue) {
        alert("For successful navigation. Please enter destination on search.");
        queryRoom = query(roomsCollection);
      } else {
        // Fetch all rooms and filter based on searchValue
        const snapshot = await getDocs(query(roomsCollection));
        const roomsData = snapshot.docs.map((doc) => {
          const roomData = doc.data() as Room;
          return { ...roomData, id: doc.id } as Room;
        });
        
        const searchValueLower = searchValue.toLowerCase(); // Convert searchValue to lowercase
        

        // Check if the searchValue matches any room's name or code exactly
        const exactMatchRoom = roomsData.find(room => 
          room.roomCode.toLowerCase() === searchValueLower || // Check for exact match of roomCode
          room.roomName.toLowerCase() === searchValueLower // Check for exact match of roomName
        );

        // Display button if there's an exact match
        if (exactMatchRoom) {
          setDisplayButton(true);
          console.log("Exact match found:", exactMatchRoom);

          // Pass the values to <Animation> component
          setRoomName(exactMatchRoom.roomName);
          setRoomAnimation(exactMatchRoom.roomAnimation);
          setVoiceGuide(exactMatchRoom.voiceGuide);
          setTextGuide(exactMatchRoom.textGuide || []);
          setBuildingName(exactMatchRoom.buildingName);
          setFloorLevel(exactMatchRoom.floorLevel);
          setRoomCode(exactMatchRoom.roomCode);
        } else {
          setDisplayButton(false);
          alert("No exact match found for the search value. Please try again.");
        }

        
      }
    } catch (error) {
      console.error("Error searching rooms: ", error);
    }
  };  

  const handleStatutsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedStatus(selected);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* <Analytics /> */}
        {isAnimationVisible ? (
          <Suspense fallback={<Loading />}>
            <Animation
              name={""}
              roomName={roomName || ""}
              modelPath={roomAnimation}
              voice={voiceGuide}
              textGuide={textGuide || []}
              selectedBuilding={buildingName}
              selectedFloor={floorLevel}
              selectedRoom={roomCode || ""}
            />
          </Suspense>
        ) : (
          <>
            <div className="marquee-container">
              <div className="marquee absolute z-50 top-8 left-28">
                <span>
                  {announcements
                    .filter((announcement) => {
                      // Filter announcements whose end date is near (e.g., within 7 days)
                      const endDate = new Date(announcement.endDate);
                      const currentDate = new Date();
                      const differenceInDays = Math.ceil(
                        (endDate.getTime() - currentDate.getTime()) /
                          (1000 * 3600 * 24)
                      );
                      return differenceInDays <= 1; // You can adjust the threshold as needed
                    })
                    .map(
                      (announcement, index) =>
                        `${announcement.announcementSource} - ${announcement.announcementDesc}`
                    )
                    .join(" ----------------------- ")}
                </span>
              </div>
            </div>
            <div className="absolute z-50 bottom-40 right-80 ">
              <div className="">
                <ToastContainer className="mb-1" newestOnTop />
              </div>
            </div>
            <div className="absolute top-0 left-0 z-50 ">
              <Sidebar />
            </div>
            <div className="absolute top-0 right-0 z-50 ">
              <WidgetPanel name={""} />
            </div>
            {/* Conditionally render ScreenSaver based on isActive state */}
            {isActive && (
              <div className="absolute z-50">
                <section
                  onClick={handleClick}
                  className="w-screen h-full min-h-screen overflow-hidden text-center cursor-pointer bg-sc place-items-stretch"
                >
                  {/* Your ScreenSaver content here */}
                  <div className="z-50 flex items-center justify-center w-screen h-screen skeleton bg-base-100">
                    <div className="grid items-center grid-cols-3 grid-rows-3">
                      <div className="flex content-center justify-center w-screen h-screen col-span-3 row-span-3">
                        <div className="content-center">
                          <div id="scsaver" className="scsaver">
                            <div className="scsaver-inner text-base-content">
                              <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                                <div className="grid gap-40 md:grid-cols-5">
                                  <div className="md:col-span-2">
                                    <div className="max-w-lg">
                                      <img
                                        src={qcuLogo}
                                        className="w-40 h-40"
                                      />
                                      <h2 className="text-4xl font-bold text-left md:text-4xl md:leading-tight">
                                        QUEZON CITY UNIVERSITY
                                        <br />
                                      </h2>
                                      <p className="hidden mt-1 text-3xl text-left text-base-content md:block">
                                        Offered Courses
                                      </p>
                                    </div>
                                    <div className="absolute inset-x-0 flex items-center justify-center py-3 text-xl animate-bounce bottom-1 drop-shadow-md">
                                      Touch anywhere to return
                                    </div>
                                  </div>

                                  <div className="md:col-span-3">
                                    <div className="space-y-3">
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science and Accountancy
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in
                                          Entrepreneurship
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Electronics
                                          Engineering
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Industrial
                                          Engineering
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Information
                                          Technology
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Management
                                          Accounting
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Early Childhood
                                          Education
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Information
                                          Systems
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                      <div
                                        className=" hs-accordion active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                      >
                                        <button
                                          className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                          Bachelor of Science in Computer
                                          Science
                                        </button>
                                        <div
                                          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Rendering selected option */}
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/SanBartolome" component={SanBartolome} />
                {/* <Route path="/Batasan" component={Batasan} />
            <Route path="/SanFrancisco" component={SanFrancisco} /> */}
              </Switch>
            </Suspense>

            {/* Modal */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={modalStyle}
            >
              <div className="ml-5">
                {/* Modal content */}
                <h2>Welcome to QC-IOSK</h2>
                <p>Please fill up the necessary details.</p>
                <br />
                <p>Category</p>
                <select
                  className="w-full max-w-xs input input-bordered"
                  value={selectedStatus || status}
                  onChange={handleStatutsChange}            
                >
                  <option value="">Please select category</option>
                  <option value="Student">QCU student</option>
                  <option value="Employee">QCU Employee</option>
                  <option value="Visitor">Visitor</option>
                </select>
                <br />
                <br />
                <p>Name:</p>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="What is your name?"                
                />
                <br />
                <br />
                {selectedStatus === "Student" && (
                    <>
                      <p>Student ID</p>
                      <input
                        type="text"
                        value={personDetail}
                        onChange={(e) => setPersonDetail(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Type your Student ID here"
                      />
                      <br/>
                      <br/>
                    </>
                  )}
                {selectedStatus === "Employee" && (
                  <>
                    <p>Work</p>
                    <input
                      type="text"
                      value={personDetail}
                      onChange={(e) => setPersonDetail(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                      placeholder="Type your work here"                    
                    />
                    <br/>
                    <br/>
                  </>
                )}
                <p>Purpose:</p>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="What is your purpose here?"
                />
                <br />
                <br />
                <p>Person to meet:</p>
                <input
                  type="text"
                  value={personToMeet}
                  onChange={(e) => setPersonToMeet(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Leave blank if not applicable"
                />
                <br />
                <br />
                <p>Destination:</p>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Where do you want to go from here?"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <br />
                {displayButton && (
                  <>
                    {" "}
                    <button className="btn" onClick={handleButtonClick}>
                      Click me to navigate!
                    </button>
                  </>
                )}
                <br />
                <br />
                <button onClick={handleSearch} className="btn btn-secondary">
                  Search
                </button>{" "}
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="btn btn-primary"
                >
                  Close Modal
                </button>
              </div>
            </Modal>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Layout;

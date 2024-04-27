import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSidebar from "./constant/adminSidebar";
import AdminHeader from "./constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import AdminLayout from "./constant/layout";
import Chart from "chart.js/auto";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Import firestore to use Firestore
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
  MRT_Row,
} from "material-react-table";
import { endOfDay, format, startOfDay } from "date-fns";
import BuildingVisitorChart from "./buildingVisitorChart";
import { jsPDF } from "jspdf";
import { Box, Button } from "@mui/material";
import autoTable from "jspdf-autotable";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface ContainerProps {
  name: string;
}

interface Visitor {
  id: string;
  selectedBuilding: string;
  selectedFloor: string;
  roomCode: string;
  selectedRoomName: string;
  selectedTextGuide: string;
  selectedVoiceGuide: string;
  roomAnimation: string;
  createdAt: firebase.firestore.Timestamp;
  createdAtTime: firebase.firestore.Timestamp;
}

interface Event {
  id: string;
  name: string;
  eventSource: string;
  organizerImageUrl: string;
  eventDesc: string;
  eventPlace: string;
  imageUrl: string;
  startDate: string;
  startTime: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  startTime: string;
}

const Dashboard: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalAnnouncements, setTotalAnnouncements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);

  const [startDate, setStartDate] = useState<Date | null>(
    startOfDay(new Date())
  );
  const [endDate, setEndDate] = useState<Date | null>(endOfDay(new Date()));
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [totalVisitorsToday, setTotalVisitorsToday] = useState<number>(0);
  const [totalVisitorsCount, setTotalVisitorsCount] = useState<number>(0);

  const chartRef = useRef<Chart | null>(null);
  const [filter, setFilter] = useState<string>("today");
  const [unsubscribeVisitors, setUnsubscribeVisitors] = useState<() => void>(
    () => () => {}
  );
  const [buildingData, setBuildingData] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        history.push("/Dashboard");
      } else {
        // User is signed out
        // ...
        history.push("/Login");
      }
    });
  }, []);

  const fetchData = async (filter: string) => {
    try {
      const visitorsCollection = collection(db, "visitorData2");
      let startDate: any;
      let endDate: any;
      if (filter === "today") {
        const today = new Date();
        // Set startDate to the beginning of today
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        // Set endDate to the end of today
        endDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        );
      } else if (filter === "weekly") {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        endDate = new Date();
      } else if (filter === "monthly") {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        endDate = new Date();
      } else if (filter === "yearly") {
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        endDate = new Date();
      }

      const q = query(
        visitorsCollection,
        where("createdAt", ">=", startDate),
        where("createdAt", "<", endDate)
      );

      const querySnapshot = await getDocs(q);
      const visitorsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const visitor: Visitor = {
          id: doc.id,
          selectedBuilding: data.selectedBuilding,
          selectedFloor: data.selectedFloor,
          roomCode: data.roomCode,
          selectedRoomName: data.selectedRoomName,
          roomAnimation: data.roomAnimation,
          selectedTextGuide: data.selectedTextGuide,
          selectedVoiceGuide: data.selectedVoiceGuide,
          createdAt: data.createdAt,
          createdAtTime: data.createdAAt,
        };
        return visitor;
      });

      // Filter visitorsData to include only today's data or weekly, monthly, yearly as per filter
      let filteredData = visitorsData;
      if (filter === "today") {
        // Filter for today's data based on createdAt timestamp
        filteredData = visitorsData.filter((visitor) => {
          const visitorDate = visitor.createdAt.toDate();
          return visitorDate >= startDate && visitorDate < endDate;
        });
      }
      // Similarly add logic for weekly, monthly, yearly filtering

      setVisitors(filteredData);
      setLoading(false);
      // Update building data
      updateBuildingData(filteredData);

      // Set total visitors for the selected filter
      setTotalVisitorsCount(filteredData.length);
    } catch (error) {
      console.error("Error fetching visitors: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filter);

    return () => {
      unsubscribeVisitors();
    };
  }, [filter]);

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    fetchData(selectedFilter);
  };

  // FOR BAR CHART
  useEffect(() => {
    let unsubscribeVisitors: () => void;

    const fetchVisitors = async () => {
      try {
        const visitorsCollection = collection(db, "visitorData2");
        const q = query(visitorsCollection);

        unsubscribeVisitors = onSnapshot(q, (querySnapshot) => {
          const visitorsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const visitor: Visitor = {
              id: doc.id,
              selectedBuilding: data.selectedBuilding,
              selectedFloor: data.selectedFloor,
              roomCode: data.roomCode,
              selectedRoomName: data.selectedRoomName,
              roomAnimation: data.roomAnimation,
              selectedTextGuide: data.selectedTextGuide,
              selectedVoiceGuide: data.selectedVoiceGuide,
              createdAt: data.createdAt,
              createdAtTime: data.createdAt,
            };
            return visitor;
          });

          // Filter visitorsData to include only today's data
          const today = new Date();
          const todayData = visitorsData.filter((visitor) => {
            const visitorDate = visitor.createdAt.toDate();
            return (
              visitorDate.getDate() === today.getDate() &&
              visitorDate.getMonth() === today.getMonth() &&
              visitorDate.getFullYear() === today.getFullYear()
            );
          });

          // Set total visitors for today
          setTotalVisitorsCount(todayData.length);

          setVisitors(todayData);
          setLoading(false);
          // Update building data
          updateBuildingData(todayData);
        });
      } catch (error) {
        console.error("Error fetching visitors: ", error);
        setLoading(false);
      }
    };

    fetchVisitors();

    return () => {
      if (unsubscribeVisitors) {
        unsubscribeVisitors();
      }
    };
  }, []);

  useEffect(() => {
    // Update building data whenever visitors change
    updateBuildingData(visitors);
  }, [visitors]);

  const updateBuildingData = (data: Visitor[]) => {
    const buildingCounts: { [key: string]: number } = {};

    data.forEach((visitor) => {
      buildingCounts[visitor.roomCode] =
        (buildingCounts[visitor.roomCode] || 0) + 1;
    });

    setBuildingData(buildingCounts);
  };

  const chartData = useMemo(() => {
    const sortedData = Object.entries(buildingData).sort(
      ([, countA], [, countB]) => countB - countA
    );

    const labels = sortedData.map(([building]) => building);
    const data = sortedData.map(([, count]) => count);

    return {
      labels,
      datasets: [
        {
          label: "Search Counts by Room",
          data,
          backgroundColor: [
            // "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            // "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [buildingData]);

  useEffect(() => {
    // Create and update Chart.js chart
    const ctx = document.getElementById("visitorChart") as HTMLCanvasElement;
    if (ctx) {
      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Search",
              },
            },
            x: {
              title: {
                display: true,
                text: "Room Names",
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  useEffect(() => {
    const fetchVisitorsToday = async () => {
      try {
        const today = new Date(); // Get current date
        const startOfToday = Timestamp.fromDate(startOfDay(today));
        const endOfToday = Timestamp.fromDate(endOfDay(today));

        const visitorsCollection = collection(db, "visitorData2");
        const visitorsQuery = query(
          visitorsCollection,
          where("createdAt", ">=", startOfToday),
          where("createdAt", "<=", endOfToday)
        );

        const querySnapshot = await getDocs(visitorsQuery);
        const totalVisitors = querySnapshot.size; // Count of documents

        setTotalVisitorsToday(totalVisitors);
      } catch (error) {
        console.error("Error fetching visitors: ", error);
      }
    };

    fetchVisitorsToday();
  }, []);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const visitorsCollection = collection(db, "visitorData2");
        let visitorsQuery = query(visitorsCollection);

        if (startDate && endDate) {
          // Set the end date to the end of the selected day
          const endOfDayTimestamp = new Date(endDate);
          endOfDayTimestamp.setHours(23, 59, 59, 999); // Set to 23:59:59:999 of the selected day
          const endOfSelectedDay = Timestamp.fromDate(endOfDayTimestamp);

          visitorsQuery = query(
            visitorsCollection,
            where("createdAt", ">=", startDate),
            where("createdAt", "<=", endOfSelectedDay)
          );
        }

        const querySnapshot = await getDocs(visitorsQuery);
        const visitorsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const visitor: Visitor = {
            id: doc.id,
            selectedBuilding: data.selectedBuilding,
            selectedFloor: data.selectedFloor,
            roomCode: data.roomCode,
            selectedRoomName: data.selectedRoomName,
            roomAnimation: data.roomAnimation,
            selectedTextGuide: data.selectedTextGuide,
            selectedVoiceGuide: data.selectedVoiceGuide,
            createdAt: data.createdAt,
            createdAtTime: data.createdAt,
          };
          return visitor;
        });

        setFilteredVisitors(visitorsData);
        setTotalVisitors(visitorsData.length);
      } catch (error) {
        console.error("Error fetching visitors: ", error);
      }
    };

    fetchVisitors();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const queryEvent = query(
          eventsCollection,
          orderBy("createdAt", "desc")
        );
        const eventsSnapshot = await getDocs(queryEvent);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data() as Event;
          return { ...eventData, id: doc.id } as Event;
        });
        setEvents(eventsData);
        setTotalEvents(eventsData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
        const queryAnnouncement = query(
          announcementsCollection,
          orderBy("createdAt", "desc")
        );
        const announcementsSnapshot = await getDocs(queryAnnouncement);
        const announcementsData = announcementsSnapshot.docs.map((doc) => {
          const announcementsData = doc.data() as Announcement;
          return { ...announcementsData, id: doc.id } as Announcement;
        });
        setAnnouncements(announcementsData);
        setTotalAnnouncements(announcementsData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const exportToPDF = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) return; // User canceled the prompt

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          return;
        }

        // Create new jsPDF instance
        const doc = new jsPDF();

        // Set header font size and style
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");

        // Set header text
        doc.text("Dashboard Report", 20, 10);

        // Set content font size and style
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Set content text
        doc.text(`Total Search: ${totalVisitors}`, 20, 20);

        if (
          startDate &&
          endDate &&
          startDate.toDateString() === endDate.toDateString()
        ) {
          // Set content font size and style
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);

          doc.text(`Date: ${startDate?.toLocaleDateString()}`, 20, 30);
        } else {
          // Set content font size and style
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);

          doc.text(`From: ${startDate?.toLocaleDateString()}`, 20, 30);

          // Set content font size and style
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);

          doc.text(`To: ${endDate?.toLocaleDateString()}`, 20, 40);
          // Add more text or data as needed
        }

        // Generate table data
        const tableData = filteredVisitors.map((visitor) => {
          return [
            visitor.id,
            visitor.selectedBuilding,
            visitor.selectedFloor,
            visitor.roomCode,
            visitor.selectedRoomName,
            visitor.createdAt.toDate().toLocaleDateString(),
            visitor.createdAtTime.toDate().toLocaleTimeString(),
            // Add more fields if needed
          ];
        });

        // Add table to PDF
        autoTable(doc, {
          head: [
            [
              "ID",
              "Building Name",
              "Floor Level",
              "Room Code",
              "Room Name",
              "Date",
              "Time",
            ],
          ],
          body: tableData,
          startY: doc.internal.pageSize.height + 10,
          styles: {
            fontSize: 6, // Set font size to 10
          },
        });

        // Save PDF
        doc.save("summary_report.pdf");
        console.log("Exporting to PDF...");
      } else {
        alert("User does not have permission to export.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const columns = useMemo<MRT_ColumnDef<Visitor>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "selectedBuilding",
        header: "Building Name",
        size: 150,
      },
      {
        accessorKey: "selectedFloor",
        header: "Floor Level",
        size: 150,
      },
      {
        accessorKey: "roomCode",
        header: "Room Code",
        size: 150,
      },
      {
        accessorKey: "selectedRoomName",
        header: "Room Name",
        size: 150,
      },
      // {
      //   accessorKey: "roomAnimation",
      //   header: "Room Animation",
      //   size: 150,
      // },
      // {
      //   accessorKey: "selectedTextGuide",
      //   header: "Text Guide",
      //   size: 150,
      //   Cell: ({ row }) => {
      //     return (
      //       <div className="w-40 truncate text-ellipsis">
      //         {row.original.selectedTextGuide}
      //       </div>
      //     );
      //   },
      // },
      // {
      //   accessorKey: "selectedVoiceGuide",
      //   header: "Voice Guide",
      //   size: 150,
      // },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ row }) => {
          const createdAtTimestamp = row.original.createdAt;
          const seconds = createdAtTimestamp ? createdAtTimestamp.seconds : 0;
          const createdAtDate = new Date(seconds * 1000);

          // Get local date and time string in the format "MM-dd-yyyy HH:mm:ss"
          const formattedCreatedAt = `${createdAtDate.toLocaleDateString()}`;

          return <div>{formattedCreatedAt}</div>;
        },
        size: 150,
      },
      {
        accessorKey: "createdAtTime",
        header: "Created At",
        Cell: ({ row }) => {
          const createdAtTimestamp = row.original.createdAt;
          const seconds = createdAtTimestamp ? createdAtTimestamp.seconds : 0;
          const createdAtDate = new Date(seconds * 1000);

          // Get local date and time string in the format "MM-dd-yyyy HH:mm:ss"
          const formattedCreatedAt = ` ${createdAtDate.toLocaleTimeString()}`;

          return <div>{formattedCreatedAt}</div>;
        },
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: visitors.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
  });

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <AdminHeader name={""} />
          <AdminSidebar name={""} />
          <div className="items-center justify-center h-auto text-base-content bg-base-300 lg:ps-64 ">
            <div className="grid w-full grid-cols-4 grid-rows-1 gap-5 p-10 bg-base-100 rounded-tl-3xl">
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-32 p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                      <h1>{totalVisitorsToday}</h1>

                      <p>Today Search </p>
                    </div>
                    <div className="flex">
                      <Icon
                        icon="akar-icons:people-group"
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-32 p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                      <h1>{totalEvents}</h1>
                      <p>Total Events</p>
                    </div>
                    <div className="flex">
                      <Icon
                        icon="streamline:annoncement-megaphone"
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-32 p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                      <h1>{totalAnnouncements}</h1>
                      <p>Total Announcements</p>
                    </div>
                    <div className="flex">
                      <Icon
                        icon="streamline:calendar-star"
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full p-10 bg-base-100 ">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">
                  Search Count: {totalVisitorsCount}
                </h1>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleFilterChange("today")}
                  className={`${
                    filter === "today" ? "bg-gray-600 text-white" : ""
                  } px-4 py-2 rounded`}
                >
                  Today
                </button>
                <button
                  onClick={() => handleFilterChange("weekly")}
                  className={`${
                    filter === "weekly" ? "bg-gray-600 text-white" : ""
                  } px-4 py-2 rounded`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => handleFilterChange("monthly")}
                  className={`${
                    filter === "monthly" ? "bg-gray-600 text-white" : ""
                  } px-4 py-2 rounded`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => handleFilterChange("yearly")}
                  className={`${
                    filter === "yearly" ? "bg-gray-600 text-white" : ""
                  } px-4 py-2 rounded`}
                >
                  Yearly
                </button>
              </div>
              <div className="w-full p-10 bg-base-100 ">
                <canvas id="visitorChart" width="400" height="200"></canvas>
              </div>
            </div>
          </div>

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full p-10 bg-base-100 ">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">
                  Total Search: {totalVisitors}
                </h1>
              </div>
              {loading ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 justify-evenly">
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                    </div>
                    <hr className="w-full h-2 rounded-full bg-base-300 " />
                    <div className="flex flex-col w-full gap-4">
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center gap-10">
                    {/* Add UI elements for selecting date range */}
                    <p className="m-5">From: </p>
                    <input
                      type="date"
                      value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                      onChange={(e) =>
                        setStartDate(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      className="w-96 h-16"
                    />
                    <p className="m-5">To: </p>
                    <input
                      type="date"
                      value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                      onChange={(e) =>
                        setEndDate(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      className="w-96 h-16"
                    />
                    <button
                      onClick={exportToPDF}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Export Summary to PDF
                    </button>
                  </div>
                  <div className="flex justify-center mt-5"></div>
                  {/* Display the table with filtered data */}
                  <MaterialReactTable
                    columns={columns}
                    data={filteredVisitors}
                    // other props for the table component
                  />
                </>
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;

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
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { format } from "date-fns";
import BuildingVisitorChart from "./buildingVisitorChart";

interface ContainerProps {
  name: string;
}

interface Visitor {
  id: string;
  selectedBuilding: string;
  selectedFloor: string;
  roomCode: string;
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
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("today");
  const [totalVisitorsToday, setTotalVisitorsToday] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalAnnouncements, setTotalAnnouncements] = useState<number>(0);
  const [unsubscribeVisitors, setUnsubscribeVisitors] = useState<() => void>(
    () => () => {}
  );

  const [buildingData, setBuildingData] = useState<{ [key: string]: number }>(
    {}
  );
  const chartRef = useRef<Chart | null>(null);

  const [selectedBuilding, setSelectedBuilding] = useState<string>("");

  const handleBuildingSelect = (building: string) => {
    setSelectedBuilding(building);
  };

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

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const visitorsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const visitor: Visitor = {
            id: doc.id,
            selectedBuilding: data.selectedBuilding,
            selectedFloor: data.selectedFloor,
            roomCode: data.roomCode,
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
      });

      setUnsubscribeVisitors(() => unsubscribe); // Assign the unsubscribe function to the state variable
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
              createdAt: data.createdAt,
              createdAtTime: data.createdAAt,
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
          setTotalVisitorsToday(todayData.length);

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

  useEffect(() => {
    // Update building data whenever visitors change
    updateBuildingData(visitors);
  }, [visitors]);

  const updateBuildingData = (data: Visitor[]) => {
    const buildingCounts: { [key: string]: number } = {};

    data.forEach((visitor) => {
      buildingCounts[visitor.selectedBuilding] =
        (buildingCounts[visitor.selectedBuilding] || 0) + 1;
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
          label: "Visitor Counts by Building",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
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
                text: "Number of Visitors",
              },
            },
            x: {
              title: {
                display: true,
                text: "Building Names",
              },
            },
          },
        },
      });
    }
  }, [chartData]);

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

                      <p>Today Visitors</p>
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
                      <h1>12</h1>
                      <p>active buildings</p>
                    </div>
                    <div className="flex">
                      <Icon icon="bx:buildings" className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-32 p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                      <h1>{totalEvents}</h1>
                      <p>Active Events</p>
                    </div>
                    <div className="flex">
                      <Icon
                        icon="streamline:annoncement-megaphone"
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-32 p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                      <h1>{totalAnnouncements}</h1>
                      <p>Active Announcements</p>
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
                <h1 className="text-4xl font-bold">Visitor Count</h1>
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
                <h1 className="text-4xl font-bold">Activity Log</h1>
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
                <MaterialReactTable table={table} />
              )}
            </div>
          </div>

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full p-10 bg-base-100 ">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">
                  Building Visitor By Month
                </h1>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleBuildingSelect("Academic Building")}
                  className={
                    selectedBuilding === "Academic Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Academic
                </button>
                <button
                  onClick={() => handleBuildingSelect("Admin Building")}
                  className={
                    selectedBuilding === "Admin Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Admin
                </button>
                <button
                  onClick={() => handleBuildingSelect("Ballroom Building")}
                  className={
                    selectedBuilding === "Ballroom Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Ballroom
                </button>
                <button
                  onClick={() => handleBuildingSelect("Bautista Building")}
                  className={
                    selectedBuilding === "Bautista Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Bautista
                </button>
                <button
                  onClick={() => handleBuildingSelect("Belmonte Building")}
                  className={
                    selectedBuilding === "Belmonte Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Belmonte
                </button>
                <button
                  onClick={() => handleBuildingSelect("CHED")}
                  className={
                    selectedBuilding === "CHED"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  CHED
                </button>
                <button
                  onClick={() => handleBuildingSelect("Chinese B")}
                  className={
                    selectedBuilding === "Chinese B"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Chinese B
                </button>
                <button
                  onClick={() => handleBuildingSelect("KorPhil Building")}
                  className={
                    selectedBuilding === "KorPhil Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  KorPhil
                </button>
                <button
                  onClick={() => handleBuildingSelect("Multipurpose")}
                  className={
                    selectedBuilding === "Multipurpose"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Multipurpose
                </button>
                <button
                  onClick={() => handleBuildingSelect("Techvoc Building")}
                  className={
                    selectedBuilding === "Techvoc Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Techvoc
                </button>
                <button
                  onClick={() => handleBuildingSelect("Urban Farming")}
                  className={
                    selectedBuilding === "Urban Farming"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Urban Farming
                </button>
                <button
                  onClick={() => handleBuildingSelect("Yellow Building")}
                  className={
                    selectedBuilding === "Yellow Building"
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                >
                  Yellow
                </button>
              </div>
              <div className="w-full p-10 bg-base-100 ">
                <BuildingVisitorChart selectedBuilding={selectedBuilding} />
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;
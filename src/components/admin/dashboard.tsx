  import { Icon } from "@iconify/react";
  import { useHistory } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import AdminSidebar from "./constant/adminSidebar";
  import AdminHeader from "./constant/adminHeader";
  import { IonPage, IonContent } from "@ionic/react";
  import AdminLayout from "./constant/layout";
  import Chart from 'chart.js/auto';
  import firebase from "firebase/compat/app";
  import "firebase/compat/firestore"; // Import firestore to use Firestore
  import { useEffect, useRef, useState } from "react";

  interface ContainerProps {
    name: string;
  }

  const Dashboard: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const [visitorsCount, setVisitorsCount] = useState<number>(0);
    const [activeBuildingsCount, setActiveBuildingsCount] = useState<number>(0);
    const [activeAnnouncementsCount, setActiveAnnouncementsCount] = useState<number>(0);
    const [activeEventsCount, setActiveEventsCount] = useState<number>(0);
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [filter, setFilter] = useState<string>('day'); // Default filter is set to 'day'

    const fetchData = async () => {
      const db = firebase.firestore();
      const documentIds = ['academicBuilding','ballroomBuilding','bautistaBuilding','belmonteBuilding', 'chedBuilding', 'chineseBuilding','korphilBuilding','multipurposeBuilding','techvocBuilding','urbanFarming','yellowBuilding'];
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set hours to 0 to compare only date
      const documentCounts: Record<string, number> = {};
    
      let startDate: Date = new Date();
      let endDate: Date = new Date();

    
      // Determine start and end dates based on the selected filter
      if (filter === 'week') {
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - today.getDay()); // Set start date to Sunday of the current week
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() - today.getDay() + 6); // Set end date to Saturday of the current week
      } else if (filter === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Set start date to the first day of the current month
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Set end date to the last day of the current month
      }
    
      // Fetch count of visitors
      const visitorQuerySnapshot = await db.collection('visitorData').get();
      const totalVisitorsCount = visitorQuerySnapshot.docs.reduce((totalCount, doc) => {
        const documentData = doc.data();
        const uniqueFieldCount = Object.keys(documentData || {}).length;
        return totalCount + uniqueFieldCount;
      }, 0);
      setVisitorsCount(totalVisitorsCount);
    
      // Fetch count of buildings
      const buildingQuerySnapshot = await db.collection('buildingData').get();
      const activeBuildingsCount = buildingQuerySnapshot.size;
      setActiveBuildingsCount(activeBuildingsCount);
    
      // Fetch count of announcements
      const announcementQuerySnapshot = await db.collection('announcements').get();
      const activeAnnouncementsCount = announcementQuerySnapshot.size;
      setActiveAnnouncementsCount(activeAnnouncementsCount);
    
      // Fetch count of events
      const eventsQuerySnapshot = await db.collection('events').get();
      const activeEventsCount = eventsQuerySnapshot.size;
      setActiveEventsCount(activeEventsCount);
    
      
      for (const id of documentIds) {
        const buildingDocRef = db.collection('visitorData').doc(id);
        const buildingDocSnapshot = await buildingDocRef.get();
    
        if (buildingDocSnapshot.exists) {
          const buildingData = buildingDocSnapshot.data();
          if (buildingData) {
            let count = 0;
            for (const field in buildingData) {
              if (buildingData.hasOwnProperty(field)) {
                const createdAtTimestamp = buildingData[field].createdAt;
                if (createdAtTimestamp) {
                  const createdAtDate = new Date(createdAtTimestamp.seconds * 1000);
                  createdAtDate.setHours(0, 0, 0, 0);
                  if (
                    (filter === 'day' && createdAtDate.getTime() === today.getTime()) ||
                    (filter === 'week' && createdAtDate >= startDate && createdAtDate <= endDate) ||
                    (filter === 'month' && createdAtDate >= startDate && createdAtDate <= endDate)
                  ) {
                    count++;
                  }
                }
              }
            }
            documentCounts[id] = count;
          }
        } else {
          console.log(`Document ${id} does not exist`);
        }
      }
    
      console.log("Fetched Document Counts:", documentCounts); // Log the document counts
      renderChart(documentCounts, today);
    };

    
    
    useEffect(() => {
      fetchData();
    }, [filter]); // Refetch data when the filter changes

    const renderChart = (documentCounts: Record<string, number>, today: Date) => {
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy existing chart instance
        }
    
        // Define startDate and endDate within the function scope
        let startDate: Date = new Date();
        let endDate: Date = new Date();
    
        if (filter === 'week') {
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - today.getDay()); // Set start date to Sunday of the current week
          endDate = new Date(today);
          endDate.setDate(endDate.getDate() - today.getDay() + 6); // Set end date to Saturday of the current week
        } else if (filter === 'month') {
          startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Set start date to the first day of the current month
          endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Set end date to the last day of the current month
        }
    
        let label: string;
        if (filter === 'day') {
          label = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        } else if (filter === 'week') {
          const startDateFormatted = startDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
          const endDateFormatted = endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
          label = `${startDateFormatted} - ${endDateFormatted}`;
        } else {
          label = 'Visitor Counts Today';
        }
    
        // Render chart with counts for each document ID
        chartInstance.current = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: Object.keys(documentCounts),
            datasets: [{
              label: label,
              data: Object.values(documentCounts),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === 'day') {
      fetchData(); // Fetch data for today when "Today" option is selected
    }
  };
    return (
      <>
        <IonPage>
          <IonContent fullscreen>
            <AdminHeader name={""} />
            <AdminSidebar name={""} />
            <div className="items-center justify-center h-auto text-base-content bg-base-300 lg:ps-64 ">
              <div className="grid w-full min-h-screen grid-cols-4 grid-rows-4 gap-5 p-10 bg-base-100 rounded-tl-3xl">
                <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                  <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                    <div className="flex items-center justify-between space-x-12">
                      <div className="flex flex-col items-start">
                        <h1>{visitorsCount}</h1>
                        <p>Total Visitors</p>
                      </div>
                      <div className="flex">
                        <Icon icon="akar-icons:people-group" className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                  <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                    <div className="flex items-center justify-between space-x-12">
                      <div className="flex flex-col items-start">
                        <h1>{activeBuildingsCount}</h1>
                        <p>active buildings</p>
                      </div>
                      <div className="flex">
                        <Icon icon="bx:buildings" className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                  <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                    <div className="flex items-center justify-between space-x-12">
                      <div className="flex flex-col items-start">
                        <h1>{activeAnnouncementsCount}</h1>
                        <p>Active Announcements</p>
                      </div>
                      <div className="flex">
                        <Icon icon="streamline:annoncement-megaphone" className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                  <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                    <div className="flex items-center justify-between space-x-12">
                      <div className="flex flex-col items-start">
                        <h1>{activeEventsCount}</h1>
                        <p>Active Events</p>
                      </div>
                      <div className="flex">
                        <Icon icon="streamline:calendar-star" className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 row-span-3 ">
                  <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                  <h1 className="text-xl">Visitor Counts</h1>
                  <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
                      <option value="day">Today</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                    <canvas id="myChart" width="500" height="500" ref={chartRef}></canvas>
                  </div>
                </div>
                <div className="col-span-1 row-span-3 ">
                  <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                    <div className="flex items-center justify-between space-x-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </IonContent>
        </IonPage>
      </>
    );
  };

  export default Dashboard;

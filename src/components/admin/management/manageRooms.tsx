import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ToastContainer } from "react-toastify";

interface ContainerProps {
  name: string;
}

interface Room {
  id: string;
  buildingName: string;
  floors: {
    [floorName: string]: {
      [roomCodeMap: string]: {
        description: string;
        roomCode: string;
        squareMeter: string;
        textGuide: string;
        roomAnimation: string;
        voiceGuide: string;
        status: string;
      };
    };
  };
}

const RoomManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeRooms: () => void;

    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, "roomData");
        const q = query(roomsCollection, orderBy("buildingName", "asc"));

        unsubscribeRooms = onSnapshot(q, (querySnapshot) => {
          const roomsData: Room[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const { buildingName, floors } = data;

            // Flatten the floors data and generate individual rooms
            for (const floorName in floors) {
              const floorData = floors[floorName];
              for (const roomCode in floorData) {
                const room: Room = {
                  id: doc.id,
                  buildingName,
                  floors: {
                    [floorName]: {
                      [roomCode]: floorData[roomCode],
                    },
                  },
                };
                roomsData.push(room);
              }
            }
          });
          setRooms(roomsData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching rooms: ", error);
        setLoading(false);
      }
    };

    fetchRooms();

    return () => {
      if (unsubscribeRooms) {
        unsubscribeRooms();
      }
    };
  }, []);

  const columns = useMemo<MRT_ColumnDef<Room>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => updateRoom(row.original.id)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              // onClick={() => openDeleteConfirmation(row.original.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
      {
        accessorKey: "buildingName",
        header: "Building Name",
        size: 150,
      },
      {
        accessorKey: "roomCode",
        header: "Room Code",
        Cell: ({ row }) => (
          <>
            {Object.values(row.original.floors).flatMap((floor) =>
              Object.values(floor).map((room) => (
                <div key={room.roomCode}>{room.roomCode}</div>
              ))
            )}
          </>
        ),
      },
      {
        accessorKey: "roomAnimation",
        header: "Room Animation",
        Cell: ({ row }) => (
          <>
            {Object.values(row.original.floors).flatMap((floor) =>
              Object.values(floor).map((room) => (
                <div key={room.roomCode}>{room.roomAnimation}</div>
              ))
            )}
          </>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rooms,
  });

  const createRoom = () => {
    history.replace("/createRoom");
  };

  const updateRoom = (roomId: string) => {
    history.replace(`/UpdateRoom/${roomId}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Room Management</h1>
                <div className="flex items-center mr-5 space-x-3">
                  <button
                    onClick={createRoom}
                    className="btn btn-square hover:bg-emerald-500 hover:text-white"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                  </button>
                </div>
              </div>
              <br />
              <br />

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
        </div>
        <ToastContainer />
      </IonContent>
    </IonPage>
  );
};

export default RoomManagement;

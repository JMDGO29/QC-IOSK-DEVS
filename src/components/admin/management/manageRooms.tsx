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

interface ContainerProps {
  name: string;
}

interface Room {
  id: string;
  buildingName: string;
  floors?: {
    [floorName: string]: {
      [roomCode: string]: {
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

const RoomManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeBuildings: () => void;

    const fetchBuildings = async () => {
      try {
        const buildingsCollection = collection(db, "roomData");
        const q = query(buildingsCollection, orderBy("buildingName", "asc"));

        unsubscribeBuildings = onSnapshot(q, (querySnapshot) => {
          const buildingsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const building: Room = {
              id: doc.id,
              buildingName: data.buildingName,
            };
            return building;
          });
          setRooms(buildingsData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching buildings: ", error);
        setLoading(false);
      }
    };

    fetchBuildings();

    return () => {
      if (unsubscribeBuildings) {
        unsubscribeBuildings();
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
      </IonContent>
    </IonPage>
  );
};

export default RoomManagement;

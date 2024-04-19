import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import { format } from "date-fns";

interface ContainerProps {
  name: string;
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
  updatedAt: firebase.default.firestore.Timestamp;
}

const RoomManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeRooms: () => void;

    const fetchRooms = async () => {
      try {
        const buildingsCollection = collection(db, "roomData");
        const q = query(buildingsCollection, orderBy("buildingName", "asc"));

        unsubscribeRooms = onSnapshot(q, (querySnapshot) => {
          const roomsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const room: Room = {
              id: doc.id,
              buildingName: data.buildingName,
              floorLevel: data.floorLevel,
              roomCode: data.roomCode,
              roomName: data.roomName,
              distance: data.distance,
              eta: data.eta,
              squareMeter: data.squareMeter,
              status: data.status,
              roomAnimation: data.roomAnimation,
              voiceGuide: data.voiceGuide,
              textGuide: data.textGuide,
              updatedAt: data.updatedAt,
            };
            return room;
          });
          setRooms(roomsData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching buildings: ", error);
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

  const createRoom = () => {
    history.replace("/createRoom");
  };

  const updateRoom = (roomId: string) => {
    history.replace(`/UpdateRoom/${roomId}`);
  };

  const openDeleteConfirmation = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedRoomId(null);
  };

  const archiveRoom = async (room: Room) => {
    try {
      const archiveCollectionRef = collection(db, "roomData Archive");

      await addDoc(archiveCollectionRef, room);

      console.log("Room archived successfully!");
    } catch (error) {
      console.error("Error archiving room: ", error);
      alert("Error archiving room.");
    }
  };

  const deleteBuilding = async () => {
    if (selectedRoomId) {
      try {
        const roomToDelete = rooms.find((room) => room.id === selectedRoomId);

        if (roomToDelete) {
          await archiveRoom(roomToDelete);
        }

        await deleteDoc(doc(db, "roomData", selectedRoomId));

        const roomsCollection = collection(db, "roomData");
        const roomsSnapshot = await getDocs(roomsCollection);
        const roomsData = roomsSnapshot.docs.map((doc) => {
          const roomData = doc.data() as Room;
          return { ...roomData, id: doc.id } as Room;
        });
        setRooms(roomsData);

        closeDeleteConfirmation();
        console.log("Room deleted successfully!");
        toast.success("Room deleted successfully!");
      } catch (error) {
        console.error("Error deleting room: ", error);
        alert("Error on deleting room.");
      }
    }
  };

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
              onClick={() => openDeleteConfirmation(row.original.id)}
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
        accessorKey: "floorLevel",
        header: "Floor Level",
        size: 150,
      },
      {
        accessorKey: "roomCode",
        header: "Room Code",
        size: 150,
      },
      {
        accessorKey: "roomName",
        header: "Room Name",
        size: 150,
      },
      // {
      //   accessorKey: "status",
      //   header: "Status",
      //   size: 150,
      // },
      {
        accessorKey: "roomAnimation",
        header: "Animation",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="truncate text-ellipsis w-40">
              {row.original.roomAnimation}
            </div>
          );
        },
      },
      {
        accessorKey: "textGuide",
        header: "Text Guide",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="truncate text-ellipsis w-40">
              {row.original.textGuide}
            </div>
          );
        },
      },
      {
        accessorKey: "voiceGuide",
        header: "Voice Guide",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="truncate text-ellipsis w-40">
              {row.original.voiceGuide}
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ row }) => {
          const createdAtTimestamp = row.original.updatedAt;
          const formattedCreatedAt = format(
            createdAtTimestamp.toDate(),
            "MM-dd-yyyy"
          );
          return <div>{formattedCreatedAt}</div>;
        },
        size: 150,
      },
      {
        accessorKey: "squareMeter",
        header: "SQ M",
        size: 150,
      },
      {
        accessorKey: "distance",
        header: "Distance",
        size: 150,
      },
      {
        accessorKey: "eta",
        header: "ETA",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rooms,
  });

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
        {/* Delete Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedRoomId !== null}
          onRequestClose={closeDeleteConfirmation}
          ariaHideApp={false}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete this room?
            </p>
            <div className="flex justify-center mt-6 space-x-3">
              <button
                onClick={deleteBuilding}
                className="text-white btn btn-primary hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="btn bg-base-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </IonContent>
    </IonPage>
  );
};

export default RoomManagement;

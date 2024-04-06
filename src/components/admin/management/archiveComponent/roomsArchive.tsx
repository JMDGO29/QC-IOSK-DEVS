import React, { useEffect, useState, useMemo } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

Modal.setAppElement("#root");

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

const RoomArchive: React.FC<ContainerProps> = ({ name }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);
  const [restoreConfirmationId, setRestoreConfirmationId] = useState<
    string | null
  >(null);

  const columns = useMemo<MRT_ColumnDef<Room>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => openRestoreConfirmation(row.original.id)}
              className="btn btn-primary"
            >
              Restore
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rooms,
  });

  const openDeleteConfirmation = (roomId: string) => {
    setDeleteConfirmationId(roomId);
  };
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationId(null);
  };
  const openDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(true);
  };
  const closeDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(false);
  };
  const openRestoreConfirmation = (roomId: string) => {
    setRestoreConfirmationId(roomId);
  };
  const closeRestoreConfirmation = () => {
    setRestoreConfirmationId(null);
  };

  const deleteArchiveRoom = async () => {
    if (deleteConfirmationId) {
      try {
        await deleteDoc(doc(db, "roomData Archive", deleteConfirmationId));

        const roomsCollection = collection(db, "roomData Archive");
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

  const deleteAllRooms = async () => {
    try {
      const roomsCollection = collection(db, "roomData Archive");
      const roomsSnapshot = await getDocs(roomsCollection);

      roomsSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setRooms([]);

      closeDeleteAllConfirmation();
      console.log("All rooms deleted successfully!");
      toast.success("All rooms deleted successfully!");
    } catch (error) {
      console.error("Error deleting all rooms: ", error);
      alert("Error on deleting all rooms.");
    }
  };

  const addRoom = async (room: Room) => {
    try {
      const restoreCollectionRef = collection(db, "roomData");

      await addDoc(restoreCollectionRef, room);

      console.log("Room restored successfully!");
    } catch (error) {
      console.error("Error restoring room: ", error);
      alert("Error restoring room.");
    }
  };

  const restoreArchiveRoom = async () => {
    if (restoreConfirmationId) {
      try {
        const roomToDelete = rooms.find(
          (room) => room.id === restoreConfirmationId
        );

        if (roomToDelete) {
          await addRoom(roomToDelete);
        }

        await deleteDoc(doc(db, "roomData Archive", restoreConfirmationId));

        const roomsCollection = collection(db, "roomData Archive");
        const roomsSnapshot = await getDocs(roomsCollection);
        const roomsData = roomsSnapshot.docs.map((doc) => {
          const roomData = doc.data() as Room;
          return { ...roomData, id: doc.id } as Room;
        });
        setRooms(roomsData);

        closeRestoreConfirmation();
        console.log("Room restored successfully!");
        toast.success("Room restored successfully!");
      } catch (error) {
        console.error("Error on restoring room: ", error);
        alert("Error on restoring room.");
      }
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, "roomData Archive");
        const queryRoom = query(
          roomsCollection,
          orderBy("buildingName", "desc")
        );
        const roomsSnapshot = await getDocs(queryRoom);
        const roomsData = roomsSnapshot.docs.map((doc) => {
          const roomData = doc.data() as Room;
          return { ...roomData, id: doc.id } as Room;
        });
        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <h1 className="text-4xl font-bold">Archived Rooms</h1>
        <button
          className="btn btn-square hover:bg-red-500 hover:text-white"
          onClick={openDeleteAllConfirmation}
        >
          <Icon icon="mdi:delete-alert-outline" className="w-10 h-10" />
        </button>
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

      {/* Delete Confirmation Modal */}
      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60"
        isOpen={deleteConfirmationId !== null}
        onRequestClose={closeDeleteConfirmation}
        ariaHideApp={false}
      >
        <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
          <p className="text-3xl text-center">
            Are you sure you want to delete this room?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button onClick={deleteArchiveRoom} className="btn btn-danger">
              Yes, Delete Forever
            </button>
            <button
              onClick={closeDeleteConfirmation}
              className="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Delete All Announcements Modal */}
      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60"
        isOpen={deleteAllConfirmation}
        onRequestClose={closeDeleteAllConfirmation}
        ariaHideApp={false}
      >
        <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
          <p className="text-3xl text-center">
            Are you sure you want to delete all rooms?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button onClick={deleteAllRooms} className="btn btn-danger">
              Yes, Delete All Forever
            </button>
            <button
              onClick={closeDeleteAllConfirmation}
              className="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Restore Confirmation Modal */}
      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60"
        isOpen={restoreConfirmationId !== null}
        onRequestClose={closeRestoreConfirmation}
        ariaHideApp={false}
      >
        <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
          <p className="text-3xl text-center">
            Are you sure you want to restore this room?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={restoreArchiveRoom}
              className="text-white btn bg-warning hover:bg-orange-500"
            >
              Yes, Restore
            </button>
            <button
              onClick={closeRestoreConfirmation}
              className="btn bg-base-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RoomArchive;

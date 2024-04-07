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

interface Building {
  id: string;
  buildingName: string;
  buildingPath: string;
  buildingPosition: [number, number, number];
  buildingScale: [number, number, number];
  buildingLabelPosition: [number, number, number];
  status: string;
  updatedAt: firebase.default.firestore.Timestamp;
}

const RoomArchive: React.FC<ContainerProps> = ({ name }) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);
  const [restoreConfirmationId, setRestoreConfirmationId] = useState<
    string | null
  >(null);

  const columns = useMemo<MRT_ColumnDef<Building>[]>(
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
      { accessorKey: "buildingName", header: "Building Name", size: 150 },
      { accessorKey: "buildingPath", header: "Building Path", size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: buildings,
  });

  const openDeleteConfirmation = (buildingId: string) => {
    setDeleteConfirmationId(buildingId);
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
  const openRestoreConfirmation = (buildingId: string) => {
    setRestoreConfirmationId(buildingId);
  };
  const closeRestoreConfirmation = () => {
    setRestoreConfirmationId(null);
  };

  const deleteArchiveBuilding = async () => {
    if (deleteConfirmationId) {
      try {
        await deleteDoc(doc(db, "buildingData Archive", deleteConfirmationId));

        const buildingsCollection = collection(db, "buildingData Archive");
        const buildingsSnapshot = await getDocs(buildingsCollection);
        const buildingsData = buildingsSnapshot.docs.map((doc) => {
          const buildingData = doc.data() as Building;
          return { ...buildingData, id: doc.id } as Building;
        });
        setBuildings(buildingsData);

        closeDeleteConfirmation();
        console.log("Building deleted successfully!");
        toast.success("Building deleted successfully!");
      } catch (error) {
        console.error("Error deleting building: ", error);
        alert("Error on deleting building.");
      }
    }
  };

  const deleteAllBuildings = async () => {
    try {
      const buildingsCollection = collection(db, "buildingData Archive");
      const buildingsSnapshot = await getDocs(buildingsCollection);

      buildingsSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setBuildings([]);

      closeDeleteAllConfirmation();
      console.log("All buildings deleted successfully!");
      toast.success("All buildings deleted successfully!");
    } catch (error) {
      console.error("Error deleting all buildings: ", error);
      alert("Error on deleting all buildings.");
    }
  };

  const addBuilding = async (building: Building) => {
    try {
      const restoreCollectionRef = collection(db, "buildingData");

      await addDoc(restoreCollectionRef, building);

      console.log("Building restored successfully!");
    } catch (error) {
      console.error("Error restoring building: ", error);
      alert("Error restoring building.");
    }
  };

  const restoreArchiveBuilding = async () => {
    if (restoreConfirmationId) {
      try {
        const buildingToDelete = buildings.find(
          (building) => building.id === restoreConfirmationId
        );

        if (buildingToDelete) {
          await addBuilding(buildingToDelete);
        }

        await deleteDoc(doc(db, "buildingData Archive", restoreConfirmationId));

        const buildingsCollection = collection(db, "buildingData Archive");
        const buildingsSnapshot = await getDocs(buildingsCollection);
        const buildingsData = buildingsSnapshot.docs.map((doc) => {
          const buildingData = doc.data() as Building;
          return { ...buildingData, id: doc.id } as Building;
        });
        setBuildings(buildingsData);

        closeRestoreConfirmation();
        console.log("Building restored successfully!");
        toast.success("Building restored successfully!");
      } catch (error) {
        console.error("Error on restoring building: ", error);
        alert("Error on restoring building.");
      }
    }
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingsCollection = collection(db, "buildingData Archive");
        const queryBuilding = query(
          buildingsCollection,
          orderBy("buildingName", "desc")
        );
        const buildingsSnapshot = await getDocs(queryBuilding);
        const buildingsData = buildingsSnapshot.docs.map((doc) => {
          const buildingData = doc.data() as Building;
          return { ...buildingData, id: doc.id } as Building;
        });
        setBuildings(buildingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buildings: ", error);
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <h1 className="text-4xl font-bold">Archived Buildings</h1>
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
            Are you sure you want to delete this building?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button onClick={deleteArchiveBuilding} className="btn btn-danger">
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
            Are you sure you want to delete all buildings?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button onClick={deleteAllBuildings} className="btn btn-danger">
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
            Are you sure you want to restore this building?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={restoreArchiveBuilding}
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

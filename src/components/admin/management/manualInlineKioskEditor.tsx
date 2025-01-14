import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  addDoc,
} from "@firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
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

interface Manual {
  id: string;
  name: string;
  manualDesc: string;
  manualImageUrl: string;
}

const MikeGester: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedManualId, setSelectedManualId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);

  const columns = useMemo<MRT_ColumnDef<Manual>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => updateManual(row.original.id)}
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
      { accessorKey: "name", header: "Manual Name", size: 150 },
      { accessorKey: "manualDesc", header: "Manual Description", size: 150 },
      {
        accessorKey: "manualImageUrl",
        header: "Manual Image",
        size: 150,
        Cell: ({ row }) => (
          <img
            alt="avatar"
            className="cursor-pointer max-h-20 rounded-2xl max-w-28 hover:scale-110"
            src={row.original.manualImageUrl}
            loading="lazy"
            style={{ borderRadius: "50%" }}
            onClick={() => openImagePreview(row.original.manualImageUrl)}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: manuals,
  });

  const createManual = () => {
    history.replace("/createManual");
  };

  const updateManual = (manualId: string) => {
    history.replace(`/updateManual/${manualId}`);
  };

  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };
  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  const openDeleteConfirmation = (manualId: string) => {
    setSelectedManualId(manualId);
  };
  const closeDeleteConfirmation = () => {
    setSelectedManualId(null);
  };

  const openDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(true);
  };

  const closeDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(false);
  };

  const archiveManual = async (manual: Manual) => {
    try {
      const archiveCollectionRef = collection(db, "manualArchive");

      await addDoc(archiveCollectionRef, manual);

      console.log("Manual archived successfully!");
    } catch (error) {
      console.error("Error archiving manual: ", error);
      alert("Error archiving manual.");
    }
  };

  const deleteManual = async () => {
    if (selectedManualId) {
      try {
        const manualToDelete = manuals.find(
          (manual) => manual.id === selectedManualId
        );

        if (manualToDelete) {
          await archiveManual(manualToDelete);
        }

        await deleteDoc(doc(db, "manual", selectedManualId));

        const manualsCollection = collection(db, "manual");
        const manualsSnapshot = await getDocs(manualsCollection);
        const manualsData = manualsSnapshot.docs.map((doc) => {
          const manualData = doc.data() as Manual;
          return { ...manualData, id: doc.id } as Manual;
        });
        setManuals(manualsData);

        closeDeleteConfirmation();
        console.log("Manual deleted successfully!");
        toast.success("Manual deleted successfully!");
      } catch (error) {
        console.error("Error deleting manual: ", error);
        alert("Error on deleting manual.");
      }
    }
  };

  const deleteAllManual = async () => {
    try {
      const manualsCollection = collection(db, "manual");
      const manualsSnapshot = await getDocs(manualsCollection);

      manualsSnapshot.forEach(async (doc) => {
        const manualData = doc.data() as Manual;
        await archiveManual({ ...manualData, id: doc.id });
        await deleteDoc(doc.ref);
      });

      setManuals([]);
      closeDeleteAllConfirmation();
      console.log("All manual deleted successfully!");
      toast.success("All manual deleted successfully!");
    } catch (error) {
      console.error("Error deleting all manual: ", error);
      alert("Error on deleting all manual.");
    }
  };

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const manualsCollection = collection(db, "manual");
        const queryManual = query(
          manualsCollection,
          orderBy("createdAt", "desc")
        );
        const manualsSnapshot = await getDocs(queryManual);
        const manualsData = manualsSnapshot.docs.map((doc) => {
          const manualData = doc.data() as Manual;
          return { ...manualData, id: doc.id } as Manual;
        });
        setManuals(manualsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching manual: ", error);
        setLoading(false);
      }
    };

    fetchManuals();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">
                  Manual Management
                </h1>
                <div className="flex items-center mr-5 space-x-3">
                  <button
                    className="btn btn-square hover:bg-emerald-500 hover:text-white"
                    onClick={createManual}
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                  </button>
                  <button
                    className="btn btn-square hover:bg-red-500 hover:text-white"
                    onClick={openDeleteAllConfirmation}
                  >
                    <Icon
                      icon="mdi:delete-alert-outline"
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
                    <div className="flex items-center justify-around space-x-2">
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
        {/* Image Preview Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedImage !== null}
          onRequestClose={closeImagePreview}
        >
          <div className="flex space-x-3">
            <img
              src={selectedImage || ""}
              alt="Image Preview"
              style={{ maxWidth: "100%" }}
              className="rounded-2xl"
            />
            <button
              onClick={closeImagePreview}
              className="btn btn-square bg-base-300"
            >
              <Icon icon="heroicons:x-mark-16-solid" className="w-10 h-10" />
            </button>
          </div>
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedManualId !== null}
          onRequestClose={closeDeleteConfirmation}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete this manual?
            </p>
            <div className="flex justify-center space-x-3 mt-14">
              <button
                onClick={deleteManual}
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
        {/* Delete All Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={deleteAllConfirmation}
          onRequestClose={closeDeleteAllConfirmation}
          ariaHideApp={false}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete all manual?
            </p>
            <div className="flex justify-center space-x-3 mt-14">
              <button
                onClick={deleteAllManual}
                className="text-white btn btn-primary hover:bg-red-500"
              >
                Yes, Delete All
              </button>
              <button
                onClick={closeDeleteAllConfirmation}
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

export default MikeGester;
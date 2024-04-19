import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
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
import { format } from "date-fns";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelViewer from "../../campus/sanBartolome/ModelViewer";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

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
  totalFloor: string;
  updatedAt: firebase.default.firestore.Timestamp;
}

const BuildingManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeBuildings: () => void;

    const fetchBuildings = async () => {
      try {
        const buildingsCollection = collection(db, "buildingData");
        const q = query(buildingsCollection, orderBy("buildingName", "asc"));

        unsubscribeBuildings = onSnapshot(q, (querySnapshot) => {
          const buildingsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const building: Building = {
              id: doc.id,
              buildingName: data.buildingName,
              buildingPath: data.buildingPath,
              buildingPosition: data.buildingPosition,
              buildingScale: data.buildingScale,
              buildingLabelPosition: data.buildingLabelPosition,
              status: data.status,
              totalFloor: data.totalFloor,
              updatedAt: data.updatedAt,
            };
            return building;
          });
          setBuildings(buildingsData);
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

  const createBuilding = () => {
    history.replace("/createBuilding");
  };

  const updateBuilding = (buildingId: string) => {
    history.replace(`/UpdateBuilding/${buildingId}`);
  };

  const openDeleteConfirmation = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedBuildingId(null);
  };

  const archiveBuilding = async (building: Building) => {
    try {
      const archiveCollectionRef = collection(db, "buildingData Archive");

      await addDoc(archiveCollectionRef, building);

      console.log("Building archived successfully!");
    } catch (error) {
      console.error("Error archiving building: ", error);
      alert("Error archiving building.");
    }
  };

  const deleteBuilding = async () => {
    if (selectedBuildingId) {
      try {
        const buildingToDelete = buildings.find(
          (building) => building.id === selectedBuildingId
        );

        if (buildingToDelete) {
          await archiveBuilding(buildingToDelete);
        }

        await deleteDoc(doc(db, "buildingData", selectedBuildingId));

        const buildingsCollection = collection(db, "buildingData");
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

  const columns = useMemo<MRT_ColumnDef<Building>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => updateBuilding(row.original.id)}
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
      { accessorKey: "buildingName", header: "Building Name", size: 150 },
      { accessorKey: "TotalFloor", header: "TotalFloor", size: 150 },
      {
        accessorKey: "buildingPosition",
        header: "Building Position",
        Cell: ({ row }) => {
          const position = row.original.buildingPosition;
          return (
            <div>
              <p>X: {position[0]}</p>
              <p>Y: {position[1]}</p>
              <p>Z: {position[2]}</p>
            </div>
          );
        },
        size: 150,
      },
      {
        accessorKey: "buildingScale",
        header: "Building Size",
        Cell: ({ row }) => {
          const position = row.original.buildingScale;
          return (
            <div>
              <p>X: {position[0]}</p>
              <p>Y: {position[1]}</p>
              <p>Z: {position[2]}</p>
            </div>
          );
        },
        size: 150,
      },
      {
        accessorKey: "buildingLabelPosition",
        header: "Building Label Position",
        Cell: ({ row }) => {
          const position = row.original.buildingLabelPosition;
          return (
            <div>
              <p>X: {position[0]}</p>
              <p>Y: {position[1]}</p>
              <p>Z: {position[2]}</p>
            </div>
          );
        },
        size: 150,
      },
      { accessorKey: "status", header: "Status", size: 150 },
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: buildings,
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-full p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Building Model Management</h1>
                <div className="flex items-center mr-5 space-x-3">
                  <button
                    onClick={createBuilding}
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
              {/* <Canvas
                camera={{
                  fov: 50,
                  position: [30, 30, 30],
                }}
                style={{ position: "absolute" }}
              >
                <OrbitControls
                  makeDefault
                  minPolarAngle={Math.PI / 25}
                  maxPolarAngle={Math.PI / 2}
                  enableZoom
                />

                <ambientLight intensity={2} />

                {buildings.map((building) => (
                  <ModelViewer
                    key={building.id}
                    name={building.buildingName}
                    modelPath={building.buildingPath}
                    position={building.buildingPosition}
                    scale={building.buildingScale}
                    textPosition={building.buildingLabelPosition}
                  />
                ))}
                <gridHelper args={[100, 100, 0xff0000, "teal"]} />
              </Canvas> */}
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedBuildingId !== null}
          onRequestClose={closeDeleteConfirmation}
          ariaHideApp={false}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete this building?
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

export default BuildingManagement;

import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useHistory, useParams } from "react-router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ContainerProps {
  name: string;
  buildingId?: string;
}

interface Building {
  id: string;
  buildingName: string;
  buildingPath: string;
  buildingPosition: string[];
  buildingScale: string[];
  buildingLabelPosition: string[];
  status: string;
  totalFloor: string;
  updatedAt: firebase.default.firestore.Timestamp;
}

const UpdateBuilding: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [building, setBuilding] = useState<Building | null>(null);
  const { buildingId } = useParams<{ buildingId: string }>();
  const [buildingName, setBuildingName] = useState<string>("");
  const [buildingPath, setBuildingPath] = useState<string>("");
  const [buildingPathFile, setBuildingPathFile] = useState<File | null>(null); // To store the file
  const [buildingPosition, setBuildingPosition] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [buildingScale, setBuildingScale] = useState<string[]>(["", "", ""]);
  const [buildingLabelPosition, setBuildingLabelPosition] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [status, setStatus] = useState<string>("");
  const [totalFloor, setTotalFloor] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const Building = () => {
    history.push("/Building");
  };

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const buildingRef = doc(db, "buildingData", buildingId);
        const buildingDoc = await getDoc(buildingRef);

        if (buildingDoc.exists()) {
          const buildingData = buildingDoc.data() as Building;
          setBuilding(buildingData);

          setBuildingName(buildingData.buildingName);
          setBuildingPath(buildingData.buildingPath);
          setBuildingPosition(buildingData.buildingPosition);
          setBuildingScale(buildingData.buildingScale);
          setBuildingLabelPosition(buildingData.buildingLabelPosition);
          setStatus(buildingData.status);
          setTotalFloor(buildingData.totalFloor);
        } else {
          console.error("Building not found");
          history.push("/Building");
        }
      } catch (error) {
        console.error("Error fetching building: ", error);
      }
    };

    fetchBuilding();
  }, [buildingId, history]);

  const handleUpdateBuilding = async () => {
    try {
      const now = serverTimestamp();
      let glbUrl = "";

      if (buildingPathFile) {
        const storageRef = ref(storage, `buildingGLB/${buildingId}`);
        const snapshot = await uploadBytes(storageRef, buildingPathFile);
        glbUrl = await getDownloadURL(snapshot.ref);
      }

      const docRef = doc(db, "buildingData", buildingId);

      await setDoc(docRef, {
        buildingName: buildingName,
        buildingPath: glbUrl || buildingPath, // If a new file is uploaded, use the new URL, otherwise use the existing URL
        buildingPosition: buildingPosition,
        buildingScale: buildingScale,
        buildingLabelPosition: buildingLabelPosition,
        totalFloor: totalFloor,
        status: selectedStatus,
        updatedAt: now,
      });

      console.log("Building Model updated successfully!");
      toast.success("Building Model updated successfully!");
      history.push("/Building");
    } catch (error) {
      console.error("Error updating Building Model: ", error);
      alert("Error on adding updating Model.");
    }
  };
  
  const handleStatutsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedStatus(selected);
  };
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center space-x-2">
                <h1 className="text-4xl font-bold">Update Building Model</h1>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Building Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Building Name"
                          value={buildingName}
                          onChange={(e) => setBuildingName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Building GLB File:</th>
                      <td>
                        <input
                          type="file"
                          accept=".glb"
                          onChange={(e) =>
                            setBuildingPathFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          } // Update file state
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Building Path:</th>
                      <td>
                        <input
                          type="text"
                          value={
                            buildingPath
                              .substring(buildingPath.lastIndexOf("/") + 1)
                              .split("?")[0]
                          }
                          readOnly
                          className="w-full max-w-xs input input-bordered" // Make input readonly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Building Position:</th>
                      <td>
                        <div className="flex">
                          {["X", "Y", "Z"].map((axis, index) => (
                            <div key={axis} className="flex flex-col mr-4">
                              <label>{axis}:</label>
                              <input
                                type="text"
                                value={buildingPosition[index]}
                                onChange={(e) => {
                                  const updatedBuildingPosition = [
                                    ...buildingPosition,
                                  ];
                                  updatedBuildingPosition[index] =
                                    e.target.value;
                                  setBuildingPosition(updatedBuildingPosition);
                                }}
                                className="w-full max-w-xs input input-bordered"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Building Scale:</th>
                      <td>
                        <div className="flex">
                          {["X", "Y", "Z"].map((axis, index) => (
                            <div key={axis} className="flex flex-col mr-4">
                              <label>{axis}:</label>
                              <input
                                type="text"
                                value={buildingScale[index]}
                                onChange={(e) => {
                                  const updatedBuildingScale = [
                                    ...buildingScale,
                                  ];
                                  updatedBuildingScale[index] = e.target.value;
                                  setBuildingScale(updatedBuildingScale);
                                }}
                                className="w-full max-w-xs input input-bordered"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Building Label Position:</th>
                      <td>
                        <div className="flex">
                          {["X", "Y", "Z"].map((axis, index) => (
                            <div key={axis} className="flex flex-col mr-4">
                              <label>{axis}:</label>
                              <input
                                type="text"
                                value={buildingLabelPosition[index]}
                                onChange={(e) => {
                                  const updatedBuildingLabelPosition = [
                                    ...buildingLabelPosition,
                                  ];
                                  updatedBuildingLabelPosition[index] =
                                    e.target.value;
                                  setBuildingLabelPosition(
                                    updatedBuildingLabelPosition
                                  );
                                }}
                                className="w-full max-w-xs input input-bordered"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>
                        <select
                          className="w-full max-w-xs input input-bordered"
                          value={selectedStatus || status}
                          onChange={handleStatutsChange}
                        >
                          <option value="available">Available</option>
                          <option value="not available">Not Available</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Total Floor:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Building Name"
                          value={totalFloor}
                          onChange={(e) => setTotalFloor(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-between mx-5 mt-5">
                  <button
                    onClick={Building}
                    className="btn btn-square hover:bg-base-300"
                  >
                    <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleUpdateBuilding}
                    className="float-right btn"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpdateBuilding;

import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
}

const CreateBuilding: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [buildingName, setBuildingName] = useState<string>("");
  const [buildingPath, setBuildingPath] = useState<File | null>(null);
  const [buildingPosition, setBuildingPosition] = useState<string[]>([
    "0",
    "0",
    "0",
  ]);
  const [buildingScale, setBuildingScale] = useState<string[]>(["1", "1", "1"]);
  const [buildingLabelPosition, setBuildingLabelPosition] = useState<string[]>([
    "0",
    "3",
    "0",
  ]);
  const [totalFloor, setTotalFloor] = useState<string>("");
  const [status, setStatus] = useState<string>("available");

  const Building = () => {
    history.push("/Building");
  };

  const handleAddBuilding = async () => {
    try {
      const now = serverTimestamp();

      if (!buildingPath) {
        toast.error("Please select a GLB file.");
        return;
      }

      const glbRef = storage.ref().child(`buildingGLB/${buildingPath.name}`);
      await glbRef.put(buildingPath);
      const glbUrl = await glbRef.getDownloadURL();

      const docRef = doc(db, "buildingData", buildingName);

      await setDoc(docRef, {
        buildingName: buildingName,
        buildingPath: glbUrl,
        buildingPosition: buildingPosition,
        buildingScale: buildingScale,
        buildingLabelPosition: buildingPosition,
        totalFloor: totalFloor,
        status: status,
        createdAt: now,
        updatedAt: now,
      });

      // Create roomData under the same buildingName document
      // const roomDocRef = doc(db, "roomData", buildingName);
      // const floorsData = Array.from(
      //   { length: parseInt(totalFloor) },
      //   (_, i) => ({
      //     [`Floor ${i + 1}`]: {},
      //   })
      // );
      // await setDoc(roomDocRef, {
      //   buildingName: buildingName,
      //   createdAt: now,
      //   updatedAt: now,

      // });

      setBuildingName("");
      setBuildingPath(null);
      setBuildingPosition(["0", "0", "0"]);
      setBuildingScale(["0", "0", "0"]);
      setBuildingLabelPosition(["0", "0", "0"]);
      setTotalFloor("");
      setStatus("");

      console.log("Building added successfully!");
      toast.success("Building added successfully!");
      history.replace("/Building");
    } catch (error) {
      console.error("Error adding Building: ", error);
      alert("Error on adding Building.");
    }
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
                <h1 className="text-4xl font-bold">Create Building</h1>
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
                            setBuildingPath(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          className="w-full max-w-xs input input-bordered"
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
                                  const updatedPosition = [...buildingPosition];
                                  updatedPosition[index] = e.target.value;
                                  setBuildingPosition(updatedPosition);
                                }}
                                className="w-full max-w-xs input input-bordered"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Total Floor:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Total Number of floor"
                          value={totalFloor}
                          onChange={(e) => setTotalFloor(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
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
                    onClick={handleAddBuilding}
                    className="float-right btn"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                    <span>Create</span>
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

export default CreateBuilding;

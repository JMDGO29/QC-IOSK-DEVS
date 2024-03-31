import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { useHistory } from "react-router";
import { Icon } from "@iconify/react";

interface ContainerProps {
  name: string;
}

const CreateRoom: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState<string[]>([""]);
  const [floorLevel, setFloorLevel] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [statuses, setStatuses] = useState<string[]>([""]);

  const handleAddRoom = () => {
    setRoomCode([...roomCode, ""]);
    setFloorLevel([...floorLevel, ""]);
    setDescriptions([...descriptions, ""]);
    setStatuses([...statuses, ""]);
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRoomCode = [...roomCode];
    const updatedFloorLevel = [...floorLevel];
    const updatedDescriptions = [...descriptions];
    const updatedStatuses = [...statuses];

    updatedRoomCode.splice(index, 1);
    updatedFloorLevel.splice(index, 1);
    updatedDescriptions.splice(index, 1);
    updatedStatuses.splice(index, 1);

    setRoomCode(updatedRoomCode);
    setFloorLevel(updatedFloorLevel);
    setDescriptions(updatedDescriptions);
    setStatuses(updatedStatuses);
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
                <h1 className="text-4xl font-bold">Create Room</h1>
              </div>
              <div className="overflow-x-auto">
                {roomCode.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mt-5"
                  >
                    <div className="flex items-center">
                      <label className="mr-3">Room Code:</label>
                      <input
                        type="text"
                        placeholder="Room Code"
                        className="w-full max-w-xs input input-bordered"
                        value={code}
                        onChange={(e) => {
                          const updatedRoomCode = [...roomCode];
                          updatedRoomCode[index] = e.target.value;
                          setRoomCode(updatedRoomCode);
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="mr-3">Floor Level:</label>
                      <input
                        type="text"
                        placeholder="Floor Level:"
                        className="w-full max-w-xs input input-bordered"
                        value={floorLevel[index]}
                        onChange={(e) => {
                          const updatedFloorLevel = [...floorLevel];
                          updatedFloorLevel[index] = e.target.value;
                          setFloorLevel(updatedFloorLevel);
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="mr-3">Description:</label>
                      <input
                        type="text"
                        placeholder="Description:"
                        className="w-full max-w-xs input input-bordered"
                        value={descriptions[index]}
                        onChange={(e) => {
                          const updatedDescriptions = [...descriptions];
                          updatedDescriptions[index] = e.target.value;
                          setDescriptions(updatedDescriptions);
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="mr-3">Status:</label>
                      <input
                        type="text"
                        placeholder="Status:"
                        className="w-full max-w-xs input input-bordered"
                        value={statuses[index]}
                        onChange={(e) => {
                          const updatedStatuses = [...statuses];
                          updatedStatuses[index] = e.target.value;
                          setStatuses(updatedStatuses);
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveRoom(index)}
                      className="btn btn-square hover:bg-base-300"
                    >
                      <Icon
                        icon="icon-park-outline:close"
                        className="w-10 h-10"
                      />
                    </button>
                  </div>
                ))}
                <div className="flex items-center justify-between mx-5 mt-5">
                  <button
                    onClick={handleAddRoom}
                    className="btn btn-square hover:bg-base-300"
                  >
                    <Icon icon="icon-park-outline:add" className="w-10 h-10" />
                  </button>
                  <button
                    // onClick={handleAddBuilding}
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

export default CreateRoom;

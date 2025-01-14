import { useState, useEffect, useMemo } from "react";
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
import { useHistory } from "react-router";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

interface ContainerProps {
  name: string;
}

interface Event {
  id: string;
  name: string;
  eventSource: string;
  organizerImageUrl: string;
  eventDesc: string;
  eventPlace: string;
  imageUrl: string;
  startDate: string;
  startTime: string;
}

const EventManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);

  const columns = useMemo<MRT_ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => updateEvent(row.original.id)}
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
      { accessorKey: "name", header: "Event Name", size: 150 },
      { accessorKey: "eventPlace", header: "Event Place", size: 150 },
      { accessorKey: "eventSource", header: "Event Organizer", size: 150 },
      {
        accessorKey: "organizerImageUrl",
        header: "Organizer Image",
        size: 150,
        Cell: ({ row }) => (
          <img
            alt="Organizer Image"
            className="cursor-pointer max-h-20 rounded-2xl max-w-28 hover:scale-110"
            src={row.original.organizerImageUrl}
            loading="lazy"
            style={{ borderRadius: "50%" }}
            onClick={() => openImagePreview(row.original.organizerImageUrl)}
          />
        ),
      },
      { accessorKey: "eventDesc", header: "Event Description", size: 200 },
      { accessorKey: "startDate", header: "Start Date", size: 150 },
      { accessorKey: "startTime", header: "Start Time", size: 150 },
      {
        accessorKey: "imageUrl",
        header: "Event Image",
        size: 150,
        Cell: ({ row }) => (
          <img
            alt="avatar"
            className="cursor-pointer max-h-20 rounded-2xl max-w-28 hover:scale-110"
            src={row.original.imageUrl}
            loading="lazy"
            style={{ borderRadius: "50%" }}
            onClick={() => openImagePreview(row.original.imageUrl)}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: events,
  });

  const createEvent = () => {
    history.replace("/createEvent");
  };

  const updateEvent = (eventId: string) => {
    history.replace(`/updateEvent/${eventId}`);
  };

  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  const openDeleteConfirmation = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedEventId(null);
  };

  const openDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(true);
  };

  const closeDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(false);
  };

  const archiveEvent = async (event: Event) => {
    try {
      const archiveCollectionRef = collection(db, "eventsArchive");

      await addDoc(archiveCollectionRef, event);

      console.log("Event archived successfully!");
      // toast.info("Event archived successfully!");
    } catch (error) {
      console.error("Error archiving event: ", error);
      alert("Error archiving event.");
    }
  };

  const deleteEvent = async () => {
    if (selectedEventId) {
      try {
        const eventToDelete = events.find(
          (event) => event.id === selectedEventId
        );

        if (eventToDelete) {
          await archiveEvent(eventToDelete);
        }

        await deleteDoc(doc(db, "events", selectedEventId));

        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data() as Event;
          return { ...eventData, id: doc.id } as Event;
        });
        setEvents(eventsData);

        closeDeleteConfirmation();
        console.log("Event deleted successfully!");
        toast.success("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event: ", error);
        alert("Error on deleting event.");
      }
    }
  };

  const deleteAllEvents = async () => {
    try {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);

      eventsSnapshot.forEach(async (doc) => {
        const eventData = doc.data() as Event;
        await archiveEvent({ ...eventData, id: doc.id });
        await deleteDoc(doc.ref);
      });

      setEvents([]);
      closeDeleteAllConfirmation();
      console.log("All events deleted successfully!");
      toast.success("All events deleted successfully!");
    } catch (error) {
      console.error("Error deleting all events: ", error);
      alert("Error on deleting all events.");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const queryEvent = query(
          eventsCollection,
          orderBy("createdAt", "desc")
        );
        const eventsSnapshot = await getDocs(queryEvent);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data() as Event;
          return { ...eventData, id: doc.id } as Event;
        });
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Event Management</h1>
                <div className="flex items-center mr-5 space-x-3">
                  <button
                    onClick={createEvent}
                    className="btn btn-square hover:bg-emerald-500 hover:text-white"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                  </button>
                  <button
                    onClick={openDeleteAllConfirmation}
                    className="btn btn-square hover:bg-red-500 hover:text-white"
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
        {/* Image Preview Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedImage !== null}
          onRequestClose={closeImagePreview}
        >
          <div className="flex space-x-2">
            <img
              src={selectedImage || ""}
              alt="Image Preview"
              className="rounded-2xl w-96 h-96"
            />
            <button onClick={closeImagePreview} className="btn btn-square">
              <Icon icon="heroicons:x-mark-16-solid" className="w-10 h-10" />
            </button>
          </div>
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedEventId !== null}
          onRequestClose={closeDeleteConfirmation}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete this event?
            </p>
            <div className="flex justify-center space-x-3 mt-14">
              <button
                onClick={deleteEvent}
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
              Are you sure you want to delete all events?
            </p>
            <div className="flex justify-center space-x-3 mt-14">
              <button
                onClick={deleteAllEvents}
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

export default EventManagement;

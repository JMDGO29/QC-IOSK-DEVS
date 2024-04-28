import React, { useState, useEffect, useRef } from "react";
import { themeChange } from "theme-change";
import { useHistory } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

Modal.setAppElement("#root");

interface ContainerProps {
  name: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  endDate: string;
  status: string;
  roomName: string;
  eventName: string;
}

const Announcements: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const ClickLogin = () => {
    history.push("/Login");
  };

  const openModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    themeChange(false);
  });

  useEffect(() => {
    let unsubscribeAnnouncements: () => void;

    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
        const queryAnnouncement = query(announcementsCollection);

        unsubscribeAnnouncements = onSnapshot(
          queryAnnouncement,
          (querySnapshot) => {
            const announcementData = querySnapshot.docs
              .map((doc) => {
                const data = doc.data();
                const announcement: Announcement = {
                  id: doc.id,
                  name: data.name,
                  announcementSource: data.announcementSource,
                  announcementDesc: data.announcementDesc,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  status: data.status,
                  roomName: data.roomName,
                  eventName: data.eventName
                };
                return announcement;
              })
              .filter(
                (announcement) => announcement.status !== "not available"
              );
            setAnnouncements(announcementData);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error fetching announcements: ", error);
        setLoading(false);
      }
    };

    fetchAnnouncements();

    return () => {
      if (unsubscribeAnnouncements) {
        unsubscribeAnnouncements();
      }
    };
  }, []);

  function formatDate(dateTimeString: any) {
    const date = new Date(dateTimeString);
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const year = date.getFullYear();
    const formattedDate = `${month} ${day} ${year}`;

    let hours = date.getHours();
    const period = hours < 12 ? "AM" : "PM";
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }

    const minutes = padZero(date.getMinutes());
    const formattedTime = `${padZero(hours)}:${minutes} ${period}`;

    return `${formattedDate} - Time: ${formattedTime}`;
  }

  function formatTime(timeString: any) {
    const date = new Date(timeString);
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const year = date.getFullYear();

    let hours = date.getHours();
    const period = hours < 12 ? "AM" : "PM";
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }

    const minutes = padZero(date.getMinutes());
    const formattedTime = `${padZero(hours)}:${minutes} ${period}`;

    return `${formattedTime}`;
  }

  function padZero(num: any) {
    return num.toString().padStart(2, "0");
  }


  return (
    <>
      <div className="py-10 space-y-2 bg-base-100">
        <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
          <h1 className="text-4xl font-bold text-left ">
            {t("Announcements")}
          </h1>
          <p className="text-sm ">{t("Updates from the Campus")}</p>
        </div>
        {loading ? (
          <>
            <div className="h-20 px-3 pt-10 pr-6  w-96 rounded-2xl">
              <div className="flex flex-col gap-4">
                <div className="w-full skeleton h-28 rounded-2xl"></div>
                <div className="w-full skeleton h-28 rounded-2xl"></div>
                <div className="w-full skeleton h-28 rounded-2xl"></div>
                <div className="w-full skeleton h-28 rounded-2xl"></div>
                <div className="w-full skeleton h-28 rounded-2xl"></div>
                <div className="w-full skeleton h-28 rounded-2xl"></div>
                <div className="w-full h-full skeleton"></div>
              </div>
            </div>
          </>
        ) : (
          <div>
            {announcements.length === 0 ? (
              <div className="px-3 mt-10 space-y-4">
                <div
                  role="alert"
                  className="flex justify-center shadow-inner alert rounded-2xl h-28"
                >
                  <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                  <span className="text-xl">
                    {t("No announcements found.")}
                  </span>
                </div>
              </div>
            ) : (
              <div className="px-3 mt-10 space-y-4">
                {announcements.map((announcement, index) => (
                  <div
                    role="alert"
                    className="shadow-lg cursor-pointer alert rounded-2xl"
                    key={index}
                    onClick={() => openModal(announcement)}
                  >
                    <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                    <div>
                      <h3 className="font-bold">{announcement.name}</h3>
                      <div className="text-xs">
                        {announcement.announcementSource}
                      </div>
                    </div>
                    <button
                      className="flex shadow-inner btn btn-square hover:bg-base-300"
                      onClick={() => openModal(announcement)}
                    >
                      <Icon icon="lets-icons:view" className="w-10 h-10" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Event Details */}
      <div className="">
        <Modal
          className="flex items-center justify-center w-screen h-screen  bg-black/60"
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Announcement Details"
          ariaHideApp={false}
        >
          {selectedAnnouncement && (
            <div className="items-center justify-center h-auto p-6 duration-150 ease-in-out shadow-md bg-base-100 rounded-3xl w-7/9">
              <div className="flex space-x-4">
                <div className="relative p-6 shadow-inner bg-base-200 rounded-2xl w-100 h-120">
                  <h1 className="text-4xl font-semibold capitalize">
                    {selectedAnnouncement.name} -{" "}
                    {selectedAnnouncement.announcementSource}
                  </h1>
                  <p>Description:</p>
                  <p>{selectedAnnouncement.announcementDesc}</p>
                  <br />
                  <p>
                    Event: {selectedAnnouncement.eventName} on{" "}
                    {selectedAnnouncement.roomName}
                  </p>
                  <p>{selectedAnnouncement.status}</p>
                  <br />
                  {selectedAnnouncement.status === "available" ? (
                    <p>
                      Time: {formatTime(selectedAnnouncement.startDate)} -{" "}
                      {formatTime(selectedAnnouncement.endDate)}
                    </p>
                  ) : (
                    <p>
                      From: {formatDate(selectedAnnouncement.startDate)} -
                      Until: {formatDate(selectedAnnouncement.endDate)}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="w-12 shadow-inner btn bg-base-200 btn-square"
                >
                  <Icon icon="line-md:close-small" className="w-10 h-10" />
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Announcements;

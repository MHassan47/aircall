import React, { useEffect, useState } from "react";
import "../css/activityFeed.css";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { RiArchiveFill, RiInformationFill } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";
import CallInfoModal from "./CallInfoModal.jsx";
import axios from "axios";

function ActivityFeed({ data, archive, setIsCallArchived }) {
  const [isOpen, setIsOpen] = useState(false);
  const [callID, setCallID] = useState();

  const archiveClickHandler = (callID) => {
    setIsCallArchived(true);

    axios
      .post(`https://aircall-job.herokuapp.com/activities/${callID}`, {
        is_archived: true,
      })

      .then(() => setIsCallArchived(false))
      .catch((error) => console.log(error));
  };

  const undoarchiveClickHandler = (callID) => {
    setIsCallArchived(true);

    axios
      .post(`https://aircall-job.herokuapp.com/activities/${callID}`, {
        is_archived: false,
      })

      .then(() => setIsCallArchived(false))
      .catch((error) => console.log(error));
  };

  const infoClickHandler = (callID) => {
    setIsOpen(true);
    setCallID(callID);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="activity_container">
      {isOpen && (
        <CallInfoModal callID={callID} open={isOpen} onClose={onClose} />
      )}

      {data
        .filter((item) => item.is_archived === archive)
        .map((call) => {
          // if (!call.is_archived)
          return (
            <div className="activity_item" key={call.id}>
              <div className="activity_icon">
                {call.direction === "inbound" ? (
                  <BsFillTelephoneInboundFill />
                ) : (
                  <BsFillTelephoneOutboundFill />
                )}
                <h1 className="activity_caller">{call.from}</h1>
              </div>
              <div className="activity_right">
                <h2 className="activity_called_at">
                  {new Date(call.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h2>
                <div className="options_icons">
                  {archive ? (
                    <TiArrowBack
                      onClick={() => undoarchiveClickHandler(call.id)}
                    />
                  ) : (
                    <RiArchiveFill
                      onClick={() => archiveClickHandler(call.id)}
                    />
                  )}
                  <RiInformationFill
                    onClick={() => infoClickHandler(call.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ActivityFeed;

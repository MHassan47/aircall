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

  // const checkDate = (index) => {
  //   const callDate = new Date(data[index].created_at).toDateString();
  //   const prevCallDate = new Date(data[index - 1].created_at).toDateString();
  //   if (callDate === prevCallDate) {
  //     return false;
  //   } else return false;
  // };
  return (
    <div className="activity_container">
      {isOpen && (
        <CallInfoModal callID={callID} open={isOpen} onClose={onClose} />
      )}

      {data
        .filter((item) => item.is_archived === archive)
        .map((call, index) => {
          return (
            <div key={call.id}>
              <div className="activity_date">
                {new Date(call.created_at).toDateString()}
              </div>

              <div className="activity_item">
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
            </div>
          );
        })}
    </div>
  );
}

export default ActivityFeed;

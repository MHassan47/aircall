import React, { useState } from "react";
import "../css/activityFeed.css";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { RiArchiveFill, RiInformationFill } from "react-icons/ri";
import CallInfoModal from "./CallInfoModal.jsx";

function ActivityFeed({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [callID, setCallID] = useState();
  const archiveClickHandler = () => {
    console.log("clicked archive");
  };
  const infoClickHandler = (callID) => {
    setIsOpen(true);
    setCallID(callID);
  };

  console.log(isOpen);
  console.log(callID);
  return (
    <div className="activity_container">
      {isOpen && <CallInfoModal callID={callID} open={isOpen} />}
      {data.map((call) => (
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
              <RiArchiveFill onClick={archiveClickHandler} />
              <RiInformationFill onClick={() => infoClickHandler(call.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;

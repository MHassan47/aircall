import React from "react";
import "../css/activityFeed.css";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { RiArchiveFill, RiInformationFill } from "react-icons/ri";

function ActivityFeed({ data }) {
  return (
    <div className="activity_container">
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
              <RiArchiveFill />
              <RiInformationFill />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;

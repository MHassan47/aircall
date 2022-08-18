import React from "react";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
function ActivityFeed({ data }) {
  return (
    <div className="activity_container">
      {data.map((call) => (
        <div className="activity_items" key={call.id}>
          <div className="activity_icon">
            {call.direction === "inbound" ? (
              <BsFillTelephoneInboundFill />
            ) : (
              <BsFillTelephoneOutboundFill />
            )}
          </div>
          <div className="activity_caller">{call.from}</div>
          <div className="activity_caller">{call.from}</div>
          <div className="activity_called_at">
            {new Date(call.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;

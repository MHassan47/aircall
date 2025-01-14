import React, { useState } from "react";
import "../css/activityFeed.css";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { RiInformationFill } from "react-icons/ri";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import CallInfoModal from "./CallInfoModal.jsx";
import axios from "axios";

function ActivityFeed({ data, archive, setIsCallArchived }) {
  const [isOpen, setIsOpen] = useState(false);
  const [callID, setCallID] = useState();

  // Handles POST to API to update call item status to archived
  const archiveClickHandler = (callID) => {
    setIsCallArchived(true);
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${callID}`, {
        is_archived: true,
      })

      .then(() => setIsCallArchived(false))
      .catch((error) => console.log(error));
  };

  // Handles POST to API to update call item status to NOT archived
  const undoArchiveClickHandler = (callID) => {
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

  // Logic to group calls based on date stamp
  const checkDate = (index) => {
    if (index > 0) {
      const currentCallDate = new Date(data[index].created_at).toDateString();
      const prevCallDate = new Date(data[index - 1].created_at).toDateString();

      if (currentCallDate === prevCallDate) {
        return true;
      }
    }
    return false;
  };

  // Filters data based on archive state
  const filteredData = data.filter((item) => item.is_archived === archive);

  return (
    <div className="activity_container">
      {isOpen && (
        <CallInfoModal callID={callID} open={isOpen} onClose={onClose} />
      )}
      {/* Conditionally renders to notify empty container */}
      {filteredData.length <= 0 ? (
        <div className="empty">
          {archive ? "No Archives Found" : "No Calls Found"}
        </div>
      ) : (
        <div>
          {/* Map through filtered data to render each call item */}
          {filteredData.map((call, index) => {
            return (
              <div key={call.id}>
                <div>
                  {/* Conditonally renders date stamp when unique new date is rendered */}
                  {!checkDate(index) && (
                    <div className="activity_date">
                      {new Date(call.created_at).toDateString()}
                    </div>
                  )}
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
                            onClick={() => undoArchiveClickHandler(call.id)}
                          />
                        ) : (
                          <TiArrowForward
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActivityFeed;

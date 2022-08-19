import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/callInfoModal.css";
import { HiUserCircle } from "react-icons/hi";

function CallInfoModal({ callID, open }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://aircall-job.herokuapp.com/activities/${callID}`)
      .then((results) => setData(results.data))
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  return (
    <div className="overlay">
      <div className="modal_container">
        <div className="close_btn">X</div>
        <div className="caller_info">
          <div className="caller_icon">
            <HiUserCircle />
          </div>
          {data.from} <br /> {data.via}
        </div>
        <div className="call_info">
          {data.to} {data.call_type} call at <br />
          {new Date(data.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          on {new Date(data.created_at).toDateString()}{" "}
        </div>
        <div>Call Duration: {data.duration} seconds</div>
      </div>
    </div>
  );
}

export default CallInfoModal;

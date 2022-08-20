import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/callInfoModal.css";
import { ThreeDots } from "react-loader-spinner";
import { HiUserCircle } from "react-icons/hi";

function CallInfoModal({ callID, onClose }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // GET detailed info of specific call item from API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://aircall-job.herokuapp.com/activities/${callID}`)
      .then((results) => setData(results.data))
      .catch((error) => console.log(error));
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="overlay">
      <div className="modal_container">
        <div className="close_btn" onClick={onClose}>
          X
        </div>
        {loading ? (
          <div className="spinner">
            <ThreeDots color="#727672" height={80} width={80} />
          </div>
        ) : (
          <div className="modal_content">
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
        )}
      </div>
    </div>
  );
}

export default CallInfoModal;

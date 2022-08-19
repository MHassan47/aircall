import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/callInfoModal.css";

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
        <div>{data.duration}</div>
      </div>
    </div>
  );
}

export default CallInfoModal;

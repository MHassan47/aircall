import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ActivityFeed from "./components/ActivityFeed.jsx";

import { useState } from "react";
import Header from "./Header.jsx";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Footer from "./components/Footer.jsx";
import SelectionMenu from "./components/SelectionMenu.jsx";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [archive, setArchive] = useState(false);
  const [isCallArchived, setIsCallArchived] = useState(false);

  const url = "https://aircall-job.herokuapp.com/activities";

  useEffect(() => {
    setLoading(true);

    axios
      .get(url)
      .then((results) => setData(results.data))

      .catch((error) => console.log(error));

    setTimeout(() => setLoading(false), 700);
  }, [isCallArchived]);

  return (
    <div className="container">
      <Header />
      <SelectionMenu archive={archive} setArchive={setArchive} />
      <div className="container-view">
        {loading ? (
          <div className="spinner">
            <ThreeDots color="#a2aaa2" height={80} width={80} />
          </div>
        ) : (
          <ActivityFeed
            data={data}
            archive={archive}
            setIsCallArchived={setIsCallArchived}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;

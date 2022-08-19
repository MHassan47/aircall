import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ActivityFeed from "./components/ActivityFeed.jsx";

import { useState } from "react";
import Header from "./Header.jsx";
import axios from "axios";
import Footer from "./components/Footer.jsx";

const App = () => {
  // const { data, loading, error } = useFetch("/activities");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "https://aircall-job.herokuapp.com/activities";
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((results) => setData(results.data))
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);
  console.log(data);
  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {loading ? "loading" : <ActivityFeed data={data} />}
      </div>
      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;

import React, { useState, useEffect } from "react";
import Teams from "./components/Teams";
import Activity from "./components/Activity";
import { Container } from "semantic-ui-react";
// import mockData from "../mockData.json";
const App = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("/api");
    const teamsArray = await response.json();
    // const teamsArray = mockData;
    setTeams(teamsArray);
  };

  

  return (
    <div className="container">
      <div className="header">
        <h1>TRMBA Basketball League</h1>
      </div>
      <Activity />
      <div className="teams">
        <Teams teamsArray={teams} />
      </div>
    </div>
  );
};

export default App;

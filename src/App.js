import React, { useState, useEffect } from "react";
import Teams from "./components/Teams";
import Activity from "./components/Activity";
// import mockData from "../mockData.json";
const App = () => {
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("/api");
    const teamsArray = await response.json();

    const matchupResponse = await fetch("/api/matchup");
    const matchupArray = await matchupResponse.json();

    // const teamsArray = mockData;
    setMatchups(matchupArray);
    setTeams(teamsArray);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>TRMBA Basketball League</h1>
      </div>
      <Activity />
      <div className="teams">
        <Teams teamsArray={teams} matchupsArray={matchups} />
      </div>
    </div>
  );
};

export default App;

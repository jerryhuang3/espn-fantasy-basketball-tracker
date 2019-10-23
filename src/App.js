import React, { useState, useEffect } from "react";
import Teams from "./components/Teams";
import Activity from "./components/Activity";
// import mockData from "../mockData.json";
const App = () => {
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [teamsFetch, matchupFetch, weeksFetch] = await Promise.all([
      fetch("/api"),
      fetch("/api/matchup"),
      fetch("/api/weeks")
    ]);
    const [teamsArray, matchupArray, weeksArray] = await Promise.all([
      teamsFetch.json(),
      matchupFetch.json(),
      weeksFetch.json()
    ]);
    // const teamsArray = mockData;
    setWeeks(weeksArray);
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
        <Teams teamsArray={teams} matchupsArray={matchups} weeksArray={weeks} />
      </div>
    </div>
  );
};

export default App;

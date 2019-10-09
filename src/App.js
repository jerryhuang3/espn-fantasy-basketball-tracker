import React, { useState, useEffect } from "react";
import Teams from "./components/Teams";
import { Container } from "semantic-ui-react";

const App = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("/api");
    const teamsArray = await response.json();
    setTeams(teamsArray);
  };

  return (
    <div className='container'>
      <div className="header">
        <h1>Fantasy Basketball League</h1>
      </div>
      <div className="teams">
        <Teams teamsArray={teams} />
      </div>
    </div>
  );
};

export default App;

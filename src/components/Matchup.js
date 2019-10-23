import React from "react";

const Matchup = ({ showMatchup, matchup }) => {
  return (
    <div className={showMatchup ? "show-matchup" : "show-matchup hide"}>
      {showMatchup ? (
        <React.Fragment>
          <div className="matchup-header">Week 1</div>
          <div className="home-team">
            <h2>Home</h2>
            <img src={matchup.homeTeam.logo} />
            <h2>{matchup.homeTeam.tag}</h2>
            <h4>{matchup.homeTeam.name}</h4>
            <h4>Points: {matchup.homeTeam.totalPointsLive}</h4>
          </div>
          <div className="versus">VS</div>
          <div className="away-team">
            <h2>Away</h2>
            <img src={matchup.awayTeam.logo} />
            <h2>{matchup.awayTeam.tag}</h2>
            <h4>{matchup.awayTeam.name}</h4>
            <h4>Points: {matchup.awayTeam.totalPointsLive}</h4>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default Matchup;

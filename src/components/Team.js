import React, { useState, useEffect } from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";

const Team = ({ team, expandRoster, isShowing, currentMatchup, mobile }) => {
  const [buttonText, setButtonText] = useState("show");
  const [points, setPoints] = useState(null);
  const [opponent, setOpponent] = useState({});

  useEffect(() => {
    if (isShowing !== team.id) {
      setButtonText("show");
    }
  }, [isShowing]);

  useEffect(() => {
    if (team.id === currentMatchup.homeTeam.teamId) {
      setPoints(currentMatchup.homeTeam.totalPointsLive);
      setOpponent(currentMatchup.awayTeam);
    } else {
      setPoints(currentMatchup.awayTeam.totalPointsLive);
      setOpponent(currentMatchup.homeTeam);
    }
  }, []);

  const onClick = e => {
    if (!isShowing || isShowing !== team.id) {
      setButtonText("hide");
    } else {
      setButtonText("show");
    }
    expandRoster(e, team.id);
  };

  let matchupStatus;
  if (opponent === "bye") {
    matchupStatus = "BYE BYE BYE";
  } else {
    matchupStatus =
      points > opponent.totalPointsLive ? "U BE WINNING" : "U BE LOSING";
  }

  return (
    <Table.Row className={isShowing && isShowing !== team.id ? `hide` : ""}>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={team.logo} rounded size="mini" />
          <Header.Content>
            {team.tag}
            <Header.Subheader className="team">
              {team.teamName}
            </Header.Subheader>
            <Header.Subheader className="team">{team.name}</Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{team.record.wins}</Table.Cell>
      <Table.Cell>{team.record.losses}</Table.Cell>
      {mobile ? (
        <React.Fragment></React.Fragment>
      ) : (
        <React.Fragment>
          <Table.Cell>{team.waiver}</Table.Cell>
          <Table.Cell>{team.rosterDraftAvg.toFixed(2)}</Table.Cell>
        </React.Fragment>
      )}
      <Table.Cell>
        <Button size="mini" onClick={onClick}>
          {buttonText}
        </Button>
        {isShowing === team.id ? " ►" : ""}
      </Table.Cell>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={opponent.logo} rounded size="mini" />
          <Header.Content>
            <Header.Subheader className="matchup">
              {matchupStatus}
            </Header.Subheader>
            <Header.Subheader className="matchup">
              {opponent !== "bye"
                ? `${points} to ${opponent.totalPointsLive}`
                : ""}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
    </Table.Row>
  );
};

export default Team;

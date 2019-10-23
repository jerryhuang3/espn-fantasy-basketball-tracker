import React, { useState, useEffect } from "react";
import { Header, Image, Table, Button, Dropdown } from "semantic-ui-react";

const Team = ({
  team,
  expandRoster,
  expandMatchup,
  matchup,
  showRoster,
  currentMatchup,
  mobile,
  weeks
}) => {
  const [buttonText, setButtonText] = useState("show");
  const [points, setPoints] = useState(null);
  const [opponent, setOpponent] = useState({});

  useEffect(() => {
    console.log(mobile)
    if (showRoster !== team.id) {
      setButtonText("show");
    }
  }, [showRoster]);

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
    if (!showRoster || showRoster !== team.id) {
      setButtonText("hide");
    } else {
      setButtonText("show");
    }
    expandRoster(e, team.id);
  };

  const selectMatchup = (e, data) => {
    if (data.children === "BYE BYE BYE") {
      return;
    }
    expandMatchup(currentMatchup, team.id);
  };

  let matchupStatus;
  if (opponent === "bye") {
    matchupStatus = "BYE BYE BYE";
  } else {
    if (points > opponent.totalPointsLive) {
      matchupStatus = "U WINNIN'";
    } else if (points < opponent.totalPointsLive) {
      matchupStatus = "U LOSIN'";
    } else {
      matchupStatus = "U BE TIED";
    }
  }

  return (
    <Table.Row
      className={
        (showRoster && showRoster !== team.id) ||
        (matchup && matchup !== team.id)
          ? `hide`
          : ""
      }
    >
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
        {showRoster === team.id ? " ►" : ""}
      </Table.Cell>
      <Table.Cell>
        <Header as="h4" image>
          {!mobile && opponent.logo ? (
            <Image src={opponent.logo} rounded size="mini" />
          ) : (
            ""
          )}
          <Header.Content>
            <Header.Subheader className="matchup">
              {opponent === "bye" ? (
                matchupStatus
              ) : (
                <React.Fragment>
                  <Button size="mini" onClick={selectMatchup}>
                    {matchupStatus}
                  </Button>
                  {matchup === team.id ? " ►" : ""}
                </React.Fragment>
              )}
            </Header.Subheader>{" "}
          </Header.Content>
        </Header>
      </Table.Cell>
    </Table.Row>
  );
};

export default Team;

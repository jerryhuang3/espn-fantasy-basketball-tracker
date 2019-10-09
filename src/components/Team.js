import React, { useState, useEffect } from "react";
import { Header, Image, Table, TableBody, Container } from "semantic-ui-react";

const Team = ({ team, expandRoster, isShowing }) => {
  const [buttonText, setButtonText] = useState("show");
  const [avgDraft, setAvgDraft] = useState(null);

  useEffect(() => {
    if (isShowing !== team.id) {
      setButtonText("show");
    }
  }, [isShowing]);

  useEffect(() => {
    const draftPositionArray = team.roster.map(
      player => player.averageDraftPosition
    );

    let sum = 0;
    for (let i = 0; i < draftPositionArray.length; i++) {
      sum += parseInt(draftPositionArray[i]);
    }
    setAvgDraft((sum / draftPositionArray.length).toFixed(2));
  }, []);

  const onClick = e => {
    if (!isShowing || isShowing !== team.id) {
      setButtonText("hide");
    } else {
      setButtonText("show");
    }
    expandRoster(e, team.id);
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={team.logo} rounded size="mini" />
          <Header.Content>
            {team.tag}
            <Header.Subheader>{team.teamName}</Header.Subheader>
            <Header.Subheader>{team.name}</Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{team.record.wins}</Table.Cell>
      <Table.Cell>{team.record.losses}</Table.Cell>
      <Table.Cell>{team.waiver}</Table.Cell>
      <Table.Cell>{avgDraft}</Table.Cell>
      <Table.Cell>
        <button onClick={onClick}>{`${buttonText} roster`}</button>
        {isShowing === team.id ? " ►" : ""}
      </Table.Cell>
    </Table.Row>
  );
};

export default Team;

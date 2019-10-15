import React, { useState, useEffect } from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";

const Team = ({ team, expandRoster, isShowing }) => {
  const [buttonText, setButtonText] = useState("show");

  useEffect(() => {
    if (isShowing !== team.id) {
      setButtonText("show");
    }
  }, [isShowing]);

  useEffect(() => {
   
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
    <Table.Row className={isShowing && isShowing !== team.id ? `hide` : ""}>
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
      <Table.Cell>{team.rosterDraftAvg.toFixed(2)}</Table.Cell>
      <Table.Cell>
        <Button size="mini" onClick={onClick}>
          {buttonText}
        </Button>
        {isShowing === team.id ? " ►" : ""}
      </Table.Cell>
    </Table.Row>
  );
};

export default Team;

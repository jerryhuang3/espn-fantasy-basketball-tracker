import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import Team from "./Team";

const Teams = ({ teamsArray }) => {
  const [teams, setTeams] = useState([]);
  const [isSorted, setIsSorted] = useState(null);
  const [sortTag, setSortTag] = useState(null);
  const [url, setUrl] = useState(null);
  const [isShowing, setIsShowing] = useState(null);

  useEffect(() => {
    setTeams(teamsArray);
  }, [teamsArray, teams]);

  const sortTable = e => {
    const sortType = e.target.getAttribute("data-value");
    setIsSorted(sortType);
    if (!sortTag || sortTag === "▼") {
      const sortedTeams = teams.sort((a, b) =>
        a[sortType] > b[sortType] ? 1 : -1
      );
      setTeams(sortedTeams);
      setSortTag("▲");
    } else {
      const sortedTeams = teams.sort((a, b) =>
        a[sortType] < b[sortType] ? 1 : -1
      );
      setTeams(sortedTeams);
      setSortTag("▼");
    }
  };

  const expandRoster = (e, id) => {
    if (!isShowing || isShowing !== id) {
      setIsShowing(id);
    } else {
      setIsShowing(null);
    }
  };

  const team = teams.map(team => (
    <Team
      key={team.id}
      expandRoster={expandRoster}
      team={team}
      isShowing={isShowing}
    />
  ));

  const bballRef = e => {
    const name = e.target.getAttribute("data-name");
    const nameArray = name.toLowerCase().split(" ");
    const firstLetterLastName = nameArray[1].slice(0, 1);
    const firstFiveLettersLastName = nameArray[1].slice(0, 5);
    const firstTwoLettersFirstName = nameArray[0].slice(0, 2);

    const website = `https://www.basketball-reference.com/players/${firstLetterLastName}/${firstFiveLettersLastName}${firstTwoLettersFirstName}01.html`;

    setUrl(website);
  };

  if (url) {
    window.open(url);
    setUrl(null);
  }

  return (
    <React.Fragment>
      <div className="teams-list">
        <Table basic="very" celled collapsing sortable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team</Table.HeaderCell>

              <Table.HeaderCell>
                <p>Wins</p>
              </Table.HeaderCell>
              <Table.HeaderCell>Losses</Table.HeaderCell>
              <Table.HeaderCell>
                <p onClick={sortTable} data-value={"waiver"}>
                  Waiver # {isSorted === "waiver" ? sortTag : ""}
                </p>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <p onClick={sortTable} data-value={"rosterDraftAvg"}>
                  Draft Avg {isSorted === "rosterDraftAvg" ? sortTag : ""}
                </p>
              </Table.HeaderCell>
              <Table.HeaderCell>Roster</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{team}</Table.Body>
        </Table>
      </div>

      <div className="roster">
        <Table basic="very" celled collapsing unstackable>
          <Table.Header
            id={"roster-header"}
            className={isShowing ? `show-header` : ""}
          >
            <Table.Row>
              <Table.HeaderCell>Player Name</Table.HeaderCell>
              <Table.HeaderCell>Avg Draft Position</Table.HeaderCell>
              <Table.HeaderCell>2020 Proj Total</Table.HeaderCell>
              <Table.HeaderCell>2020 Proj Avg</Table.HeaderCell>
              <Table.HeaderCell>2019 Total</Table.HeaderCell>
              <Table.HeaderCell>2019 Average</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {teams.map(team =>
            team.roster.map(player => (
              <Table.Body
                key={player.name}
                id={`roster-${team.id}`}
                className={isShowing === parseInt(team.id) ? `show-roster` : ""}
              >
                <Table.Row>
                  <Table.Cell>
                    <a onClick={bballRef} data-name={player.name}>
                      {player.name}
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {player.averageDraftPosition.toFixed(2)}
                  </Table.Cell>
                  <Table.Cell>{player.projTot.toFixed(1)}</Table.Cell>
                  <Table.Cell>{player.projAvg.toFixed(2)}</Table.Cell>
                  <Table.Cell>{player.lastYearTot.toFixed(1)}</Table.Cell>
                  <Table.Cell>{player.lastYearAvg.toFixed(2)}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))
          )}
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Teams;

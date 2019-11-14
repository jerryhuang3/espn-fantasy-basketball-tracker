import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import Team from './Team';
import Matchup from './Matchup';
import Player from './Player';

const Teams = ({ teamsArray, matchupsArray, weeksArray, currentWeek }) => {
	const [teams, setTeams] = useState([]);
	const [isSorted, setIsSorted] = useState(null);
	const [sortTag, setSortTag] = useState(null);
	const [showRoster, setShowRoster] = useState(null);
	const [matchup, setMatchup] = useState({});
	const [showMatchup, setShowMatchup] = useState(null);
	const [mobile, setMobile] = useState(true);

	useEffect(() => {
		setTeams(teamsArray);
	}, [teamsArray, teams]);

	useEffect(() => {
		if (window.innerWidth <= 600) {
			setMobile(true);
		} else {
			setMobile(false);
		}
	}, []);

	const sortTable = e => {
		const sortType = e.target.getAttribute('data-value');
		setIsSorted(sortType);
		if (!sortTag || sortTag === '▼') {
			const sortedTeams = teams.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1));
			setTeams(sortedTeams);
			setSortTag('▲');
		} else {
			const sortedTeams = teams.sort((a, b) => (a[sortType] < b[sortType] ? 1 : -1));
			setTeams(sortedTeams);
			setSortTag('▼');
		}
	};

	const expandRoster = (e, id) => {
		if (!showRoster || showRoster !== id) {
			setShowRoster(id);
			setShowMatchup(null);
		} else {
			setShowRoster(null);
		}
	};
	const expandMatchup = (currentMatchup, id) => {
		if (!showMatchup || showMatchup !== id) {
			setMatchup(currentMatchup);
			setShowMatchup(id);
			setShowRoster(null);
		} else {
			setShowMatchup(null);
		}
	};

	const team = teamsArray.map(team => (
		<Team
			key={team.id}
			expandRoster={expandRoster}
			expandMatchup={expandMatchup}
			matchup={showMatchup}
			team={team}
			showRoster={showRoster}
			currentMatchup={matchupsArray.find(game => team.id === game.homeTeam.teamId || team.id === game.awayTeam.teamId)}
			mobile={mobile}
			weeks={weeksArray}
		/>
	));

	return (
		<React.Fragment>
			<div className='teams-list'>
				<Table basic='very' celled collapsing sortable unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Team</Table.HeaderCell>

							<Table.HeaderCell>
								<p>Wins</p>
							</Table.HeaderCell>
							<Table.HeaderCell>Losses</Table.HeaderCell>
							{mobile ? (
								<React.Fragment></React.Fragment>
							) : (
								<React.Fragment>
									<Table.HeaderCell>
										<p onClick={sortTable} data-value={'waiver'}>
											Waiver # {isSorted === 'waiver' ? sortTag : ''}
										</p>
									</Table.HeaderCell>
									<Table.HeaderCell>
										<p onClick={sortTable} data-value={'rosterDraftAvg'}>
											Draft Avg {isSorted === 'rosterDraftAvg' ? sortTag : ''}
										</p>
									</Table.HeaderCell>
								</React.Fragment>
							)}
							<Table.HeaderCell>Roster</Table.HeaderCell>
							<Table.HeaderCell>Current Matchup</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>{team}</Table.Body>
				</Table>
			</div>

			{/***** ROSTER ******/}
			<div className='roster'>
				<Table basic='very' celled collapsing unstackable>
					<Table.Header id={'roster-header'} className={showRoster ? `show-header` : ''}>
						<Table.Row>
							<Table.HeaderCell>Player Name</Table.HeaderCell>
							<Table.HeaderCell>Avg Draft Position</Table.HeaderCell>
							<Table.HeaderCell>2019 Total</Table.HeaderCell>
							<Table.HeaderCell>2019 Average</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					{teams.map(team =>
						team.roster.map(player => (
							<Table.Body key={player.name} id={`roster-${team.id}`} className={showRoster === parseInt(team.id) ? `show-roster` : ''}>
								<Table.Row>
									<Table.Cell>
										<Player player={player} />
									</Table.Cell>
									<Table.Cell>{player.averageDraftPosition.toFixed(2)}</Table.Cell>
									<Table.Cell>{player.yearTot.toFixed(1)}</Table.Cell>
									<Table.Cell>{player.yearAvg.toFixed(2)}</Table.Cell>
								</Table.Row>
							</Table.Body>
						))
					)}
				</Table>
			</div>

			{/***** Matchup ******/}
			<Matchup showMatchup={showMatchup} matchup={matchup} currentWeek={currentWeek} />
			{/* <div className={showMatchup ? "show-matchup" : "show-matchup hide"}>
        {showMatchup ? (
          <React.Fragment>
            <div className="matchup-header">Week 1</div>
            <div className="home-team">
              <img src={matchup.homeTeam.logo} />
              <h2>{matchup.homeTeam.tag}</h2>
              <h2>{matchup.homeTeam.name}</h2>
              <h2>Total Points: {matchup.homeTeam.totalPointsLive}</h2>
            </div>
            <div className="versus">VS</div>
            <div className="away-team">
              <img src={matchup.awayTeam.logo} />
              <h2>{matchup.awayTeam.tag}</h2>
              <h2>{matchup.awayTeam.name}</h2>
              <h2>Total Points: {matchup.awayTeam.totalPointsLive}</h2>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div> */}
		</React.Fragment>
	);
};

export default Teams;

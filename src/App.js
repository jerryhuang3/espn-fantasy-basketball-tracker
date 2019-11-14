import React, { useState, useEffect } from 'react';
import Teams from './components/Teams';
import Activity from './components/Activity';
// import mockData from "../mockData.json";
const App = () => {
	const [teams, setTeams] = useState([]);
	const [matchups, setMatchups] = useState([]);
	const [weeks, setWeeks] = useState([]);
	const [currentWeek, setCurrentWeek] = useState(0);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const [teamsFetch, matchupFetch, weeksFetch] = await Promise.all([fetch('/api'), fetch('/api/matchup'), fetch('/api/weeks')]);
		const [teamsArray, matchupArray, weeksArray] = await Promise.all([teamsFetch.json(), matchupFetch.json(), weeksFetch.json()]);
		// const teamsArray = mockData;
		setWeeks(weeksArray);
		setMatchups(matchupArray.matchupObj);
		setCurrentWeek(matchupArray.currentWeek);
		setTeams(teamsArray);
	};

	return (
		<div className='container'>
			<div className='header'>
				<h1>
					<a href='https://fantasy.espn.com/basketball/league?leagueId=54564064'>TRMBA Basketball League</a>
				</h1>
			</div>
			<Activity />
			<div className='teams'>
				{teams[0] ? <Teams teamsArray={teams} matchupsArray={matchups} weeksArray={weeks} currentWeek={currentWeek} /> : <h1>Loading...</h1>}
			</div>
		</div>
	);
};

export default App;

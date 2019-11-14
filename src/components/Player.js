import React, { useState, useEffect } from 'react';
import { Button, Image, Header, Modal, Table } from 'semantic-ui-react';

const Player = ({ player }) => {
	const bballRef = () => {
		const name = player.name;
		const nameArray = name.toLowerCase().split(' ');
		const firstLetterLastName = nameArray[1].slice(0, 1);
		const firstFiveLettersLastName = nameArray[1].slice(0, 5);
		const firstTwoLettersFirstName = nameArray[0].slice(0, 2);

		const website = `https://www.basketball-reference.com/players/${firstLetterLastName}/${firstFiveLettersLastName}${firstTwoLettersFirstName}01.html`;

		window.open(website);
	};

	return (
		<Modal trigger={<a>{player.name}</a>}>
			<Modal.Content image>
				<Image wrapped size='medium' src={`https://a.espncdn.com/i/headshots/nba/players/full/${player.playerId}.png`} />
				<Modal.Description>
					<Header textAlign='center'>{player.name}</Header>
						<Table basic='very' celled collapsing unstackable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>2020 Total</Table.HeaderCell>
									<Table.HeaderCell>2020 Avg</Table.HeaderCell>
									<Table.HeaderCell>2020 Proj Total</Table.HeaderCell>
									<Table.HeaderCell>2020 Proj Avg</Table.HeaderCell>
									<Table.HeaderCell>2019 Total</Table.HeaderCell>
									<Table.HeaderCell>2019 Avg</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								<Table.Row>
									<Table.Cell>{player.yearTot.toFixed(1)}</Table.Cell>
									<Table.Cell>{player.yearAvg.toFixed(2)}</Table.Cell>
									<Table.Cell>{player.projTot.toFixed(1)}</Table.Cell>
									<Table.Cell>{player.projAvg.toFixed(2)}</Table.Cell>
									<Table.Cell>{player.lastYearTot.toFixed(1)}</Table.Cell>
									<Table.Cell>{player.lastYearAvg.toFixed(2)}</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					<p>
						<a onClick={bballRef}>
							Basketball-Reference&nbsp;&nbsp; <i className='fas fa-external-link-alt'></i>
						</a>
					</p>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
};

export default Player;

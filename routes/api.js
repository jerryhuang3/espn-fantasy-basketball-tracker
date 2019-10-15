require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

const url =
  "https://fantasy.espn.com/apis/v3/games/fba/seasons/2020/segments/0/leagues/54564064";
const cookie = `SWID=${process.env.SWID};espn_s2=${process.env.ESPN_S2}`;

const sort = (data, key) => {
  if (key === "owners") {
    return data.sort((a, b) => (a[key][0] > b[key][0] ? 1 : -1));
  } else if (key === "id") {
    return data.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else if (key === "date") {
    return data.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
};

router.get("/", async function(req, res, next) {
  let teamObjArray = [];
  const [league, roster] = await Promise.all([
    axios.get(`${url}?view=mTeam`, {
      headers: {
        Cookie: cookie
      }
    }),
    axios.get(`${url}?view=mRoster`, {
      headers: {
        Cookie: cookie
      }
    })
  ]);

  const teamsArray = league.data.teams;
  const membersArray = league.data.members;
  const rostersArray = roster.data.teams;
  sort(teamsArray, "owners");

  teamsArray.forEach(team =>
    teamObjArray.push({
      id: team.id,
      owner: team.owners[0],
      teamName: `${team.location} ${team.nickname}`.trim(),
      tag: team.abbrev,
      logo: team.logo,
      record: {
        wins: team.record.overall.wins,
        losses: team.record.overall.losses
      },
      waiver: team.waiverRank,
      roster: []
    })
  );
  membersArray.forEach((member, idx) => {
    teamObjArray[idx].name = `${member.firstName} ${member.lastName}`;
  });

  sort(teamObjArray, "id");

  rostersArray.forEach((team, teamIdx) => {
    team.roster.entries.forEach((player, playerIdx) => {
      teamObjArray[teamIdx].roster.push({
        name: player.playerPoolEntry.player.fullName,
        averageDraftPosition:
          player.playerPoolEntry.player.ownership.averageDraftPosition,
        projTot: player.playerPoolEntry.player.stats[4].appliedTotal,
        projAvg: player.playerPoolEntry.player.stats[4].appliedAverage,
        lastYearTot: player.playerPoolEntry.player.stats[6]
          ? player.playerPoolEntry.player.stats[6].appliedTotal
          : 0,
        lastYearAvg: player.playerPoolEntry.player.stats[6]
          ? player.playerPoolEntry.player.stats[6].appliedAverage
          : 0
      });
    });
  });

  teamObjArray.forEach((team, teamidx) => {
    team.rosterDraftAvg =
      team.roster
        .map(player => player.averageDraftPosition)
        .reduce((acc, val) => {
          return acc + val;
        }) / team.roster.length;
  });

  res.json(teamObjArray);
});

//ACTIVITY_MAP = {
//   178: 'ADDED',
//   180: 'ADDED',
//   179: 'DROPPED',
//   181: 'DROPPED',
//   239: 'DROPPED',
//   244: 'TRADED'
// }

router.get("/test", async (req, res) => {
  const [fetch_players, fetch_teams] = await Promise.all([
    axios.get(`${url}?view=players_wl`, {
      headers: {
        Cookie: cookie
      }
    }),
    axios.get(`${url}?view=mTeam`, {
      headers: {
        Cookie: cookie
      }
    })
  ]);

  const nbaPlayers = fetch_players.data.players.map(players => ({
    id: players.player.id,
    name: players.player.fullName
  }));

  const teamsObj = fetch_teams.data.teams.map(team => ({
    id: team.id,
    owner: team.owners[0],
    teamName: `${team.location} ${team.nickname}`.trim(),
    tag: team.abbrev,
    logo: team.logo,
    record: {
      wins: team.record.overall.wins,
      losses: team.record.overall.losses
    },
    waiver: team.waiverRank,
    roster: []
  }));

  let activityArray = []; // to: teamid, date, targetId: playerId

  const response = await axios.get(`${url}?view=kona_league_communication`, {
    headers: {
      Cookie: cookie
    }
  });

  response.data.communication.topics
    .filter(msg => msg.type === "ACTIVITY_TRANSACTIONS")
    .forEach(activity => {
      activity.messages.forEach(msg => {
        if (msg.messageTypeId === 180 || msg.messageTypeId === 178) {
          activityArray.push({
            activity: "added",
            date: msg.date.toString(),
            player: nbaPlayers.find(player => player.id === msg.targetId).name,
            team: teamsObj.find(team => team.id === msg.to).teamName
          });
        }
        if (msg.messageTypeId === 179 || msg.messageTypeId === 181) {
          activityArray.push({
            activity: "dropped",
            date: msg.date.toString(),
            player: nbaPlayers.find(player => player.id === msg.targetId).name,
            team: teamsObj.find(team => team.id === msg.to).teamName
          });
        }
        if (msg.messageTypeId === 239) {
          activityArray.push({
            activity: "dropped",
            date: msg.date.toString(),
            player: nbaPlayers.find(player => player.id === msg.targetId).name,
            team: teamsObj.find(team => team.id === msg.for).teamName
          });
        }
      });
    });

  sort(activityArray, "date");
  res.json(activityArray);
});

module.exports = router;

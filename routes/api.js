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
  } else {
    return data.sort((a, b) => (a.id > b.id ? 1 : -1));
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
  res.json(teamObjArray);
});

module.exports = router;

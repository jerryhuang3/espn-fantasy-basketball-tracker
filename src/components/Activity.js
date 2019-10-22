import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import moment from "moment";

const Activity = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activity, setActivity] = useState([]);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await fetch("/api/test");
    const activityArray = await response.json();
    setActivity(activityArray);
    setIsLoading(false);
  };
  const close = () => {
    setActivity([]);
  };

  const bballRef = e => {
    const name = e.target.getAttribute("data-name");
    const nameArray = name.toLowerCase().split(" ");
    const firstLetterLastName = nameArray[1].slice(0, 1);
    const firstFiveLettersLastName = nameArray[1].slice(0, 5);
    const firstTwoLettersFirstName = nameArray[0].slice(0, 2);

    const website = `https://www.basketball-reference.com/players/${firstLetterLastName}/${firstFiveLettersLastName}${firstTwoLettersFirstName}01.html`;
    window.open(website);
  };

  return (
    <div className="activity">
      {activity[0] ? (
        <Button color="red" onClick={close}>
          close
        </Button>
      ) : (
        <Button color="green" onClick={handleClick}>
          check recent activity
        </Button>
      )}

      {isLoading ? (
        "LOADING..."
      ) : (
        <div className="recent">
          {activity.map(i => (
            <React.Fragment>
              <span>
                {moment(parseInt(i.date)).format("MMMM Do YYYY, h:mm a")}:
              </span>
              <span>
                {i.team} {i.activity}{" "}
                <a onClick={bballRef} data-name={i.player}>
                  {i.player}
                </a>
                .
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;

import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import moment from "moment";

const Activity = () => {
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

  let recent_activity;

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
                {i.team} {i.activity} {i.player}.
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;

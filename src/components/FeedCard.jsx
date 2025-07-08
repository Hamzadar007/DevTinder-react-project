import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, lastName, age, gender } = user;

  return (
    <div className="" key={firstName}>
      <div className="card bg-base-300 w-96 shadow-sm overflow-hidden rounded-2xl">
        <img
          className="p-1"
          src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/6-512.png"
          alt="Shoes"
        />
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>This is default about this user</p>
          <div className="card-actions">
            <button className="btn btn-secondary flex flex-1">Ignore</button>
            <button className="btn btn-primary flex flex-1">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

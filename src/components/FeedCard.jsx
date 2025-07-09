import React from "react";

const FeedCard = ({ user, fromEditProfile, sendOrIgnoreUser }) => {
  const { firstName, lastName, age, gender, avatar, about, _id } = user;

  return (
    <div className="" key={firstName}>
      <div className="card bg-base-300 w-96 shadow-sm overflow-hidden">
        <img className="p-1" src={avatar} alt="Shoes" />
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          {about && <p>{about}</p>}
          {!fromEditProfile && (
            <div className="card-actions">
              <button
                className="btn btn-secondary flex flex-1"
                onClick={() => sendOrIgnoreUser?.("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-primary flex flex-1"
                onClick={() => sendOrIgnoreUser?.("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

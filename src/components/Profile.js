import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loading, user } = useAuth0();


  if (loading || !user) {
    return <div>Loading...</div>;
  }


  return (
  <div className = "profile">
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>Hi, {user.name}</h2>
      <p>email: {user.email}</p>
    </Fragment>
   <Link to="/streams">
    <button>Edit Streams</button>
  </Link>
  </div>
  );
};

export default Profile;
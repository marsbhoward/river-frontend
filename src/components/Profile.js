import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loading, user } = useAuth0();


  if (loading || !user) {
    return <div>Loading...</div>;
  }


  return (
  <div>
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </Fragment>
   <Link to="/streams">
    <button>My streams</button>
  </Link>
  </div>
  );
};

export default Profile;
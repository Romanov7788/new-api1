import React, { useContext } from "react";
import { AuthContext } from "../hooks/AuthProvider";

const CurrentUser = () => {

  const { user } = useContext(AuthContext);

  return user ? (
    <section>
      <h3> Email - {user.email}</h3>
      <h3> Role - {user.roles}</h3>
      <br />
      <a href="/api/users">
        <button> All Users (Admin) </button>
      </a>
    </section>
  ) : null;
};
export default CurrentUser;

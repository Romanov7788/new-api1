// import {setGetuser} from "react";
import { useSelector } from "react-redux";

// const getUser = setGetuser();

const User = () => {
  const user = useSelector((state) => state.user);

  // console.log("props", getUser);

  return user ? (
    <div>
      <h1>Hello ${user.currentUser.email}</h1>
    </div>
  ) : null
}

export default User;
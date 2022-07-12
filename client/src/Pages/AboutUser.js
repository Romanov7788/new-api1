import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../components/api/index";
import axios from "axios";



const AboutUser = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

// useEffect(() => {
//     axios.get(`${url}/api/users/${id}`)
//         .then(res => res.json())
//         .then(data => setUser(data))
//     }, [id]);
//     // console.log("sdfs", user);

    useEffect(() => {
        axios.get(`${url}/api/users/${id}`, config).then((res) => {
          const userData = res || null;
          setUsers(userData.data);
          console.log("sdfs", userData);
        });
      }, []);

  return users ? (
    <h3>
    Email : {users.email}
    <br/>
    User id : {users._id}
    <br/>
    User role : {users.roles}
    <br/>
    </h3>
  ) : <p>No users</p>
};
export default AboutUser;

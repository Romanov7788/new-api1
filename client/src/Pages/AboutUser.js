import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../components/api/index";

const AboutUser = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);

  async function Users() {
    try {
      await api.get(`/users/${id}`).then((response) => setUsers(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    Users();
  }, []);

  return users ? (
    <h3>
      Email : {users.email}
      <br />
      User id : {users._id}
      <br />
      User role : {users.roles}
      <br />
    </h3>
  ) : (
    <p>Not access, access only Admin</p>
  );
};
export default AboutUser;

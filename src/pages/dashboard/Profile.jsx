import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectUser } from "../../features/user/userSlice";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { updateUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => selectUser(state));
  const loading = useSelector((state) => selectLoading(state));
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    location: user.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = userData;
    if (!name || !lastName || !email || !location) {
      toast.error("Please provide all the details");
      return;
    }
    dispatch(updateUser(userData));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            labelText="Name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
            labelText="lastName"
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
            labelText="Email"
          />
          <FormRow
            type="text"
            name="location"
            handleChange={handleChange}
            value={userData.location}
            labelText="Location"
          />
          <button className="btn btn-block" disabled={loading}>
            Save Changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;

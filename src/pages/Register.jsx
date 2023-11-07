import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  selectLoading,
  selectUser,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const loading = useSelector((state) => selectLoading(state));
  const user = useSelector((state) => selectUser(state));
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user) navigate("/");
    }, 2000);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, isMember, password } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please provide all the values");
      return;
    }
    if (values.isMember) {
      dispatch(loginUser({ email, password }));
      return;
    } else {
      dispatch(registerUser({ email, name, password }));
      return;
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            labelText="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          name="email"
          type="email"
          labelText="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          name="password"
          type="password"
          labelText="password"
          value={values.password}
          handleChange={handleChange}
        />
        <div className="form-row">
          <button className="btn btn-block" type="submit" disabled={loading}>
            {values.isMember ? "Login" : "Register"}
          </button>
        </div>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

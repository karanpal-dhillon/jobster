import { useDispatch, useSelector } from "react-redux";
import { selectJob } from "../../features/jobs/jobSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import {
  handleChange,
  clearState,
  createJobThunk,
} from "../../features/jobs/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((state) => selectJob(state));

  const dispatch = useDispatch();
  const { location: userLocation } = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(handleChange({ name: "jobLocation", value: userLocation }), []);
  }, []);
  const handleJobInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleClearState = () => {
    dispatch(clearState());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createJobThunk({ position, company, jobLocation, jobType, status }),
    );
  };

  return (
    <Wrapper>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
          <div className="form-center">
            <FormRow
              name="position"
              labelText="position"
              type="text"
              handleChange={handleJobInput}
              value={position}
            />
            <FormRow
              name="company"
              labelText="company"
              type="text"
              handleChange={handleJobInput}
              value={company}
            />
            <FormRow
              name="jobLocation"
              labelText="Job Location"
              type="text"
              handleChange={handleJobInput}
              value={jobLocation}
            />
            <FormRowSelect
              name="status"
              value={status}
              handleChange={handleJobInput}
              options={statusOptions}
            />
            <FormRowSelect
              name="jobType"
              value={jobType}
              handleChange={handleJobInput}
              options={jobTypeOptions}
            />
            <div>
              <button
                className="btn clear-btn"
                type="button"
                onClick={handleClearState}
              >
                Clear
              </button>
              <button className="btn" type="submit" disabled={isLoading}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddJob;

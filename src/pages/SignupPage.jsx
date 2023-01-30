import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";

import { apiSignup } from "../services/api/user";

const SignupPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    password: "",
    isLoading: false,
    callApi: false,
  });

  const [error, setError] = useState("");

  const isValid = useMemo(() => {
    if (state.name && state.password) {
      return true;
    }
    return false;
  }, [state.name, state.password]);

  const handleChange = ({ e, field }) => {
    if (field === "name") {
      setState((prev) => ({
        ...prev,
        name: e.target.value,
      }));
    } else if (field === "password") {
      setState((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    }
  };

  useEffect(() => {
    const doSignup = async () => {
      try {
        const { data } = await apiSignup({
          payload: {
            name: state.name,
            password: state.password,
          },
        });
        resetState();
        navigate("/login");
      } catch (error) {
        setError(`failed to do signup`);
        console.log(error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false, callApi: false }));
      }
    };
    if (state.callApi && state.name && state.password) {
      doSignup();
    }
  }, [state.callApi, state.name, state.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("came");
    setState((prev) => ({ ...prev, callApi: true }));
  };

  const resetState = () => {
    setState({
      name: "",
      password: "",
      isLoading: false,
      callApi: false,
    });
  };

  return (
    <Page title="Signup">
      <h1>Signup</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={state.name}
            onChange={(e) => handleChange({ e, field: "name" })}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={state.password}
            onChange={(e) => handleChange({ e, field: "password" })}
          />
        </label>

        <button
          type="submit"
          onClick={handleSubmit}
          aria-busy={state.isLoading}
          disabled={!isValid}
        >
          Signup
        </button>
      </form>
    </Page>
  );
};

export default SignupPage;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Page from "../components/Page";

import { apiLogin } from "../services/api/user";

const LoginPage = () => {
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

  useEffect(() => {
    const request = axios.CancelToken.source();

    const doLogin = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const resp = await apiLogin({
          payload: {
            name: state.name,
            password: state.password,
          },
          cancelToken: request.token,
        });
        console.log(resp);
        resetState();
      } catch (error) {
        setError(`failed to do login`);
        console.log(error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false, callApi: false }));
      }
    };
    if (state.callApi && state.name && state.password) {
      doLogin();
    }

    return () => {
      //console.log("component unmounted");
      request.cancel();
    };
  }, [state.callApi, state.name, state.password]);

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

    setState((prev) => ({ ...prev, isLoading: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Page title="Login">
      <h1>Login</h1>
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

        <button type="submit" aria-busy={state.isLoading} disabled={!isValid}>
          Login
        </button>
      </form>
    </Page>
  );
};

export default LoginPage;

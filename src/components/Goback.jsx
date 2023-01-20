import React from "react";
import { useNavigate } from "react-router-dom";

const Goback = () => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        navigate(-1);
      }}
    >
      &larr; Go back
    </a>
  );
};

export default Goback;

import React, { useState } from "react";
import "./SignIn.scss";

type currentPageType = "signIn" | "SignUp";

const SignIn = () => {
  const [currentPage, setCurrentPage] = useState<currentPageType>("signIn");

  return (
    <div id="signInContainer">
      <div id="signInLeftPart">
    
      </div>
      <div id="signInRightPart"></div>
    </div>
  );
};

export default SignIn;

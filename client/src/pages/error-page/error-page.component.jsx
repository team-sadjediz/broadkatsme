import React from "react";

import { ReactComponent as NotFoundVector } from "../../assets/graphics/undraw_page_not_found_su7k.svg";

import "./error-page.style.scss";

const ErrorPage = () => (
  <div className="error-page">
    <div className="error-content">
      <p className="not-found-text">Aren't you a curious kitty?</p>
      <NotFoundVector className="not-found-vector" />

      <p className="not-found-text">
        the page you are looking for does not exist
      </p>
      <p className="not-found-text">or you are not logged in :) </p>
    </div>
  </div>
);

export default ErrorPage;

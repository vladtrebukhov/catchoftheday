import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Match, Miss } from "react-router";
import "./css/style.css";

import StorePicker from "./components/storepicker.js";
import NotFound from "./components/notfound.js";
import App from "./app.js";

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById("main"));

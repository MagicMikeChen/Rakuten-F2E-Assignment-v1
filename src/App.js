import React, { Fragment, useState } from "react";
import "./App.css";
import ItemApp from "./components/ItemApp";
import Alert from "./components/alert";

function App() {
  const [alert, setAlert] = useState({ show: false });
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Rakuten F2E Assignment by Mike Chen</h1>
        <div className="space">
          {alert.show && <Alert type={alert.type} text={alert.text} />}
        </div>
        <ItemApp handleAlert={handleAlert} />
      </div>
    </Fragment>
  );
}

export default App;

import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";


function App() {
  return (
    // BEM
    <html lang="en">
      <div className="app">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </html>
  );
}

export default App;

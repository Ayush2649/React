import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement(
  "div",
  { id: "parent" },
  [React.createElement("div", { id: "child", key: "child1" }, 
    React.createElement("h1", {}, "Hi, I'm Ayush"),
    React.createElement("h2", {}, "Hi, I'm an h2 tag"),
  ), 
    React.createElement("div", { id: "child2", key: "child2" }, 
    React.createElement("h1", {}, "Hi, I'm an h1 tag"),
    React.createElement("h2", {}, "Hi, I'm an h2 tag"),
  )]
);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);

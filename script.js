import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => object => render (html element)

// JSX is different, React is different
// JSX is not HTML inside JS, It may be HTML like syntax but it is not HTML

const JSXHeading = (
  <h1 className="root" tabIndex={1}>
    Namaste React using JSX 🚀
  </h1>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(JSXHeading);
// console.log(JSXHeading);

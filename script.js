import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => object => render (html element)

// JSX is different, React is different
// JSX is not HTML inside JS, It may be HTML like syntax but it is not HTML

const Title = () => (
  <h1 className="root" tabIndex={1}>
    Namaste React using JSX 🚀
  </h1>
);

// React Components - Class Based Components (OLD) and Functional Components (NEW)

// React Functional Component - A normal function which returns JSX
// Component Composition - We can create a component and use it inside another component
const HeadingComponent = () => (
  <div id="container">
  <Title />
    <h1>Namaste React Functional Component</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
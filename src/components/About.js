import UserClass from "./UserClass";
import  React  from "react";

class about extends React.Component {
  constructor(props) {
    super(props);

    // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent Render");
    return (
      <div>
        <h1>About Us Page</h1>
        <UserClass name="First " location="Mumbai (Class)" />
        <h2>This is Namaste React web series</h2>
      </div>
    );
  }
}

export default about;

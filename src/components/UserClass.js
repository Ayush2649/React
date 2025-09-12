import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.name + "Child Constructor");

    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "Dummy Location",
      },
    };
  }

  async componentDidMount() {
    console.log(this.props.name + "Child Component Did Mount");
    const data = await fetch("https://api.github.com/users/ayush2649");
    const json = await data.json();
    console.log(json);

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    console.log(name + "Child Render");
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <p>Contact: @ayush2649</p>
      </div>
    );
  }
}

export default UserClass;

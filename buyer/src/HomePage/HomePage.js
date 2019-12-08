import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="../profile" className="btn btn-link">
          Edit Profile
        </Link>
        <Link to="../menuPage" className="btn btn-link">
          Flames Restaurant
        </Link>
      </div>
    );
  }
}
export default HomePage;

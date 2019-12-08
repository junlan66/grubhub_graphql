import React from "react";
import { Link } from "react-router-dom";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="../ProfilePage" className="btn btn-link">
          Edit Restaurant Profile
        </Link>
      </div>
    );
  }
}

export default HomePage;

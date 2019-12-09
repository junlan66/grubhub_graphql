import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import axios from "axios";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      phoneNumber: this.props.user.phoneNumber,
      email: this.props.user.email
    };
    this.updateUser = this.updateUser.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleChangeName(event) {
    // console.log("23121434 handleChange" + event.target.firstName);
    console.log("NAME print event" + event.target.value);
    this.setState({
      firstName: event.target.value
    });
  }

  handleChangePhone(event) {
    // console.log("phone handleChange" + event.target.phoneNumber);
    console.log("PHONE print event" + event.target.value);
    this.setState({
      phoneNumber: event.target.value
    });
  }

  handleChangeEmail(event) {
    // console.log("phone handleChange" + event.target.phoneNumber);
    console.log("Email print event" + event.target.value);
    this.setState({
      email: event.target.value
    });
  }

  updateUser(e) {
    e.preventDefault();
    console.log("USER update");
    console.log(this.props.user.email);
    const { user } = this.props;
    console.log("USER  is " + user);
    console.log("Phone" + this.state.phoneNumber);
    var f = this.state.firstName;
    var p = this.state.phoneNumber;
    var e = this.state.email;
    const axiosGraphQL = "http://localhost:8080/graphql";
    const UpdateBuyer = `{
      mutation updateOwner ($_id: ID, $name : String!,$email : String!,$password : String!, $phoneNumber : String!){
        updateBuyer(_id : $_id, name : $name, email : $email, password : $password, phoneNumber : $phoneNumber){
           _id,
           name,
            email,
            password,
            phoneNumber
        }
      }
      `;

    axiosGraphQL
      .post(axiosGraphQL, {
        query: UpdateBuyer,
        variables: {
          userId: user.id,
          firstName: f,
          phoneNumber: p,
          email: e
        }
      })
      .then(response => {
        user.firstName = f;
        user.phoneNumber = p;
        user.email = e;
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({ firstName: user.firstName }); // backend
        this.setState({ phoneNumber: user.phoneNumber });
        this.setState({ email: user.email });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        firstName: nextProps.user.firstName,
        phoneNumber: nextProps.user.phoneNumber,
        email: nextProps.user.email
      });
    }
  }
  render() {
    console.log("ProfilePage");
    console.log(this.props.user.email);
    const { user } = this.props;
    return (
      <div>
        <h1>Hi {this.state.firstName}!</h1>
        <p>Update your profile</p>
        <form onSubmit={this.updateUser}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.handleChangeName}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={this.state.phoneNumber}
              onChange={this.handleChangePhone}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>
          <Link to="/login">Logout</Link>
        </p>
        <Link to="/" className="btn btn-link">
          Home Page
        </Link>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(ProfilePage);
export { connectedHomePage as ProfilePage };

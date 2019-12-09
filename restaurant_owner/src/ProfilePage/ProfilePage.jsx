import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { AppBar, Drawer, MenuItem } from "material-ui";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      phoneNumber: this.props.user.phoneNumber,
      cuisine: this.props.user.cuisine,
      email: this.props.user.email,
      restaurantName: this.props.user.restaurantName
    };
    this.updateUser = this.updateUser.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeRestaruant = this.handleChangeRestaruant.bind(this);
    this.handleChangeCuisine = this.handleChangeCuisine.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
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

  handleChangeRestaruant(event) {
    // console.log("phone handleChange" + event.target.phoneNumber);
    console.log("ReName print event" + event.target.value);
    this.setState({
      restaurantName: event.target.value
    });
  }

  handleChangeCuisine(event) {
    // console.log("phone handleChange" + event.target.phoneNumber);
    console.log("CUISINE print event" + event.target.value);
    this.setState({
      cuisine: event.target.value
    });
  }

  updateUser(e) {
    e.preventDefault();
    console.log("USER update");
    console.log(this.props);
    const { user } = this.props;
    console.log(user);
    console.log("Phone" + this.state.phoneNumber);
    var f = this.state.firstName;
    var p = this.state.phoneNumber;
    var r = this.state.restaurantName;
    var c = this.state.cuisine;
    var e = this.state.email;

    const UpdateOwner = `{
      mutation updateOwner ($_id: ID, $name : String!, $zipcode :String!,$restaurant_name : String!,$email : String!,$password : String!,$cuisine : String!){
        updateOwners(_id : $_id, name : $name, zipcode : $zipcode, restaurant_name :$restaurant_name, email : $email, password : $password, cuisine : $cuisine){
           _id,
           name,
            zipcode,
            restaurant_name,
            email,
            password,
            cuisine
        }
      }
      `;

    axiosGraphQL
      .post("", {
        query: UpdateOwner,
        variables: {
          userId: user.id,
          firstName: f,
          phoneNumber: p,
          restaurantName: r,
          cuisine: c,
          email: e
        }
      })
      .then(response => {
        console.log(user);
        user.firstName = f;
        user.phoneNumber = p;
        user.restaurantName = r;
        user.cuisine = c;
        user.email = e;
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({ firstName: user.firstName }); // backend
        this.setState({ phoneNumber: user.phoneNumber });
        this.setState({ restaurantName: user.restaurantName });
        this.setState({ cuisine: user.cuisine });
        this.setState({ email: user.email });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        firstName: nextProps.user.firstName,
        phoneNumber: nextProps.user.phoneNumber,
        restaurantName: nextProps.user.restaurantName,
        cuisine: nextProps.user.cuisine,
        email: nextProps.user.eamil
      });
    }
  }
  toggleDrawer = () => this.setState({ open: !this.state.open });
  render() {
    console.log("HOMEPAGE");
    console.log(this.props);
    const { user } = this.props;
    return (
      <div>
        <AppBar
          title="My Restaurant"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.toggleDrawer}
        />
        <Drawer
          docked={false}
          width={300}
          onRequestChange={this.toggleDrawer}
          open={this.state.open}
        >
          <AppBar
            title="Flames Restaurant"
            onLeftIconButtonClick={this.toggleDrawer}
          />
          <MenuItem
            primaryText="Menu"
            containerElement={<Link to="/menu" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
          <MenuItem
            primaryText="Add Menu"
            containerElement={<Link to="/addMenu" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
          <MenuItem
            primaryText="Order"
            containerElement={<Link to="/orders" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
        </Drawer>
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
            Restaurant Name:
            <input
              type="text"
              value={this.state.restaurantName}
              onChange={this.handleChangeRestaruant}
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
          <label>
            Cuisine:
            <input
              type="text"
              value={this.state.cuisine}
              onChange={this.handleChangeCuisine}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>
          <Link to="/login">Logout</Link>
        </p>
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

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as ProfilePage };

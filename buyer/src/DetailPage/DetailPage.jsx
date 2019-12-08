import React from "react";
import { Avatar, List, ListItem } from "material-ui";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import { withRouter } from "react-router";
import axios from "axios";
import { userActions } from "../_actions";
import { connect } from "react-redux";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("print props");
    console.log(props);
    this.state = {
      userName: this.props.user.firstName,
      userID: this.props.user.id,
      foodItems: [],
      lunchItems: [],
      cartBrItems: [],
      orderItems: [],
      pastOrderItems: []
    };

    this.Cart = this.Cart.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // sent a GET request
    axios
      .get(
        "http://localhost:4000/api/buyer/login/breakfast?name=menu_breakfast"
      )
      .then(response => {
        this.setState({
          foodItems: this.state.foodItems.concat(response.data)
        });
      });
    axios
      .get("http://localhost:4000/api/buyer/login/lunch?name=menu_lunch")
      .then(response => {
        this.setState({
          lunchItems: this.state.lunchItems.concat(response.data)
        });
      });
    axios
      .get("http://localhost:4000/api/buyer/order/getOrder")
      .then(response => {
        console.log(response.data);
        // console.log("data" + response.data.toString());
        this.setState({
          orderItems: this.state.orderItems.concat(response.data)
        });
      });
    axios
      .get("http://localhost:4000/api/buyer/order/getPastOrder")
      .then(response => {
        console.log("response.data)");
        console.log(response.data);
        // console.log("data" + response.data.toString());
        this.setState({
          pastOrderItems: this.state.pastOrderItems.concat(response.data)
        });
        console.log("past orders");
        console.log(this.state.pastOrderItems);
      });
  }

  Cart(foodItem) {
    //foodItem.preventDefault();
    console.log("Add to Cart");
    this.setState({ cartBrItems: this.state.cartBrItems.concat(foodItem) });
  }
  handleClick(cartBrItems) {
    console.log("front print cartBrItems" + cartBrItems);
    axios
      .post("http://localhost:4000/api/buyer/order/submitOrder", {
        userId: this.state.userID,
        userName: this.state.userName,
        cartList: cartBrItems
      })
      .then(response => {
        console.log(response);
      });
    console.log("submitted");
  }

  render() {
    return (
      <div>
        <List>
          Breakfast
          {this.state.foodItems.map(foodItem => (
            // <ListBreak key={foodItem.id} {...foodItem} />
            <Grid fluid key={foodItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={foodItem}
                  onClick={() => this.Cart(foodItem)}
                >
                  +
                </a>
                <Col xs={6} sm={6} lg={4}>
                  {foodItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {foodItem.price}
                </Col>
              </Row>
            </Grid>
          ))}
          Lunch
          {this.state.lunchItems.map(lunchItem => (
            // <SpicyMenuItemWithRouter key={lunchItem.id} {...lunchItem} />
            <Grid fluid key={lunchItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={lunchItem}
                  onClick={() => this.Cart(lunchItem)}
                >
                  +
                </a>
                <Col xs={6} sm={6} lg={4}>
                  {lunchItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {lunchItem.price}
                </Col>
              </Row>
            </Grid>
          ))}
          My Cart
          {this.state.cartBrItems.map(cartBrItem => (
            <Grid fluid key={cartBrItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <Col xs={6} sm={6} lg={4}>
                  {cartBrItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {cartBrItem.price}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  1
                </Col>
              </Row>
              Subtotal {cartBrItem.price}
            </Grid>
          ))}
          <button onClick={e => this.handleClick(this.state.cartBrItems)}>
            Submit Order
          </button>
        </List>
        <List>
          Order List
          {this.state.orderItems.map(orderItem => (
            <Grid fluid key={orderItem._id}>
              <Row center="lg" style={RowItemStyle}>
                <Link
                  to={{
                    pathname: "/messagePage",
                    data: orderItem
                  }}
                >
                  Chat
                </Link>
                <Col xs={6} sm={6} lg={4}>
                  {orderItem.userName}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {orderItem.cartList.map(cartItem => (
                    <Row center="lg" style={RowItemStyle}>
                      {cartItem.name}
                    </Row>
                  ))}
                </Col>
              </Row>
            </Grid>
          ))}
        </List>

        <Link
          to={{
            pathname: "/order"
          }}
        >
          Order History
        </Link>
      </div>
    );
  }
}

const RowItemStyle = {
  alignItems: "center"
};
//added
function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll
};

const connectedDetailedPage = connect(
  mapState,
  actionCreators
)(DetailPage);
export { connectedDetailedPage as DetailPage };
//export default DetailPage;

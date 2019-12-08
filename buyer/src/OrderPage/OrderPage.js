import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { AppBar, Drawer, MenuItem } from "material-ui";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderItems: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/buyer/order/getOrder")
      .then(response => {
        console.log(response.data);
        // console.log("data" + response.data.toString());
        this.setState({
          orderItems: this.state.orderItems.concat(response.data)
        });
        console.log(this.state.orderItems);
      });
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // update state
    var data = this.state.orderItems;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ orderItems: data });
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
  render() {
    return (
      <ul onDragOver={this.dragOver.bind(this)}>
        {this.state.orderItems.map((orderItem, i) => (
          <li
            data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
          >
            <Link
              to={{
                pathname: "/messagePage",
                data: orderItem
              }}
            >
              Chat
            </Link>
            {" Order ID: " +
              orderItem._id +
              " From buyer: " +
              orderItem.userName +
              " Items: " +
              orderItem.cartList[0].name}
          </li>
        ))}
      </ul>
    );
  }
}

class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      pastOrderItems: []
    };
  }
  componentDidMount() {
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

  render() {
    return (
      <div>
        <Link to="../menu" className="btn btn-link">
          Return
        </Link>
        <h4>Upcoming Orders</h4>
        <List2></List2>
        <h4>Past Orders</h4>
        <List>
          {this.state.pastOrderItems.map(orderItem => (
            <Grid fluid key={orderItem.orderItem._id}>
              <Row center="lg" style={RowItemStyle}>
                <Col xs={6} sm={6} lg={4}>
                  {orderItem.orderItem._id}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {orderItem.orderItem.cartList.map(cartItem => (
                    <Row center="lg" style={RowItemStyle}>
                      {cartItem.name}
                    </Row>
                  ))}
                </Col>
              </Row>
            </Grid>
          ))}
        </List>
      </div>
    );
  }
}
const RowItemStyle = {
  alignItems: "center"
};
export default OrderPage;

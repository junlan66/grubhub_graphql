import React from "react";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
const axiosGraphQL = "http://localhost:8080/graphql";
class SpicyMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: []
    };
    const { user } = this.props;
    // sent a GET request

    const GET_MENU = ` {
      listMenu(){
        name,
        description,
        price
      }
    }
      `;
    axiosGraphQL
      .get("", {
        query: GET_MENU,
        variables: {
          userId: user.id
        }
      })
      .then(response => {
        this.setState({
          foodItems: this.state.foodItems.concat(response.data),
          foodItemsOg: this.state.foodItemsOg.concat(response.data)
        });
        //return user;
      });
  }
  render() {
    //added
    const { foodItems } = this.state;

    return (
      <div className="app-container">
        <List>
          Breakfast
          {foodItems.map(foodItem => (
            <Grid fluid key={foodItem.id}>
              <Row center="lg" style={RowItemStyle}>
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
          {foodItemsOg.map(lunchItem => (
            <Grid fluid key={lunchItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <Col xs={6} sm={6} lg={4}>
                  {lunchItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {lunchItem.price}
                </Col>
              </Row>
            </Grid>
          ))}
        </List>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

const RowItemStyle = {
  alignItems: "center"
};

export default SpicyMenu;

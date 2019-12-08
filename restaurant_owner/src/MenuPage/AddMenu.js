import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";

class AddMenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_breakfast: {
        name: "",
        description: "",
        menutype: "",
        price: ""
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = event.target;
    const { menu_breakfast } = this.state;
    this.setState({
      menu_breakfast: {
        ...menu_breakfast,
        [name]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // validate form
    this.setState({ submitted: true });
    const { menu_breakfast } = this.state;
    if (
      menu_breakfast.name &&
      menu_breakfast.price &&
      menu_breakfast.description &&
      menu_breakfast.menutype
    ) {
      this.props.addBreakfast(menu_breakfast);
    }
    console.log("Added new Menu with" + JSON.stringify(this.state, null, 2));
  }
  toggleDrawer = () => this.setState({ open: !this.state.open });

  render() {
    const { addingBreakfast } = this.props;
    const { menu_breakfast, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="container">{this.props.children}</div>
        <h2>Add to Menu</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" +
              (submitted && !menu_breakfast.name ? " has-error" : "")
            }
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={menu_breakfast.name}
              onChange={this.handleChange}
            />
            {submitted && !menu_breakfast.name && (
              <div className="help-block">Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !menu_breakfast.price ? " has-error" : "")
            }
          >
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={menu_breakfast.price}
              onChange={this.handleChange}
            />
            {submitted && !menu_breakfast.price && (
              <div className="help-block">Price is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !menu_breakfast.description ? " has-error" : "")
            }
          >
            <label htmlFor="description">description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={menu_breakfast.description}
              onChange={this.handleChange}
            />
            {submitted && !menu_breakfast.description && (
              <div className="help-block">Description is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !menu_breakfast.menutype ? " has-error" : "")
            }
          >
            <label htmlFor="menutype">Menu type</label>
            <input
              type="text"
              className="form-control"
              name="menutype"
              value={menu_breakfast.menutype}
              onChange={this.handleChange}
            />
            {submitted && !menu_breakfast.menutype && (
              <div className="help-block">Menu type is required</div>
            )}
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Submit Menu</button>
            {addingBreakfast && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/menuPage" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { addingBreakfast } = state.addBreakfast;
  return { addingBreakfast };
}

const actionCreators = {
  addBreakfast: userActions.addBreakfast
};

const connectedAddMenuPage = connect(mapState, actionCreators)(AddMenuPage);
export { connectedAddMenuPage as AddMenuPage };

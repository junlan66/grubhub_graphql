import React from "react";
import { AppBar, Drawer, MenuItem } from "material-ui";
import { Link } from "react-router-dom";
import "./index.css";

// import FloatingActionButton from "material-ui/FloatingActionButton";
// import ContentAdd from "material-ui/svg-icons/content/add";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};
class MenuPages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleDrawer = () => this.setState({ open: !this.state.open });
  // handleAddMenu = e => {
  //   e.stopPropagation();
  //   console.log("Opening New Menu Form");
  //   this.props.history.push("/addMenu");
  // };

  render() {
    return (
      <div>
        <p>
          <Link to="/login">Logout</Link>
        </p>
        <AppBar
          title="Flames Restaurant"
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
            primaryText="Orders"
            containerElement={<Link to="/order" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
        </Drawer>
        <div className="container">{this.props.children}</div>
        {/* <div>
          <FloatingActionButton
            style={style}
            mini={true}
            secondary={true}
            onClick={this.handleAddMenu}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div> */}
      </div>
    );
  }
}

export default MenuPages;

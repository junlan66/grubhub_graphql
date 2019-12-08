import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Link } from "react-router-dom";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";

import { ProfilePage } from "../ProfilePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";

import MenuDetail from "../MenuPage/MenuDetail";
import { DetailPage } from "../DetailPage";
import MenuPages from "../MenuPage/menuPage";
import HomePage from "../HomePage/HomePage";
import OrderPage from "../OrderPage/OrderPage";
import MessagePage from "../MessagePage/MessagePage";

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <MuiThemeProvider>
              <Router history={history}>
                <div>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/menuPage" component={MenuPages} />
                  <Route path="/menu" component={DetailPage} />
                  <Route path="/order" component={OrderPage} />
                  <Route path="/messagePage" component={MessagePage} />
                  <Route path="/menuDetail/:id" component={MenuDetail} />
                </div>
              </Router>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(
  mapState,
  actionCreators
)(App);
export { connectedApp as App };

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userService } from "@/services";
import Loader from "react-loaders";
import { ProfileContext } from "./profile/components/ProfileContext";

import {
  About,
  Qualification,
  Experience,
  Contact,
  Home,
  EditProfile
} from "./profile";
import { FreeUsername } from "./profile/FreeUsername";

const RouteWithProps = ({
  component: Component,
  path,
  profile,
  canEdit,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Component path={path} profile={profile} canEdit={canEdit} {...props} />
    )}
  />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  profile: PropTypes.object
};

const ProfileHandler = props => {
  let username = props.match.params.username;
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <RouteWithProps
          path={"/p/" + username + "/about"}
          component={About}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/qualification"}
          component={Qualification}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/experience"}
          component={Experience}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/contact"}
          component={Contact}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/edit"}
          profile={props.profile}
          component={EditProfile}
          canEdit={props.canEdit}
        />
      </Drilldown>
    </div>
  );
};

ProfileHandler.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  }),
  canEdit: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  profile: PropTypes.object
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let username = props.match.params.username;
    this.state = {
      username: username,
      profileLoading: true,
      profile: null
    };
  }

  componentDidMount() {
    userService
      .getByUsername(this.state.username)
      .then(profile => {
        this.setState({
          profile: profile,
          profileLoading: false
        });
      })
      .catch(() => {
        this.setState({
          profile: false,
          profileLoading: false
        });
      });
  }

  render() {
    const { profile, profileLoading } = this.state;
    const { authUser } = this.props;

    let canEditProfile = !!(
      authUser &&
      profile &&
      profile.email &&
      profile.email == authUser.email
    );

    return (
      <ProfileContext.Provider
        value={{ profile: profile, canEdit: canEditProfile }}>
        {profile === null || <Navigation username={this.state.username} />}
        {profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                profile={profile}
                canEdit={canEditProfile}
                component={Home}
              />
              <RouteWithProps
                path="/p/:username/:page"
                profile={profile}
                canEdit={canEditProfile}
                component={ProfileHandler}
              />
            </Drilldown>
          </div>
        ) : profileLoading === false && profile === false ? (
          <FreeUsername username={this.state.username} />
        ) : (
          <div className="profile-loading">
            <Loader type="ball-clip-rotate-multiple" />
          </div>
        )}
      </ProfileContext.Provider>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  }),
  authUser: PropTypes.object
};

function mapStateToProps(state) {
  const { authUser } = state.authentication;
  return {
    authUser
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };

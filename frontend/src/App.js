import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import actions from './actions';
import LandingPage from './LandingPage';
import Login from './Login';
import Navbar from './Navbar';
import Articles from './Articles';
import ArticleEdit from './ArticleEdit';
import Assets from './Assets';
import AssetEdit from './AssetEdit';
import CMSContainer from './CMSContainer';
import { UserList, UserPage } from './UserList';

import articleMockData from './_mockData/article.json';
import articlesMockData from './_mockData/articles.json';

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  guestUser = { _id: '0', username: 'Guest' };
  state = {
    article: articleMockData,
    articles: articlesMockData,
    isLoggedIn: true,
    user: this.guestUser,
  };

  componentDidMount = () => {
    actions
      .getUser()
      .then(res => {
        if (res.success) {
          this.setState({ isLoggedIn: true, user: res.user });
        } else {
          this.setState({ isLoggedIn: false, user: this.guestUser });
        }
      })
      .catch(() => {
        this.setState({ isLoggedIn: false, user: this.guestUser });
      });
  };

  setUser = user => {
    if (user === null) {
      this.setState({ user: this.guestUser, isLoggedIn: false });
    } else {
      this.setState({ user, isLoggedIn: true });
    }
  };

  logout = () => {
    actions
      .logout()
      .then(() => {
        this.setState({ isLoggedIn: false, user: this.guestUser });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
    return <Redirect to="/" />;
  };

  render() {
    const { article, articles, isLoggedIn, user = this.guestUser } = this.state;
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route
            render={r => (
              <Navbar
                isLoggedIn={isLoggedIn}
                userId={user._id}
                username={user.username}
                {...r}
              />
            )}
          />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              exact
              path="/pages"
              render={r => <Articles {...r} data={articles} />}
            />
            <Route
              exact
              path="/pages/new"
              render={() => <ArticleEdit empty />}
            />
            <Route
              path="/pages/:id"
              render={() => <ArticleEdit data={article} />}
            />
            <Route exact path="/users" render={() => <UserList />} />
            <Route
              path="/users/:id"
              render={props => <UserPage userId={props.match.params.id} />}
            />
            <Route exact path="/assets" render={r => <Assets {...r} />} />
            <Route
              exact
              path="/assets/new"
              render={r => <AssetEdit {...r} user={user} />}
            />
            <Route
              path="/assets/:id"
              render={props => <AssetEdit id={props.match.params.id} />}
            />
            <Route exact path="/cms" component={CMSContainer}  />
            <Route path="/cms/:path" render={props => <CMSContainer {...props} />} 
            />
            <Route
              path="/login"
              render={() => <Login setUser={this.setUser} />}
            />
            <Route path="/logout" render={this.logout} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

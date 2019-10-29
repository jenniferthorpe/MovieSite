import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './style/style.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import NavigationMenu from './components/NavigationMenu';
import MovieSpecifications from './components/MovieSpecifications';
import MovieList from './components/MovieList';
import Search from './components/Search';
import Login from './components/Login';
import Favourites from './components/Favourites';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#D99A4E',
      main: '#730202',
      dark: '#400101',
      contrastText: 'wheat'
    },
    secondary: {
      light: '#D99A4E',
      main: '#D99A4E',
      dark: '#D99A4E',
      contrastText: '#D99A4E'
    }
  }
});

class App extends React.Component {
  appRef = React.createRef()

  // state = {
  //   sessionID: undefined,
  //  }

  // setData = (data) => {
  //   console.log(data);
  //   if (data && data.sessionID) {
  //     console.log(data.sessionID);
  //     this.setState({
  //       sessionID: data.sessionID
  //     })
  //   }
  // }


  render() {

    // const { sessionID } = this.state;

    return (


      <ThemeProvider theme={theme}>

        <div className="App" ref={this.appRef}>

          <NavigationMenu appRef={this.appRef} />

          <Container maxWidth="xl" style={{ paddingTop: '64px' }}>

            <Switch>

              <Route exact path="/">
                <h1
                  style={{
                    textAlign: 'center',
                    padding: '30px 0px',
                    color: '#D99A4E'
                  }}
                >
                  Trending movies this week
                  </h1>
                {this.appRef ? <MovieList appRef={this.appRef} /> : ''}
              </Route>

              <Route exact path="/movies/:id">
                <MovieSpecifications />
              </Route>

              <Route exact path="/search/:query">
                <Link to="/" className="backBtnSearch">Back to start</Link>
                <Search />
              </Route>

              <Route exact path="/login">
                <h1 style={{
                  position: 'relative', textAlign: 'center', marginTop: '100px'
                }}>Login</h1>
                <Login setData={this.setData} />
              </Route>

              <Route exact path="/account/favourites">
                <Favourites />
              </Route>

            </Switch>

          </Container>
        </div>
      </ThemeProvider>

    );
  }
}

export default App;

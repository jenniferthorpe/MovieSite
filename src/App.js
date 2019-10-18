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
  constructor() {
    super()
    this.appRef = React.createRef();
  }

  render() {

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
                    paddingTop: '30px',
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

            </Switch>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

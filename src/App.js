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

function App() {
  return (
    <ThemeProvider theme={theme}>

      <div className="App">

        <NavigationMenu />

        <Container maxWidth="lg">

          <Switch>

            <Route exact path="/">
              <h1
                style={{
                  textAlign: 'center',
                  paddingTop: '30px',
                  color: '#D99A4E'
                }}
              >
                Tending movies this week
                  </h1>
              <MovieList />
            </Route>

            <Route exact path="/movies/:id">
              <MovieSpecifications />
            </Route>

            <Route exact path="/search/:query">
              <Link to="/">Back to start</Link>
              <Search />
            </Route>

          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

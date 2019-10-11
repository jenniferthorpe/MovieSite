import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link, Redirect } from 'react-router-dom'
import '../style/style.css'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      },
    },
  },
}));



class SearchAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      inputInput: PropTypes.string.isRequired,
      inputRoot: PropTypes.string.isRequired,
      menuButton: PropTypes.string.isRequired,
      root: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      searchIcon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };


  constructor() {
    super();
    this.state = {
      searchValue: '',
      search: '',
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchValue, search } = this.state;

    const removedSpace = searchValue.replace(' ', '+');
    console.log(removedSpace);

    this.setState({
      search: removedSpace
    })


    console.log(`${searchValue}=serachValue`);
    console.log(`${search}=search`);



  }


  render() {

    const { searchValue, search } = this.state;

    if (search) {
      return <Redirect to={`/search/${search}`} query={searchValue} />
    }





    const { classes } = this.props;



    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <form onSubmit={this.handleSubmit}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link to='/' style={{ textDecoration: 'none', color: 'wheat' }}>
                  MovieTajm
            </Link>
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon onClick={this.handleSubmit} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  className="searchfield"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.handleChange}
                  value={searchValue}
                  type="text"
                />

              </div>
            </form>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchAppBar)


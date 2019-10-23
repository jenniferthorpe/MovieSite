import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import '../style/style.css'
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    list: {
        width: 250,
    },

});


export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <Link to='/'>
                    <ListItem button key="1">
                        <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to='/login'>
                    <ListItem button key="login">
                        <ListItemIcon><LockOpenIcon /></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                </Link>
                <Link to='/account/favourites'>
                    <ListItem button key="2">
                        <ListItemIcon><StarsIcon /></ListItemIcon>
                        <ListItemText primary="Favourites" />
                    </ListItem>
                </Link>
                <ListItem button key="3">
                    <ListItemIcon><WatchLaterIcon /></ListItemIcon>
                    <ListItemText primary="Watch later" />
                </ListItem>

            </List>
        </div>
    );


    return (
        <div>
            <div onClick={toggleDrawer('left', true)}><MenuIcon style={{ color: 'wheat' }} /></div>

            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>

        </div>
    );
}
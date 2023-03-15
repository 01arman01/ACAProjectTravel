import React from 'react';
import {AppBar, Button, FormControlLabel, FormGroup, Menu, MenuItem, Switch, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';


function Header(props) {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div
            // className={classes.root}
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                // className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuItem />
                    </IconButton>
                    <Typography variant="h6"
                                // className={classes.title}
                    >
                        News
                    </Typography>
                    <Button
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
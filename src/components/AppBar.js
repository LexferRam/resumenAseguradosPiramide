import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import imgPira from "../logo-piramide.svg"


const useStyles = makeStyles((theme) => ({
    root: {
        // position: "fixed",
        zIndex: 999999999999,
        // flexGrow: 1,
        // width: "100%",
        marginBottom: 10
    },
    menu: {
        display: "flex",
        justifyContent: "center",
    },
    logo: {
        width: 150,
        // marginRight:700
    },
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar color="white" position="static">
                <Toolbar className={classes.menu}>
                    <img src={imgPira} className={classes.logo} />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar
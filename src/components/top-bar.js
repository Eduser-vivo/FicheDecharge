import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink, Redirect} from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));


const MapStateToProps = state =>({
    scanData: state.scanReq
});


 function TopAppBar(props) {
    const classes = useStyles();
    const isLog = props.isLog;


    function setLogOff() {
        props.handleLog(false);
    }

    function setLogOn(){
        return (<Redirect to={{ pathname: "/login", state: { referer: "" } }}/>);
    }

    

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
                        {/* <Button edge="start" className={classes.menuButton} color="inherit" aria-label="home" >
                        
                        </Button> */}
                    </NavLink>
                    <Typography variant="h6" className={classes.title}>
                    
                    </Typography>     
                    {isLog ?
                        (<NavLink to="/logout" style={{ color: "white", textDecoration: "none" }}><Button color="inherit" onClick={setLogOff} >Deconnexion</Button></NavLink>)
                         :(<NavLink to={{pathname:"/login", state:{referer: ""}}} style={{ color: "white", textDecoration: "none" }}><Button color="inherit" onClick={setLogOn} >Se connecter</Button></NavLink>)
                         }
                </Toolbar>
            </AppBar>
            <br />
        </div>
    );
}


export default connect(MapStateToProps)(TopAppBar);
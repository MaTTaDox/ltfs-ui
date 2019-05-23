import React, {Component, Fragment} from 'react';
import {
    AppBar,
    Button,
    ClickAwayListener,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'
import Settings from '@material-ui/icons/Settings';
import Cloud from '@material-ui/icons/Cloud';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {withStyles} from '@material-ui/core/styles';
import {compose} from "redux";
import {withTranslation} from "react-i18next";

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
});

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    toggleDrawer = (state) => {
        this.setState({
            open: state,
        });
    };

    render() {

        const {classes} = this.props;

        return (
            <Fragment>
                <AppBar color='default' position="static">
                    <Toolbar>
                        <IconButton onClick={() => {
                            this.toggleDrawer(true)
                        }} style={{
                            marginLeft: -12,
                            marginRight: 20,
                        }} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {this.props.t('app.title')}
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <ClickAwayListener onClickAway={() => this.toggleDrawer(false)}>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={() => this.toggleDrawer(false)}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List onClick={() => this.toggleDrawer(false)}>
                            <ListItem button key='overview' component={Link} to="/">
                                <ListItemIcon><Cloud/></ListItemIcon>
                                <ListItemText primary={this.props.t('app.overview')}/>
                            </ListItem>
                            <ListItem button key='account' component={Link} to="/account">
                                <ListItemIcon><Settings/></ListItemIcon>
                                <ListItemText primary={this.props.t('app.settings')}/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List onClick={() => this.toggleDrawer(false)}>
                            <ListItem button key='github' target='_blank' component={'a'} href="http://github.com/mattadox/ltfs">
                                <ListItemIcon><FontAwesomeIcon icon={['fab', 'github']}/></ListItemIcon>
                                <ListItemText primary={this.props.t('app.github')}/>
                            </ListItem>
                        </List>
                    </Drawer>
                </ClickAwayListener>
            </Fragment>
        );
    }
}


export default compose(
    withTranslation(),
    withStyles(styles))(Navigation);
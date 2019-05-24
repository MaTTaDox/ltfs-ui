import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators, compose} from 'redux';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {fetchUser, saveUser} from '../../actions/userActions';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import {Help, Save} from '@material-ui/icons';

const styles = theme => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accessKey: '',
            secretKey: '',
            awsHelpOpen: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!this.props.user.isFetching && prevProps.user.isFetching) {
            this.setState({
                accessKey: this.props.user.user.settings.accessKey ? this.props.user.user.settings.accessKey : this.state.accessKey,
                secretKey: this.props.user.user.settings.secretKey ? this.props.user.user.settings.secretKey : this.state.secretKey
            })
        }
    }

    handleOpen = () => {
        this.setState({awsHelpOpen: true});
    };

    handleClose = () => {
        this.setState({awsHelpOpen: false});
    };

    componentDidMount = () => {
        this.props.actions.fetchUser()
    };

    save = () => {

        const settings = this.props.user.user.settings;
        settings.accessKey = this.state.accessKey;
        settings.secretKey = this.state.secretKey;

        this.props.actions.saveUser({
            settings: settings
        })
    };

    onTextChange = (event) => {
        const state = this.state;
        state[event.target.name] = event.target.value;

        this.setState(state);
    };

    render() {
        const {classes} = this.props;

        const settings = this.props.user.user.settings ? this.props.user.user.settings : {};

        return <div>
            <Button style={{marginBottom: '1em'}} variant="contained" color="primary" onClick={() => {
                this.save()
            }}>
                <Save className={classes.extendedIcon}/> {this.props.t('app.save')}
            </Button>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title={this.props.t('app.accountData')}/>
                        <CardContent>
                            <Typography color='textSecondary'>
                                {this.props.t('app.email')}
                            </Typography>
                            <Typography variant='body1'>
                                {settings.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title={this.props.t('app.credentials')}/>
                        <CardContent>
                            <TextField
                                required
                                id='standard-required'
                                label='AWS AccessKey'
                                margin='normal'
                                name='accessKey'
                                value={this.state.accessKey}
                                onChange={this.onTextChange}
                                fullWidth
                            />
                            <TextField
                                required
                                id='standard-required'
                                label='AWS SecretKey'
                                type='password'
                                margin='normal'
                                name='secretKey'
                                value={this.state.secretKey}
                                onChange={this.onTextChange}
                                fullWidth
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => {
                                this.handleOpen();
                            }} color="inherit">
                                <Help className={classes.extendedIcon}/> {this.props.t('app.awsHelp')}
                            </Button>
                        </CardActions>
                    </Card>
                    <Dialog onClose={this.handleClose} open={this.state.awsHelpOpen}>
                        <DialogTitle>AWS Zugangsdaten ermitteln</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Grid>
            </Grid>
        </div>;
    }
}

function mapStateToProps(state) {

    const {user} = state;

    if (!user.user) {
        user.user = {
            settings: {}
        }
    }

    return {user}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({fetchUser, saveUser}, dispatch),
    }
};

export default compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Settings);
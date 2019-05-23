import React, {Component,} from 'react';
import {connect} from "react-redux";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core';
import {bindActionCreators, compose} from "redux";
import {loginUser, resetLogin} from "../../actions/sessionActions";
import {Trans, withTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import GoogleLogin from "react-google-login";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
    }

    onTextChange(event) {
        const state = this.state;

        state[event.target.name] = event.target.value;

        this.setState(state);
    }

    loginUser = (e) => {
        this.props.actions.loginUser({
            'id_token': e.tokenId
        });
        console.log(e);
    };

    dismissMessage() {
        this.props.actions.resetLogin()
    }

    render() {

        let message = null;
        if (this.props.auth.errorMessage) {
            message = <Card className='error'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Error
                    </Typography>
                    <Typography component="p">
                        {this.props.auth.errorMessage}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={this.dismissMessage}>
                        {this.props.t('app.dismiss')}
                    </Button>
                </CardActions>
            </Card>
        }

        return <div className='container login'>
            <Grid container spacing={10} justify="center">
                <Grid item xs={5}>
                    <form onSubmit={this.loginUser}>
                        <Card>
                            <CardHeader title={this.props.t('app.title')}/>
                            <CardContent className='center'>
                                {message}
                                <GoogleLogin
                                    clientId="1001010921834-ac8p3bm96n04d1e8jle0kvina8euooe6.apps.googleusercontent.com"
                                    onSuccess={this.loginUser}
                                    onFailure={this.loginUser}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <Divider style={{margin: '20px 0'}}/>
                                <Typography variant='subtitle1' align='center' color='textSecondary'>
                                    <Trans i18nKey={'app.loginMessage'}>
                                        Webinterface für <a className='link' href='https://aws.amazon.com/de/glacier' target='_blank'
                                                            rel="noopener noreferrer">Kontist</a>
                                    </Trans>
                                </Typography>
                                <div className='center'>
                                    <Button component='a' href='https://github.com/mattadox/ltfs' target='_blank'>
                                        <FontAwesomeIcon icon={['fab', 'github']}/>&nbsp;{this.props.t('app.github')}
                                    </Button>
                                    <Button component='a' href='https://twitter.com/mattadoxx' target='_blank'>
                                        <FontAwesomeIcon icon={['fab', 'twitter']}/>&nbsp;{this.props.t('app.twitter')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </div>;
    }
}

function mapStateToProps(state) {

    const {auth} = state;

    return {auth}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({loginUser, resetLogin}, dispatch),
    }
};

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps))(Login);
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {Grid, LinearProgress, Typography} from "@material-ui/core";

const styles = theme => ({});

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        borderRadius: 20
    },
    bar: {
        borderRadius: 20,
    },
})(LinearProgress);

class StartUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.time >= 80 && this.state.intervalId) {
            this.terminateInterval();
        }
    }

    componentDidMount = () => {

        this.setState({
            time: 0
        });

        const intervalId = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            });
        }, 1000);

        this.setState({
            intervalId: intervalId
        });
    };

    terminateInterval = () => {
        clearInterval(this.state.intervalId);

        this.setState({
            intervalId: null
        });

    };

    componentWillUnmount() {
        this.terminateInterval();
    }

    render() {

        const percent = Math.round(this.state.time / 80 * 100);

        console.log(percent);
        return (
            <div className='container startUp'>
                <Grid container spacing={0} justify="center">
                    <Typography variant="h3" gutterBottom>
                        {this.props.t('app.startUp')}
                    </Typography>
                    <Grid item xs={10}>
                        <BorderLinearProgress
                            variant="determinate"
                            value={percent}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default compose(
    withTranslation(),
    withStyles(styles))(StartUp);
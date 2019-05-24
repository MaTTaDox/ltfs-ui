import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators, compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {fetchFiles} from "../../actions/fileActions";

const styles = theme => ({});

class FileList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.actions.fetchFiles()
    };

    render() {
        return (
            <div>FileList</div>
        );
    }
}

function mapStateToProps(state) {

    const {files} = state;

    return {files}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({fetchFiles}, dispatch),
    }
};

export default compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(FileList);
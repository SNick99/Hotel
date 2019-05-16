import React, { Component } from 'react';
// import "./Footer.css";
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

const styles = {
    footer: {
        flex: '1 0 auto',
        justifyContent: 'center',
        marginBottom: 0,
        background: 'black',
        color: 'white',
        minHeight: '12vh'
    }
};

class Footer extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Toolbar className={classes.footer}>
                <Grid>
          Copyright &copy; {new Date().getFullYear()} Hotel of Animals
                </Grid>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(Footer);

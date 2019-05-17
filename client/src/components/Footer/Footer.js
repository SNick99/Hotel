import React, { Component } from 'react';
// import "./Footer.css";
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'center',
    background: 'black',
    color: 'white',
    minHeight: 42
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

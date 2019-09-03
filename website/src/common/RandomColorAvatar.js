import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { randomColor } from '../util/colors.js';

const useStyles = makeStyles(theme => {
  return {
    avatar: color => ({
      margin: 10,
      color: '#fff',
      backgroundColor: color[500],
    })
  }
});

const RandomColorAvatar = ({ name }) => {

  // Hast name into number
  // Number and mod based on number of colors in Material-UI
  // int between 0-18. Get color index.

  const color = randomColor();
  const classes = useStyles(color);

  return (
    <Avatar className={classes.avatar} >
      { _.upperCase(name[0]) }
    </Avatar>
  );
}

export default RandomColorAvatar;
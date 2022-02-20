import React, {
  Component, useEffect, useState, useCallback,
} from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import stickybits from 'stickybits';
import { Box, Container, makeStyles } from '@material-ui/core';
import { render } from '@react-three/fiber';

const useStyles = makeStyles((theme) => ({
  threeWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },
  post: {},
}));

export default React.memo(({ pageContents }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // initialize stickybits
    stickybits('#sticky', { useStickyClasses: true });
  }, []);
  // https://www.npmjs.com/package/react-intersection-observer#polyfill

  return (
    <nav className="col-2 pl-5" id="sticky">
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader">
            {/* <img src={require('../../static/assets/profile-photo.png')} /> */}
          </ListSubheader>
        )}
      >
        <ListItem button>
          <ListItemText primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </nav>
  );
});

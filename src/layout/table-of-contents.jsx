import React, {
  Component, useEffect, useState, useCallback,
} from 'react';

import { styled } from '@mui/material/styles';

import { Link, useStaticQuery, graphql } from 'gatsby';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import stickybits from 'stickybits';
import { Box, Container } from '@mui/material';
import { render } from '@react-three/fiber';

const PREFIX = 'table-of-contents';

const classes = {
  threeWrapper: `${PREFIX}-threeWrapper`,
  post: `${PREFIX}-post`
};

const Root = styled('nav')((
  {
    theme
  }
) => ({
  [`& .${classes.threeWrapper}`]: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },

  [`& .${classes.post}`]: {}
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
    <Root className="col-2 pl-5" id="sticky">
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
    </Root>
  );
});

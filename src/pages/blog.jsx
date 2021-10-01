import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core';
import Layout from '../layout/layout';

const useStyles = makeStyles((theme) => ({
  threeWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    top: '0px',
    zIndex: 1,
  },
}));

const blogPage = React.memo(() => {
  // const Posts = edges
  //   .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  //   .map(edge => <PostLink key={edge.node.id} post={edge.node} />);
  const classes = useStyles();
  return (
    <>
      {/* <BlogBuilder /> */}
      <div
        id="three-blog"
        className={`${classes.threeWrapper}d-none d-md-block`}
      >
        {/* <ThreeBlog theme={theme} /> */}
      </div>
    </>
  );
});

export default blogPage;

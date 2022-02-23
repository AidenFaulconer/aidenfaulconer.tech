import React from 'react';
import { styled } from '@mui/material/styles';
import Helmet from 'react-helmet';
import { StaticQuery } from 'gatsby';
import Layout from '../layout/layout';

const PREFIX = 'blogPage';

const classes = {
  threeWrapper: `${PREFIX}-threeWrapper`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
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
  }
}));

const blogPage = React.memo(({ location }) => {
  // const Posts = edges
  //   .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  //   .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    (<Root>
      {/* <BlogBuilder /> */}
      <div
        id="three-blog"
        className={`${classes.threeWrapper}d-none d-md-block`}
      >
        {/* <ThreeBlog theme={theme} /> */}
      </div>
    </Root>)
  );
});

export default blogPage;

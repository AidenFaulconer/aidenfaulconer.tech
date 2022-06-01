/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTheme } from '@mui/system';
import Masonry from '../components/util/masonry';

// date: new Date(),
// featured: false,
// title: '',
// catagory: '',
const SearchBar = ({ setFilter }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `,
  );
  const theme = useTheme();
  const tags = allMarkdownRemark.edges.map(({ node }) => node.frontmatter.tags).flat();
  const uniqueTags = [...new Set(tags)];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="tags">
        {uniqueTags.map((tag) => (
          <div
            key={tag}
            role="button"
            className="tag"
            onClick={() => setFilter((pre) => ({ ...pre, catagory: { ...pre.catagory, ...tag } }))}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

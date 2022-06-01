import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Box } from '@mui/material';
import Masonry from '../components/util/masonry';
import SearchBar from '../components/util/searchBar';

const mockData = [
  {
    css: 'https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg',
    height: 150,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
    height: 300,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg',
    height: 300,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg',
    height: 300,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg',
    height: 300,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg',
    height: 300,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg',
    height: 200,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg',
    height: 300,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
    height: 200,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg',
    height: 400,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg',
    height: 200,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg',
    height: 150,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg',
    height: 400,
    url: './defaultPost',
  },
  {
    css: 'https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg',
    height: 200,
    url: './defaultPost',
  },
];

const blogPage = React.memo(() => {
  // useStaticQuery thta gets all the blog posts from this gatsby sites graphql api
  const { allMarkdownRemark: { edges } } = useStaticQuery(
    graphql`
    query layoutQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { eq: "blog-post" }
          }
        }
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              description
              featuredpost
              featuredimage {
                childImageSharp {
                  fluid(maxWidth: 120, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }`,
  );

  const [filters, setFilters] = React.useState({
    date: new Date(),
    featured: false,
    title: '',
    catagory: '',
  });

  /* data is in the following format
  *  {
  *   css: 'https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg',
  *   height: 150,
  *   url: './post-name',
  *  }
  */
  const [data, setData] = React.useState(mockData);

  React.useEffect(() => {
    setData(
      edges
        .filter((edge) => {
          const {
            date, featured, title, catagory,
          } = filters;
          return (
            (date === '' || edge.node.frontmatter.date === date)
            && (featured === false || edge.node.frontmatter.featuredpost === featured)
            && (title === '' || edge.node.frontmatter.title.toLowerCase().includes(title.toLowerCase()))
            && (catagory === '' || edge.node.frontmatter.catagory.toLowerCase().includes(catagory.toLowerCase()))
          );
        })
        .map((edge) => ({
          css: edge.node.frontmatter.featuredimage.childImageSharp.fluid.src,
          height: edge.node.frontmatter.featuredimage.childImageSharp.fluid.height,
          url: `./blog/${edge.node.fields.slug}`,
        })),
    );
  }, [filters, edges]);

  return (
    <Box>
      <SearchBar setFilter={setFilters} />
      <Masonry data={data} />
    </Box>
  );
});

export default blogPage;

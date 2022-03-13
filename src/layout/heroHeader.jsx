import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  CardMedia,
  useTheme,
} from '@mui/material';

import { navigate, graphql, useStaticQuery } from 'gatsby';

import { keyframes } from '@emotion/react';
import ThreeWrapper from '../components/threejs/three-wrapper';
import {
  RegularButton,
} from '../components/custom/buttons';

import { useStore } from '../store/store';

// headline dynamic on threejs interaction, button to go back plug action in threejs, go to blog in the headline project selection?
export const HeroHeader = React.memo((props) => {
  // ========================================================================== //
  //   Handle project posts
  // ========================================================================== //
  const { allMarkdownRemark: { edges } } = useStaticQuery(graphql`
      query projectQuery {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {catagory: {eq: "project"}}}) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                metaDescription
                thumbnail
                catagory
                title
                path
              }
            }
          }
        } 
      }
  `);

  useStore.setState((state) => ({
    ...state,
    threejsContext: {
      ...state.threejsContext,
      context: {
        ...state.threejsContext.context,
        postData: edges,
      },
    },
  }));
  const { noHeadline = false } = props;
  const selectedIndex = useStore((state) => state.threejsContext.context.selectedIndex);
  const postsData = useStore((state) => state.threejsContext.context.postsData);
  const post = postsData ? postsData[selectedIndex] : {
    node: {
      frontmatter: {
        date: Date.now(),
        path: '/',
        catagory: 'project',
        thumbnail: './static/assets/hero.png',
      },
    },
  };

  const defaultHero = {
    headline: (
      <>
        I design apps that make users happy, through understanding your
        <br />
        identity, creating a strategy, and developing it to look and feel
        great.
        <br />
        Are you ready for the metaverse? I specialise in Virtual Reality.
        Let’s talk
        <br />
        business, start a project with me today.
        {/* identity, creating a strategy, and developing it to look and feel great. */}
        {/* Are you ready for the metaverse? I specialise in Virtual Reality. Let’s talk */}
        {/* business, start a project with me today. */}
      </>
    ),
    description: (
      <>
        I’m Aiden, I Deliver software
        <br />
        through design thinking 💡
      </>
    ),
    ctas: ['Lets Talk', 'Start a project'],
    enabled: true,
  };
  const defaultBooking = {
    headline: (
      <>
        Lets get to know you, and what you need...
        <br />
        I can help you UI/UX, Digital Consultation, Branding, Software, and Virtual Reality
      </>
    ),
    description: (
      <>
        Start a project, get your business off the ground ✈️
      </>
    ),
    ctas: false,
    enabled: true,
  };
  const [heroData, setHeroData] = useState(defaultHero);
  React.useEffect(() => {
    if (selectedIndex === -2) setHeroData(defaultBooking);
    if (selectedIndex === -1) setHeroData(defaultHero);
    if (selectedIndex > 0) {
      const { metaDescription, title } = edges[selectedIndex];
      setHeroData({
        description: metaDescription,
        headline: title,
        ctas: false,
      });
    }
  }, [selectedIndex]);

  // ========================================================================== //
  // Hero content
  // ========================================================================== //
  const {
    id,
  } = props;
  // eslint-disable-next-line consistent-return
  if (process.env.NODE_ENV === 'development') console.log('hero: time elapsed now ', performance.now());
  return (
    <section id={id}>
      <Grid

        container
        sx={{
          // minHeight: '89.5vh',
          height: '100%',
          boxSizing: 'border-box',
          width: '100vw',
          position: 'relative',
          // marginBottom: theme.spacing(3),
          // marginBottom: theme.spacing(0),
          // background: theme.palette.text.primary,
          // background: `linear-gradient(-90deg, ${theme.custom.contrast.black} 23.52%, ${theme.palette.text.primary} 23.52%, ${theme.palette.text.primary}) 61.89%`,
          display: 'inline-flex',
          justifyContent: 'center',
          pb: 4,
          background: (theme) => theme.palette.text.primary,
        }}
      >
        {/* ThreeJS */}
        <Grid
          item
          md={10}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            // height: '70%',
            height: '55vh',

            display: 'inline-flex',
            maxHeight: '70%',
            // borderBottom: theme.custom.borders.brandBorder,
            overflowY: 'clip',
            marginTop: 0,
            margin: 'auto',
          }}
        >
          <ThreeWrapper posts={edges} />
        </Grid>

        {/* Headline */}
        { !heroData.enabled || (
        <Grid
          item
          md={12}
          sx={{
            alignSelf: 'end',
            justifyContent: 'center',
            display: 'inline-flex',
            maxWidth: 700,
          }}
        >

          <Grid
            item
            md={10}
            sx={{
              alignSelf: 'center',
              width: '100%',
              display: 'inline-flex',
              gap: 3,
              justifyContent: 'flex-start',
              flexDirection: 'column',
              bottom: 0,
              margin: 'auto',
              pointerEvents: 'none',
              // overflowY: 'clip',
              position: 'relative',
              height: '30%',
              color: (theme) => theme.palette.text.primary,
              '&:after': {
                color: (theme) => theme.palette.text.primary,
                mixBlendMode: 'difference',
              },
              p: {
                sm: 3,
                xs: 3,
              },
            }}
          >

            {/* Typography */}
            <Typography
              align="left"
              color="secondary"
              variant="h1"
              style={{
                zIndex: 1,
                textTransform: 'uppercase',
                margin: 'auto',
              }}
            >
              {heroData.description}

            </Typography>
            <Typography
              style={{
                maxWidth: 600,
                zIndex: 1,
                margin: 'auto',
              }}
              variant="body1"
              color="secondary"
              align="left"
            >
              {/* {description} */}
              {heroData.headline}
            </Typography>
            {/* Buttons */}
            {heroData.ctas === false || (
              <Box
                sx={{
                  pointerEvents: 'all',
                  zIndex: 2,
                  position: 'relative',
                  // maxWidth: 525,
                  margin: 'auto',
                  maxWidth: 725,
                  display: 'inline-flex',
                  gap: 2,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <RegularButton onClick={() => navigate('/#contact')} type="primary" icon={{ enabled: true, type: 'arrow' }}>
                  Let's get in touch
                </RegularButton>
                <RegularButton
                  onClick={() => navigate('/booking')}
                  type="secondary"
                  icon={{ enabled: true, type: 'arrow' }}
                >
                  Start a Project
                </RegularButton>
              </Box>
            )}
          </Grid>
        </Grid>
        )}
      </Grid>
      {/* // create a svg circle in html */}
    </section>
  );
}, (pre, post) => pre !== post);

export default React.memo(HeroHeader);

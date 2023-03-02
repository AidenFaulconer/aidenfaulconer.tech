import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  CardMedia,
  useTheme,
} from '@mui/material';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { keyframes } from '@emotion/react';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';
import ThreeWrapper from '../components/threejs/three-wrapper';
import {
  RegularButton,
} from '../components/custom/buttons';
import { useStore } from '../store/store';
import { useScrollProgress, useLockBodyScroll, useIntersectionObserver } from '../components/util/customHooks';
import Clouds from '../components/custom/clouds';
// headline dynamic on threejs interaction, button to go back plug action in threejs, go to blog in the headline project selection?
export const HeroHeader = React.memo(({ id, noHeadline = false, ...props }) => {
  // properties
  const defaultHero = {
    headline: (
      // <>
      //   I design apps that make users happy, through understanding your
      //   <br />
      //   identity, creating a strategy, and developing it to look and feel
      //   great.
      //   <br />
      //   Are you ready for the metaverse? I specialise in Virtual Reality.
      //   Let’s talk
      //   <br />
      //   business, start a project with me today.
      // </>
      <>
        As a digital wizard, I use my expertise in software development and design to bring your ideas to life. From concept to launch, I'll work with you every step of the way to ensure your project is a success. Contact me today to start transforming your vision into reality.
      </>
    ),
    description: (
      <>
        I’m Aiden, your digital
        <br />
        wizard 🪄
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

  // hooks/state
  const [heroData, setHeroData] = useState(defaultHero);
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
  useEffect(() => {
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
  }, []);

  const postData = useStore((state) => state.threejsContext.context.postData);
  const selectedIndex = useStore((state) => state.threejsContext.context.selectedIndex);
  const changeHand = useStore((state) => state.threejsContext.methods.changeHand);
  const type = useStore((state) => state.appContext.type);

  // const post = postsData ? postsData[selectedIndex] : {
  //   node: {
  //     frontmatter: {
  //       date: Date.now(),
  //       path: '/',
  //       catagory: 'project',
  //       thumbnail: './static/assets/hero.png',
  //     },
  //   },
  // };

  // const scrollProgress = useScrollProgress();
  const [sticky, setSticky] = useState(true);
  const [selectedSlide, changeSelectedSlide] = useState(0);
  const theme = useTheme();

  //   color change spring
  const [{ x, y }, set] = useSpring(() => ({
    // when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
    to: { x: theme.palette.text.primary, y: 1 },
    config: {
      mass: 15,
      duration: 550,
      tension: 1500,
      friction: 150,
      precision: 0.01,
    },
  }));

  const threshold = 0.25;

  // eslint-disable-next-line default-param-last
  const intersectionHandler = (entries = [], observer) => entries.forEach(({ intersectionRatio, target }) => {
    const id = Number(target.id);
    console.log(intersectionRatio, id);
    if (intersectionRatio >= threshold) {
      changeSelectedSlide(id);
    }
  });

  const addNode = useIntersectionObserver(intersectionHandler, {
    root: null,
    rootMargin: '0px 10% 0px 0px',
    threshold,
  });

  const slides = [
    {
      title: (
        <>
          I’m Aiden, your digital
          <br />
          wizard 🪄
        </>
      ),
      subTitle: (
        <>
          As a digital wizard, I use my expertise in software development and design to bring your ideas to life. From concept to launch, I'll work with you every step of the way to ensure your project is a success. Contact me today to start transforming your vision into reality.
        </>
      ),
      handData: {
        animationsPlaying: ['hold'],
        propsUsing: [],
        handPosition: [0, -1, 0],
        numHands: 2,
      },
      background: theme.palette.text.primary,
      color: type ? 'secondary' : 'primary',
      cta: true,
    },
    {
      title: (
        <>
          Mobile applications...
          <br />
          got you covered 👍
        </>
      ),
      subTitle: (
        <>
          As a digital wizard, I use my expertise in software development and design to bring your ideas to life. From concept to launch, I'll work with you every step of the way to ensure your project is a success. Contact me today to start transforming your vision into reality.
        </>
      ),
      handData: {
        animationsPlaying: ['hold'],
        propsUsing: ['Iphone'],
        handPosition: [0, -1, 0],
        numHands: 1,
      },
      background: '#4EDB9E',
      color: type ? 'primary' : 'secondary',
      cta: false,
    },
    {
      title: (
        <>
          Virtual Reality
          <br />
          And 3D Specialist 🧊
        </>
      ),
      subTitle: (
        <>
          lorum ipsum
        </>
      ),
      handData: {
        animationsPlaying: ['hold'],
        propsUsing: ['VR'],
        handPosition: [0, -1, 0],
        numHands: 1,
      },
      background: '#864EDB',
      color: type ? 'primary' : 'secondary',
      cta: false,
    },
    {
      title: (
        <>
          UI/UX, Graphic Design, Software
          {' '}
          <br />
          You dream it I build it
        </>
      ),
      subTitle: (
        <>
          lorum ipsum
        </>
      ),
      handData: {
        animationsPlaying: ['hold'],
        propsUsing: ['Hammer'],
        handPosition: [0, -1, 0],
        numHands: 1,
      },
      background: '#FFFF99',
      color: type ? 'secondary' : 'primary',
      cta: false,
    },
  ];

  useEffect(() => {
    if (selectedSlide === slides.length) {
      changeHand({
        animationsPlaying: ['hold'],
        propsUsing: [],
        handPosition: [0, -1, 0],
        numHands: 2,
      });

      setSticky(false);// -1
    } else {
      // update hand based on current slide
      const { handData } = slides[selectedSlide];
      set({ x: slides[selectedSlide].background });
      changeHand(handData);
      console.log(x);
      setSticky(true);// -1
    }
  }, [, selectedSlide]);

  useEffect(() => {
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

  // eslint-disable-next-line consistent-return
  // if (process.env.NODE_ENV === 'development') console.log('hero: time elapsed now ', performance.now());
  return (
    <section
      id={id}
      className="relative"
    >
      <a.div
        className="
          w-full h-full grid grid-cols-6
          box-border relative items-start
        "
        style={{
          background: x,
        }}
      >
        {/* ThreeJS */}
        <div
          className="md:col-start-3 col-start-1 md:col-span-4 col-span-6 sticky top-0"
        >
          <div
            className="
              z-[1] w-full h-full lg:min-h-[55vh] md:min-h-[55vh]
              md:max-h-[30vh] min-h-[53vh] inline-flex max-h-3/4 mt-0 m-auto
              sticky top-0
            "
          >
            <div
            // w-[100vw]
              className="
              w-full h-[60vh]
              absolute inline-flex md:top-[20vh] top-[0vh] m-auto z-1
            "
            >
              {edges && (<ThreeWrapper posts={edges} />)}
            </div>
          </div>
        </div>

        {/* clouds */}
        {/* <div className="max-h-1/4 overflow-hidden  w-full z-[1] sticky mt-09">
          <Clouds />
        </div> */}

        {/* Headlines */}
        {!heroData.enabled || (slides.map((slide, i) => {
          const odd = i % 2 === 0;
          return (
            <div
              id={i}
              className="
                md:col-start-1 col-start-2 md:col-span-2 col-span-6 w-full min-h-[150vh]
                inline-flex transition-all ease-in-out
              "
              ref={addNode}
            >
              {/* headline */}
              <div
                className={`
                    ${i === selectedSlide ? 'self-start' : ''}  ${i === selectedSlide && i !== 0 ? 'fixed' : 'relative'} 
                    pb-36 top-[35%] h-full sticky flex-col w-auto align-middle inline-flex px-3
                  `}
              >
                <Box
                  className="inline-flex gap-4 flex-col relative pointer-events-none p-3 "
                  sx={{
                    color: (theme) => theme.palette.text[slides[selectedSlide].color],
                  }}
                >
                  <h1
                    className="z-[1] text-current font-black text-4xl uppercase"
                  >
                    {slide.title}
                    {/* {scrollProgress} */}
                    {/* {heroData.description} */}
                  </h1>

                  <p
                    className="max-w-[556px] text-current text-left text-md font-medium z-[1]"
                  >
                    {slide.subTitle}
                    {/* {heroData.headline} */}
                  </p>
                </Box>

                {/* Buttons */}
                {slide.cta && (
                <Box className="z-[10000] p-3 pointer-events-[all] inline-flex gap-2 justify-start items-start relative max-w-[556px]">
                  <RegularButton onClick={() => navigate('/#contact')} type="primary" icon={{ enabled: true, type: 'arrow' }}>
                    Get in touch
                  </RegularButton>
                  <RegularButton
                    onClick={() => navigate('/booking')}
                    type="secondary"
                    icon={{
                      enabled: true,
                      type: 'arrow',
                    }}
                  >
                    Start Project
                  </RegularButton>
                </Box>
                )}
              </div>

              {/* details (tablet + desktop up) */}
              {/* <a.div
                className={`${i === selectedSlide ? 'self-end' : ''}  ${i === selectedSlide && i !== 0 ? 'fixed top-0' : 'relative'} h-full sticky flex-col md:inline-flex md:w-[30%] hidden align-middle px-3`}
              /> */}
              {/* Test */}
            </div>
          );
        })
        )}
      </a.div>
    </section>
  );
}, (pre, post) => pre !== post);

export default HeroHeader;

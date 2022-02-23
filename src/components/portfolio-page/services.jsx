import {
  Box, Grid, Typography, useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { navigate, useStaticQuery } from 'gatsby';
import { NoToneMapping } from 'three';
import { styled } from '@mui/material/styles';
import {
  RegularButton,
  SelectionButton,
} from '../custom/buttons';

import {
  SCROLL_PROPS,
  svgEncodeBaseSixtyFour,
} from '../../store/theme';

// ========================================================================== //
// services
// ========================================================================== //
import websiteImage from '../../../static/assets/portfolio/website.png';
import vrImage from '../../../static/assets/portfolio/vr.mp4';
import designImage from '../../../static/assets/portfolio/lots.png';
import appsImage from '../../../static/assets/portfolio/clouds.png';
import uiuxImage from '../../../static/assets/portfolio/uiux.png';
import brandingImage from '../../../static/assets/portfolio/branding.jpg';
import servicesImage from '../../../static/assets/portfolio/delivery.png';
import ThreeWrapper from '../threejs/three-wrapper';
import { useStore } from '../../store/store';

// ========================================================================== //
// Shifting type
// ========================================================================== //
// const useSlidingText = styled('div')((theme) => ({
//   '@keyframes animatedType': {
//     from: {
//       backgroundPosition: '0 0',
//     },
//     to: {
//       backgroundPosition: '100% 0',
//     },
//   },
//   movingType: {
//     position: 'absolute',
//     display: 'flex',
//     margin: 'auto',
//     minWidth: '200vw',
//     width: '200%',
//     left: '-50%',
//     opacity: 0.5,
//     height: '70%',
//     zIndex: '10 !important',
//   },
//   type: {
//     display: 'inline-block',
//     height: '100%',
//     fill: theme.palette.text.primary,
//     width: '100%',
//     animation: '$animatedType 24s linear infinite alternate',
//     margin: 'auto',
//     // tilt look
//     // transform: 'rotate3d(116, -17, 28, 58deg)',
//     transform: 'rotate3d(31, -17, 28, 58deg)',
//     backgroundImage: ({ svg }) => svgEncodeBaseSixtyFour(`${svg}`),
//   },
// }));

// export const MovingType = ({ svg }) => (
//   <div className={classes.movingType}>
//     <span className={classes.type} />
//   </div>
// );

// ========================================================================== //
// services
// ========================================================================== //

const servicesData = [
  {
    title: 'Websites',
    src: websiteImage,
    priceRange: '$300-$3000',
    color: '#119F74',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>to maintain a new or current website?</li>
          <li>faster SEO, and better performance on your user metrics?</li>
          <li>to integrate your digital transformation strategy effectively</li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'Design',
    src: designImage,
    priceRange: '$300-$3000',
    color: '#B314CD',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'Apps',
    src: appsImage,
    priceRange: '$300-$3000',
    color: '#DF650D',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'UI/UX',
    src: uiuxImage,
    priceRange: '$300-$3000',
    color: '#2E00FF',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'VR',
    src: vrImage,
    color: '#C71073',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
  {
    title: 'Branding',
    src: brandingImage,
    priceRange: '$300-$3000',
    color: '#A4AF1D',
    description: (
      <div>
        <h3>Do you need</h3>
        <ul>
          <li>
            User interfaces and user experiences that get more out of your
            users?
          </li>
          <li>
            Stronger brand identity, with logos, brand strategy that communicate
            your brands product and vision?
          </li>
          <li>
            Stronger sales funnels, driven by design and interactions in the
            digital world?
          </li>
          <li>
            a fast, well designed, user centered landing page or web platform
          </li>
        </ul>
      </div>
    ),
    ctas: ['Book now'],
  },
];
export default React.forwardRef((props, ref) => {
  const bgAlt = 0;
  const { id } = props;

  return (
    <section
      id={id}
      ref={ref}
      // className={(classes.section)}
    >
      <SelectionMenu />
    </section>
  );
});

// ========================================================================== //
// Selection Menu (SERVICES)
// ========================================================================== //
const SelectionMenu = React.forwardRef((props, red) => {
  const [selections, setSelections] = React.useState({
    websites: {
      title: 'Websites',
      costRange: '400$-5000$',
      description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: servicesImage,
      name: 'Websites',
      threejs: {
        // animationsPlaying: ['hold'],
        animationsPlaying: ['hold'],
        propsUsing: ['Iphone'],
      },
    },
    design: {
      title: 'Design',
      costRange: '',
      description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: servicesImage,
      name: 'Design',
      threejs: {
        // animationsPlaying: ['write'],
        animationsPlaying: ['hold'],
        propsUsing: ['Pencil', 'Emoji'],
      },
    },
    vr: {
      title: 'Virtual Reality',
      costRange: '',
      description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: servicesImage,
      name: 'Virtual Reality',
      threejs: {
        // animationsPlaying: ['hold'],
        animationsPlaying: ['hold'],
        propsUsing: ['VR'],
      },
    },
    branding: {
      title: 'Branding',
      costRange: '',
      description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: servicesImage,
      name: 'Branding',
      threejs: {
        // animationsPlaying: ['write'],
        animationsPlaying: ['hold'],
        propsUsing: ['Pencil', 'Paper'],
      },
    },
    other: {
      title: 'Other',
      costRange: '',
      description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: servicesImage,
      name: 'Other',
      threejs: {
        // animationsPlaying: ['build'],
        animationsPlaying: ['hold'],
        propsUsing: ['Hammer'],
      },
    },
    me: {
      title: 'My Projects',
      costRange: '',
      description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
      image: servicesImage,
      name: 'My Projects',
      threejs: {
        // animationsPlaying: ['build'],
        animationsPlaying: ['hold'],
        propsUsing: [],
      },
    },
  });
  const [selected, setSelected] = React.useState(selections.websites);
  const theme = useTheme();

  const changeHand = useStore((state) => state.threejsContext.methods.changeHand);
  //   changePage({
  //     selectedIndex: position,
  //     position: new Vector3(ref.current.position.x, ref.current.position.y, ref.current.position.z),
  //     pageLink: link,
  //     // PAGE CHANGE DATA
  //   });
  return (
  // container
    <Grid
      container
      xs={12}
      wrap
      sx={{
        position: 'relative',
        border: (theme) => theme.custom.borders.brandBorderSecondary,
        flexDirection: { md: 'row', xs: 'column' },
        overflowX: 'scroll',
        overflowY: 'hidden',
      }}
    >

      {/* menu of services to scroll and select through */}
      <Grid
        item
        lg={2}
        md={3}
        xs={12}
        sm={12}
        wrap={false}
        sx={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 2,
          flexDirection: { md: 'column', xs: 'row' },
          overflowX: { md: 'clip', xs: 'scroll' },
          height: { md: '100%', xs: 50 },
          width: { xs: '100vw', lg: '100%' },
          p: 4,

        }}
      >
        {Object.keys(selections).map((key) => {
          const item = selections[key];
          return (
            <SelectionButton
              selected={item.name === selected.name}
              onClick={() => {
                const _currentSelection = selections[key];
                setSelected(_currentSelection);
                changeHand({
                  animationsPlaying: _currentSelection.threejs.animationsPlaying,
                  propsUsing: _currentSelection.threejs.propsUsing,
                });
              }}
            >
              {item.name}
            </SelectionButton>
          );
        })}
      </Grid>

      {/* description of service */}
      <Grid
        item
        xs={12}
        md={9}
        lg={10}
        sx={{
          display: 'inline-flex',
          color: theme.palette.text.primary,
          padding: 4,
          maxWidth: '100vw',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <Box sx={{
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          width: { md: '50%', xs: '100%' },
          zIndex: 20,
          // minHeight: 400,
          height: { md: '100%', xs: 350 },
        }}
        >

          {/* {JSON.stringify(selected, null, 2)} */}
          <Typography align="left" variant="h2" component="h2" color="primary">
            {selected.title}
          </Typography>

          <Typography
            align="left"
            variant="caption"
            gutterBottom
            component="h3"
            color="primary"
            style={{ marginBottom: 30, fontWeight: 'regular !important' }}
          >
            {selected.costRange}
          </Typography>

          <Typography
            align="left"
            variant="body1"
            component="body1"
            color="primary"
            style={{ marginBottom: 30 }}
          >
            {selected.description}
          </Typography>

          <Box
            sx={{
              display: 'inline-flex',
              gap: 3,
              row: 3,
              flexDirection: 'row',
              position: 'relative',
              width: '100%',
              height: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              flexWrap: 'no-wrap',
            }}
          >
            <RegularButton onClick={() => navigate('./booking')}>
              Start
              {' '}
              {selected.name}
              {' '}
              project
            </RegularButton>

            <RegularButton type="secondary" onClick={() => navigate('/#contact')}>
              Contact me
            </RegularButton>
          </Box>
        </Box>
        {/* Image representing service */}
        <Box sx={{
          // display: 'inline-block',
          position: { md: 'relative', xs: 'absolute' },
          width: { lg: '50%', xs: '100%' },
          height: { lg: '100%', xs: '40%' },
          margin: 'auto',
          left: 0,
          top: 0,
          flex: 2,
          display: { md: 'block', xs: 'none' },
        }}
        >
          <ThreeWrapper />
        </Box>
      </Grid>

    </Grid>
  );
});

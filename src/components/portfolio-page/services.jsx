import {
  makeStyles,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import * as React from 'react';
import { navigate, useStaticQuery } from 'gatsby';
import { NoToneMapping } from 'three';
import {
  RegularButton,
  SecondaryButton,
  SelectionButton,
  ThirdButton,
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
import services_image from '../../../static/assets/portfolio/delivery.png';
import ThreeWrapper from '../threejs/three-wrapper';
import { useStore } from '../../store/store';

// ========================================================================== //
// Shifting type
// ========================================================================== //
const useSlidingText = makeStyles((theme) => ({
  '@keyframes animatedType': {
    from: {
      backgroundPosition: '0 0',
    },
    to: {
      backgroundPosition: '100% 0',
    },
  },
  movingType: {
    position: 'absolute',
    display: 'flex',
    // justifyContent: 'space-evenly',
    // flexDirection: 'column',
    // minHeight: '90vh',
    margin: 'auto',
    // opacity: 0.3,
    minWidth: '200vw',
    width: '200%',
    left: '-50%',
    opacity: 0.5,
    height: '70%',
    zIndex: '10 !important',
  },
  type: {
    display: 'inline-block',
    height: '100%',
    fill: theme.palette.text.primary,
    // backgroundColor: theme.palette.text.primary,
    // height: '100%',
    width: '100%',
    animation: '$animatedType 24s linear infinite alternate',
    // tilt look
    margin: 'auto',
    // transform: 'rotate3d(116, -17, 28, 58deg)',
    transform: 'rotate3d(31, -17, 28, 58deg)',
    backgroundImage: ({ svg }) => svgEncodeBaseSixtyFour(`${svg}`),
  },
}));

export const MovingType = ({ svg }) => {
  const classes = useSlidingText({ svg });
  return (
    <div className={classes.movingType}>
      <span className={classes.type} />
    </div>
  );
};

// ========================================================================== //
//  Index page styles
// ========================================================================== //
const useStyles = makeStyles((theme) => ({

  selectionMenu: {
    position: 'relative',
    border: theme.custom.borders.brandBorder,

    flexDirection: 'row',
    overflowX: 'scroll',
    overflowY: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 4, 4, 4),
    },
  },
  services3d: {
    height: 500,
    // border: theme.custom.borders.brandBorder,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row !important',
      display: 'none',
      visible: 'hidden',
    },
  },
  selectionOptions: {
    display: 'inline-flex',
    gap: theme.spacing(4),
    width: '100%',
    overflowX: 'scroll',
    padding: theme.spacing(4),
    flexDirection: 'column',

    flexWrap: 'nowrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row !important',
      padding: theme.spacing(4, 4, 4, 0),
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row !important',
      padding: theme.spacing(4),
    },
  },
}));

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
  const classes = useStyles({ bgAlt });

  return (
    <section
      id={id}
      ref={ref}
      className={(classes.section)}
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
      image: services_image,
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
      image: services_image,
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
      image: services_image,
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
      image: services_image,
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
      image: services_image,
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
      image: services_image,
      name: 'My Projects',
      threejs: {
        // animationsPlaying: ['build'],
        animationsPlaying: ['hold'],
        propsUsing: [],
      },
    },
  });
  const [selected, setSelected] = React.useState(selections.websites);
  const classes = useStyles();
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
    <Grid container xs={12} wrap className={classes.selectionMenu}>
      {/* menu of services to scroll and select through */}
      <Grid item lg={2} xs={12} md={3} className={classes.selectionOptions}>
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
        xs={6}
        md={5}
        style={{
          height: 500,
          display: 'inline-flex',
          flexDirection: 'column',
          //   background: theme.palette.text.secondary,
          color: theme.palette.text.primary,
          padding: theme.spacing(4),
          // borderLeft: theme.custom.borders.brandBorder,
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

        <div
          style={{
            display: 'inline-flex',
            gap: theme.spacing(3),
            row: theme.spacing(3),
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <RegularButton onClick={() => navigate('./booking')}>
            Start
            {' '}
            {selected.name}
            {' '}
            project
          </RegularButton>

          <SecondaryButton onClick={() => navigate('#contact')}>
            Contact me
          </SecondaryButton>
        </div>
      </Grid>

      {/* Image representing service */}
      <Grid
        item
        lg={5}
        xs={6}
        md={4}
        className={classes.services3d}
      >
        {/* <img
          src={selected.image}
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        /> */}
        <div style={{
          height: 500,
          position: 'relative',
        }}
        >
          <ThreeWrapper />
        </div>
      </Grid>
    </Grid>
  );
});

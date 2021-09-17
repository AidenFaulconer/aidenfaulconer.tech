// This is where I define elements of my theme.
import {
  createMuiTheme,
  createStyles,
  createTheme,
  responsiveFontSizes,
  withStyles,
} from '@material-ui/core';

export const theme = createTheme();

// convert object to a string, inject paramater input into the string object, then convert it back to an object
export const objectTokenizer = (object, parameter) => JSON.stringify(object, null, 2).replace(
  /"([a-zA-Z]+)"/g,
  (match, p1) => `"${parameter[p1]}`,
);

// take input font size reduce it by a third, then recursively continue this pattern from breakpoints xl, lg, md, and sm as a function to output
const fontReducerForThemeBreakpoint = (
  fontSize,
  breakpoint = 'md',
  reduceRatio = 0.66666667,
) => ({
  fontSize: `${fontSize}`,
  [theme.breakpoints.down(breakpoint)]: {
    fontSize: `${fontSize * reduceRatio}`,
  },
});

// brand color primary
// theme.palette.primary.main = '#E1F2D4';
theme.palette.primary.main = '#E1F2D4';
theme.palette.secondary.main = '#243006';

// brand text
theme.palette.text.primary = '#243006';
// brand background
theme.palette.text.secondary = '#E1F2D4';
// theme.palette.background.button = '#6A8B4D';
theme.palette.background.button = '#6A8B4D';
theme.palette.background.main = 'rgb(51, 68, 9)';
// theme.palette.background.default = '#E1F2D4';
theme.palette.background.default = '#c6e1b1';
theme.palette.background.headline = '#6A8B4D';

// brand theme injections
theme.shadows.brand = '10px 10px 0px rgba(183, 197, 168, 0.6), 5px 5px 0px rgba(183, 197, 168, 0.6)';
theme.shadows.filterShadow = '0px 0px 20px rgba(51, 68, 9,.6)';
// "10px 10px 0px rgba(183, 197, 168, 0.6)"//inset 0px 4px 3px #F6FFC0;
theme.shadows.brandBig = '10px 10px 0px rgba(183, 197, 168, 0.6), 5px 5px 0px rgba(183, 197, 168, 0.6), 46px 31px 75px rgba(0, 0, 0, 0.3)';
theme.shadows.brandInset = 'inset 0px 4px 10px  rgba(51, 68, 9,.3)';

theme.palette.background.hero = '#DCF15B';
theme.palette.background.primary = 'radial-gradient(52.48% 58.6% at 10.23% 25.21%, #C1DD13 0%, #F4FDBF 100%), radial-gradient(50% 50% at 50% 50%, #F5FEC0 0%, #F6FCD1 100%)';
theme.palette.background.secondary = 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(177.95% 1171.31% at -86.48% 213.11%, #3A4D09 22.92%, #6A8B4D 100%)';

// theme.palette.error.main = "red"
// theme.overrides.MuiBackdrop = "red"

theme.shape.brandBorderRadius = '8px';
theme.shape.brandBorderRadius2 = '22px';
theme.shape.brandBorderRadius3 = '44px';
theme.shape.brandBorder = '1px solid rgba(255,255,255,.3)';
theme.shape.brandBorderSecondary = '1px solid rgba(1,1,1,.3)';

theme.typography.body1.textOverflow = 'ellipsis';
theme.typography.body2.textOverflow = 'ellipsis';
theme.typography.body2.overflow = 'hidden';
theme.typography.body2.maxHeight = '200px';

// typography
theme.typography.button = {
  fontSize: '13px',
  color: theme.palette.text.primary,
  background: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontSize: '11px',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
  },
};

theme.typography.body1 = {
  fontSize: '18px',
  lineHeight: '150%',
  color: theme.palette.text.primary,
  background: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontSize: '11px',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
  },
};
theme.typography.h5 = {
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
  },
};

// used in some body text
theme.typography.h4 = {
  fontSize: '20px',
  fontWeight: 500,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '26px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
  },
};

theme.typography.h3 = {
  // fontSize: "16px",
  fontSize: '33px',
  fontWeight: 200,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    fontSize: '33px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
};

theme.typography.h2 = {
  // fontSize: "5rem",
  // textStroke: '2px currentColor',
  fontSize: '35px',
  color: theme.palette.text.primary,
  fontWeight: 100000,
  [theme.breakpoints.down('lg')]: {
    fontSize: '30px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '25px',
  },
};

theme.typography.h1 = {
  // fontSize: "5rem",
  // textStroke: '2px currentColor',
  fontSize: '70px',
  fontWeight: 'bolder',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('lg')]: {
    fontSize: '45px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '50px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
  },
};

theme.spacingFromHeader = theme.spacing(6);
theme.typography.fontFamily = 'Open Sans';
theme.typography.h1.fontFamily = 'Cinzel Decorative';
theme.typography.h2.fontFamily = 'Cinzel Decorative';

// const GlobalStyles = withStyles(theme => {
// 	const isLight = theme.palette.type === 'light';
// 	const mainColor = isLight ? theme.palette.primary.main : theme.palette.primary.light;
// 	return createStyles({
//     const GlobalStyles = withStyles((theme) => {
// 	});
// })(() => null);
// const myTheme = isDark => responsiveFontSizes(
//   ({
// 	palette: {
// 		type: isDark ? 'dark' : 'light',
// 		primary: {},
//     }
// }
// ));

// export default function MuiCustomTheme({ darkMode, children, ...props }) {
// 	// take away SSR rendered mode;
// 	useEffect(() => {
// 		document.body.className = '';
// 	}, []);

//   ChildrenWithGlobalStyle.propTypes = {
//     children: PropTypes.node
//   };

//   MuiCustomTheme.propTypes = {
//     darkMode: PropTypes.bool.isRequired,
//     children: PropTypes.node
//   };

//   //https://github.com/GalenWong/galenwong.github.io/commit/226fff203d3a67ac8d813ed3df9cd1f6f0bdb7df
// //theme switch

// const LightDarkContext = React.createContext({
// 	theme: 'light',
// 	changeTheme: () => null
// });

// export default LightDarkContext

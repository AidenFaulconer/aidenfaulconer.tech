import * as React from 'react';
import {
  Container, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, Typography,
} from '@material-ui/core';
import Layout from '../layout/layout';
import { SecondaryButton } from '../components/custom/buttons';

const useStyles = makeStyles((theme) => ({
  underlay: {
    position: 'relative',
    // top: '-400px',
    content: '',
    margin: theme.spacing(3),
    padding: theme.spacing(12),
    paddingTop: 'unset',
    pointerEvents: 'all',
    overflow: 'hidden',
    // boxShadow: theme.custom.shadows.brandBig,
    background:
      'linear-gradient(180deg, #324308 15.49%, #8BAD6B 68.98%, #AAC882 103.74%)',
    borderRadius: theme.custom.borders.brandBorderRadius3,
  },
  endOfPage: {
    background: theme.palette.text.primary,
    minHeight: '70vh',
    color: theme.palette.text.secondary,
    padding: theme.spacing(18, 6),
    marginTop: theme.spacing(18),
  },
  sectionCurve: {
    borderRadius: '100%',
    margin: 'auto',
    width: '100%',
    left: '0px',
    fill: '#324308',
    // marginTop: '-43px',
    // fill: theme.palette.background.default,
  },
  cubesOffset: {
    top: '-7%',
    left: '37%',
    top: '-6%',
    left: '38%',
    opacity: 0.6,
    zIndex: -1,
    position: 'absolute',
    maxWidth: 860,
  },
  letsStartSomething: {
    width: '100%',
    objectFit: 'contain',
  },
}));

// <video preload="true" controls loop autoPlay="true">
//                       <source src="https://imgur.com/5QFU0PB.mp4" />
// </video>

const BookingPage = React.memo(
  ({
    // returned from pageQuery as props
    // data: {
    //   allMarkdownRemark: { edges },
    // },
    location,
  }) => {
    const marginAmount = '175px';
    const classes = useStyles();
    const defaultValues = {
      name: '',
      age: 0,
      sex: '',
      os: '',
      favoriteNumber: 0,
    };
    const [formValues, setFormValues] = React.useState(defaultValues);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    return (
      <>
        <Container maxWidth="xl">
          {/* <Contact id="contact"/> */}
          <h1>Hello world</h1>
          {/* write a form for me materialui */}
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Container>

        {/* <Contact id="contact" /> */}
      </>
    );
  },
);

export default BookingPage;

// autorun at gatsby rebuild-cycle
// export const pageQuery = graphql`
//   query indexPageQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             thumbnail_
//           }
//         }
//       }
//     }
//   }
// `;

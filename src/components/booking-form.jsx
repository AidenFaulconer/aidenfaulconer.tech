import {
  Box, Grid, List, ListItem, ListItemText, Typography, useTheme,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import * as React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactConfetti from 'react-confetti';
import {
  RegularButton,
  SelectionButton,
  FancyTextField,
  FileUploadButton,
  PickDate,
} from './custom/buttons';

import { SCROLL_PROPS, svgEncodeBaseSixtyFour } from '../store/theme';

import headlineImage from '../../static/assets/portfolio/designs.png';

import ThreeDCarousel from './custom/threeDCarousel';
// sections
import { SectionHeader } from './section-header';

import awmImage from '../../static/assets/blog/awm.png';
import rvrImage from '../../static/assets/blog/rvr.png';
import rgImage from '../../static/assets/blog/railgun.png';
import afImage from '../../static/assets/blog/me.png';
import lgImage from '../../static/assets/blog/uc.png';
import xprtImage from '../../static/assets/blog/xperthubb.png';
import ajImage from '../../static/assets/blog/aj.png';
import { ServicesSelection } from './portfolio-page/services';

export default ({ i, title = 'Start a project', setSelected = () => {} }) => {
  const handleError = () => {};
  const theme = useTheme();
  const inputSources = React.createRef([]);
  React.useEffect(() => {
    console.log(inputSources.current);
  }, [inputSources]);

  return (
    <Grid
      container
      display="flex"
      alignItems="stretch"
      justifyContent="flex-start"
      sx={{
        width: '100%',
        pb: 4,
        height: 1000,
        color: (theme) => theme.palette.text.primary,
        border: (theme) => theme.custom.borders.brandBorder,
      }}
    >
      <Box
        sx={{
          p: 4,
          width: '100%',
          position: 'relative',
          height: 100,
          background: (theme) => theme.palette.text.primary,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography
          variant="h1"
          component="h4"
          align="left"
          color="currentColor"
        >
          {title}
        </Typography>
      </Box>

      <MainSelections />
    </Grid>
  );
};

export const ProjectStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const useStepComponent = React.useCallback(({ StepComponent }) => <StepComponent />, [activeStep]);
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      {/* steps */}
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            stepProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {useStepComponent(steps[activeStep])}

      {/* stepper controls */}
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Step
            {activeStep + 1}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <RegularButton
              type="secondary"
              color="inherit"
              style={{
                transform: 'scaleX(-1)',
              }}
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {/* Back */}
            </RegularButton>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <RegularButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </RegularButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export const DetailStep = (props) => {
  const [state, setState] = React.useState();
  const inputSources = React.createRef([]);
  const theme = useTheme();
  console.log(props);
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      height: 400,
    }}
    >
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'no-wrap',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="name"
          helperText="your full name"
          size="normal"
        />
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="phone"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="email"
          helperText="your full name"
          size="normal"
          input={{
            mode: 'text',
            pattern:
              '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$',
          }}
        />

        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          type="select"
          icon={{ start: true, type: 'item' }}
          data={[
            {
              label: 'Software Development',
              value: 'Software Development',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Virtual Reality',
              value: 'Virtual Reality',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Backend Development',
              value: 'Backend Development',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Frontend Development',
              value: 'Frontend Development',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Software Maintenence',
              value: 'Software Maintenence',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'User Interface Design',
              value: 'User Interface Design',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'User Experience Design',
              value: 'User Experience Design',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Strategy',
              value: 'Strategy',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Graphic Design',
              value: 'Graphic Design',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Branding',
              value: 'Branding',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Website',
              value: 'Website',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Mobile App',
              value: 'Mobile App',
              icon: { start: true, type: 'item' },
            },
            { label: 'App', value: 'App', icon: { start: true, type: 'item' } },
          ]}
          label="service"
          message="Select the type of service you are looking for in the dropdown"
          size="normal"
          input={{ mode: 'text' }}
        />
      </Box>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          flexWrap: 'no-wrap',
          width: '50%',
          height: '100%',

        }}
      >
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          maxRows={11}
          fullHeight
          label="message"
          message="Tell me about yourself, and how I can help"
          defaultValue="Write me a message, tell me about what your project is, or just say hi!"
        />
      </Box>
    </Box>
  );
};

export const PlanningStep = (props) => {
  const [state, setState] = React.useState();
  const inputSources = React.createRef([]);
  const theme = useTheme();
  console.log(props);
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      height: 400,
    }}
    >
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'no-wrap',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          maxRows={11}
          fullHeight
          label="Project Requirements"
          defaultValue={`I need this ${props.title || 'app'} project do the following.. `}
        />
        <PickDate
        //   ref={(ref) => inputSources.current.push(ref)}
          label="When is this project due?"
        //   helperText="your full name"
        //   size="normal"
        //   input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
      </Box>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          flexWrap: 'no-wrap',
          width: '50%',
          height: '100%',

        }}
      >
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="Budget Range?"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FileUploadButton
          ref={(ref) => inputSources.current.push(ref)}
          label="Upload reference photos"
          icon={{ start: true, type: 'item' }}
        //   helperText="Photos of what you want the project to look like"
        //   size="normal"
        //   type="file"
        //   input={{ mode: 'file' }}
        />
        <FancyTextField
          ref={(ref) => inputSources.current.push(ref)}
          label="What would make this project successful?"
          helperText="your full name"
          maxRows={7}
          fullHeight
          defaultValue={`I need this ${props.title || 'app'} project do the following.. `}

          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
      </Box>
    </Box>
  );
};
export const ConfirmationStep = (props) => {
  const [state, setState] = React.useState();
  const inputSources = React.createRef([]);
  const theme = useTheme();
  console.log(props);

  const summarry = ['project: App', 'budget: 324', 'x: yzpdq'];

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      height: 400,
    }}
    >

      <List>
        {summarry.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      <ReactConfetti
        colors={[
          '#f44336',
          '#e91e63',
          '#9c27b0',
          '#673ab7',
          '#3f51b5',
          '#2196f3',
          '#03a9f4',
          '#00bcd4',
          '#009688',
          '#4caf50',
          '#8bc34a',
        ]}
        friction={0.5}
        numberOfPieces={200}
        recycle={false}
        recyclePiece={(piece, key) => {
          piece.key = key;
          piece.setAttribute('style', `
                        left: ${Math.random() * 100}%;
                    animation: confetti-animation ${Math.random() * 5 + 5}s linear infinite;
                    `);
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};
const steps = [
  {
    title: 'Project Details',
    StepComponent: DetailStep,
    label: 'Project Details',
    description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
  },
  {
    title: 'Planning & Budget',
    StepComponent: PlanningStep,
    label: 'Planning & Budget',
    description:
          'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    title: 'Confirmation',
    StepComponent: ConfirmationStep,
    label: 'Confirmation',
    description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
  },
];
const sections = [
  // ========================================================================== //
  //     Website
  {
    headline: 'Website',
    title: 'Website',
    key: 'Website',
    steps,
  },
  // ========================================================================== //
  //     Design
  {
    headline: 'Design',
    title: 'Design',
    key: 'Design',
    steps,
  },
  // ========================================================================== //
  //   VR
  {
    headline: 'VR',
    title: 'VR',
    key: 'VR',
    steps,
  },
  // ========================================================================== //
  //   AR
  {
    headline: 'AR',
    title: 'AR',
    key: 'AR',
    steps,
  },
  // ========================================================================== //
  //   3D
  {
    headline: '3D',
    title: '3D',
    key: '3D',
    steps,
  },
  // ========================================================================== //
  //   Branding
  {
    headline: 'Branding',
    title: 'Branding',
    key: 'Branding',
    steps,
  },
  // ========================================================================== //
  //   Other
  {
    headline: 'Other',
    title: 'Other',
    key: 'Other',
    steps,
  },
];

// ========================================================================== //
// Routlette
// ========================================================================== //
export const MainSelections = () => (
  <ThreeDCarousel
      // carousel dimensions
    carouselHeight={300}
    cardWidth={200}
    gutter={4}
      // top section
    title="Sections"
    key="Sections-carousel"
    carouselData={sections} // needs, title, image, alt, description, icon, cta, category
    SelectionComponent={SectionHeader}
    subSelectionData={steps}

    HasContent={ProjectStepper}
  />
);

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

import doItAll from '../../static/assets/portfolio/doitall.png';

import { ServicesSelection } from './portfolio-page/services';
import { useStore } from '../store/store';
import { sendBookingForm } from './util/apis';
import { useFormStore } from './util/customHooks';

export default ({ i, title = 'Start a project', setSelected = () => {} }) => {
  const handleError = () => {};
  const theme = useTheme();
  const inputSources = React.createRef([]);

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

export const ProjectStepper = ({ contentData: { headline, title, key }, setCurrent, current }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [finished, setFinished] = React.useState(false);
  const [service, setService] = useFormStore('bookingForm', 'service', key);
  const useStepComponent = React.useCallback(({ StepComponent }) => <StepComponent finished={finished} />, [activeStep]);
  const bookingForm = useStore((state) => state.bookingForm);
  React.useEffect(() => setService(key), [key]);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
      const {
        name,
        email,
        message,
        phone,
        subService,
        // project details
        referencePhotos,
        projectRequirements,
        budgetRange,
        dueDate,
        projectSuccessHow,
        // confirmation
        summary,
      } = bookingForm;
      sendBookingForm({
        recipient: bookingForm.email,
        message: {
          service,
          name,
          email,
          message,
          phone,
          subService,
          // project details
          referencePhotos,
          projectRequirements,
          budgetRange,
          dueDate,
          projectSuccessHow,
          // confirmation
          summary,
        },
      });
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

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

  const handleReset = () => { setActiveStep(0); };

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
            <Step key={step + index + Math.random()} {...stepProps}>
              <StepLabel {...labelProps}>{`${headline} ${step.label}`}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* step form */}
      {useStepComponent(steps[activeStep], key)}

      {/* stepper controls */}
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mb: 1 }}>
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

export const DetailStep = React.memo((props) => {
  const [state, setState] = React.useState();
  const inputSources = React.createRef([]);
  const theme = useTheme();
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
          formName="bookingForm"
          fieldName="name"

          label="name"
          helperText="your full name"
          size="normal"
        />
        <FancyTextField
          formName="bookingForm"
          fieldName="phone"

          label="phone"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FancyTextField
          formName="bookingForm"
          fieldName="email"

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
          formName="bookingForm"
          fieldName="subService"

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
          formName="bookingForm"
          fieldName="message"

          maxRows={11}
          fullHeight
          label="message"
          message="Tell me about yourself, and how I can help"
          defaultValue="Write me a message, tell me about what your project is, or just say hi!"
        />
      </Box>
    </Box>
  );
});

export const PlanningStep = (props) => {
  const [input, setInput] = React.useState([]);
  const inputSources = React.useRef([]);
  const theme = useTheme();

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
          formName="bookingForm"
          fieldName="projectRequirements"

          ref={(ref) => inputSources.push(ref)}
          maxRows={11}
          fullHeight
          label="Project Requirements"
          defaultValue={`I need this ${props.title || 'app'} project do the following.. `}
        />
        <PickDate
        //   ref={(ref) => inputSources.current.push(ref)}
          label="When is this project due?"
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
          formName="bookingForm"
          fieldName="budgetRange"

          ref={(ref) => inputSources.current.push(ref)}
          label="Budget Range?"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FileUploadButton
          formName="bookingForm"
          fieldName="referencePhotos"

          ref={(ref) => inputSources.current.push(ref)}
          label="Upload reference photos"
          icon={{ start: true, type: 'item' }}
          style={{ marginBottom: 30 }}
        />
        <FancyTextField
          formName="bookingForm"
          fieldName="projectSuccessHow"

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
export const ConfirmationStep = (finished = false) => {
  // get bookingForm data from store
  const bookingFormSummary = useStore((state) => state.bookingForm);

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      height: 400,
    }}
    >
      {finished && (
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
        friction={0.75}
        gravity={1}

        height={400}
        numberOfPieces={200}
        // recycle={false}
        recyclePiece={(piece, key) => {
          piece.key = key;
          piece.setAttribute('style', `left: ${Math.random() * 100}%;animation: confetti-animation ${Math.random() * 5 + 5}s linear infinite;`);
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 400,
        }}
      />
      )}

      {/* summarry */}
      <Box sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        flexWrap: 'wrap',
        p: 4,
        textAlign: 'left',
        borderRadius: (theme) => theme.custom.borders.brandBorderRadius,
        m: 1,
        border: (theme) => theme.custom.borders.brandBorder,
        background: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.text.secondary,
      }}
      >

        {Object.keys(bookingFormSummary).map((name, index) => {
          if (name === 'methods') return;
          { /* if (name === 'referencePhotos') { name = name.map((file) => file.name); }
          if (typeof name === 'null' || typeof name === 'undefined') return; */ }
          const value = bookingFormSummary[name];
          return (
            <Box sx={{
              display: 'inline-block',
              borderBottom: (theme) => theme.custom.borders.brandBorder,
            }}
            >
              <b>
                {`${name.toUpperCase()}: `}
              </b>
              {value}
            </Box>
          );
        })}
      </Box>

      {/* graphic */}
      <Box sx={{
        height: 100, width: '100%',
      }}
      />
      <img
        src={doItAll}
        alt=""
        style={{
          height: '100%', objectFit: 'cover', width: '100%', position: 'relative',
        }}
      />
    </Box>
  );
};
const steps = [
  {
    title: 'Project Details',
    key: 'projectDetails',
    StepComponent: DetailStep,
    label: 'Project Details',
    description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
  },
  {
    title: 'Planning & Budget',
    key: 'planningBudget',
    StepComponent: PlanningStep,
    label: 'Planning & Budget',
    description:
          'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    title: 'Confirmation',
    key: 'confirmation',
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
  },
  // ========================================================================== //
  //     Design
  {
    headline: 'Design',
    title: 'Design',
    key: 'Design',
  },
  // ========================================================================== //
  //   VR
  {
    headline: 'VR',
    title: 'VR',
    key: 'VR',
  },
  // ========================================================================== //
  //   AR
  {
    headline: 'AR',
    title: 'AR',
    key: 'AR',
  },
  // ========================================================================== //
  //   3D
  {
    headline: '3D',
    title: '3D',
    key: '3D',
  },
  // ========================================================================== //
  //   Branding
  {
    headline: 'Branding',
    title: 'Branding',
    key: 'Branding',
  },
  // ========================================================================== //
  //   Other
  {
    headline: 'Other',
    title: 'Other',
    key: 'Other',
  },
];

// ========================================================================== //
// Routlette
// ========================================================================== //
export const MainSelections = () => (
  <ThreeDCarousel
      // carousel dimensions
    carouselHeight={300}
    cardWidth={400}
    gutter={50}

      // top section
    title="Sections"
    key="Sections-carousel"
    carouselData={sections} // needs, title, image, alt, description, icon, cta, category
    SelectionComponent={ServicesSelection}
    subSelectionData={steps}
    HasContent={ProjectStepper}
  />
);

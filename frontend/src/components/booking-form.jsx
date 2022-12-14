/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
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

import headlineImage from '../../static/assets/portfolio/designs.png';
import ThreeDCarousel from './custom/threeDCarousel';
import doItAll from '../../static/assets/portfolio/doitall.png';

// sections
import { Selection } from './custom/carousel/selection';
import { useStore } from '../store/store';
import { sendBookingForm } from './util/apis';
import { useFormStore } from './util/customHooks';

const steps = [
  {
    title: 'Project Details',
    key: 'projectDetails',
    // StepComponent: DetailStep,
    label: 'Project Details',
    description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
  },
  {
    title: 'Planning & Budget',
    key: 'planningBudget',
    // StepComponent: PlanningStep,
    label: 'Planning & Budget',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    title: 'Confirmation',
    key: 'confirmation',
    // StepComponent: ConfirmationStep,
    label: 'Confirmation',
    description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
  },
];
const sections = [
  {
    headline: 'Website',
    title: 'Website',
    key: 'Website',
  },
  {
    headline: 'Design',
    title: 'Design',
    key: 'Design',
  },
  {
    headline: 'VR',
    title: 'VR',
    key: 'VR',
  },
  {
    headline: 'AR',
    title: 'AR',
    key: 'AR',
  },
  {
    headline: '3D',
    title: '3D',
    key: '3D',
  },
  {
    headline: 'Branding',
    title: 'Branding',
    key: 'Branding',
  },
  {
    headline: 'Other',
    title: 'Other',
    key: 'Other',
  },
];

export default function ({ i, title = 'Start a project', setSelected = () => { } }) {
  const handleError = () => { };
  const theme = useTheme();
  const inputSources = React.createRef([]);

  return (
    <Grid
      container
      className="items-stretch flex justify-start w-full pb-4 h-[1000px]"
      sx={{
        color: (theme) => theme.palette.text.primary,
        border: (theme) => theme.custom.borders.brandBorder,
      }}
    >
      <Box
        className="p-4 h-28 relative w-full"
        sx={{
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
}

/**
 * The ProjectStepper function renders a Stepper component that allows users to
 * navigate through the steps of a project. It also provides controls for
 * navigating between each step and submitting the form at any given step.
 *
 * @param {contentData:{headline Set the title of the stepper
 * @param title Set the title of the page
 * @param key} Identify the component in the stepper
 * @param setCurrent Set the current step in the stepper
 * @param current} Determine which step is currently active
 *
 * @return A stepper component that contains the steps and controls for each step
 *
* */
export function ProjectStepper({ contentData: { headline, title, key }, setCurrent, current }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [finished, setFinished] = React.useState(false);
  const [service, setService] = useFormStore('bookingForm', 'service', key);
  const useStepComponent = React.useCallback(({ StepComponent }) => StepComponent && <StepComponent finished={finished} /> || <div />, [activeStep]);
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
      console.log(bookingForm);

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

  // You probably want to guard against something like this,
  // it should never occur unless someone's actively trying to break something.
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
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
          <Typography className="mb-1">
            All steps completed - you&apos;re finished
          </Typography>
          <div className="flex flex-row pt-2">
            <div className="flex-auto" />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </>
      ) : (
        <>
          <Typography className="mb-1">
            Step
            {activeStep + 1}
          </Typography>
          <div className="flex flex-row pt-2">
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
            <div className="flex-auto" />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <RegularButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </RegularButton>
          </div>
        </>
      )}
    </Box>
  );
}

export const DetailStep = React.memo((props) => {
  const [state, setState] = React.useState();
  const inputSources = React.createRef([]);
  const theme = useTheme();
  return (
    <div className="w-full flex flex-row relative h-96">
      <div className="w-1/2 h-full flex justify-between flex-nowrap flex-col p-4">
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
      </div>
      <div className="p-4 flex justify-between flex-nowrap w-1/2 h-full flex-col">
        <FancyTextField
          formName="bookingForm"
          fieldName="message"
          maxRows={11}
          fullHeight
          label="message"
          message="Tell me about yourself, and how I can help"
          defaultValue="Write me a message, tell me about what your project is, or just say hi!"
        />
      </div>
    </div>
  );
});

/**
 * The PlanningStep function is a React component that renders the planning step
 * of the booking form. It contains two input fields, one for project requirements and
 * another for budget range. The function also has a reference to an instance of FancyTextField, which is used to render the text field in this step.

 *
 * @param props Pass in the title of the project
 *
 * @return A set of input fields that are used to collect information about the project
 *
 */
export function PlanningStep(props) {
  const [input, setInput] = React.useState([]);
  const inputSources = React.useRef([]);
  const { title } = props;
  const theme = useTheme();

  return (
    <div className="w-full flex flex-row relative h-96">
      <div className="w-1/2 h-full flex justify-between flex-nowrap flex-col p-4">
        <FancyTextField
          formName="bookingForm"
          fieldName="projectRequirements"
          ref={(ref) => inputSources.push(ref)}
          maxRows={11}
          fullHeight
          label="Project Requirements"
          defaultValue={`I need this ${title || 'app'} project do the following.. `}
        />
        <PickDate
          //   ref={(ref) => inputSources.current.push(ref)}
          label="When is this project due?"
        />
      </div>
      <div className="p-4 flex justify-between flex-col flex-nowrap h-full w-1/2">
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
          defaultValue={`I need this ${title || 'app'} project do the following.. `}
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
      </div>
    </div>
  );
}

/**
 * The ConfirmationStep function renders a confirmation step for the booking form.
 *
 *
 * @param finished=false Show the confirmationstep only once
 *
 * @return A box with a summary of the booking data and an image
 *
 */
export function ConfirmationStep(finished = false) {
  // get bookingForm data from store
  const bookingFormSummary = useStore((state) => state.bookingForm);

  return (
    <div className="w-full flex flex-col relative h-96">
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
          className="absolute top-0 left-0 w-full h-96"
        />
      )}

      {/* summarry */}
      <Box
        className="h-full w-full flex justify-evenly flex-col flex-wrap p-4 m-1 text-left"
        sx={{
          borderRadius: (theme) => theme.custom.borders.brandBorderRadius,
          border: (theme) => theme.custom.borders.brandBorder,
          background: (theme) => theme.palette.text.primary,
          color: (theme) => theme.palette.text.secondary,
        }}
      >

        {Object.keys(bookingFormSummary).map((name, index) => {
          if (name === 'methods') return;
          const value = bookingFormSummary[name];
          return (
            <Box
              className="inline-block"
              sx={{
                borderBottom: (theme) => theme.custom.borders.brandBorder,
              }}
            >
              <b>{`${name.toUpperCase()}: `}</b>
              {String(value)}
            </Box>
          );
        })}
      </Box>

      {/* graphic */}
      <div className="h-28 w-full" />
      <img
        src={doItAll}
        alt=""
        className="h-full object-cover w-full relative"
      />
    </div>
  );
}

/**
 * The MainSelections function renders a carousel of 3D cards with the following
 * properties:
 * - carouselHeight: The height of the entire carousel. This is used to set the
 *   height of each card in pixels. (defaults to 300)
 * - cardWidth: The width of each individual card in pixels. (defaults to 400)
 *
 * @return A carousel that has a number of cards
 *
 */
export function MainSelections() {
  const x = 0;
  return (
    <ThreeDCarousel
      // carousel dimensions
      carouselHeight={300}
      cardWidth={400}
      gutter={50}
      // top section
      title="Sections"
      key="Sections-carousel"
      carouselData={sections} // needs, title, image, alt, description, icon, cta, category
      SelectionComponent={Selection}
      subSelectionData={steps}
      HasContent={ProjectStepper}
    />
  );
}

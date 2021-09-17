/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import ReCAPTCHA from 'react-google-recaptcha';
// ========================================================================== //
// imports
// ========================================================================== //
import React, {
  useEffect, useCallback, useImperativeHandle,
} from 'react';

import * as yup from 'yup';

// styles / animation
import {
  Icon,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Box,
  Tab,
  InputAdornment,
  CircularProgress,
  Fab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/extensions
import Confetti from 'react-confetti';

// custom inputs
import { geolocated } from 'react-geolocated';
import axios from 'axios';
import { Alert, Modal } from 'react-bootstrap';
import { CheckCircleOutline } from '@material-ui/icons';
import { useAsync, useToggle } from './utils/customHooks';
import { sendSms, getLocationByLatyLng, postToSpreadsheeets } from './utils/apis';
// import { google } from 'googleapis';
import { GoldButton, RegularButton } from './customButton';
import {
  CalenderInput,
  DropDownButton,
  SliderInput,
  TextInput,
} from './customInputs';
import { Gridify } from './customCards';

// ========================================================================== //
// component styles
// ========================================================================== //
const useStyles = makeStyles((theme) => {
  const common = {
    borderRadius: theme.shape.brandBorderRadius,
    padding: theme.spacing(3),
    border: theme.shape.brandBorderSecondary,
  };

  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    typography: {
      marginTop: theme.spacing(3),
      zIndex: 1,
      position: 'relative',
    },
    '& * > h4': {
      fontWeight: 700,
    },
    invoice: {
      color: theme.palette.text.primary,
      '& > div': {
        ...common,
      },
    },
    invoiceCard: {
      // background: theme.palette.background.primary,
      background: 'white',
      ...common,
      color: 'white',
    },
    card: {
      background: theme.palette.background.secondary,
      ...common,
      color: 'white',
    },
    bookingCard: {
      background: theme.palette.background.secondary,
      ...common,
      padding: theme.spacing(4),
    },
    quoteCalculatorSection: {
      margin: theme.spacing(6),

      border: theme.shape.brandBorderSecondary,
      background: theme.palette.background.secondary,
      color: 'white',
      borderRadius: theme.shape.brandBorderRadius3,
      padding: theme.spacing(6),
      boxShadow: theme.shadows.brandBig,

      transition: theme.transitions.create(
        ['color', 'box-shadow', 'background', 'margin', 'border'],
        { duration: '0.3s', easing: 'ease-in-out' },
      ),

      // responsivity
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
      // overrides
      '& .MuiGrid-item': {
        margin: '0px',
      },
    },

    // POPUP
    popup: {
      ...common,
      margin: theme.spacing(3),
    },

    // TAB PANEL
    tabPanel: {
      flexGrow: 1,
      width: '100%',
      background: 'white',
      color: theme.palette.text.primary,
      borderRadius: theme.shape.brandBorderRadius,
      boxShadow: theme.shadows.brandInset,
    },
    tabCategories: {
      ...common,
      marginTop: theme.spacing(0),
      flexGrow: 1,
      // marginLeft: -(theme.spacing(3) / 2.5),
      boxShadow: theme.shadows.filterShadow,
      width: '102%',
      marginLeft: '-1%',
      background: 'white',
      color: theme.palette.text.primary,
      '& .MuiTabScrollButton-root': {
        '&::before': {
          content: '',
          display: 'block',
          width: '200%',
          height: '200%',
          position: 'absolute',
          background: theme.palette.background.button,
        },
        ...common,
        width: 50,
        background: theme.palette.background.button,
        border: theme.shape.brandBorderSecondary,
        // boxShadow:
        //   '0px 0px 0px 7px rgb(221 238 209), 0px 0px 20px 10px rgb(132 151 48)', // arrow button
        // '&:hover': {
        //   boxShadow: '0px 0px 0px transparent',
        // },

      },
    },
    categoryTab: {
      ...common,
      boxShadow: theme.shadows.brand,
      color: theme.palette.text.primary,
      padding: theme.spacing(1),
      margin: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formInput: {
      ...common,
      padding: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
  };
});

// ========================================================================== //
// calculator state and preset values for calculation
// ========================================================================== //

// charecterized service information
const categories = [
  {
    name: 'Landscaping',
    icon: 'eco',
    services: ['mulching', 'astroTurf', 'groundLeveling'],
    baseRate: 150,
    serviceRateMultipliers: {
      mulching: 100,
      astroTurf: 90,
      groundLeveling: 75,
    },
  },
  {
    name: 'Design',
    icon: 'account_balance',
    services: [
      'concreting', // rebar reinforcement is a part of concreting
      'waterFeatures',
      'drainageSystems',
      'meshReinforcement',
      'woodRetainingWall',
    ],
    baseRate: 500,
    serviceRateMultipliers: {
      concreting: 100,
      waterFeatures: 400,
      drainageSystems: 100,
      woodRetainingWall: 200,
    },
  },
  {
    name: 'maintenence',
    icon: 'emoji_nature',
    services: [
      'deVining',
      'planting',
      'pruning',
      'watering',
      'fertilizing',
      'weeding',
    ],
    baseRate: 200,
    serviceRateMultipliers: {
      deVining: 50,
      planting: 50,
      pruning: 50,
      watering: 25,
      fertilizing: 25,
      weeding: 50,
    },
  },
  {
    name: 'Hedging',
    icon: 'view_agenda',
    services: ['planting', 'trimming'],
    baseRate: 150,
    serviceRateMultipliers: { planting: 30, trimming: 20 },
  },
  {
    name: 'Mowing',
    icon: 'power_input',
    services: ['mowing'],
    baseRate: 100,
    serviceRateMultipliers: { mowing: 4 },
  },
  {
    name: 'Trees',
    icon: 'nature',
    services: ['trees'],
    baseRate: 300,
    serviceRateMultipliers: { trimming: 200, cutting: 500, stumpRemoval: 250 },
    // tweak to change the slider
  },
];
// ajgardencare stats
const ajGardenCareStats = {
  location: {
    // dickson canberra ACT is the reference for now
    latitude: -35.2521,
    longitude: 149.14294,
  },
  // phone: '0435934531',
  phone: '0475565709',
  email: 'team@ajgardencare.com.au',
  website: '',
  facebook: 'https://www.facebook.com/AJs-Garden-Care-126655734180898/',
  instagram: '',
  twitter: '',
};

// inputs
const quoteCalculatorData = {
  treeWidth: 0,
  treeHeight: 0,
  meters: 0,
  selectedCategory: 0,
  selectedSubCategory: 0, // get category, then the subcategory from the services array (this can reference itself as a service)
  discount: 0,
};
// user data
const bookingData = {
  name: 0,
  phone: 0,
  email: 0,
  location: { latitude: 0, longitude: 0 },
  address: 0, // derived from location with apis
  availibility: 0,
  city: 0,
  state: 0,
  zip: 0,
  country: 0,
  // get the current time
  notes: 0,
};

// invoice, this state is set in calculateQuote method
const invoiceData = {
  totalCost: 0,
  discount: 0,
  availibility: 0,
  location: 0,
  selectedCategory: 0,
  serviceRate: 0,
  areaOfWork: 0,
  travelCost: 0,
};

const timeStamp = () => {
  // Create a date object with the current time
  const now = new Date();

  // Create an array with the current month, day and time
  const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

  // Create an array with the current hour, minute and second
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // Determine AM or PM suffix based on the hour
  const suffix = (time[0] < 12) ? 'AM' : 'PM';

  // Convert hour from military time
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = `0${time[i]}`;
    }
  }

  // Return the formatted string
  return `${date.join('/')} ${time.join(':')} ${suffix}`;
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// ========================================================================== //
// quote calculator component
// ========================================================================== //
export const QuoteCalculator = React.forwardRef(({
  data, context, headerGraphic, headline, headlineDescription, presetCategory,
}, ref/** ref must be in second argument, its NOT in props */) => {
  const [invoiceState, changeInvoiceState] = React.useState([0]);

  // ========================================================================== //
  //   Toggled state
  // ========================================================================== //
  const [quoteFinished, toggleQuoteFinished] = useToggle();
  const [popup, togglePopup] = useToggle();
  const [recaptchaComplete, toggleRecaptchaComplete] = useToggle();

  // ========================================================================== //
  //   Quote state
  // ========================================================================== //
  const [quoteCalculatorState, changeQuoteCalculatorState] = React.useState(quoteCalculatorData);
  const [bookingState, setBookingState] = React.useState(bookingData);

  // ========================================================================== //
  //   booking submission
  // ========================================================================== //
  const submitBooking = React.useCallback(async () => {
    const {
      meters, totalCost, selectedCategory, travelCost, discount, selectedSubCategory,
    } = quoteCalculatorState;
    const {
      name, phone, address, zip, state, email, availibility, city,
    } = bookingState;

    console.log({
      message: `
    -------------------------
    ${name} has booked a ${capitalizeFirstLetter(categories[selectedCategory].services[selectedSubCategory])} service for ${totalCost}.
    -------------------------
    working space is ${meters} metres squared.
    -------------------------
    at location: ${address}, zip: ${zip}, state: ${state}
    -------------------------
    they can be contacted via
    name: ${name}
    phone: ${phone}
    email: ${email}
    -------------------------
    availible on: ${availibility}
    -------------------------
    timestamp: ${timeStamp()}
    `,
      recipient: /* ajGardenCareStats.phone */'61475565709',
    });
    const req = sendSms({
      message: `
      -------------------------
      ${name} has booked a ${capitalizeFirstLetter(categories[selectedCategory].services[selectedSubCategory])} service for ${totalCost}.
      -------------------------
      working space is ${meters} metres squared.
      -------------------------
      at location: ${address}, zip: ${zip}, state: ${state}
      -------------------------
      they can be contacted via
      name: ${name}
      phone: ${phone}
      email: ${email}
      -------------------------
      availible on: ${availibility}
      -------------------------
      timestamp: ${timeStamp()}
      `,
      recipient: /* ajGardenCareStats.phone */'61475565709',
    }).then((_) => sendSms({
      message: `
        -------------------------
        Hello ${name}! youve been quoted a ${capitalizeFirstLetter(categories[selectedCategory].services[selectedSubCategory])} service for ${totalCost}.
        -------------------------
        See more from us at our facebook!
        ${ajGardenCareStats.facebook}
        -------------------------
        Contact us at any time via
        phone: ${ajGardenCareStats.phone}
        email: ${ajGardenCareStats.email}
        -------------------------
        We will get back to you as soon as possible. :)
        -------------------------
        `,
      recipient: phone,
    }));

    // const req = axios.all([
    //   sendSms({
    //     message: `
    //     -------------------------
    //     ${name} has booked a ${capitalizeFirstLetter(categories[selectedCategory].services[selectedSubCategory])} service for ${totalCost}.
    //     -------------------------
    //     working space is ${meters} metres squared.
    //     -------------------------
    //     at location: ${address}, zip: ${zip}, state: ${state}
    //     -------------------------
    //     they can be contacted via
    //     name: ${name}
    //     phone: ${phone}
    //     email: ${email}
    //     -------------------------
    //     availible on: ${availibility}
    //     -------------------------
    //     timestamp: ${timeStamp()}
    //     `,
    //     recipient: /* ajGardenCareStats.phone */'61475565709',
    //   }, ajGardenCareStats.phone),
    //   sendSms({
    //     message: `
    //     -------------------------
    //     Hello ${name}! youve been quoted a ${capitalizeFirstLetter(categories[selectedCategory].services[selectedSubCategory])} service for ${totalCost}.
    //     -------------------------
    //     See more from us at our facebook!
    //     ${ajGardenCareStats.facebook}
    //     -------------------------
    //     Contact us at any time via
    //     phone: ${ajGardenCareStats.phone}
    //     email: ${ajGardenCareStats.email}
    //     -------------------------
    //     We will get back to you as soon as possible. :)
    //     -------------------------
    //     `,
    //     recipient: phone,
    //   }),
    // ]);
    // alert(req.then((d) => d));
    return req;
  }, [quoteCalculatorState, bookingState, invoiceState]);
  // ========================================================================== //
  //   api state
  // ========================================================================== //

  // eslint-disable-next-line no-use-before-define
  const {
    execute, status, value, error,
  } = useAsync(submitBooking);// pass internal function, call it from hook props
  // useEffect(() => {
  //   alert(JSON.stringify(value));
  // }, [value]);

  // ========================================================================== //
  //   Validators
  // ========================================================================== //

  const _quoteCalculatorState = yup.object({
    meters: yup.number().required('Please enter the working space'),
  });
  const _bookingState = yup.object({
    name: yup.string().required('Name is required'),
    // /^ (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    phone: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required('Phone is required'),
    email: yup.string().matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/).required('Email is required'),
    // address: yup.string().required('Address is required'),
    location: yup.object().required('Address is required'), // has latitude and logitude
    meters: yup.string().required('area of work is required'),
    service: yup.string().required('A service is required'),
  });

  // ========================================================================== //
  //   geolocation calculation
  // ========================================================================== //
  const deg2rad = (deg) => deg * (Math.PI / 180);
  // calculate the distance between two geolocation points (lattitude and longetude)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  // #region quote calculation
  const calculateTotalCost = (_qs, _bs) => {
    const currentQuote = _qs;
    const userData = _bs;

    // sub service names in service[] serviceRateMultipliers keyed by name in {}
    const subServiceIndex = currentQuote.selectedSubCategory;
    const serviceData = categories[currentQuote.selectedCategory];
    const subService = serviceData.services[subServiceIndex];
    const primaryService = serviceData.name;
    const { serviceRateMultipliers } = serviceData;

    // default distance to roughly 3/4 km's
    const latitude = userData.location?.latitude || ajGardenCareStats.location.latitude + 0.01;
    const longitude = userData.location?.longitude || ajGardenCareStats.location.longitude + 0.01;
    const truncateAmount = 2;

    const discounting = currentQuote.discount;
    const baseCost = serviceData.baseRate;
    const serviceRate = serviceRateMultipliers[subService];
    const meterRate = serviceRate > 0 ? serviceRate : 2;
    const gasRate = 1.75;// based on https://www.ato.gov.au/Business/Income-and-deductions-for-business/Deductions/Deductions-for-motor-vehicle-expenses/Cents-per-kilometre-method/
    // calculate the distance between two geolocation points (lattitude and longetude)
    const travelCost = Number(Math.round(calculateDistance(ajGardenCareStats.location.latitude, ajGardenCareStats.location.longitude, latitude, longitude) * gasRate)).toFixed(truncateAmount);
    // not all people will accurately measure the space, to simplify we just ask for a guestimation of either the width or height of the space, then multiply it by itself
    const categoryCostPerMeterSquared = Number((Math.round(currentQuote.meters /** * 2 */) * meterRate)).toFixed(truncateAmount);
    // alert((currentQuote.meters ** 2) * meterRate);
    // take everything and add it together
    // alert(Number(baseCost) + Number(categoryCostPerMeterSquared) + Number(travelCost));
    const totalCost = [Number(baseCost), Number(categoryCostPerMeterSquared), Number(travelCost)].reduce((pre, cur) => pre && pre + cur || cur);
    // const totalCost = Number(baseCost + categoryCostPerMeterSquared + travelCost).toFixed(truncateAmount);

    const newInvoice = {
      Name: userData.name,
      Availibility: userData.availibility,
      Location: userData.address,
      [`${capitalizeFirstLetter(primaryService)} base estimation`]: baseCost,
      [`${capitalizeFirstLetter(subService)} estimation`]: categoryCostPerMeterSquared,
      'Working space in metres': currentQuote.meters /** * 2 */,
      'Travel estimation': travelCost,
      Discount: discounting,
      'Total estimation': totalCost,
    };

    // only change the invoice state since the quote is only reactive to user input
    changeInvoiceState(newInvoice);
  };

  // re-calculate on state changes
  useEffect(() => (quoteCalculatorState && bookingState) && new Promise((resolve) => calculateTotalCost(quoteCalculatorState, bookingState)), [quoteCalculatorState, bookingState]);

  // ========================================================================== //
  //   quote calculation methods
  // ========================================================================== //

  // ========================================================================== //
  //   quote input handlers
  // ========================================================================== //

  const calculateInputs = (newInput) => {
    changeQuoteCalculatorState((prevState) => ({
      ...prevState,
      ...newInput,
    }));
  };

  const calculateUserInputs = (newInput) => {
    setBookingState((prevState) => ({
      ...prevState,
      ...newInput,
    }));
  };

  const centimetersToMilimetres = useCallback((cm) => cm * 0.01, []);
  const centimetersToMeters = useCallback((cm) => cm * 0.01, []);
  const milimeterToCentimetres = useCallback((milimeter) => milimeter * 0.1, []);
  // #endregion tree cost calculations from user input

  // ========================================================================== //
  //   Static methods
  // ========================================================================== //

  // staticly defined, preset a service in categories
  useImperativeHandle(ref,
    // forwarded method in an object to be used as a ref with methods
    () => ({
      // callback method extended from this component so its accessible to parent, from the forwarded ref
      presetService(category) {
        calculateInputs({ selectedCategory: category });
      },
    }));

  // const submitBooking = async () => {
  //   // invoice state is only used for display purposes, actual quote data is modified on the spot
  //   // await postToSpreadsheeets({
  //   //   values: [
  //   //     /* col Name */ [name],
  //   //     /* col Category */ [selectedCategory],
  //   //     /* col Cost */ [totalCost],
  //   //     /* col working space */ [meters],
  //   //     /* col phone */ [phone],
  //   //     /* col email */ [email],
  //   //     /* col availibility */ [availibility],
  //   //     /* col address */ [address],
  //   //     /* col zip */ [zip],
  //   //     /* col state */ [state],
  //   //     /* col city */ [city],
  //   //     /* col travel cost */ [travelCost],
  //   //     /* col discounting */ [discount],
  //   //     /* col timestamp */ [timeStamp()],
  //   //     /* col client coords v dickson */ [`client: ${bookingData.coords} ajgardencare: ${ajGardenCareStats.location}`],
  //   //   ],
  //   // }).then((res) => {
  //   //   console.log(res);
  //   // }).catch((err) => console.log(err));

  //   // // send sms to ajgardencare
  //   // _sendSmsAJ();

  //   // // send sms to booker
  //   // _sendSmsClient();
  // };

  const checkBookingState = React.useCallback((jsx = {}) => Object.keys(invoiceState).map((key) => invoiceState[key] > 0), [invoiceState]);
  const checkRecaptcha = (value) => {
    // console.log(recaptchaRef.current.getValue());
    if (String(value)) toggleRecaptchaComplete();// value is success token
  };

  // ========================================================================== //
  //   Recaptcha https://www.npmjs.com/package/react-google-recaptcha
  // https://developers.google.com/recaptcha/intro?authuser=2
  // https://www.google.com/recaptcha/admin/site/477054732/setup
  // ========================================================================== //

  // ========================================================================== //
  //   invoice
  // ========================================================================== //
  const classes = useStyles();
  // state is tied to quoteCalculatorState, therefore no need to turn into react state as it is already reactive
  const showInvoice = React.useCallback(
    // prettier-ignore
    () => (
      // if invoiceState has all 0 then dont continue
      <Grid container spacing={1} style={{ zIndex: 1 }} className={`${classes.invoiceCard} position-relative text-center mx-auto w-100 p-4 mb-6 justify-content-evenly`}>
        {Object.keys(invoiceState).map((key) => invoiceState[key] > 0
          && (
            <Grid container item xs={12} spacing={2} key={invoiceState[key]}>
              <Grid item xs={8} key={`${invoiceState}-container`}>
                {/* <Icon color="primary">{inv}</Icon> */}
                <Typography align="left" variant="h4" key={`${invoiceState}-title`} className={`${classes.invoice}w-100`}>{key}</Typography>
              </Grid>
              <Grid item xs={4} key={`${invoiceState[key]}-container`}>
                <Typography align="left" variant="body1" className={`${classes.invoice}w-100`} key={`${invoiceState[key]}-value`}>{invoiceState[key]}</Typography>
              </Grid>
            </Grid>
          ))}
      </Grid>
    ),
    [bookingState, quoteCalculatorState, invoiceState],
  );

  const categoryUpdate = React.useCallback(() => (
    <Categories
      categories={categories}
      bookingState={bookingState}
      calculateInputs={calculateInputs}
      calculateUserInputs={calculateUserInputs}
      presetService={ref?.current?.presetService}
      quoteState={quoteCalculatorState}
    />
  ), [bookingState, quoteCalculatorState]);
  // #endregion quoteCalculation

  // ========================================================================== //
  //     booking status
  // ========================================================================== //\
  const checkSmsStatus = React.useCallback(() => (status === 'success' ? 1 : status === 'pending' ? 2 : 0), [status]);

  const bookingStatus = () => {
    const handleClose = React.useCallback(() => checkSmsStatus() && toggleQuoteFinished() || togglePopup(), [popup]);
    return (
      <Modal show={popup} open={popup} onClose={() => handleClose()} onHide={() => handleClose()}>
        <div className={classes.popup}>
          <Grid container>

            {showInvoice()}
            <Grid item style={{ marginTop: 25 }}>
              {(checkSmsStatus() === 2) && (
                <CircularProgress color="primary" thickness={2} />
              ) || (checkSmsStatus() === 1) && (
                <Fab
                  aria-label="save"
                  color="secondary"
                >
                  <CheckCircleOutline />
                </Fab>
              ) || (recaptchaComplete) && (
              <GoldButton onClick={() => execute()}>
                Submit Booking
              </GoldButton>
              ) || (
              <ReCAPTCHA
                // size="invisible"
                type="v3"
                sitekey={process.env.RECAPTCHAKEY}
                onChange={checkRecaptcha}
              />
              )}
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  };

  const finishedDisplay = React.useCallback(() => (
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <>
      <Confetti
      // width={width}
      // height={height}
      // wind={}
        numberOfPieces={100}
        gravity={0.25}
      />
      <Typography color="primary" align="center" variant="body1" gutterBottom style={{ fontWeight: 'bolder' }} className={classes.typography}>
        We have received your request, we will get back to you soon
      </Typography>
    </>
  ), [quoteFinished]);
  // ========================================================================== //
  // quote estimator jsx
  // ========================================================================== //
  return (
    <section id="#getaquote" className={classes.quoteCalculatorSection}>
      {/* prettier-ignore */}
      <Typography color="primary" align="center" variant="h1" gutterBottom style={{ fontWeight: 'bolder' }} className={classes.typography}>
        QUOTE ESTIMATOR
      </Typography>
      {checkSmsStatus() === 1 && finishedDisplay()
        || (
        <>
          {bookingStatus()}
          <Grid container alignContent="flex-start">
            {categoryUpdate()}
            <Grid container spacing={6} justifyContent="flex-start" style={{ marginTop: 12, marginBottom: 12 }}>
              {checkBookingState() && (
              <Grid item xs={12} md={6}>
                {showInvoice()}
              </Grid>
              )}
              <Grid item xs={12} md={6}>
                <GoldButton onClick={(e) => { togglePopup(); }}>
                  Overview Booking
                </GoldButton>
              </Grid>
            </Grid>

          </Grid>
        </>
        )}
    </section>
  );
});

// ========================================================================== //
// forms
// ========================================================================== //
export const Forms = ({
  category, quoteState, calculateInputs, calculateUserInputs, coords, geolocationSelfRef,
}) => {
  const classes = useStyles();
  const [formInput, setFormInput] = React.useState({
  });
  const [locationState, setLocationState] = React.useState(null);
  // useEffect(() => {
  //   if (coords) {
  // setLocationState(getLocationByLatyLng({ lat: coords.latitude, lng: coords.longitude }));
  // calculateUserInputs({ location: locationState, coords });
  //   }
  // }, [coords]);

  const [currentCategory, setCurrentCategory] = React.useState(0);
  const breakPointSizes = {
    xs: 12,
    md: 6,
    lg: 6,
    xl: 6,
  };

  // re-render on prop changes
  useEffect(() => {
    setCurrentCategory(category);
  }, [currentCategory, formInput]);

  // update location on user consent
  useEffect(() => calculateUserInputs({ location: coords }), [coords, quoteState]);

  return (
    <>
      {/*
        // ========================================================================== //
        //       service form
        // ========================================================================== //
       */}
      <Typography
        variant="h3"
        align="left"
        color="secondary"
        className={classes.typography}
      >
        {category.name}
      </Typography>
      <Grid container alignItems="center" justifyContent="flex-start" spacing={3} className={classes.formInput}>
        <Gridify
          breakpointSizes={breakPointSizes}
        >
          {category.services.length > 0 && (
            // eslint-disable-next-line eqeqeq
            <DropDownButton
              options={category.services}
              onChange={({ target: { value } }) => calculateInputs({
                // filter till we find our result, then get the index value of the location of the resultant index value
                selectedSubCategory:
                  (() => {
                    const res = category.services.indexOf(value);
                    return res > -1 && res || 0;
                  })(),
              })}
            >
              Service

            </DropDownButton>
          )}
          {/* {categoryControl?.slider && ()} */}
          <SliderInput label="how large is the area being worked on? (In meters)" defaultValue={2} value={2} step={1.25} max={20} valueLabelDisplay="on" onChange={(value) => calculateInputs({ meters: value })} />

        </Gridify>
      </Grid>

      {/*
        // ========================================================================== //
        //       user form
        // ========================================================================== //
       */}
      <Typography
        variant="h3"
        align="left"
        color="secondary"
        className={classes.typography}
      >
        Your details
      </Typography>
      <Grid container alignItems="center" justifyContent="flex-start" spacing={3} className={classes.formInput}>
        <Gridify
          breakpointSizes={breakPointSizes}
        >

          <TextInput
            InputProps={{ startAdornmant: <InputAdornment position="start" /> }}
            error={false}
            label="name"
            defaultValue="name"
            variant="outlined"
            id="clientName"
            onChange={({ target: { value } }) => calculateUserInputs({ name: value })}
            type={quoteState?.showHidden ? 'text' : 'password'}
            autosize
          >
            Name
          </TextInput>

          <TextInput
            InputProps={{ startAdornmant: <InputAdornment position="start" /> }}
            error={false}
            label="email"
            defaultValue="email"
            variant="outlined"
            id="email"
            onChange={({ target: { value } }) => calculateUserInputs({ email: value })}
            type={quoteState?.showHidden ? 'text' : 'password'}
            autosize
          >
            Email
          </TextInput>

          <TextInput
            InputProps={{ startAdornmant: <InputAdornment position="start" /> }}
            error={false}
            label="phone"
            defaultValue="phone"
            variant="outlined"
            id="phone"
            onChange={({ target: { value } }) => calculateUserInputs({ phone: value })}
            type={quoteState?.showHidden ? 'text' : 'password'}
            autosize
          >
            Phone
          </TextInput>

          <TextInput
            InputProps={{ startAdornmant: <InputAdornment position="start" /> }}
            error={false}
            label="comments"
            defaultValue="comments"
            variant="outlined"
            id="comments"
            onChange={({ target: { value } }) => calculateUserInputs({ comments: value })}
            type={quoteState?.showHidden ? 'text' : 'password'}
            autosize
          >
            Comments
          </TextInput>

          <CalenderInput
            onChange={(date) => calculateUserInputs({ date, availibility: date })}
          />

        </Gridify>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextInput
              InputProps={{ startAdornmant: <InputAdornment position="start" /> }}
              error={false}
              label="where is the job being done?"
              defaultValue="where is the job being done?"
              variant="outlined"
              id="where is the job being done?"
              onChange={({ target: { value } }) => calculateUserInputs({ address: value })}
              type={quoteState?.showHidden ? 'text' : 'password'}
              autosize
              value={coords && `${coords?.latitude},${coords?.longitude}`}
            >
              {coords && `${coords?.latitude},${coords?.longitude}` || 'Address'}
            </TextInput>
          </Grid>
          <Grid item xs={4}>
            <RegularButton onClick={(e) => { geolocationSelfRef.current.getLocation(); }}>Get your current location</RegularButton>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <LocationInput
            onChange={(date) => calculateUserInputs({ date, availibility: date })}
          />
        </Grid> */}
      </Grid>
    </>

  );
};
// ========================================================================== //
// geolocation wrapper
// ========================================================================== //
export const GeolocatedForms = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  // userDecisionTimeout: 5000,
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: true, // with component ref use ref.current.getLocation
  geolocationProvider: (typeof navigator !== 'undefined') && navigator?.geolocation,
  isOptimisticGeolocationEnabled: true,

})(Forms);

// ========================================================================== //
// category tab handler
// ========================================================================== //

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function Categories({
  categories, calculateInputs, calculateUserInputs, quoteState, bookingState,
}) {
  const geolocationRef = React.useRef(null);
  const classes = useStyles();

  // TODO needs to be refactored, redundant state declaration here **not the best way to do this**
  const [value, setValue] = React.useState(quoteState.selectedCategory || 0);

  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
    calculateInputs({ selectedCategory: newValue });// ensure state passes up to quote calculator
  }, [value]);
  // allow manual and overriden category selection
  useEffect(() => setValue(quoteState?.selectedCategory || 0), [quoteState, bookingState]);

  return (
    <div className={classes.tabPanel}>
      <AppBar position="relative" className={classes.tabCategories}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="secondary"
          aria-label="scrollable force tabs"
        >
          {/* the tab navigators */}
          {categories.map((category, index) => (
            <Tab
              key={`${category.name}tab`}
              label={category.name}
              className={classes.categoryTab}
              color="primary"
              fullWidth
              icon={<Icon fontSize="large">{category.icon}</Icon>}
              // handles change of tab
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>

      {/* the tab contents */}
      {categories.map((category, index) => (
        <TabPanel value={value} index={index}>
          <GeolocatedForms
            ref={geolocationRef}
            geolocationSelfRef={geolocationRef}
            category={category}
            quoteState={quoteState}
            calculateInputs={calculateInputs}
            calculateUserInputs={calculateUserInputs}
          />
        </TabPanel>
      ))}
    </div>
  );
}

export default QuoteCalculator;

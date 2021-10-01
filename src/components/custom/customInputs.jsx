import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  Select,
  Slider,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { common } from '@material-ui/core/colors';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

// ========================================================================== //
// styles
// ========================================================================== //
const useStyles = makeStyles((theme) => {
  const common = {
    '&:hover': {
      boxShadow: `0px 0px 0px ${theme.palette.background.default}`,
      background: theme.palette.background.main,
      border: theme.shape.brandBorder,
      '& > *': {
        color: `${theme.palette.text.secondary} !important`,
      },
    },
    color: `${theme.palette.text.secondary} !important`,
    // color: `${theme.palette.text.primary} !important`,
    backgroundColor: `${theme.palette.background.headline} !important`,

    '& > *': {
      // color: theme.palette.text.primary,
    },

    // effect
    transition: theme.transitions.create(
      ['color', 'box-shadow', 'background', 'margin', 'border'],
      { duration: '0.3s', easing: 'ease-in-out' },
    ),
    // marginLeft: -theme.spacing(0),
    // marginBottom: -theme.spacing(0),

    // theme styles
    whiteSpace: 'nowrap',
    display: 'inline-block',
    width: '100%',
    position: 'relative',
    background: theme.palette.background.button,
    boxShadow: theme.brandShadows.brand,
    borderRadius: theme.shape.brandBorderRadius,
    padding: theme.spacing(2),
  };

  const inputLabel = {
    '& label': {
      borderRadius: theme.shape.brandBorderRadius,
      padding: theme.spacing(1),
      marginTop: -theme.spacing(6) * 0.5,
      marginLeft: -theme.spacing(2) * 0.89,
      border: theme.shape.brandBorderSecondary,
      color: theme.palette.text.secondary,
    },
  };

  return {
    sliderLabel: {
      borderRadius: theme.shape.brandBorderRadius,
      padding: theme.spacing(1) * 0.5,
      paddingBottom: theme.spacing(3),
      marginTop: -theme.spacing(6) * 0.5,
      position: 'absolute',
      right: theme.spacing(0),
      marginLeft: -theme.spacing(0) * 0.89,
      color: theme.palette.text.secondary,
      background: theme.palette.background.button,
      fontSize: '.75rem',
    },

    dropDownButton: {
      ...common,
      // style is inlined with form control which is the actual button
      // padding: theme.spacing(1 / 2),
      margin: 0,
      '&:before': {
        border: 'none',
        bottom: 7,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        padding: theme.spacing(0),
        borderRadius: theme.shape.brandBorderRadius,
      },
    },

    sliderInput: {
      ...common,
      ...inputLabel,
      marginTop: theme.spacing(2),
      padding: theme.spacing(3) * 0.75,
      paddingLeft: 0,
      paddingRight: 0,
      margin: 'auto',
      color: theme.palette.text.primary,
      width: '100%',
      '& .MuiSlider-rail': {
        // position: 'relative',
        // width: '100%',
      },
      '& .MuiSlider-track': {
        // position: 'relative',
        // width: '100%',
      },
      '& .MuiSlider-thumb': {
        // top: 25,
      },
    },

    locationInput: {
      ...common,
      maxWidth: 500,
      minHeight: 500,
      minWidth: '100%',
      overflow: 'hidden',
      position: 'relative !important',
    },

    inputButton: {
      ...common,
    },
    textInput: {
      ...common,
      ...inputLabel,
    },

    calenderInput: {
      ...common,
      '& .MuiFormControl-root': {
        display: 'flex',
        color: 'white',
      },
      '& > .MuiPickersToolbar-toolbar': {
        backgroundColor: `${theme.palette.background.button} !important`,
      },
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
      borderRadius: theme.shape.brandBorderRadius,
      background: theme.palette.background.button,
      color: theme.palette.text.primary,
    },

    inputArea: {
      border: theme.shape.brandBorder,
      boxShadow: theme.brandShadows.brand,
      marginTop: `${theme.spacing(1)}px !important`,
      marginBottom: `${theme.spacing(1)}px !important`,
      borderRadius: theme.shape.brandBorderRadius,
      padding: theme.spacing(2),
    },
  };
});

// ========================================================================== //
// dropdown button
// ========================================================================== //
export const DropDownButton = (props) => {
  const {
    Icon,
    shadow,
    children,
    action,
    color = {},
    onChange = () => {},
    selectStateLabel = 'default default',
    options = ['default', 'default'],
  } = props;
  const classes = useStyles({ color });

  // we input the name of the state we change **selectState**, then pass it back out to the desired form control
  // we then have a second prop for the inputted options also derived from the original form control we are referencing out to
  const [state, setState] = React.useState({
    [selectStateLabel]: selectStateLabel,
  });
  const handleChange = React.useCallback(
    (event) => {
      setState({
        ...state,
        [selectStateLabel]: event.target.value,
      });
    },
    [state],
  );

  return (
    <>
      {' '}
      {/* <InputLabel htmlFor="dropdownbutton-native-select">
        {selectStateLabel}
      </InputLabel> */}
      <Select
        // {...props}
        className={classes.dropDownButton}
        color="primary"
        // size="large"
        // variant="contained"
        native
        value={state[selectStateLabel]}
        onChange={(event) => {
          handleChange(event);
          onChange(event);
        }}
        inputProps={{
          // name: selectStateLabel,
          id: 'dropdownbutton-native-select',
        }}
      >
        {options.map((value, index) => (
          <>
            <option key={value + index} value={value}>
              {value}
            </option>
          </>
        ))}
      </Select>
    </>
  );
};

// ========================================================================== //
// input button
// ========================================================================== //
export const InputButton = (props) => {
  const {
    Icon, shadow, children, action, color = {},
  } = props;
  const classes = useStyles({ color });
  return (
    <Button
      {...props}
      className={classes.inputButton}
      color="primary"
      size="large"
      variant="contained"
    >
      {children}
    </Button>
  );
};
export const SliderInput = (props) => {
  const {
    onChange = () => {},
    Icon,
    shadow,
    children,
    action,
    color = {},
    label = 'default',
    defaultValue = 2,
  } = props;
  const classes = useStyles({ color });
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ position: 'relative' }}>
      <div className={classes.sliderLabel}>{label}</div>
      <Slider
        {...props}
        color="primary"
        className={classes.sliderInput}
        value={value}
        onChange={(event, value) => {
          handleChange(event, value);
          onChange(value);
        }}
      />
    </div>
  );
};

// ========================================================================== //
// calender input
// ========================================================================== //
export const CalenderInput = (props) => {
  const {
    Icon, shadow, children, action, color = 'primary',
  } = props;
  const classes = useStyles({ color });
  return (
    <div className={classes.calenderInput}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          color="primary"
          id="date-picker-dialog"
          label="When are you availible next?"
          format="MM/dd/yyyy"
          value={new Date()}
          {...props}
          KeyboardButtonProps={{ 'aria-label': 'change date' }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

// ========================================================================== //
// text input
// ========================================================================== //
export const TextInput = (props) => {
  const {
    Icon,
    shadow,
    children,
    action,
    color = 'primary',
    autosize = false,
  } = props;
  const classes = useStyles({ color });

  return (
    (autosize && (
      <TextField
        {...props}
        fullWidth
        multiline
        margin="normal"
        className={classes.textInput}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        variant="outlined"
      />
    )) || (
      <TextareaAutosize
        aria-label="comments"
        placeholder="empty"
        {...props}
        maxRows={5}
        defaultValue="Write any additional comments here"
      />
    )
  );
};

// ========================================================================== //
// google maps api
// ========================================================================== //
// enable geometry, places, and maps api on the key
export const LocationInput = GoogleApiWrapper({
  apiKey: process.env.NODE_ENV.GOOGLEAPIKEY,
  libraries: 'geometry',
})((props) => {
  const {
    Icon,
    shadow,
    children,
    action,
    color = 'primary',
    autosize = false,
    google,
  } = props;
  const classes = useStyles({ color });
  // const onMarkerCLick = useCallback((event) => {}, []);

  // const ajGardenCareMarker = new google.maps.Marker({})

  const mapOptions = {
    initialCenter: { lat: 35.773972, lng: 149.431297 },
    center: { lat: 35.773972, lng: 149.431297 },
    zoom: 18,
    tilt: 45,
    rotateControl: true,
    heading: 90,
    mapTypeId: google.maps.MapTypeId.terrain,
    globe: true,
  };

  // google={google}
  // zoom={14}
  // className={classes.locationInput}
  // initialCenter={{
  //   lat: 0,
  //   lng: 0,
  // }}

  return (
    <Map {...mapOptions} {...props}>
      <Marker
        // onClick={(e) => onMarkerClick(e)}
        // {...props}
        name="This is test name"
      />
    </Map>
  );
});

import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';

import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  Icon,
  InputLabel,
  Select,
  Slider,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { common } from '@mui/material/colors';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
 
const common = {
  '&:hover': {
    boxShadow: `0px 0px 0px ${theme.palette.background.default}`,
    background: theme.palette.background.main,
    border: theme.custom.borders.brandBorder,
    '& > *': {
      color: `${theme.palette.text.secondary} !important`,
    },
  }, 
   
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
        sx={{/**classes.dropDownButton*/}}
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

  return (
    <Button
      {...props}
      sx={{/**classes.inputButton*/}}
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

  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box style={{ position: 'relative' }}>
      <Box sx={{
      //   borderRadius: (theme)=>theme.custom.borders.brandBorderRadius,
      // padding: (theme)=>theme.spacing(1) * 0.5,
      // paddingBottom: (theme)=>theme.spacing(3),
      // marginTop: -(theme)=>theme.spacing(6) * 0.5,
      // position: 'absolute',
      // right: (theme)=>theme.spacing(0),
      // marginLeft: -(theme)=>theme.spacing(0) * 0.89,
      // color: (theme)=>theme.palette.text.secondary,
      // background: (theme)=>theme.palette.background.button,
      // fontSize: '.75rem',
      }}
      >
        {label}
      </Box>
      <Slider
        {...props}
        color="primary"
      sx={{/**classes.sliderInput*/}}
        value={value}
        onChange={(event, value) => {
          handleChange(event, value);
          onChange(value);
        }}
      />
    </Box>
  );
};

// ========================================================================== //
// calender input
// ========================================================================== //
export const CalenderInput = (props) => {
  const {
    Icon, shadow, children, action, color = 'primary',
  } = props;

  return (
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

  return (
    (autosize && (
      <TextField
        {...props}
        fullWidth
        multiline
        margin="normal"
      sx={{/**classes.textInput*/}}
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
    <StyledMap {...mapOptions} {...props}>
      <Marker
        // onClick={(e) => onMarkerClick(e)}
        // {...props}
        name="This is test name"
      />
    </StyledMap>
  );
});

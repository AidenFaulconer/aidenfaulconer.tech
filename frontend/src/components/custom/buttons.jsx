import React from 'react';

import {
  Box,
  Button, InputAdornment, MenuItem, TextField, Divider,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';

// date picker imports
import Badge from '@mui/material/Badge';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PickersDay from '@mui/lab/PickersDay';
import DatePicker from '@mui/lab/DatePicker';
import CalendarPickerSkeleton from '@mui/lab/CalendarPickerSkeleton';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { useFormStore } from '../util/customHooks';
import { AFIcon } from './icons';

// ========================================================================== //
// Date picker
// ========================================================================== //
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = getDaysInMonth(date);
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}
export function PickDate({
  formName, fieldName, validateType, ...props
}) {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [input, setInput] = useFormStore(formName, fieldName, [], validateType || 'phone');

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(input);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const datePickerStyles = {

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        sx={{ ...datePickerStyles }}
        value={input}
        loading={isLoading}
        onChange={(newValue) => {
          setInput(newValue);
        }}
        onMonthChange={handleMonthChange}
        renderInput={(params) => <TextField {...params} />}
        renderLoading={() => <CalendarPickerSkeleton />}
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected = !DayComponentProps.outsideCurrentMonth
            && highlightedDays.indexOf(day.getDate()) > 0;
          return (
            <Badge
              key={day.toString()}
              overlap="circular"
              badgeContent={isSelected ? '🌚' : undefined}
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </LocalizationProvider>
  );
}
// ========================================================================== //
// Button variant 2 (Green)
// ========================================================================== //
const buttonTypes = {
  primary: {
    color: (theme) => theme.palette.text.secondary,
    background: (theme) => theme.palette.text.primary,
    border: (theme) => theme.custom.borders.brandBorder,
    '&:hover': {
      background: (theme) => theme.palette.text.secondary,
      color: (theme) => theme.palette.text.primary,
    },
  },
  secondary: {
    color: (theme) => theme.palette.text.primary,
    background: (theme) => theme.palette.text.secondary,
    border: (theme) => theme.custom.borders.brandBorderSecondary,
    '&:hover': {
      background: (theme) => theme.palette.text.primary,
      color: 'text.secondary',
    },
  },
  special: {
    color: 'text.secondary',
    background: 'text.third',
    border: (theme) => theme.custom.borders.brandBorder,
    '&:hover': {
      background: 'text.prmary',
      color: 'text.secondary',
    },
  },
  icon: {
    borderRadius: '100%',
    width: 50,
    maxWidth: 50,
    minWidth: 0,
    height: 50,
    zIndex: 10,
    position: 'relative',
    background: (theme) => theme.palette.text.primary,
    border: (theme) => theme.custom.borders.brandBorder,
    '& .MuiButton-endIcon': {
      margin: 0,
    },
    '&:hover': {
      background: (theme) => theme.palette.text.secondary,
      color: (theme) => theme.palette.text.primary,
    },
  },
};
export function RegularButton(props) {
  const {
    shadows = false, type = 'primary', icon = { enabled: true, type: 'arrow', color: buttonTypes[type].color }, shadow, children, size = 'large',
  } = props;
  return (
    <Button
      {...props}
      disableRipple
      className="h-10 inline-flex items-center z-10 cursor-pointer font-medium"
      sx={{
        boxShadow: shadows ? (theme) => (theme.custom.shadows.brand) : 'none',
        lineHeight: '100%',
        fontSize: 14,
        ...buttonTypes[type],
        '&:MuiEndIcon-root': {
          margin: 0,
        },
      }}
      size={size}
      // variant="contained"
      centerRipple
    >
      {children && (
        <div className="mr-8">
          {children}
        </div>
      )}
      {icon.enabled && (<AFIcon {...icon} />)}
    </Button>
  );
}

// ========================================================================== //
// qualification cards / content
// ========================================================================== //
function ItemTag({ props, children }) {
  return (
    <Box
      {...props}
      className="rounded-3xl p-1 h-25 items-center inline-flex "
      sx={{
        background: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.text.secondary,
        border: (theme) => theme.custom.borders.brandBorder,
        fontSize: 12,
        '&:hover': {
          background: (theme) => theme.palette.text.secondary,
          color: (theme) => theme.palette.text.primary,
        },
      }}
    >
      {children}
    </Box>
  );
}

// ========================================================================== //
// Selection buttons
// ========================================================================== //
export function SelectionButton(props) {
  const {
    Icon,
    shadow,
    children,
    color = {},
    size = 'large',
    selected = false,
  } = props;

  const stateStyles = {
    // not selected
    false: {
      justifyContent: 'flex-start',
      opacity: 0.6,
      border: (theme) => theme.custom.borders.brandBorder,
      color: (theme) => theme.palette.text.primary,
      background: (theme) => theme.palette.text.secondary,
      '&:hover': {
        color: (theme) => theme.palette.text.secondary,
        background: (theme) => theme.palette.text.primary,
      },
      '& > * svg': {
        border: (theme) => theme.custom.borders.brandBorder,
        fill: (theme) => theme.palette.text.secondary,
      },
    },
    // selected
    true: {
      justifyContent: 'flex-start',
      opacity: 1,
      border: (theme) => theme.custom.borders.brandBorder,
      color: (theme) => theme.palette.text.secondary,
      background: (theme) => theme.palette.text.primary,
      '&::hover': {
        color: (theme) => theme.palette.text.primary,
        background: (theme) => theme.palette.text.secondary,
      },
    },
    '& * > svg': {
      border: (theme) => theme.custom.borders.brandBorder,
      fill: (theme) => theme.palette.text.primary,
      background: 'red',
    },
  };

  return (
    <Button
      {...props}
      disableRipple
      className="text-ellipsis whitespace-nowrap max-w-[150px] w-full items-center inline-flex"
      sx={{
        lineBreak: 'unset',
        ...stateStyles[selected],
      }}
      // color="sec"
      size={size}
      // variant="contained"
      centerRipple
      style={{ opacity: selected && 1 }}
      startIcon={(
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8.00049"
            cy="8.3396"
            r="7.5"
          />
        </svg>
      )}
    >
      {children}
    </Button>
  );
}

// ========================================================================== //
// All inputs need to be directed to the STORE, where input data is kept
// the structure is {state[formName].changeFormData({[fieldName]: value})}
// so all inputs NEED a formName AND a fieldName

// ========================================================================== //
// File upload Button
// ========================================================================== //
export function FileUploadButton({
  formName, fieldName, validateType, label, ...props
}) {
  // hooks
  const ref = React.useRef();
  const [input, setInput] = useFormStore(formName, fieldName, [], validateType || 'file');
  // properties
  const getFileName = /[^/]*$/;

  // methods
  const handleInput = React.useCallback((e) => {
    // go through all the files and check the type of file, and file size is under 3mb and there is no more than 3 files
    const files = e?.target ? [...e.target.files] : Object.keys(e).map((f) => e[f]);
    if (files) {
      const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
      const fileSize = 5242880;
      const maxFiles = 3;
      const fileCount = files.length;
      if (fileCount > maxFiles || input.length > maxFiles) {
        alert('You can only upload a maximum of 3 files');
        return;
      }
      for (let i = 0; i < files.length; i += 1) {
        if (fileTypes.indexOf(files[i].type) === -1) {
          alert(`File type not supported for ${files[i].name}, use ${fileTypes.map((type) => type).join(', ')}`);
          return;
        }
        if (files[i].size > fileSize) {
          alert(`File size for ${files[i].name} is too large (Maximum file size is 5MB)`);
          return;
        }
      }
      setInput(files);
    }
  }, [ref]);

  const generateFileTags = React.useCallback(() => {
    if (input.length > 0) {
      return input.map((file) => (
        <ItemTag key={file.name} style={{ zIndex: 10 }}>
          {/* <AFIcon type="close" onClick={() => setInput(input.filter((item) => item !== file))} /> */}
          {`  ${file.name}`}
        </ItemTag>
      ));
    }
  }, [input]);

  return (
    <label htmlFor="upload-photos">
      <RegularButton
          // allow users to drag and drop files on this button
        {...props}
        className="flex flex-nowrap flex-row h-28 mb-8"
        draggable="true"
        onDragStart={(e) => e.dataTransfer.setData('text/plain', 'anything')}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const { files } = e.dataTransfer;
          handleInput(files);
        }}
          // call file dialog in input
        onClick={(e) => {
          ref.current.click();
        }}
      >
        <input
          onChange={handleInput}
          ref={ref}
          type="file"
          id="upload-photo"
          name="upload-photo"
          hidden
          multiple
        />
        {generateFileTags()}
        {input.length === 0 && label}
      </RegularButton>
    </label>
  );
}

// ========================================================================== //
// Fancy Text Field https://mui.com/components/text-fields/#select
// *can be a dropdown button
// *can be a search input
// *can have adornments for additional functionality nested inside
// ========================================================================== //
export function FancyTextField({
  input = {
    pattern: '[a-zA-Z0-9]*',
    mode: 'text',
  },
  maxRows = 1,
  size = 'large',
  margin = 'none',
  fullWidth = false,
  formName,
  fieldName,
  validateType,
  label,
  defaultValue,
  message,
  value,
  type,
  onChange,
  data,
  icon,
  children,
}) {
  // /offer a list of selections if type = selection
  const TextFieldStyles = {
    color: (theme) => theme.palette.text.primary,
    '& .MuiInputLabel-root': {
      color: 'currentColor',
    },
    '& .MuiFormHelperText-root': {
      color: 'currentColor',
    },
    '& .MuiOutlinedInput-root': {
      background: (theme) => theme.palette.text.secondary,
    },
  };

  // hooks
  const [thisInput, setThisInput, error] = useFormStore(formName, fieldName, '', validateType || 'cleanString');
  const handleOptionChange = (e) => { setThisInput(e.target.value.toString()); };
  const handleChange = (e) => setThisInput(e.target.value);

  const createIcon = React.useCallback(
    (_icon) => (
      <>
        {!_icon.start && (<Divider className="h-7 m-2" orientation="vertical" />)}
        <InputAdornment {..._icon.handlers} position={_icon.start ? 'start' : 'end'}>
          <AFIcon type={_icon.type} />
        </InputAdornment>
        {_icon.start && (<Divider className="h-7 m-2" orientation="vertical" />)}
      </>
    ),
    [thisInput],
  );

  // TODO: useImperative to override eventListeners
  return (
    <TextField
      margin={margin}
      size={size}
      type={type && type}
      error={!!error}
      maxRows={maxRows}
      rows={maxRows}
      fullWidth={fullWidth}
      onChange={onChange || (data && handleOptionChange || null)}
      onInput={onChange ? null : handleChange}
      value={thisInput}
      label={label && label}
      autoComplete="on"
      multiline
      color="primary"
      select={Boolean(data)}
      defaultValue={thisInput}
      helperText={message || error?.message || ' '}
      id={`${thisInput}-textInput`}
      InputProps={{
        startAdornment: icon ? createIcon(icon) : null,
        'aria-label': `${label}-defaultValue`,
        inputMode: input.mode || 'text',
        pattern: input.pattern || '[a-zA-Z0-9]*',
      }}
      InputLabelProps={{ shrink: true }}
      selectProps={{
        native: true,
      }}
      sx={{
        ...TextFieldStyles,
        color: (theme) => theme.palette.text.primary,
        // border: (theme) => theme.custom.borders.brandBorder,
      }}
      // color="currentColor"
      // variant="outlined"
    >
      {children && children}
      {/* if this is a selection type, have a menu to select options from  */}
      {(data && type === 'select') && data.map((option) => (
        <MenuItem
          // onSelect={handleChange}
          dense
          divider
          key={option.value}
          value={option.value}
          name={option.value}
          selected={option.value === thisInput}
        >
          {/* {option.value === valueState && null || option.icon && createIcon(option.icon)} */}
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

// ========================================================================== //
// Button Group
// ========================================================================== //
export function ButtonGroup(props) {
  const {
    children,
    autosize = false,
  } = props;
  return (
    autosize && (
      <ButtonGroup
        {...props}
        fullWidth
        multiline
        margin="normal"
        // InputLabelProps={{
        //   shrink: true,
        // }}
        variant="outlined"
      >
        {children}
      </ButtonGroup>
    )
  );
}

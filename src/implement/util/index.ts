/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
import React, {
useCallback,
useContext,
useDebugValue,
useEffect,
useImperativeHandle,
useLayoutEffect,
useMemo,
useReducer,
useRef,
useState,
} from 'react';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';
import { useStore } from '../store/store';
import { AppStore } from '../types/store';
// ========================================================================== //
// Custom react hooks https://usehooks.com/
// react hooks allow you to be modular with logic that would be written in
// the react pure component anyway, they basically drop in and make reusable
// REACT BASED protocals, so logic declared in hook, is essentially logic
// youd have in the component anyway.
// remember to get output from these via [x,setX] = hookName(input)
// remember to be mindful of the data returned in each hook! some are objects
// some are arrays!
// Don’t call Hooks inside loops, conditions, or nested functions. Instead,
// always use Hooks at the top level of your React function
// ========================================================================== //

// ========================================================================== //
// Forms
// ========================================================================== //
export const useFormValidation = (initialState: any, validationSchema: { validate: (arg0: any, arg1: { abortEarly: boolean; }) => any; }) => {
const [values, setValues] = useState(initialState);
const [errors, setErrors] = useState({});
const [touched, setTouched] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [isValid, setIsValid] = useState(false);

useEffect(() => {
    if (isSubmitting) {
        const validationErrors = validationSchema.validate(values, { abortEarly: false });
        setErrors(validationErrors.errors);
        setIsValid(validationErrors.isValid);
    }
}, [isSubmitting, values]);

const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
};

const handleBlur = (event: { target: { name: any; }; }) => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
};

const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsSubmitting(true);
};

return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
};
};

// ========================================================================== //
// Zustand hooks
// ========================================================================== //
// get the store
// add method to store
// subscribe to store
// unsubscribe from store

// ========================================================================== //
// Re render on variable change
// ========================================================================== //
export const reRenderOnVariables = (variables = []) => {
const [rerender, setRerender] = useState(false);
useEffect(() => {
    setRerender(!rerender);
}, [...variables]);
};
// ========================================================================== //
// Global Store FORM handler **using zustand as global store**
// ========================================================================== //
const validationTypes: {[key:string]: yup.AnySchema} = {
text: yup.string().required('Required'),
required: yup.string().required('Required'),
selection: yup.string().required('Please select an option'),
fullName: yup.string().required('Full Name is required'),
email: yup.string().email('Invalid email address').required('Email is required'),
password: yup.string().required('Password is required'),
confirmPassword: yup.string().required('Confirm Password is required'),
phone: yup.string().required('Phone is required'),
acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
textArea: yup.string().max(500, 'Maximum 500 characters only'),
file: yup.mixed().required('File is required').test('fileSize', 'File size is too big', (value) => value && value.size <= 2000000),
image: yup.mixed().required('Image is required').test('fileSize', 'File size is too large', (value) => value && value.size <= 3000000),
video: yup.mixed().required('Video is required').test('fileSize', 'File size is too large', (value) => value && value.size <= 3000000),
cleanString: yup.string().matches(/^[a-zA-Z0-9_.-]*$/, 'Only alphanumeric characters, underscores, dashes and periods are allowed'),
cleanNumber: yup.string().matches(/^[0-9]*$/, 'Only numbers are allowed'),
};

export const useFormStore = (formName = 'testForm', fieldName = 'text', stateDefaultValue = false, validationType: string) => {
const [input, setFormInput] = useState(stateDefaultValue ? useStore((state:any) => state[formName][fieldName]) : '');
const [error, setError] = useState(false);
const changeFormData = useStore((state:any) => state.actions.changeFormData);

useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`New Form Input: ${input} for form ${formName}`);

    // test input for errors
    validationTypes[validationType].validate(input, { abortEarly: false, strict: true })
        .then((validationErrors) => {
            if (validationErrors.errors) {
                console.log(validationErrors.errors);
                setError(validationErrors.errors);
            } else setError(false);
        })
        .catch((validationErrors) => {
            console.log(validationErrors.errors);
            setError(validationErrors.errors);
        });
    changeFormData(formName,{ [fieldName]: input });
}, [input]);

return [input, setFormInput, error];
};

export const useFormStoreNoValidation = (formName:string = 'testForm', fieldName:string = 'text', stateDefaultValue:any = false) => {
    const [input, setFormInput] = useState(stateDefaultValue ? useStore((state: any) => state[formName][fieldName]) : '');
    const changeFormData = useStore((state: any) => state.actions.changeFormData);
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') console.log(`New Form Input: ${input} for form ${formName}`);
        changeFormData(formName,{ [fieldName]: input });
    }, [input]);

return [input, setFormInput];
};
// ========================================================================== //
// Force re render
// ========================================================================== //
export const forceUpdate = () => React.useReducer(() => ({}),0)[1];

// ========================================================================== //
// Misc
// ========================================================================== //
export const useClickOutside = (ref: { current: { contains: (arg0: any) => any; }; }, callback: () => void) => {
const handleClick = (e: { target: any; }) => {
    if (ref.current && !ref.current.contains(e.target)) {
        callback();
    }
};

useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
        document.removeEventListener('click', handleClick);
    };
});
};

export const useScrollControl = (ref: any, children: any) => {
const [isScrolled, setIsScrolled] = useState(false);
const [isScrolledUp, setIsScrolledUp] = useState(false);
const [isScrolledDown, setIsScrolledDown] = useState(false);
const [isScrolledLeft, setIsScrolledLeft] = useState(false);
const [isScrolledRight, setIsScrolledRight] = useState(false);

useEffect(() => {
    const handleScroll = () => {
        const { scrollTop, scrollLeft } = ref.current;
        const {
            scrollHeight, offsetHeight, scrollWidth, offsetWidth,
        } = ref.current;
        const isScrolled = scrollTop + offsetHeight >= scrollHeight;
        const isScrolledUp = scrollTop <= 0;
        const isScrolledDown = scrollTop + offsetHeight >= scrollHeight;
        const isScrolledLeft = scrollLeft <= 0;
        const isScrolledRight = scrollLeft + offsetWidth >= scrollWidth;
        setIsScrolled(isScrolled);
        setIsScrolledUp(isScrolledUp);
        setIsScrolledDown(isScrolledDown);

        setIsScrolledLeft(isScrolledLeft);
        setIsScrolledRight(isScrolledRight);
    };
    handleScroll();
    ref.current.addEventListener('scroll', handleScroll);
    return () => {
        ref.current.removeEventListener('scroll', handleScroll);
    };
}, [ref]);

return {
    isScrolled,
    isScrolledUp,
    isScrolledDown,
    isScrolledLeft,
    isScrolledRight,
};
};

// ========================================================================== //
// State based react hooks
// ========================================================================== //

export const useStateWithCallback = (initialState: any, callback: (state:any)=>{}) => {
const [state, setState] = useState(initialState);
useEffect(():void => {callback(state)}, [state, callback]);
return [state, setState];
};

export const useStateWithCallbackInstant = (initialState: any, callback: (state:any)=>{}) => {
const [state, setState] = useState(initialState);
useLayoutEffect(() => {callback(state)}, [state, callback]);
return [state, setState];
};

// Hook
export const usePrevious = (value: any) => {
// The ref object is a generic container whose current property is mutable ...
// ... and can hold any value, similar to an instance property on a class
const ref = useRef();
// Store current value in ref
useEffect(() => {
    ref.current = value;
}, [value]); // Only re-run if value changes
// Return previous value (happens before update in useEffect above)
return ref.current;
};

// ========================================================================== //
// React general purpose hooks
// ========================================================================== //

export const useEffectUpdate = (callback: ()=>{}) => {
const isFirstRender = useRef(true);
useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false; // toggle flag after first render/mounting
        return;
    }
    callback(); // performing action after state has updated
}, [callback]);
};
export const useToggle = (initialState = false) => {
// Initialize the state
const [state, setState] = useState(initialState);

// Define and memorize toggler function in case we pass down the comopnent,
// This function change the boolean value to it's opposite value
const toggle = useCallback(() => setState((state) => !state), []);

return [state, toggle];
}; 

export const useLocalStorage = (key: string, initialValue: undefined) => {
// State to store our value
// Pass initial state function to useState so logic is only executed once
const [storedValue, setStoredValue] = useState(() => {
    try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
    }
});
// Return a wrapped version of useState's setter function that ...
// ... persists the new value to localStorage.
const setLocalStorageValue = (value: (arg0: any) => any) => {
    try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
    }
};
return [storedValue, setLocalStorageValue];
};

export const useWindowSize = () => {
// Initialize state with undefined width/height so server and client renders match
// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
});
useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
        // Set window width/height to state
        setWindowSize({
            width: window?.innerWidth,
            height: window?.innerHeight,
        });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
}, []); // Empty array ensures that effect is only run on mount
return windowSize;
};
 
// Hook
export const useDimensions = (targetRef: { current: { clientWidth: any; clientHeight: any; }; }) => {
const getDimensions = () => ({
    width: targetRef.current ? targetRef.current.clientWidth : 0,
    height: targetRef.current ? targetRef.current.clientHeight : 0,
});

const [dimensions, setDimensions] = useState(getDimensions);

const handleResize = () => {
    setDimensions(getDimensions());
    // console.log(targetRef.current.clientWidth, getDimensions());
};

useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

useLayoutEffect(() => {
    handleResize();
}, []);
return dimensions;
}; 
// ========================================================================== //
// Api hooks
// ========================================================================== //


export const useDebounce = (value: any, delay: number) => {
// State and setters for debounced value
const [debouncedValue, setDebouncedValue] = useState(value);
useEffect(
    () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    },
    [value, delay], // Only re-call effect if value or delay changes
);
return debouncedValue;
};
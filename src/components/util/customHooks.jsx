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
import { useCookies } from 'react-cookie';

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
// Force re render
// ========================================================================== //
export const forceUpdate = () => React.useReducer(() => ({}))[1];

// export const usePrevious = (value) => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

// ========================================================================== //
// Misc
// ========================================================================== //
export const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
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

// ========================================================================== //
// Local storage, cookies, session storage, global state (mobX)
// ========================================================================== //

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
// State based react hooks
// ========================================================================== //

export const useStateWithCallback = (initialState, callback) => {
  const [state, setState] = useState(initialState);
  useEffect(() => callback(state), [state, callback]);
  return [state, setState];
};

export const useStateWithCallbackInstant = (initialState, callback) => {
  const [state, setState] = useState(initialState);
  useLayoutEffect(() => callback(state), [state, callback]);
  return [state, setState];
};

export const useStateWithCallbackLazy = (initialValue) => {
  const callbackRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = (newValue, callback) => {
    callbackRef.current = callback;
    return setValue(newValue);
  };
  return [value, setValueWithCallback];
};

// Hook
export const usePrevious = (value) => {
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

// requires you forward a ref from the component this is declared in ie: React.forwardRef(({}),ref)
export const useStaticMethods = (methods, ref) => {
  useImperativeHandle(
    ref,
    // forwarded method in an object to be used as a ref with methods
    // callback method extended from this component so its accessible to parent, from the forwarded ref
    () => ({ ...methods.forEach((method) => method) }),
  );
  return ref;
};

export const useEffectUpdate = (callback) => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }
    callback(); // performing action after state has updated
  }, [callback]);
};
export const useStateRef = (processNode) => {
  const [node, setNode] = useState(null);
  const setRef = useCallback(
    (newNode) => {
      setNode(processNode(newNode));
    },
    [processNode],
  );
  return [node, setRef];
};
export const useRefWithCallback = (onMount, onUnmount) => {
  const nodeRef = useRef(null);

  const setRef = useCallback(
    (node) => {
      if (nodeRef.current) {
        onUnmount(nodeRef.current);
      }

      nodeRef.current = node;

      if (nodeRef.current) {
        onMount(nodeRef.current);
      }
    },
    [onMount, onUnmount],
  );

  return setRef;
};
export const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

// Hook
export const useMemoCompare = (next, compare) => {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
};

export const useWhyDidYouUpdate = (name, props) => {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
};

export const useOnScreen = (ref, rootMargin = '0px') => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
};

export const useIsMounted = () => {
  const [isMounted, setIsMouted] = useState(false);
  useEffect(() => {
    setIsMouted(true);
    return () => setIsMouted(false);
  }, []);
  return isMounted;
};

// Hook
export const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current], // Recall only if ref changes
  );
  return [ref, value];
};

// Hook
export const useLocalStorage = (key, initialValue) => {
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
  const setValue = (value) => {
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
  return [storedValue, setValue];
};

// Hook
export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
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
// export const useRouter = () => {
//   const params = useParams();
//   const location = useLocation();
//   const history = useHistory();
//   const match = useRouteMatch();
//   // Return our custom router object
//   // Memoize so that a new object is only returned if something changes
//   return useMemo(() => ({
//     // For convenience add push(), replace(), pathname at top level
//     push: history.push,
//     replace: history.replace,
//     pathname: location.pathname,
//     // Merge params and parsed query string into single "query" object
//     // so that they can be used interchangeably.
//     // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
//     query: {
//       ...queryString.parse(location.search), // Convert string to object
//       ...params,
//     },
//     // Include match, location, history objects so we have
//     // access to extra React Router functionality if needed.
//     match,
//     location,
//     history,
//   }), [params, match, location, history]);
// };

// Hook
export const useEventListener = (eventName, handler, element = window) => {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
};

// Hook
export const useDimensions = (targetRef) => {
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

// Hook
export const useMedia = (queries, values, defaultValue) => {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  // function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };
  // State and setter for matched value
  const [value, setValue] = useState(getValue);
  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [], // Empty array ensures effect is only run on mount and unmount
  );
  return value;
};

// Hook
export const useKeyPress = (targetKey) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState < Boolean > false;
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};

// Hook https://www.npmjs.com/package/react-cookie
export const useCookie = () => {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {},
    [cookies], // Only re-call effect when value changes
  );
  // Return enabled state and setter
  return [cookies, setCookie, removeCookie];
};

// ========================================================================== //
// Theming and styling
// ========================================================================== //

export const useGyro = ({ listener }) => {
  const handleOrientation = (e) => {
    const rotate = e.gamma;
    const tilt = e.beta;
    const spin = e.alpha;
    listener(Math.round(rotate), Math.round(tilt), Math.round(spin));
  };
  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.ondeviceorientation = (e) => handleOrientation(e);
    } else {
      console.log('Device Orientation: Not supported');
    }
  });
};

// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
const usePrefersDarkMode = () => useMedia(['(prefers-color-scheme: dark)'], [true], false);

// Hook
export const useDarkMode = () => {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');
  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode();
  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled = typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;
  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = 'dark-mode';
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled], // Only re-call effect when value changes
  );
  // Return enabled state and setter
  return [enabled, setEnabledState];
};

// Hook
export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    // eslint-disable-next-line no-return-assign
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
};

// Hook
export const useTheme = (theme) => {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      // eslint-disable-next-line no-restricted-syntax
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme], // Only call again if theme object reference changes
  );
};

// ========================================================================== //
// Use history
// ========================================================================== //

// Initial state that we pass into useReducer
const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};
// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  const { past, present, future } = state;
  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case 'SET':
      const { newPresent } = action;
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case 'CLEAR':
      const { initialPresent } = action;
      return {
        ...initialState,
        present: initialPresent,
      };
    default:
  }
};
// Hook
export const useHistory = (initialPresent) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders
  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo, dispatch]);
  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);
  const set = useCallback((newPresent) => dispatch({ type: 'SET', newPresent }), [
    dispatch,
  ]);
  const clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [
    dispatch,
  ]);
  // If needed we could also return past and future state
  return {
    state: state.present,
    set,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  };
};

// ========================================================================== //
// Api hooks
// ========================================================================== //

// Hook
export const useScript = (src) => {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus('idle');
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script = document.querySelector(`script[src="${src}"]`);
      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error',
          );
        };
        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status'));
      }
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };
      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);
      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );
  return status;
};

export const useAsync = (asyncFunction, immediate = false) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setValue(response);
        console.log(response);
        setStatus('success');
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  // alert(execute);
  return {
    execute,
    status,
    value,
    error,
  };
};
// Hook (use-require-auth.js)
export const useRequireAuth = (
  authMethod,
  routerMethod,
  redirectUrl = '/signup',
) => {
  const auth = authMethod();
  const router = routerMethod();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
};

export const useDebounce = (value, delay) => {
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

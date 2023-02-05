/* eslint-disable no-debugger */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
import { config, useTrail, useTransition } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
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
import * as yup from 'yup';
import { useStore } from '../../store/store';
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
// detect users theme
// ========================================================================== //
const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = ((e) => {
    setIsDarkTheme(e.matches);
  });

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};

// ========================================================================== //
// Disable text highlighting
// ========================================================================== //
export const toggleTextHighlight = (defaultValue = false) => {
  const [highlightEnabled, setHighlightEnabled] = useState({ enabled: defaultValue, styles: highLightStyles });
  const highLightStyles = {
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
    '-ms-user-select': 'none',
    'user-select': 'none',
  };
  useEffect(() => {
    if (highlightEnabled) setHighlightEnabled({ enabled: !highlightEnabled.enabled, styles: {} });
    else setHighlightEnabled({ enabled: false, styles: highLightStyles });
  }, [highlightEnabled]);

  // returns object with configuration ie: it holds the truthy value, and the styles needed to disable highlight
  return [highlightEnabled, setHighlightEnabled];
};

// ========================================================================== //
// Scrolling and animation hooks
// ========================================================================== //

export const useSidewayScroll = (id) => {
  const scrollHorizontally = (e) => {
    e = typeof window !== 'undefined' && window.event || e;
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)) * 2;
    Object.keys(document.getElementsByClassName(id)).map(
      (elem) => (elements[elem].scrollLeft -= delta * 40),
    ); // Multiplied by 40
    e.preventDefault();
  };
  let elements = document.getElementsByClassName(id);
  if (elements.length > 0) {
    // IE9, Chrome, Safari, Opera
    Object.keys(elements).map((elem) => elements[elem].addEventListener('mousewheel', scrollHorizontally, false));
    // Firefox
    Object.keys(elements).map((elem) => elements[elem].addEventListener(
      'DOMMouseScroll',
      scrollHorizontally,
      false,
    ));
  } else {
    // IE 6/7/8
    Object.keys(elements).map((elem) => elements[elem]
      .getElementsByClassName(id)
      .attachEvent('onmousewheel', scrollHorizontally));
  }
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  // get scroll progress relative to page
  const getScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const { scrollHeight } = document.documentElement;
    const { clientHeight } = document.documentElement;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

    // console.log(`scroll progress: ${scrollPercent}`);
    setScrollProgress(scrollPercent);
  }, []);
  useLayoutEffect(() => {
    window.addEventListener('scroll', getScrollProgress);
    return () => window.removeEventListener('scroll', getScrollProgress);
  }, [getScrollProgress]);
  return scrollProgress;
};

export const useAnimatedMount = ({ children }) => {
  const [show, set] = useState(false);
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!show),
  });
  return transitions(
    (styles, item) => item && <a.div style={styles}>{children}</a.div>,
  );
};

// INPUT: HTMLELEMENTS array
// OUTPUT: reactive events attatched to interpolate between the elements in array from start to end based on users scroll
// export const useIntersectionObserver = (handler =
// // handler by default logs intersections, override this to call special functionaliry
// (entries, observer = null) => entries.map((entry) => {
//   // api
//   // .intersectionRatio
//   // .intersectionRect
//   // .isIntersecting
//   // .isVisible
//   // .target
//   // .time
//   // rootBounds
//   if (entry.intersectionRatio >= 0.5) console.info('visible: ', entry.target);
//   return '';
// }), options = {
//   root: null, // element used as the viewport for checking visibility of the target
//   rootMargin: '0px', // margin around the root
//   threshold: 0.5, // .5 = 50% visible. single number or [] of numbers to indicate at what percentage of targets visibility the observer callback should execute
// }) => {
//   // element refs to listen too
//   const refs = React.useRef([]);
//   // element that listens to elements (interseciton observer)
//   const observer = React.useRef(null);
//   // push refs to an array of html elements to listen to
//   const addNode = React.useCallback((node) => refs.current.push(node), []);

//   const getObserver = (ref) => {
//     const observer = ref.current;
//     if (observer !== null) {
//       return observer;
//     }
//     const newObserver = new IntersectionObserver(handler, options);
//     ref.current = newObserver;
//     return newObserver;
//   };

//   React.useEffect(() => {
//     if (observer.current) observer.current.disconnect();

//     const newObserver = getObserver(observer);
//     refs.current.forEach((node) => newObserver.observe(node));
//     console.info(refs.current);

//     // return () => refs.current.forEach((observerRef) => observerRef.disconnect());
//     return () => newObserver.disconnect();
//   }, [refs]);

//   // ref={addNode} this method adds the element to be listened to by intersection observer
//   return addNode;

export const useIntersectionObserver = (
  handler = (entries, observer) => entries.forEach((entry) => {
    if (entry.intersectionRatio >= 0.5) console.info('visible: ', entry.target);
  }),
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  },
) => {
  const refs = React.useRef([]);
  const observers = React.useRef([]);

  const addNode = React.useCallback((node) => {
    refs.current.push(node);
  }, []);

  React.useEffect(() => {
    const newObserver = new IntersectionObserver(handler, options);
    refs.current.forEach((node) => newObserver.observe(node));
    observers.current.push(newObserver);
    return () => newObserver.disconnect();
  }, [refs.current]);

  return addNode;
};

export const useManyGestures = (config) => {
  // example gesture handler
  const gestureHandler = ({
    args: [index],
    down,
    delta: [xDelta, yDelta],
    direction: [xDir],
    velocity: [xVel, yVel],
    tap,
    // memo
    // cancel
    // touches
    // scrolling,
    // wheel
  }) => '';

  const defaultConfig = {
    onWheel: gestureHandler,
    onScroll: gestureHandler,
    onDrag: gestureHandler,
    onHover: gestureHandler,
    handlerConfig: {

      onWheel: { threshold: 5 },
      onScroll: {
        threshold: 5,
        pointer: { capture: false },
        axis: 'y',
        filterTaps: true,
      },
      pinch: {},
      move: {},
      onDrag: {},
      onHover: {},
    },
  };

  // because we nest instances of this, we need to make sure implements useCallback to memoize it to the instance
  const bindGestureHandler = useGesture(
    // event handlers
    {
      onDrag: config?.onDrag || defaultConfig.onDrag, // set angleBounds to 360/-360
      onWheel: config?.onWheel || defaultConfig.onWheel, // swipe.distance capped at 3 pixels of movement
      onScroll: config?.onScroll || defaultConfig.onScroll, // swipe.distance capped at 3 pixels of movement
      onHover: config?.onHover || defaultConfig.onHover, // swipe.distance capped at 3 pixels of movement
    },
    // handler configuration
    {
      drag: config?.onDrag || defaultConfig.onDrag,
      scroll: config?.onScroll || defaultConfig.handlerConfig.onScroll,
      wheel: config?.onWheel || defaultConfig.handlerConfig.onWheel,
      move: config?.onScroll || defaultConfig.handlerConfig.onScroll,
      pinch: config?.onDrag || defaultConfig.handlerConfig.onDrag,
      hover: config?.onHover || defaultConfig.handlerConfig.onHover,
    },
  ); // this function instance comes from the component key

  return bindGestureHandler;
};

// create trailing text effects
export const useTrailingText = ({ open, children, style = {} }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 210, friction: 20 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

// modern Chrome requires { passive: false } when adding event
//     handle global scroll events
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {
  37: 1, 38: 1, 39: 1, 40: 1,
};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}
let supportsPassive = false;
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get() { supportsPassive = true; },
  }));
} catch (e) { }

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = typeof document !== 'undefined' && 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export const useToggleScrollHook = (defaultValue = true) => {
  const [scrollEnabled, setScrollEnabled] = useState(defaultValue);
  const disableScroll = () => {
    if (typeof window !== 'undefined') return;
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  };
  const enableScroll = () => {
    if (typeof window !== 'undefined') return;
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  };

  useEffect(() => {
    if (scrollEnabled) enableScroll();
    else disableScroll();
  }, [scrollEnabled]);

  return [scrollEnabled, setScrollEnabled];
};

// ========================================================================== //
// Api hooks
// ========================================================================== //
export const useGoogleAnalytics = (
  category = '',
  action = '',
  label = '',
  value = 0,
) => {
  // google analytics context
  const {
    gtag,
  } = useContext({
    gtag: () => { },
  });

  useEffect(() => {
    if (gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  }, [gtag, action, category, label, value]);
};

export const useGoogleAds = (
  adSlot,
  adSize,
  adFormat,
  adTargeting,
  adLifetime,
  adLifetimeUnit,
) => {
  const {
    gtag,
  } = useContext({
    gtag: () => { },
  });

  useEffect(() => {
    if (gtag) {
      gtag('event', 'ad_slot', {
        event_category: 'ad_slot',
        event_label: adSlot,
        value: adSize,
      });
      gtag('event', 'ad_format', {
        event_category: 'ad_format',
        event_label: adFormat,
        value: adSize,
      });
      gtag('event', 'ad_targeting', {
        event_category: 'ad_targeting',
        event_label: adTargeting,
        value: adSize,
      });
      gtag('event', 'ad_lifetime', {
        event_category: 'ad_lifetime',
        event_label: adLifetime,
        value: adSize,
      });
      gtag('event', 'ad_lifetime_unit', {
        event_category: 'ad_lifetime_unit',
        event_label: adLifetimeUnit,
        value: adSize,
      });
    }
  }, [gtag, adSlot, adSize, adFormat, adTargeting, adLifetime, adLifetimeUnit]);
};

// export const useShopify = (
//   productId,
//   productName,
//   productPrice,
//   productQuantity,
//   productVariant,
//   productCategory,
//   productPosition,
//   productCoupon,
//   productVariantId,
//   productVariantTitle,
//   productVariantPrice,
//   productVariantQuantity,
//   productVariantSku,
//   productVariantPosition,
//   productVariantCoupon,
//   productVariantImage,
// ) => {

// }

// ========================================================================== //
// Forms
// ========================================================================== //
export const useFormValidation = (initialState, validationSchema) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (event) => {
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
// Gesture hooks
// ========================================================================== //
export const useClickDrag = (container) => {
  const slider = document.getElementsByClassName(container);
  let isDown = false;
  let startX;
  let scrollLeft;
  Object.keys(slider).map((elem) => {
    elem = slider[elem];

    elem.addEventListener('mousedown', (e) => {
      isDown = true;
      elem.classList.add('click-active');
      startX = e.pageX - elem.offsetLeft;
      scrollLeft = elem.scrollLeft;
    });
    elem.addEventListener('mouseleave', () => {
      isDown = false;
      elem.classList.remove('click-active');
    });
    elem.addEventListener('mouseup', () => {
      isDown = false;
      elem.classList.remove('click-active');
    });
    elem.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      e.stopPropagation();
      const x = e.pageX - elem.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      elem.scrollLeft = scrollLeft - walk;
    });
  });
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
const validationTypes = {
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

export const useFormStore = (formName = 'testForm', fieldName = 'text', stateDefaultValue = false, validationType) => {
  const [input, setFormInput] = useState(stateDefaultValue || useStore((state) => state[formName][fieldName]));
  const changeFormData = useStore((state) => state[formName].methods.changeFormData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`New Form Input: ${input} for form ${formName}`);

    // test input for errors

    yup.string(validationTypes[validationType]).validate(input, { abortEarly: false, strict: true })
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

    changeFormData({ [fieldName]: input });
  }, [input]);

  return [input, setFormInput, error];
};

export const useFormStoreNoValidation = (formName = 'testForm', fieldName = 'text', stateDefaultValue = false) => {
  const [input, setFormInput] = useState(stateDefaultValue || useStore((state) => state[formName][fieldName]));
  const changeFormData = useStore((state) => state[formName].methods.changeFormData);
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`New Form Input: ${input} for form ${formName}`);

    changeFormData({ [fieldName]: input });
  }, [input]);

  return [input, setFormInput];
};
// ========================================================================== //
// Force re render
// ========================================================================== //
export const forceUpdate = () => React.useReducer(() => ({}))[1];

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

export const useScrollControl = (ref, children) => {
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

export const useScrollSnappedChildren = () => {
  const bindGestureHandler = useGesture({
    onDrag: ({ args: [ref], down, delta }) => {
      const { scrollTop, scrollLeft } = ref.current;
      const {
        scrollHeight, offsetHeight, scrollWidth, offsetWidth,
      } = ref.current;
      const isScrolled = scrollTop + offsetHeight >= scrollHeight;
      const isScrolledUp = scrollTop <= 0;
      const isScrolledDown = scrollTop + offsetHeight >= scrollHeight;
      const isScrolledLeft = scrollLeft <= 0;
      const isScrolledRight = scrollLeft + offsetWidth >= scrollWidth;
      if (isScrolledUp && down) {
        ref.current.scrollTop = scrollTop + delta[1];
      }
      if (isScrolledDown && down) {
        ref.current.scrollTop = scrollTop + delta[1];
      }
      if (isScrolledLeft && down) {
        ref.current.scrollLeft = scrollLeft + delta[0];
      }
      if (isScrolledRight && down) {
        ref.current.scrollLeft = scrollLeft + delta[0];
      }
    },
    onScroll: ({ args: [ref], down, delta }) => {
      const { scrollTop, scrollLeft } = ref.current;
      const {
        scrollHeight, offsetHeight, scrollWidth, offsetWidth,
      } = ref.current;
      const isScrolled = scrollTop + offsetHeight >= scrollHeight;
      const isScrolledUp = scrollTop <= 0;
      const isScrolledDown = scrollTop + offsetHeight >= scrollHeight;
      const isScrolledLeft = scrollLeft <= 0;
      const isScrolledRight = scrollLeft + offsetWidth >= scrollWidth;
      if (isScrolledUp && down) {
        ref.current.scrollTop = scrollTop + delta[1];
      }
      if (isScrolledDown && down) {
        ref.current.scrollTop = scrollTop + delta[1];
      }
      if (isScrolledLeft && down) {
        ref.current.scrollLeft = scrollLeft + delta[0];
      }
      if (isScrolledRight && down) {
        ref.current.scrollLeft = scrollLeft + delta[0];
      }
    },
  });

  // const addChild = useIntersectionObserver({
  //   handler: (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('scroll-snapped');
  //       } else {
  //         entry.target.classList.remove('scroll-snapped');
  //       }
  //     });
  //   },
  //   options: {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.5,
  //   },
  // });

  const refs = React.useRef([]);
  const addNode = React.useCallback((node) => {
    console.log(node);
    return refs.current.push(node);
  }, []);

  // add gesture handler to all added chilren
  useEffect(() => {
    // bindGestureHandler to components referenced in refs
    refs.current.map((ref) => {
      const child = ref.current;
      if (child) { child.props = { ...child.props, ...bindGestureHandler(child) }; }
    });
    console.log(refs.current);
  }, [refs]);

  return addNode;
};

// ========================================================================== //
// Local storage, cookies, session storage, global state (mobX)
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
export const useEventListener = (eventName, handler, element = typeof window !== 'undefined' && window || '') => {
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
    () => { },
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

// hook
export const useDisableScroll = () => {
  if (typeof window === 'undefined') return;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useLayoutEffect(() => {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    if (!scrollEnabled) {
      window.onscroll = () => {
        window.scrollTo(scrollLeft, scrollTop);
      };
    } else {
      window.onscroll = () => { };
    }

    return () => { window.onscroll = () => { }; };
  }, [scrollEnabled]);

  return [scrollEnabled, setScrollEnabled];
};

// Hook
export const useLockBodyScroll = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    if (!scrollEnabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    // Re-enable scrolling when component unmounts
    // eslint-disable-next-line no-return-assign
    return () => (document.body.style.overflow = originalStyle);
  }, [scrollEnabled]); // Empty array ensures effect is only run on mount and unmount

  return [scrollEnabled, setScrollEnabled];
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

// random util functions
function getRelativePointerPosition(node) {
  // the function will return pointer position relative to the passed node
  const transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  const pos = node.getStage().getPointerPosition();

  // now we find relative point
  return transform.point(pos);
}

function zoomStage(stage, scaleBy) {
  const oldScale = stage.scaleX();

  const pos = {
    x: stage.width() / 2,
    y: stage.height() / 2,
  };
  const mousePointTo = {
    x: pos.x / oldScale - stage.x() / oldScale,
    y: pos.y / oldScale - stage.y() / oldScale,
  };

  const newScale = Math.max(0.05, oldScale * scaleBy);

  const newPos = {
    x: -(mousePointTo.x - pos.x / newScale) * newScale,
    y: -(mousePointTo.y - pos.y / newScale) * newScale,
  };

  const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

  stage.to({
    x: newAttrs.x,
    y: newAttrs.y,
    scaleX: newAttrs.scale,
    scaleY: newAttrs.scale,
    duration: 0.1,
  });
}

function limitAttributes(stage, newAttrs) {
  const box = stage.findOne('Image').getClientRect();
  const minX = -box.width + stage.width() / 2;
  const maxX = stage.width() / 2;

  const x = Math.max(minX, Math.min(newAttrs.x, maxX));

  const minY = -box.height + stage.height() / 2;
  const maxY = stage.height() / 2;

  const y = Math.max(minY, Math.min(newAttrs.y, maxY));

  const scale = Math.max(0.05, newAttrs.scale);

  return { x, y, scale };
}

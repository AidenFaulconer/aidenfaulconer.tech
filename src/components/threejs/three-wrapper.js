/*  */ import React, {
  Suspense,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/web";
import "./styles.css";
import theme from "./theme.js";

// Canvas contents are loaded through an async split bundle
import Canvas from "./Canvas.js";
import { GlobalStore } from "../../layout/layout";
import { useAnimations } from "drei";

//reference for the data passed into this 3d experience
export const textureRefs = [];
export const ThreeWrapper = React.memo(
  ({ ThreeJsExperience, theme, threejsContext, blogContext, SET_THREEJS }) => {
    const {
      data: {},
    } = useStaticQuery();

    //#region configure context
    const [pageContext, setPageContext] = useState(processedData);
    useEffect(() => {
      SET_THREEJS({
        x: x,
        current: 0,
        blogHeroImages: blogContext[0].heroImage,
        blogThemes: blogContext[0].theme,
      });
      alert(JSON.stringify(threejsContext, null, ""));
    }, [threejsContext]);
    //#endregion configure context

    //#region react-spring animation spring works on one property at a time
    const [{ x }, set] = useSpring(() => ({
      //when we pass an object through set, it updates this to property and puts the old property in the from object, for internal interpolation
      to: { x: "#fff" },
      //tells spring what the values mean, and what they should start with
      from: { color: "#fff" },
      //tell spring how the transition should be smoothed between values
      delay: "100",
      config: {
        mass: 5,
        tension: 500,
        friction: 50,
        precision: 0.0001,
      },
    }));
    //#endregion react-spring animation spring works on one property at a time

    // set hot swappable threejs experience
    const canvasRef = useRef(null);
    const [_threejsExperience, setThreejsExperience] = useState(null);

    useEffect(() => {
      if (typeof window !== "undefined" && _threejsExperience == null) {
        setThreejsExperience(new ThreejsExperience(canvasRef.current)); //Instantiate passed down react three fiber component
        window.addEventListener("close", () => ThreejsExperience(null)); // delete allocated memory for three.js https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Delete_in_strict_mode
      }
    }, []);

    // process animation data from blender if the expereince uses it
    //** checklist */
    // *boned
    // *skinned
    //*switch over to physi.js **reference: https://codepen.io/matthewmain/pen/YJwoVy**
    //*exproted to gltf/glb
    // const { actions } = useAnimations(animations, group);
    useEffect(
      () => {
        actions.play();
      },
      [
        /**event trigger */
      ]
    );

    //add scroll data
    //*

    return (
      typeof window !== "undefined" &&
      threejsContext && (
        <a.div class="container" style={{ background: x }}>
          <Suspense fallback={<a.h1 className="m-auto">loading...</a.h1>}>
            <ThreejsExperience
              theme={theme}
              x={x}
              SET_THREEJS={SET_THREEJS}
              threejsContext={threejsContext}
              set={set}
              ref={canvasRef}
              id="canvas"
            />
          </Suspense>
        </a.div>
      )
    );
  }
);

import { connect } from "react-redux";
import { useStaticQuery } from "gatsby";
export default connect(
  ({ threejsContext, blogContext, theme }) => ({
    threejsContext,
    blogContext,
    theme,
  }),
  ({ SET_THREEJS, SET_USER_DATA }) => ({ SET_THREEJS, SET_USER_DATA })
)(ThreeWrapper);

// TODO: these are ideal expansions we can explore on this site or future sites
// material click ripple https://github.com/samthor/rippleJS
// see this guys shit https://codepen.io/jakob-e
// allow zoom in of photos https://github.com/sparanoid/lightense-images
// add mobile pushbar https://github.com/oncebot/pushbar.js
// add magnifying glass https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
// add a library of shaders for further configuration
// tilt hover https://tympanus.net/codrops/2016/11/23/tilt-hover-effects/
// add es6 post processing modules
// consider position aware css https://css-tricks.com/direction-aware-hover-effects/
// ass a vr manager to reconfigure and handle a change from vr to normality
// https://github.com/abberg/three-volumetric-light/blob/master/advanced/main.js
// add this effect: https://codepen.io/AlainBarrios/full/jOOKWNX
// water noise shader https://codepen.io/AlainBarrios/pen/NWKaxNW
// displacement map transition https://codepen.io/AlainBarrios/pen/NQWzzz
// interactive particles https://codepen.io/AlainBarrios/pen/PvazpL
// fullscreen transition https://codepen.io/AlainBarrios/pen/YbaroJ
// mouse filters https://codepen.io/AlainBarrios/pen/KjpLLg
// resize on mouse hover https://codepen.io/AlainBarrios/pen/JwdavW
// magnetic repulsion https://codepen.io/AlainBarrios/pen/gywPVx
// 3d carousel https://codepen.io/AlainBarrios/pen/qBBGjKE

// circular menu https://codepen.io/AlainBarrios/pen/pKwdQq
// file upload https://codepen.io/AlainBarrios/pen/XBoxee
// particle slider https://codepen.io/cjp/pen/MGwPMb
// image transition https://codepen.io/zadvorsky/pen/PNXbGo
// slider https://codepen.io/veronicadev/pen/yjgjvL

// https://codepen.io/clarklab/pen/ByWjxy
// slider https://codepen.io/ReGGae/pen/povjKxV?editors=0010

// AOS
// https://www.npmjs.com/package/aos

// https://github.com/lhbzr/bruno-arizio/

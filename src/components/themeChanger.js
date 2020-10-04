import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useReducer
} from "react";
import styled from "@emotion/styled";
import { InlineIcon } from "@iconify/react";
import nightIcon from "@iconify/icons-ic/baseline-bedtime";
import dayIcon from "@iconify/icons-ic/baseline-wb-sunny";
import { GlobalStore } from "./layout.js";

const ThemeSwitch = styled.div`
  border-radius: ${props => props.theme.corners.borderRadius3};
  background: ${props=>props.colorSwap ?
    props.theme.colors.textSecondary :
    props.theme.colors.textPrimary};
  height: 22px;
  width: 65px;
  position: relative;
  margin: auto 0px;

  display: none;
  visibility: hidden;
  ${props =>
    props.theme.breakpoints.xl(`
  display: block;
  visibility: visible;
  `)}

  & label {
    width: 100%;
    position: relative;
    height: 100%;
    background: transparent;
    margin: auto;
    ${props => props.theme.transitions.primary("margin-left")};

    & svg {
      border-radius: ${props => props.theme.corners.borderRadius100};
      position: absolute;
      color: ${props=>props.colorSwap ?
        props.theme.colors.textPrimary :
        props.theme.colors.textSecondary};
      height: 15px;
      width: 15px;
      top: 3.5px;
      ${props => props.theme.transitions.primary("left")};
    }
    & .active {
      left: 10%;
    }
    & .inactive {
      left: 70%;
    }
  }

  & input {
    opacity: 0;
  }
`;

export default ({ toggleTheme, colorSwap }) => {
  const { setThemeState, themeState } = useContext(GlobalStore); // consume and use method declared in layout to change theme

  return (
    <ThemeSwitch colorSwap={colorSwap}>
      <label>
        <input
          type="checkbox"
          checked={themeState === "dark"}
          onChange={e => {
            setThemeState(e.target.checked ? "dark" : "light");
          }}
        />
        <InlineIcon
          className={themeState !== "dark" ? "active" : "inactive"}
          icon={themeState !== "dark" ? dayIcon : nightIcon}
        />
      </label>
    </ThemeSwitch>
  );
};

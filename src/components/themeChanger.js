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
  background: ${props => props.theme.colors.black};
  height: 25px;
  width: 75px;
  position: relative;
  margin: auto 0px;

  & label {
    display: block;
    top: 5px;
    width: 100%;
    background: transparent;
    margin: auto;
    ${props => props.theme.transitions.primary("margin-left")};
  }

  & label.active {
    ${props => props.theme.transitions.primary("margin-left")};
    position: relative;
    border-radius: 100%;
    margin-left: 6.25px;
  }
  & label.inactive {
    ${props => props.theme.transitions.primary("margin-left")};
    position: relative;
    border-radius: 100%;
    margin-left: 50px;
  }

  & svg {
    border-radius: ${props => props.theme.corners.borderRadius100};
    position: absolute;
    display: inline-block;
    color: ${props => props.theme.colors.foreground};
    height: 20px;
    width: 20px;
    top: -2px;
    left: 0px;
  }

  & input {
    opacity: 0;
  }
`;

export default ({ toggleTheme }) => {
  const { setThemeState, themeState } = useContext(GlobalStore); // consume and use method declared in layout to change theme

  return (
    <ThemeSwitch>
      <label className={themeState !== "dark" ? "active" : "inactive"}>
        <input
          type="checkbox"
          onChange={e => {
            setThemeState(e.target.checked ? "dark" : "light");
          }}
        />
        <InlineIcon icon={themeState !== "dark" ? dayIcon : nightIcon} />
      </label>
    </ThemeSwitch>
  );
};

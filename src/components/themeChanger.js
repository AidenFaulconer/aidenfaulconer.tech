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
  height: 22px;
  width: 65px;
  position: relative;
  margin: auto 0px;

  & label {
    width: 100%;
    position: relative;
    height: auto;
    background: transparent;
    margin: auto;
    ${props => props.theme.transitions.primary("margin-left")};
  }

  & svg {
    border-radius: ${props => props.theme.corners.borderRadius100};
    position: absolute;
    display: inline-block;
    color: ${props => props.theme.colors.foreground};
    height: 15px;
    top: 3.75px;
    width: 15px;
    ${props => props.theme.transitions.primary("left")};
  }
  & .active {
    left: 5px;
  }
  & .inactive {
    left: 47px;
  }

  & input {
    opacity: 0;
  }
`;

export default ({ toggleTheme }) => {
  const { setThemeState, themeState } = useContext(GlobalStore); // consume and use method declared in layout to change theme

  return (
    <ThemeSwitch>
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

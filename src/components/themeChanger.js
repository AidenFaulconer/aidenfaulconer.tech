import React, { useState } from "react";
import styled from "@emotion/styled";
import { InlineIcon } from "@iconify/react";
import nightIcon from "@iconify/icons-ic/baseline-bedtime";
import dayIcon from "@iconify/icons-ic/baseline-wb-sunny";
import { globalThemeState } from "./layout";

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
    border-radius: ${props=>props.theme.corners.borderRadius100};
    position: absolute;
    display: inline-block;
    color: ${props=>props.theme.colors.foreground};
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
  const [checked, checkInput] = useState(globalThemeState !== "dark");
  return (
    <ThemeSwitch>
      <label className={checked ? "active" : "inactive"}>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => {
            checkInput(!checked);
            toggleTheme(checked);
          }}
        />
        <InlineIcon icon={checked ? dayIcon : nightIcon} />
      </label>
    </ThemeSwitch>
  );
};

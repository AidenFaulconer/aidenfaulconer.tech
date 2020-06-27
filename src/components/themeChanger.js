import React, { useState } from "react";
import styled from "@emotion/styled";
import { globalThemeState } from "./layout";

const ThemeSwitch = styled.div`
  border-radius: ${props => props.theme.corners.borderRadius3};
  background: ${props => props.theme.colors.textColor};
  box-shadow: ${props => props.theme.shadows.primary};
  height: 20px;
  width: 65px;
  margin: auto;

  & label {
    display: block;
    background: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.primary};
    height: 12px;
    width: 12px;
    top: 3px;
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
    margin-left: 46.75px;
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
{" "}
      </label>
    </ThemeSwitch>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./headerButton.module.scss";
import { classNames } from "../../../../helpers/classnames";

interface IHeaderButtonProps {
  value: string;
  onClick?: any;
  to: string;
}

export const HeaderButton = ({ to, value, onClick, ...props }: IHeaderButtonProps & Record<string, any>) => {
  return (
    <NavLink className={classNames(styles.button, {}, ["headerNavButton"])} onClick={onClick} {...props} to={to}>
      {value}
    </NavLink>
  );
};

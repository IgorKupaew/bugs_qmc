import React from "react";

import LogoIcon from "../../../assets/icons/LogoIcon";
import { RoutePath } from "../../../config/routeConfig/routeConfig";
import { HeaderButton } from "../../kit/headerButton/ui/HeaderButton";
import { navLinks } from "../config";
import styles from "../header.module.scss";
import { Link } from "react-router-dom";

const ListElements = Object.keys(navLinks).map((link) => {
  return <HeaderButton value={navLinks[link]} to={`${RoutePath[link]}`} key={link} />;
});

const items = ListElements.map((el, index) => {
  return { label: el, key: index };
});

const RightSide = () => {
  return (
    <div className={styles.rightSide}>
      <div className={styles.logo}>
        <Link to={"/"}>
          <LogoIcon />
        </Link>
      </div>
      <nav className={styles.nav}>{ListElements}</nav>
    </div>
  );
};

export default RightSide;

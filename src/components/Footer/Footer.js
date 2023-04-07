import React from "react";
import useStyles from "./Footer.style";
import { Link } from "react-router-dom";
import {
  CONTACT_PAGE,
  PEOPLE_PAGE,
  H0ME_PAGE, ABOUT_PAGE,
} from "../../RoutePath/RoutePath";


function Footer(props) {
  const styles = useStyles();
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIconsContainer}>
        <span
          className={`${styles.socialIcon} ${styles.fb}`}
        ></span>
        <span
          className={`${styles.socialIcon} ${styles.insta}`}
        ></span>
        <span
          className={`${styles.socialIcon} ${styles.twitterr}`}
        ></span>
        <span
          className={`${styles.socialIcon} ${styles.linkedinn}`}
        ></span>
      </div>
      <ul className={styles.footerMenuContainer}>
        <li className={styles.menuItem}>
          <Link className={styles.link} to={H0ME_PAGE}>
            Post
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link className={styles.link} to={PEOPLE_PAGE}>
            People
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link className={styles.link} to={ABOUT_PAGE}>
            About
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link className={styles.link} to={CONTACT_PAGE}>
            Contact
          </Link>
        </li>
      </ul>
      <span>&copy; 2023,Artashes Blbuljan, Vahe Rubinyan, Arman Papyan, </span>
    </footer>
  );
}

export default Footer;

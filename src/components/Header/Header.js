import React, { useState } from "react";
import { useHeaderStyles } from "./Header.styles";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {
  H0ME_PAGE,
  USER_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  ABOUT_PAGE,
  CONTACT_PAGE,
} from "../../RoutePath/RoutePath";
import { endSession, getSession, isLoggedIn } from "../../storage/session";
import LogoutDialog from "../LogoutDialog";
import logo from "../../imgs/logo.png";

function Header(props) {
  const [logoutDialogStatus, setLogoutDialogStatus] = useState(false);
  const refresh = () => window.location.reload(true);

  const location = useLocation();

  let navigate = useNavigate();
  const onLogout = () => {
    endSession();
    setLogoutDialogStatus(false);
    navigate(H0ME_PAGE);
    refresh();
  };
  const openLogoutDialog = () => {
    setLogoutDialogStatus(true);
  };
  const closeLogoutDialog = () => {
    setLogoutDialogStatus(false);
  };

  const styles = useHeaderStyles();
  const [headerBtnClickChange, setHeaderBtnClickChange] = useState(false);
  const onClickBtnStatusChange = () => {
    setHeaderBtnClickChange(!headerBtnClickChange);
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header__inner}>
            <nav className={styles.nav}>
              <ul className={styles.links}>
                <li>
                  <Link to={H0ME_PAGE} className={styles.navLink}>
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.navLink}>

                  People
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.navLink}>

                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.navLink}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <img className={styles.logo} src={logo} />

            <div className={styles.rightBlock}>
              {!isLoggedIn() ? (
                <Link
                  to={LOGIN_PAGE}
                  className={`${styles.loginButton} ${styles.aLink}`}
                >
                  Login
                </Link>
              ) : (
                <>
                  <a
                    onClick={openLogoutDialog}
                    className={`${styles.logoutButton} ${styles.aLink}`}
                  >
                    Logout
                  </a>
                  <Link className={styles.userBlock} to={USER_PAGE}>
                    <CiUser className={styles.userIcon} />
                  </Link>
                </>
              )}
              <LogoutDialog
                onLogout={onLogout}
                logoutDialogStatus={logoutDialogStatus}
                closeLogoutDialog={closeLogoutDialog}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;

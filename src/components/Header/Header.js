import React, { useState } from "react";
import { useHeaderStyles } from "./Header.styles";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {
  H0ME_PAGE,
  USER_PAGE,
  LOGIN_PAGE,
  PEOPLE_PAGE, ABOUT_PAGE, CONTACT_PAGE,
} from "../../RoutePath/RoutePath";
import { endSession, isLoggedIn } from "../../storage/session";
import LogoutDialog from "../LogoutDialog";
import logo from "../../imgs/logo.png";

function Header() {
  const [logoutDialogStatus, setLogoutDialogStatus] = useState(false);
  const refresh = () => window.location.reload(true);

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
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={PEOPLE_PAGE} className={styles.navLink}>
                    People
                  </Link>
                </li>
                <li>
                  <Link to={ABOUT_PAGE} className={styles.navLink}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to={CONTACT_PAGE} className={styles.navLink}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <img className={styles.logo} src={logo} alt="name" />

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
                  <span
                    onClick={openLogoutDialog}
                    className={`${styles.logoutButton} ${styles.aLink}`}
                  >
                    Logout
                  </span>
                  <Link
                    className={`${styles.userBlock} ${styles.userblockOther}`}
                    to={USER_PAGE}
                  >
                    <CiUser className={styles.userIcon} />
                  </Link>
                </>
              )}
            </div>
            <div className={styles.ToggleBtn}>
              {isLoggedIn() && (
                <Link className={styles.userBlock} to={USER_PAGE}>
                  <CiUser className={styles.userIcon} />
                </Link>
              )}
              <i
                onClick={onClickBtnStatusChange}
                className="fa-solid fa-bars"
              ></i>
            </div>
            {headerBtnClickChange && (
              <div className={styles.dropdownMenu}>
                <li>
                  <Link
                    className={`${styles.aLink} ${styles.dropdownMenuLi}`}
                    to={H0ME_PAGE}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                      className={`${styles.aLink} ${styles.dropdownMenuLi}`}
                      to={PEOPLE_PAGE}
                  >
                    People
                  </Link>
                </li>
                <li>
                  <Link
                      className={`${styles.aLink} ${styles.dropdownMenuLi}`}
                      to={ABOUT_PAGE}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                      className={`${styles.aLink} ${styles.dropdownMenuLi}`}
                      to={CONTACT_PAGE}
                  >
                    Contact
                  </Link>
                </li>
                  <li>
                {/*  test*/}

                  <div className={styles.toolbarLoginBlock}>
                    {!isLoggedIn() ? (
                        <Link
                            to={LOGIN_PAGE}
                            className={`${styles.loginButton1} ${styles.aLink}`}
                        >
                          Login
                        </Link>
                    ) : (
                        <>
                  <span
                      onClick={openLogoutDialog}
                      className={`${styles.logoutButton1} ${styles.aLink}`}
                  >
                    Logout
                  </span>
                        </>
                    )}
                  </div>


                {/*  test*/}
                </li>

              </div>
            )}
          </div>
        </div>
      </header>
      {logoutDialogStatus && (
        <LogoutDialog
          onLogout={onLogout}
          logoutDialogStatus={logoutDialogStatus}
          closeLogoutDialog={closeLogoutDialog}
        />
      )}
    </>
  );
}
export default Header;

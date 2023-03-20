import React, {useState} from 'react';
import usStyle from './Header.style'
import {Link, useNavigate} from "react-router-dom";
import {H0ME_PAGE,USER_PAGE,LOGIN_PAGE,REGISTER_PAGE, ABOUT_PAGE,CONTACT_PAGE} from'../../RoutePath/RoutePath'
import { endSession, getSession, isLoggedIn } from "../../storage/session";
import LogoutDialog from "../LogoutDialog";

function Header(props) {
    const [logoutDialogStatus,setLogoutDialogStatus]=useState(false)

    let navigate = useNavigate();
    const onLogout = () => {
        endSession();
        setLogoutDialogStatus(false)
        navigate(H0ME_PAGE);
    };
    const openLogoutDialog = ()=>{
        setLogoutDialogStatus(true)
    }
    const closeLogoutDialog = ()=>{
        setLogoutDialogStatus(false)
    }

  const styles = usStyle()
   const[headerBtnClickChange,setHeaderBtnClickChange] = useState(false)
    const onClickBtnStatusChange = ()=> {
        setHeaderBtnClickChange(!headerBtnClickChange)
    }
    return (
        <>

       <header className={styles.classHeader} >
           <div className={styles.navbar}>
               <div className={styles.logo}>
                   <Link className={`${styles.aLink} ${styles.navbarLogoLink}`} to={H0ME_PAGE}> Aca travel</Link>
               </div>
               <ul className={styles.navbarLinks}>
                   <li><Link className={`${styles.aLink} ${styles.navbarLink}`}to={H0ME_PAGE}>Posts</Link></li>
                   <li><Link className={`${styles.aLink} ${styles.navbarLink}`} to={USER_PAGE}>User Page</Link></li>
                   <li><Link className={`${styles.aLink} ${styles.navbarLink}`} to={CONTACT_PAGE}>Contact</Link></li>
                   <li><Link className={`${styles.aLink} ${styles.navbarLink}`} to={ABOUT_PAGE}>About</Link></li>
               </ul>
               {
                   !isLoggedIn() ?
                       <Link to={LOGIN_PAGE}  className={`${styles.actionBtn} ${styles.aLink}`} >Login</Link>:
                       <a onClick={openLogoutDialog} className={`${styles.actionBtnLogout} ${styles.aLink}`} >Logout</a>
               }
              <div className={styles.ToggleBtn} onClick={openLogoutDialog}>
                  <i className="fa-solid fa-bars"></i>
              </div>
           </div>
           {headerBtnClickChange && <div className={styles.dropdownMenu}>
               <li><Link className={`${styles.aLink} ${styles.dropdownMenuLi}`}to={H0ME_PAGE}>Posts</Link></li>
               <li><Link className={`${styles.aLink} ${styles.dropdownMenuLi}`} to={USER_PAGE}>User Page</Link></li>
               <li><Link className={`${styles.aLink} ${styles.dropdownMenuLi}`} to={CONTACT_PAGE}>Contact</Link></li>
               <li><Link className={`${styles.aLink} ${styles.dropdownMenuLi}`}  to={ABOUT_PAGE}>About</Link></li>
               {
                   !isLoggedIn() ?
                       <Link to={LOGIN_PAGE}  className={`${styles.actionBtn} ${styles.aLink}`} >Login</Link>:
                       <a onClick={openLogoutDialog} className={`${styles.actionBtnLogout} ${styles.aLink}`} >Logout</a>
               }
           </div>}
       </header><div className={styles.container}>

        </div>
            <LogoutDialog
            onLogout={onLogout}
            logoutDialogStatus={logoutDialogStatus}
            closeLogoutDialog={closeLogoutDialog}

        />
            </>
    );
}
export default Header;
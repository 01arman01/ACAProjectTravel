import React, {useState} from 'react';
import usStyle from './Header.style'
import {Link} from "react-router-dom";
function Header(props) {
  const styles = usStyle()
   const[headerBtnClickChange,setHeaderBtnClickChange] = useState(false)
    const onClickBtnStatusChange = ()=> {
        setHeaderBtnClickChange(!headerBtnClickChange)
    }
    return (
       <header className={styles.classHeader} >
           <div className={styles.navbar}>
               <div className={styles.logo}>
                   <a  className={`${styles.aLink} ${styles.navbarLogoLink}`} href="#"> Aca travel</a>
               </div>
               <ul className={styles.navbarLinks}>
                   <li><Link className={`${styles.aLink} ${styles.navbarLink}`}to="/homepage">Posts</Link></li>
                   <li><Link className={`${styles.aLink} ${styles.navbarLink}`} to="/user">User Page</Link></li>
                   <li><a className={`${styles.aLink} ${styles.navbarLink}`}href="">Contact</a></li>
                   <li><a className={`${styles.aLink} ${styles.navbarLink}`} href="">About</a></li>
               </ul>
              <a href='#'  className={`${styles.actionBtn} ${styles.aLink}`} >Login</a>
              <div className={styles.ToggleBtn} onClick={onClickBtnStatusChange}>
                  <i className="fa-solid fa-bars"></i>
              </div>
           </div>
           {headerBtnClickChange && <div className={styles.dropdownMenu}>
               <li><a className={`${styles.aLink} ${styles.dropdownMenuLi}`}href="/">Posts</a></li>
               <li><a className={`${styles.aLink} ${styles.dropdownMenuLi}`} href="">User Page</a></li>
               <li><a className={`${styles.aLink} ${styles.dropdownMenuLi}`}href="">Contact</a></li>
               <li><a className={`${styles.aLink} ${styles.dropdownMenuLi}`} href="">About</a></li>
               <Link to='/login'  className={`${styles.dropdownMenuActionBtn} ${styles.aLink} ${styles.actionBtn}`} >Login</Link>
           </div>}

       </header>
    );
}

export default Header;
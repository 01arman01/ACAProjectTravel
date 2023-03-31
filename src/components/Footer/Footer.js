import React from 'react';
import useStyles from "./Footer.style";
import {Link} from "react-router-dom";
import{USER_PAGE,ABOUT_PAGE,CONTACT_PAGE,PEOPLE_PAGE,H0ME_PAGE} from '../../RoutePath/RoutePath'

function Footer(props) {
    const styles  = useStyles()
    return (
        <footer className={styles.footer}>
           <div className={styles.socialIconsContainer}>
               <a href="#" target="_blank" className={`${styles.socialIcon} ${styles.fb}`}></a>
               <a href="#" target="_blank" className={`${styles.socialIcon} ${styles.insta}`}></a>
               <a href="#" target="_blank" className={`${styles.socialIcon} ${styles.twitterr}`}></a>
               <a href="#" target="_blank" className={`${styles.socialIcon} ${styles.linkedinn}`}></a>
           </div>
            <ul className={styles.footerMenuContainer}>
                <li className={styles.menuItem}><Link className={styles.link} to={H0ME_PAGE}>Post</Link></li>
                <li className={styles.menuItem}><Link className={styles.link}  to={PEOPLE_PAGE}>People</Link></li>
                <li className={styles.menuItem}><Link className={styles.link}  to={'/'}>About</Link> </li>
                <li className={styles.menuItem}><Link className={styles.link} to={CONTACT_PAGE}>Contact</Link></li>
            </ul>
            <span>&copy; 2023,Artashes Blbuljan, Vahe Rubinyan, Arman Papyan,  </span>
        </footer>
    );
}

export default Footer;
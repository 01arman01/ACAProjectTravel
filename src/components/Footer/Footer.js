import React from 'react';
import useStyles from "./Footer.style";
import {Link} from "react-router-dom";


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
                <li className={styles.menuItem}><Link className={styles.link} to={'/'}>Post</Link></li>
                <li className={styles.menuItem}><Link className={styles.link}  to={'/'}>People</Link></li>
                <li className={styles.menuItem}><Link className={styles.link}  to={'/'}>About</Link> </li>
                <li className={styles.menuItem}><Link className={styles.link} to={'/'}>Contact</Link></li>
            </ul>
            <span>&copy; 2023,Artashes Blbuljan, Vahe Rubinyan, Arman Papyan,  </span>
        </footer>
    );
}

export default Footer;
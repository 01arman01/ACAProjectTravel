import { useContactStyles } from "./Contactc.style";
import contact from "../../imgs/contact.jpg";
import phoneLogo from "../../imgs/phone_logo.png";

export default function Main() {
  //styles
  const styles = useContactStyles();

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.contactInner}>
          <div className={styles.leftBlock}>
            <img src={contact} className={styles.contactImg} alt=""/>
            <div className={styles.info}>
              <p className={styles.infoText}>
                Comfort produce husband boy her had hearing. Law others theirs
                passed but wishes. You day real less till dear read. Considered
                use dispatched melancholy sympathize discretion led.
              </p>
            </div>
          </div>
          <div className={styles.rightBlock}>
            <h2 className={styles.contactTitle}>Contact Us</h2>
            <div className={styles.contactText}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. ​Ut
              enim ad minim veniam aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <div className={styles.phone}>
              <div className={styles.phoneLogo}>
                <img src={phoneLogo} alt="" style={{width:"43px", height:"43px"}}/>
              </div>
              <div className={styles.phoneContent}>
                <p className={styles.contentTitle}>Call Us Anytime</p>
                <p className={styles.phoneNumbers}>+374 99-99-99-99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

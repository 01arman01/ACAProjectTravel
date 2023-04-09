import { Link } from "react-router-dom";
import { REGISTER_PAGE } from "../../RoutePath/RoutePath";
import { isLoggedIn } from "../../storage/session";
import { useAboutStyles } from "./About.style";

export default function Main() {
  //styles
  const styles = useAboutStyles();

  return (
    <div className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.introInner}>
          <div className={styles.introTitle}>About us</div>
          <p className={styles.introText}>
            Founded in 2016 (part of Emerging Travel Group, est 2010) and
            created for travel market professionals, RateHawk has become one of
            the fastest-growing platforms for B2B industry players. An
            innovative and reliable partner for tens of thousands of travel
            agents, tour operators, and corporate clients.
          </p>
          {!isLoggedIn() ? (
            <Link to={REGISTER_PAGE} className={styles.registerButton}>
              Register
            </Link>
          ) : (
            <Link to="/" className={styles.learnButton}>
              Go to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

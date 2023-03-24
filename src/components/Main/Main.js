import { useMainStyles } from "./Main.styles";
import { CgArrowLongDown } from "react-icons/cg";
import { Link } from "react-router-dom";
import { REGISTER_PAGE } from "../../RoutePath/RoutePath";
import { isLoggedIn } from "../../storage/session";

export default function Main() {
  //styles
  const styles = useMainStyles();
  const refresh = () => window.location.reload(true)
  return (
    <div className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.introInner}>
          <div className={styles.introTitle}>
            it՚s a big world out there , go explore
          </div>
          <p className={styles.introText}>
            Scroll through the page and see people՚s journeys to interesting
            places
            <span>
              <CgArrowLongDown className={styles.arrowIcon} />
            </span>
          </p>
          {!isLoggedIn() ? (
            <Link to={REGISTER_PAGE} className={styles.registerButton}>
              Register
            </Link>
          ) : (
            <Link to="/" className={styles.learnButton}>
              Learn more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

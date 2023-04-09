import { useMainStyles } from "../Main/Main.styles";
import { CgArrowLongDown } from "react-icons/cg";
import { Link } from "react-router-dom";
import { REGISTER_PAGE } from "../../RoutePath/RoutePath";
import { isLoggedIn } from "../../storage/session";

export default function Main() {
    //styles
    const styles = useMainStyles();

    return (
        <div className={styles.intro}>
            <div className={styles.container}>
                <div className={styles.introInner}>
                    <div className={styles.introTitle}>
                        About us
                    </div>
                    <p className={styles.introText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum
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
                            Go to Home
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

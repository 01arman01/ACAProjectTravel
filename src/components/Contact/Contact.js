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
                        Contacts
                    </div>
                    <p className={styles.introText}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don't look even slightly
                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                        anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the
                        Internet tend to repeat predefined chunks as necessary, making this the first true generator on
                        the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
                        sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
                        is therefore always free from repetition, injected humour, or non-characteristic words etc.
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

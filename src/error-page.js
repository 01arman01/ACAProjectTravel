import {useRouteError} from "react-router-dom";
// import {Container, Typography} from "@mui/material";
import Header from "./components/Header/Header";
import {useStyles} from './error-page.style'

export default function ErrorPage() {
    const styles = useStyles()
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <Header/>
            <div className={styles.hitTheFloor}>404</div>
            <p className={styles.text}>The page does not exist on the server at the URL you specified.</p>
        </>
    );
}
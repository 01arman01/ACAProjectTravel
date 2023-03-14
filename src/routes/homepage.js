import CardComponent from "../components/CardComponent/CardComponent";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    hompageMain: {
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap'
    }
})


export default function Homepage(props) {
    const styles = useStyles()
    return (
        <div className={styles.hompageMain}>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
        </div>
    );
}
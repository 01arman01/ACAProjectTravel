import React from 'react';
import  {useHeaderStyles} from  './About.style'

function About(props) {
    const styles = useHeaderStyles()
    return (
        <div
        className={styles.aboutMainContainer}
        >About page</div>
    );
}

export default About;
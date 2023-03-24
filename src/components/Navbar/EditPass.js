import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from "./Navbar.style";

function EditPass(props) {
    const styles = useStyles()
    return (

        <div className={styles.passChangeContainer}>
            <TextField
                style={{
                    margin:'5px auto',
                }}
                id="outlined-password-input"
                label="Current password"
                type="password"
                autoComplete="current-password"
            />
            <TextField
                style={{
                    margin:'5px auto',
                }}
                id="outlined-password-input"
                label="New password"
                type="password"
                autoComplete="current-password"
            />
            <TextField
                style={{
                    margin:'5px auto',
                }}
                id="outlined-password-input"
                label="Repeat password"
                type="password"
                autoComplete="current-password"
            />
           <div  style={{
               margin:'5px auto',
           }}
                 className={styles.passChangeButtonStyle}>
               <Button  variant="contained">Edit password</Button>
           </div>
        </div>
    );
}

export default EditPass;
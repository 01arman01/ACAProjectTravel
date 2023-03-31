import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from "./Navbar.style";
import {getAuth, onAuthStateChanged, updatePassword} from "firebase/auth";

// import firebase from "firebase/compat";


function EditPass(props) {

    const [userPasswordText, setUserPasswordText] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')

    // console.log(user)
    // console.log('aaaaaaaaa')
    const onChangeUserPasswordText = (e) => {
        setUserPasswordText(e.target.value)
    }
    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const onChangeRepeatNewPassword = (e) => {
        setRepeatNewPassword(e.target.value)
    }
    const  changePassword= async ()=>{
        const auth = getAuth();
        await updatePassword(auth.currentUser, newPassword).then(()=>{
            alert('changed')
        }).catch(e=>{
            alert(e.message)
        });
    }


    console.log(userPasswordText)
    console.log(newPassword)
    console.log(repeatNewPassword)

    useEffect(() => {
        }, []
    )

    const styles = useStyles()
    return (
        <div className={styles.passChangeContainer}>
            <TextField
                style={{
                    margin: '5px auto',
                }}
                id="outlined-password-input"
                label="Current password"
                type="password"
                autoComplete="current-password"
                onChange={onChangeUserPasswordText}
                value={userPasswordText}
            />
            <TextField
                style={{
                    margin: '5px auto',
                }}
                id="outlined-password-input"
                label="New password"
                type="password"
                value={newPassword}
                onChange={onChangeNewPassword}
                autoComplete="current-password"
            />
            <TextField
                style={{
                    margin: '5px auto',
                }}
                id="outlined-password-input"
                label="Repeat password"
                type="password"
                autoComplete="current-password"
                value={repeatNewPassword}
                onChange={onChangeRepeatNewPassword}
            />
            <div style={{
                margin: '5px auto',
            }}
                 className={styles.passChangeButtonStyle}>
                <Button onClick={changePassword} variant="contained">Edit password</Button>
            </div>
        </div>
    );
}

export default EditPass;

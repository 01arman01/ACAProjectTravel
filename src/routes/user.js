import {endSession, getSession, isLoggedIn} from "../session";
import {useEffect} from "react";


export default function User() {

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        }

        let session = getSession();
        setEmail(session.email);

        console.log("Your access token is: " + session.accessToken);
    }, [navigate]);

    const onLogout = () => {
        endSession();
        navigate("/login");
    }
    return (
        <h1>User</h1>
    )
}
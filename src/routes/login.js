import {signInUser} from "../firebase";
import {startSession} from "../storage/session";

const onSubmit = async (event) => {



    try {
        let loginResponse = await signInUser(email, password);
        startSession(loginResponse.user);
        navigate("/user");
    } catch (error) {
        console.error(error.message);
        setError(error.message);
    }
}
export default function Login() {
    return (
        <h1>Login</h1>
    )
}
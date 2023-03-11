import {createUser} from "../firebase";
import {startSession} from "../session";

const onSubmit = async (event) => {

    // ...

    try {
        let registerResponse = await createUser(email, password);
        startSession(registerResponse.user);
        navigate("/user");
    } catch (error) {
        console.error(error.message);
        setError(error.message);
    }
}
export default function Register() {
    return (
        <h1>Register</h1>
    )
}
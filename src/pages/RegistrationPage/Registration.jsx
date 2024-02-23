import login from '../../components/Login_SignUp/Login_SignUp';
import NavBar from '../../components/NavBar/NavBar_Welcome/NavBar';

const Registration = () => {
    return (
        <>
            <NavBar />
            {login()}
        </>
    );
}

export default Registration;
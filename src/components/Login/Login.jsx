import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";


const Login = () => {
    const [logInError, setLogInError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // reset success/error message
        setLogInError('');
        setSuccess('');

        if (password.length < 6) {
            setLogInError('Password should be 6 characters or longer');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);

                if (result.user.emailVerified) {
                    setSuccess('Login Successful!');
                }
                else{
                    alert('Please verify your email first');
                }
            })
            .catch(error => {
                console.log(error);
                setLogInError(error.message);
            });
    }

    const handleForgotPassword = () => {
        const email = emailRef.current.value;

        if (!email) {
            alert('please provide an email');
            return;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please write a valid email');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Check your email to reset password');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogIn}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailRef}
                                        placeholder="email"
                                        className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name='password'
                                            placeholder="password"
                                            className="input input-bordered w-full" required />
                                        <span className="absolute top-4 right-3" onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? <FaEyeSlash></FaEyeSlash> :
                                                    <FaEye></FaEye>
                                            }
                                        </span>
                                    </div>
                                    <label className="label">
                                        <a
                                            onClick={handleForgotPassword}
                                            href="#"
                                            className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                success && <p className="text-green-600">{success}</p>
                            }
                            {
                                logInError && <p className="text-red-700">{logInError}</p>
                            }
                            <div>
                                <p>New here? <span><Link className="text-blue-600 hover:underline" to='/sign_up'>Sign Up</Link> with us</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
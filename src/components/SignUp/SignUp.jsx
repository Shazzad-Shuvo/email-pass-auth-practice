import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [signUpError, setSignUpError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checked = e.target.terms.checked;
        console.log(email, password, checked);

        // reset error/success message
        setSignUpError('');
        setSuccess('');

        // validation
        if (password.length < 6) {
            setSignUpError('Password must be at least 6 character long');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setSignUpError('Password must contain at least one uppercase character!');
            return;
        }
        else if(!checked){
            setSignUpError('Please accept our terms & conditions.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Account creation successful!')

                // update profile:
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg",
                })
                .then(() =>{
                    console.log('profile updated');
                })
                .catch(error =>{
                    console.log(error)
                })

                // send account verification mail:
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('A verification mail has been sent to your email, please verify')
                })
            })
            .catch(error => {
                console.error(error);
                setSignUpError(error.message);
            });
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSignUp}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="User Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
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
                                    <div className="mt-3 text-xs">
                                        <input className="mr-2" type="checkbox" name="terms" id="terms" />
                                        <label htmlFor="terms">
                                            Accept our <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            {
                                success && <p className="text-green-600">{success}</p>
                            }
                            {
                                signUpError && <p className="text-red-700">{signUpError}</p>
                            }
                            <div>
                                <p>Have an account? <span><Link className="text-blue-600 hover:underline" to='/login'>Log In</Link> here</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
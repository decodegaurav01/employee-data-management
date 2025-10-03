import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { login } from "../../services/user";
// import { Login as loginUser } from "../services/user"


export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const onLogin = async () => {
        if (email.length == 0)
            toast.warn('Please enter email')
        else if (password.length == 0)
            toast.warn('Please enter password')
        else {

            console.log("frontend: ", email, password)
            const result = await login(email, password)

            if (!result)
                toast.error("Please enter valid email and password")
            else {
                if (result.status == 'success') {
                    const { token, company_name, email } = result.data
                    console.log(token, company_name)
                    localStorage.setItem('company_name', company_name)
                    localStorage.setItem('token', token)
                    localStorage.setItem('email', email)



                    toast.success('Welcome to application')
                    navigate('/dashboard')

                }
            }
        }


    }
    return (

        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
                {/* <div className="flex min-h-full flex-1 flex-col justify-center w-full px-2 sm:px-8 "> */}
                <div className="p-6 sm:p-10 mx-auto w-full max-w-md bg-white shadow-lg rounded-2xl ">
                    <div className="mx-auto w-full max-w-sm">
                        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className=" sm:mt-10 mx-auto w-full max-w-sm">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-900">
                                Email address <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-3">
                                <input
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-lg font-medium text-gray-900">
                                    Password <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="mt-3">
                                <input
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                            <div className="text-lg mt-3 mb-2">

                            </div>
                        </div>
                        <div>
                            <button
                                onClick={onLogin}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="mt-2">
                            <p className="text-lg text-gray-700">
                                Create an account?{" "}
                                <Link to="/registration" className="text-indigo-600 hover:underline font-bold">
                                    Click here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>

    )
}
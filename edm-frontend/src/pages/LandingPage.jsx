import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <div className=" flex justify-center items-center bg-gray-100 min-h-screen  ">
                {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8   "> */}
                    <div className="p-10 sm:mx-auto w-full h-auto max-w-lg bg-white shadow-lg  rounded-4xl ">

                        <h1 className="text-4xl  font-bold text-gray-800 mb-2 text-center">
                            Employee Management System
                        </h1>
                        <h3 className="text-gray-600 text-center  mb-8  text-2xl">
                            Manage your company employees with ease
                        </h3>
                        <div className="flex flex-col items-center gap-3 ">
                            <Link
                                to="/login"
                                className="w-full bg-indigo-600 text-white text-2xl text-center py-3 px-4 rounded-2xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-50 focus:ring-opacity-50 mb-2"
                            >
                                Login to Dashboard
                            </Link>
                            <Link
                            to='/registration'
                            className="w-full bg-white border border-gray-300 text-gray-800 text-center text-2xl py-3 px-4 rounded-2xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
                                Create Company Account
                            </Link>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}
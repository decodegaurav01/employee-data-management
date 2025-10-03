import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify"
import { registerUser } from "../../services/user";

export function Registration() {

  // const [name, setName] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onRegister = async () => {

    if (companyName.length === 0)
      toast.warn('Please enter company name')
    else if (email.length == 0)
      toast.warn('Please enter email')
    else if (password.length == 0)
      toast.warn('Please enter password')
    else if (confirmPassword.length == 0)
      toast.warn('Please enter confirm password')
    else if (password != confirmPassword)
      toast.warn('Password and confirm password should be same')
    else {
      const result = await registerUser(companyName, email, password)

      
      if (!result)
        toast.error("Error while registration")
      else {
        if (result.status == 'success') {
          toast.success("Registration successful.....")
          navigate('/login')
        }
        else if (result.status == 'error')
          toast.error('Error while registration')
      }
    }
  }


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2 ">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100  ">
        <div className="p-5 sm:mx-auto w-auto  bg-white shadow-lg  rounded-3xl">
          <div className="mb-10">

          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <h2 className=" text-center text-4xl font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

            <div>
              <label htmlFor="company_name" className="block text-lg font-medium text-gray-900 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="company_name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  name="company_name"
                  type="text"
                  required

                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  required

                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-medium text-gray-900 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required

                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="ConfirmPassword" className="block text-lg font-medium text-gray-900 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-2 mb-5">
                <input
                  id="ConfirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="ConfirmPassword"
                  type="Password"
                  required

                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button

                onClick={onRegister}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
            <div className=" mt-2 ">
              <p className="text-lg text-gray-700">
                Already have an account?{"  "}
                <Link to='/login' className="text-indigo-600 hover:underline font-bold">
                  Click here
                </Link>
              </p>
            </div>

            {/* </form> */}


          </div>
        </div>
      </div>
      </div>
    </>
  )
}
import React, { useState, useEffect } from 'react';
import Footer from '../Common/Footer';
import HeaderTwo from '../Common/HeaderTwo';
import Cookies from  "js-cookie";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [acceptance, setAcceptance] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateOtp = async() => {
    if (!acceptance) return;
    
    try {
        const response = await fetch('http://localhost:5000/user/genrateotp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          // Handle success
          console.log('OTP generated successfully');
          setOtpVisible(true);
          setOtpCountdown(30); // 30 seconds countdown
        } else {
          // Handle error
          console.error('Failed to generate OTP');
        }
      } catch (error) {
        console.error('Error generating OTP:', error);
        alert('Something went wrong, please try again later')
      }
  
  };

  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => {
        setOtpCountdown(otpCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/user/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const userdata = await response.json();

          Cookies.set('user', JSON.stringify(userdata.data));

          alert('User register successfully');

          nav('/');
        } else {
          // Handle error
          console.error('Failed to generate OTP');
        }
      } catch (error) {
        console.error('Error generating OTP:', error);
        alert('Something went wrong, please try again later')
      }
   
   
  };

  return (
    <>
      <HeaderTwo />
      <section className=" ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="sultan khan"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        onClick={(e) => {
                          setAcceptance(e.target.checked);
                        }}
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        I accept the Terms and Conditions
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateOtp}
                  disabled={!acceptance || otpCountdown > 0}
                  className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    acceptance ? 'bg-green-500' : 'bg-gray-300'
                  } ${otpCountdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {otpCountdown > 0
                    ? `Generate OTP (${otpCountdown})` : 'Generate OTP'}
                    </button>
                    {otpVisible && (
                      <>
                        <div>
                          <label
                            htmlFor="otp"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Enter OTP
                          </label>
                          <input
                            type="text"
                            name="otp"
                            id="otp"
                            placeholder="Enter OTP"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full font-medium bg-blue-500 rounded-lg text-sm px-5 py-2.5 text-center text-white"
                        >
                          Create Account
                        </button>
                      </>
                    )}
                    <p className="text-sm font-light text-gray-300 dark:text-gray-300">
                      Already have an account?{' '}
                      <Link
                        to={'/login'}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      );
    }
    
    export default Register;
    
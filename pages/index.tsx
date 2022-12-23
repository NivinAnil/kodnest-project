import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import handler from "./api/login";
import { validateConfig } from "next/dist/server/config-shared";

export default function Login() {
  const router = useRouter();

  const [regMessage, setRegMessage] = useState(router.query.message ?? "");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setMessage("");
  }, [formData]);

  const validateUser = async () => {
    // const validateEmail = (email: string) => {
    //   return email.match(
    //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   );
    // };

    // if (!validateEmail(formData.email)) {
    //   setMessage("Invalid Email");
    //   alert("Invalid Email");
    //   return;
    // }

    console.log(formData);

    if (formData.email === "" || formData.password === "") {
      return;
    }
    const apiUrlEndpoint = `http://localhost:3000/api/login?email=${formData.email}&password=${formData.password}`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();

    if (res.result) {
      router.push({ pathname: "/home", query: { email: res.email } });
    } else {
      setMessage("Incorrect Email or Password");
      alert("Incorrect Email or Password");
    }
  };

  return (
    <>
      <div
        className={
          router.query.message
            ? "text-center my-2 mx-80 rounded-xl p-2 border-spacing-12 border-gray-800 bg-slate-100"
            : ""
        }
      >
        <h1 className="text-green-500">{regMessage}</h1>
      </div>
      <div className="flex flex-wrap h-2/3 justify-center p-5 items-center">
        <form className="w-full max-w-sm">
          <h1 className="text-center p-5 uppercase font-bold text-gray-800">
            Login
          </h1>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                id="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="abc@email.com"
                value={formData.email}
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                id="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gay-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="******************"
                autoComplete="true"
                required
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-red-500 uppercase p-4 text-center">
              {message}
            </h2>
          </div>
          <div className="flex flex-wrap justify-around">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                validateUser();
              }}
            >
              Sign In
            </button>
            <button
              className="shadow bg-gray-300 border-purple-200 hover:bg-gray-800 hover:text-white focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                router.push("/register");
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

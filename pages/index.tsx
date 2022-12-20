import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import handler from "./api/login";
import { validateConfig } from "next/dist/server/config-shared";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateUser = async () => {
    const apiUrlEndpoint = `http://localhost:3000/api/login?email=${formData.email}&password=${formData.password}`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();

    if (res.result) {
      router.push({ pathname: "/home", query: { email: res.email } }, "/home");
    }
  };

  return (
    <>
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
          <div className="flex flex-wrap justify-around">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                validateUser();
              }}
            >
              Sign Up
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

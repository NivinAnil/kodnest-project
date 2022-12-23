import { validateConfig } from "next/dist/server/config-shared";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  const [regFormData, setRegFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [resStatus, setResStatus] = useState(false);
  // useEffect(() => {
  //     console.log({ regFormData });
  // }, [regFormData])

  const valNReg = async () => {
    if (
      regFormData.fName == "" ||
      regFormData.lName == "" ||
      regFormData.email == "" ||
      regFormData.password == "" ||
      regFormData.address == "" ||
      regFormData.gender == "" ||
      regFormData.dob == ""
    ) {
      alert("Incomplete Input Fields....");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/register?fName=${regFormData.fName}&lName=${regFormData.lName}&email=${regFormData.email}&address=${regFormData.address}&password=${regFormData.password}&DOB=${regFormData.dob}&gender=${regFormData.gender}`
    );
    const res = await response.json();

    setMessage(res.message);
    setResStatus(res.status);
    if (res.status) {
      router.push({ pathname: "/", query: { message: res.message } });
    } else {
      alert(res.message);
    }
  };

  return (
    <>
      <h1 className="text-center p-5 uppercase font-bold text-gray-800">
        Registration
      </h1>
      <div className="flex justify-center items-center p-5">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={regFormData.fName}
                onChange={(e) => {
                  setRegFormData({
                    ...regFormData,
                    fName: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={regFormData.lName}
                onChange={(e) => {
                  setRegFormData({
                    ...regFormData,
                    lName: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-first-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-email"
                type="email"
                placeholder="abc@gmail.com"
                value={regFormData.email}
                onChange={(e) => {
                  setRegFormData({
                    ...regFormData,
                    email: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-last-name"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                autoComplete="true"
                placeholder="******************"
                value={regFormData.password}
                onChange={(e) => {
                  setRegFormData({
                    ...regFormData,
                    password: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-password"
              >
                Address
              </label>
              <textarea
                className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-address"
                value={regFormData.address}
                onChange={(e) => {
                  setRegFormData({
                    ...regFormData,
                    address: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2 justify-between">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-state"
              >
                Gender
              </label>
              <div className="relative justify-between ">
                <div className="flex flex-col">
                  <div>
                    <input
                      type="radio"
                      id="option1"
                      name="options"
                      value="M"
                      onChange={(e) => {
                        setRegFormData({
                          ...regFormData,
                          gender: e.target.value,
                        });
                      }}
                    />
                    <label className="m-1" htmlFor="option1">
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value="F"
                      onChange={(e) => {
                        setRegFormData({
                          ...regFormData,
                          gender: e.target.value,
                        });
                      }}
                    />
                    <label className="m-1" htmlFor="option2">
                      Female
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="option3"
                      name="options"
                      value="O"
                      onChange={(e) => {
                        setRegFormData({
                          ...regFormData,
                          gender: e.target.value,
                        });
                      }}
                    />
                    <label className="m-1" htmlFor="option3">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                id="grid-dob"
              >
                DOB
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="date"
                value={regFormData.dob}
                onChange={(e) => {
                  setRegFormData({
                    ...regFormData,
                    dob: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <h2 className={!resStatus ? "text-center text-red-500" : ""}>
              {message}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                valNReg();
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

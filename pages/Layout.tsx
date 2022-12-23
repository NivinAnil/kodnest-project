import React from "react";
import JSXStyle from "styled-jsx/style";

const Layout = (props: { children: any }) => {
  return (
    <>
      <header className="bg-purple-500">
        <h1 className="text-xl text-white p-4 font-bold">KodNest Project</h1>
      </header>
      {props.children}
      <footer className="bg-gray-200 text-center  lg:text-left w-screen absolute bottom-0">
        <div className="text-gray-700 text-center p-4 bg-gray-200">
          © 2021 Copyright:
          <a
            className="text-gray-800 hover:bg-purple-500 px-2 py-1 rounded-md"
            href="https://www.kodnest.com/"
          >
            KodNest
          </a>
        </div>
      </footer>
    </>
  );
};
export default Layout;

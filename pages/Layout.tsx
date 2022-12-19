import React from "react";
import JSXStyle from "styled-jsx/style";

const Layout = (props) => {
  return (
    <>
      <header className="bg-purple-500">
        <h1 className="text-xl text-white p-4 font-bold">KodNest Project</h1>
      </header>
      {props.children}
    </>
  );
};
export default Layout;

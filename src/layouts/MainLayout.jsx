import React from "react";
import { Layout } from "antd";
import Head from "./components/Head";
import Main from "./components/Main";

const MainLayout = () => {
  return (
    <Layout>
      <Head />
      <Main />
    </Layout>
  );
};

export default MainLayout;

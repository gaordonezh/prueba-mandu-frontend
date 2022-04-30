import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import ScrollBar from "react-perfect-scrollbar";

const { Content } = Layout;

const Main = () => {
  return (
    <Content className="site-layout">
      <ScrollBar className="site-layout-background">
        <Outlet />
      </ScrollBar>
    </Content>
  );
};

export default Main;

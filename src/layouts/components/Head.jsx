import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { AiFillCaretDown, AiFillQuestionCircle } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";

const { Header } = Layout;

const itemsLeft = [
  { label: "Dashboard", key: "1" },
  { label: "Organización", key: "2" },
  {
    label: "Modelos",
    key: "3",
    icon: <AiFillCaretDown />,
    children: [
      { label: "Submenu 1", key: "31" },
      { label: "Submenu 2", key: "32" },
    ],
  },
  {
    label: "Seguimiento",
    key: "4",
    icon: <AiFillCaretDown />,
    children: [
      { label: "Submenu 3", key: "41" },
      { label: "Submenu 4", key: "42" },
    ],
  },
];

const itemsRight = [
  { icon: <BsFillBriefcaseFill style={{ fontSize: 18 }} />, key: "1" },
  { icon: <AiFillQuestionCircle style={{ fontSize: 18 }} />, key: "2" },
  { icon: <IoIosNotifications style={{ fontSize: 18 }} />, key: "3" },
  { label: "Administrador", icon: <AiFillCaretDown />, key: "4" },
];

const Head = () => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: "linear-gradient(90deg, #2e52f8 0%, #56a7f2 50%, #2e52f8 100%)",
        display: "flex",
      }}
    >
      <img className="logo" src="./images/mandu.png" />
      <Menu
        style={{ background: "transparent" }}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={itemsLeft}
      />
      <div style={{ flexGrow: 1 }} />
      <Menu
        style={{ background: "transparent" }}
        theme="dark"
        mode="horizontal"
        items={itemsRight}
      />
      <img className="logo" src="./images/mandu.png" />
    </Header>
  );
};

export default Head;

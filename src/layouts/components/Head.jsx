import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MdOutlineMailOutline } from "react-icons/md";

const { Header } = Layout;

const items = [
  {
    label: "Navigation One",
    key: "mail",
    icon: <MdOutlineMailOutline />,
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <MdOutlineMailOutline />,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <MdOutlineMailOutline />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
];

const Head = () => {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>
  );
};

export default Head;

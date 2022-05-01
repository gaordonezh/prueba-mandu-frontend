import React, { useState } from "react";
import { Table, Button, Space } from "antd";

/* const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
 */

const DataTable = ({ data, loading }) => {
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);

  const columns = [
    {
      title: "División",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo?.name ?? null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo?.columnKey === "name" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title: "División Superior",
      dataIndex: "top",
      key: "top",
      sorter: (a, b) => a.age - b.age,
      //sortOrder: sortedInfo?.columnKey === "age" && sortedInfo?.order,
      ellipsis: true,
      render: (val) => <React.Fragment>{val ? val.name : ""}</React.Fragment>,
    },
    {
      title: "Colaboradores",
      dataIndex: "n_collaborators",
      key: "n_collaborators",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo?.n_collaborators ?? null,
      onFilter: (value, record) => record.n_collaborators.includes(value),
      sorter: (a, b) => a.n_collaborators.length - b.n_collaborators.length,
      sortOrder: sortedInfo?.columnKey === "n_collaborators" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title: "Nivel",
      dataIndex: "level",
      key: "level",
      sorter: (a, b) => a.level - b.level,
      sortOrder: sortedInfo?.columnKey === "level" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title: "Subdivisiones",
      dataIndex: "sub",
      key: "sub",
      //sorter: (a, b) => a.age - b.age,
      //sortOrder: sortedInfo?.columnKey === "age" && sortedInfo?.order,
      ellipsis: false,
      render: (val) => val.length,
    },
    {
      title: "Embajadores",
      dataIndex: "ambassador",
      key: "ambassador",
      sorter: (a, b) => a.ambassador - b.ambassador,
      sortOrder: sortedInfo?.columnKey === "ambassador" && sortedInfo?.order,
      ellipsis: true,
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={{ pageSize: 5 }}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default DataTable;

import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Space, Input, Tooltip, Avatar } from "antd";
import { FaSearch } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import Highlighter from "react-highlight-words";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { CgAssign } from "react-icons/cg";

const TableDivisions = ({ data, loading, setModal, setDel, setSub, setTop, setColumns, total }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const inputRef = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <Space direction="vertical" size="small" style={{ padding: 10 }}>
        <Input
          placeholder={`Buscar`}
          value={selectedKeys[0]}
          ref={inputRef}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        />
        <Button.Group>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>
            BUSCAR
          </Button>
          <Button onClick={() => handleReset(clearFilters, confirm, setSelectedKeys)}>
            CANCELAR
          </Button>
        </Button.Group>
      </Space>
    ),
    filterIcon: (filtered) => <FaSearch style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          inputRef.current.focus({ cursor: "end" });
        }, 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm, setSelectedKeys) => {
    clearFilters();
    confirm({ closeDropdown: true });
    setSearchText("");
    setSelectedKeys([""]);
  };

  const columns = [
    {
      title: "División",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => (a.name < b.name ? 1 : -1),
      ...getColumnSearchProps("name"),
    },
    {
      title: "División Superior",
      dataIndex: "top",
      key: "top",
      ellipsis: true,
      render: (val, row) => (
        <Tooltip title={`${val ? "Modificar" : "Asignar"} división superor`}>
          {val ? (
            <React.Fragment>
              <Button type="link" onClick={() => setTop({ isOpen: true, data: row, edit: true })}>
                <RiEdit2Fill style={{ fontSize: 20 }} />
              </Button>
              {val.name}
            </React.Fragment>
          ) : (
            <Button type="link" onClick={() => setTop({ isOpen: true, data: row, edit: false })}>
              <CgAssign style={{ fontSize: 20 }} />
            </Button>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Colaboradores",
      dataIndex: "n_collaborators",
      key: "n_collaborators",
      ellipsis: true,
      sorter: (a, b) => (a.n_collaborators < b.n_collaborators ? 1 : -1),
      ...getColumnSearchProps("n_collaborators"),
    },
    {
      title: "Nivel",
      dataIndex: "level",
      key: "level",
      ellipsis: true,
      sorter: (a, b) => (a.level < b.level ? 1 : -1),
      ...getColumnSearchProps("level"),
    },
    {
      title: "Subdivisiones",
      dataIndex: "sub",
      key: "sub",
      ellipsis: true,
      render: (val, row) => (
        <React.Fragment>
          <Avatar.Group maxCount={4}>
            <Tooltip title="Agregar Subdivisión">
              <Avatar
                style={{ background: "#49C5A9", cursor: "pointer" }}
                icon={<GrAdd style={{ color: "#fff" }} />}
                onClick={() => setSub({ isOpen: true, data: row })}
              />
            </Tooltip>
            {val.map((item, index) => (
              <Avatar key={index}>{item.name.toUpperCase().charAt(0)}</Avatar>
            ))}
          </Avatar.Group>
        </React.Fragment>
      ),
    },
    {
      title: "Embajadores",
      dataIndex: "ambassador",
      key: "ambassador",
      ellipsis: true,
      sorter: (a, b) => (a.ambassador < b.ambassador ? 1 : -1),
      ...getColumnSearchProps("level"),
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (value, row) => (
        <Button.Group>
          <Tooltip title="Editar registro">
            <Button onClick={() => setModal({ isOpen: true, data: row })} type="link">
              <RiEdit2Fill style={{ fontSize: 20 }} />
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar registro">
            <Button
              type="link"
              style={{ color: "red" }}
              onClick={() => setDel({ isOpen: true, id: value })}
            >
              <AiFillDelete style={{ fontSize: 20 }} />
            </Button>
          </Tooltip>
        </Button.Group>
      ),
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    //console.log(pagination, filters, sorter);
    // Pendiente: AQUÍ IRÁ LA BUSQUEDA POR COLUMNAS
  };

  useEffect(() => {
    const result = columns
      .filter((item) => item.dataIndex !== "id")
      .map((item) => ({ label: item.title, key: item.dataIndex }));
    setColumns([...result]);
    // eslint-disable-next-line
  }, [columns]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={handleChange}
      //pagination={{ pageSize: 10 }}
      loading={loading}
      rowKey="id"
      scroll={{ x: "100%" }}
      bordered
      footer={() => `Total colaboradores: ${total}`}
    />
  );
};

export default TableDivisions;

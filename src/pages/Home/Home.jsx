import React, { useState } from "react";
import { Typography, Row, Col, Button, Space, Tabs, Divider, Input } from "antd";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import TableDivisions from "./components/TableDivisions";
import useDivisions from "hooks/useDivisions";
import ModalDivisions from "./components/ModalDivisions";
import ModalDelete from "./components/ModalDelete";
import ModalSubDivisiones from "./components/ModalSubDivisiones";
import ModalTopDivision from "./components/ModalTopDivision";
import { BsSearch } from "react-icons/bs";
import SelectColumns from "components/SelectColumns";

const Home = () => {
  const { isLoading, divisions, staticDivisions, obtainDivisions, setDivisions } = useDivisions();
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const [del, setDel] = useState({ isOpen: false, id: "" });
  const [sub, setSub] = useState({ isOpen: false, data: null });
  const [top, setTop] = useState({ isOpen: false, data: null, edit: false });
  const [columns, setColumns] = useState([]);
  const [column, setColumn] = useState(null);

  const handleSearch = (text) => {
    const filtered = staticDivisions.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.n_collaborators.toString().includes(text) ||
        item.level.toString().includes(text) ||
        item.ambassador.toLowerCase().includes(text.toLowerCase())
    );

    setDivisions([...filtered]);
  };

  return (
    <React.Fragment>
      <Typography.Title level={2}>Organización</Typography.Title>

      <Row justify="space-between" style={{ marginBottom: "-42px" }}>
        <Col>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={
                <Typography.Title level={5} style={{ color: "inherit" }}>
                  Divisiones
                </Typography.Title>
              }
              key="1"
            />
            <Tabs.TabPane
              tab={
                <Typography.Title level={5} style={{ color: "inherit" }}>
                  Colaboradores
                </Typography.Title>
              }
              key="2"
            />
          </Tabs>
        </Col>
        <Col>
          <Space size="small">
            <Button type="primary" onClick={() => setModal({ isOpen: true, data: null })}>
              <IoMdAdd style={{ fontSize: 20 }} />
            </Button>
            <Button type="ghost">
              <AiOutlineUpload style={{ fontSize: 20 }} />
            </Button>
            <Button type="ghost">
              <AiOutlineDownload style={{ fontSize: 20 }} />
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider style={{ marginBottom: "-10px" }} />

      <Space size="large" style={{ backgroundColor: "#f9f9f9", padding: 10 }} direction="vertical">
        <Row wrap justify="space-between">
          <Col>
            <Button.Group size="large">
              <Button type="primary">Listado</Button>
              <Button>Árbol</Button>
            </Button.Group>
          </Col>
          <Col>
            <Space direction="horizontal" size="small">
              <SelectColumns col={column} cols={columns} setCol={setColumn} sx={{ width: 200 }} />
              <Input
                placeholder="Buscar"
                size="large"
                suffix={<BsSearch />}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Space>
          </Col>
          <Col span={24}>
            <br />
            <TableDivisions
              data={divisions}
              loading={isLoading}
              setModal={setModal}
              setDel={setDel}
              setSub={setSub}
              setTop={setTop}
              setColumns={setColumns}
              total={staticDivisions.length}
            />
          </Col>
        </Row>
      </Space>

      {modal.isOpen && (
        <ModalDivisions
          isOpen={modal.isOpen}
          setOpen={setModal}
          data={modal.data}
          refreshFunction={obtainDivisions}
        />
      )}

      {del.isOpen && (
        <ModalDelete
          isOpen={del.isOpen}
          setOpen={setDel}
          id={del.id}
          refreshFunction={obtainDivisions}
        />
      )}

      {sub.isOpen && (
        <ModalSubDivisiones
          isOpen={sub.isOpen}
          setOpen={setSub}
          data={sub.data}
          refreshFunction={obtainDivisions}
          allDivisions={divisions}
        />
      )}

      {top.isOpen && (
        <ModalTopDivision
          isOpen={top.isOpen}
          setOpen={setTop}
          data={top.data}
          edit={top.edit}
          refreshFunction={obtainDivisions}
          allDivisions={divisions}
        />
      )}
    </React.Fragment>
  );
};

export default Home;

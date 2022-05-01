import React, { useState } from "react";
import { Typography, Row, Col, Button, Space } from "antd";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import TableDivisions from "./components/TableDivisions";
import useDivisions from "hooks/useDivisions";
import ModalDivisions from "./components/ModalDivisions";
import ModalDelete from "./components/ModalDelete";
import ModalSubDivisiones from "./components/ModalSubDivisiones";
import ModalTopDivision from "./components/ModalTopDivision";

const Home = () => {
  const { isLoading, divisions, obtainDivisions } = useDivisions();
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const [del, setDel] = useState({ isOpen: false, id: "" });
  const [sub, setSub] = useState({ isOpen: false, data: null });
  const [top, setTop] = useState({ isOpen: false, data: null, edit: false });

  return (
    <React.Fragment>
      <Space size="small" direction="vertical">
        <Typography.Title>Organización</Typography.Title>
        <Space size="large" direction="vertical">
          <Row justify="end">
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

          <TableDivisions
            data={divisions}
            loading={isLoading}
            setModal={setModal}
            setDel={setDel}
            setSub={setSub}
            setTop={setTop}
          />
        </Space>
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

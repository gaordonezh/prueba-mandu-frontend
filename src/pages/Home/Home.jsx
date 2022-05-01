import React from "react";
import { Typography, Tabs, Row, Col, Button, Space } from "antd";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import DataTable from "./components/DataTable";
import useDivisions from "hooks/useDivisions";

const { TabPane } = Tabs;

const Home = () => {
  const { isLoading, divisions, obtainDivisions } = useDivisions();

  return (
    <div>
      <Typography.Title>Organización</Typography.Title>
      <Row justify="space-between">
        <Col>
          <Space size="small">
            <Button type="primary">
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
        <Col>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="Divisiones" key="1">
              <div>
                <Button.Group>
                  <Button type="primary">Listado</Button>
                  <Button>Árbol</Button>
                </Button.Group>
                <DataTable data={divisions} loading={isLoading} />
              </div>
            </TabPane>
            <TabPane tab="Colaboradores" key="2">
              <div>CONTENIDO 2</div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

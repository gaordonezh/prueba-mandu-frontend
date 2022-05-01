import React, { useState } from "react";
import { notification, Modal, Button, Spin, List, Avatar, Space, Row, Typography } from "antd";
import { postSubDivisions, deleteSubDivisions } from "requests";
import { AiFillDelete } from "react-icons/ai";
import SelectDivisions from "components/SelectDivisions";

const ModalSubDivisiones = ({ isOpen, setOpen, data, allDivisions, refreshFunction }) => {
  const [isLoading, setLoading] = useState(false);
  const freeDivisions = allDivisions.filter(
    (item) => !data.sub.find((div) => div.name === item.name)
  );

  const handleCancel = () => setOpen({ open: false, data: null });

  const handleAdd = async (id) => {
    try {
      setLoading(true);
      const finder = allDivisions.find((item) => item.id === id);
      if (finder) {
        await postSubDivisions({ divisionId: data.id, sub_division_id: finder.id });
        refreshFunction();
        notification["success"]({ message: `La subdivisión se agregó correctamente.` });
        handleCancel();
      }
    } catch (error) {
      notification["error"]({ message: `Ocurrió un error al realizar la operación` });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      setLoading(true);
      await deleteSubDivisions(id);
      refreshFunction();
      notification["success"]({ message: `La subdivisión se eliminó correctamente.` });
      handleCancel();
    } catch (error) {
      notification["error"]({ message: `Ocurrió un error al realizar la operación` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isOpen} title="SUB DIVISIONES" footer={[]} onCancel={handleCancel}>
      <Spin spinning={isLoading}>
        <Space size="large" direction="vertical" style={{ width: "100%" }}>
          <List
            dataSource={data.sub}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta avatar={<Avatar>{index + 1}</Avatar>} title={item.name} />
                <Button type="link" style={{ color: "red" }} onClick={handleDelete(item.id)}>
                  <AiFillDelete style={{ fontSize: 20 }} />
                </Button>
              </List.Item>
            )}
          />
          <Row justify="center">
            <Typography.Text>
              SELECCIONE UNA DIVISIÓN PARA AGREGAR AL LISTADO DE SUBDIVISIONES.
            </Typography.Text>
            <SelectDivisions divisions={freeDivisions} division={null} setDivision={handleAdd} />
          </Row>
        </Space>
      </Spin>
    </Modal>
  );
};

export default ModalSubDivisiones;

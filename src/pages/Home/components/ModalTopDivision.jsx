import React, { useState } from "react";
import { notification, Modal, Button, Space, Spin, List, Row, Typography } from "antd";
import { postTopDivisions, putTopDivisions, deleteTopDivisions } from "requests";
import { AiFillDelete } from "react-icons/ai";
import SelectDivisions from "components/SelectDivisions";

const ModalTopDivision = ({ isOpen, setOpen, data, edit, refreshFunction, allDivisions }) => {
  const [isLoading, setLoading] = useState(false);
  const freeDivisions = allDivisions.filter((item) =>
    edit ? !(data.top.name === item.name) : true
  );

  const handleCancel = () => setOpen({ open: false, data: null, edit: false });

  const handleAdd = async (id) => {
    try {
      setLoading(true);

      if (edit) await putTopDivisions({ top_division_id: id }, data.top.id);
      else await postTopDivisions({ division_id: data.id, top_division_id: id });

      refreshFunction();
      notification["success"]({ message: `La subdivisión se agregó correctamente.` });
      handleCancel();
    } catch (error) {
      console.log(error);
      notification["error"]({ message: `Ocurrió un error al realizar la operación` });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      setLoading(true);
      await deleteTopDivisions(id);
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
    <Modal visible={isOpen} title="DIVISIÓN SUPERIOR" footer={[]} onCancel={handleCancel}>
      <Spin spinning={isLoading}>
        <Space size="large" direction="vertical" style={{ width: "100%" }}>
          <List
            dataSource={edit ? [data.top] : []}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta title={item.name} />
                <Button type="link" style={{ color: "red" }} onClick={handleDelete(item.id)}>
                  <AiFillDelete style={{ fontSize: 20 }} />
                </Button>
              </List.Item>
            )}
          />
          <Row justify="center">
            <Typography.Text>
              SELECCIONE UNA DIVISIÓN PARA ASIGNARLA COMO DIVISIÓN SUPERIOR.
            </Typography.Text>
            <SelectDivisions divisions={freeDivisions} division={null} setDivision={handleAdd} />
          </Row>
        </Space>
      </Spin>
    </Modal>
  );
};

export default ModalTopDivision;

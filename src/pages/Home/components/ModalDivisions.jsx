import React, { useState } from "react";
import { notification, Modal, Button, Input, Form, Spin, Select } from "antd";
import { postDivisions, putDivisions } from "requests";

const levels = [1, 2, 3, 4, 5];
const { Option } = Select;

const ModalDivisions = ({ isOpen, setOpen, data, refreshFunction }) => {
  const [isLoading, setLoading] = useState(false);

  const saveRecord = async (items) => {
    try {
      setLoading(true);
      if (data) await putDivisions(items, data.id);
      else await postDivisions(items);
      notification["success"]({
        message: `La división se ${data ? "actualizó" : "registró"} correctamente.`,
      });
      refreshFunction();
      handleCancel();
    } catch (error) {
      notification["error"]({ message: `Ocurrió un error al realizar la operación` });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setOpen({ open: false, data: null });

  return (
    <Modal
      visible={isOpen}
      title={`${data ? "EDITAR" : "AGREGAR"} REGISTRO`}
      footer={[]}
      onCancel={handleCancel}
    >
      <Spin spinning={isLoading}>
        <Form
          name="wrap"
          labelCol={{ flex: "140px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 2 }}
          colon={false}
          onFinish={saveRecord}
          initialValues={
            data
              ? {
                  name: data.name,
                  n_collaborators: data.n_collaborators.toString(),
                  level: data.level,
                  ambassador: data.ambassador,
                }
              : {}
          }
        >
          <Form.Item label="División" name="name" rules={[{ required: true, min: 5 }]}>
            <Input value="asdsad" />
          </Form.Item>
          <Form.Item
            label="Nro Colaboradores"
            name="n_collaborators"
            rules={[{ required: true, min: 1 }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="level"
            label="Nivel"
            hasFeedback
            rules={[{ required: true, message: "Por favor seleccione un nivel" }]}
          >
            <Select placeholder="Seleccionar nivel">
              {levels.map((level, index) => (
                <Option value={level} key={index}>
                  Nivel {level}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Embajador" name="ambassador" rules={[{ required: false, min: 5 }]}>
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button htmlType="submit" type="primary">
              {data ? "ACTUALIZAR" : "GUARDAR"} REGISTRO
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalDivisions;

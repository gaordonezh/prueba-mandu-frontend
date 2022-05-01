import React, { useState } from "react";
import { notification, Modal, Button, Spin, Typography } from "antd";
import { deleteDivisions } from "requests";

const ModalDelete = ({ isOpen, setOpen, id, refreshFunction }) => {
  const [isLoading, setLoading] = useState(false);

  const deleteRecord = async () => {
    try {
      setLoading(true);
      await deleteDivisions(id);
      notification["success"]({ message: `La división se eliminó correctamente.` });
      refreshFunction();
      handleCancel();
    } catch (error) {
      notification["error"]({ message: `Ocurrió un error al realizar la operación` });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setOpen({ open: false, id: "" });

  return (
    <Modal
      visible={isOpen}
      title={<Typography.Title level={4}>CONFIRMACIÓN DE ELIMINACIÓN</Typography.Title>}
      footer={[
        <Button
          type="primary"
          onClick={deleteRecord}
          style={{ backgroundColor: "red", borderColor: "red" }}
          size="large"
          key="1"
        >
          CONFIRMAR ELIMINACIÓN
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <Spin spinning={isLoading}>
        <Typography.Title level={4}>¿Seguro que desea eliminar este registro?</Typography.Title>
        <Typography.Paragraph>
          Recuerda que una ves efectuada esta operación, el registro ya no estará disponible.
        </Typography.Paragraph>
      </Spin>
    </Modal>
  );
};

export default ModalDelete;

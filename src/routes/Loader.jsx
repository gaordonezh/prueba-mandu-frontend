import { Progress } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1301,
        width: "100%",
      }}
    >
      <Progress percent={100} status="active" showInfo={false} type="line" />
    </div>
  );
};

export default Loader;

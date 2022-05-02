import { Select } from "antd";

const { Option } = Select;

const SelectColumns = ({ col, setCol, cols, sx = {}, ...rest }) => {
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterOptions = (inputValue, option) => {
    const title = removeAccents(option.props.title.toLowerCase());
    return title.includes(inputValue.toLowerCase());
  };

  return (
    <Select
      size="large"
      style={{ width: "100%", ...sx }}
      showSearch
      value={col}
      onChange={setCol}
      filterOption={filterOptions}
      {...rest}
    >
      <Option key={0} value={null} title={""}>
        Columnas
      </Option>
      {cols.map((c, index) => (
        <Option key={index + 1} value={c.key} title={`${c.key} ${c.label}`}>
          {c.label}
        </Option>
      ))}
    </Select>
  );
};
export default SelectColumns;

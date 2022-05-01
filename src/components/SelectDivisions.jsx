import { Select } from "antd";

const { Option } = Select;

const SelectDivisions = ({ division, setDivision, divisions, sx = {}, ...rest }) => {
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
      value={division}
      onChange={setDivision}
      filterOption={filterOptions}
      {...rest}
    >
      <Option key={0} value={null} title={""}>
        - Ninguno -
      </Option>
      {divisions.map((dvs, index) => (
        <Option key={index + 1} value={dvs.id} title={`${dvs.id} ${dvs.name}`}>
          {dvs.name}
        </Option>
      ))}
    </Select>
  );
};
export default SelectDivisions;

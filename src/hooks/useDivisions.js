import { useEffect, useState } from "react";
import { notification } from "antd";
import { getDivisions } from "requests";

const useDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [staticDivisions, setStaticData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    obtainDivisions();
  }, []);

  const obtainDivisions = async () => {
    try {
      setLoading(true);
      const res = await getDivisions();
      setDivisions([...res.data.reverse()]);
      setStaticData([...res.data.reverse()]);
    } catch (error) {
      notification["error"]({ message: `Ocurrió un error al obtener las divisiones.` });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, divisions, staticDivisions, obtainDivisions, setDivisions };
};

export default useDivisions;

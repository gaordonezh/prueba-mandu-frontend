import { useEffect, useState } from "react";
import { notification } from "antd";
import { getDivisions } from "requests";

const useDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    obtainDivisions();
  }, []);

  const obtainDivisions = async () => {
    try {
      setLoading(true);
      const res = await getDivisions();
      setDivisions([...res.data]);
    } catch (error) {
      notification["error"]({ message: `Ocurrió un error al obtener las divisiones.` });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, divisions, obtainDivisions };
};

export default useDivisions;

import { Route, Routes } from "react-router-dom";
import routes from "./config";

const ConfigRoutes = () => {
  return (
    <Routes>
      {routes.map((e, ind) => {
        const { path, element: Component, children } = e;
        return (
          <Route path={path} element={<Component />} key={ind}>
            {children.map((el, indx) => {
              const { path: ruta, element: Element } = el;
              return <Route path={ruta} element={<Element />} key={indx} />;
            })}
          </Route>
        );
      })}
    </Routes>
  );
};

export default ConfigRoutes;

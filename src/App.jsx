import ConfigRoutes from "routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigRoutes />
    </BrowserRouter>
  );
};

export default App;

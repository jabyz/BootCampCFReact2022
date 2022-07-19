import "./App.css";
import RoutesMap from "./routes";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <>
      <RoutesMap>
        <Home></Home>
      </RoutesMap>
    </>
  );
}

export default App;

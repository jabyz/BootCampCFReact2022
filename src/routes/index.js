import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Results from "../pages/Results/Results.jsx";

function RoutesMap() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Navigate replace to='/' />} />
          <Route
            path='/results/:q'
            element={<Results text='You did it! Congratulations!' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMap;

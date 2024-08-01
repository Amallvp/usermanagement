
import Home from './Pages/Home/Home';
import LoginRegister from './Pages/LoginRegister/LoginRegister';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={ <LoginRegister/>} />
       <Route path="/home" element={<Home />} />
     </Routes>
    </div>
  );
}

export default App;

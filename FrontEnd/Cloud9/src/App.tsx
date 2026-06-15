import LoginPage from "./Pages/LoginPage.tsx";
import Cave from "./Pages/Cave.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/UserCave" element={<Cave />}/>
        <Route path="/Register" element={<RegisterPage />}/>
      </Routes>
    </Router>
    
  )
}

export default App;

import LoginPage from "./LoginPage.tsx";
import Cave from "./Cave.tsx";
import RegisterPage from "./RegisterPage.tsx"
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

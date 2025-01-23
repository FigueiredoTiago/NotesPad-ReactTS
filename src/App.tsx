import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Navbar />
      <Dashboard />
      <ToastContainer />
    </>
  );
}

export default App;

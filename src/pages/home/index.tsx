import styles from "./styles.module.css";
import LoginModal from "../../components/LoginModal/index";
import RegisteModal from "../../components/RegisterModal/index";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useAuth from "../../hooks/userAuth";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redireciona para o dashboard se o token existir
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className={styles.homeContainer}>
      <nav className={styles.home_nav}>
        <LoginModal />
        <RegisteModal />
      </nav>

      <ToastContainer />
    </section>
  );
};

export default Home;

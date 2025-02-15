import styles from "./styles.module.css";
import brainPad from "../../assets/img/brainpad.svg";
import LoginModal from "../../components/LoginModal/index";
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
      </nav>

      <h1 className={styles.title}>
        Salve suas <span>ideias</span> no{" "}
        <span className={styles.spanPad}>NotesPad</span>
      </h1>

      <img src={brainPad} alt="" className={styles.homeImage} />

      <ToastContainer />
    </section>
  );
};

export default Home;

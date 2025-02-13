import styles from "./styles.module.css";
import brainPad from "../../assets/img/brainpad.svg";
import LoginModal from "../../components/LoginModal/index";
import { ToastContainer } from "react-toastify";


const Home = () => {
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

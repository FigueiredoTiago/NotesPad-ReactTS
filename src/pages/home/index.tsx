import styles from "./styles.module.css";
import brainPad from "../../assets/img/brainpad.svg";

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <img src={brainPad} alt="" className={styles.homeImage} />
      <h1 className={styles.homeTitle}>Crie Notas Inteligentes com</h1>

      <h1 className={styles.subTitle}>NotesPad</h1>
    </section>
  );
};

export default Home;

import styles from "./styles.module.css";
import brainPad from "../../assets/img/brainpad.svg";

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      
      <h1 className={styles.title}>Salve suas <span>ideias</span> no <span className={styles.spanPad}>NotesPad</span></h1>

      <img src={brainPad} alt="" className={styles.homeImage} />
    </section>
  );
};

export default Home;

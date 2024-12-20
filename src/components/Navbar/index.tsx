import styles from "./styles.module.css";
import caveirinha from '../../assets/img/caveirinha.svg'

const index = () => {
  return (
    <header>
      <h1 className={styles.title}>
        <img src={caveirinha} alt="" />
        Notes<span>Pad</span>
      </h1>
    </header>
  );
};

export default index;

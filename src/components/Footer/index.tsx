import styles from "./styles.module.css";

const index = () => {
  return <footer className={styles.footer}>

    <p>Feito com ❤ por <a href="https://www.linkedin.com/in/tf-tiagofigueiredo/ " target="_blank">Tiago Figueiredo</a></p>

    <p>© {new Date().getFullYear()} NotesPad. All rights reserved.</p>

  </footer>;
};

export default index;

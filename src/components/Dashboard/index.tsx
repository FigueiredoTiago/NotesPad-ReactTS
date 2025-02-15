import Notes from "../Notes";
import styles from "./styles.module.css";
import Cookies from "js-cookie";

const index = () => {
  const nick = Cookies.get("nick");

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.nick}>
        Olá, <span>{nick}!</span> Pronto para anotar suas melhores ideias? 
        </h2>

        <Notes />
      </main>
    </>
  );
};

export default index;

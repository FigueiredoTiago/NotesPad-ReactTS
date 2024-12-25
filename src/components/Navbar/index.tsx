import styles from "./styles.module.css";
import caveirinha from "../../assets/img/caveirinha.svg";
import NewNoteModal from "../NewNoteModal";
import { useState } from "react";

const index = () => {
  //estado para controlar a abertura e fechamento do modal
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <header>
      <h1 className={styles.title}>
        <img src={caveirinha} alt="" />
        Notes<span>Pad</span>
      </h1>

      <button
        onClick={() => setIsOpen(true)}
        className={styles.openModalButton}
      >
        Nova Nota
      </button>

      {isOpen && <NewNoteModal isOpen={isOpen} setOpen={toggleModal} />}
      
    </header>
  );
};

export default index;

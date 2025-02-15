import styles from "./styles.module.css";
import caveirinha from "../../assets/img/caveirinha.svg";
import NewNoteModal from "../NewNoteModal";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const index = () => {
  //estado para controlar a abertura e fechamento do modal
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const nick = Cookies.get("nick");

  if (!nick) {
    toast.error("Erro: Token de autenticação não encontrado.");
    navigate("/");
  }

  const logout = () => {
    Cookies.remove("auth");
    Cookies.remove("nick");
    navigate("/");
  };

  return (
    <header>
      <h1 className={styles.title}>
        <img src={caveirinha} alt="" />
        Notes<span>Pad</span>
      </h1>

      <nav className={styles.nav}>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.openModalButton}
        >
          +Nota
        </button>
        <button onClick={() => logout()} className={styles.exitButton}>
          Sair
        </button>
      </nav>

      {isOpen && <NewNoteModal isOpen={isOpen} setOpen={toggleModal} />}
    </header>
  );
};

export default index;

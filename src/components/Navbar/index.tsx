import styles from "./styles.module.css";
import caveirinha from "../../assets/img/caveirinha.svg";
import NewNoteModal from "../NewNoteModal";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const index = () => {
  //estado para controlar a abertura e fechamento do modal
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  useEffect(() => {
    const nick = Cookies.get("nick");
    if (!nick) {
      navigate("/");
    }
  }, [navigate]);

  const Client = useQueryClient();

  const logout = async () => {
    Cookies.remove("auth");
    Cookies.remove("nick");

    Client.invalidateQueries(["notes-lista"]);
    Client.removeQueries(["notes-lista"]);
  };

  const { mutate, isLoading } = useMutation(logout, {
    onSuccess: () => {
      navigate("/");
    },
  });

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
        {isLoading ? (
          <button disabled className={styles.exitButton}>
            Saindo...
          </button>
        ) : (
          <button onClick={() => mutate()} className={styles.exitButton}>
            Sair
          </button>
        )}
      </nav>

      {isOpen && <NewNoteModal isOpen={isOpen} setOpen={toggleModal} />}
    </header>
  );
};

export default index;

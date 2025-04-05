import Notes from "../Notes";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import Footer from "../Footer/index";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import searchIcon from "../../assets/icons/searchIcon.svg";

const index = () => {
  const nick = Cookies.get("nick");
  const token = Cookies.get("auth");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Você precisa estar logado para acessar essa página!");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <main className={styles.container}>
        <nav className={styles.nav_search}>
          <input type="text" placeholder="Buscar Notas..." />

          <button type="submit" className={styles.search_button}>
            <img src={searchIcon} alt="search" />
          </button>
        </nav>

        <h2 className={styles.nick}>
          Olá, <span>{nick}!</span> Pronto para anotar suas melhores ideias?
        </h2>

        <Notes />
      </main>
      <Footer />
    </>
  );
};

export default index;

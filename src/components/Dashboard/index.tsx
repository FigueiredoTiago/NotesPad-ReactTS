import Notes from "../Notes";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import Footer from "../Footer/index";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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

import Notes from "../Notes";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import Footer from "../Footer/index";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import searchIcon from "../../assets/icons/searchIcon.svg";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getNoteByTitle } from "../../api/api";

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

  const { register, handleSubmit } = useForm();

  const { mutate, data, isLoading } = useMutation({
    mutationFn: async (title: string) => {
      return await getNoteByTitle(title);
    },
    onError: (error: any) => {
      if (error) {
        const apiMessage = error.response?.data?.message;
        toast.error(apiMessage || "Erro ao buscar notas!");
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data.title);
  });

  if (data) {
    console.log(data);
  }

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.nick}>
          Olá, <span>{nick}!</span> Pronto para anotar suas melhores ideias?
        </h2>

        <nav className={styles.nav_search}>
          <input
            type="text"
            placeholder="Buscar Notas..."
            {...register("title")}
          />

          <button onClick={onSubmit} className={styles.search_button}>
            <img src={searchIcon} alt="search" />
          </button>
        </nav>

        <Notes />
      </main>
      <Footer />
    </>
  );
};

export default index;

import Notes from "../Notes";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import Footer from "../Footer/index";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import searchIcon from "../../assets/icons/searchIcon.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const { register, handleSubmit, setValue } = useForm();

  const client = useQueryClient();

  const { mutate, data, isLoading, reset, isError, isSuccess } = useMutation({
    mutationFn: async (title: string) => {
      return await getNoteByTitle(title);
    },
    onSuccess: (data) => {
      client.setQueryData(["notes-lista"], data);
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

  //limpa a busca
  const clearSearch = () => {
    client.invalidateQueries(["notes-lista"]);
    setValue("title", "");
    reset();
  };

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

        {isLoading && <span className={styles.loader}></span>}

        {(isSuccess || isError) && (
          <span className={styles.search_result}>
            {data && data.length > 0
              ? `${data.length} Resultados encontrados: `
              : "Nenhuma nota encontrada! "}
            <button onClick={clearSearch} className={styles.clear_search}>
              Limpar Busca
            </button>
          </span>
        )}

        <Notes />
      </main>
      <Footer />
    </>
  );
};

export default index;

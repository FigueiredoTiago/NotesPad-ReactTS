import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { editNote } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import favoriteIcon from "../../assets/icons/favoriteIcon.svg";
import NofavoriteIcon from "../../assets/icons/noFavoriteIcon.svg";

interface EditNoteModalProps {
  isOpen: boolean;
  setOpen: () => void;
  id: number;
  title: string;
  text: string;
  favorite?: boolean;
}

const index = ({
  isOpen,
  setOpen,
  id,
  title,
  text,
  favorite,
}: EditNoteModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    // Limpa o estilo quando o componente é desmontado
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  interface FormData {
    title: string;
    text: string;
    favorite?: boolean;
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: title,
      text: text,
      favorite: favorite,
    },
  });

  const isfavorite = watch("favorite");

  const toggleFavorite = () => {
    setValue("favorite", !isfavorite);
  };

  const client = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (note: FormData) => editNote(id, note),
    {
      onSuccess: () => {
        client.invalidateQueries(["notes-lista"]);
        toast.success("Nota criada com sucesso!");
        setOpen();
      },
      onError: (error: any) => {
        toast.error(
          `Erro ao criar a nota: ${
            error?.response.data.message || "Tente novamente mais tarde."
          }`
        );
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    if (
      data.title === title &&
      data.text === text &&
      data.favorite === favorite
    ) {
      alert("Nenhuma alteração foi feita!");
      setOpen(); // Fecha o modal, pois não houve alterações
      return;
    }
    mutate(data);
  });

  if (isOpen) {
    return (
      <div className={styles.modal}>
        <span onClick={setOpen} className={styles.close_modal_button}>
          Sair
        </span>

        <form onSubmit={onSubmit} className={styles.modalContent}>
          <h2 className={styles.modal_title}>
            <span>Editar</span> Nota
          </h2>

          <input
            {...register("title", {
              required: "Campo de título Obrigatório!",
            })}
            type="text"
            placeholder="Titulo da sua Nota..."
          />

          {errors.title && (
            <p className={styles.error_message}>{errors.title.message}</p>
          )}

          <textarea
            {...register("text", { required: "Campo de nota Obrigatório!" })}
            placeholder="Escreva Sua Nota..."
          ></textarea>

          {errors.text && (
            <p className={styles.error_message}>{errors.text.message}</p>
          )}

          <input type="hidden" {...register("favorite")} />

          {isfavorite ? (
            <button
              type="button"
              onClick={toggleFavorite}
              className={styles.favorite_button}
            >
              <img src={favoriteIcon} alt="icone de favorito" /> Desmarcar como
              Favorita?
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleFavorite}
              className={styles.favorite_button}
            >
              <img src={NofavoriteIcon} alt="icone de favorito" /> Marcar como
              Favorita?
            </button>
          )}

          {isLoading ? (
            <span className={styles.loader}></span>
          ) : (
            <button className={styles.send_form_button}>Editar</button>
          )}
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default index;

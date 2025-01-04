import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { editNote } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditNoteModalProps {
  isOpen: boolean;
  setOpen: () => void;
  id: number;
  title: string;
  text: string;
}

const index = ({ isOpen, setOpen, id, title, text }: EditNoteModalProps) => {
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
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const client = useQueryClient();

  const { mutate } = useMutation((note: FormData) => editNote(id, note), {
    onSuccess: () => {
      client.invalidateQueries(["notes-lista"]);
      setOpen();
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (data.title === title && data.text === text) {
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
            <span>Edit</span> Note
          </h2>

          <input
            {...register("title", {
              required: "Campo de título Obrigatório!",
            })}
            type="text"
            placeholder="Titulo da sua Nota..."
            defaultValue={title}
          />

          {errors.title && (
            <p className={styles.error_message}>{errors.title.message}</p>
          )}

          <textarea
            {...register("text", { required: "Campo de nota Obrigatório!" })}
            placeholder="Escreva Sua Nota..."
            defaultValue={text}
          ></textarea>

          {errors.text && (
            <p className={styles.error_message}>{errors.text.message}</p>
          )}

          <button className={styles.send_form_button}>Edit</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default index;

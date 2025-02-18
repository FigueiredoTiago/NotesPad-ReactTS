import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../api/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface NewNoteModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

interface FormData {
  title: string;
  text: string;
}

const index = ({ isOpen, setOpen }: NewNoteModalProps) => {
  const Client = useQueryClient();

  const token = Cookies.get("auth");

  if (!token) {
    toast.error("Erro: Token de autenticação não encontrado.");
    return null;
  }

  const { mutate, isLoading } = useMutation(
    (note: FormData) => createNote(note, token),
    {
      onSuccess: () => {
        Client.invalidateQueries(["notes-lista"]);
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    // Limpa o estilo quando o componente é desmontado
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
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
            <span>Nova</span> Nota
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

          {isLoading ? (
            <span className={styles.loader}></span>
          ) : (
            <button className={styles.send_form_button}>Criar</button>
          )}
        </form>
      </div>
    );
  } else {
    return <button className={styles.button_create_note}>Nova Nota</button>;
  }
};

export default index;

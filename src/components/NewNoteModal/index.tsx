import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

interface NewNoteModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

interface FormData {
  title: string;
  note: string;
}

const index = ({ isOpen, setOpen }: NewNoteModalProps) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  if (isOpen) {
    return (
      <div className={styles.modal}>
        <span onClick={setOpen} className={styles.close_modal_button}>
          Sair
        </span>

        <form onSubmit={onSubmit} className={styles.modalContent}>
          <h2 className={styles.modal_title}>
            <span>New</span> Note
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
            {...register("note", { required: "Campo de nota Obrigatório!" })}
            placeholder="Escreva Sua Nota..."
          ></textarea>

          {errors.note && (
            <p className={styles.error_message}>{errors.note.message}</p>
          )}

          <button className={styles.send_form_button}>Create</button>
        </form>
      </div>
    );
  } else {
    return <button className={styles.button_create_note}>Nova Nota</button>;
  }
};

export default index;

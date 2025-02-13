import * as React from "react";
import styles from "./styles.module.css";
import Modal from "@mui/material/Modal";
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  nick: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.nick ? values : {},
    errors: !values.password
      ? {
          nick: {
            type: "required",
            message: " Digite o seu NickName.",
          },

          password: {
            type: "required",
            message: " Digite a sua senha.",
          },
        }
      : {},
  };
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <button onClick={handleOpen} className={styles.button_modal} >
        Login
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalContainer}
      >
        <form onSubmit={onSubmit}>
          <h1 className={styles.modal_title}>Bem Vindo!</h1>

          <input {...register("nick")} placeholder="NickName..." />
          {errors?.nick && (
            <p className={styles.error_message}>{errors.nick.message}</p>
          )}

          <input {...register("password")} placeholder="Password..." />
          {errors?.password && (
            <p className={styles.error_message}>{errors.password.message}</p>
          )}

          <button className={styles.send_form_button}>Login</button>
        </form>
      </Modal>
    </div>
  );
}

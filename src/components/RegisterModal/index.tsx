import * as React from "react";
import styles from "./styles.module.css";
import Modal from "@mui/material/Modal";
import { useForm, Resolver } from "react-hook-form";
import { registerUser } from "../../api/api";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      await registerUser(data.nick, data.password);

      toast.success("Usuario criado com sucesso, faça login Para continuar!");

      handleClose();
    } catch (error: any) {
      toast.error(error.response?.data || "Erro ao criar usuario!");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <button onClick={handleOpen} className={styles.button_modal}>
        Cadastre-se
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalContainer}
      >
        <form onSubmit={onSubmit}>
          <h1 className={styles.modal_title}>Crie Sua conta!</h1>

          <input {...register("nick")} placeholder="NickName..." />
          {errors?.nick && (
            <p className={styles.error_message}>{errors.nick.message}</p>
          )}

          <input
            {...register("password")}
            placeholder="Password..."
            type="password"
          />
          {errors?.password && (
            <p className={styles.error_message}>{errors.password.message}</p>
          )}

          {loading ? (
              <span className={styles.loadingMessage}><span className={styles.loader}></span>A primeira vez pode levar um pouco mais de tempo. Obrigado pela paciência! </span>
          ) : (
            <button className={styles.send_form_button}>Criar</button>
          )}
        </form>
      </Modal>
    </div>
  );
}

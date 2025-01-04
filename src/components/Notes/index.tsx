import styles from "./styles.module.css";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getNotes, deleteNote } from "../../api/api";

const index = () => {
  const client = useQueryClient();

  //query para pegar todas as notas
  const { data } = useQuery(["notes-lista"], getNotes, {
    staleTime: 1000 * 60 * 5, // 5 minutos para atualizar novamente
  });

  //mutate para deletar uma nota por Id

  const { mutate, isLoading } = useMutation((id: number) => deleteNote(id), {
    onSuccess: () => {
      client.invalidateQueries(["notes-lista"]);
    },
  });


  return (
    <section className={styles.section_notes}>
      {data && data.length > 0 ? (
        data.map((notesData) => (
          <div key={notesData.id} className={styles.notes_card}>
            <button
              className={styles.icon_delete}
              onClick={() => mutate(notesData.id)}
              disabled={isLoading}
            >
              <img src={deleteIcon} alt="" />
            </button>
            <span className={styles.icon_edit}>
              <img src={editIcon} alt="" />
            </span>

            <h1>-{notesData.title}-</h1>

            <p>{notesData.text}</p>
          </div>
        ))
      ) : null}

      {!data || data.length === 0 ? (
        <h1 style={ { color:"red", textAlign: "center", position: "absolute" }  }>Nenhuma nota Criada ainda, Crie Uma Aqui!</h1>
      ) : null}

    </section>
  );
};

export default index;

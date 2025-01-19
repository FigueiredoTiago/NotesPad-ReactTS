import { useState } from "react";
import styles from "./styles.module.css";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getNotes, deleteNote } from "../../api/api";
import EditNoteModal from "../EditNoteModal";

const NotesList = () => {
  const client = useQueryClient();

  // Query para pegar todas as notas
  const { data } = useQuery(["notes-lista"], getNotes, {
    staleTime: 1000 * 60 * 5, // 5 minutos para atualizar novamente
  });

  // Mutate para deletar uma nota por Id
  const { mutate, isLoading } = useMutation((id: number) => deleteNote(id), {
    onSuccess: () => {
      client.invalidateQueries(["notes-lista"]);
    },
  });

  const [editNoteId, setEditNoteId] = useState<number | null>(null); // ID da nota sendo editada
  const openModal = (id: number) => setEditNoteId(id);
  const closeModal = () => setEditNoteId(null);

  //função para formatar a data
  function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa de 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <section className={styles.section_notes}>
      {isLoading ? <span className={styles.loader}></span> : null}

      {data && data.length > 0
        ? data.map((notesData) => (
            <div key={notesData.id} className={styles.notes_card}>
              <button
                className={styles.icon_delete}
                onClick={() => mutate(notesData.id)}
                disabled={isLoading}
              >
                <img src={deleteIcon} alt="Delete Note" />
              </button>

              <span
                className={styles.icon_edit}
                onClick={() => openModal(notesData.id)}
              >
                <img src={editIcon} alt="Edit Note" />
              </span>

              {editNoteId === notesData.id && (
                <EditNoteModal
                  id={notesData.id}
                  title={notesData.title}
                  text={notesData.text}
                  isOpen={true}
                  setOpen={closeModal}
                />
              )}

              <h1 className={styles.title}>
                -{notesData.title}-{" "}
                <sup className={styles.updateTime}>
                  {formatDate(notesData.createdAt)}
                </sup>
              </h1>

              <p className={styles.text}>{notesData.text}</p>
            </div>
          ))
        : null}

      {!data || data.length === 0 ? (
        <h1 style={{ color: "red", textAlign: "center", position: "absolute" }}>
          Nenhuma nota criada ainda, Crie uma aqui!
        </h1>
      ) : null}
    </section>
  );
};

export default NotesList;

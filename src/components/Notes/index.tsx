import { useNotes } from "../../hooks/useNotes";
import { useDeleteNotesMutation } from "../../hooks/useDeleteNotesMutation";
import styles from "./styles.module.css";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const index = () => {
  const { data } = useNotes();
  const { mutate } = useDeleteNotesMutation();

  //funcao para deletar uma nota
  const handleDelete = (id: number) => {
    const isConfirmed = confirm("Deseja realmente deletar essa nota?");

    if (isConfirmed) {
      mutate(id);
    }
  };

  return (
    <section className={styles.section_notes}>
      {data &&
        data.map((note) => (
          <div key={note.id} className={styles.notes_card}>
            <span
              className={styles.icon_delete}
              onClick={() => handleDelete(note.id)}
            >
              <img src={deleteIcon} alt="" />
            </span>
            <span className={styles.icon_edit}>
              <img src={editIcon} alt="" />
            </span>

            <h1>-{note.title}-</h1>

            <p>{note.text}</p>
          </div>
        ))}
    </section>
  );
};

export default index;

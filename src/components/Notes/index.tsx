import { useNotes } from "../../hooks/useNotes";
import styles from "./styles.module.css";

const index = () => {
  const { data } = useNotes();

  console.log(data);

  return (
    <section className={styles.section_notes}>

       {data && data.map((note) => ( 
        <div key={note.id} className={styles.notes_card}>
            <h1>{note.text}</h1>
        </div>
        ))}

    </section>
  );
};

export default index;

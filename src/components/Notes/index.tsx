import { useNotes } from "../../hooks/useNotes";
import styles from "./styles.module.css";
import editIcon from '../../assets/icons/edit.svg';

const index = () => {
  const { data } = useNotes();

  console.log(data);

  return (
    <section className={styles.section_notes}>


       {data && data.map((note) => ( 
        <div key={note.id} className={styles.notes_card}>

            <span className={styles.icon_edit}><img src={editIcon} alt="" /></span>
            
            <h1>{note.title}</h1>
            
            <p>{note.text}</p>


        </div>
        ))}

    </section>
  );
};

export default index;
 
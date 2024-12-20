import Notes from '../Notes'
import styles from './styles.module.css'

const index = () => {
  return (
    <>
    <main className={styles.container}>

      <h1 className={styles.title}>Notes<span>Pad</span></h1>

      <Notes />
      
    </main>
    </>
  )
}

export default index
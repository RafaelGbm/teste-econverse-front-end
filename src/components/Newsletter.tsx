import styles from '../styles/Newsletter.module.scss'

function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2>Inscreva-se na nossa newsletter</h2>
          <p>
            Assine a nossa newsletter e receba as novidades e conteúdos
            exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.form}>
          <div className={styles.fields}>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              aria-label="Nome"
            />
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              aria-label="E-mail"
            />
            <button type="submit">Inscrever</button>
          </div>

          <label className={styles.terms}>
            <input type="checkbox" name="terms" />
            Aceito os termos e condições
          </label>
        </form>
      </div>
    </section>
  )
}

export default Newsletter

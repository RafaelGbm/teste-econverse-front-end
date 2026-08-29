import styles from './Banner.module.scss'

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1>Venha conhecer nossas promoções</h1>
        <p className={styles.offer}>
          <strong>50% Off</strong> nos produtos
        </p>
        <a href="#" className={styles.button}>
          Ver produto
        </a>
      </div>
    </section>
  )
}

export default Banner

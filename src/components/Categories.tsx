import type { CSSProperties } from 'react'
import { categories, currentCategory } from '../data/categories'
import styles from './Categories.module.scss'

function Categories() {
  return (
    <section aria-label="Compre por categoria">
      <ul className={styles.list}>
        {categories.map(({ name, icon, iconSize }) => (
          <li
            key={name}
            className={name === currentCategory ? styles.current : undefined}
          >
            <div className={styles.card}>
              {/* The icons are bitmaps, so they are painted through a mask
                  rather than drawn — that is what lets the colour change. */}
              <span
                className={styles.icon}
                style={
                  {
                    '--icon': `url(${icon})`,
                    '--icon-size': `${iconSize}px`,
                  } as CSSProperties
                }
              />
            </div>
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Categories

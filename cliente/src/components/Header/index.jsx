import { Link } from "react-router-dom";

import styles from "./index.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.conteudo}>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.logo}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                        <path fill="#de4032" d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" /></svg>
                        <span className={styles.corPrimaria}>Tour</span><span className={styles.corContraste}>Spot</span>
                    </Link>
                    <Link to="/">Início</Link>
                    <Link to="/pontos-turisticos">Pontos Turísticos</Link>
                </nav>
            </div>
        </header>
    )
}
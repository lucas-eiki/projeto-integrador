import { Link } from "react-router-dom";

import styles from "./index.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.conteudo}>
                <nav className={styles.nav}>
                    <Link to="/">Projeto Integrador</Link>
                    <Link to="/">Início</Link>
                    <Link to="/pontos-turisticos">Pontos Turísticos</Link>
                </nav>
                <div className={styles.botoes}>
                    <button className={styles.botao}>Entrar</button>
                    <button className={`${styles.botao} ${styles.botaoCadastrar}`}>Cadastrar</button>
                </div>
            </div>
        </header>
    )
}
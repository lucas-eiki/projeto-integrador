import styles from "./index.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.conteudo}>
                <nav className={styles.nav}>
                    <a href="#">Projeto Integrador</a>
                    <a href="#">Início</a>
                    <a href="#">Buscar</a>
                </nav>
                <div className={styles.botoes}>
                    <button className={styles.botao}>Entrar</button>
                    <button className={`${styles.botao} ${styles.botaoCadastrar}`}>Cadastrar</button>
                </div>
            </div>
        </header>
    )
}
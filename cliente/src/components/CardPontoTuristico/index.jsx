import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import styles from "./index.module.css";

export const CardPontoTuristico = ({ id, nome, descricao, endereco, estado, categoria, buscarPontosTuristicos }) => {
    const [isMaisAcoesAtivo, setIsMaisAcoesAtivo] = useState(false);

    async function deletarPontoTuristico() {
        await axios.delete(`http://localhost:8080/pontos-turisticos/${id}`);
        await buscarPontosTuristicos();
    }

    return (
        <div className={styles.pontoTuristico}>
            <div className={styles.topo}>
                <div className={styles.titulo}>
                    <h2>{nome}</h2>
                    <span className={styles.categoria}>{categoria}</span>
                </div>
                <div className={styles.maisAcoesContainer}>
                    <button onClick={() => setIsMaisAcoesAtivo(prev => !prev)} className={styles.maisAcoes}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                            <path fill="#121212" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" /></svg>
                    </button>
                    {
                        isMaisAcoesAtivo &&
                        <div className={styles.botoesMaisAcoes}>
                            <button>Editar</button>
                            <button onClick={deletarPontoTuristico} className={styles.botaoExcluir}>Excluir</button>
                        </div>
                    }
                </div>
            </div>
            <p className={styles.descricao}>{descricao}</p>
            <div className={styles.enderecoContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                    <path fill="#393939" d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
                </svg>
                <p>{endereco} - {estado}</p>
            </div>
            <Link to={`/pontos-turisticos/${id}`} className={styles.verDetalhes}>Ver Detalhes</Link>
        </div>
    )
}
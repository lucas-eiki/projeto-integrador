import { useEffect, useState } from "react"
import { CardPontoTuristico } from "../../components/CardPontoTuristico";
import axios from "axios";

import styles from "./index.module.css";

export const PontosTuristicos = () => {
    const [pontosTuristicos, setPontosTuristicos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resposta = await axios.get("http://localhost:8080/pontos-turisticos");
            if (resposta.status == 200) {
                setPontosTuristicos(resposta.data);
            } else {
                alert("Erro ao buscar pontos turísticos")
            }
        }

        fetchData()
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.titulo}>
                <h1>Conheça, explore e descubra sua próxima viagem!</h1>
                <p>Encontre destinos incríveis, experiências únicas e tudo o que você precisa para planejar a viagem dos seus sonhos.</p>
            </div>

            <div className={styles.barraPesquisaContainer}>
                <input className={styles.barraPesquisa} type="text" placeholder="Pesquisar" />
                <button className={styles.lupa}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                        <path fill="#393939" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                    </svg>
                </button>
            </div>

            <ul className={styles.listaPontosTuristicos}>
                {pontosTuristicos.length > 0 ?
                    pontosTuristicos.map(pontoTuristico =>
                        <CardPontoTuristico key={pontoTuristico.id}
                            nome={pontoTuristico.nome}
                            descricao={pontoTuristico.descricao}
                            endereco={pontoTuristico.endereco}
                            estado={pontoTuristico.estado}
                            categoria={pontoTuristico.categoria}
                        />
                    )
                    :
                    <span>Não há pontos turísticos cadastrados!</span>
                }
            </ul>
        </main>
    )
}
import { Link, useParams } from "react-router-dom"
import axios from "axios";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header"

import styles from "./index.module.css"

export const PontoTuristico = () => {
    const params = useParams();

    const [pontoTuristico, setPontoTuristico] = useState({
        id: "",
        nome: "",
        descricao: "",
        endereco: "",
        estado: "",
        categoria: ""
    });

    useEffect(() => {
        async function fetchData() {
            await buscarPontoTuristico();
        }

        fetchData()
    }, [])

    async function buscarPontoTuristico() {
        const resposta = await axios.get(`http://localhost:8080/pontos-turisticos/${params.id}`);
        if (resposta.status == 200) {
            setPontoTuristico(resposta.data);
        } else if (resposta.status == 204) {
            setPontoTuristico({});
        } else {
            alert("Erro ao buscar pontos turísticos")
        }
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <Link to="/pontos-turisticos" className={styles.botaoVoltar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                    <path fill="#121212" d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"/></svg>
                    Voltar
                </Link>
                <div className={styles.titulo}>
                    <h2>{pontoTuristico.nome}</h2>
                    <span className={styles.categoria}>{pontoTuristico.categoria}</span>
                </div>
                <p className={styles.descricao}>{pontoTuristico.descricao}</p>
                <div className={styles.enderecoContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                        <path fill="#393939" d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
                    </svg>
                    <p>{pontoTuristico.endereco} - {pontoTuristico.estado}</p>
                </div>
            </main>
        </>
    )
}
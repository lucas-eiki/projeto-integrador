import { useState } from "react"
import {estados} from "./estados"

import axios from "axios"

import styles from "./index.module.css";

export const ModalCadastroPontoTuristico = ({setIsCadastrando}) => {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [endereco, setEndereco] = useState("");
    const [estado, setEstado] = useState("");
    const [categoria, setCategoria] = useState("");

    async function cadastrarPontoTuristico() {
        try {
            await axios.post("http://localhost:8080/pontos-turisticos",
                {
                    "nome": nome,
                    "descricao": descricao,
                    "endereco": endereco,
                    "estado": estado,
                    "categoria": categoria
                }
            )

            alert("Ponto turístico cadastrado com sucesso");
        } catch (erro) {
            alert(erro.message);
        }
    }

    return (
        <div className={styles.modal}>
            <button className={styles.btnFechar}
                onClick={() => setIsCadastrando(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                <path fill="#de4032" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>
            </button>
            <h3>Cadastre um novo ponto turístico</h3>
            <input className={styles.input} type="text" placeholder="Nome do ponto turístico" onChange={(e) => setNome(e.target.value)} value={nome}/>
            <textarea className={styles.input} type="text" placeholder="Descrição do local" onChange={(e) => setDescricao(e.target.value)} value={descricao}/>
            <input className={styles.input} type="text" placeholder="Endereço do local" onChange={(e) => setEndereco(e.target.value)} value={endereco}/>
            <select className={styles.input} name="estado" id="estado" onChange={(e) => setEstado(e.target.value)} value={estado}>
                <option value="">Selecione um Estado</option>
                {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
            </select>
            <input className={styles.input} type="text" placeholder="Categoria do ponto turístico" onChange={(e) => setCategoria(e.target.value)} value={categoria}/>
            <button className={styles.btnCadastrar} onClick={cadastrarPontoTuristico}>Cadastrar</button>
        </div>
    )
}
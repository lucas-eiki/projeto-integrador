import { useEffect, useState } from "react"

import axios from "axios"

import styles from "./index.module.css";

export const ModalCadastroPontoTuristico = ({setIsCadastrando, buscarPontosTuristicos}) => {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [endereco, setEndereco] = useState("");
    const [estadoId, setEstadoId] = useState("");
    const [categoria, setCategoria] = useState("");

    const [estados, setEstados] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const respostaEstados = await axios.get("http://localhost:8080/estados")
            if (respostaEstados.status == 200) {
                setEstados(respostaEstados.data);
            }
        }

        fetchData()
    }, [])

    async function cadastrarPontoTuristico() {
        try {
            await axios.post("http://localhost:8080/pontos-turisticos",
                {
                    "nome": nome,
                    "descricao": descricao,
                    "endereco": endereco,
                    "estadoId": estadoId,
                    "categoria": categoria
                }
            )
            await buscarPontosTuristicos();
            fecharModal();
            alert("Ponto turístico cadastrado com sucesso");
        } catch (erro) {
            if (erro.response.status == 400) {
                const erros = erro.response.data.erros;
                const mensagemErro = Object.values(erros).join("\n");
                alert(mensagemErro);
                return;
            }
            if (erro.response.status == 409) {
                alert(erro.response.data.mensagem);
                return;
            }
            alert("Ocorreu um erro ao cadastrar o ponto turístico.")
        }
    }

    function fecharModal() {
        setIsCadastrando(false);
        setNome("");
        setDescricao("");
        setEndereco("");
        setEstadoId("");
        setCategoria("");
    }

    return (
        <div className={styles.modal}>
            <button className={styles.btnFechar}
                onClick={fecharModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                <path fill="#de4032" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>
            </button>
            <h3>Cadastre um novo ponto turístico</h3>
            <input className={styles.input} type="text" placeholder="Nome do ponto turístico" onChange={(e) => setNome(e.target.value)} value={nome}/>
            <input className={styles.input} type="text" placeholder="Categoria do ponto turístico" onChange={(e) => setCategoria(e.target.value)} value={categoria}/>
            <textarea className={styles.input} type="text" placeholder="Descrição do local" onChange={(e) => setDescricao(e.target.value)} value={descricao}/>
            <select className={styles.input} name="estado" id="estado" onChange={(e) => setEstadoId(e.target.value)} value={estadoId}>
                <option value="">Selecione um Estado</option>
                {estados.map(estado => <option key={estado.id} value={estado.id}>{estado.nome}</option>)}
            </select>
            <input className={styles.input} type="text" placeholder="Endereço do local" onChange={(e) => setEndereco(e.target.value)} value={endereco}/>
            <button className={styles.btnCadastrar} onClick={cadastrarPontoTuristico}>Cadastrar</button>
        </div>
    )
}
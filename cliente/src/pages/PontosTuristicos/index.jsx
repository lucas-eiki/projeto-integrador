import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header"
import { ModalCadastroPontoTuristico } from "../../components/ModalCadastroPontoTuristico"

import styles from './index.module.css';
import { CardPontoTuristico } from "../../components/CardPontoTuristico";

export const PontosTuristicos = () => {
    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [formData, setFormData] = useState({
        pesquisa: "",
        endereco: "",
        estados: []
    })
    const [estados, setEstados] = useState([]);

    const [isCadastrando, setIsCadastrando] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await buscarPontosTuristicos();

            const respostaEstados = await axios.get("http://localhost:8080/estados")
            if (respostaEstados.status == 200) {
                setEstados(respostaEstados.data);
            }
        }

        fetchData()
    }, [])

    async function buscarPontosTuristicos() {
        const resposta = await axios.get(`http://localhost:8080/pontos-turisticos`, {
            params: {
                q: formData.pesquisa,
                endereco: formData.endereco,
                estadosId: formData.estados
            }
        });
        if (resposta.status == 200) {
            setPontosTuristicos(resposta.data);
        } else if (resposta.status == 204) {
            setPontosTuristicos([]);
        } else {
            alert("Erro ao buscar pontos turísticos")
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        buscarPontosTuristicos();
    }

    function handleOnChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleOnChangeCheckbox(event) {
        const { checked, value } = event.target;
        setFormData(prev => ({
            ...prev,
            estados: checked ? [...prev.estados, value] : prev.estados.filter(estado => estado !== value)
        }))
    }

    function desmarcarTodos() {
        setFormData(prev => ({ ...prev, estados: [] }));
    }

    function limparCampo(campo) {
        setFormData(prev => ({ ...prev, [campo]: "" }))
    }

    return (
        <>
            <Header />

            <div className={styles.corpo}>
                <aside className={styles.aside}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputContainer}>
                            <div className={styles.labelContainer}>
                                <label htmlFor="pesquisa-ipt">Pesquisar</label>
                                {formData.pesquisa != "" && <button onClick={() => limparCampo("pesquisa")}>Limpar</button>}
                            </div>
                            <input className={styles.inputText} onChange={handleOnChange} type="text" name="pesquisa" id="pesquisa-ipt" placeholder="Nome, descrição.." value={formData.pesquisa} />
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.labelContainer}>
                                <label htmlFor="endereco-ipt">Endereço</label>
                                {formData.endereco != "" && <button onClick={() => limparCampo("endereco")}>Limpar</button>}
                            </div>
                            <input className={styles.inputText} onChange={handleOnChange} type="text" name="endereco" id="endereco-ipt" placeholder="Endereço..." value={formData.endereco} />
                        </div>

                        <div className={styles.estadoLabelContainer}>
                            <h3>Estado</h3>
                            {formData.estados.length > 0 && <button onClick={desmarcarTodos}>Limpar seleção</button>}
                        </div>
                        <div className={styles.estados}>
                            {estados.map(estado =>
                                <label key={estado.id} className={styles.labelEstado}>
                                    <input onChange={handleOnChangeCheckbox} type="checkbox" name="estados" value={estado.id} id={estado.id} checked={formData.estados.includes(String(estado.id))} />
                                    {estado.nome}
                                </label>
                            )}
                        </div>

                        <button type="submit" className={styles.btnBuscar}>Buscar</button>
                    </form>
                </aside>

                <main className={styles.main}>
                    <div className={styles.topo}>
                        <h1>Pontos Turísticos</h1>
                        <button className={styles.btnAdicionar}
                            onClick={() => setIsCadastrando(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                {/* <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                                <path fill="#fafafa" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z" /></svg>
                            Adicionar ponto turístico
                        </button>
                    </div>



                    <ul className={styles.listaPontosTuristicos}>
                        {pontosTuristicos.length > 0 ?
                            pontosTuristicos.map(pontoTuristico =>
                                <CardPontoTuristico key={pontoTuristico.id}
                                    id={pontoTuristico.id}
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
            </div>

            {isCadastrando && <ModalCadastroPontoTuristico setIsCadastrando={setIsCadastrando} buscarPontosTuristicos={buscarPontosTuristicos} />}
        </>
    )
}
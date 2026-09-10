import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header"
import { ModalCadastroPontoTuristico } from "../../components/ModalCadastroPontoTuristico"

import styles from './index.module.css';

export const PontosTuristicos = () => {
    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [formData, setFormData] = useState({
        pesquisa: "",
        endereco: "",
        estados: []
    })
    // const [estados, setEstados] = useState([]);
    const estados = [
        { id: 1, nome: "Acre" },
        { id: 2, nome: "Alagoas" },
        { id: 3, nome: "Amapá" },
        { id: 4, nome: "Amazonas" },
        { id: 5, nome: "Bahia" },
        { id: 6, nome: "Ceará" },
        { id: 7, nome: "Distrito Federal" },
        { id: 8, nome: "Espírito Santo" },
        { id: 9, nome: "Goiás" },
        { id: 10, nome: "Maranhão" },
        { id: 11, nome: "Mato Grosso" },
        { id: 12, nome: "Mato Grosso do Sul" },
        { id: 13, nome: "Minas Gerais" },
        { id: 14, nome: "Pará" },
        { id: 15, nome: "Paraíba" },
        { id: 16, nome: "Paraná" },
        { id: 17, nome: "Pernambuco" },
        { id: 18, nome: "Piauí" },
        { id: 19, nome: "Rio de Janeiro" },
        { id: 20, nome: "Rio Grande do Norte" },
        { id: 21, nome: "Rio Grande do Sul" },
        { id: 22, nome: "Rondônia" },
        { id: 23, nome: "Roraima" },
        { id: 24, nome: "Santa Catarina" },
        { id: 25, nome: "São Paulo" },
        { id: 26, nome: "Sergipe" },
        { id: 27, nome: "Tocantins" },
        { id: 28, nome: "Nenhum" }
    ];
    const [isCadastrando, setIsCadastrando] = useState(false);

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

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(formData);

    }

    function handleOnChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleOnChangeCheckbox(event) {
        const { checked, value } = event.target;
        setFormData(prev => ({
            ...prev,
            estados: checked
            ? [...prev.estados, value]
            : prev.estados.filter(estado => estado !== value)
        }))
    }

    return (
        <>
            <Header />

            <div className={styles.corpo}>
                <aside className={styles.aside}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="pesquisa-ipt">Pesquisar</label>
                            <input className={styles.inputText} onChange={handleOnChange} type="text" name="pesquisa" id="pesquisa-ipt" placeholder="Nome, descrição..." />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="endereco-ipt">Endereço</label>
                            <input className={styles.inputText} onChange={handleOnChange} type="text" name="endereco" id="endereco-ipt" placeholder="Endereço..." />
                        </div>

                        <h3>Estado</h3>
                        <div className={styles.estados}>
                            {estados.map(estado =>
                                <label key={estado.id} className={styles.labelEstado}>
                                    <input onChange={handleOnChangeCheckbox} type="checkbox" name="estados" value={estado.id} id={estado.id} />
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

            {isCadastrando && <ModalCadastroPontoTuristico setIsCadastrando={setIsCadastrando} />}
        </>
    )
}
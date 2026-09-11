import { createBrowserRouter } from "react-router-dom"
import { Inicio } from "./pages/Inicio"
import { PontosTuristicos } from "./pages/PontosTuristicos"
import { PontoTuristico } from "./pages/PontoTuristico"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
        errorElement: <div>Erro ao carregar a página de Início</div>
    },
    {
        path: "/pontos-turisticos",
        element: <PontosTuristicos />,
        errorElement: <div>Erro ao carrecar a página dos Pontos Turísticos</div>,
    },
    {
        path: "/pontos-turisticos/:id",
        element: <PontoTuristico />,
        errorElement: <div>Erro ao carregar página do Ponto Turístico</div>
    },
    {
        path: "*",
        element: <div>Página não encontrada</div>
    }
])
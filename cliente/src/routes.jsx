import {createBrowserRouter} from "react-router-dom"
import { Inicio } from "./pages/Inicio"
import { PontosTuristicos } from "./pages/PontosTuristicos"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
        errorElement: <div>Erro</div>
    },
    {
        path: "/pontos-turisticos",
        element: <PontosTuristicos />,
        errorElement: <div>Erro</div>
    },
    {
        path: "*",
        element: <div>Not Found</div>
    }
])
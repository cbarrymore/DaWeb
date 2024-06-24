import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import ListaEstacion from "../components/TablaEstaciones";
import Gateway from "../configs/constants";
import Pagination from "../components/Pagination";
import { EstacionesPaginada } from "../components/EstacionesPaginadas";
export const Estaciones = () => {
    

    return (
        <div>
            <EstacionesPaginada filters={false}/>
        </div>
    );

}
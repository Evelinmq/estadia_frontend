import {Header} from "../Components/Structure/Header.jsx";
import AfiliadoCard from "../Components/Admin/AfiliadoCard.jsx";

export default function Afiliados() {
    return (
        <>
            <Header seccion="afiliados"/>
            <AfiliadoCard
                nombre="Ana"
                apellidoP="Martínez"
                apellidoM="Pérez"
                genero="Femenino"
                edad={19}
                telefono="777 987 6543"
            />
        </>
    );


}
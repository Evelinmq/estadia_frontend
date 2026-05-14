import {Header} from "../Components/Structure/Header.jsx";
import BeneficiarioCard from "../Components/Admin/BeneficiarioCard.jsx";

export default function Beneficiarios() {
    return (
        <>
            <Header seccion="beneficiarios"/>
            <BeneficiarioCard
                nombre="Juan"
                apellidoP="García"
                apellidoM="López"
                genero="Masculino"
                edad={22}
                telefono="777 123 4567"
                municipio="Temixco"
                colonia="Centro"
                correo="juan@mail.com"
            />

        </>
    );
}
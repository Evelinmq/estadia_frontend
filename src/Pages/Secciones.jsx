import SectionCard from '../Components/SectionCard';

export default function Sidebar(){

    //const handleImageChange = (e) => {
      //  const file = e.target.files[0];
        //if (file) {
          //  const url = URL.createObjectURL(file);
            //setImagen(url); // guarda esta url en tu estado y pásala como prop
        //}
    //};

    return (
        <SectionCard
            titulo="Emprende tu negocio"
            descripcion="Se busca ayudar a la gente a poder emprender su propio negocio, con precios accesibles."

            onEdit={() => console.log("editar")}
            onDelete={() => console.log("eliminar")}
        />
    )
}



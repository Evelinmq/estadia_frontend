const BASE_URL = 'http://localhost:8080';


const getHeaders = () => {
     const token = localStorage.getItem("token");
     
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// obtener
export const obtenerDatos = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error al obtener datos de ${endpoint} (Status: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en GET:', error);
        throw error;
    }
};

// enviar
export const enviarDatos = async (endpoint, data) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error al enviar datos a ${endpoint} (Status: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en POST:', error);
        throw error;
    }
};

//actualizar
export const actualizarDatos = async (endpoint, data) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(), 
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar datos en ${endpoint} (Status: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en PUT:', error);
        throw error;
    }
};

// eliminar
export const eliminarDatos = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`No se pudo eliminar el registro en ${endpoint} (Status: ${response.status})`);
        }

        return true;

    } catch (error) {
        console.error('Error en DELETE:', error);
        throw error;
    }
};
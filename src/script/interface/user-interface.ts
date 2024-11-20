export interface User {
    name: {
        title: string;
        first: string;
        last: string;
    };
    gender: string;
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string | number;
    };
    registered: {
        date: string;
        age: number;
    };
    // Añadir otras propiedades según los datos de la API
}
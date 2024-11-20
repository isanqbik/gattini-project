import { Cat } from "./cat-interface";

export interface CombinedData extends Cat {
    catName: {
        title: string;
        first: string;
        last: string;
    };
    catGender: string;
    catLocation: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string | number;
    };
    catRegistered: {
        date: string;
        age: number;
    };
    catPreferite: boolean;
}
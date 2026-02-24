import { Tipos } from "./tipos.model";

export interface Pokemon {
    numero: string;
    nombre: string;
    region: string; // Foreign Key UUID referencing regiones
    tipo_1: string; // Foreign Key UUID referencing tipos
    tipo_2: string | null; // Foreign Key UUID referencing tipos
    debilidad_1: string | null; // Foreign Key UUID referencing tipos
    debilidad_2: string | null; // Foreign Key UUID referencing tipos
    debilidad_3: string | null; // Foreign Key UUID referencing tipos
    debilidad_4: string | null; // Foreign Key UUID referencing tipos
    debilidad_5: string | null; // Foreign Key UUID referencing tipos
    debilidad_6: string | null; // Foreign Key UUID referencing tipos
    debilidad_7: string | null; // Foreign Key UUID referencing tipos
    key_pokedex: string; // Primary Key UUID
    weaknesses: Tipos[]; // Añade esta línea
  }
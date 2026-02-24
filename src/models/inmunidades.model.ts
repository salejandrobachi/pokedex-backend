export interface Inmunidad {
    tipo: string; // Foreign Key UUID
    inmune_1: string; // Foreign Key UUID referencing tipos
    inmune_2: string; // Foreign Key UUID referencing tipos
    key_inmune: string; // Primary Key
  }
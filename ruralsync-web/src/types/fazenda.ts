// Interface que espelha exatamente o nosso banco em português
export interface IFazenda {
  id: number;
  nome: string;
  tipo_contrato: string;   // "Própria" ou "Arrendada"
  gerente?: string | null;
  telefone?: string | null;
  tipo_manejo?: string | null;
  finalidade?: string | null; // "Corte", "Leite", etc.
  suplemento?: string | null;
  fonte_agua?: string | null;
  total_gado: number;
  area_ha?: number | null;
  cidade?: string | null;
  estado?: string | null;
  endereco?: string | null;
  criado_em: string | Date;
}
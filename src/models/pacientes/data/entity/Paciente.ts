export interface Paciente {
    codigo: string;
    nome: string;
    cpf: string;
    contato: string;
    empresaId: string;
}
  
export interface PacienteCriacaoDto {
    nome: string;
    cpf: string;
    contato: string;
    empresaId: string;
}
  
export interface PacienteUpdateDto {
    nome?: string;
    cpf?: string;
    contato?: string;
    empresaId?: string;
}
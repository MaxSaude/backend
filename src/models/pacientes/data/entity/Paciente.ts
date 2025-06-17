export interface Paciente {
    codigo: string;
    nome: string;
    cpf: string;
    contato: string;
    empresaId: string;
    cidade: string;
    bairro: string;
    estado: string;
    endereco: string;
    numero: string;
    complemento: string;
}
  
export interface PacienteCriacaoDto {
    nome: string;
    cpf: string;
    contato: string;
    empresaId: string;
    cidade?: string;
    bairro?: string;
    estado?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
}
  
export interface PacienteUpdateDto {
    nome?: string;
    cpf?: string;
    contato?: string;
    empresaId?: string;
    cidade?: string;
    bairro?: string;
    estado?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
}
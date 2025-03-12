export interface Agendamento {
    cpf: string;
    nome: string;
    nomeEmpresa: string;
    tipoConsulta: string;
  }
  
  export interface AgendamentoCriacaoDto {
    nome: string;
    nomeEmpresa: string;
    tipoConsulta: string;
  }
  
  export interface AgendamentoUpdateDto {
    nome?: string;
    nomeEmpresa?: string;
    tipoConsulta?: string;
  }
export interface Empresa {
    codigo: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    telefone: String;
    cidade: String;
    bairro: String;
    estado: String;
    endereco: String;
    numero: String;
    complemento: String;
  }
  
  export interface EmpresaCriacaoDto {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    telefone?: string;
    cidade?: string;
    bairro?: string;
    estado?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
  }
  
  export interface EmpresaUpdateDto {
    razaoSocial?: string;
    nomeFantasia?: string;
    cnpj?: string;
    telefone?: string;
    cidade?: string;
    bairro?: string;
    estado?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
  }
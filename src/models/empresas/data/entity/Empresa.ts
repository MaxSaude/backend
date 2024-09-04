export interface Empresa {
    codigo: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
  }
  
  export interface EmpresaCriacaoDto {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
  }
  
  export interface EmpresaUpdateDto {
    razaoSocial?: string;
    nomeFantasia?: string;
    cnpj?: string;
  }
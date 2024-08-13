export interface Disciplina {
    codigo: string;
    nome: string;
    senha: string;

  }
  
  export interface DisciplinaCriacaoDto {
    nome: string;
    senha: string;

  }
  
  export interface DisciplinaUpdateDto {
    nome?: string;
    senha?: string;
  }
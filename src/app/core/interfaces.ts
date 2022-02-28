
export interface IApiResponse<T> {
  content: T[],
  last: boolean,
  totalPages: number,
  totalElements: number,
  number: number,
  size: number,
  sort: {
      sorted?: boolean,
      unsorted?: boolean,
      empty?: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}

export interface IPais {
  id: number,
  nome: string,
  capital: string,
  regiao: string,
  subRegiao: string,
  area: number
}

export interface IPaisFiltro {
  nome?: string,
  pagina: number,
  itensPorPagina: number
}

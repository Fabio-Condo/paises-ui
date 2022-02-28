import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { IApiResponse, IPais, IPaisFiltro} from '../core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  paisesUrl = 'http://localhost:8080/paises';

  pesquisar(filtro: IPaisFiltro): Observable<IApiResponse<IPais>> {  

    let params = new HttpParams()  
      .set('page', filtro.pagina)  
      .set('size', filtro.itensPorPagina);  

    if (filtro.nome) {  
      params = params.set('nome', filtro.nome); 
    }

    console.log(params);
    console.log("Passando pelo metodo listar");

    return this.http.get<IApiResponse<IPais>>(`${this.paisesUrl}`, { params });
  }

  excluir(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.paisesUrl}/${codigo}`, { });
  }

  adicionar(pais: IPais): Observable<IPais> {
    return this.http.post<IPais>(this.paisesUrl, pais, { });
  }

  atualizar(pais: IPais): Observable<IPais> {
    return this.http.put<IPais>(`${this.paisesUrl}/${pais.id}`, pais, { });
  }

  buscarPorCodigo(codigo: number): Observable<IPais> {
    return this.http.get<IPais>(`${this.paisesUrl}/${codigo}`, { });
  }

}

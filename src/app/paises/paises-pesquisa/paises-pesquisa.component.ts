import { Component, ViewChild, OnInit } from '@angular/core';
import { IApiResponse, IPais, IPaisFiltro} from '../../core/interfaces';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { PaisService } from './../pais.service';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-paises-pesquisa',
  templateUrl: './paises-pesquisa.component.html',
  styleUrls: ['./paises-pesquisa.component.css']
})
export class PaisesPesquisaComponent implements OnInit {

  constructor(
    private paisService: PaisService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa do país');
  }

  @ViewChild('tabela') grid: any;


  totalRegistros: number = 0
  paises: IPais[] = [] ;

  filtro: IPaisFiltro = {
    pagina: 0,
    itensPorPagina: 4
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.paisService.pesquisar(this.filtro)
      .subscribe((dados: IApiResponse<IPais>) => {
        this.paises = dados.content
        this.totalRegistros = dados.totalElements
      });

    this.paisService.pesquisar(this.filtro)
      .subscribe((dados) => {
        this.paises = dados.content
        this.totalRegistros = dados.totalElements
    },
      (erro) => this.errorHandler.handle(erro)
    );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;  
    this.pesquisar(pagina);
  }

  excluir(pais: IPais) {
    this.paisService.excluir(pais.id)
      .subscribe(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }
        this.messageService.add({ severity: 'success', detail: 'País excluído com sucesso!' })
      },
        (error) => this.errorHandler.handle(error)
      )
  }

  confirmarExclusao(pais: IPais): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(pais);
      }
    });
  }


}

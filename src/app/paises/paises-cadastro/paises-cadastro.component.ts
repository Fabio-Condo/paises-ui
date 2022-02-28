import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PaisService } from '../pais.service';
import { IPais } from '../../core/interfaces';
import { Pais } from './../../core/navbar/model';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-paises-cadastro',
  templateUrl: './paises-cadastro.component.html',
  styleUrls: ['./paises-cadastro.component.css']
})
export class PaisesCadastroComponent implements OnInit {

  pais: IPais = new Pais();

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private paisService: PaisService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }



  ngOnInit(): void {

    this.title.setTitle('Novo país')

    console.log(this.route.snapshot.params['id']);
    const codigoPais = this.route.snapshot.params['id'];

    if (codigoPais) {
      this.carregarPais(codigoPais)
      console.log(this.pais);
    }

  }
  get editando() {
    return Boolean(this.pais.id)
  }

  salvar(paisForm: NgForm) {
    if (this.editando) {
      this.atualizarPais(paisForm)
    } else {
      this.adicionarPais(paisForm)
    }
  }

  adicionarPais(paisForm: NgForm) {
    this.paisService.adicionar(this.pais)
      .subscribe(
        (paisAdicionado) => {
          this.messageService.add({ severity: 'success', detail: 'País adicionado com sucesso!' });

          this.router.navigate(['/paises', paisAdicionado.id]);

        },
        erro => this.errorHandler.handle(erro)
      );
  }

  atualizarPais(paisForm: NgForm) {
    this.paisService.atualizar(this.pais)
      .subscribe(
        (pais) => {
          this.pais = pais;
          this.messageService.add({ severity: 'success', detail: 'País alterado com sucesso!' });

          this.router.navigate(['/paises', pais.id]);
          this.atualizarTituloEdicao()
        },
        erro => this.errorHandler.handle(erro)
      )
  }

  carregarPais(codigo: number) {
    this.paisService.buscarPorCodigo(codigo)
      .subscribe(pais => {
        this.pais = pais;
        this.atualizarTituloEdicao()
      },
      erro => this.errorHandler.handle(erro));
  }

    novo(paisForm: NgForm) {
      paisForm.reset(new Pais);

      this.router.navigate(['paises/novo']);
    }

    private atualizarTituloEdicao() {
      this.title.setTitle(`Edição do país: ${this.pais.nome}`);
    }


}

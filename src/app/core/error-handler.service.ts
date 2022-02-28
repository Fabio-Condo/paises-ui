import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }  // Para mostrar a mensagem de erro ao usuario usaremos o serviço de mensagens

  handle(errorResponse: any) {  // Aqui vamos receber um objecto que representa o nosso erro(pode ser mensagem, ou um objecto response http)
    let msg: string;
  /*
    if (typeof errorResponse === 'string') {  // Se o tipo de erro for uma string, entao simplesmente mostre essa mensagem
      msg = errorResponse;
    } else {  // Se nao for string, atribua uma mensagem fixa
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);  // Motrando uma mensagem de erro
    }

    this.messageService.add({ severity:'error', detail: msg }); // No fim adiciona o tipo de erro no serviço de mensagens
    */

   if (typeof errorResponse === 'string') {
    msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {   // So vai vai acontecer se a API Restornar erros. Nota: Tratar erros na API para essas ações acontecerem
          msg = 'Ocorreu um erro ao processar a sua solicitação';  // Mensagem que será mostrada caso o erro esteja no intervalo de 400 a 499. Exemplo: 404 id nao encontrado

          if (errorResponse.status === 403) { // Se o erro for 403, mostra a mensagem de que nao tem permissao
            msg = 'Você não tem permissão para executar esta ação';
          }

          try {
            msg = errorResponse.error[0].mensagemUsuario;
          } catch (e) { }

          console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';  // Mensagem que será mostrada caso a chave estrangeira estiver sendo usada por um outro objecto. E outros erros
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity:'error', detail: msg });

  }
}

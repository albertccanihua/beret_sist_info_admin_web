import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  throw(error: HttpErrorResponse) {

    if (error.status == 401) {
      if (error.error.message == 'Credentials are not valid') {
        this.presentToast('Usuario y/o Contraseña inválidos!');
      }

      this.router.navigateByUrl('/auth/login');
    } else {
      this.presentToast(error.error.message);
    }

    return throwError(() => error);
  }

  async presentToast(message: string) {
    this.messageService.add({
      severity: 'danger',
      summary: 'Error',
      detail: message,
      life: 10000,
      closable: true
    });
  }
}

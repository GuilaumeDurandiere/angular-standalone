import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { MessageService } from 'primeng/api';
import { catchError, of, throwError } from 'rxjs';

const messageErrors: Map<string, string> = new Map([
  ['WORKFLOW_NAME_ALREADY_EXISTS', $localize`:@@WORKFLOW_NAME_ALREADY_EXISTS:Le nom existe déjà`]
])

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      console.log(error)

      if (error.status === 400 && error.error.Message) {
        const detail = messageErrors.get(error.error.Message)

        messageService.add({ severity: 'error', summary: 'Erreur', detail })

        return of();
      }

      return throwError(() => error);
    })
  );
};


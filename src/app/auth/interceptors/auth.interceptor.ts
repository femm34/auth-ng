import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  console.log('Interceptor se ejecutó');

  const authService = inject(AuthService);

  req = req.clone({
    withCredentials: true
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en la respuesta HTTP:', error);

      // Si la respuesta es un 403, intentamos refrescar el token
      if (error.status === 403) {
        const refreshToken = authService.getRefreshToken();
        if (refreshToken) {
          // Si tenemos un refresh token, intentamos obtener un nuevo access token
          return authService.refreshToken(refreshToken).pipe(
            switchMap((newToken) => {
              authService.setCredentials(newToken.data);
              req = req.clone({
                withCredentials: true,
              });
              // Vuelve a intentar la solicitud original con el nuevo token
              return next(req);
            })
          );
        } else {
          // Si no tenemos refresh token, lanza un error
          return throwError(() => new Error('No refresh token available'));
        }
      }

      // Si el error no es 403, simplemente lanzamos el error original
      return throwError(() => error);
    })
  );
};

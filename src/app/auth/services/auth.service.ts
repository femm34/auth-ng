import { Injectable, signal } from '@angular/core';
import { GlobalResponse } from '../../shared/schemas/global-response.schema';
import { ClientResponse } from '../schemas/client-response.schema';
import { Observable } from 'rxjs';
import { ClientRequest } from 'http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginResponse } from '../schemas/login-response.schema';
import { LoginRequest } from '../schemas/login-request.schema';
import { RequestResetPasswordRequest } from '../schemas/request-reset-password-request.schema';
import { ChangePasswordRequest } from '../schemas/change-password-request.schema';
import { Role } from '../types/role.type';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = 'http://localhost:8080/api/v1/auth'; // Puedes configurar esto en environments si prefieres
  private isAuthenticatedSignal = signal<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  signUp(data: ClientRequest): Observable<GlobalResponse<ClientResponse>> {
    return this.http.post<GlobalResponse<ClientResponse>>(`${this.BASE_URL}/sign-up`, data);
  }

  signIn(data: LoginRequest): Observable<GlobalResponse<LoginResponse>> {
    return this.http.post<GlobalResponse<LoginResponse>>(`${this.BASE_URL}/sign-in`, data, {
      withCredentials: true
    });
  }

  getAccessToken(): string | null {
    return this.cookieService.get('accessToken') || null;
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refreshToken') || null;
  }

  setCredentials(data: LoginResponse): void {
    this.cookieService.set('refreshToken', data.refreshToken);
  }

  requestPasswordReset(data: RequestResetPasswordRequest): Observable<GlobalResponse<null>> {
    return this.http.post<GlobalResponse<null>>(`${this.BASE_URL}/request-password-reset`, data);
  }

  resetPassword(token: string, data: ChangePasswordRequest): Observable<GlobalResponse<null>> {
    const params = new HttpParams().set('token', token);
    return this.http.post<GlobalResponse<null>>(`${this.BASE_URL}/reset-password`, data, { params });
  }

  check(): Observable<GlobalResponse<string>> {
    return this.http.get<GlobalResponse<string>>(`${this.BASE_URL}/check`, { withCredentials: true });
  }

  refreshToken(refreshToken: string): Observable<GlobalResponse<LoginResponse>> {
    const params = new HttpParams().set('refreshToken', refreshToken);
    return this.http.post<GlobalResponse<LoginResponse>>(`${this.BASE_URL}/refresh-token`, {}, { params });
  }

  hasRole(expectedRoles: Role[]): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRoles = user.roles || [];
    return expectedRoles.some(role => userRoles.includes(role));

  }

  // Estado de autenticación con signals
  isAuthenticated() {
    return this.isAuthenticatedSignal();
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSignal.set(value);
  }
}

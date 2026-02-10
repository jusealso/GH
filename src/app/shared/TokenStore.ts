import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

/**
 *  Clase para manejar el valor authToken
 */
@Injectable({
  providedIn: 'root',
})
export class TokenStore {
  private platformId = inject(PLATFORM_ID);
  private tokenSignal = signal<string | null>(null);

  readonly token = computed(() => this.tokenSignal());

  /**
   * Guardar Token en el Sesion Storage
   * @param token
   */
  setToken(token: string): void {
    this.tokenSignal.set(token);
    sessionStorage.setItem('authToken', token);
  }

  /**
   * Obtener Token authToken
   * @returns
   */
  getToken(): string | null {
    return this.tokenSignal();
  }

  /**
   * Eliminar Token del Sesion Storage
   */
  clearToken(): void {
    this.tokenSignal.set(null);
    sessionStorage.removeItem('authToken');
  }

  /**
   * Restaurar Token por si refrescan la página
   */
  restoreTokenFromSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem('authToken');
      if (stored) {
        this.tokenSignal.set(stored);
      }
    }
  }

  /**
   * Verifica si el Token esta vencido
   * @returns bool
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000); // segundos
      return decoded.exp < now;
    } catch {
      return true;
    }
  }
}

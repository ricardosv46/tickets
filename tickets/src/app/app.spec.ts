import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { App } from './app';

describe('App', () => {
  // Doble de la librería de login: así el test no necesita Cognito ni HTTP.
  const authenticated = signal({ isAuthenticated: false, allConfigsAuthenticated: [] as unknown[] });
  const userData = signal<{ userData: unknown; allUserData: unknown[] }>({ userData: null, allUserData: [] });

  beforeEach(async () => {
    authenticated.set({ isAuthenticated: false, allConfigsAuthenticated: [] });
    userData.set({ userData: null, allUserData: [] });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: OidcSecurityService,
          useValue: { authenticated, userData, logoffLocal: jasmine.createSpy('logoffLocal') },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sin sesión muestra el mensaje de redirección y oculta la cabecera', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Redirigiendo al inicio de sesión');
    expect(el.querySelector('header')).toBeNull();
  });

  it('con sesión muestra la cabecera con el correo y el botón Salir', () => {
    authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
    userData.set({ userData: { email: 'ana@ejemplo.com' }, allUserData: [] });

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('header')?.textContent).toContain('Panel de Tickets');
    expect(el.querySelector('header')?.textContent).toContain('ana@ejemplo.com');
    expect(el.querySelector('button')?.textContent).toContain('Salir');
    expect(el.textContent).not.toContain('Redirigiendo al inicio de sesión');
  });
});

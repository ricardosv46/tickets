import { Ticket } from './ticket.model';

export const TICKETS_MOCK: Ticket[] = [
  { id: 1, title: 'No puedo iniciar sesión', status: 'open', priority: 'high', createdAt: '2026-10-01T09:15:00Z' },
  { id: 2, title: 'Error 500 al guardar perfil', status: 'in_progress', priority: 'critical', createdAt: '2026-10-01T11:40:00Z' },
  { id: 3, title: 'Solicitud de nuevo usuario', status: 'resolved', priority: 'low', createdAt: '2026-10-02T08:05:00Z' },
  { id: 4, title: 'La tabla carga lento', status: 'open', priority: 'medium', createdAt: '2026-10-02T14:20:00Z' },
  { id: 5, title: 'Correo de bienvenida no llega', status: 'in_progress', priority: 'medium', createdAt: '2026-10-03T10:00:00Z' },
  { id: 6, title: 'Texto cortado en móvil', status: 'closed', priority: 'low', createdAt: '2026-10-03T16:30:00Z' },
  { id: 7, title: 'Exportar a CSV falla', status: 'open', priority: 'high', createdAt: '2026-10-04T09:45:00Z' },
  { id: 8, title: 'Permisos incorrectos en rol editor', status: 'in_progress', priority: 'high', createdAt: '2026-10-04T13:10:00Z' },
  { id: 9, title: 'Actualizar logo de la empresa', status: 'resolved', priority: 'low', createdAt: '2026-10-05T08:50:00Z' },
  { id: 10, title: 'Sesión expira muy rápido', status: 'open', priority: 'medium', createdAt: '2026-10-05T15:25:00Z' },
  { id: 11, title: 'Notificaciones duplicadas', status: 'in_progress', priority: 'medium', createdAt: '2026-10-06T10:35:00Z' },
  { id: 12, title: 'Caída del servicio de pagos', status: 'resolved', priority: 'critical', createdAt: '2026-10-06T12:00:00Z' },
  { id: 13, title: 'Buscador no encuentra tildes', status: 'open', priority: 'low', createdAt: '2026-10-07T09:20:00Z' },
  { id: 14, title: 'Fecha mal formateada en reportes', status: 'closed', priority: 'low', createdAt: '2026-10-07T14:45:00Z' },
  { id: 15, title: 'Adjuntos mayores a 5MB fallan', status: 'open', priority: 'high', createdAt: '2026-10-08T11:15:00Z' },
  { id: 16, title: 'Modo oscuro ilegible', status: 'in_progress', priority: 'low', createdAt: '2026-10-08T16:05:00Z' },
  { id: 17, title: 'Integración con calendario', status: 'open', priority: 'medium', createdAt: '2026-10-09T10:10:00Z' },
  { id: 18, title: 'Contraseña olvidada no responde', status: 'resolved', priority: 'high', createdAt: '2026-10-09T13:55:00Z' },
  { id: 19, title: 'Duplicado de tickets al refrescar', status: 'closed', priority: 'medium', createdAt: '2026-10-10T08:30:00Z' },
  { id: 20, title: 'Documentar API pública', status: 'open', priority: 'low', createdAt: '2026-10-10T15:00:00Z' },
];

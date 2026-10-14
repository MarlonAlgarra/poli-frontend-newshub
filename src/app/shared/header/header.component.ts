import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

/** Página activa, para resaltar el enlace correspondiente del menú. */
export type ActiveNav = 'inicio' | 'noticias' | 'contacto' | 'none';

/**
 * Cabecera reutilizable. Replica las dos variantes del sitio original:
 * - "home": incluye buscador en vivo + botón de notificaciones.
 * - "inner": incluye solo un botón de búsqueda (icono).
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() active: ActiveNav = 'none';
  @Input() variant: 'home' | 'inner' = 'inner';
  /** Muestra el enlace extra "Cultura" (solo portada). */
  @Input() showCultura = false;

  /** Valor del buscador (variante home). */
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();

  /** Click en el botón de notificaciones (variante home). */
  @Output() notif = new EventEmitter<void>();
  /** Click en el botón de búsqueda (variante inner). */
  @Output() searchToggle = new EventEmitter<void>();

  notifDotVisible = true;

  onSearchInput(value: string): void {
    this.search = value;
    this.searchChange.emit(value);
  }

  onNotif(): void {
    this.notifDotVisible = false;
    this.notif.emit();
  }
}

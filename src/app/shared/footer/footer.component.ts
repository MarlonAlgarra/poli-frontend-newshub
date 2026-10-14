import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Pie de página reutilizable. El sitio original tiene dos variantes:
 * - "home": navegación "Archivo/Autores/Carreras", social con Twitter/LinkedIn
 *   y la línea inferior de "NewsHub Media Group".
 * - "inner": navegación "Archivo de noticias/Columnistas/Suscripciones",
 *   social con icono de ayuda y datos de contacto de las páginas internas.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() variant: 'home' | 'inner' = 'inner';
}

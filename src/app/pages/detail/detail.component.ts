import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { Story } from '../../models/news.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private news = inject(NewsService);
  private toast = inject(ToastService);
  private titleSvc = inject(Title);

  loaded = false;
  article?: Story;
  related: Story[] = [];

  /** Párrafos derivados del campo "desarrollo". */
  p1 = '';
  p2 = '';
  p3 = '';

  // Estado de interacción
  favActive = false;
  comment = '';
  nlEmail = '';

  ngOnInit(): void {
    // Reaccionar a cambios de ?slug= (navegar entre relacionados sin recargar).
    this.route.queryParamMap.subscribe((params) => {
      const slug = params.get('slug');
      this.news.getAllNews().subscribe((all) => {
        this.article = all.find((n) => n.slug === slug);
        this.loaded = true;

        if (this.article) {
          this.titleSvc.setTitle('NewsHub — ' + this.article.title);
          this.buildBody(this.article);
        } else {
          this.titleSvc.setTitle('NewsHub — Noticia no encontrada');
        }

        // Artículos relacionados (otras noticias de la matriz).
        this.related = all
          .filter((n) => n.slug && (!this.article || n.slug !== this.article.slug))
          .slice(0, 3);
      });
    });
  }

  /** Divide "desarrollo" en frases y las reparte en tres bloques. */
  private buildBody(n: Story): void {
    const sentences = (n.desarrollo || '').match(/[^.]+\.?/g) || [n.desarrollo || ''];
    const trimmed = sentences.map((s) => s.trim()).filter(Boolean);

    const third = Math.ceil(trimmed.length / 3);
    this.p1 = trimmed.slice(0, third).join(' ');
    this.p2 = trimmed.slice(third, third * 2).join(' ');
    this.p3 = trimmed.slice(third * 2).join(' ');
  }

  get conclusion(): string {
    const title = this.article?.title.toLowerCase() ?? '';
    return `En conclusión, el impacto de "${title}" dependerá de nuestra capacidad para combinar innovación con responsabilidad, manteniendo el criterio humano en el centro de cada decisión.`;
  }

  toggleFav(): void {
    this.favActive = !this.favActive;
    this.toast.show(this.favActive ? 'Añadido a favoritos' : 'Eliminado de favoritos');
  }

  contactEditor(): void {
    this.toast.show('Abriendo formulario de contacto con el editor');
  }

  share(): void {
    this.toast.show('Enlace copiado al portapapeles');
  }

  publishComment(): void {
    const txt = this.comment.trim();
    if (!txt) {
      this.toast.show('Escribe un comentario antes de publicar');
      return;
    }
    this.toast.show('¡Comentario publicado!');
    this.comment = '';
  }

  submitNewsletter(): void {
    const email = this.nlEmail.trim();
    if (!email || !email.includes('@')) {
      this.toast.show('Ingresa un correo electrónico válido');
      return;
    }
    this.toast.show('¡Gracias por suscribirte, ' + email + '!');
    this.nlEmail = '';
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { EditorPick, Story } from '../../models/news.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private news = inject(NewsService);
  private toast = inject(ToastService);

  stories: Story[] = [];
  picks: EditorPick[] = [];

  /** Estado de interacción (se generaban dinámicamente en jQuery). */
  liked = new Set<string>();
  search = '';
  bookmarkSaved = false;

  nlEmail = '';

  ngOnInit(): void {
    this.news.getStories().subscribe((s) => (this.stories = s));
    this.news.getEditorPicks().subscribe((p) => (this.picks = p));
  }

  /** Filtra tarjetas por título/categoría (igual que el buscador del header). */
  get visibleStories(): Story[] {
    const q = this.search.toLowerCase().trim();
    if (!q) return this.stories;
    return this.stories.filter((s) =>
      (s.title + ' ' + s.category).toLowerCase().includes(q)
    );
  }

  toggleLike(story: Story): void {
    if (this.liked.has(story.slug)) {
      this.liked.delete(story.slug);
      this.toast.show('Eliminado de favoritos');
    } else {
      this.liked.add(story.slug);
      this.toast.show('Añadido a favoritos');
    }
  }

  share(): void {
    this.toast.show('Enlace copiado al portapapeles');
  }

  onNotif(): void {
    this.toast.show('No tienes notificaciones nuevas');
  }

  toggleBookmark(): void {
    this.bookmarkSaved = !this.bookmarkSaved;
    this.toast.show(this.bookmarkSaved ? 'Historia guardada' : 'Historia eliminada de guardados');
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

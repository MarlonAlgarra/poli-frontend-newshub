import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { Story } from '../../models/news.model';

const TOTAL_PAGES = 1; // paginación decorativa (una sola página)

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  private news = inject(NewsService);
  private toast = inject(ToastService);

  @ViewChild('catalogSearch') catalogSearch?: ElementRef<HTMLInputElement>;

  catalogNews: Story[] = [];

  category = '';
  sort: 'recent' | 'old' = 'recent';
  query = '';

  saved = new Set<string>();
  activePage = 1;
  readonly pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  ngOnInit(): void {
    this.news.getCatalog().subscribe((list) => (this.catalogNews = list));
  }

  /** Aplica filtros (categoría + orden + búsqueda), igual que applyFilters(). */
  get filtered(): Story[] {
    const q = this.query.toLowerCase().trim();

    let list = this.catalogNews.filter((n) => {
      const matchCat = !this.category || n.category === this.category;
      const text = (n.title + ' ' + n.description + ' ' + n.category).toLowerCase();
      const matchQuery = !q || text.includes(q);
      return matchCat && matchQuery;
    });

    return list.slice().sort((a, b) =>
      this.sort === 'old' ? (a.order ?? 0) - (b.order ?? 0) : (b.order ?? 0) - (a.order ?? 0)
    );
  }

  toggleBookmark(story: Story): void {
    if (this.saved.has(story.slug)) {
      this.saved.delete(story.slug);
      this.toast.show('Noticia eliminada de guardados');
    } else {
      this.saved.add(story.slug);
      this.toast.show('Noticia guardada');
    }
  }

  selectPage(page: number): void {
    this.activePage = page;
    this.toast.show('Página ' + page);
  }

  /** Botón de búsqueda del header: enfoca el buscador del catálogo. */
  focusSearch(): void {
    this.catalogSearch?.nativeElement.focus();
  }
}

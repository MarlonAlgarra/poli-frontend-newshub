import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, shareReplay } from 'rxjs';
import { EditorPick, Story } from '../models/news.model';

/**
 * Carga las "inyecciones por JSON" (historias del index, catálogo y elección
 * del editor) desde /data/*.json y expone utilidades de búsqueda combinada.
 */
@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);

  private readonly stories$ = this.http
    .get<Story[]>('data/stories.json')
    .pipe(shareReplay(1));

  private readonly catalog$ = this.http
    .get<Story[]>('data/catalog.json')
    .pipe(shareReplay(1));

  private readonly editorPicks$ = this.http
    .get<EditorPick[]>('data/editor-picks.json')
    .pipe(shareReplay(1));

  /** Historias destacadas de la portada. */
  getStories(): Observable<Story[]> {
    return this.stories$;
  }

  /** Noticias del catálogo. */
  getCatalog(): Observable<Story[]> {
    return this.catalog$;
  }

  /** Elección del editor (sidebar de la portada). */
  getEditorPicks(): Observable<EditorPick[]> {
    return this.editorPicks$;
  }

  /** Fuente combinada: catálogo + historias de la portada. */
  getAllNews(): Observable<Story[]> {
    return forkJoin([this.catalog$, this.stories$]).pipe(
      map(([catalog, stories]) => [...catalog, ...stories])
    );
  }

  /** Busca una noticia por slug en la fuente combinada. */
  getBySlug(slug: string | null): Observable<Story | undefined> {
    return this.getAllNews().pipe(
      map((all) => all.find((n) => n.slug === slug))
    );
  }
}

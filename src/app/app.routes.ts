import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'NewsHub — Tu fuente diaria de noticias' },
  { path: 'catalogo', component: CatalogComponent, title: 'NewsHub — Catálogo de Noticias' },
  { path: 'detail', component: DetailComponent, title: 'NewsHub — Detalle de la noticia' },
  { path: 'contacto', component: ContactComponent, title: 'NewsHub — Contacto' },
  { path: '**', redirectTo: '' }
];

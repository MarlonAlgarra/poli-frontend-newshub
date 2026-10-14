import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private toast = inject(ToastService);

  name = '';
  email = '';
  subject = '';
  message = '';
  privacy = false;

  successVisible = false;

  /** Validación simple de correo (misma expresión que el original). */
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /** Mostrar el check de correo válido en tiempo real. */
  get emailValid(): boolean {
    return this.isValidEmail(this.email.trim());
  }

  submit(): void {
    const name = this.name.trim();
    const email = this.email.trim();
    const subject = this.subject.trim();
    const message = this.message.trim();

    if (!name) { this.toast.show('Ingresa tu nombre completo'); return; }
    if (!this.isValidEmail(email)) { this.toast.show('Ingresa un correo electrónico válido'); return; }
    if (!subject) { this.toast.show('Indica el asunto de tu mensaje'); return; }
    if (!message) { this.toast.show('Escribe tu mensaje'); return; }
    if (!this.privacy) { this.toast.show('Debes aceptar la política de privacidad'); return; }

    // Simular envío exitoso
    this.successVisible = true;
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.privacy = false;

    // Desplazar hacia el banner de confirmación
    setTimeout(() => {
      const el = document.getElementById('contactSuccess');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  closeSuccess(): void {
    this.successVisible = false;
  }
}

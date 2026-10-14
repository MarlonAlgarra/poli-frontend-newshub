import { Injectable, signal } from '@angular/core';

/**
 * Reproduce el "toast" global de la versión jQuery: un único aviso flotante
 * que aparece y se oculta tras 2600 ms.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  /** Mensaje actual. */
  readonly message = signal('');
  /** Indica si el toast está visible (clase .show). */
  readonly visible = signal(false);

  private timer: ReturnType<typeof setTimeout> | undefined;

  show(message: string): void {
    this.message.set(message);
    this.visible.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.visible.set(false), 2600);
  }
}

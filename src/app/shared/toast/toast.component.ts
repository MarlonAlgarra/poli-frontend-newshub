import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `<div id="toast" class="toast" [class.show]="toast.visible()">{{ toast.message() }}</div>`
})
export class ToastComponent {
  readonly toast = inject(ToastService);
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <img src="/assets/images/not-found.png" alt="Not Found Image" />
      <p>{{ text }}</p>
    </div>
  `,
  styles: [
    `
      .not-found-container {
        text-align: center;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      img {
        width: 100%;
        max-width: 800px;
        height: auto;
      }

      p {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
    `,
  ],
})
export class NotFoundComponent {
  @Input() text = 'No Items Found';
}

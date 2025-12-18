import { Component, input, computed, signal } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';

// Enregistrer les langages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);

@Component({
  selector: 'doc-code-preview',
  standalone: true,
  template: `
    <div class="code-preview">
      <div class="code-preview__header">
        <span class="code-preview__lang">{{ language() }}</span>
        <button
          type="button"
          class="code-preview__copy"
          [class.copied]="copied()"
          (click)="copyToClipboard()"
        >
          {{ copied() ? '✓ Copié' : 'Copier' }}
        </button>
      </div>
      <pre class="code-preview__pre"><code
        class="code-preview__code"
        [innerHTML]="highlightedCode()"
      ></code></pre>
    </div>
  `,
  styles: [`
    .code-preview {
      border-radius: var(--radius-2, 8px);
      overflow: hidden;
      background: #1e1e1e;
    }

    .code-preview__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      background: #2d2d2d;
      border-bottom: 1px solid #3d3d3d;
    }

    .code-preview__lang {
      font-size: 0.75rem;
      color: #9ca3af;
      text-transform: uppercase;
      font-weight: 500;
    }

    .code-preview__copy {
      padding: 4px 12px;
      border: none;
      border-radius: 4px;
      background: #3d3d3d;
      color: #e5e7eb;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: #4d4d4d;
      }

      &.copied {
        background: var(--success, #22c55e);
        color: white;
      }
    }

    .code-preview__pre {
      margin: 0;
      padding: 16px;
      overflow-x: auto;
    }

    .code-preview__code {
      font-family: var(--doc-code-font, 'Fira Code', monospace);
      font-size: 0.875rem;
      line-height: 1.6;
    }
  `]
})
export class CodePreview {
  /** Code source à afficher */
  code = input.required<string>();

  /** Langage pour le highlighting */
  language = input<'typescript' | 'html' | 'scss'>('html');

  /** État copié */
  copied = signal(false);

  /** Code avec syntax highlighting */
  highlightedCode = computed(() => {
    const lang = this.language();
    const codeValue = this.code();

    try {
      const result = hljs.highlight(codeValue, { language: lang });
      return result.value;
    } catch {
      // Fallback sans highlighting
      return this.escapeHtml(codeValue);
    }
  });

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);

      // Reset après 2 secondes
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

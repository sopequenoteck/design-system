import { Component, signal, computed } from '@angular/core';
import { DsTree, TreeNode, TreeNodeCheckEvent, TreeNodeSelectEvent } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTreeDefinition } from '../../../registry/definitions/ds-tree.definition';
import { ControlValues } from '../../../registry/types';

type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-tree-page',
  standalone: true,
  imports: [DsTree, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Arbre avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-tree
              [data]="treeData"
              [size]="demoSize()"
              [checkable]="demoCheckable()"
              [showLine]="demoShowLine()"
              [expandAll]="demoExpandAll()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Checkboxes</h3>
          <p class="demo-block__desc">Arbre avec checkboxes tri-state.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-tree
              [data]="treeData"
              [checkable]="true"
              (nodeCheck)="onNodeCheck($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Lines</h3>
          <p class="demo-block__desc">Arbre avec lignes de connexion.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-tree
              [data]="treeData"
              [showLine]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">File Explorer</h3>
          <p class="demo-block__desc">Exemple explorateur de fichiers.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-tree
              [data]="fileTree"
              [showIcon]="true"
              (nodeSelect)="onFileSelect($event)"
            />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
  `]
})
export class TreePage {
  definition = DsTreeDefinition;

  treeData: TreeNode[] = [
    {
      id: 1,
      label: 'Documents',
      children: [
        { id: 2, label: 'Travail', children: [
          { id: 3, label: 'Rapport.pdf' },
          { id: 4, label: 'Présentation.pptx' },
        ]},
        { id: 5, label: 'Personnel', children: [
          { id: 6, label: 'Photos', children: [
            { id: 7, label: 'Vacances' },
            { id: 8, label: 'Famille' },
          ]},
        ]},
      ],
    },
    {
      id: 9,
      label: 'Applications',
      children: [
        { id: 10, label: 'Chrome' },
        { id: 11, label: 'VS Code' },
        { id: 12, label: 'Slack' },
      ],
    },
  ];

  fileTree: TreeNode[] = [
    {
      id: 1,
      label: 'src',
      children: [
        { id: 2, label: 'components', children: [
          { id: 3, label: 'Button.tsx' },
          { id: 4, label: 'Input.tsx' },
          { id: 5, label: 'Modal.tsx' },
        ]},
        { id: 6, label: 'utils', children: [
          { id: 7, label: 'helpers.ts' },
          { id: 8, label: 'constants.ts' },
        ]},
        { id: 9, label: 'app.ts' },
        { id: 10, label: 'index.ts' },
      ],
    },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
    checkable: false,
    showLine: false,
    expandAll: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoCheckable = computed(() => this.defaultValues()['checkable'] as boolean);
  demoShowLine = computed(() => this.defaultValues()['showLine'] as boolean);
  demoExpandAll = computed(() => this.defaultValues()['expandAll'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onNodeCheck(event: TreeNodeCheckEvent): void {
    console.log('Node checked:', event);
  }

  onFileSelect(event: TreeNodeSelectEvent): void {
    console.log('File selected:', event);
  }
}

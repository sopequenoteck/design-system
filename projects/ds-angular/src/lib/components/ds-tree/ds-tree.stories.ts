import { Meta, StoryObj } from '@storybook/angular';
import { DsTree, TreeNode } from './ds-tree';

const fileSystemData: TreeNode[] = [
  {
    id: 'root',
    label: 'Root',
    expanded: true,
    children: [
      {
        id: 'documents',
        label: 'Documents',
        expanded: true,
        children: [
          { id: 'resume.pdf', label: 'Resume.pdf' },
          { id: 'cover-letter.docx', label: 'Cover Letter.docx' },
          {
            id: 'projects',
            label: 'Projects',
            children: [
              { id: 'project-a.md', label: 'Project A.md' },
              { id: 'project-b.md', label: 'Project B.md' },
            ],
          },
        ],
      },
      {
        id: 'images',
        label: 'Images',
        children: [
          { id: 'photo1.jpg', label: 'Photo1.jpg' },
          { id: 'photo2.png', label: 'Photo2.png' },
        ],
      },
      {
        id: 'downloads',
        label: 'Downloads',
        disabled: true,
        children: [{ id: 'file.zip', label: 'File.zip' }],
      },
    ],
  },
];

const organizationData: TreeNode[] = [
  {
    id: 'company',
    label: 'Company',
    expanded: true,
    children: [
      {
        id: 'engineering',
        label: 'Engineering',
        expanded: true,
        children: [
          {
            id: 'frontend',
            label: 'Frontend Team',
            children: [
              { id: 'dev1', label: 'John Doe' },
              { id: 'dev2', label: 'Jane Smith' },
            ],
          },
          {
            id: 'backend',
            label: 'Backend Team',
            children: [
              { id: 'dev3', label: 'Bob Johnson' },
              { id: 'dev4', label: 'Alice Williams' },
            ],
          },
        ],
      },
      {
        id: 'marketing',
        label: 'Marketing',
        children: [
          { id: 'market1', label: 'Sarah Connor' },
          { id: 'market2', label: 'Mike Ross' },
        ],
      },
    ],
  },
];

const meta: Meta<DsTree> = {
  title: 'Navigation/DsTree',
  component: DsTree,
  argTypes: {
    data: { control: 'object' },
    selectable: { control: 'boolean' },
    checkable: { control: 'boolean' },
    expandAll: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    showLine: { control: 'boolean' },
    draggable: { control: 'boolean' },
    virtualScroll: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<DsTree>;

export const Default: Story = {
  args: {
    data: fileSystemData,
  },
};

export const FileSystem: Story = {
  args: {
    data: fileSystemData,
    showIcon: true,
  },
};

export const OrganizationChart: Story = {
  args: {
    data: organizationData,
    showIcon: true,
  },
};

export const Checkable: Story = {
  args: {
    data: fileSystemData,
    checkable: true,
    showIcon: true,
  },
};

export const WithCheckboxes: Story = {
  args: {
    data: organizationData,
    checkable: true,
    selectable: false,
  },
};

export const ExpandAll: Story = {
  args: {
    data: fileSystemData,
    expandAll: true,
  },
};

export const SmallSize: Story = {
  args: {
    data: fileSystemData,
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    data: fileSystemData,
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    data: fileSystemData,
    size: 'lg',
  },
};

export const WithLines: Story = {
  args: {
    data: fileSystemData,
    showLine: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    data: fileSystemData,
    showIcon: false,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
  },
};

export const SingleLevel: Story = {
  args: {
    data: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
      { id: '4', label: 'Item 4', disabled: true },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    data: [
      {
        id: '1',
        label: 'Level 1',
        expanded: true,
        children: [
          {
            id: '1-1',
            label: 'Level 2',
            expanded: true,
            children: [
              {
                id: '1-1-1',
                label: 'Level 3',
                expanded: true,
                children: [
                  {
                    id: '1-1-1-1',
                    label: 'Level 4',
                    expanded: true,
                    children: [{ id: '1-1-1-1-1', label: 'Level 5' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const MixedState: Story = {
  args: {
    data: [
      {
        id: 'folder1',
        label: 'Expanded Folder',
        expanded: true,
        children: [
          { id: 'file1', label: 'File 1' },
          { id: 'file2', label: 'File 2' },
        ],
      },
      {
        id: 'folder2',
        label: 'Collapsed Folder',
        expanded: false,
        children: [
          { id: 'file3', label: 'File 3' },
          { id: 'file4', label: 'File 4' },
        ],
      },
      { id: 'standalone', label: 'Standalone File' },
      {
        id: 'disabled-folder',
        label: 'Disabled Folder',
        disabled: true,
        children: [{ id: 'file5', label: 'File 5' }],
      },
    ],
  },
};

export const CheckableWithInitialChecked: Story = {
  args: {
    data: [
      {
        id: '1',
        label: 'Parent',
        checked: true,
        children: [
          { id: '1-1', label: 'Child 1', checked: true },
          { id: '1-2', label: 'Child 2', checked: true },
        ],
      },
      { id: '2', label: 'Standalone', checked: false },
    ],
    checkable: true,
  },
};

export const LoadingState: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; border: 1px solid var(--border-default); border-radius: 8px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 20px; height: 20px; border: 2px solid var(--color-primary); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <p style="margin: 0; color: var(--text-muted);">Chargement de l'arborescence...</p>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </div>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-tree [data]="[
            {
              id: '1',
              label: 'Documents',
              expanded: true,
              children: [
                { id: '1-1', label: 'Resume.pdf' },
                { id: '1-2', label: 'Cover Letter.docx' }
              ]
            },
            { id: '2', label: 'Images' }
          ]" [showIcon]="true"></ds-tree>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-tree [data]="[
            {
              id: '1',
              label: 'Documents',
              expanded: true,
              children: [
                { id: '1-1', label: 'Resume.pdf' },
                { id: '1-2', label: 'Cover Letter.docx' }
              ]
            },
            { id: '2', label: 'Images' }
          ]" [showIcon]="true"></ds-tree>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-tree [data]="[
            {
              id: '1',
              label: 'Documents',
              expanded: true,
              children: [
                { id: '1-1', label: 'Resume.pdf' },
                { id: '1-2', label: 'Cover Letter.docx' }
              ]
            },
            { id: '2', label: 'Images' }
          ]" [showIcon]="true"></ds-tree>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};

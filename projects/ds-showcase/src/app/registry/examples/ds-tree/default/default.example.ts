import { Component, input } from '@angular/core';
import { DsTree, TreeNode } from 'ds-angular';

@Component({
  selector: 'example-ds-tree-default',
  standalone: true,
  imports: [DsTree],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsTreeDefaultExample {
  checkable = input<boolean>(false);
  showLine = input<boolean>(false);

  treeData: TreeNode[] = [
    {
      id: 1,
      label: 'Documents',
      children: [
        { id: 2, label: 'Projets' },
        { id: 3, label: 'Images' }
      ]
    },
    {
      id: 4,
      label: 'Paramètres',
      children: [
        { id: 5, label: 'Général' },
        { id: 6, label: 'Sécurité' }
      ]
    }
  ];
}

import { ComponentDefinition } from '../types';

export const DsTabsDefinition: ComponentDefinition = {
  id: 'ds-tabs',
  name: 'Tabs',
  selector: 'ds-tabs',
  category: 'navigation',
  description: 'Navigation par onglets avec support clavier complet et indicateur visuel animé.',

  props: [
    {
      name: 'tabs',
      kind: 'input',
      type: 'TabItem[]',
      required: true,
      description: 'Liste des onglets à afficher. Chaque tab a id, label, et optionnellement disabled et icon.',
    },
    {
      name: 'activeTabId',
      kind: 'input',
      type: 'string | undefined',
      description: 'ID de l\'onglet actif. Si non défini, le premier onglet est actif.',
    },
    {
      name: 'tabChanged',
      kind: 'output',
      type: 'EventEmitter<TabItem>',
      description: 'Émis lors du changement d\'onglet avec l\'objet TabItem complet.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Onglets par défaut avec navigation clavier.',
      controls: [],
      code: `<ds-tabs
  [tabs]="[
    { id: 'tab1', label: 'Général' },
    { id: 'tab2', label: 'Paramètres' },
    { id: 'tab3', label: 'Avancé' }
  ]"
  activeTabId="tab1"
  (tabChanged)="onTabChanged($event)"
></ds-tabs>`,
    },
    {
      id: 'multiple',
      name: 'Multiple Tabs',
      description: 'Navigation avec plusieurs onglets.',
      controls: [],
      code: `<ds-tabs
  [tabs]="[
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Produits' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' }
  ]"
></ds-tabs>`,
    },
    {
      id: 'with-disabled',
      name: 'With Disabled',
      description: 'Onglet désactivé non sélectionnable.',
      controls: [],
      code: `<ds-tabs
  [tabs]="[
    { id: 'active1', label: 'Actif' },
    { id: 'disabled1', label: 'Désactivé', disabled: true },
    { id: 'active2', label: 'Autre actif' }
  ]"
></ds-tabs>`,
    },
  ],
};

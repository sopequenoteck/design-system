// ============================================================================
// OVERLAY POSITIONS — Design System Assist-AI
// ============================================================================
//
// Ce fichier contient les constantes de positionnement réutilisables pour
// les overlays CDK Angular (@angular/cdk/overlay).
//
// USAGE :
// - Importer les constantes dans les composants utilisant CdkConnectedOverlay
// - Utiliser [cdkConnectedOverlayPositions]="DROPDOWN_POSITIONS"
// - Les positions incluent des fallbacks automatiques
//
// RÉFÉRENCES :
// - Angular CDK Overlay : https://material.angular.io/cdk/overlay
// - ConnectedPosition : Interface CDK pour positionnement relatif
//
// ============================================================================

import { ConnectedPosition } from '@angular/cdk/overlay';

/**
 * Positions standard pour dropdowns (menus déroulants, select, etc.)
 *
 * Stratégie :
 * 1. Position préférée : centré en dessous (offsetY: 6px pour espacement)
 * 2. Fallback : centré au-dessus si pas d'espace en bas
 * 3. Fallback : aligné à gauche en dessous
 * 4. Fallback : aligné à droite en dessous
 */
export const DROPDOWN_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 6,
  },
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -6,
  },
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 6,
  },
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 6,
  },
];

/**
 * Positions pour dropdowns s'ouvrant vers le haut (utile dans les footers)
 *
 * Stratégie :
 * 1. Position préférée : centré au-dessus
 * 2. Fallback : centré en dessous si pas d'espace au-dessus
 * 3. Fallback : aligné à gauche au-dessus
 * 4. Fallback : aligné à droite au-dessus
 */
export const DROPDOWN_POSITIONS_TOP: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -6,
  },
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 6,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -6,
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -6,
  },
];

/**
 * Positions pour dropdowns s'ouvrant vers la droite (utile dans les sidebars)
 *
 * Stratégie :
 * 1. Position préférée : à droite, aligné en haut
 * 2. Fallback : à droite, aligné au centre
 * 3. Fallback : à gauche si pas d'espace à droite
 */
export const DROPDOWN_POSITIONS_RIGHT: ConnectedPosition[] = [
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 6,
  },
  {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 6,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -6,
  },
];

/**
 * Positions standard pour tooltips (infobulles)
 *
 * Stratégie :
 * 1. Position préférée : centré au-dessus (offsetY: -8px pour espacement)
 * 2. Fallback : centré en dessous si pas d'espace au-dessus
 * 3. Fallback : à droite (aligné verticalement au centre)
 * 4. Fallback : à gauche (aligné verticalement au centre)
 */
export const TOOLTIP_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  },
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  },
  {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8,
  },
  {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8,
  },
];

/**
 * Positions standard pour popovers (menus contextuels, actions panels)
 *
 * Stratégie :
 * 1. Position préférée : aligné à droite, en dessous (offsetY: 4px)
 * 2. Fallback : aligné à gauche, en dessous
 * 3. Fallback : aligné à droite, au-dessus
 * 4. Fallback : aligné à gauche, au-dessus
 * 5. Fallback : à droite (aligné en haut)
 * 6. Fallback : à gauche (aligné en haut)
 */
export const POPOVER_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -4,
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -4,
  },
];

/**
 * Positions pour autocomplete (panel de suggestions sous un input)
 *
 * Stratégie :
 * 1. Position préférée : aligné à gauche, pleine largeur, en dessous
 * 2. Fallback : aligné à gauche, pleine largeur, au-dessus
 */
export const AUTOCOMPLETE_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -4,
  },
];

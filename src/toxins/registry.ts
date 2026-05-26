/**
 * Registry of toxicity calculators powering the suite grid.
 * Each entry pairs display meta with its self-contained calculator component.
 */
import type { ToxinMeta } from '../types/toxins';
import { chocolateMeta, ChocolateCalculator } from './chocolate/Calculator';
import { grapesMeta, GrapesCalculator } from './grapes/Calculator';
import { xylitolMeta, XylitolCalculator } from './xylitol/Calculator';
import { alliumMeta, AlliumCalculator } from './allium/Calculator';
import { macadamiaMeta, MacadamiaCalculator } from './macadamia/Calculator';
import { lilyMeta, LilyCalculator } from './lily/Calculator';
import { acetaminophenMeta, AcetaminophenCalculator } from './acetaminophen/Calculator';
import { ibuprofenMeta, IbuprofenCalculator } from './ibuprofen/Calculator';

export interface ToxinEntry {
  meta: ToxinMeta;
  Component: () => React.ReactNode;
}

export const TOXIN_REGISTRY: ToxinEntry[] = [
  { meta: chocolateMeta, Component: ChocolateCalculator },
  { meta: grapesMeta, Component: GrapesCalculator },
  { meta: xylitolMeta, Component: XylitolCalculator },
  { meta: alliumMeta, Component: AlliumCalculator },
  { meta: macadamiaMeta, Component: MacadamiaCalculator },
  { meta: lilyMeta, Component: LilyCalculator },
  { meta: acetaminophenMeta, Component: AcetaminophenCalculator },
  { meta: ibuprofenMeta, Component: IbuprofenCalculator },
];

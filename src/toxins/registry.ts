/**
 * Registry of toxicity calculators powering the suite grid.
 * Each entry pairs display meta with its self-contained calculator component.
 */
import type { ToxinMeta } from '../types/toxins';
import { chocolateMeta } from './chocolate/meta';
import { ChocolateCalculator } from './chocolate/Calculator';
import { grapesMeta } from './grapes/meta';
import { GrapesCalculator } from './grapes/Calculator';
import { xylitolMeta } from './xylitol/meta';
import { XylitolCalculator } from './xylitol/Calculator';
import { alliumMeta } from './allium/meta';
import { AlliumCalculator } from './allium/Calculator';
import { macadamiaMeta } from './macadamia/meta';
import { MacadamiaCalculator } from './macadamia/Calculator';
import { lilyMeta } from './lily/meta';
import { LilyCalculator } from './lily/Calculator';
import { acetaminophenMeta } from './acetaminophen/meta';
import { AcetaminophenCalculator } from './acetaminophen/Calculator';
import { ibuprofenMeta } from './ibuprofen/meta';
import { IbuprofenCalculator } from './ibuprofen/Calculator';
import { caffeineMeta } from './caffeine/meta';
import { CaffeineCalculator } from './caffeine/Calculator';
import { ethyleneGlycolMeta } from './ethyleneGlycol/meta';
import { EthyleneGlycolCalculator } from './ethyleneGlycol/Calculator';
import { thcMeta } from './thc/meta';
import { ThcCalculator } from './thc/Calculator';
import { cholecalciferolMeta } from './cholecalciferol/meta';
import { CholecalciferolCalculator } from './cholecalciferol/Calculator';
import { anticoagulantMeta } from './anticoagulantRodenticide/meta';
import { AnticoagulantRodenticideCalculator } from './anticoagulantRodenticide/Calculator';
import { bromethalinMeta } from './bromethalin/meta';
import { BromethalinCalculator } from './bromethalin/Calculator';

export interface ToxinEntry {
  meta: ToxinMeta;
  Component: () => React.ReactNode;
}

export const TOXIN_REGISTRY: ToxinEntry[] = [
  { meta: chocolateMeta, Component: ChocolateCalculator },
  { meta: caffeineMeta, Component: CaffeineCalculator },
  { meta: grapesMeta, Component: GrapesCalculator },
  { meta: xylitolMeta, Component: XylitolCalculator },
  { meta: alliumMeta, Component: AlliumCalculator },
  { meta: macadamiaMeta, Component: MacadamiaCalculator },
  { meta: lilyMeta, Component: LilyCalculator },
  { meta: thcMeta, Component: ThcCalculator },
  { meta: acetaminophenMeta, Component: AcetaminophenCalculator },
  { meta: ibuprofenMeta, Component: IbuprofenCalculator },
  { meta: ethyleneGlycolMeta, Component: EthyleneGlycolCalculator },
  { meta: anticoagulantMeta, Component: AnticoagulantRodenticideCalculator },
  { meta: bromethalinMeta, Component: BromethalinCalculator },
  { meta: cholecalciferolMeta, Component: CholecalciferolCalculator },
];

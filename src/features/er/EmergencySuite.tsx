/**
 * Emergency & critical-care suite: a grid of cards and, once one is chosen,
 * that card's detail view. Selection lives in the hash route (#/er/<id>) so
 * every card is deep-linkable and shareable.
 *
 * The registry below is the single list of cards, shown in two groups: field
 * emergencies (cited statements + an interactive helper) and bedside
 * calculators. Both are rendered inside TopicShell, which always shows the
 * sources and the standing "not a treatment protocol" notice.
 */
import type { ReactNode } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr, type LocalizedText } from '../../types/toxins';
import { ChevronDownIcon } from '../../components/Icons';
import { FIELD_TOPICS } from '../../emergencies/fieldFacts';
import type { FieldTopic, FieldTopicId } from '../../emergencies/types';
import { FactSections, TopicShell } from './TopicParts';
import { CaterpillarWindow, CholinergicWindow, HeatGrader, ViperRiskChecklist } from './FieldHelpers';
import { FelineGrimaceTool, InfusionTool, ShockIndexTool, TransfusionTool } from './BedsideTools';
import { BEDSIDE_META, BEDSIDE_TOOL_IDS, type BedsideToolId } from './bedsideMeta';

export interface ErEntry {
  id: string;
  name: LocalizedText;
  blurb: LocalizedText;
  accent: string;
  render: () => ReactNode;
}

const FIELD_HELPER: Record<FieldTopicId, () => ReactNode> = {
  heat: () => <HeatGrader />,
  snake: () => <ViperRiskChecklist />,
  caterpillar: () => <CaterpillarWindow />,
  anticholinesterase: () => <CholinergicWindow />,
};

function FieldTopicView({ topic }: { topic: FieldTopic }) {
  return (
    <TopicShell name={topic.name} regions={topic.regions} sources={Object.values(topic.sources)}>
      {FIELD_HELPER[topic.id]()}
      <FactSections sections={topic.sections} />
    </TopicShell>
  );
}

const FIELD_ENTRIES: ErEntry[] = FIELD_TOPICS.map((topic) => ({
  id: topic.id,
  name: topic.name,
  blurb: topic.blurb,
  accent: topic.accent,
  render: () => <FieldTopicView topic={topic} />,
}));

const BEDSIDE_SCREEN: Record<BedsideToolId, () => ReactNode> = {
  'shock-index': () => <ShockIndexTool />,
  'feline-grimace': () => <FelineGrimaceTool />,
  transfusion: () => <TransfusionTool />,
  infusion: () => <InfusionTool />,
};

const BEDSIDE_ENTRIES: ErEntry[] = BEDSIDE_TOOL_IDS.map((toolId) => ({
  ...BEDSIDE_META[toolId],
  render: BEDSIDE_SCREEN[toolId],
}));

const ER_REGISTRY: ErEntry[] = [...FIELD_ENTRIES, ...BEDSIDE_ENTRIES];

const GROUP_TITLE = {
  field: L('מצבי חירום בשטח', 'Field emergencies'),
  bedside: L('מחשבונים ליד המיטה', 'Bedside calculators'),
};

function EntryTile({ entry, onOpen }: { entry: ErEntry; onOpen: () => void }) {
  const { lang } = useI18n();
  return (
    <button type="button" onClick={onOpen} className="glass flex items-center gap-3.5 rounded-4xl p-4 text-start">
      <span aria-hidden className="h-12 w-1.5 shrink-0 rounded-full" style={{ background: entry.accent }} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{tr(entry.name, lang)}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted">{tr(entry.blurb, lang)}</span>
      </span>
    </button>
  );
}

function EntryGroup(props: { title: LocalizedText; entries: ErEntry[]; onSelect: (id: string) => void }) {
  const { lang } = useI18n();
  return (
    <section className="flex flex-col gap-2">
      <h3 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">{tr(props.title, lang)}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {props.entries.map((entry) => (
          <EntryTile key={entry.id} entry={entry} onOpen={() => props.onSelect(entry.id)} />
        ))}
      </div>
    </section>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  const { t, dir } = useI18n();
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-3 flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
    >
      <ChevronDownIcon size={18} className={dir === 'rtl' ? '-rotate-90' : 'rotate-90'} />
      {t('common.back')}
    </button>
  );
}

export function EmergencySuite({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const { t } = useI18n();
  const selected = ER_REGISTRY.find((entry) => entry.id === selectedId);
  if (selected) {
    return (
      <div>
        <BackButton onBack={() => onSelect(null)} />
        {selected.render()}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ink">{t('er.title')}</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">{t('er.subtitle')}</p>
      </div>
      <EntryGroup title={GROUP_TITLE.field} entries={FIELD_ENTRIES} onSelect={onSelect} />
      <EntryGroup title={GROUP_TITLE.bedside} entries={BEDSIDE_ENTRIES} onSelect={onSelect} />
    </div>
  );
}

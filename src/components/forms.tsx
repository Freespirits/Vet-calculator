/**
 * Form field primitives — visible labels, mobile-correct keyboards,
 * >=44px touch height, inline error placement below the field.
 */
import { useId, type ReactNode } from 'react';
import { ChevronDownIcon } from './Icons';

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-muted">
      {children}
      {optional && <span className="text-xs text-muted/70">({optional})</span>}
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  error,
  min = 0,
  step = 'any',
  icon,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
  error?: string;
  min?: number;
  step?: number | 'any';
  icon?: ReactNode;
  autoFocus?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id}>
        {icon}
        {label}
      </Label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          step={step}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={`glass-input tnum ${suffix ? 'pe-16' : ''} ${error ? '!border-rose' : ''}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-sm font-medium text-muted">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-rose">{error}</p>}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon,
  list,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  list?: string;
  optional?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {icon}
        {label}
      </Label>
      <input
        id={id}
        type="text"
        value={value}
        list={list}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="glass-input"
      />
    </div>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  icon?: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id}>
        {icon}
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="glass-input appearance-none pe-11 cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-bg1 text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={18}
          className="pointer-events-none absolute inset-y-0 end-4 my-auto text-muted"
        />
      </div>
    </div>
  );
}

/** A numeric amount paired with a unit selector (number spans 2 cols). */
export function MeasureField({
  label,
  unitLabel,
  value,
  onChange,
  unit,
  onUnit,
  unitOptions,
  placeholder,
  icon,
  error,
}: {
  label: string;
  unitLabel: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  onUnit: (v: string) => void;
  unitOptions: SelectOption[];
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <NumberField
          label={label}
          icon={icon}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
        />
      </div>
      <SelectField label={unitLabel} value={unit} onChange={onUnit} options={unitOptions} />
    </div>
  );
}

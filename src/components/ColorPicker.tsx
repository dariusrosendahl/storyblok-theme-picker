import { FunctionComponent } from 'react'

export interface ColorOption {
  value: string
  label: string
  color: string
}

interface ColorPickerProps {
  options: ColorOption[]
  value: string | undefined
  onChange: (value: string) => void
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  // Perceived brightness formula
  return (r * 299 + g * 587 + b * 114) / 1000 > 200
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div style={containerStyle}>
      {options.map((option) => {
        const isSelected = value === option.value
        const light = isLightColor(option.color)

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            style={{
              ...chipStyle,
              backgroundColor: isSelected
                ? 'var(--stp-chip-bg-selected, #ffffff)'
                : 'var(--stp-chip-bg, #f5f5f5)',
              borderColor: isSelected
                ? 'var(--stp-chip-border-selected, #1B243F)'
                : 'var(--stp-chip-border, transparent)',
              boxShadow: isSelected
                ? '0 0 0 1px var(--stp-chip-border-selected, #1B243F)'
                : 'none',
            }}
          >
            <span
              style={{
                ...circleStyle,
                backgroundColor: option.color,
                borderColor: light
                  ? 'var(--stp-circle-border, #dddddd)'
                  : option.color,
              }}
            />
            <span style={labelStyle}>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--stp-container-gap, 8px)',
  alignItems: 'center',
}

const chipStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--stp-chip-gap, 6px)',
  padding: 'var(--stp-chip-padding, 4px 12px 4px 8px)',
  borderRadius: 'var(--stp-chip-radius, 999px)',
  border: '1.5px solid',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'var(--stp-label-size, 13px)',
  lineHeight: '1',
  transition: 'all 0.15s ease',
  outline: 'none',
}

const circleStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 'var(--stp-circle-size, 16px)',
  height: 'var(--stp-circle-size, 16px)',
  borderRadius: '50%',
  border: '1.5px solid',
  flexShrink: 0,
}

const labelStyle: React.CSSProperties = {
  color: 'var(--stp-label-color, #1B243F)',
  whiteSpace: 'nowrap',
}

export default ColorPicker

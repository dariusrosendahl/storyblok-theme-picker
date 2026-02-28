import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import ColorPicker, { type ColorOption } from './ColorPicker'

const FieldPlugin: FunctionComponent = () => {
  const { type, data, actions } = useFieldPlugin()

  if (type !== 'loaded') {
    return null
  }

  let options: ColorOption[] = []
  try {
    const raw = data.options?.options
    if (typeof raw === 'string') {
      options = JSON.parse(raw)
    } else if (Array.isArray(raw)) {
      options = raw
    }
  } catch {
    // Invalid JSON — show error
  }

  if (options.length === 0) {
    return (
      <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>
        No color options configured. Add an <code>"options"</code> field in the
        plugin options with a JSON array, e.g.:{' '}
        <code>
          {'[{"value":"bg-primary","label":"Pink","color":"#F9A8D4"}]'}
        </code>
      </p>
    )
  }

  return (
    <ColorPicker
      options={options}
      value={typeof data.content === 'string' ? data.content : undefined}
      onChange={(value) => actions.setContent(value)}
    />
  )
}

export default FieldPlugin

import { ReactNode } from 'react'
const formClasses =
  'block w-full appearance-none rounded-lg border bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-stone-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'

const Label = ({ id, children }: { id: string; children: ReactNode }) => {
  return (
    <label
      htmlFor={id}
      className='mb-2 block text-sm font-semibold text-gray-900'
    >
      {children}
    </label>
  )
}

const TextField = ({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  autoComplete,
  required
}: {
  id: string
  label: string
  type: string
  name: string
  placeholder: string
  autoComplete: string
  required: boolean
}) => {
  return (
    <>
      {label && <Label id={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={formClasses}
      />
    </>
  )
}

export default TextField

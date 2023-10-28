import { experimental_useFormStatus } from 'react-dom'
import { TailSpin } from 'react-loader-spinner'
interface ButtonProps {
  style?: string
  children: React.ReactNode
  formAction?: any
}

const SubmitButton: React.FC<ButtonProps> = ({
  style,
  children,
  formAction
}) => {
  const { pending } = experimental_useFormStatus()

  return (
    <button className={style} disabled={pending} formAction={formAction}>
      {pending ? (
        <div className='flex justify-center bg-inherit'>
          <TailSpin
            height='20'
            width='20'
            color='#4fa94d'
            ariaLabel='tail-spin-loading'
            radius='1'
            visible={true}
            wrapperClass='bg-inherit'
          />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default SubmitButton

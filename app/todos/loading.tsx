import { TailSpin } from '@/app/components/TailSpin'

export default function Loading() {
  return (
    <div className='flex animate-spin justify-center'>
      <TailSpin
        height='80'
        width='80'
        color='#4fa94d'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  )
}

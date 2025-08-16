import Illustration from '../assets/empty_illustration.svg'

export default function Empty() {
  return (
    <div className='empty'>
        <img src={Illustration} alt="no tasks illustration" />
        <p className='empty__par'>Empty...</p>
    </div>
  )
}

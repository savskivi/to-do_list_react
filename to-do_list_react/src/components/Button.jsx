
export default function Button({className, text, onClick}) {
  return (
    <div>
        <button className={className} onClick={onClick}>{text}</button>
    </div>
  )
}

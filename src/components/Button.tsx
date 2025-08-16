type Props = {
  className: string,
  text: string,
  onClick: () => void,
}

export default function Button({className, text, onClick}: Props) {
  return (
    <div>
        <button className={className} onClick={onClick}>{text}</button>
    </div>
  )
}

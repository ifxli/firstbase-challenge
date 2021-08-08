interface Props {
  label: string
  value?: string
  onChange: (value: string) => void
}

function FBInput(props: Props) {
  const { label, value, onChange } = props
  return (
    <div>
      <div>{label}</div>
      <input defaultValue={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}

export default FBInput;

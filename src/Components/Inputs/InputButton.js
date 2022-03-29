export function InputButton({
  id="",
  value,
  className="",
  onClick,
  disabled=false
}) {

  return (
    <>
    <input
      type="button"
      id={id}
      className={className}
      value={value}
      onClick={onClick}
      disabled={disabled}
    />
    </>
  );

}
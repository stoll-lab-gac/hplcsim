export function InputButtonLink({
  id,
  value,
  className,
  onClick,
  href,
  disabled=false
}) {

  return (
    <>
    <a href={href}>
      <input
        type="button"
        id={id}
        className={className}
        value={value}
        onClick={onClick}
        disabled={disabled}
      />
    </a>
    </>
  );

}
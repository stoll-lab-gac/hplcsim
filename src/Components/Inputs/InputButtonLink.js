export function InputButtonLink({
  href,
  value,
  id="",
  className="",
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
        disabled={disabled}
      />
    </a>
    </>
  );

}
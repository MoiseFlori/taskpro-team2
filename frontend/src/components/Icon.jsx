const Icon = ({
    name,           
    width = 24,
    height = 24,
    fill = "currentColor",
    stroke = "currentColor",
    className = "",
    ...props
  }) => (
    <svg
      className={className}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      aria-hidden="true"
      {...props}
    >
      {/* Note: `href` should be a string */}
      <use href={`/assets/sprite.svg#${name}`} />
    </svg>
  );
  
  export default Icon;
  
import React from "react";

export default function HomeIcon({ name, size = 16, className = "", title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <use href={`/home-icons.svg#${name}`} />
    </svg>
  );
}

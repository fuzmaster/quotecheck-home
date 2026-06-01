import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "fill"> & {
  size?: number;
  sw?: number;
  fill?: string;
};

type BaseProps = IconProps & {
  paths?: string | string[];
  children?: ReactNode;
};

function Base({ paths, size = 16, sw = 2, fill, children, ...rest }: BaseProps) {
  const isFilled = fill !== undefined && fill !== "";
  const list = paths === undefined ? [] : Array.isArray(paths) ? paths : [paths];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isFilled ? fill : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {list.map((p, i) => (
        <path key={i} d={p} />
      ))}
      {children}
    </svg>
  );
}

export const Icon = {
  check: (p: IconProps) => <Base paths="M20 6 9 17l-5-5" {...p} />,
  arrowR: (p: IconProps) => <Base paths={["M5 12h14", "m13 5 7 7-7 7"]} {...p} />,
  arrowL: (p: IconProps) => <Base paths={["M19 12H5", "m11 19-7-7 7-7"]} {...p} />,
  plus: (p: IconProps) => <Base paths={["M12 5v14", "M5 12h14"]} {...p} />,
  trash: (p: IconProps) => (
    <Base
      paths={[
        "M3 6h18",
        "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
        "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
        "M10 11v6",
        "M14 11v6",
      ]}
      {...p}
    />
  ),
  info: (p: IconProps) => (
    <Base paths={["M12 16v-4", "M12 8h.01"]} {...p}>
      <circle cx="12" cy="12" r="10" />
    </Base>
  ),
  alert: (p: IconProps) => (
    <Base
      paths={[
        "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
        "M12 9v4",
        "M12 17h.01",
      ]}
      {...p}
    />
  ),
  flag: (p: IconProps) => (
    <Base paths={["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "M4 22v-7"]} {...p} />
  ),
  print: (p: IconProps) => (
    <Base
      paths={[
        "M6 9V2h12v7",
        "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
        "M6 14h12v8H6z",
      ]}
      {...p}
    />
  ),
  copy: (p: IconProps) => (
    <Base paths={["M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"]} {...p}>
      <rect x="8" y="8" width="14" height="14" rx="2" />
    </Base>
  ),
  shield: (p: IconProps) => <Base paths={["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]} {...p} />,
  refresh: (p: IconProps) => (
    <Base
      paths={[
        "M3 12a9 9 0 0 1 15-6.7L21 8",
        "M21 3v5h-5",
        "M21 12a9 9 0 0 1-15 6.7L3 16",
        "M3 21v-5h5",
      ]}
      {...p}
    />
  ),
  spark: (p: IconProps) => (
    <Base
      paths="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1"
      {...p}
    />
  ),
  home: (p: IconProps) => (
    <Base paths={["M3 9.5 12 3l9 6.5", "M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"]} {...p} />
  ),
  lock: (p: IconProps) => (
    <Base paths="M7 11V7a5 5 0 0 1 10 0v4" {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
    </Base>
  ),
};

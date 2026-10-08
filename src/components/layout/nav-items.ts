export const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/doctors", key: "doctors" },
  { href: "/contact", key: "contact" },
] as const;

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

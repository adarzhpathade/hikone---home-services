export interface MenuLink {
  id: string;
  label: string;
  // Links without an href are shown muted as "Soon" until the page exists.
  href?: string;
}

export const MENU_NAV_LINKS: ReadonlyArray<MenuLink> = [
  { id: "home", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/#service-hubs" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

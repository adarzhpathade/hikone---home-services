export interface FooterLink {
  label: string;
  // Links without an href are shown muted as "Soon" until the page exists.
  href?: string;
}

export interface FooterGroup {
  id: string;
  label: string;
  links: ReadonlyArray<FooterLink>;
}

export const FOOTER_TAGLINE = "Precision care for the appliances in your home.";

export const FOOTER_GROUPS: ReadonlyArray<FooterGroup> = [
  {
    id: "services",
    label: "Services",
    links: [
      { label: "Air Conditioning", href: "/ac" },
      { label: "Refrigerators", href: "/fridge" },
    ],
  },
  {
    id: "company",
    label: "Company",
    links: [{ label: "About" }, { label: "Contact" }],
  },
  {
    id: "legal",
    label: "Legal",
    links: [{ label: "Terms" }, { label: "Privacy" }],
  },
];

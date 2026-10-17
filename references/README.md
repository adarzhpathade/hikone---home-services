# Design References & Assets

Store all design references, inspiration, and brand assets for the Urban-style on-demand service platform here.

---

## Folder Organization

* **`screenshots/`**: Drop mobile screens, Figma exports, Dribbble shots, or competitor reference images (Urban Company, Uber, DoorDash, Airbnb, etc.).
* **`brand/`**: Logos, icons, color palettes, brand guidelines, or PDFs provided by the client.
* **`fonts/`**: Custom `.woff2` or `.ttf` font files if you have proprietary or commercial fonts.

---

## Available Fonts in `references/fonts/`

All 4 font files in `references/fonts/` are **full Variable Fonts** (`.woff2`), supporting continuous weight ranges from light/thin all the way to extra-bold/black:

| File Name | Font Family | Supported Weights | Best Use Case in Urban App |
| :--- | :--- | :--- | :--- |
| **`Inter-Variable.woff2`** | **Inter** | `100` – `900` | Universal UI body text, forms, micro-labels, and slot chips. |
| **`MonaSans-Variable.woff2`** | **Mona Sans** (GitHub) | `200` – `900` | Modern hero titles, category headers, and high-impact branding. |
| **`Manrope-Variable.woff2`** | **Manrope** | `200` – `800` | Semi-rounded modern numerals for prices (`₹599`), ratings, and badges. |
| **`Montserrat-Variable.woff2`** | **Montserrat** | `100` – `900` | Clean geometric uppercase headers, buttons, and section titles. |

---

## How to Load Local Variable Fonts in Next.js

```tsx
import localFont from 'next/font/local';

// Example: Primary UI font (Inter or Manrope)
export const fontSans = localFont({
  src: '../../references/fonts/Inter-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

// Example: Display / Heading font (Mona Sans or Montserrat)
export const fontDisplay = localFont({
  src: '../../references/fonts/MonaSans-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '200 900',
});
```

---

## Design Reference Notes

Add any links, client feedback, or notes below:
* **Figma Link**: *(Paste link here)*
* **Target Color Theme**: 
* **Key Visual Notes**:

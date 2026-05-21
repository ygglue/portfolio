export interface ContactLink {
  label: string;
  icon: string;
  value: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  {
    label: "email",
    icon: "mail",
    value: "lagumbayeliyahu@gmail.com",
    href: "mailto:lagumbayeliyahu@gmail.com",
  },
  {
    label: "github",
    icon: "git",
    value: "github.com/ygglue",
    href: "https://github.com/ygglue",
  },
  {
    label: "facebook",
    icon: "facebook",
    value: "eliyahu.lagumbay",
    href: "https://facebook.com/eliyahu.lagumbay",
  },
];

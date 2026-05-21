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
    value: "eli@elitru.io",
    href: "mailto:eli@elitru.io",
  },
  {
    label: "github",
    icon: "git",
    value: "github.com/elitru",
    href: "https://github.com/elitru",
  },
  {
    label: "facebook",
    icon: "facebook",
    value: "facebook.com/elitru",
    href: "https://facebook.com/elitru",
  },
];

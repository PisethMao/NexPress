export type FooterBrand = {
  title: string;
  description: string;
  socials: {
    icon: string;
    href: string;
  }[];
};
export type FooterSectionType = {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
};
export type FooterNewsLetter = {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
};
export type FooterData = {
  brand: FooterBrand;
  navigation: FooterSectionType;
  categories: FooterSectionType;
  newsletter: FooterNewsLetter;
  copyright: {
    text: string;
  };
};

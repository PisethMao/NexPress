import { FooterData } from "@/types/footerType";

export const footerData: FooterData = {
  brand: {
    title: "NexPress",
    description:
      "A modern blog platform built for creators who want fast, beautiful, and powerful experiences.",
    socials: [
      { icon: "facebook", href: "https://www.facebook.com/piseth.mao.2025" },
      { icon: "x", href: "https://x.com/PisethMao528763" },
      { icon: "github", href: "https://github.com/PisethMao" },
    ],
  },
  navigation: {
    title: "Navigation",
    items: [
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: "Authors", href: "/authors" },
      { label: "Blog Feed", href: "/blogs" },
    ],
  },
  categories: {
    title: "Categories",
    items: [
      { label: "Design", href: "/categories/design" },
      { label: "Development", href: "/categories/development" },
      { label: "Tips", href: "/categories/tips" },
      { label: "Guides", href: "/categories/guides" },
    ],
  },
  newsletter: {
    title: "Stay Updated",
    subtitle: "Subscribe to get the latest articles very week.",
    placeholder: "Enter your email",
    buttonLabel: "Go",
  },
  copyright: { text: "NexPress - All rights reserved." },
};

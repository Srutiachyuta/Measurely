export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}


export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  popular: boolean;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  relatedSlugs: string[];
  relatedTools?: { name: string; slug: string; type: "calculator" }[];
  faqs?: { question: string; answer: string }[];
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

/**
 * UI strings for static elements (nav, buttons, labels).
 * Content (hero text, product descriptions, etc.) lives in src/content/*
 * so it can be edited via Sveltia CMS.
 */

export const languages = {
  uk: 'Українська',
  en: 'English',
} as const;

export const defaultLang = 'uk' as const;
export const showDefaultLang = false;

export type Lang = keyof typeof languages;

export const ui = {
  uk: {
    'nav.about': 'Про нас',
    'nav.products': 'Продукти',
    'nav.services': 'Послуги',
    'nav.projects': 'Проекти',
    'nav.news': 'Новини',
    'nav.contact': 'Контакти',
    'cta.contact': "Зв'язатися з нами",
    'cta.products': 'Наші продукти',
    'cta.learnMore': 'Дізнатися більше',
    'cta.getQuote': 'Отримати консультацію',
    'form.name': "Ім'я",
    'form.email': 'Електронна пошта',
    'form.phone': 'Телефон',
    'form.message': 'Повідомлення',
    'form.submit': 'Надіслати',
    'form.submitting': 'Надсилання...',
    'form.success': 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.',
    'form.error': 'Помилка. Спробуйте ще раз або напишіть нам напряму.',
    'form.namePlaceholder': 'Іванов Іван Іванович',
    'form.emailPlaceholder': 'ivanov@example.com',
    'form.phonePlaceholder': '+380 44 000-00-00',
    'form.messagePlaceholder': 'Опишіть ваш запит...',
    'footer.rights': 'Усі права захищені',
    'footer.builtBy': 'Створено з турботою',
    'hero.foundedBadge': 'Заснована у 2005 році',
    'stats.projects': 'реалізованих проектів',
    'stats.cities': 'міст України',
    'stats.countries': 'країни',
    'contact.phoneLabel': 'Телефон / Факс',
    'contact.emailLabel': 'Електронна пошта',
    'contact.addressLabel': 'Адреса',
    'contact.hoursLabel': 'Робочі години',
    'backToTop': 'Нагору',
    'openMenu': 'Відкрити меню',
    'closeMenu': 'Закрити меню',
    'skipToContent': 'Перейти до основного вмісту',
  },
  en: {
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'cta.contact': 'Contact us',
    'cta.products': 'Our products',
    'cta.learnMore': 'Learn more',
    'cta.getQuote': 'Get a consultation',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.message': 'Message',
    'form.submit': 'Send',
    'form.submitting': 'Sending...',
    'form.success': "Thank you! We'll get back to you shortly.",
    'form.error': 'Something went wrong. Please try again or email us directly.',
    'form.namePlaceholder': 'John Smith',
    'form.emailPlaceholder': 'john@example.com',
    'form.phonePlaceholder': '+380 44 000-00-00',
    'form.messagePlaceholder': 'Describe your request...',
    'footer.rights': 'All rights reserved',
    'footer.builtBy': 'Built with care',
    'hero.foundedBadge': 'Founded in 2005',
    'stats.projects': 'completed projects',
    'stats.cities': 'cities in Ukraine',
    'stats.countries': 'countries',
    'contact.phoneLabel': 'Phone / Fax',
    'contact.emailLabel': 'Email',
    'contact.addressLabel': 'Address',
    'contact.hoursLabel': 'Working hours',
    'backToTop': 'Back to top',
    'openMenu': 'Open menu',
    'closeMenu': 'Close menu',
    'skipToContent': 'Skip to main content',
  },
} as const;

export type UIKey = keyof typeof ui.uk;

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

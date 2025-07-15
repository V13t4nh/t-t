export function formatNumber(num) {
  return new Intl.NumberFormat('vi-VN').format(num);
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const dictionary = {
  vi: {
    'view-more': 'Xem thêm'
  },
  en: {
    'view-more': 'View more'
  }
};

export function i18n(key, lang = 'vi') {
  return dictionary[lang]?.[key] || key;
}

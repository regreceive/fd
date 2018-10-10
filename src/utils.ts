export function getQueryStringByName(name: string, url?: string): string {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return '';
  }
  const lang = decodeURIComponent(results[2]).replace(/\+/g, '');
  if (!/^(en|cn)$/.test(lang)) {
    return '';
  }
  return lang;
}

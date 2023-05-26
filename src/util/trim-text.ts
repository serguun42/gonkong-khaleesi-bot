export default function TrimText(text: string): string {
  return typeof text === 'string' ? text.replace(/@\[\d+]\s*([,.;:\-—–])?\s*/, '').trim() || '' : '';
}

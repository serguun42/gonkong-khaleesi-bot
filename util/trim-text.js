/**
 * @param {string} text
 * @returns {string}
 */
const TrimText = (text) => (typeof text === 'string' ? text.replace(/@\[\d+]\s*([,.;:-])?\s*/, '').trim() || '' : '');

export default TrimText;

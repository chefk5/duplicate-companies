import path from 'path';

export const PATH = path.resolve('data', 'companies.txt');
export const THRESHOLD = 0.9;
export const COMMON_WORDS = new Set([
  'group', 'media', 'tech', 'technologies', 'systems', 'solutions', 'digital', 'global',
  'network', 'services', 'design', 'labs', 'lab', 'studio', 'studios', 'company',
  'enterprises', 'ventures', 'international', 'corp', 'inc', 'llc', 'co', 'sa',
  'ltd', 'gmbh', 'sarl', 'plc', 'the', 'new', 'a', 'an','incorporated','corp','ent',
]);
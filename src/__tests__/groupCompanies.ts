import { groupCompanies } from '../services/groupCompanies';

describe('groupCompanies', () => {
  it('groups similar company names', () => {
    const input = [
      'Acme Inc.',
      'ACME Incorporated',
      'Globex',
      'Globex Corp.',
      'Wayne Enterprises',
      'Wayne Ent.',
      'Initech',
    ];

    const result = groupCompanies(input);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining(['Acme Inc.', 'ACME Incorporated']),
        expect.arrayContaining(['Globex', 'Globex Corp.']),
        expect.arrayContaining(['Wayne Enterprises', 'Wayne Ent.']),
      ])
    );

    const flat = result.flat();
    expect(flat).not.toContain('Initech');
  });

  it('returns empty list for unique names', () => {
    const input = ['Zebra Corp', 'Delta Systems', 'Alpha LLC'];
    const result = groupCompanies(input);
    expect(result).toEqual([]);
  });
});

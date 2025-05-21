import { readCompanies } from './services/reader';
import { groupCompanies } from './services/groupCompanies';

(async () => {
  const companiesNames = await readCompanies();
  const groupedCompanyNames = groupCompanies(companiesNames);
  console.log(groupedCompanyNames);
})();
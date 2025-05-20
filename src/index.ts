import { readCompanies } from './services/reader';
import { groupCompanies } from './services/groupFinder';

(async () => {
  const companiesNames = await readCompanies();
  const groupedCompanyNames = groupCompanies(companiesNames);
  console.log(groupedCompanyNames);
})();
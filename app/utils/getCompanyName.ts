import { IUsers } from "../types";

export const getCompanyName = (users: IUsers[] | []) => {
  const companyCounts: Record<string, number> = {};
  users.forEach((u) => {
    const companyName = u.company?.name || "Unknown";
    companyCounts[companyName] = (companyCounts[companyName] || 0) + 1;
  });
  return companyCounts;
};

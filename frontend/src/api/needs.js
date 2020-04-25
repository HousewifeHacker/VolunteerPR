import { getRequest } from ".";

const baseUrl = "/api/v1/";

export const listNeeds = (needType) => {
  return getRequest(`${baseUrl}needs?type=${needType}`);
};

export const listOrgNeeds = (orgId) => {
  return getRequest(`${baseUrl}needs?org=${orgId}`);
};

export const listOrgs = () => {
  return getRequest(`${baseUrl}orgs`);
};

export const detailOrg = (orgId) => {
  return getRequest(`${baseUrl}orgs/${orgId}`);
}

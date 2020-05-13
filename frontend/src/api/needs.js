import { makeRequest } from ".";

const baseUrl = "/api/v1/";

export const listNeeds = (needType) => {
  return makeRequest(`${baseUrl}needs?type=${needType}`);
};

export const listOrgNeeds = (orgId) => {
  return makeRequest(`${baseUrl}needs?org=${orgId}`);
};

export const listOrgs = () => {
  return makeRequest(`${baseUrl}orgs`);
};

export const detailOrg = (orgId) => {
  return makeRequest(`${baseUrl}orgs/${orgId}`);
};

export const postMatch = (token, needId) => {
  return makeRequest(`${baseUrl}matches/`, token, "POST", { need: needId });
}

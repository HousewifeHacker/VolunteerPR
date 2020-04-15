import { getRequest } from ".";

const baseUrl = "/api/v1/needs";

export const listNeeds = (need_type) => {
  return getRequest(`${baseUrl}?type=${need_type}`);
};

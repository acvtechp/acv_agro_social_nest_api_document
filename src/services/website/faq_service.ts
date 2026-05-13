// Axios
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { SBR, FBR } from '../../core/BaseResponse';

import { FAQ } from 'src/core/Models';
import { FAQQueryDTO, FAQDTO } from 'src/core/ZodSchemas';

// URL and Endpoints
const URL = 'website/faq';

const ENDPOINTS = {
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// FAQ APIs
export const findFAQ = async (data: FAQQueryDTO): Promise<FBR<FAQ[]>> => {
  return apiPost<FBR<FAQ[]>, FAQQueryDTO>(ENDPOINTS.find, data);
};

export const createFAQ = async (data: FAQDTO): Promise<SBR> => {
  return apiPost<SBR, FAQDTO>(ENDPOINTS.create, data);
};

export const updateFAQ = async (id: string, data: FAQDTO): Promise<SBR> => {
  return apiPatch<SBR, FAQDTO>(ENDPOINTS.update(id), data);
};

export const deleteFAQ = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.delete(id));
};

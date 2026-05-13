// Axios
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { SBR, FBR } from '../../core/BaseResponse';

import { ContactUsDetail } from 'src/core/Models';
import { ContactUsDetailQueryDTO, ContactUsDetailDTO } from 'src/core/ZodSchemas';

// URL and Endpoints
const URL = 'website/contact_us_detail';

const ENDPOINTS = {
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// ContactUsDetail APIs
export const findContactUsDetail = async (data: ContactUsDetailQueryDTO): Promise<FBR<ContactUsDetail[]>> => {
  return apiPost<FBR<ContactUsDetail[]>, ContactUsDetailQueryDTO>(ENDPOINTS.find, data);
};

export const createContactUsDetail = async (data: ContactUsDetailDTO): Promise<SBR> => {
  return apiPost<SBR, ContactUsDetailDTO>(ENDPOINTS.create, data);
};

export const updateContactUsDetail = async (id: string,data: ContactUsDetailDTO): Promise<SBR> => {
  return apiPatch<SBR, ContactUsDetailDTO>(ENDPOINTS.update(id), data);
};

export const deleteContactUsDetail = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.delete(id));
};

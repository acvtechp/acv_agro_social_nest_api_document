// Imports
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { CUBR, FBR, DBR } from '../../core/BaseResponse';

import { ResumeCertification } from 'src/core/Models';
import { ResumeCertificationDTO, ResumeCertificationQueryDTO } from 'src/core/ZodSchemas';

const URL = 'resume/certification';

const ENDPOINTS = {
  // ResumeCertification APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// ResumeCertification APIs
export const find_ResumeCertification = async (data: ResumeCertificationQueryDTO): Promise<FBR<ResumeCertification[]>> => {
  return apiPost<FBR<ResumeCertification[]>, ResumeCertificationQueryDTO>(ENDPOINTS.find, data);
};

export const create_ResumeCertification = async (data: ResumeCertificationDTO): Promise<CUBR<ResumeCertification>> => {
  return apiPost<CUBR<ResumeCertification>, ResumeCertificationDTO>(ENDPOINTS.create, data);
};

export const update_ResumeCertification = async (id: string, data: ResumeCertificationDTO): Promise<CUBR<ResumeCertification>> => {
  return apiPatch<CUBR<ResumeCertification>, ResumeCertificationDTO>(ENDPOINTS.update(id), data);
};

export const delete_ResumeCertification = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
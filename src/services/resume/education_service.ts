// Imports
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { CUBR, FBR, DBR } from '../../core/BaseResponse';

import { ResumeEducation } from 'src/core/Models';
import { ResumeEducationDTO, ResumeEducationQueryDTO } from 'src/core/ZodSchemas';

const URL = 'resume/education';

const ENDPOINTS = {
  // ResumeEducation APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// ResumeEducation APIs
export const find_ResumeEducation = async (data: ResumeEducationQueryDTO): Promise<FBR<ResumeEducation[]>> => {
  return apiPost<FBR<ResumeEducation[]>, ResumeEducationQueryDTO>(ENDPOINTS.find, data);
};

export const create_ResumeEducation = async (data: ResumeEducationDTO): Promise<CUBR<ResumeEducation>> => {
  return apiPost<CUBR<ResumeEducation>, ResumeEducationDTO>(ENDPOINTS.create, data);
};

export const update_ResumeEducation = async (id: string, data: ResumeEducationDTO): Promise<CUBR<ResumeEducation>> => {
  return apiPatch<CUBR<ResumeEducation>, ResumeEducationDTO>(ENDPOINTS.update(id), data);
};

export const delete_ResumeEducation = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
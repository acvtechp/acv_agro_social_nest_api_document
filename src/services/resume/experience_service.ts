// Imports
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { CUBR, FBR, DBR } from '../../core/BaseResponse';

import { ResumeExperience } from 'src/core/Models';
import { ResumeExperienceDTO, ResumeExperienceQueryDTO } from 'src/core/ZodSchemas';

const URL = 'resume/experience';

const ENDPOINTS = {
  // ResumeExperience APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// ResumeExperience APIs
export const find_ResumeExperience = async (data: ResumeExperienceQueryDTO): Promise<FBR<ResumeExperience[]>> => {
  return apiPost<FBR<ResumeExperience[]>, ResumeExperienceQueryDTO>(ENDPOINTS.find, data);
};

export const create_ResumeExperience = async (data: ResumeExperienceDTO): Promise<CUBR<ResumeExperience>> => {
  return apiPost<CUBR<ResumeExperience>, ResumeExperienceDTO>(ENDPOINTS.create, data);
};

export const update_ResumeExperience = async (id: string, data: ResumeExperienceDTO): Promise<CUBR<ResumeExperience>> => {
  return apiPatch<CUBR<ResumeExperience>, ResumeExperienceDTO>(ENDPOINTS.update(id), data);
};

export const delete_ResumeExperience = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
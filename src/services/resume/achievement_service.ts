// Imports
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { CUBR, FBR, DBR } from '../../core/BaseResponse';

import { ResumeAchievement } from 'src/core/Models';
import { ResumeAchievementDTO, ResumeAchievementQueryDTO } from 'src/core/ZodSchemas';

const URL = 'resume/achievement';

const ENDPOINTS = {
  // ResumeAchievement APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// ResumeAchievement APIs
export const find_ResumeAchievement = async (data: ResumeAchievementQueryDTO): Promise<FBR<ResumeAchievement[]>> => {
  return apiPost<FBR<ResumeAchievement[]>, ResumeAchievementQueryDTO>(ENDPOINTS.find, data);
};

export const create_ResumeAchievement = async (data: ResumeAchievementDTO): Promise<CUBR<ResumeAchievement>> => {
  return apiPost<CUBR<ResumeAchievement>, ResumeAchievementDTO>(ENDPOINTS.create, data);
};

export const update_ResumeAchievement = async (id: string, data: ResumeAchievementDTO): Promise<CUBR<ResumeAchievement>> => {
  return apiPatch<CUBR<ResumeAchievement>, ResumeAchievementDTO>(ENDPOINTS.update(id), data);
};

export const delete_ResumeAchievement = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
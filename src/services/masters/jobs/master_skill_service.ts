// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterSkill } from 'src/core/Models';
import { MasterSkillDTO, MasterSkillQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/skill';

const ENDPOINTS = {
  // MasterSkill APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterSkill Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterSkill APIs
export const find_MasterSkill = async (data: MasterSkillQueryDTO): Promise<FBR<MasterSkill[]>> => {
  return apiPost<FBR<MasterSkill[]>, MasterSkillQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterSkill = async (data: MasterSkillDTO): Promise<CUBR<MasterSkill>> => {
  return apiPost<CUBR<MasterSkill>, MasterSkillDTO>(ENDPOINTS.create, data);
};

export const update_MasterSkill = async (id: string, data: MasterSkillDTO): Promise<CUBR<MasterSkill>> => {
  return apiPatch<CUBR<MasterSkill>, MasterSkillDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterSkill = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterSkill Cache
export const find_cache_MasterSkill = async (user_id: string): Promise<FBR<MasterSkill[]>> => {
  return apiGet<FBR<MasterSkill[]>>(ENDPOINTS.cache(user_id));
};
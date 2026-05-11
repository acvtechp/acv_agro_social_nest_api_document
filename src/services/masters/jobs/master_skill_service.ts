// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

// Zod
import { z } from 'zod';
import {
  stringMandatory,
  stringOptional,
  enumMandatory,
  multi_select_optional,
  single_select_mandatory,
} from '../../../zod_utils/zod_utils';
import { BaseQuerySchema } from '../../../zod_utils/zod_base_schema';

// Enums
import { Status } from '../../../core/Enums';

// Other Models
import { User } from '../../../services/users/user_service';
import { JobSkillLink } from '../../../services/jobs/job_skill_link_service';
import { ResumeSkillLink } from '../../../services/resume/resume_skill_link_service';

const URL = 'skill';

const ENDPOINTS = {
  // MasterSkill APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterSkill Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterSkill Interface
export interface MasterSkill extends Record<string, unknown> {
  // Primary Field
  skill_id: string;

  // Main Field Details
  skill: string;
  description?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  modified_date_time: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_image_url?: string;

  // Relations - Child
  JobSkillLink?: JobSkillLink[];
  ResumeSkillLink?: ResumeSkillLink[];

  // Relations - Child Count
  _count?: {
    JobSkillLink?: number;
    ResumeSkillLink?: number;
  };
}

// MasterSkill Create/Update Schema
export const MasterSkillSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  skill: stringMandatory('Skill', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterSkillDTO = z.infer<typeof MasterSkillSchema>;

// MasterSkill Query Schema
export const MasterSkillQuerySchema = BaseQuerySchema.extend({
  // Self Table
  skill_ids: multi_select_optional('MasterSkill'), // Multi-Selection -> MasterSkill

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterSkillQueryDTO = z.infer<typeof MasterSkillQuerySchema>;

// Convert MasterSkill Data to API Payload
export const toMasterSkillPayload = (row: MasterSkill): MasterSkillDTO => ({
  user_id: row.user_id || '',

  skill: row.skill || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterSkill Payload
export const newMasterSkillPayload = (): MasterSkillDTO => ({
  user_id: '',

  skill: '',
  description: '',

  status: Status.Active,
});

// MasterSkill APIs
export const create_MasterSkill = async (data: MasterSkillDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterSkillDTO>(ENDPOINTS.create, data);
};

export const find_MasterSkill = async (data: MasterSkillQueryDTO): Promise<FBR<MasterSkill[]>> => {
  return apiPost<FBR<MasterSkill[]>, MasterSkillQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterSkill = async (id: string, data: MasterSkillDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterSkillDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterSkill = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterSkill Cache
export const find_cache_MasterSkill = async (user_id: string): Promise<FBR<MasterSkill[]>> => {
  return apiGet<FBR<MasterSkill[]>>(ENDPOINTS.cache(user_id));
};
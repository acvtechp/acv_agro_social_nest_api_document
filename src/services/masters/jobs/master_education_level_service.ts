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
import { Job } from '../../../services/jobs/job_service';
import { ResumeEducation } from '../../../services/resume/resume_education_service';

const URL = 'education_level';

const ENDPOINTS = {
  // MasterEducationLevel APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEducationLevel Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEducationLevel Interface
export interface MasterEducationLevel extends Record<string, unknown> {
  // Primary Field
  education_level_id: string;

  // Main Field Details
  education_level: string;
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
  Job?: Job[];
  ResumeEducation?: ResumeEducation[];

  // Relations - Child Count
  _count?: {
    Job?: number;
    ResumeEducation?: number;
  };
}

// MasterEducationLevel Create/Update Schema
export const MasterEducationLevelSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  education_level: stringMandatory('Education Level', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterEducationLevelDTO = z.infer<
  typeof MasterEducationLevelSchema
>;

// MasterEducationLevel Query Schema
export const MasterEducationLevelQuerySchema = BaseQuerySchema.extend({
  // Self Table
  education_level_ids: multi_select_optional('MasterEducationLevel'), // Multi-Selection -> MasterEducationLevel

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterEducationLevelQueryDTO = z.infer<
  typeof MasterEducationLevelQuerySchema
>;

// Convert MasterEducationLevel Data to API Payload
export const toMasterEducationLevelPayload = (row: MasterEducationLevel): MasterEducationLevelDTO => ({
  user_id: row.user_id || '',

  education_level: row.education_level || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterEducationLevel Payload
export const newMasterEducationLevelPayload = (): MasterEducationLevelDTO => ({
  user_id: '',

  education_level: '',
  description: '',

  status: Status.Active,
});

// MasterEducationLevel APIs
export const create_MasterEducationLevel = async (data: MasterEducationLevelDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterEducationLevelDTO>(ENDPOINTS.create, data);
};

export const find_MasterEducationLevel = async (data: MasterEducationLevelQueryDTO): Promise<FBR<MasterEducationLevel[]>> => {
  return apiPost<FBR<MasterEducationLevel[]>, MasterEducationLevelQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterEducationLevel = async (id: string, data: MasterEducationLevelDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterEducationLevelDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEducationLevel = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEducationLevel Cache
export const find_cache_MasterEducationLevel = async (user_id: string): Promise<FBR<MasterEducationLevel[]>> => {
  return apiGet<FBR<MasterEducationLevel[]>>(ENDPOINTS.cache(user_id));
};
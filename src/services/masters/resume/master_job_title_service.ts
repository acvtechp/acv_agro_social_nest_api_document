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
import { ResumeExperience } from '../../../services/resume/resume_experience_service';

const URL = 'job_title';

const ENDPOINTS = {
  // MasterJobTitle APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobTitle Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobTitle Interface
export interface MasterJobTitle extends Record<string, unknown> {
  // Primary Field
  job_title_id: string;

  // Main Field Details
  job_title: string;
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
  ResumeExperience?: ResumeExperience[];

  // Relations - Child Count
  _count?: {
    ResumeExperience?: number;
  };
}

// MasterJobTitle Create/Update Schema
export const MasterJobTitleSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  job_title: stringMandatory('Job Title', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterJobTitleDTO = z.infer<typeof MasterJobTitleSchema>;

// MasterJobTitle Query Schema
export const MasterJobTitleQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_title_ids: multi_select_optional('MasterJobTitle'), // Multi-Selection -> MasterJobTitle

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterJobTitleQueryDTO = z.infer<typeof MasterJobTitleQuerySchema>;

// Convert MasterJobTitle Data to API Payload
export const toMasterJobTitlePayload = (row: MasterJobTitle): MasterJobTitleDTO => ({
  user_id: row.user_id || '',

  job_title: row.job_title || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterJobTitle Payload
export const newMasterJobTitlePayload = (): MasterJobTitleDTO => ({
  user_id: '',

  job_title: '',
  description: '',

  status: Status.Active,
});

// MasterJobTitle APIs
export const create_MasterJobTitle = async (data: MasterJobTitleDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterJobTitleDTO>(ENDPOINTS.create, data);
};

export const find_MasterJobTitle = async (data: MasterJobTitleQueryDTO): Promise<FBR<MasterJobTitle[]>> => {
  return apiPost<FBR<MasterJobTitle[]>, MasterJobTitleQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterJobTitle = async (id: string, data: MasterJobTitleDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterJobTitleDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobTitle = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobTitle Cache
export const find_cache_MasterJobTitle = async (user_id: string): Promise<FBR<MasterJobTitle[]>> => {
  return apiGet<FBR<MasterJobTitle[]>>(ENDPOINTS.cache(user_id));
};
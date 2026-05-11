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
import { ResumeExperience } from '../../../services/resume/resume_experience_service';

const URL = 'employment_type';

const ENDPOINTS = {
  // MasterEmploymentType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEmploymentType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEmploymentType Interface
export interface MasterEmploymentType extends Record<string, unknown> {
  // Primary Field
  employment_type_id: string;

  // Main Field Details
  employment_type: string;
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
  ResumeExperience?: ResumeExperience[];

  // Relations - Child Count
  _count?: {
    Job?: number;
    ResumeExperience?: number;
  };
}

// MasterEmploymentType Create/Update Schema
export const MasterEmploymentTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  employment_type: stringMandatory('Employment Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterEmploymentTypeDTO = z.infer<
  typeof MasterEmploymentTypeSchema
>;

// MasterEmploymentType Query Schema
export const MasterEmploymentTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  employment_type_ids: multi_select_optional('MasterEmploymentType'), // Multi-Selection -> MasterEmploymentType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterEmploymentTypeQueryDTO = z.infer<
  typeof MasterEmploymentTypeQuerySchema
>;

// Convert MasterEmploymentType Data to API Payload
export const toMasterEmploymentTypePayload = (row: MasterEmploymentType): MasterEmploymentTypeDTO => ({
  user_id: row.user_id || '',

  employment_type: row.employment_type || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterEmploymentType Payload
export const newMasterEmploymentTypePayload = (): MasterEmploymentTypeDTO => ({
  user_id: '',

  employment_type: '',
  description: '',

  status: Status.Active,
});

// MasterEmploymentType APIs
export const create_MasterEmploymentType = async (data: MasterEmploymentTypeDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterEmploymentTypeDTO>(ENDPOINTS.create, data);
};

export const find_MasterEmploymentType = async (data: MasterEmploymentTypeQueryDTO): Promise<FBR<MasterEmploymentType[]>> => {
  return apiPost<FBR<MasterEmploymentType[]>, MasterEmploymentTypeQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterEmploymentType = async (id: string, data: MasterEmploymentTypeDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterEmploymentTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEmploymentType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEmploymentType Cache
export const find_cache_MasterEmploymentType = async (user_id: string): Promise<FBR<MasterEmploymentType[]>> => {
  return apiGet<FBR<MasterEmploymentType[]>>(ENDPOINTS.cache(user_id));
};
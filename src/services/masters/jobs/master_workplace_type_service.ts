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

const URL = 'workplace_type';

const ENDPOINTS = {
  // MasterWorkplaceType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterWorkplaceType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterWorkplaceType Interface
export interface MasterWorkplaceType extends Record<string, unknown> {
  // Primary Field
  workplace_type_id: string;

  // Main Field Details
  workplace_type: string;
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

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterWorkplaceType Create/Update Schema
export const MasterWorkplaceTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  workplace_type: stringMandatory('Workplace Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterWorkplaceTypeDTO = z.infer<typeof MasterWorkplaceTypeSchema>;

// MasterWorkplaceType Query Schema
export const MasterWorkplaceTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  workplace_type_ids: multi_select_optional('MasterWorkplaceType'), // Multi-Selection -> MasterWorkplaceType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterWorkplaceTypeQueryDTO = z.infer<
  typeof MasterWorkplaceTypeQuerySchema
>;

// Convert MasterWorkplaceType Data to API Payload
export const toMasterWorkplaceTypePayload = (row: MasterWorkplaceType): MasterWorkplaceTypeDTO => ({
  user_id: row.user_id || '',

  workplace_type: row.workplace_type || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterWorkplaceType Payload
export const newMasterWorkplaceTypePayload = (): MasterWorkplaceTypeDTO => ({
  user_id: '',

  workplace_type: '',
  description: '',

  status: Status.Active,
});

// MasterWorkplaceType APIs
export const create_MasterWorkplaceType = async (data: MasterWorkplaceTypeDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterWorkplaceTypeDTO>(ENDPOINTS.create, data);
};

export const find_MasterWorkplaceType = async (data: MasterWorkplaceTypeQueryDTO): Promise<FBR<MasterWorkplaceType[]>> => {
  return apiPost<FBR<MasterWorkplaceType[]>, MasterWorkplaceTypeQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterWorkplaceType = async (id: string, data: MasterWorkplaceTypeDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterWorkplaceTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterWorkplaceType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterWorkplaceType Cache
export const find_cache_MasterWorkplaceType = async (user_id: string): Promise<FBR<MasterWorkplaceType[]>> => {
  return apiGet<FBR<MasterWorkplaceType[]>>(ENDPOINTS.cache(user_id));
};
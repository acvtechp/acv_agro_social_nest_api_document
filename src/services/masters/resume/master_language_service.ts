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
import { ResumeLanguageLink } from '../../../services/resume/resume_language_link_service';

const URL = 'language';

const ENDPOINTS = {
  // MasterLanguage APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterLanguage Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterLanguage Interface
export interface MasterLanguage extends Record<string, unknown> {
  // Primary Field
  language_id: string;

  // Main Field Details
  language: string;
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
  ResumeLanguageLink?: ResumeLanguageLink[];

  // Relations - Child Count
  _count?: {
    ResumeLanguageLink?: number;
  };
}

// MasterLanguage Create/Update Schema
export const MasterLanguageSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  language: stringMandatory('Language', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterLanguageDTO = z.infer<typeof MasterLanguageSchema>;

// MasterLanguage Query Schema
export const MasterLanguageQuerySchema = BaseQuerySchema.extend({
  // Self Table
  language_ids: multi_select_optional('MasterLanguage'), // Multi-Selection -> MasterLanguage

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterLanguageQueryDTO = z.infer<typeof MasterLanguageQuerySchema>;

// Convert MasterLanguage Data to API Payload
export const toMasterLanguagePayload = (row: MasterLanguage): MasterLanguageDTO => ({
  user_id: row.user_id || '',

  language: row.language || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterLanguage Payload
export const newMasterLanguagePayload = (): MasterLanguageDTO => ({
  user_id: '',

  language: '',
  description: '',

  status: Status.Active,
});

// MasterLanguage APIs
export const create_MasterLanguage = async (data: MasterLanguageDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterLanguageDTO>(ENDPOINTS.create, data);
};

export const find_MasterLanguage = async (data: MasterLanguageQueryDTO): Promise<FBR<MasterLanguage[]>> => {
  return apiPost<FBR<MasterLanguage[]>, MasterLanguageQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterLanguage = async (id: string, data: MasterLanguageDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterLanguageDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterLanguage = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterLanguage Cache
export const find_cache_MasterLanguage = async (user_id: string): Promise<FBR<MasterLanguage[]>> => {
  return apiGet<FBR<MasterLanguage[]>>(ENDPOINTS.cache(user_id));
};
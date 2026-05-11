// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR, BR, AWSPresignedUrl } from '../../../core/BaseResponse';

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

const URL = 'job_company';

const ENDPOINTS = {
  // AWS S3 PRESIGNED
  get_company_image_presigned_url: (file_name: string): string => `${URL}/get_company_image_presigned_url/${file_name}`,

  // File Uploads
  update_company_image: (id: string): string => `${URL}/update_company_image/${id}`,
  remove_company_image: (id: string): string => `${URL}/remove_company_image/${id}`,

  // MasterJobCompany APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobCompany Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobCompany Interface
export interface MasterJobCompany extends Record<string, unknown> {
  // Primary Field
  job_company_id: string;

  // Profile Image/Logo
  company_image_url?: string;
  company_image_key?: string;
  company_image_name?: string;

  // Main Field Details
  company_name: string;
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

// UserCompanyLogo Schema
export const UserCompanyLogoSchema = z.object({
  // Profile Image/Logo
  company_image_url: stringMandatory('Company Image URL', 0, 300),
  company_image_key: stringMandatory('Company Image Key', 0, 300),
  company_image_name: stringMandatory('Company Image Name', 0, 300),
});
export type UserCompanyLogoDTO = z.infer<typeof UserCompanyLogoSchema>;

// MasterJobCompany Create/Update Schema
export const MasterJobCompanySchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Profile Image/Logo
  company_image_url: stringOptional('Company Image URL', 0, 300),
  company_image_key: stringOptional('Company Image Key', 0, 300),
  company_image_name: stringOptional('Company Image Name', 0, 300),

  // Main Field Details
  company_name: stringMandatory('Company Name', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterJobCompanyDTO = z.infer<typeof MasterJobCompanySchema>;

// MasterJobCompany Query Schema
export const MasterJobCompanyQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_company_ids: multi_select_optional('MasterJobCompany'), // Multi-Selection -> MasterJobCompany

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterJobCompanyQueryDTO = z.infer<
  typeof MasterJobCompanyQuerySchema
>;

// Convert MasterJobCompany Data to API Payload
export const toMasterJobCompanyPayload = (row: MasterJobCompany): MasterJobCompanyDTO => ({
  user_id: row.user_id || '',

  company_image_url: row.company_image_url || '',
  company_image_key: row.company_image_key || '',
  company_image_name: row.company_image_name || '',

  company_name: row.company_name || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterJobCompany Payload
export const newMasterJobCompanyPayload = (): MasterJobCompanyDTO => ({
  user_id: '',

  company_image_url: '',
  company_image_key: '',
  company_image_name: '',

  company_name: '',
  description: '',

  status: Status.Active,
});

// AWS S3 PRESIGNED
export const get_company_image_presigned_url_MasterJobCompany = async (file_name: string): Promise<BR<AWSPresignedUrl>> => {
  return apiGet<BR<AWSPresignedUrl>>(ENDPOINTS.get_company_image_presigned_url(file_name));
};

// File Uploads
export const update_company_image_MasterJobCompany = async (id: string, data: UserCompanyLogoDTO): Promise<CUBR> => {
  return apiPatch<CUBR, UserCompanyLogoDTO>(ENDPOINTS.update_company_image(id), data);
};

export const remove_company_image_MasterJobCompany = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.remove_company_image(id));
};

// MasterJobCompany APIs
export const create_MasterJobCompany = async (data: MasterJobCompanyDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterJobCompanyDTO>(ENDPOINTS.create, data);
};

export const find_MasterJobCompany = async (data: MasterJobCompanyQueryDTO): Promise<FBR<MasterJobCompany[]>> => {
  return apiPost<FBR<MasterJobCompany[]>, MasterJobCompanyQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterJobCompany = async (id: string, data: MasterJobCompanyDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterJobCompanyDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobCompany = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobCompany Cache
export const find_cache_MasterJobCompany = async (user_id: string): Promise<FBR<MasterJobCompany[]>> => {
  return apiGet<FBR<MasterJobCompany[]>>(ENDPOINTS.cache(user_id));
};
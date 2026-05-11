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
import { UserResume } from '../../../services/resume/user_resume_service';
import { ResumeEducation } from '../../../services/resume/resume_education_service';
import { ResumeExperience } from '../../../services/resume/resume_experience_service';
import { JobLocationLink } from '../../../services/jobs/job_location_link_service';
import { Event } from '../../../services/events/event_service';
import { UserOrganisation } from '../../../services/users/user_organisation_service';

const URL = 'location';

const ENDPOINTS = {
  // MasterLocation APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterLocation Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterLocation Interface
export interface MasterLocation extends Record<string, unknown> {
  // Primary Field
  location_id: string;

  // Main Field Details
  city_name: string;
  state_name: string;
  country_name: string;

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
  UserResume?: UserResume[];
  ResumeEducation?: ResumeEducation[];
  ResumeExperience?: ResumeExperience[];
  JobLocationLink?: JobLocationLink[];
  Event?: Event[];
  UserOrganisation?: UserOrganisation[];

  // Relations - Child Count
  _count?: {
    UserResume?: number;
    ResumeEducation?: number;
    ResumeExperience?: number;
    JobLocationLink?: number;
    Event?: number;
    UserOrganisation?: number;
  };
}

// MasterLocation Create/Update Schema
export const MasterLocationSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  city_name: stringMandatory('City Name', 2, 100),
  state_name: stringOptional('State Name', 0, 100),
  country_name: stringOptional('Country Name', 0, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterLocationDTO = z.infer<typeof MasterLocationSchema>;

// MasterLocation Query Schema
export const MasterLocationQuerySchema = BaseQuerySchema.extend({
  // Self Table
  location_ids: multi_select_optional('MasterLocation'), // Multi-Selection -> MasterLocation

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterLocationQueryDTO = z.infer<typeof MasterLocationQuerySchema>;

// Convert MasterLocation Data to API Payload
export const toMasterLocationPayload = (row: MasterLocation): MasterLocationDTO => ({
  user_id: row.user_id || '',

  city_name: row.city_name || '',
  state_name: row.state_name || '',
  country_name: row.country_name || '',

  status: row.status || Status.Active,
});

// Create New MasterLocation Payload
export const newMasterLocationPayload = (): MasterLocationDTO => ({
  user_id: '',

  city_name: '',
  state_name: '',
  country_name: '',

  status: Status.Active,
});

// MasterLocation APIs
export const create_MasterLocation = async (data: MasterLocationDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterLocationDTO>(ENDPOINTS.create, data);
};

export const find_MasterLocation = async (data: MasterLocationQueryDTO): Promise<FBR<MasterLocation[]>> => {
  return apiPost<FBR<MasterLocation[]>, MasterLocationQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterLocation = async (id: string, data: MasterLocationDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterLocationDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterLocation = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterLocation Cache
export const find_cache_MasterLocation = async (user_id: string): Promise<FBR<MasterLocation[]>> => {
  return apiGet<FBR<MasterLocation[]>>(ENDPOINTS.cache(user_id));
};
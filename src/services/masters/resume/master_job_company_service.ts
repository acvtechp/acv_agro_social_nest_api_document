// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR, BR, AWSPresignedUrl } from '../../../core/BaseResponse';

import { MasterJobCompanyDTO, MasterJobCompanyLogoDTO, MasterJobCompanyQueryDTO } from 'src/core/ZodSchemas';
import { MasterJobCompany } from 'src/core/Models';

const URL = 'master/resume/job_company';

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

// AWS S3 PRESIGNED
export const get_company_image_presigned_url_MasterJobCompany = async (file_name: string): Promise<BR<AWSPresignedUrl>> => {
  return apiGet<BR<AWSPresignedUrl>>(ENDPOINTS.get_company_image_presigned_url(file_name));
};

// File Uploads
export const update_company_image_MasterJobCompany = async (id: string, data: MasterJobCompanyLogoDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterJobCompanyLogoDTO>(ENDPOINTS.update_company_image(id), data);
};

export const remove_company_image_MasterJobCompany = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.remove_company_image(id));
};

// MasterJobCompany APIs
export const find_MasterJobCompany = async (data: MasterJobCompanyQueryDTO): Promise<FBR<MasterJobCompany[]>> => {
  return apiPost<FBR<MasterJobCompany[]>, MasterJobCompanyQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterJobCompany = async (data: MasterJobCompanyDTO): Promise<CUBR<MasterJobCompany>> => {
  return apiPost<CUBR<MasterJobCompany>, MasterJobCompanyDTO>(ENDPOINTS.create, data);
};

export const update_MasterJobCompany = async (id: string, data: MasterJobCompanyDTO): Promise<CUBR<MasterJobCompany>> => {
  return apiPatch<CUBR<MasterJobCompany>, MasterJobCompanyDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobCompany = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobCompany Cache
export const find_cache_MasterJobCompany = async (user_id: string): Promise<FBR<MasterJobCompany[]>> => {
  return apiGet<FBR<MasterJobCompany[]>>(ENDPOINTS.cache(user_id));
};
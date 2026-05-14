// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterReportReason } from 'src/core/Models';
import { MasterReportReasonDTO, MasterReportReasonQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/social/report_reason';

const ENDPOINTS = {
  // MasterReportReason APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterReportReason Cache
  cache: `${URL}/cache`,
};

// MasterReportReason APIs
export const find_MasterReportReason = async (data: MasterReportReasonQueryDTO): Promise<FBR<MasterReportReason[]>> => {
  return apiPost<FBR<MasterReportReason[]>, MasterReportReasonQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterReportReason = async (data: MasterReportReasonDTO): Promise<CUBR<MasterReportReason>> => {
  return apiPost<CUBR<MasterReportReason>, MasterReportReasonDTO>(ENDPOINTS.create, data);
};

export const update_MasterReportReason = async (id: string, data: MasterReportReasonDTO): Promise<CUBR<MasterReportReason>> => {
  return apiPatch<CUBR<MasterReportReason>, MasterReportReasonDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterReportReason = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterReportReason Cache
export const getCacheMasterReportReason = async (): Promise<FBR<MasterReportReason[]>> => {
  return apiGet<FBR<MasterReportReason[]>>(ENDPOINTS.cache);
};
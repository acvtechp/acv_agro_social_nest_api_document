// Axios
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { SBR, FBR } from '../../core/BaseResponse';

import { StaticPage } from 'src/core/Models';
import { StaticPageQueryDTO, StaticPageDTO } from 'src/core/ZodSchemas';

// URL and Endpoints
const URL = 'website/static_pages';

const ENDPOINTS = {
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// API Methods
export const findStaticPages = async (data: StaticPageQueryDTO): Promise<FBR<StaticPage[]>> => {
  return apiPost<FBR<StaticPage[]>, StaticPageQueryDTO>(ENDPOINTS.find, data);
};

export const createStaticPage = async (data: StaticPageDTO): Promise<SBR> => {
  return apiPost<SBR, StaticPageDTO>(ENDPOINTS.create, data);
};

export const updateStaticPage = async (id: string,data: StaticPageDTO): Promise<SBR> => {
  return apiPatch<SBR, StaticPageDTO>(ENDPOINTS.update(id), data);
};

export const deleteStaticPage = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.delete(id));
};

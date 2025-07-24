/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiResponse<T = any> = {
  Success: boolean;
  Message: string;
  Data: T;
  ErrorCode?: string | null;
  ValidationErrors?: any | null;
  Pagination?: PaginationInfo | null;
};

export type PaginationInfo = {
  CurrentPage: number;
  PageSize: number;
  TotalItems: number;
  TotalPages: number;
};

export type StoreType = {
  Id: string;
  Name_Ar: string;
  Name_En: string;
  IsActive: boolean;
  Icon_path: string;
};

export type StoreTypesResponse = ApiResponse<StoreType[]>;

export type TransformedStoreType = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  hasImage: boolean;
  status: string;
};

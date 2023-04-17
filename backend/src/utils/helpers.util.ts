import { camelCase, generateCode, isValidDate } from 'rebell-utils'
import dayjs from 'dayjs'
import { EErrorCode, EFormat, ECore, EACTION, EErrorMessage, setError } from 'rebell-core';
import dotenv from 'dotenv'

dotenv.config()

export function setUrlRoute(basePath: string, subPath: string): string {
  return `${basePath}${/\/[^/]*.*\.*\//.exec(subPath)![0]}`;
}
export function setSchemaName(name: string): string {
  return camelCase(`${/\/[^\/]*.#*\.*\//.exec(name)![0]}`).replace(/[.*+?^${}()\/]/g, '');
}

export function getPagination(page: number, size: number): { limit: number; offset: number} {
  const limit = size ? +size : 1;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

// eslint-disable-next-line max-len
export function getPagingData(data: { count: number; rows: any }, page: number, limit: number): { totalItems: number; items: any; totalPages: number; currentPage: number }{
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
}

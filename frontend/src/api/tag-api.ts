import { Tag } from '../domain/tag';
import { api } from './api';

const uri = 'tags';

export const fetchCategories = async (): Promise<Tag[]> => {
  const result = await api.get<Tag[]>(`${uri}/categories`);
  return result.data;
};

export const fetchTags = async (): Promise<Tag[]> => {
  const result = await api.get<Tag[]>(uri);
  return result.data;
};

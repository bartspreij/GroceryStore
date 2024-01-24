import axios from 'axios';
import { Tag } from '../domain/tag';

const uri = 'http://localhost:8080/api/v1/tags';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategories = async (): Promise<Tag[]> => {
    const result = await axios.get<Tag[]>(`${uri}/categories`);
    return result.data;
};

export const fetchTags = async (): Promise<Tag[]> => {
    const result = await axios.get<Tag[]>(uri);
    return result.data;
};

import axios from 'axios';
import { Tag } from '../domain/tag';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategories = async (): Promise<Tag[]> => {
    const result = await axios.get<Tag[]>(
        'http://localhost:8080/api/v1/tags/categories'
    );
    return result.data;
};

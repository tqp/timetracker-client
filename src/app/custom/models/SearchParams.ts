import {SearchFilters} from './SearchFilters';

export interface SearchParams {
    pageIndex?: number;
    pageSize?: number;
    filters?: SearchFilters;
}

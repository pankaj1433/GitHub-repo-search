import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { OctokitService } from '../services/OctokitService';
import { debounce } from '../utils/debounce';
import { SearchResponse } from '../types/gitRepository';

export interface SearchContextType {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchResults: SearchResponse | null;
    searchRepositories: (query: string, page?: number, per_page?: number) => void;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    perPage: number;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

const octokitService = OctokitService.getInstance();

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);

    const searchRepositories = useCallback(
        debounce(async (query: string, page: number = 1, per_page: number = 10) => {
            try {
                const data = await octokitService.searchRepositories(query, page, per_page);
                setSearchResults(data);
            } catch (error) {
                console.error("Error searching repositories:", error);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (query) {
            searchRepositories(query, page, perPage);
        }
    }, [query, page, perPage]);

    return (
        <SearchContext.Provider value={{ query, setQuery, searchResults, searchRepositories, page, setPage, perPage, setPerPage }}>
            {children}
        </SearchContext.Provider>
    );
};

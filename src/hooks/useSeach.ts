import { useContext } from 'react';
import {SearchContext, SearchContextType} from '../context/SearchContext';

const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

export default useSearch;

import { useQuery } from "@tanstack/react-query"
import {getNotes} from '../api/api';

export const useNotes = () => {

    const query = useQuery({
        queryFn: getNotes,
        queryKey: ['notes-list'],
    })

    return query;

}
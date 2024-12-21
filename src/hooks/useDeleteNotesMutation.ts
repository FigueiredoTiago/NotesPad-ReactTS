import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
//import { deleteNote } from '../api/api';

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:3000/texts/deletelist/${id}`);
};

export const useDeleteNotesMutation = () => {
  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes-list"]);
    },
  });

  return deleteMutate;
};

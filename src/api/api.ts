import axios from "axios";

interface NotesResponse {
  data: Note[];
}

interface Note {
  id: number;
  text: string;
}

//funcao get com axios para pegar todas as notas da api

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get<NotesResponse>(
    "http://localhost:3000/texts/list"
  );
  return response.data.data;
};

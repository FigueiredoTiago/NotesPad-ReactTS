import axios from "axios";

interface NotesResponse {
  data: Note[];
}

interface Note {
  id: number;
  title: string;
  text: string;
}

//funcao get com axios para pegar todas as notas da api

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get<NotesResponse>(
    "http://localhost:3000/texts/list"
  );
  return response.data.data;
};

//funcao para deletar uma nota da api o Id vem pelo Body da requisicao

export const deleteNote = async (id: number): Promise<void> => {
  confirm("Deseja realmente deletar essa nota?");

  if (!confirm) {
    return;
  }
  await axios.delete(`http://localhost:3000/texts/deletelist/${id}`);
};

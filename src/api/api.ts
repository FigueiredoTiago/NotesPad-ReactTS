import axios from "axios";

const apiUrl =  import.meta.env.VITE_API_URL;

interface NotesResponse {
  data: Note[];
}

interface Note {
  createdAt: string;
  id: number;
  title: string;
  text: string;
}

interface NoteCreate {
  title: string;
  text: string;
}

//funcao get com axios para pegar todas as notas da api

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get<NotesResponse>(
    `${apiUrl}/note/list`
  );
  return response.data.data;
};

//funcao para deletar uma nota da api o Id vem pelo Body da requisicao

export const deleteNote = async (id: number): Promise<void> => {
  confirm("Deseja realmente deletar essa nota?");

  if (!confirm) {
    return;
  }
  await axios.delete(`${apiUrl}/note/deletenote/${id}`);
};

//funcao para criar uma nova nota na api

export const createNote = async (note: NoteCreate): Promise<void> => {
  await axios.post(`${apiUrl}/note/create`, note);
};



//funcao para editar uma nota na api 

export const editNote = async (id: number, note: NoteCreate): Promise<void> => {
  await axios.patch(`${apiUrl}/note/updatenote/${id}`, note);
}
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

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

export const getNotes = async (token: string): Promise<Note[]> => {
  const response = await axios.get<NotesResponse>(`${apiUrl}/note/list`, {
    headers: {
      Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
    },
  });
  return response.data.data;
};

//funcao para deletar uma nota da api o Id vem pelo Body da requisicao

export const deleteNote = async (id: number, token: string): Promise<void> => {
  confirm("Deseja realmente deletar essa nota?");

  if (!confirm) {
    return;
  }
  await axios.delete(`${apiUrl}/note/deletenote/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//funcao para criar uma nova nota na api

export const createNote = async (
  note: NoteCreate,
  token: string
): Promise<void> => {
  await axios.post(`${apiUrl}/note/create`, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//funcao para editar uma nota na api

export const editNote = async (
  id: number,
  note: NoteCreate,
  token: string
): Promise<void> => {
  await axios.patch(`${apiUrl}/note/updatenote/${id}`, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//funcao para fazer login na api

export const login = async (
  nick: string,
  password: string
): Promise<{ token: string; nick: string }> => {
  const response = await axios.post(`${apiUrl}/user/login`, {
    nick,
    password,
  });
  return {
    token: response.data.token,
    nick: response.data.nick,
  };
};

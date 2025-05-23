import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL;

interface NotesResponse {
  data: Note[];
}

interface Note {
  createdAt: string;
  id: number;
  title: string;
  text: string;
  favorite?: boolean;
}

interface NoteCreate {
  title: string;
  text: string;
}

//cliente Axios para interceptar as Requisicoes e adicionar o token no cabeçalho automaticamente

const apiClient = axios.create({
  baseURL: apiUrl, // Altere para a URL da sua API
  timeout: 10000, // Tempo limite para as requisições
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador de requisição para token JWT.
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//funcao para Teste da API

export const testApi = async (): Promise<string> => {
  const response = await apiClient.get("/");
  return response.data;
};

//funcao get com axios para pegar todas as notas da api

export const getNotes = async (): Promise<Note[]> => {
  const response = await apiClient.get<NotesResponse>("/note/list");
  return response.data.data;
};

//funcao para Buscar uma Nota Pelo Titulo:

export const getNoteByTitle = async (title: string): Promise<Note[]> => {
  const reponse = await apiClient.get<NotesResponse>(
    `${apiUrl}/note/searchnote?title=${title}`
  );
  return reponse.data.data;
};

//funcao para deletar uma nota da api o Id vem pelo Body da requisicao
export const deleteNote = async (id: number): Promise<void> => {
  confirm("Deseja realmente deletar essa nota?");

  if (!confirm) {
    return;
  }
  await apiClient.delete(`/note/deletenote/${id}`);
};

//funcao para criar uma nova nota na api
export const createNote = async (note: NoteCreate): Promise<void> => {
  await apiClient.post(`${apiUrl}/note/create`, note);
};

//funcao para editar uma nota na api
export const editNote = async (id: number, note: NoteCreate): Promise<void> => {
  await apiClient.patch(`${apiUrl}/note/updatenote/${id}`, note);
};

//funcao para fazer login na api

export const login = async (
  nick: string,
  password: string
): Promise<{ token: string; nick: string }> => {
  const response = await apiClient.post("/user/login", {
    nick,
    password,
  });
  return {
    token: response.data.token,
    nick: response.data.nick,
  };
};

//funcao para registrar um novo usuario na api
export const registerUser = async (
  nick: string,
  password: string
): Promise<void> => {
  const response = await apiClient.post("/user/create", {
    nick,
    password,
  });

  return response.data;
};

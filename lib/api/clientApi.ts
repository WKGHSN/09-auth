import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note, NoteTag } from "@/types/note";

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface SessionOk {
  success: boolean;
}

export interface UpdateUser {
  username: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export type FetchNotesResponse = {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalNotes?: number;
  tag?: NoteTag;
};

type FetchNotesParams = {
  search?: string;
  page?: number;
  tag?: NoteTag;
};


export async function register(data: AuthData) {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: AuthData) {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
}

export async function checkSession() {
  const response = await nextServer.get<SessionOk>("/auth/session");
  return response.data.success;
}

export async function checkMe() {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}

export async function logout(): Promise<void> {
  const response = await nextServer.post("/auth/logout");
  return response.data;
}

export async function updateMe(body: UpdateUser) {
  const response = await nextServer.patch<User>("/users/me", body);
  return response.data;
}


export async function fetchNotes({
  search = "",
  page = 1,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  try {
    const perPage = 12;
    const response = await nextServer.get<FetchNotesResponse>("/notes", {
      params: {
        search: search || undefined,
        page,
        perPage,
        tag: tag || undefined,
      },
    });

    
    return {
      ...response.data,
      page,
      perPage,
      tag,
    };
  } catch {
    throw new Error("Fetch notes failed");
  }
}


export async function createNote(value: FormValues): Promise<Note> {
  try {
    const response = await nextServer.post<Note>("/notes", value);
    return response.data;
  } catch {
    throw new Error("Create task failed");
  }
}

export async function deleteNote(noteId: string) {
  try {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`);
    return response.data;
  } catch {
    throw new Error("Delete task failed");
  }
}

export async function fetchNoteById(noteId: string) {
  try {
    const response = await nextServer.get<Note>(`/notes/${noteId}`);
    return response.data;
  } catch {
    throw new Error("Could not fetch note details.");
  }
}

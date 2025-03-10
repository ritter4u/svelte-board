export interface Board {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardInput {
  title: string;
  content: string;
  author: string;
}

export interface UpdateBoardInput extends Partial<CreateBoardInput> {
  id: string;
} 
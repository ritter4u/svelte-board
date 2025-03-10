import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Board, CreateBoardInput } from '$lib/types/board';

// 임시 데이터 저장소
let boards: Board[] = [];

export const GET: RequestHandler = async () => {
  return json(boards);
};

export const POST: RequestHandler = async ({ request }) => {
  const input: CreateBoardInput = await request.json();
  const newBoard: Board = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  boards.push(newBoard);
  return json(newBoard, { status: 201 });
}; 
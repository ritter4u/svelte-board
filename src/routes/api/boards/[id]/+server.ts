import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Board, UpdateBoardInput } from '$lib/types/board';

// 임시 데이터 저장소 (실제로는 위의 boards 배열을 import 해야 합니다)
let boards: Board[] = [];

export const GET: RequestHandler = async ({ params }) => {
  const board = boards.find(b => b.id === params.id);
  if (!board) {
    return new Response('Not Found', { status: 404 });
  }
  return json(board);
};

export const PUT: RequestHandler = async ({ params, request }) => {
  const input: UpdateBoardInput = await request.json();
  const index = boards.findIndex(b => b.id === params.id);
  
  if (index === -1) {
    return new Response('Not Found', { status: 404 });
  }

  boards[index] = {
    ...boards[index],
    ...input,
    updatedAt: new Date().toISOString()
  };

  return json(boards[index]);
};

export const DELETE: RequestHandler = async ({ params }) => {
  const index = boards.findIndex(b => b.id === params.id);
  
  if (index === -1) {
    return new Response('Not Found', { status: 404 });
  }

  boards.splice(index, 1);
  return new Response(null, { status: 204 });
}; 
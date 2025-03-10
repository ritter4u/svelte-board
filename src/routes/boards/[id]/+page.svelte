<script lang="ts">
  import { page } from '$app/stores';
  import type { Board } from '$lib/types/board';
  import { onMount } from 'svelte';

  let board: Board | null = null;
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch(`/api/boards/${$page.params.id}`);
      if (!response.ok) throw new Error('게시글을 불러오는데 실패했습니다.');
      board = await response.json();
    } catch (e) {
      error = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
    } finally {
      loading = false;
    }
  });
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if loading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    {:else if error}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      </div>
    {:else if board}
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{board.title}</h1>
              <div class="mt-1 flex items-center text-sm text-gray-500">
                <span>{board.author}</span>
                <span class="mx-2">•</span>
                <span>작성일: {new Date(board.createdAt).toLocaleDateString()}</span>
                <span class="mx-2">•</span>
                <span>수정일: {new Date(board.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <a 
                href="/boards" 
                class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                목록
              </a>
              <a 
                href="/boards/{board.id}/edit" 
                class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                수정
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="px-4 py-5 sm:px-6">
            <div class="prose max-w-none">
              {board.content}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div> 
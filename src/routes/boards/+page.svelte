<script lang="ts">
  import type { Board } from '$lib/types/board';
  import { onMount } from 'svelte';

  let boards: Board[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/boards');
      if (!response.ok) throw new Error('게시판 목록을 불러오는데 실패했습니다.');
      boards = await response.json();
    } catch (e) {
      error = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
    } finally {
      loading = false;
    }
  });

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('삭제에 실패했습니다.');
      
      boards = boards.filter(board => board.id !== id);
    } catch (e) {
      error = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">게시판</h1>
      <a 
        href="/boards/new" 
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        새 글 작성
      </a>
    </div>

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
    {:else}
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          {#each boards as board}
            <li class="hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <h2 class="text-lg font-medium text-indigo-600 truncate">
                      {board.title}
                    </h2>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <span class="truncate">{board.author}</span>
                      <span class="mx-2">•</span>
                      <span>{new Date(board.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0 flex space-x-2">
                    <a 
                      href="/boards/{board.id}" 
                      class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      보기
                    </a>
                    <a 
                      href="/boards/{board.id}/edit" 
                      class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      수정
                    </a>
                    <button 
                      on:click={() => handleDelete(board.id)}
                      class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm text-gray-600 line-clamp-2">{board.content}</p>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div> 
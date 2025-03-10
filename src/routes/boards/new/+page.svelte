<script lang="ts">
  import { goto } from '$app/navigation';
  import type { CreateBoardInput } from '$lib/types/board';

  let title = '';
  let content = '';
  let author = '';
  let error: string | null = null;

  async function handleSubmit() {
    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          author
        } as CreateBoardInput)
      });

      if (!response.ok) throw new Error('게시글 작성에 실패했습니다.');

      await goto('/boards');
    } catch (e) {
      error = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="md:flex md:items-center md:justify-between mb-8">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold text-gray-900">새 게시글 작성</h1>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <a 
          href="/boards" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          목록으로
        </a>
      </div>
    </div>

    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">제목</label>
            <div class="mt-1">
              <input
                type="text"
                id="title"
                bind:value={title}
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label for="author" class="block text-sm font-medium text-gray-700">작성자</label>
            <div class="mt-1">
              <input
                type="text"
                id="author"
                bind:value={author}
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">내용</label>
            <div class="mt-1">
              <textarea
                id="content"
                bind:value={content}
                rows="10"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
          </div>

          {#if error}
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
          {/if}

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              작성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div> 
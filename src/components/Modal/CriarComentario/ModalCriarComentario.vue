<template>
  <div class="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center" style="background-color: rgba(0, 0, 0, 0.2);">
    <div class="absolute top-0 left-0 w-full h-full z-60 flex justify-center items-center">
      <div class="">
        <div class="bg-white fixed top-0 left-36 w-1/4 p-6 rounded-lg shadow-lg" style="margin-top: 25rem; margin-left: 2rem;">
          <a @click="$emit('hideModal')" class="absolute top-0 ml-64 pl-10 mt-2 text-gray-400 hover:text-black font-medium">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </a>
          <label class="block font-medium text-gray-700 mb-2" for="comment">Insira um comentário</label>
          <textarea class="form-textarea block w-full rounded shadow-sm ring-offset-2 ring-2 ring-[#dbdbdb] outline-none" 
          id="comment" name="comment" rows="4"></textarea>
          <button class="mt-2 py-1 px-2 bg-blue-500 text-white font-semibold rounded shadow-md 
              hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-opacity-50"
              @click="$emit('hideModal')">
            Criar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<script>
export default {
  name: "ModalCriarComentario",
  emits: ['hideModal']
}
</script>
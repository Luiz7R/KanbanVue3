<template>
  <div>
      <div class="w-96 bg-white ml-11 pb-11 overflow-y-auto" v-if="showModalCriarComentario">
        <ModalCriarComentario @hideModal="showModalCriarComentario = false" />
      </div>
      <div class="fixed z-10 top-0 left-0 right-0 pl-20 " style="background-color: rgba(0, 0, 0, 0.5);">
          <div class="grid sm:grid-cols-1 sm:gap-sm-s md:grid-cols-3 lg:grid-cols-3 max-w-full pl-11">
            <div class="border-r border-gray-200 bg-white w-[100%] md:pb-20">
                <div class="startup-info overflow-y-scroll w-full" style="height: 90vh;">
                  <div class="startup h-4/12 border-r border-gray-200">
                    <div class="startup-info p-4">
                      <h3 class="text-3xl from-neutral-800">
                        {{  application.startup.name }}
                      </h3>
                      <div class="rating-container">
                        <div class="relative">
                          <span class="rating absolute -top-10 ml-80" style="border: 3px solid #882988;">
                          <div class="">
                            <p class="pl-0.5 text-[#b63cb6] text-lg font-medium" style="padding-top: 4.2rem;">
                                {{  application.score }}
                            </p>
                            <font-awesome-icon class="mb-14 pb-3 text-[#882988]" :icon="['fas', 'star']" style="margin-left: 0.4rem;" />
                          </div>
                        </span>
                        <span class="inline text-md font-semibold text-[#969393]">
                          {{  application.challenge.name }}
                        </span>
                        </div>
                      </div>
                    </div>
                    <div class="category">
                        <div class="inline w-1/2 ml-4 mr-2 pl-0.5 pr-0.5 pb-0.5 bg-[#841088] rounded-md text-sm text-white">Estágio</div>
                        <div class="inline pl-0.5 pr-0.5 pb-0.5 bg-[#1ba583] rounded-md text-sm text-white">Modelo de Negócio</div>
                    </div>
                    <div class="responsavel p-4 text-[#6b7280] text-sm">
                        Responsável
                        <p class="inline pl-40">
                            <span v-if="toggleAssignee">
                                <font-awesome-icon class="mr-1" :icon="['fas', 'circle']" style="color: #E83E8C;" size="xl"/>
                                <span class="cursor-default">{{  application.assignee.name }}</span>
                                <a href="#" @click="toggleAssignee = false">
                                  <font-awesome-icon class="pl-1" :icon="['fas', 'circle-xmark']" />
                                </a>
                            </span>
                            <a href="#" @click="toggleAssignee = true">
                                <span v-if="!toggleAssignee">
                                  <font-awesome-icon class="" :icon="['fas', 'user']" />
                                  <span class="pl-1 text-[#9a9da3]">{{  "No assignee" }}</span>
                                </span>
                            </a>
                        </p>
                    </div>
                    <div class="prazof p-4 pl-4 text-[#6b7280] text-sm">
                        Prazo Final
                        <p class="inline" style="padding-left: 10.5rem;">
                          
                              <span v-if="toggleDueDate">
                                <font-awesome-icon :icon="['far', 'calendar-days']" style="color: #2d2e2f;" />
                                <span class="pl-1 cursor-default">{{  application.due_date }}</span>
                                <a href="#" @click="toggleDueDate = !toggleDueDate">
                                  <font-awesome-icon class="pl-1" :icon="['fas', 'circle-xmark']" />
                                </a>
                              </span>
                              <a href="#" @click="toggleDueDate = true">
                                <span v-if="!toggleDueDate">
                                  <font-awesome-icon :icon="['far', 'calendar-days']" style="color: #2d2e2f;" />
                                  <span class="pl-1 text-[#9a9da3]">{{ "No due date" }}</span>
                                </span>
                              </a>
                        </p>
                    </div>
                    <div class="anexos p-4 pl-4 text-[#6b7280] text-sm">
                          Anexos
                      <div v-for="attachments in application.attachments" :key="attachments.id">
                          <div class="pb-2">
                            <p class="inline" style="padding-left: 15rem;">
                              <font-awesome-icon :icon="['far', 'file-lines']" />
                              {{ attachments.filename }}
                            </p>
                          </div>
                      </div>
                      <p class="pt-5 pb-5 text-[#65cccf]" style="padding-left: 14.9rem;">
                        <font-awesome-icon :icon="['fas', 'plus']" /> 
                        Novo arquivo
                      </p>
                    </div>
                    <div class="border-t w-full border-gray-200"></div>
                  </div>
                  <div class="comments border-r border-gray-200"> 
                    <div dir="rtl" class="pr-2">
                          <p class="inline text-sm cursor-default text-[#65cccf]" style="padding-left: 8rem;">
                            <font-awesome-icon :icon="['fas', 'plus']" /> 
                            Novo Comentário
                          </p>
                    </div>
                    
                    <div v-for="comment in application.comments" :key="comment.id">
                      <div class="comment">
                        <div class="p-2 pl-5">
                          <h1 class="font-bold pb-2">
                            <font-awesome-icon class="mr-1" :icon="['fas', 'circle']" style="color: #fc2d8e;" size="xl"/>
                            {{ comment.author.name }}
                            <span v-if="comment.author.updateComment" class="inline text-gray-800 font-normal">(editado)</span>
                          </h1>
                          <div class="relative">
                              <div class="" style="margin-top: -2rem; margin-left: 22rem;">
                                  <a @click="dropdown = true" class="text-gray-400 hover:text-black font-medium">
                                    <font-awesome-icon :icon="['fas', 'ellipsis']" />
                                  </a>
                              </div>
                              <div v-if="dropdown" class="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center" style="background-color: rgba(0, 0, 0, 0.1);">
                                <div class="absolute top-0 left-0 w-full h-full z-60 flex justify-center items-center">
                                  <div class="">
                                    <div class="fixed top-2 w-1/4" style="margin-top: 27rem; padding-top: 1rem; margin-left: -10rem;">
                                        <div id="dropdown" class="z-10 fixed top-2 bg-slate-300 divide-y 
                                        divide-gray-800 rounded-lg shadow w-44 dark:bg-gray-700" style="margin-top: 25rem;">
                                          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li>
                                              <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600
                                              dark:hover:text-white" @click="showEditInput(comment.author.id)">
                                              <font-awesome-icon class="pl-1" :icon="['fas', 'pen']"/>
                                              Editar comentário
                                              </a>
                                            </li>
                                            <li>
                                              <a class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="deleteComment(comment)">
                                                <font-awesome-icon :icon="['far', 'trash-can']" />
                                                Deletar comentário
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                          <p class="text-sm pl-8">
                            <span v-if="activeItemId !== comment.author.id" >{{ comment.author.comment }}</span>
                            <span class="" v-else>
                              <textarea type="text" class="text-md w-80 bg-slate-200 px-1 py-1 pl-2 pb-1 ring-current shadow-md
                              text-zinc-700 font-medium mb-2 rounded outline-none"
                              @keypress.enter="activeItemId = null" v-model="comment.author.comment" ref="input" />
                            </span>
                          </p>
                        </div>
                        <div class="border-t w-full border-gray-200"></div>
                      </div>
                    </div>
                    <div class="comment">
                      <div class="p-2 pl-5">
                          <h1 class="font-bold pb-2">
                            <font-awesome-icon class="mr-1" :icon="['fas', 'circle']" style="color: #fc2d8e;" size="xl"/>
                            <span class="pl-10">Insira um novo comentário</span>
                          </h1>
                      </div>
                      <div class="ml-16">
                        <input type="text" v-model="novoComentario" class="border border-gray-300 focus:border-blue-500 focus:ring-2 w-[300px]
                        focus:ring-blue-500 focus:ring-opacity-40 rounded  px-3 py-1 text-lg text-gray-800 placeholder-gray-400
                          outline-none" 
                        placeholder="Insira um comentário" @keypress.enter="newComment()">
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="border-r border-gray-200 bg-white w-[100%]">
              <div class="startup-info overflow-y-scroll w-full" style="height: 90vh;">
                <div class="startup h-4/12 border-r border-gray-200">
                    <div class="startup-info p-4">
                        <h1 class="text-2xl font-semibold">
                            Tarefas por Seção
                        </h1>
                    </div>
                    <div class="border-t w-full border-gray-200"></div>
                </div>
                <KanbanSection :data="sectionsData" />
              </div>
            </div>
            <div class="border-r border-gray-200 bg-white w-[60%]">
              <button class="text-black pl-56" @click="$emit('hideModal')">
                <font-awesome-icon :icon="['fas', 'xmark']" />
              </button>
              <div class="move-on-sections overflow-y-scroll w-full" style="height: 90vh;">
                <div class="move h-4/12 border-r border-gray-200">
                  <div class="section-header p-4">
                      <h2 class="text-1xl mt-10 font-semibold">
                          Mover para a seção
                      </h2>
                  </div>
                  <div class="section-select w-full">
                    <div class="section ml-2 mb-2">
                      <select class="w-[90%] border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 rounded px-3 py-2 text-md font-normal text-gray-800 outline-none" 
                          name="desafio" id="desafio" placeholder="Avaliacao"
                        >
                          <option value="" selected>Quarta Seção</option>
                        </select>
                    </div>  
                    <div class="section ml-2 mb-2">
                        <select class="w-[90%] border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 rounded px-3 py-2 text-md font-normal text-gray-800 outline-none" 
                          name="desafio" id="desafio" placeholder="Avaliacao"
                        >
                          <option value="" selected>Quinta Seção</option>
                        </select>
                    </div> 
                  </div>
                  <div class="w-full">
                    <div class="border-t w-[86%] ml-2.5 pb-2 border-gray-200"></div>
                  </div>
                  <div class="section-select w-full">
                    <div class="section ml-2 mb-2">
                      <select class="w-[90%] border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 rounded px-3 py-2 text-md font-normal text-gray-800 outline-none" 
                          name="desafio" id="desafio" placeholder="Avaliacao"
                        >
                          <option value="" selected>Primeira Seção</option>
                        </select>
                    </div>  
                    <div class="section ml-2 mb-2">
                        <select class="w-[90%] border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 rounded px-3 py-2 text-md font-normal text-gray-800 outline-none" 
                          name="desafio" id="desafio" placeholder="Avaliacao"
                        >
                          <option value="" selected>Segunda Seção</option>
                        </select>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
  
  <script setup>
      import { ref, computed } from 'vue';
      import ModalCriarComentario from '@/components/Modal/CriarComentario/ModalCriarComentario.vue';
      import KanbanSection from '@/components/Kanban/Section/KanbanSection.vue';

      const props  = defineProps({
          title: {
            type: String,
            default: 'No Title Specified'
          },
          application: {
            required: true
          },
          dropdown: {
            type: Boolean
          },
          todoDropdown: {
            type: Boolean
          },
          components: {
            ModalCriarComentario,
            KanbanSection
          }
      })

      const showModalCriarComentario = ref(false);

      const toggleAssignee = ref(false);
      const toggleDueDate = ref(false);
      const dropdown = ref(props.dropdown);
      const emit = defineEmits(['hideModal'])
      const novoComentario = ref('');
      const activeItemId = ref(null)

      function newComment() {
          if ( novoComentario.value != '' )
          {
            let commentData = [{
              id: 1,
              author: {
                id: '1',
                email: 'usuario1@empresa.com',
                name: 'Usuário 1',
                comment: novoComentario.value
              }
            }];
            props.application.comments.push(commentData[0])
          }
      }

      function deleteComment(comment)
      {
          const index = props.application.comments.findIndex(item => item.id === comment.id);
          if (index !== -1) {
            props.application.comments.splice(index, 1);
          }
          dropdown.value = false
      }

      function showEditInput(commentId) 
      {
          dropdown.value = false;
          activeItemId.value = commentId;
      }

      const sections = [
            {"sectionTitle": "Primeira Seção", "tasks": []},
            {"sectionTitle": "Segunda Seção", "tasks": ["Tarefa","Tarefa","Tarefa"]},
            {"sectionTitle": "Terceira Seção", "tasks": ["Tarefa"]},
            {"sectionTitle": "Quarta Seção", "tasks": ["Tarefa","Tarefa"]},
            {"sectionTitle": "Quinta Seção", "tasks": []},
          ]
      
      const sectionsData = computed(() => sections.map(section => ({ task: section })));
  </script>

  <style scoped>
.rating-container {
    display: inline-flex;
    align-items: center;
  }
  .rating {
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: #fff;
    color: white;
    font-size: 12px;
    font-weight: bold;
  }
  .rating-icon {
    position: relative;
    margin-top: 5px;
    color: #6e226e;
  }
  .rating-icon svg {
    height: 20px;
  }
  .rating-border {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #6e226e;
    z-index: -1;
  }

  .gap-sm-s {
      gap: 2rem;
  }
  </style>
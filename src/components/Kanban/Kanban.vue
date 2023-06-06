<script>
import { reactive, computed, watchEffect, ref } from 'vue';
import Draggable from 'vuedraggable'
import CardKanban from './CardKanban/CardKanban.vue';


export default {
    name: 'Kanban',
    props: {
      jsonContents: {
        type: Object
      },
      contents: {
        type: Object
      },
      isInputVisible: {
        type: Boolean,
        default: false
      },
      editSection: {
        type: Boolean,
        default: false
      },
      editSections: {
        type: Object
      },
      contents: {
        type: Array
      },
      filteredStartups: {
        type: Array
      },
      filtered: {
        type: Array
      }

    },
    setup(props) {

      const states = reactive({
          contents: [],
          filtered: [],
      });

      const contents = computed(() => states.contents);
      const filtered = computed(() => states.filtered);

      const activeItemId = ref(null)
      const newSectionTitle = ref(null);
      const deleteKanbanList = ref(false);
      const showModalDelete = ref(false);
      const currentItem = ref(null);

      const showNewSection = { "id": "newSection", "name": "Nova Seção" };
 
      const contentsToShow = computed(() => {
          if ( filtered.value.length ) 
              return filtered.value.filter(item => item.id !== 'newSection');
          return contents.value.filter(item => item.id !== 'newSection');
      })

      function getStartupContents() 
      {
          fetch('../../data.json')
            .then(response => response.json())
            .then(data => {
              parsedDates(data)
              states.contents = data;

              const newSectionExists = states.contents.some(item => item.id == 'newSection');

              if (!newSectionExists) {
                addContent({ id: 'newSection', name: 'Nova Seção' });
              }
              
            })
            .catch(error => {
                  console.error('Error loading json file:', error);
            });
      }

      function filterContents()
      {
        states.filtered = props.filteredStartups;
      }

      function parsedDates(obj) {
        for ( const key in obj )
        {
            if ( typeof obj[key] != undefined && typeof obj[key] === 'string' && obj[key].startsWith('new Date(') )
            {
              obj[key] = eval(obj[key])
              let options = { month: 'short', day: 'numeric' };
              let dataFormatada = eval(obj[key]).toLocaleDateString('en-US', options);
              obj[key] = dataFormatada;
            }
            else if ( typeof obj[key] === 'object' && obj[key] !== null ) 
            {
              parseDates(obj[key]);
            }
        }
      }

      function parseDates(obj) 
      {
          for ( const key in obj )
          {
            if ( typeof obj[key] === 'string' && obj[key].startsWith('new Date(') )
            {
              obj[key] = eval(obj[key])
              let options = { month: 'short', day: 'numeric' };
              let dataFormatada = eval(obj[key]).toLocaleDateString('en-US', options);
              obj[key] = dataFormatada;
            }
            else if ( typeof obj[key] === 'object' && obj[key] !== null ) 
            {
              parseDates(obj[key]);
            }
          }
      }

      getStartupContents()

      watchEffect(() => {
        filterContents();
      });

      function editSection(id)
      {
          activeItemId.value = id;
      }

      function newSection(id)
      {
        activeItemId.value = id;
      }

      function addContent(content) {
        states.contents.push(content);
      }


      function disableEdit(id)
      {
          activeItemId.value = null;
      }

      function deleteList()
      {
          showModalDelete.value = false;

          const index = states.contents.findIndex(item => item.id === currentItem.value.id);
          if (index !== -1) {
            states.contents.splice(index, 1);
          }
      }

      function openModal(list)
      {
        showModalDelete.value = true;
        currentItem.value = list;
      }

      function disableInputNewSection()
      {
        addContent({ id: 6, name: newSectionTitle.value, applications: [
            {
              "id": 1,
              "startup": { "id": 1, "name": "Startup K" },
              "challenge": { "id": 1, "name": "Desafio K" },
              "score": 4.1,
              "assignee": {
                "id": 1,
                "email": "usuario4@empresa.com",
                "name": "Usuário 4"
              },
              "comments": [
                  {
                    "id": 1,
                    "author": {
                      "id": "1",
                      "email": "usuario1@empresa.com",
                      "name": "Usuário 1",
                      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,In accumsan hendrerit efficitur.Phasellus fermentum diam sit amet viverra accumsan"
                    }
                  },
              ],
              "due_date": "Fev 2",
              "attachments": [
                {
                  "id": "1",
                  "filename": "Exemplo.jpg",
                  "full_path": "pasta/arquivo/3dfb8a9c83.jpg"
                },
                {
                    "id": "2",
                    "filename": "Arquivo.jpg",
                    "full_path": "pasta/arquivo/3dfb7e5q9c83.jpg"
                  }
              ],
              "tasks": [
                  {
                    "id": 1,
                    "name": "Tarefa 1",
                    "due_date": "new Date(2023, 2, 1)",
                    "assignee": {
                      "id": 2,
                      "email": "usuario2@empresa.com",
                      "name": "Usuário 2"
                    },
                    "status": "todo",
                    "section": { "id": 1, "name": "Primeira Etapa" }
                  },
                  {
                    "id": 2,
                    "name": "Tarefa 2",
                    "due_date": "new Date(2023, 2, 8)",
                    "assignee": {
                      "id": 1,
                      "email": "usuario1@empresa.com",
                      "name": "Usuário 1"
                    },
                    "status": "doing",
                    "section": { "id": 2, "name": "Segunda Etapa" }
                  }
              ]
            },
            {
              "id": 2,
              "startup": { "id": 1, "name": "Startup L" },
              "challenge": { "id": 1, "name": "Desafio L" },
              "score": 4.1,
              "assignee": {
                "id": 1,
                "email": "usuario4@empresa.com",
                "name": "Usuário 4"
              },
              "comments": [
                  {
                    "id": 1,
                    "author": {
                      "id": "1",
                      "email": "usuario1@empresa.com",
                      "name": "Usuário 1",
                      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,In accumsan hendrerit efficitur.Phasellus fermentum diam sit amet viverra accumsan"
                    }
                  },
              ],
              "due_date": "Fev 2",
              "attachments": [
                {
                  "id": "1",
                  "filename": "Exemplo.jpg",
                  "full_path": "pasta/arquivo/3dfb8a9c83.jpg"
                },
                {
                    "id": "2",
                    "filename": "Arquivo.jpg",
                    "full_path": "pasta/arquivo/3dfb7e5q9c83.jpg"
                  }
              ],
              "tasks": [
                  {
                    "id": 1,
                    "name": "Tarefa 1",
                    "due_date": "new Date(2023, 2, 1)",
                    "assignee": {
                      "id": 2,
                      "email": "usuario2@empresa.com",
                      "name": "Usuário 2"
                    },
                    "status": "todo",
                    "section": { "id": 1, "name": "Primeira Etapa" }
                  },
                  {
                    "id": 2,
                    "name": "Tarefa 2",
                    "due_date": "new Date(2023, 2, 8)",
                    "assignee": {
                      "id": 1,
                      "email": "usuario1@empresa.com",
                      "name": "Usuário 1"
                    },
                    "status": "doing",
                    "section": { "id": 2, "name": "Segunda Etapa" }
                  }
              ]
            },
        ]});
        activeItemId.value = null;
      }

      function gridTotalLists()
      {
        return 'md:grid-cols-' + states.contents.length + ' lg:grid-cols-' + states.contents.length;
      }

      return {
        contents,
        filtered,
        contentsToShow,
        activeItemId,
        editSection,
        newSection,
        newSectionTitle,
        showNewSection,
        showModalDelete,
        deleteList,
        disableEdit,
        disableInputNewSection,
        openModal
      }
    },
    components: {
      CardKanban,
      Draggable
    },

}

</script>

<template>

<div class="grid sm:grid-cols-1 gap-sm-s md:gap-80 lg:gap-80 -mr-20 md:grid-cols-5 lg:grid-cols-5"><!-- :class="[gridTotalLists()]"-->
    <div v-if="showModalDelete" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 
    justify-center items-center w-full md:inset-0 h-modal md:h-full ml-96">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative p-4 text-center bg-gray-200 shadow-xl rounded-lg dark:bg-gray-800 sm:p-5">
                <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <p class="mb-4 text-gray-500 dark:text-gray-300">Tem certeza que Deseja deletar essa Lista?</p>
                <div class="flex justify-center items-center space-x-4">
                    <button data-modal-toggle="deleteModal" @click="showModalDelete = !showModalDelete" type="button" class="py-2 px-3 text-sm font-medium text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Cancelar
                    </button>
                    <button type="submit" @click="deleteList" class="py-2 px-3 text-md font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700
                        focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Sim
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-for="item in contentsToShow" :key="item.id">
      <div class="ml-5 sm:w-22 md:w-40 lg:w-80 overflow-x-auto">
        <div class="grid grid-cols-2 items-center w-[315px] sm:gap-12">
          <div class="flex justify-start min-w-[160px] mr-2">
            <div class="w-full">
              <span class="text-lg pl-2 text-zinc-700 font-medium mb-2 w-100" v-if="activeItemId !== item.id" @click="editSection(item.id)">
                {{ item.name }}
              </span>
              <span class="w-100" v-else>
                <input type="text" class="text-lg bg-slate-200 pl-2 pb-1 ring-current shadow-md
                text-zinc-700 font-medium mb-2 rounded w-full outline-none"
                @keypress.enter="disableEdit()" @blur="disableEdit()" v-model="item.name" ref="input" />
              </span>
            </div>
          </div>
          <div class="flex justify-end sm:col-span-1 w-full sm:w-32">
            <a href="#" @click="openModal(item)" style="color: unset;">
              <font-awesome-icon :icon="['fas', 'ellipsis']" />
            </a>
          </div>
        </div>
        <div class="kanban max-w-sm min-w-[320px] pl-2 bg-[#E9ECEF] rounded-md overflow-y-auto" style="height: 85vh;">
          <Draggable 
            v-model="item.applications" 
            group="contentsToShow" 
            item-key="id"
            drag-class="drag"
            ghost-class="ghost"
          >
            <template #item="{element: application}">
              <CardKanban :application="application" />
            </template>
          </Draggable>
        </div>
      </div>
    </div>

    <div class="ml-5 sm:w-22 md:w-40 lg:w-72">
        <div class="grid grid-cols-2 items-center w-[315px] sm:gap-12">
          <div class="flex justify-start min-w-[160px] mr-2">
            <div class="w-full">
              <span class="text-lg pl-2 text-zinc-700 font-medium mb-2 w-100" v-if="activeItemId != 'newSection' " @click="newSection('newSection')">
                {{ showNewSection.name }}
              </span>
              <span class="w-100" v-else>
                <input type="text" class="text-lg bg-slate-200 pl-2 pb-1 ring-current shadow-md
                text-zinc-700 font-medium mb-2 rounded w-full outline-none"
                @keypress.enter="disableInputNewSection()" v-model="newSectionTitle" ref="input" />
              </span>
            </div>
          </div>
          <div class="flex justify-end sm:col-span-1 w-full sm:w-32">
            <a href="#">
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
            </a>
          </div>
        </div>
        <div class="kanban overflow-y-scroll max-w-sm min-w-[320px] pl-2 bg-[#E9ECEF] rounded-md" style="height: 85vh;">
        </div>
    </div>
</div>

</template>
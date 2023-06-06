<script setup>
    import { ref } from 'vue';

      const props  = defineProps({
          todoDropdown: {
            type: Boolean
          },
          data: {
            type: Array,
            required: true
         },
         methods: {
         }
      })

      const toggleAssignee = ref(false);
      const toggleDueDate = ref(false);
</script>

<script>

</script>


<template>
    <div v-show="todoDropdown">
        <div class="fixed inset-x-0 z-50 px-1 py-1 rounded left-96 border border-slate-200" 
            style="margin-bottom: 22rem; margin-left: 30rem; margin-top: 14.2rem; background-color: #fcf8f8; max-width: 3.5rem;">
            <div class="text-center bg-white border text-sm text-[#7c7c7c] border-slate-400 rounded mb-0.5">
                    To Do
            </div>
            <div class="text-center bg-[#f3c33e] rounded-md text-sm text-white mb-1">
                    Doing
            </div>
            <div class="text-center bg-[#279436] rounded text-sm text-white">
                    Done
            </div>
        </div>
    </div>
    <div v-for="item in data" :key="item.task">
        <div class="sections border-r border-gray-200">
            <div class="section">
                <div class="pb-5 pt-4">
                    <h1 class="font-medium inline pl-5 pr-9">{{ item.task.sectionTitle }}</h1>
                    <p class="inline text-sm text-[#65cccf]" style="padding-left: 8rem;">
                        <font-awesome-icon :icon="['fas', 'plus']" /> 
                        Nova Tarefa
                        </p>
                    <div v-if="item.task.tasks">
                        <div class="tarefas pl-5 pt-2" v-for="task in item.task.tasks" :key="task.id">
                            <input type="checkbox" name="checkbox" id=""> {{ task }}
                            <div class="inline pl-52 pt-2">
                                <font-awesome-icon :icon="['far', 'calendar-days']" class="cursor-pointer" style="color: #5f6061;" />
                            </div>
                            <div class="inline pl-2 pt-2">
                                <font-awesome-icon :icon="['fas', 'circle']" style="color: #fc2d8e;"/>
                            </div>
                            <div class="pl-2 pt-2 inline">
                                <span class="border border-gray-400 text-sm px-1 cursor-pointer rounded" @click="todoDropdown = !todoDropdown">
                                    To Do
                                </span>                          
                            </div>
                        </div>
                    </div>
                    <div v-if="!item.task.tasks.length">
                        <p class="pl-5 pt-2 text-sm text-[#a2a2a3]">
                            Nenhuma tarefa no momento
                        </p>
                    </div>
                </div>
            <div class="border-t w-full border-gray-200"></div>
            </div>
        </div>
    </div>
</template>
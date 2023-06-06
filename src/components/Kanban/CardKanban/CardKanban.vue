
<script setup>
  import { ref } from 'vue';
  import Modal from '@/components/Modal/Modal.vue'

  defineProps({
    application: {
      required: true
    },
    components: {
      Modal
    }
  })

  const showModal = ref(false);

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

    .kanban-score > span 
    {
        font-family: 'Montserrat', sans-serif;
    }

    .textSpan
    {
        width: 1px; 
        height: 20px;

        font-family: 'Montserrat';
        font-weight: 500;
        font-size: 14.8px;
        line-height: 19px;

        color: #272727;
    }

    .footer-span
    {
        font-family: 'Montserrat';
        font-weight: 500;
        color: #202020;
    }
</style>

<template>
    <div>
        <div v-if="showModal">
            <Modal @hideModal="showModal = false" :application="application" />
        </div> 
        <div class="mx-auto">
            <div class="kanban-card p-4 mt-2 mr-2 bg-white cursor-pointer rounded-md mb-2 ring-fuchsia-700 hover:ring-1" @click="showModal = true">
            <div class="kanban-header">
                <div class="grid grid-cols-2">
                    <span class="kanban-title flex justify-start text-gray-700 font-semibold font-lg leading-3 footer-span">
                        {{ application.startup.name }}
                    </span>
                    <span class="kanban-score flex justify-end">
                        <font-awesome-icon class="mt-1 text-sm font-extralight text-[#94278b]" :icon="['far', 'star']"/>
                        <span class="pl-1 text-sm text-[#951B81]">{{ application.score }} </span>
                    </span>
                </div>
                <div class="challenger footer-span text-xs">
                {{ application.challenge.name }}
                </div>
            </div>
            <div class="kanban-body">
                <div class="progress-bar pt-2.5">
                    <div class="flex items-center">
                        <div class="w-full bg-[#E9ECEF] rounded-md">
                            <div class="p-2 bg-[#a1118e] rounded-l text-center text-xs 
                            font-medium leading-none text-primary-100" style="width: 17%"></div>
                        </div>
                        <span class="ml-2 -mt-1" style="font-size:12.8px; line-height: 19.2px;">17%</span>
                    </div>
                </div>
                <div class="flex kanban-badge pt-2.5">
                <div class="badge-item mr-1 text-xs bg-fuchsia-900 rounded-md font-sm text-white pl-1 pr-1 pb-0.5">Ideação</div>
                <div class="badge-item mr-1 text-xs bg-teal-500 rounded-md font-sm text-white pl-1 pr-1">B2B2C</div>
                </div>
            </div>
            <div class="kanban-footer pt-4">
                <div class="grid grid-cols-2">
                    <div class="flex justify-start">
                        <font-awesome-icon class="mr-1" :icon="['fas', 'circle']" style="color: #E83E8C;" size="xl"/>
                    </div>
                    <div class="flex justify-end space-x-4 font-mono text-white text-sm font-bold leading-6 bg-stripes-cyan rounded-lg">
                        <div class="w-14 h-7 rounded-md flex items-center justify-center">
                            <font-awesome-icon class="pr-1 text-gray-500" :icon="['far', 'comment']" />
                            <span class="footer-span">{{ application.comments.length }}</span>
                        </div>
                        <div class="min-w-[50%] h-7 rounded-lg flex items-center justify-center">
                            <font-awesome-icon class="pr-1 text-gray-500" :icon="['far', 'clock']" style="color: #68686a;" />
                            <span class="footer-span">{{ application.due_date }}</span>
                        </div>
                        <div class="w-14 h-7 rounded-lg flex items-center justify-center">
                            <font-awesome-icon class="text-gray-500" icon="paperclip"/>
                            <span class="pl-2 pr-2 textSpan text-[#68646a]">2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
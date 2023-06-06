<script>

export default {
  data: function() {
    return{
      show: false,
      cars: [
        'BMW',
        'Mercedes',
        'Audi',
        'Volvo',
      ]
    }
  },
  props: {
    color: String,
    animation: String,
    icon: {
        type: Array
    },
    assignee: String,
    authors: {
        type: Array
    }
  },
  mounted() {
    const authors = this.authors;
  }
}


</script>

<template>
    <button v-on:click="show = !show"
            class="text-[#a9abb1] font-bold py-2 px-4 whitespace-no-wrap rounded transition duration-300">
            <font-awesome-icon class="text-[#6b7280]" :icon=icon />
            {{ assignee }}
    </button>
    <div class="dropdown-wrapper relative">
        <transition :name="animation">
        <div :class="'bg-'+color+'-500'" class="dropdown-menu bg-green-500 text-black mt-1 ml-60 rounded absolute z-30 shadow-lg" v-if="show">
            <ul class="list-none overflow-hidden rounded">
            <select v-model="selectedAuthor" class="rounded bg-slate-300">
                <option v-for="author in authors" v-bind:value="author">{{ author.name }}</option>
            </select>
            </ul>
        </div>
        </transition>
    </div>
</template>
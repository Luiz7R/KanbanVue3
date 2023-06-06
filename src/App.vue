<script setup>
import Sidebar from './components/Sidebar.vue'
import Kanban from './components/Kanban/Kanban.vue';
import Filtros from './components/Filtros/Filtros.vue';
import { ref } from 'vue';

    const props  = defineProps({
      name: 'Main',
      filtroAvaliacao: {
        type: Boolean
      },
      contents: {
        type: String
      },
      components: {
        Filtros,
        Kanban
      }
    })
    const filteredStartups = ref([]);

    const onFilterStartups = (startups) => {
      filteredStartups.value = startups
    };
</script>

<style>
    .fontPrincipal
    {
        font-family: 'Montserrat';
        font-weight: 600;
        color: #202020;
    }

    .gap-sm-s {
      gap: 2rem;
    }
</style>


<template>
    <div class="flex">
      <Sidebar />
      <div class="pl-20 pt-7 max-sm">
          <h3 class="text-3xl pl-10 fontPrincipal">Todas as aplicações</h3>
          <Filtros @filterStartups="onFilterStartups" />
          <div class="border-t mb-5 border-gray-200"></div>
          <Kanban :filteredStartups="filteredStartups" />
      </div>
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<template>
    <div class="sidebar z-10 transition-all duration-500 
        overflow-y-auto overflow-x-hidden shadow-lg p-2 md:drop-shadow-lg ring-2 ring-gray-200 ring-offset-2"
    >
        <div class="w-64 absolute">
            <div class="navbar-item flex items-center">
                <span class=" p-2 bg-gray-400 rounded mr-4">
                  <font-awesome-icon class="h-6 text-white" :icon="['fas', 'house-chimney']"/>
                </span>
                <span class="hidden md:inline-block">Home</span>
            </div>
            <div class="navbar-item flex items-center pt-5">
                <span class="p-2 bg-gray-400 rounded mr-4">
                  <font-awesome-icon class="h-6 text-white" :icon="['far', 'star']"/>
                </span>
                <span class="hidden md:inline-block">Todas as Aplicações</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
  
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    background-color: #fff;
    z-index: 9;
    transition: all 0.3s ease-in-out;
  }
  
  .sidebar:hover {
    width: 282px;
  }
  
 

</style>

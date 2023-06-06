<script>

import { faLeftRight } from '@fortawesome/free-solid-svg-icons';
import { reactive, ref } from 'vue';

export default {
    name: 'Filtros',
    props: {
      filtroAvaliacao: {
        type: Boolean
      },
      filtros: {
        type: Object,
        default: () => ({ nome: '', desafio: '' })
      },
      filtrados: {
        type: Object,
        default: () => ({ startup: '', challenge: '', score: '' })
      }
    },
    emits: ['filterStartups'],
    setup(props,context) {
      const filtros = props.filtros;
      const nome = filtros.nome;
      const desafio = filtros.desafio;
      const filtrados = reactive([]);
      const intervaloInicial = ref(0.0);
      const intervaloFinal = ref(0);
      const filtroAvaliacao = ref(0);
      const scoreFiltro = ref(null);

      function performFilter()
      {
          if ( checkIfHasFilter() )
          {
              getStartupContentsFilter(this.nome, this.desafio, this.intervaloInicial, this.intervaloFinal)
              
              if ( filtroAvaliacao.value )
              {
                  filtroAvaliacao.value = false
                  scoreFiltro.value = ': ' + this.intervaloInicial + ' - ' + this.intervaloFinal
              }
          }
          else
          {
            context.emit("filterStartups", []);
          }
      }

      function checkIfHasFilter()
      {
          return nome || desafio || intervaloInicial && intervaloInicial;
      }

      function getStartupContentsFilter(nome,desafio,intervaloInicial,intervaloFinal) {

        fetch('../../data.json')
          .then(response => response.json())
          .then(data => {
            parsedDates(data)

            const results = reactive(data.map(item => {
              const applications = item.applications.filter(application => {
                const startupName = application.startup.name;
                const challengerName = application.challenge.name;
                const score = application.score;

                return startupName.toLowerCase() == nome.toLowerCase() 
                || challengerName.toLowerCase() == desafio.toLowerCase() || (score >= intervaloInicial && score <= intervaloFinal);
     
              });
              return applications.length > 0 ? { ...item, applications } : null;
            })).filter(Boolean);

            context.emit("filterStartups", results);
          })
          .catch(error => {
                console.error('Erro lendo arquivo JSON:', error);
          });
      }

      function parsedDates(obj) {
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

      return {
        nome,
        desafio,
        filtrados,
        intervaloInicial,
        intervaloFinal,
        scoreFiltro,
        filtroAvaliacao,
        performFilter
      }
    }
}

</script>

<style>
    .fontPrincipal
    {
        font-family: 'Montserrat';
        font-weight: 600;
        color: #202020;
    }

    .drag > div {
      transform: rotate(5deg);
    }
    .ghost {
      background: lightgray;
      border-radius: 6px;
    }

    .ghost > div {
      visibility: hidden;
    }
</style>

  <template>
    <div>
      <div class="pl-12 pt-8">
        <div class="filtro-title">
          <h2 class="font-semibold text-2xl fontPrincipal">Filtros</h2>
        </div>

        <span class="text-black">{{ nome }}</span>

        <div class="flex mt-2">
          <div class="sm:w-[120px] md:w-[648px] lg:w-[648px] h-12">

            <input type="text" v-model="nome" class="w-full border
              border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
              focus:ring-opacity-40 rounded  px-3 py-1 text-lg text-gray-800 placeholder-gray-400
              outline-none" placeholder="Buscar por nome ( ex: Startup A)"
            >

          </div>
          <div class="sm:w-[120px] md:w-[255px] lg:w-[255px] h-12">
            <select class="w-full border ml-2 border-gray-300 h-[80%] focus:border-blue-500 focus:ring-2 
              focus:ring-blue-500 focus:ring-opacity-40 rounded 
                px-3 py-1 text-md text-gray-500 outline-none" 
                name="desafio" id="desafio" placeholder="Desafio" v-model="desafio">
                <option value="" selected>Filtrar por Desafio</option>
                <option value="Desafio A">Desafio A</option>
                <option value="Desafio B">Desafio B</option>
                <option value="Desafio C">Desafio C</option>
            </select>
          </div>
          <div class="sm:w-[120px] md:w-[255px] lg:w-[255px] h-12 mr-8">
              <select @click="filtroAvaliacao = !filtroAvaliacao" 
                  class="w-full ml-4 border border-gray-300 h-10 focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-40 rounded 
                    px-3 py-1 text-md text-gray-500 outline-none" placeholder="Avaliacao"
              >
                  <option v-show="!filtroAvaliacao" value="avaliacao" selected>Filtrar por Avaliação {{ scoreFiltro }}</option>
              </select>
              <div v-show="filtroAvaliacao" class="pl-4 pt-3">
                <div class="relative bg-[#f5f4f4] w-[255px] h-[80px] pl-2 pt-2 rounded">
                  <span class="text-black pr-2 pl-15">Intervalo da nota de avaliação</span>
                  <div class="pt-2">
                    <input type="number" class="w-1/4 inline rounded text-center ring-2 outline-none" v-model.number="intervaloInicial">
                    <span class="text-black pl-2 pr-4">-</span>
                    <input type="number" class="w-1/4 inline rounded text-center ring-2 outline-none" v-model.number="intervaloFinal">
                  </div>
                </div>
              </div>  
            </div>
          <div class="sm:w-[100px] md:w-[100px] lg:w-[100px] h-12 text-white">
            <button class="text-lg w-full rounded mt-0.5 font-light px-3 py-1 bg-fuchsia-800" @click="performFilter">Buscar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
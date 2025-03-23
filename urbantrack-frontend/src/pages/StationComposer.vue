<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

//Types
interface Arret {
    nom: string
    horaire: string
}

interface TrajetComposé {
    transport: string
    ligne: string
    couleur: string
    duree: string
    stations: Arret[]
}

//FORM DATA

const trajet = ref<Omit<TrajetComposé, 'stations'>>({
  transport: '',
  ligne: '',
  couleur: '',
  duree:''
})

const arrets = ref<Arret[]>([
    {nom : '', horaire:''}
])


//Dropdown

const couleursDisponibles = [
  { nom: 'Rouge', code: '#e3342f' },
  { nom: 'Bleu', code: '#3490dc' },
  { nom: 'Vert', code: '#38c172' },
  { nom: 'Jaune', code: '#facc15' },
  { nom: 'Violet', code: '#8b5cf6' },
  { nom: 'Noir', code: '#111111' },
  { nom: 'Gris', code: '#9ca3af' },
  { nom: 'Orange', code: '#f97316' }
]

const showDropdown = ref(false)

const toggleDropdown = (): void => {
  showDropdown.value = !showDropdown.value
}

const selectCouleur = (code: string): void => {
  trajet.value.couleur = code
  showDropdown.value = false
}

//CRUD ARRET
const ajouterArret = (): void => {
    arrets.value.push({ nom: '', horaire:''})
}

const supprimerArret = (index: number): void => {
    arrets.value.splice(index, 1)
}

//ENVOI EN BDD
const enregistrerTrajet = async (): Promise<void> => {
  try {
    const nouveauTrajet: TrajetComposé = {
      ...trajet.value,
      stations: arrets.value
    }
    await axios.post(`${import.meta.env.VITE_API_URL}/api/trajets-compose`, nouveauTrajet)
    alert('Trajet enregistré avec succès')
    // Reset
    trajet.value = {
      transport: '',
      ligne: '',
      couleur: '',
      duree: ''
    }
    arrets.value=[{ nom: '', horaire:''}]
  } catch (error) {
    console.error('Erreur lors de l’enregistrement du trajet :', error)
    alert('Une erreur est survenue')
  }
}

</script>

<template>
  <div class="w-full flex items-center justify-center pt-20 bg-white text-black">
    <form class="max-w-sm w-full space-y-4">
      <!-- Select Transport -->
      <div>
        <label for="transport" class="block mb-2 text-sm font-medium text-black">Sélectionner le transport</label>
        <select
          id="transport"
          v-model="trajet.transport"
          class="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
        >
          <option disabled value="">Selectionner un transport</option>
          <option value="rer">RER</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="metro">Métro</option>
        </select>
      </div>

      <!-- Custom Dropdown for Couleur -->
      <div class="relative">
        <label class="block mb-2 text-sm font-medium text-black">Choisir la couleur de ligne</label>

        <div
          @click="toggleDropdown"
          class="bg-white border border-gray-300 text-black text-sm rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer"
        >
          <div class="flex items-center space-x-2 gap-1">
            <div class="w-6 h-1 rounded" :style="{ backgroundColor: trajet.couleur || '#ccc' }"></div>
            <span>
              {{ couleursDisponibles.find(c => c.code === trajet.couleur)?.nom || ' Choisir une couleur' }}
            </span>
          </div>
          <span class="text-gray-400">&#9662;</span> 
        </div>

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto"
        >
          <div
            v-for="couleur in couleursDisponibles"
            :key="couleur.code"
            @click="selectCouleur(couleur.code)"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 gap-1"
          >
            <div class="w-6 h-1 rounded " :style="{ backgroundColor: couleur.code }"></div>
            <span>{{ couleur.nom }}</span>
          </div>
        </div>
      </div>

      <!-- Ligne -->
      <div>
        <label for="ligne" class="block mb-2 text-sm font-medium text-black">Entrer la ligne</label>
        <input
          v-model="trajet.ligne"
          type="text"
          id="ligne"
          class="bg-white text-black text-sm rounded-lg block w-full p-2.5 border border-gray-400"
          placeholder="Ex: T3b, 45, A..."
        />
      </div>
       <!-- Durée -->
       <div>
        <label 
        for="duree"
        class="block mb-2 text-sm font-medium text-black"
        >
        Durée estimée du trajet
        </label>
        <input 
        v-model="trajet.duree"
        type="text"
        id="duree"
        class="bg-white text-black text-sm rounded-lg block w-full p-2.5 border border-gray-400"
        placeholder="Ex: 45min.."
        />
       </div>
       <div class="mt-6">
  <label class="block mb-2 text-sm font-medium text-black">Liste des arrêts</label>
 <!-- Arrêts -->
  <div v-for="(arret, index) in arrets" :key="index" class="flex space-x-2 items-center mb-2 gap-1">
    <input
      v-model="arret.nom"
      type="text"
      placeholder="Nom de l'arrêt"
      class="bg-white text-black border border-gray-300 rounded-lg p-2 w-1/2"
    />
    <input
      v-model="arret.horaire"
      type="time"
      class="bg-white text-black border border-gray-300 rounded-lg p-2 w-1/3"
    />
    <button @click="supprimerArret(index)" type="button" class="text-red-500 hover:underline pl-1">Supprimer</button>
  </div>

  <button @click="ajouterArret" type="button" class="mt-2 text-blue-600 hover:underline text-sm">➕ Ajouter un arrêt</button>
</div>
<button
type="button"
@click="enregistrerTrajet"
class="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition"
>
    Enregistrer ce trajet
</button>
    </form>
  </div>
</template>

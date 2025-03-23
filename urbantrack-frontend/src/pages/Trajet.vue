<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import busIcon from '@/assets/images/icons/bus.png'
import rerIcon from '@/assets/images/icons/rer.png'
import trainIcon from '@/assets/images/icons/train.png'
import metroIcon from '@/assets/images/icons/metro.png'
import defaultIcon from '@/assets/images/icons/default.png'

// Typage de chaque trajet
interface Arret {
  nom: string
  horaire: string
}

interface TrajetComposé {
  _id: string
  transport: string
  ligne: string
  couleur: string
  duree: string
  stations: Arret[]
}

const trajets = ref<TrajetComposé[]>([])
const router = useRouter()

const getAvatarUrl = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'bus':
      return busIcon
    case 'rer':
      return rerIcon
    case 'train':
      return trainIcon
    case 'metro':
      return metroIcon
    default:
      return trainIcon
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/trajets-compose`)
    trajets.value = res.data
  } catch (err) {
    console.error('Erreur chargement trajet', err)
  }
})

const voirTrajet = (id: string) => {
  router.push(`/trajet/${id}`)
}
</script>

<template>
  <div class="p-8">
    <h2 class="text-3xl font-bold text-indigo-600 mb-6">Liste des trajets</h2>

    <ul class="max-w-2xl divide-y divide-gray-200 bg-white text-black rounded-md shadow">
      <li
        v-for="t in trajets"
        :key="t._id"
        @click="voirTrajet(t._id)"
        class="py-4 px-4 cursor-pointer hover:bg-gray-50 transition"
      >
        <div class="flex items-center space-x-4 gap-2">
          <div class="shrink-0">
            <img
              class="w-10 h-10 rounded-full object-cover"
              :src="getAvatarUrl(t.transport)"
              alt="transport"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ t.ligne.toUpperCase() }} — {{ t.transport }}
            </p>
            <p class="text-sm text-gray-500 truncate">
              {{ t.stations.length }} arrêts • Durée : {{ t.duree }}
            </p>
          </div>
          <div class="inline-flex items-center text-base font-semibold text-gray-900">
            {{ t.ligne }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

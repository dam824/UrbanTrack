<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Types
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

const trajet = ref<TrajetComposé | null>(null)
const route = useRoute()

//  géocoder un arrêt avec Nominatim
const fetchCoordinates = async (query: string): Promise<L.LatLng | null> => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=1`
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.length > 0) {
      const { lat, lon } = data[0]
      return L.latLng(parseFloat(lat), parseFloat(lon))
    }
  } catch (err) {
    console.error('Erreur de géocodage :', err)
  }
  return null
}

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/trajets-compose/${id}`)
    trajet.value = res.data
    if (!trajet.value) return

    await nextTick()

    const map = L.map('map').setView([48.8566, 2.3522], 11)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map)

    const coordinates: L.LatLng[] = []

    for (const arret of trajet.value.stations) {
      const coord = await fetchCoordinates(arret.nom)
      if (coord) {
        coordinates.push(coord)

        L.marker(coord)
          .addTo(map)
          .bindPopup(`<b>${arret.nom}</b><br>${arret.horaire}`)

        if (coordinates.length === 1) {
          map.setView(coord, 12)
        }
      }
    }

    if (coordinates.length > 1) {
      L.polyline(coordinates, {
        color: trajet.value.couleur || '#000',
        weight: 4
      }).addTo(map)
    }
  } catch (error) {
    console.error('Erreur chargement trajet :', error)
  }
})
</script>


<template>
  <div class="p-8">
    <div v-if="trajet">
      <h2 class="text-2xl font-bold text-indigo-700 mb-2">
        Ligne {{ trajet.ligne.toUpperCase() }} — {{ trajet.transport }}
      </h2>
      <p class="text-gray-600 mb-4">Durée : {{ trajet.duree }}</p>

      <h3 class="text-lg font-semibold text-gray-800 mb-2">Liste des arrêts :</h3>
      <ul class="space-y-2 mb-6 ">
        <li
          v-for="(arret, index) in trajet.stations"
          :key="index"
          
        >
          <span class="font-bold">{{ arret.nom }}</span> — {{ arret.horaire }}
        </li>
      </ul>

      <!-- Carte Leaflet -->
      <div id="map" class="w-full h-96 rounded shadow border pt-8"></div>
    </div>

    <div v-else class="text-gray-500">Chargement du trajet...</div>
  </div>
</template>

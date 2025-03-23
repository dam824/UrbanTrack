<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'


const trajets = ref([])
const router = useRouter()

onMounted(async()=> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/trajets`)
        trajets.value = res.data
    }catch(err){
        console.error('Erreur chargement trajet', err)
    }
})

const voirTrajet = (id) => {
    router.push(`/trajet/${id}`)
}

</script>


<template>
  <div class="p-8">
    <h2 class="text-3xl font-bold text-indigo-600 mb-6">Liste des trajets</h2>

    <ul class="space-y-4">
      <li
        v-for="t in trajets"
        :key="t._id"
        @click="voirTrajet(t._id)"
        class="cursor-pointer p-4 border rounded-md hover:bg-gray-100 transition"
      >
        <div class="text-lg font-semibold">
          {{ t.depart }} ➡️ {{ t.destination }}
        </div>
        <div class="text-sm text-gray-500">
          Le {{ t.date }} à {{ t.heure }} — état : <span class="font-bold">{{ t.synoptique }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
  
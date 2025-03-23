<script setup>
import { ref } from 'vue'
import axios from 'axios'

const trajet = ref({
  depart: '',
  destination: '',
  date: '',
  heure: '',
  synoptique: 'normal'
})

const submitTrajet = async () => {
  try {
    const nouveauTrajet = {
      depart: trajet.value.depart,
      destination: trajet.value.destination,
      date: trajet.value.date,
      heure: trajet.value.heure,
      synoptique: trajet.value.synoptique
    }

    await axios.post(`${import.meta.env.VITE_API_URL}/api/trajets`, nouveauTrajet)

    alert('Trajet ajouté avec succès !')
    trajet.value = {
      depart: '',
      destination: '',
      date: '',
      heure: '',
      synoptique: 'normal'
    }
  } catch (err) {
    console.error('Erreur enregistrement trajet:', err)
    alert('Une erreur est survenue.')
  }
}
</script>

<template>
    <div class="w-full h-screen flex flex-col items-center justify-start pt-10">
      <h2 class="text-2xl font-bold text-indigo-600 text-center mb-4 ">Ajouter un Trajet</h2>
  
      <form @submit.prevent="submitTrajet" class="space-y-4 w-full max-w-md">
        <div>
          <label class="block text-sm font-medium text-gray-700">Départ</label>
          <input v-model="trajet.depart" type="text" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Destination</label>
          <input v-model="trajet.destination" type="text" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Date</label>
          <input v-model="trajet.date" type="date" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Heure</label>
          <input v-model="trajet.heure" type="time" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Synoptique</label>
          <input v-model="trajet.synoptique" type="text" required class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
  
        <button type="submit" class="w-full bg-indigo-600 text-white font-bold  py-2 px-4 rounded-md hover:bg-indigo-700 transition">
          Ajouter Trajet ➕
        </button>
      </form>
    </div>
  </template>
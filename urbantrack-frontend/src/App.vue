<script setup>
// Plus besoin de routing maison
</script>

<template>
  <div class="w-full h-screen bg-white text-gray-800 p-6 flex flex-col items-center justify-start ">
    <h1 class="text-3xl font-bold text-indigo-600 mb-6 text-center">UrbanTrack</h1>

    <!-- Nouvelle nav avec <RouterLink> -->
    <nav class="flex justify-center space-x-4 mb-8 gap-2">
      <RouterLink
        to="/"
        class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >🏠 Accueil</RouterLink>

      <RouterLink
        to="/trajets"
        class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >🚍 Voir Trajets</RouterLink>
      

      <RouterLink
        to="/ajouter"
        class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >➕ Ajouter Trajet</RouterLink>

      <RouterLink
        to="/station-composer"
        class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >➕ Station Composer</RouterLink>

    </nav>

    <!-- Vue Router gère les pages dynamiques ici -->
    <div class="w-full mx-auto">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
a.router-link-active {
  background-color: #cbd5e1;
  font-weight: bold;
}
</style>
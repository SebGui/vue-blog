<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>

  {{ $t('user.data.mail') }}

  <div class="locale-changer">
    <div v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`">
      <button @click="$i18n.locale=locale">{{ locale }}</button>
    </div>

  </div>

  <div class="about">
    <h1>Ceci est la page de description</h1>
  </div>
</template>

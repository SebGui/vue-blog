<template>
  <div @click="back" class="backLink">
    <fa-icon icon="chevron-left" /> {{ $t('home.backText') }}
  </div>

  <div class="about">
    <h1>{{ $t('settings.settingsTitle') }}</h1>
  </div>

  <div class="languageSelect">
    <div class="languageSelectText">
      {{ $t('home.selectLanguagetext') }}
    </div>
    <div class="locale-changer">
      <div v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`">
        <button @click="$i18n.locale=locale">{{ $t('localeNames.'+locale) }}</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
}
</script>

<style scoped>
.backLink {
    text-align:left;
    margin-left: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  .backLink svg {
    margin-right:10px;
  }
  .backLink:hover {
    color:#3ca576;
  }
.languageSelect {
  position:relative;
  float: left;
  margin:20px;
}
 .languageSelect button {
    padding: 10px 20px;
    background-color: #3ca576;
    margin: 10px 20px 10px 0px;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    transition:100ms;
    cursor:pointer;
 }
 .languageSelect button:hover {
  color: #3ca576;
  border-color: #3ca576;
  background-color: white;
 }
 .locale-changer {
    position: relative;
    float: left;
 }
 .locale-changer div {
  position:relative;
  float:left;
 }
 .languageSelectText {
  text-align: left;
 }
</style>

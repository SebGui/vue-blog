/*import fr from "./fr";
import en from "./en";

const locales = {
    fr: fr,
    en: en
}

export default locales*/
import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import fr from '../locales/fr'
import cn from '../locales/cn'

let currentLocale = 'en'
// internationalization configurations
const i18n = createI18n({
    messages: {
        en: en,
        fr: fr,
        cn: cn
    },
    fallbackLocale: 'en',
    locale: currentLocale,
    legacy: false
})

export default i18n
//export {i18n, updateLocale}
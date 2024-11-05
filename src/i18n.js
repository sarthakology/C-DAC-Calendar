import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './Translations/en.json';
import hi from './Translations/hi.json';
import fr from './Translations/fr.json';
import gr from './Translations/gr.json';
import ru from './Translations/ru.json';
import ja from './Translations/ja.json';
import ko from './Translations/ko.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            english: { translation: en },
            hindi: { translation: hi },
            french: { translation: fr },
            german: { translation: gr },
            russian: { translation: ru },
            japanese: { translation: ja },
            korean: { translation: ko },

        },
        lng: 'english',
        fallbackLng: 'english',
        interpolation: { escapeValue: false }
    });

export default i18n;

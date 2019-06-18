import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faItalic, faUnderline, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret, faLink, faCode, faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner, faAlignLeft, faAlignCenter, faAlignJustify, faAlignRight, faListOl, faListUl } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner, faAlignLeft, faUnderline, faAlignCenter, faAlignJustify, faAlignRight, faListOl,faListUl)
library.add(faBold, faItalic, faUndo,faRedo, faLink, faCode, faFileImage)
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

//import '@/assets/fonts/fontawsome-all.css';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

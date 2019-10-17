// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

//Import googel heatmap
import VueGoogleHeatmap from 'vue-google-heatmap';
 
Vue.use(VueGoogleHeatmap, {
  apiKey: 'AIzaSyBLwBvYokJRQYItglMFg8mD2gIjSIq6pdM'
});

//import vue table component

import { TableComponent, TableColumn } from 'vue-table-component';
 
Vue.component('table-component', TableComponent);
Vue.component('table-column', TableColumn);
// Vue.use(VueGoogleHeatmap, {
//   apiKey: '03130f23-0e07-4661-b36f-aed79dc8047e'
// });

//import vue-html2canvas
 //import VueHtml2Canvas from 'vue-html2canvas';

 //Vue.use(VueHtml2Canvas);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

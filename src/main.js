// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'

window.axios = require('axios');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

Vue.filter('striphtml', (value) => {
    let div = document.createElement("div");
    div.innerHTML = value;
    return div.textContent || div.innerText || "";
});

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).startOf('day').fromNow()
    }
});

Vue.filter('makeExcerpt', val =>  val.substring(0, 100) + ' [...]');

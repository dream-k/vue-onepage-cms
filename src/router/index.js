import Vue from 'vue'
import Router from 'vue-router'
import DragDrop from '@/components/DragDrop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DragDrop',
      component: DragDrop
    }
  ]
})

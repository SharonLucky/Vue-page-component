import page from './page.vue'
import pageInput from './page-input.vue'

page.install = function(Vue){
	Vue.component('pagenation', page);
	Vue.component('pagenationInput', pageInput);
}

export default page
export {pageInput}
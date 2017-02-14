import page from './page.vue'
import pageInput from './page-input.vue'
import pageLimit from './page-limit.vue'

page.install = function(Vue){
	Vue.component('pagenation', page);
	Vue.component('pagenationInput', pageInput);
	Vue.component('pagenationLimit', pageLimit);
}

export default page
export {pageInput}
export {pageLimit}
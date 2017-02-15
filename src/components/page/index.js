import page from './page.vue'
import pageInput from './page-input.vue'
import pageLimit from './page-limit.vue'
import pageLimitInput from './page-limit-input.vue'

page.install = function(Vue){
	Vue.component('pagenation', page);
	Vue.component('pagenationInput', pageInput);
	Vue.component('pagenationLimit', pageLimit);
	Vue.component('pagenationLimitInput', pageLimitInput);
}

export default page
export {pageInput}
export {pageLimit}
export {pageLimitInput}
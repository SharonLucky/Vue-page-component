<template>
<div class="pagenation">
	<ul>
		<p class="info">Two：previous + the value of input change </p>
		<li @click="pre"> < </li>
		<li v-for="item in show_page_numbers" :class="{active: item==current_index}" @click="setIndex(item)">{{item}}</li>
		<li @click="next"> > </li>
	</ul>
	<div class="page_input">
		<span>第</span>
		<input type="text"  v-model="current_input" @blur="jumpPage(current_input)" @keyup.enter="jumpPage(current_input)">
		<span>页</span>
	</div>	
</div>
</template>
<script>
export default{
	name:"pagenationInput",
	props:{
		current:{type:Number,default:1},
		total:{type:Number},
		currentChange:{type:Function}
	},
	data:function(){
		return {
			show_page_numbers:[],
			display_limit:7,
			current_input:1,//input-page-change
			current_index:this.current
		}
	},
	mounted(){
		console.log("page-input")
		this.refreshPage();
	},
	methods:{
		refreshPage(){
				this.show_page_numbers=[];
				for(let i=1; i<=this.total; i++){
					this.show_page_numbers.push(i);
				}
		    if (this.total <= this.display_limit) { return; }
		    let begin = this.current_index - 3 
		    let end = this.current_index + 3
		    begin = begin <= 1 ? 1 : begin
		    end = end <= this.display_limit ? this.display_limit : end
		    begin = begin >= this.total - this.display_limit ? this.total - this.display_limit : begin
		    end = end >= this.total ? this.total : end
		    let arr = this.show_page_numbers.slice(begin-1,end);
		    this.show_page_numbers = arr;
			},
		pre:function(){
			let current=this.current_index;
			if(current<=1){ return }
			this.setIndex(current-1);
		},
		next:function(){
			let current = this.current_index;
      if(current>=this.total){return;  }
      this.setIndex(current+1);
		},
		setIndex:function(index){
			this.current_index=index;
			this.current_input=this.current_index;
			this.refreshPage();
		},
		jumpPage:function(curPage){
			console.log("页数变化:"+curPage)
			if (!/^[\d]+$/.test(curPage)) {
				this.current_input=1;
				return false
			}
			curPage=Number(curPage)>=1?Number(curPage):1;
			curPage=Number(curPage)>=this.total?this.total:Number(curPage);
			this.setIndex(Number(curPage));

		},

	}
}
</script>
<style scoped>
	.pagenation{
		text-align:left;
	}
	.pagenation ul,.pagenation .page_input{
		display:inline-block;
	}
  li{
    list-style: none;
    display: inline-block;
    margin: 5px 0;
    padding: 5px;
    min-width: 30px;
    min-height: 30px;
    line-height: 200%;
    cursor: pointer;
    transition: all 0.05s;
    user-select: none;  
    text-align:center;
  }
  .active{
  	background-color: rgba(65, 182, 131, .5);
    color: #ffffff;
    border-color: rgba(65, 182, 131, .5);
    border-radius:50%;
  }
  li:hover{
    background-color: rgba(65, 182, 131, .2);
    color: #ffffff;
    border-color: rgba(65, 182, 131, .5);
    border-radius:50%;
  }  
  .info{
    display:inline-block;
  	color: #ed6c63;
    font-size: 12px;
    font-weight: 400;
  }
  a{
    display: inline-block;
    color: inherit;
  } 
  .clearfix{
    clear: both;
  }
  .page_input input{
  	width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
</style>
<template>
<div class="paginator">
	<p class="info">Four：page with an ellipsis+input </p>
  <a href="javascript:;" class="arrow" @click="go('previous')"> < </a>
  <ul>
    <li v-for="number in pageNumbers">
      <a href="javascript:;"  :class="{current: number.isCurrent == true, dot: number.isDot == true}"
      @click="go(number.value)">{{number.value}}</a>
    </li>
  </ul>
  <a href="javascript:;" class="arrow" @click="go('next')">  > </a>
  <div class="page_input">
		<span>第</span>
		<input type="text"  v-model="current_input" @blur="jumpPage(current_input)" @keyup.enter="jumpPage(current_input)">
		<span>页</span>
	</div>	
</div>

</template>
<script>
export default{
	name:"pagenationLimitInput",
	props:{
		current:{type:Number,default:1},
		total:{type:Number},
	},
	data:function(){
		return {
			getTotal:this.total,
			offset:this.current,
			pageNumbers :[],
			current_input:1
		}
	},
	mounted(){
		console.log("page-limit")
		this.refreshPage();
	},
	methods:{
		refreshPage:function(){
				var total=Number(this.getTotal);
				var offset=Number(this.offset);

				var frontDots = (offset - 1) > 4 && total > 9; //is show front dots ? true -> show, false -> not show
        var endDots = (total - offset) > 4 && total > 9;// is show end dots? true-> show, false-> not show
        var fullPageArray = [];

        for (var i = 1; i <= total; i++) {
          fullPageArray.push({
            value: i,
            isCurrent: i === offset,
            isDot: false
          });
        }
        if(frontDots){//P6开始会有前面的省略号
        	fullPageArray.splice(1, Math.min(total - 8, offset - 4), {
            value: '...',
            isCurrent: false,
            isDot: true
          })
        }
				if (endDots) {
            fullPageArray.splice(7, Math.min(total - 8, total - offset - 3), {
              value: '...',
              isCurrent: false,
              isDot: true
            })
        }
				this.pageNumbers = fullPageArray;
				this.current_input=offset
			},
			jumpPage:function(curPage){
				if (!/^[\d]+$/.test(curPage)) {
					this.current_input=1;
					return false
				}
				curPage=Number(curPage)>=1?Number(curPage):1;
				curPage=Number(curPage)>=this.getTotal?this.getTotal:Number(curPage);
				this.go(Number(curPage));
			},
			go:function(p){
				switch(typeof p){
					case 'number':{
						if(p!=this.offset){
							this.offset=p;
							this.refreshPage();
						}
						 break;
						}
					
					case 'string':{
						if(p == 'next'){
							if(Number(this.offset) < Number(this.getTotal)){  
								this.offset++;	
								this.refreshPage();
							}
						}
						if(p == 'previous'){	
							if(this.offset>1){
								this.offset--;
								this.refreshPage();
								}	
						}
						 break;
						}
						 default: break;
						}
				
				}
			}
	
	}

</script>
<style scoped>
*{
	margin:0;padding:0
}
.paginator {
  font-family: '微软雅黑';
  text-align: left;
  margin: 10px 0;
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
.paginator ul .current {
  color: #ffffff;
  background: #2596c8;
  border-radius: 3px;
}

.paginator ul .dot {
  cursor: default;
}

.paginator ul, .paginator li, .paginator a {
  display: inline-block;
  vertical-align: center;
}

.paginator a:not(.current):link, .paginator a:not(.current):hover, .paginator a:not(.current):active {
  color: black;
}

.paginator ul > li > a {
  color: black;
  margin: 4px 2px;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
}
.paginator .arrow {
  width: 28px;
  height: 28px;
  line-height: 28px;
  color: #676767;
  text-decoration: none;
}
 .info{
    display:inline-block;
  	color: #ed6c63;
    font-size: 12px;
    font-weight: 400;
    margin: 0 18px 0 39px;
  }
  .page_input{
  display:inline-block;
  }
  .page_input input{
  	width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
</style>
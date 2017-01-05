let Vue = require('vue');
import axios from 'axios';
Vue.http = axios;
Vue.prototype.$http = axios;
// import util from '../src/util';
// console.log(util)

Vue.component('pager', require('../src/pager'));
//Vue.component('filter', require('../src/filter'));

let dm = [];
let vm = [];
new Vue({
	el: '.mod-container',
	data () {	
		return {
			total:0,//总页数
			list: []
		}
	},
	methods: {
		changePage (number) {
			this.list = vm[number-1]
		},
		getList () {//获取数据 计算页数
			let self = this
			self.$http.get('http://say.hellozt.com/get_bing_images/total')
			.then((response) => {
			    let res = response.data
			    let data = dm = res.data 
			    //let len = data.length//数据总条数
			    this.slicePage(data);
			    //默认第一页	
			    self.changePage(1)					
			}, (response) => {
				//error callback
			})				
		},
		slicePage (arr){
			vm = [];
		    let n = 0,pageSize = 5
		    while (n*pageSize <= arr.length){
		    	let arrItem = [];
		    	arrItem = arr.slice(n*pageSize, (n+1)*pageSize);
		    	vm.push(arrItem);
		    	n = n + 1;
		    }
		    //设置total
		    this.total = n	
		    this.currentPage = 1;
		    this.changePage(1);		
		},
		sort (dire) {
			let tempArr = this.bubbleSort(dm,'day',dire);//true升序false降序
			this.slicePage(tempArr);
		},
		filter (tag){
			if (tag == 0) {//筛选所有
				this.slicePage(dm);
				return;
			}
			var emptyContentArr = [],
				haveContentArr = [];
			for (var i = 0; i < dm.length; i++) {
				if (dm[i].content.trim() == '') {
					emptyContentArr.push(dm[i]);
				} else {
					haveContentArr.push(dm[i]);
				}
			}
			if (tag == 1) {//筛选空内容
				this.slicePage(emptyContentArr)
				return;
			}
			if (tag == 2) {//筛选非空内容
				this.slicePage(haveContentArr)
			}
		},
		bubbleSort(array, key, dire) {
			var arr = array.slice(0, array.length);//拷贝数组
			var temp;
			for (var i = 0; i < arr.length; i++) {
	            for(var j=0;j<arr.length-i-1;j++){ //每一趟比较多少次数
	            	if (dire) {
		                if(arr[j][key]>=arr[j+1][key]){
		                    temp=arr[j];
		                    arr[j]=arr[j+1];
		                    arr[j+1]=temp;
		                }	            		
	            	} else{
		                if(arr[j][key]<=arr[j+1][key]){
		                    temp=arr[j];
		                    arr[j]=arr[j+1];
		                    arr[j+1]=temp;
		                }	            	
		            }

	            }
			}
			return arr;
		}
	},
	mounted () {
		//初始化列表
		this.getList()
	}
})

'use strict';

require('./style.css');


module.exports =  {
	template: require('./template.html'),
	props: {
		total: {
			default: 0,
			type: Number,
			required: true
		},
		change: {
			default () {},
			type: Function
		}
	},
	data () {
		return {
			gotoVal: null,
			curpage: 1
		}
	},
	methods: {
		setPage (n) {
			this.gotoVal = null
			let reg = /^[0-9]*[1-9][0-9]*$/
			if (!reg.test(n)) {					
				return
			}
			n = parseInt(n)
			if (n < 1 || n > this.total || n == this.curpage) {
				return
			}
			this.curpage = n
			this.change(this.curpage)
		}
	}
}
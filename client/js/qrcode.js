const API = 'http://localhost:8081/api/people';
/*
var qrcode = new window.QRCode(document.getElementById("qrcode"), {
	width : 500,
	height : 500
});
*/
Vue.component(VueQrcode.name, VueQrcode); 


Vue.component('test', { 
	props: ['xid'],
	template: `
	<div>
		<qrcode :value="name" :options="{ size: 200 }"></qrcode>
	</div>
		`,
	data: function () {
	   return {
		   name: "Error",
		   list:[]
	   }
	 },
	 methods: {
		 getUsers: function(){
			let method='GET';
			let xAPI = API+'/'+this.xid
			fetch(xAPI, {
				headers:{
					'Content-Type':'application/json'
				},
				method:method,
			})
			.then(res => res.json())
			.then(res => {
				if (res.name){
					this.name=res.name;
				}
				
			});
		   }
	   },
	   mounted: function () {
		   this.getUsers();
	   }
   })

let catApp = new Vue({
	el:'#wrapper',
	data:{
		cats:[],
		tmp:{
			id:'',
			name:'',
			Email:'',
			Position:'',
			Department:'',
			Address: '',
			Contact: '',
			HireDate : '',
			Created : Date.now(),
			Modified : Date.now()
		},
		cat:{
			id:'',
			name:'',
			Email:'',
			Position:'',
			Department:'',
			Address: '',
			Contact: '',
			HireDate : '',
			Created : Date.now(),
			Modified : Date.now()
		}
	},
	created:function() {
		this.getCats();
	},
	methods:{
		getCats:function() {
			fetch(API)
			.then(res => res.json())
			.then(res => this.cats = res);	
		},
		storeCat:function() {
			let method;
			console.log('storeCat', this.cat);
			// Handle new vs old
			if(this.cat.id === '') {
				delete this.cat.id;
				method = 'POST';
			} else {
				method = 'PUT';
			}
			fetch(API, {
				headers:{
					'Content-Type':'application/json'
				},
				method:method,
				body:JSON.stringify(this.cat)
			})
			.then(res => res.json())
			.then(res => {
				//this.getCats();
				this.sentmail();
				this.reset();
			});
		},
		sendmail:function(){
			console.log(this.cat)
		},
		reset:function() {
			this.tmp.created= Date.now();
			this.tmp.Modified = Date.now();
			this.cat=this.tmp;
		}
	}
});


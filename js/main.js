var raiz = new Vue ({
	el: '#raiz',
	data:{
		alturaPantalla: '',
	},
	mounted: function(){
			this.alturaPantalla = window.innerHeight;
		},
});
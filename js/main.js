var raiz = new Vue ({
	el: '#raiz',
	data:{
		alturaPantalla: '',
		propiedades: {	//objeto que posee las propiedades del componente contador. Aqui se podrian incluir variables de php
			claseTabla: 'table',
			claseTest: 'test'
		},
	},
	mounted: function(){
			this.alturaPantalla = window.innerHeight;
		},
});
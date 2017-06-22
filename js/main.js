Vue.component('contador',{
    template: '<div>\
                <div><h2>Su fecha actual es: {{ fechaActual }}</h2></div>\
            <h2>Cuenta regresiva configurable según los selects</h2>\
        <h4><table class="table">\
        <caption>{{ titulo }}</caption>\
            <thead>\
                <tr>\
                    <th>Años</th>\
                    <th>Meses</th>\
                    <th>Días</th>\
                    <th>Horas</th>\
                    <th>Minutos</th>\
                    <th>Segundos</th>\
                </tr>\
            </thead>\
                <tbody>\
                    <tr>\
                        <td>{{ years }}</td>\
                        <td>{{ meses }}</td>\
                        <td>{{ dias }}</td>\
                        <td>{{ horas }}</td>\
                        <td>{{ minutos }}</td>\
                        <td>{{ segundos }}</td>\
                   </tr>\
                   <tr>\
                    <td>\
                        <select v-model="yearsLimites">\
                            <option v-for="year in yearsArreglo" :value="year">{{ year }}</option>\
                        </select>\
                    </td>\
                    <td>\
                        <select v-model="mesesLimites">\
                            <option v-for="meses in 12" :value="meses - 1">{{ meses }}</option>\
                        </select>\
                    </td>\
                    <td>\
                        <select v-model="diasLimites">\
                            <option v-for="dia in diasPorMesFuncion(mesesLimites, yearsLimites)" :value="dia">{{ dia }}</option>\
                        </select>\
                    </td>\
                    <td>\
                        <select v-model="horasLimites">\
                            <option v-for="hora in 24" :value="hora - 1">{{ hora -1 }}</option>\
                        </select>\
                    </td>\
                    <td>\
                        <select v-model="minutosLimites">\
                            <option v-for="minuto in 60" :value="minuto - 1">{{ minuto - 1}}</option>\
                        </select>\
                    </td>\
                    <td>\
                        <select v-model="segundosLimites">\
                            <option v-for="segundo in 60" :value="segundo - 1">{{ segundo - 1}}</option>\
                        </select>\
                    </td>\
                   </tr>\
                   \
                </tbody>\
            </table></h4>\
    </div>',
    data: function(){
        return {
            fechaLimite: '',
            years: '',
            meses: '',
            dias: '',
            horas: '',
            minutos: '',
            segundos: '',
            ciclo: '',
            titulo: '',
            fechaActual: '',
            //limite de años q se agregaran al select desde el año actual
            rangoYearsLimite: 2030, 
            //fecha limite (el valor del mes debe ser -1)
            segundosLimites: 00,
            minutosLimites: 00,
            horasLimites: 15,
            diasLimites: 20,
            mesesLimites: 6,
            yearsLimites: 2017,


            diasPorMes: [
                {nombre: 'Enero', numero: 1, dias: 31},
                {nombre: 'Febrero', numero: 2, dias: 28},
                {nombre: 'Marzo', numero: 3, dias: 31},
                {nombre: 'Abril', numero: 4, dias: 30},
                {nombre: 'Mayo', numero: 5, dias: 31},
                {nombre: 'Junio', numero: 6, dias: 30},
                {nombre: 'Julio', numero: 7, dias: 31},
                {nombre: 'Agosto', numero: 8, dias: 31},
                {nombre: 'Septiembre', numero: 9, dias: 30},
                {nombre: 'Octubre', numero: 10, dias: 31},
                {nombre: 'Noviembre', numero: 11, dias: 30},
                {nombre: 'Diciembre', numero: 12, dias: 31},
            ],  
            yearsArreglo: [],          
        };        
    },
    methods: {
        tiempoTotal: function(){
            this.fechaLimite = new Date(this.yearsLimites, this.mesesLimites, this.diasLimites, this.horasLimites,this.minutosLimites,this.segundosLimites);
            this.titulo = 'Conteo hasta el día ' + ' ' + this.fechaLimite.getDate() + ' de ' +
            this.diasPorMes[this.fechaLimite.getMonth()].nombre + ' de ' + this.fechaLimite.getFullYear() +
         ', a las ' + this.cerosEsteticos(this.fechaLimite.getHours()) + ' : ' + this.cerosEsteticos(this.fechaLimite.getMinutes()) + ' : ' + this.cerosEsteticos(this.fechaLimite.getSeconds()) + '.';

            this.fechaActual = this.obtenerFechaActual(new Date);

            if(this.fechaLimite >= new Date){
                //obtencion de dateTime actual
                var date = new Date;

                this.dias = this.fechaLimite.getDate() - date.getDate();
                this.meses = this.fechaLimite.getMonth() - date.getMonth();
                this.years = this.fechaLimite.getFullYear() - date.getFullYear();
                this.horas = this.fechaLimite.getHours() - date.getHours();
                this.minutos = this.fechaLimite.getMinutes() - date.getMinutes();
                this.segundos = this.fechaLimite.getSeconds() - date.getSeconds();

                if(this.segundos < 0){
                    this.segundos += 60;
                    this.minutos -= 1;
                };

                if(this.minutos < 0){
                    this.minutos += 60;
                    this.horas -= 1;
                };

                if (this.horas < 0){
                    this.horas += 24;
                    this.dias -= 1;
                };

                if(this.dias < 0){
                    this.meses -= 1;
                    this.dias += this.diasPorMesFuncion(date.getMonth(), date.getFullYear()).length;    
                };

                if(this.meses < 0){
                    this.meses += 12;
                    this.years -= 1;
                };
                //
                this.years = this.cerosEsteticos(this.years);
                this.meses = this.cerosEsteticos(this.meses);
                this.dias = this.cerosEsteticos(this.dias);
                this.horas = this.cerosEsteticos(this.horas);
                this.segundos = this.cerosEsteticos(this.segundos);
                this.minutos = this.cerosEsteticos(this.minutos);

            }else{
                this.titulo = 'Se alcanzo la fecha límite';
                this.years = '00';
                this.meses = '00';
                this.dias = '00';
                this.horas = '00';
                this.minutos = '00';
                this.segundos = '00';

            }
            
            
        },
        //si es true es biciesto
        yearBiciesto: function(year){
            return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
        },
        cerosEsteticos: function(valor){
            //agregar 0 estetico
                if(valor < 10){
                    return valor = '0' + valor;
                }else{
                    return valor;
                }
        },
        diasPorMesFuncion: function(meses, years){
            var diasTotales;
            var arregloDias = new Array;
            switch(meses) {
                        case 0:
                        case 2:
                        case 4:
                        case 6:
                        case 7:
                        case 9:
                        case 11:   
                            diasTotales = 31;
                            break;
                        case 3:
                        case 5:
                        case 8:
                        case 10:   
                            diasTotales = 30;
                            break;
                        case 1:
                            if(this.yearBiciesto(years)){
                                diasTotales = 29;
                            }else{
                                diasTotales = 28;
                            }    
                        default:
                            break;
            };

            for(var i = 1; i <= diasTotales; i++){
                arregloDias.push(i);
            }    

            return arregloDias;
        },

        obtenerFechaActual: function(actual){
            return this.cerosEsteticos(actual.getDate()) + ' de ' + this.diasPorMes[actual.getMonth()].nombre + ' del ' 
                + actual.getFullYear() + ' ,con hora ' + this.cerosEsteticos(actual.getHours()) + ' : ' + this.cerosEsteticos(actual.getMinutes()) + ' : '
                + this.cerosEsteticos(actual.getSeconds()) + '.'; 
        },

        rangoYears: function(arr){
            var date = new Date;
            for(var i= date.getFullYear(); i <= this.rangoYearsLimite; i++ ){
                arr.push(i);
            }
                
            return arr;
        }


    },
    mounted: function(){
        setInterval(this.tiempoTotal, 1000);
        this.yearsArreglo = this.rangoYears(this.yearsArreglo);
    }
});

new Vue ({
    el: '#rangoContador',

});

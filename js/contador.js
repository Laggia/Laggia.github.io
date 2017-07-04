Vue.component('contador',{
    props:['claseTabla', 'claseTest'],
    template: ['<div class="h4">',
                // '<div><h2>Su fecha actual es: {{ fechaActual }}</h2></div>',
            // '<h2>Cuenta regresiva configurable según los selects</h2>',
        '<div class="h1">',    
        '<div class="d-flex justify-content-center align-items-center">', 
        // columnas del contador
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Añ</div>',
                '<div>{{ years }}</div>',
                '<div id="fondo-select-years" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button id="boton-up-years" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-years" v-model="yearsLimites" class="semi-square border-0 my-0 pt-0">',
                    '<option v-for="year in yearsArreglo" :value="year">{{ year - 2000 }}</option>',
                    '</select>',
                    '<button id="boton-down-years" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',

            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Me</div>',
                '<div>{{ meses }}</div>',
                '<div id="fondo-select-meses" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button id="boton-up-meses" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-meses" v-model="mesesLimites" class="semi-square border-0 my-0 pt-0">',
                    '<option v-for="meses in diasPorMes" :value="meses.numero -1">{{ cerosEsteticos(meses.numero) }}</option>',
                    '</select>',
                    '<button id="boton-down-meses" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',
            // fin columnas del contador

            
        '</div>',


        '<table :class="claseTabla">',
        '<caption>{{ titulo }}</caption>',
            '<thead>',
                '<tr>',
                    '<th>Añ</th>',
                    '<th>Me</th>',
                    '<th>Dí</th>',
                    '<th>Ho</th>',
                    '<th>Mi</th>',
                    '<th>Se</th>',
                '</tr>',
            '</thead>',
                '<tbody>',
                    '<tr>',
                        '<td :class="claseTest">{{ years }}</td>',
                        '<td>{{ meses }}</td>',
                        '<td>{{ dias }}</td>',
                        '<td>{{ horas }}</td>',
                        '<td>{{ minutos }}</td>',
                        '<td>{{ segundos }}</td>',
                   '</tr>',
                   '<tr class="d-flex justify-content-center">',
                    '<td class="py-0 px-0">',
                    '<div id="fondo-select-years" class="d-flex flex-column align-items-center justify-content-center rounded">',
                        '<button id="boton-up-years" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                        '<select id="select-years" v-model="yearsLimites" class="semi-square border-0 my-0 pt-0">',
                            '<option v-for="year in yearsArreglo" :value="year">{{ year - 2000 }}</option>',
                        '</select>',
                        '<button id="boton-down-years" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                    '</div>',
                    '</td>',
                    '<td>',
                        '<select id="select-meses" v-model="mesesLimites">',
                            '<option v-for="meses in diasPorMes" :value="meses.numero -1">{{ cerosEsteticos(meses.numero) }}</option>',
                        '</select>',
                    '</td>',
                    '<td>',
                        '<select v-model="diasLimites">',
                            '<option v-for="dia in diasPorMesFuncion(mesesLimites, yearsLimites)" :value="dia">{{ dia }}</option>',
                        '</select>',
                    '</td>',
                    '<td>',
                        '<select v-model="horasLimites">',
                            '<option v-for="hora in 24" :value="hora - 1">{{ hora -1 }}</option>',
                        '</select>',
                    '</td>',
                    '<td>',
                        '<select v-model="minutosLimites">',
                            '<option v-for="minuto in 60" :value="minuto - 1">{{ minuto - 1}}</option>',
                        '</select>',
                    '</td>',
                    '<td>',
                        '<select v-model="segundosLimites">',
                            '<option v-for="segundo in 60" :value="segundo - 1">{{ segundo - 1}}</option>',
                        '</select>',
                    '</td>',
                   '</tr>',
                '</tbody>',
            '</table>',
            '</div>',
            '<div id="reloj" :style="[relojObject]" class="reloj"></div>',
            '<button id="btnDireccion" @click="detenerCuadrado" type="button">{{ relojObject.direccion }}</button>',
    '</div>'].join(''),

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

            relojObject:{               
                '-webkit-animation': 'mymove 5s infinite',
                cambiado: false,
                direccion: '',
            },  
            keyframes: '',      
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
        },

        seguimiento: function(){
            //console.log(document.getElementById('reloj').getBoundingClientRect().left);
        },

        detenerCuadrado: function(){
            if(this.relojObject.cambiado){
                document.getElementsByTagName( 'style' )[0].innerHTML = '.reloj{-webkit-animation: mymove 5s infinite;} \n' + this.keyframesCuadrado('0%','45%','90%');         
                this.relojObject.cambiado = false;
                //this.relojObject['-webkit-animation'] = 'mymove 5s infinite';
                this.relojObject.direccion = 'Izquierda';
            }
            else{
                this.relojObject.cambiado = true;
                document.getElementsByTagName( 'style' )[0].innerHTML = '.reloj{-webkit-animation: mymove 5s infinite;} \n' + this.keyframesCuadrado('90%','45%','0%');
                //this.relojObject['-webkit-animation'] = 'mymove 5s infinite';
                this.relojObject.direccion = 'Derecha';
            }
        },

        keyframesCuadrado: function(cero, mitad, final){
            return this.keyframes = ['@-webkit-keyframes mymove {',
                                                '0%',
                                                '{left: ' + cero +';}',
                                                '50%',
                                                '{left: ' + mitad +';}',
                                                '100%',
                                                '{left: ' + final +';}',
                                            '}'].join('');
        },


    },
    mounted: function(){
        setInterval(this.tiempoTotal, 1000);
        setInterval(this.seguimiento, 1000);
        this.yearsArreglo = this.rangoYears(this.yearsArreglo);

       
        var s = document.createElement( 'style' );
        s.innerHTML = this.keyframes;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );

        document.getElementById('btnDireccion').click();
    }
});


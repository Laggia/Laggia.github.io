Vue.component('contador',{
    props:['componentProp'],
    template: [
    '<div>',    
        '<div class="h2 mb-0 d-flex justify-content-around align-items-start">', 
        // columnas del contador

            //clasificación
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Tiempo</div>',
                '<div>Actual</div>',
                '<div>Falta</div>',
                '<br>',
                '<div>Límite</div>',   
            '</div>',

            //division
            '<div :style="puntosStyle" class="d-flex flex-column justify-content-center align-items-center">',
                '<div>|</div>',
                '<div>:</div>',
                '<div>:</div>',
                '<br>',
                '<div>:</div>',   
            '</div>',

            //horas
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Ho</div>',
                '<div>{{ horasActuales }}</div>',
                '<div>{{ horas }}</div>',
                '<div id="fondo-select-horas" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button @click="btnAgregar(\'horas_limites\')" id="boton-up-horas" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-horas" v-model="horasLimites" class="semi-square border-0 my-0 pt-0">',
                        '<option v-for="hora in 24" :value="hora - 1">{{ cerosEsteticos(hora -1) }}</option>',
                    '</select>',
                    '<button @click="btnQuitar(\'horas_limites\')" id="boton-down-horas" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',

            //division
            '<div :style="puntosStyle" class="d-flex flex-column justify-content-center align-items-center">',
                '<div>|</div>',
                '<div>:</div>',
                '<div>:</div>',
                '<br>',
                '<div>:</div>',   
            '</div>',

            //minutos
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Mi</div>',
                '<div>{{ minutosActuales }}</div>',
                '<div>{{ minutos }}</div>',
                '<div id="fondo-select-minutos" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button @click="btnAgregar(\'minutos_limites\')" id="boton-up-minutos" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-minutos" v-model="minutosLimites" class="semi-square border-0 my-0 pt-0">',
                        '<option v-for="minuto in 60" :value="minuto - 1">{{ cerosEsteticos(minuto - 1) }}</option>',
                    '</select>',
                    '<button @click="btnQuitar(\'minutos_limites\')" id="boton-down-minutos" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',

            //division
            '<div :style="puntosStyle" class="d-flex flex-column justify-content-center align-items-center">',
                '<div>|</div>',
                '<div>:</div>',
                '<div>:</div>',
                '<br>',
                '<div>:</div>',   
            '</div>',

            //segundos
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Se</div>',
                '<div>{{ segundosActuales }}</div>',
                '<div>{{ segundos }}</div>',
                '<div id="fondo-select-segundos" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button @click="btnAgregar(\'segundos_limites\')" id="boton-up-segundos" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-segundos" v-model="segundosLimites" class="semi-square border-0 my-0 pt-0">',
                        '<option v-for="segundo in 60" :value="segundo - 1">{{ cerosEsteticos(segundo - 1) }}</option>',
                    '</select>',
                    '<button @click="btnQuitar(\'segundos_limites\')" id="boton-down-segundos" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',

            //division
            '<div :style="puntosStyle" class="d-flex flex-column justify-content-center align-items-center">',
                '<div>|</div>',
                '<div>:</div>',
                '<div>:</div>',
                '<br>',
                '<div>:</div>',   
            '</div>',

            //días 
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Dí</div>',
                '<div>{{ diasActuales }}</div>',
                '<div>{{ dias }}</div>',
                '<div id="fondo-select-dias" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button @click="btnAgregar(\'dias_limites\')" id="boton-up-meses" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-dias" v-model="diasLimites" class="semi-square border-0 my-0 pt-0">',
                        '<option v-for="dia in diasPorMesFuncion(mesesLimites, yearsLimites)" :value="dia">{{ cerosEsteticos(dia) }}</option>',
                    '</select>',
                    '<button @click="btnQuitar(\'dias_limites\')" id="boton-down-dias" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',

            //division
            '<div :style="puntosStyle" class="d-flex flex-column justify-content-center align-items-center">',
                '<div>|</div>',
                '<div>:</div>',
                '<div>:</div>',
                '<br>',
                '<div>:</div>',   
            '</div>',

            //meses
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Me</div>',
                '<div>{{ mesesActuales }}</div>',
                '<div>{{ meses }}</div>',
                '<div id="fondo-select-meses" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button @click="btnAgregar(\'meses_limites\')" id="boton-up-meses" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-meses" v-model="mesesLimites" class="semi-square border-0 my-0 pt-0">',
                        '<option v-for="meses in diasPorMes" :value="meses.numero -1">{{ meses.diminutivo }}</option>',
                    '</select>',
                    '<button @click="btnQuitar(\'meses_limites\')" id="boton-down-meses" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',

            //division
            '<div :style="puntosStyle" class="d-flex flex-column justify-content-center align-items-center">',
                '<div>|</div>',
                '<div>:</div>',
                '<div>:</div>',
                '<br>',
                '<div>:</div>',   
            '</div>',

            //años    
            '<div class="d-flex flex-column justify-content-center align-items-center">',
                '<div>Añ</div>',
                '<div>{{ yearsActuales }}</div>',
                '<div>{{ years }}</div>',
                '<div id="fondo-select-years" class="d-flex flex-column align-items-center justify-content-center rounded">',
                    '<button @click="btnAgregar(\'years_limites\')" id="boton-up-years" type="button" class="border-0 h4"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>',
                    '<select id="select-years" v-model="yearsLimites" class="semi-square border-0 my-0 pt-0">',
                        '<option v-for="year in yearsArreglo" :value="year">{{ year - 2000}}</option>',
                    '</select>',
                    '<button @click="btnQuitar(\'years_limites\')" id="boton-down-years" type="button" class="border-0 h4"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>',
                '</div>',
            '</div>',          
        '</div>',    
        // fin columnas del contador
        '<div class="h4">',
            '{{ titulo }}',
        '</div>',             
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
            yearsActuales: '',
            mesesActuales: '',
            diasActuales: '',
            horasActuales: '',
            minutosActuales: '',
            segundosActuales: '',
            //limite de años q se agregaran al select desde el año actual
            rangoYearsLimite: 2030, 
            //fecha limite (el valor del mes debe ser -1)
            segundosLimites: 00,
            minutosLimites: 00,
            horasLimites: 15,
            diasLimites: 20,
            mesesLimites: 6,
            yearsLimites: 2017,

            diasTotalesMes: '', //se guardan los dias por mes una vez ejecutado el v-for de dias

            puntosStyle: {
                color: 'black',
            }, //efecto intermitente de 2 puntos


            diasPorMes: [
                {nombre: 'Enero', diminutivo: 'Ene' ,numero: 1, dias: 31},
                {nombre: 'Febrero', diminutivo: 'Feb' ,numero: 2, dias: 28},
                {nombre: 'Marzo', diminutivo: 'Mar' ,numero: 3, dias: 31},
                {nombre: 'Abril', diminutivo: 'Abr' ,numero: 4, dias: 30},
                {nombre: 'Mayo', diminutivo: 'May' ,numero: 5, dias: 31},
                {nombre: 'Junio', diminutivo: 'Jun' ,numero: 6, dias: 30},
                {nombre: 'Julio', diminutivo: 'Jul' ,numero: 7, dias: 31},
                {nombre: 'Agosto', diminutivo: 'Ago' ,numero: 8, dias: 31},
                {nombre: 'Septiembre', diminutivo: 'Sep' ,numero: 9, dias: 30},
                {nombre: 'Octubre', diminutivo: 'Oct' ,numero: 10, dias: 31},
                {nombre: 'Noviembre', diminutivo: 'Nov' ,numero: 11, dias: 30},
                {nombre: 'Diciembre', diminutivo: 'Dic' ,numero: 12, dias: 31},
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

            this.diasTotalesMes = diasTotales;

            return arregloDias;
        },

        obtenerFechaActual: function(actual){
            this.diasActuales = this.cerosEsteticos(actual.getDate());
            this.mesesActuales = this.diasPorMes[actual.getMonth()].diminutivo; 
            this.yearsActuales = actual.getFullYear() - 2000;
            this.horasActuales = this.cerosEsteticos(actual.getHours());
            this.minutosActuales = this.cerosEsteticos(actual.getMinutes());
            this.segundosActuales = this.cerosEsteticos(actual.getSeconds()); 
        },

        rangoYears: function(arr){
            var date = new Date;
            // var inicio = date.getFullYear() - 2000;
            // var fin = this.rangoYearsLimite - 2000;
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

        btnAgregar: function(elemento){
            switch(elemento) {
                case 'horas_limites':
                    if(this.horasLimites < 23) this.horasLimites = this.horasLimites + 1;
                    break;
                case 'minutos_limites':
                    if(this.minutosLimites < 59) this.minutosLimites = this.minutosLimites + 1;
                    break;
                case 'segundos_limites':
                    if(this.segundosLimites < 59) this.segundosLimites = this.segundosLimites + 1;
                    break;  
                case 'dias_limites':
                    if(this.diasLimites < this.diasTotalesMes) this.diasLimites = this.diasLimites + 1;
                    break;    
                case 'meses_limites':
                    if(this.mesesLimites < 11) this.mesesLimites = this.mesesLimites + 1;
                    break;   
                case 'years_limites':
                    if(this.yearsLimites < this.yearsArreglo[this.yearsArreglo.length - 1]) this.yearsLimites = this.yearsLimites + 1;
                    break;           
                default:
                    break;
            }
        },

        btnQuitar: function(elemento, limiteInferior, nombre){
             switch(elemento) {
                case 'horas_limites':
                    if(this.horasLimites > 0) this.horasLimites = this.horasLimites - 1;
                    break;
                case 'minutos_limites':
                    if(this.minutosLimites > 0) this.minutosLimites = this.minutosLimites - 1;
                    break;
                case 'segundos_limites':
                    if(this.segundosLimites > 0) this.segundosLimites = this.segundosLimites - 1;
                    break;  
                case 'dias_limites':
                    if(this.diasLimites > 1) this.diasLimites = this.diasLimites - 1;
                    break;    
                case 'meses_limites':
                    if(this.mesesLimites > 0) this.mesesLimites = this.mesesLimites - 1;
                    break;  
                case 'years_limites':
                    if(this.yearsLimites > this.yearsArreglo[0]) this.yearsLimites = this.yearsLimites - 1;
                    break;        
                default:
                    break;
            }
        },

        activarDosPuntos: function(){
            if(this.puntosStyle.color == 'white'){
                this.puntosStyle.color = 'black';
            }
            else{
                this.puntosStyle.color = 'white';
            }
        }


    },
    mounted: function(){
        setInterval(this.tiempoTotal, 1000);
        // setInterval(this.seguimiento, 1000);
        // setInterval(this.activarDosPuntos, 1000);
        this.yearsArreglo = this.rangoYears(this.yearsArreglo);

       
        var s = document.createElement( 'style' );
        s.innerHTML = this.keyframes;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
    }
});


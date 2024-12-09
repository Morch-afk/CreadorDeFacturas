const app = Vue.createApp({
    data() {
        return {
            datosReceptor: {
                nombre: '',
                direccion: ''
            },
            conceptos: [
                { cantidad: 1, descripcion: '', valorUnitario: 0 }
            ]
        };
    },
    computed: {
        subTotal() {
            return this.conceptos.reduce((acc, concepto) => acc + (concepto.cantidad * concepto.valorUnitario), 0);
        },
        iva() {
            return this.subTotal * 0.16;
        },
        total() {
            return this.subTotal + this.iva;
        }
    },
    methods: {
        agregarConcepto() {
            this.conceptos.push({ cantidad: 1, descripcion: '', valorUnitario: 0 });
            this.guardarDatos();
        },
        eliminarConcepto(index) {
            this.conceptos.splice(index, 1);
            this.guardarDatos();
        },
        guardarDatos() {
            localStorage.setItem('datosReceptor', JSON.stringify(this.datosReceptor));
            localStorage.setItem('conceptos', JSON.stringify(this.conceptos));
        },
        cargarDatos() {
            if (localStorage.getItem('datosReceptor')) {
                this.datosReceptor = JSON.parse(localStorage.getItem('datosReceptor'));
            }
            if (localStorage.getItem('conceptos')) {
                this.conceptos = JSON.parse(localStorage.getItem('conceptos'));
            }
        }
    },
    watch: {
        datosReceptor: {
            handler: 'guardarDatos',
            deep: true
        },
        conceptos: {
            handler: 'guardarDatos',
            deep: true
        }
    },
    mounted() {
        this.cargarDatos();
    }
});

app.mount('#app');

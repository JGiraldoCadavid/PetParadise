const { createApp } = Vue;
createApp({
    data() {
        return {
            arrayEvents: [], /* todos los eventos */
            juguetes: [],   /* eventos de jugueteria */
            juguetesFiltrados: [],
            textoIngresado: "",
            menosDeMil: false, // Checkbox "0 a 1000"
            masDeMil: false, // Checkbox "más de mil"

            carrito: [],
            contadorCarritoProducto: 0,
            totalCarrito: 0,
            cantidad: 0,
        }
    },
    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
            .then(response => response.json())
            .then(data => {
                this.arrayEvents = data
                console.log(this.arrayEvents);
                this.juguetes = this.arrayEvents.filter(evento => evento.categoria == "jugueteria")

                this.cargarCarritoDesdeLocalStorage();
                this.actualizarCantidad();
            })
            .catch(error => console.log(error))
    },
    methods: {
        agregarAlCarrito(producto) {
            if (producto.disponibles > 0) {

                const prodCarrito = this.carrito.find(p => p._id === producto._id);
                if (prodCarrito) {

                    if (producto.disponibles >= 1) {
                        producto.disponibles--;
                    }

                    if (producto.cantidad >= 0) {
                        prodCarrito.cantidad += producto.cantidad;
                        this.totalCarrito += producto.precio;
                    }
                } else {
                    producto.disponibles--;

                    if (producto.disponibles >= 0) {
                        producto.cantidad = 1;
                        this.totalCarrito += producto.precio;
                        this.carrito.push(producto);
                        console.log(this.carrito)
                    }
                }
                this.actualizarTotalCarrito();
                this.guardarCarritoLocalStorage();
                this.contadorCarritoProducto = this.carrito.length;
            }
        },
        removerDesdeCarrito(producto) {
            const indice = this.carrito.findIndex(p => p._id === producto._id);
            if (indice !== -1) {
                if (producto.cantidad > 0) {
                    producto.cantidad--;
                }

                if (producto.disponibles >= 0) {
                    producto.disponibles++;
                }
                this.totalCarrito -= producto.precio;
                this.carrito.splice(indice, 1);
                this.actualizarTotalCarrito();
                this.guardarCarritoLocalStorage();
            }
            this.contadorCarritoProducto = this.carrito.length;
        },
        guardarCarritoLocalStorage() {
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            localStorage.setItem('totalCarrito', this.totalCarrito.toString())
            localStorage.setItem('cantidad', this.cantidad.toString())
            const cantidadesPorProducto = {};

            this.carrito.forEach(producto => {
                cantidadesPorProducto[producto._id] = producto.cantidad;
            });

            localStorage.setItem('cantidadesPorProducto', JSON.stringify(cantidadesPorProducto));

        },
        cargarCarritoDesdeLocalStorage() {
            const cartData = localStorage.getItem('carrito');
            const totalCarrito = localStorage.getItem('totalCarrito');
            const cantidadesPorProducto = JSON.parse(localStorage.getItem('cantidadesPorProducto'));
            const cantidad = localStorage.getItem('cantidad');

            if (cartData) {
                this.carrito = JSON.parse(cartData);
                this.carrito.forEach(producto => {
                    if (cantidadesPorProducto.hasOwnProperty(producto._id)) {
                        producto.cantidad = cantidadesPorProducto[producto._id];
                    }
                });
            }
            if (cantidad) {
                this.cantidad = parseFloat(cantidad);
            } else {
                this.cantidad = 0;
            }

            if (totalCarrito) {
                this.totalCarrito = parseFloat(totalCarrito);
            } else {
                this.totalCarrito = 0;
            }
        },

        vaciarCarrito() {
            this.contadorCarritoProducto = 0;
            this.carrito.forEach(productoEnCarrito => {
                const productoEnLista = this.juguetes.find(p => p._id === productoEnCarrito._id);
                if (productoEnLista) {
                    productoEnLista.disponibles += productoEnCarrito.cantidad;
                }
            });
            this.carrito = [];

            this.totalCarrito = 0;
            this.actualizarTotalCarrito();
            this.guardarCarritoLocalStorage();
        },


        aumentarCantidad(producto) {
            if (producto.disponibles > 0) {
                producto.cantidad++;
                producto.disponibles--;
                this.actualizarTotalCarrito();
                this.guardarCarritoLocalStorage()
            }
        },
        disminuirCantidad(producto) {
            if (producto.cantidad > 0) {
                producto.cantidad--;
                producto.disponibles++;
                this.actualizarTotalCarrito();
                this.guardarCarritoLocalStorage();
            }
        },
        actualizarTotalCarrito() {
            this.totalCarrito = this.carrito.reduce((total, producto) => {
                return total + (producto.precio * producto.cantidad);
            }, 0);
        },
        actualizarCantidad() {
            this.cantidad = this.juguetes.reduce((total, producto) => {
                return total + producto.cantidad;
            }, 0);
        }
    },
    computed: {
        filtroTexto() {
            this.juguetesFiltrados = this.juguetes.filter(evento => {
                const precio = evento.precio;
                const texto = this.textoIngresado.toLowerCase();

                const cumplePrecio =
                    (!this.menosDeMil && !this.masDeMil) || // Si ninguno está seleccionado, no filtrar por precio.
                    (this.menosDeMil && precio <= 1000) || // Si "0 a 1000" está seleccionado y el precio está en ese rango.
                    (this.masDeMil && precio > 1000); // Si "más de mil" está seleccionado y el precio es mayor de mil.

                const cumpleTexto = evento.producto.toLowerCase().includes(texto);

                return cumplePrecio && cumpleTexto;
            })
        }
    },
}).mount("#app")
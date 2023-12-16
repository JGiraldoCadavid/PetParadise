const { createApp } = Vue

  createApp({
    data() {
      return {
        products: [],
        mostSelledProducts:[],
        email:"",
        // valorBusqueda:"",
        // carrito:[],
        // contadorCarritoProducto:0,
        // totalCarrito:0,
        // filtroBusqueda:[],
        // cantidad:0,       
      }
    },

    created(){

        axios('https://mindhub-xj03.onrender.com/api/petshop')
        .then(response => {
            this.products=response.data;
            this.mostSelledProducts=this.products.filter(product => product.disponibles <= 2);

            console.log(this.products);
            console.log(this.mostSelledProducts);
        })
        .catch(err => {
            console.log(err);
        })

        // fetch('https://mindhub-xj03.onrender.com/api/petshop')
        //     .then(resolve => resolve.json())
        //     .then(datos => {
                
        //       datos.forEach(producto => {
        //         if (!producto.hasOwnProperty('cantidad')) {
        //             producto.cantidad = 0;
        //         }
        //       });
        //         this.productos = datos;
        //         this.cantidad=this.productos.cantidad
        //         this.masVendidos = this.productos.filter(producto => producto.disponibles <= 2);
        //         this.filtroBusqueda = this.masVendidos;
        //         this.carrito.forEach(productoEnCarrito => {
        //           const productoEnLista = this.productos.find(p => p._id === productoEnCarrito._id);
        //           if (productoEnLista) {
        //             productoEnLista.disponibles += productoEnCarrito.cantidad;
        //           }
        //         });
        //         this.guardarCarritoLocalStorage();
        //         this.cargarCarritoDesdeLocalStorage();
        //         this.actualizarCantidad();
        //     })
        //     .catch(err => err)
    },

    methods:{
        subscribe() {
            if (this.email.trim() == "") {
                this.showErrorAlert("Por favor, ingresa un correo electrónico.");
            } else if (!this.isValidEmail(this.email)) {
                this.showErrorAlert("Por favor, ingresa un correo electrónico válido.");
            } else {
                this.showSuccessAlert("¡Gracias por suscribirte!", "Bienvenido a nuestra comunidad. Estarás al tanto de las últimas ofertas y novedades. ¡Esperamos que disfrutes de la experiencia de compra en nuestra tienda!");
            }
        },
        isValidEmail(email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        showSuccessAlert(title, text) {
            Swal.fire({
                title: title,
                text: text,
                icon: "success",
                background: "#202126",
                confirmButtonColor: "#FF8700",
                didRender: this.customizeAlertContainer
            });
        },
        showErrorAlert(errorMessage) {
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                background: "#202126",
                confirmButtonColor: "#FF8700",
                didRender: this.customizeAlertContainer
            });
        },
        customizeAlertContainer() {
            const container = Swal.getPopup();
            container.style.color = '#FF8700';
        },
    },
  }).mount('#app')
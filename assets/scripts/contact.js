const { createApp } = Vue;
createApp({
  data() {
    return {
      product: {},
      products: [],
      cart: [],
      totalCart: 0,
      amount: 0,
      shippingLow: 12000,
      shippingHigh: 18000,
      email: "",
      nombreUsuario: "",
      emailUsuario: "",
      telefonoUsuario: "",
      tipoMasc: "opciones",
      comentarios: "",
    };
  },
  mounted() {
    this.loadCart();
  },
  created() {
    axios("https://mindhub-xj03.onrender.com/api/petshop")
      .then((response) => {
        this.products = response.data;
        this.toys = this.products.filter(
          (prod) => prod.categoria == "jugueteria"
        );
        this.filteredToys = this.toys;
        this.products.forEach((product) => {
          product.amount = 0;
          product.availableInitials = product.disponibles;
        });
        this.cart.forEach((producInCart) => {
          const productInList = this.products.find(
            (p) => p._id == producInCart._id
          );
          if (productInList) {
            productInList.disponibles -= producInCart.amount;
          }
        });
        this.saveCart();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    totalItemsInCart() {
      return this.cart.reduce((total, product) => total + product.amount, 0);
    },
    subtotal() {
      return this.totalCart;
    },
    shippingCost() {
      return this.cart.length <= 6 ? this.shippingLow : this.shippingHigh;
    },
    total() {
      return this.subtotal + this.shippingCost;
    },
  },
  methods: {
    loadCart() {
      const cartData = localStorage.getItem("cart");
      const totalCart = localStorage.getItem("totalCart");
      const amountsByProduct = JSON.parse(
        localStorage.getItem("amountsByProduct")
      );
      const amount = localStorage.getItem("amount");
      if (cartData) {
        this.cart = JSON.parse(cartData);
        this.cart.forEach((product) => {
          if (amountsByProduct.hasOwnProperty(product._id)) {
            product.amount = amountsByProduct[product._id];
          }
        });
      }
      if (amount) {
        this.amount = parseFloat(amount);
      } else {
        this.amount = 0;
      }
      if (totalCart) {
        this.totalCart = parseFloat(totalCart);
      } else {
        this.totalCart = 0;
      }
      if (this.cart.length == 0) {
        this.totalCart = 0;
      }
      this.cart.forEach((product) => {
        const productInList = this.products.find((p) => p._id == product._id);
        if (productInList) {
          product.amount = amountsByProduct[product._id];
          product.disponibles = productInList.disponibles;
        }
      });
    },
    addToCart(product) {
      if (product.disponibles > 0) {
        const prodCart = this.cart.find((p) => p._id == product._id);
        if (prodCart) {
          if (product.disponibles >= 1) {
            product.disponibles--;
          }
          if (product.amount >= 0) {
            prodCart.amount += product.amount;
            this.totalCart += product.precio;
          }
        } else {
          product.disponibles--;
          if (product.disponibles >= 0) {
            product.amount = 1;
            this.totalCart += product.precio;
            this.cart.push(product);
          }
        }
        const index = this.products.findIndex((p) => p._id == product._id);
        if (index != -1) {
          this.products[index].disponibles = product.disponibles;
        }
        this.saveCart();
      }
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("totalCart", this.totalCart.toString());
      localStorage.setItem("amount", this.amount.toString());
      const amountsByProduct = {};
      this.cart.forEach((product) => {
        amountsByProduct[product._id] = product.amount;
      });
      localStorage.setItem(
        "amountsByProduct",
        JSON.stringify(amountsByProduct)
      );
    },
    plusAmount(product) {
      if (product.disponibles > 0) {
        product.amount++;
        product.disponibles--;
        const productInCart = { ...product };
        const prodCart = this.cart.find((p) => p._id == productInCart._id);
        if (prodCart) {
          prodCart.amount = productInCart.amount;
        } else {
          this.cart.push(productInCart);
        }
        const index = this.products.findIndex((p) => p._id == product._id);
        if (index != -1) {
          this.products[index].disponibles = product.disponibles;
        }
        this.totalCart += product.precio;
        this.saveCart();
      }
    },
    minusAmount(product) {
      if (product.amount > 1) {
        product.amount--;
        product.disponibles++;
        const index = this.products.findIndex((p) => p._id == product._id);
        if (index !== -1) {
          this.products[index].disponibles = product.disponibles;
        }
        const cartIndex = this.cart.findIndex((p) => p._id == product._id);
        if (cartIndex !== -1) {
          this.totalCart -= product.precio;
          this.cart[cartIndex].amount = product.amount;
        }
        this.saveCart();
      }
    },
    deleteProduct(product) {
      const index = this.cart.findIndex((p) => p._id == product._id);
      if (index !== -1) {
        const indexInProducts = this.products.findIndex(
          (p) => p._id === product._id
        );
        if (indexInProducts !== -1) {
          this.products[indexInProducts].disponibles += product.amount;
        }
        this.totalCart -= product.amount * product.precio;
        this.cart.splice(index, 1);
        product.amount = 0;
        this.saveCart();
      }
    },
    emptyCart() {
      this.cart = [];
      this.totalCart = 0;
      this.amountsByProduct = {};
      this.products.forEach((product) => {
        product.amount = 0;
        product.disponibles = product.availableInitials;
      });
      this.saveCart();
    },
    pay() {
      Swal.fire({
        title: "Pago Exitoso",
        text: "¡Gracias por tu compra! El pago se realizó exitosamente.",
        icon: "success",
        confirmButtonColor: "#66b100",
        background: "#202126",
        didRender: this.customizeAlertContainer,
      });
      this.emptyCart();
    },
    subscribe() {
      if (this.email.trim() == "") {
        this.showErrorAlert("Por favor, ingresa un correo electrónico.");
      } else if (!this.isValidEmail(this.email)) {
        this.showErrorAlert("Por favor, ingresa un correo electrónico válido.");
      } else {
        this.showSuccessAlert(
          "¡Gracias por suscribirte!",
          "Bienvenido a nuestra comunidad. Estarás al tanto de las últimas ofertas y novedades. ¡Esperamos que disfrutes de la experiencia de compra en nuestra tienda!"
        );
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
        didRender: this.customizeAlertContainer,
      });
    },
    showErrorAlert(errorMessage) {
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        background: "#202126",
        confirmButtonColor: "#66b100",
        didRender: this.customizeAlertContainer,
      });
    },
    customizeAlertContainer() {
      const container = Swal.getPopup();
      container.style.color = "#66b100";
    },
    enviar() {
      if (!this.validateEmail(this.emailUsuario)) {
        Swal.fire({
          title: "Error",
          text: "El formato del correo electrónico es inválido. Por favor, corríjalo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!this.validatePhoneNumber(this.telefonoUsuario)) {
        Swal.fire({
          title: "Error",
          text: "El número de teléfono es inválido. Debe contener solo números.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (
        !this.nombreUsuario &&
        !this.emailUsuario &&
        !this.telefonoUsuario &&
        this.tipoMasc === "opciones" &&
        !this.comentarios
      ) {
        Swal.fire({
          title: "Error",
          text: "Por favor, completa al menos un campo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else if (
        !this.nombreUsuario ||
        !this.emailUsuario ||
        !this.telefonoUsuario ||
        this.tipoMasc === "opciones" ||
        !this.comentarios
      ) {
        let errorMessage = "Por favor, completa todos los campos.";
        if (!this.nombreUsuario) {
          errorMessage = "Falta el nombre. " + errorMessage;
        } else if (!this.emailUsuario) {
          errorMessage = "Falta el email. " + errorMessage;
        } else if (!this.telefonoUsuario) {
          errorMessage = "Falta el teléfono. " + errorMessage;
        } else if (this.tipoMasc === "opciones") {
          errorMessage = "Seleccione el tipo de mascota. " + errorMessage;
        } else if (!this.comentarios) {
          errorMessage = "Faltan los comentarios. " + errorMessage;
        }
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "¡Datos Enviados!",
          text: "Pronto nos pondremos en contacto contigo.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9]+$/;
      return phoneRegex.test(phoneNumber);
    },
  },
}).mount("#app");
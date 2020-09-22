const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
    formulario.addEventListener("submit", agregarGasto);
}

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const { presupuesto, restante } = cantidad;

        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");

        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        divMensaje.textContent = mensaje;

        document.querySelector(".primario").insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

const userInterface = new UI();
let presupuesto;

function preguntarPresupuesto() {
    const presupuestoUsuario = Number(prompt("¿Cuál es tu presupuesto?"));

    if (
        presupuestoUsuario == "" ||
        presupuestoUsuario == null ||
        isNaN(presupuestoUsuario) ||
        presupuestoUsuario == 0
    ) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    userInterface.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector("#gasto").value;
    const cantidad = document.querySelector("#cantidad").value;

    if (nombre === "" || cantidad === "") {
        userInterface.imprimirAlerta("Ambos campos son obligatorios", "error");
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        userInterface.imprimirAlerta("Cantidad no válida", "error");
        return;
    }
}

// Clase fruta
class Fruit {
   constructor(name, quantity) {
      this.name = name;
      this.quantity = quantity;
   }
}

//CRUD
class FruitManager {
   constructor() {
      this.fruits = [];
   }
   // Guardar en localStorage
   saveToLocalStorage() {
      localStorage.setItem("fruits", JSON.stringify(this.fruits));
   }

   // Cargar desde localStorage
   loadFromLocalStorage() {
      const storedFruits = localStorage.getItem("fruits");
      if (storedFruits) {
         this.fruits = JSON.parse(storedFruits);
         this.displayFruits();
      }
   }

   // Agregar una fruta
   addFruit(fruit) {
      if(fruit.name === "" || fruit.quantity === "") {
          alert("Por favor, llene todos los campos");
          return;
      }
      this.fruits.push(fruit);
      this.displayFruits();
      this.saveToLocalStorage();
   }

   // Actualizar una fruta
   updateFruit(index, updatedFruit) {
      this.fruits[index] = updatedFruit;
      this.displayFruits();
      this.saveToLocalStorage();
   }

   // Eliminar una fruta
   deleteFruit(index) {
      this.fruits.splice(index, 1);
      this.displayFruits();
      this.saveToLocalStorage();
   }

   // Mostrar las frutas en la tabla
   displayFruits() {
      const fruitTableBody = document.querySelector("#fruitTable tbody");
      fruitTableBody.innerHTML = "";

      this.fruits.forEach((fruit, index) => {
         const row = document.createElement("tr");

         row.innerHTML = `
              <td>${fruit.name}</td>
              <td>${fruit.quantity}</td>
              <td>
                  <button class="edit btn btn-primary" data-index="${index}">Editar</button>
                  <button class="delete btn btn-danger" data-index="${index}">Eliminar</button>
              </td>
          `;

         fruitTableBody.appendChild(row);
      });

      this.addEventListeners();
   }

   //Botones de editar y eliminar
   addEventListeners() {
      document.querySelectorAll(".edit").forEach((button) => {
         button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            this.editFruit(index);
         });
      });

      document.querySelectorAll(".delete").forEach((button) => {
         button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            this.deleteFruit(index);
         });
      });
   }

   // Editar una fruta
   editFruit(index) {
      const fruit = this.fruits[index];
      document.getElementById("name").value = fruit.name;
      document.getElementById("quantity").value = fruit.quantity;

      document.getElementById("fruitForm").onsubmit = (e) => {
         e.preventDefault();
         const name = document.getElementById("name").value;
         const quantity = document.getElementById("quantity").value;
         const updatedFruit = new Fruit(name, quantity);
         this.updateFruit(index, updatedFruit);
         document.getElementById("fruitForm").reset();
         document.getElementById("fruitForm").onsubmit =
            this.handleSubmit.bind(this);
      };
   }

   // Envío del formulario
   handleSubmit(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const quantity = document.getElementById("quantity").value;
      const fruit = new Fruit(name, quantity);
      this.addFruit(fruit);
      document.getElementById("fruitForm").reset();
   }
}

const fruitManager = new FruitManager();
fruitManager.loadFromLocalStorage();

document.getElementById("fruitForm").onsubmit =
   fruitManager.handleSubmit.bind(fruitManager);

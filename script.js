document.addEventListener("DOMContentLoaded", () => {
  const itemsList = document.querySelector(".plates");
  const addItems = document.querySelector(".add-items");
  let items = JSON.parse(localStorage.getItem("items")) || [];

  const clearAllButton = document.querySelector(".clear-all");
  const checkAllButton = document.querySelector(".check-all");
  const uncheckAllButton = document.querySelector(".uncheck-all");

  function addItem(e) {
    e.preventDefault();
    const text = this.querySelector("[name=item]").value;
    const item = {
      text,
      done: false,
    };
    items.push(item);
    populateList(items, itemsList);
    updateLocalStorage();
    this.reset();
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates
      .map((plate, i) => {
        return `
            <li>
              <input type= "checkbox" data-index=${i} id= "item${i}" ${
          plate.done ? "checked" : " "
        }/>
              <label for= "item${i}">${plate.text}</label>
            </li>
            `;
      })
      .join("");
  }

  function toggleDone(e) {
    if (!e.target.matches("input")) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    updateLocalStorage();
    populateList(items, itemsList);
  }

  function updateLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
  }

  addItems.addEventListener("submit", addItem);
  itemsList.addEventListener("click", toggleDone);

  populateList(items, itemsList);

  function clearAllItems() {
    items = []; // Clear the items array
    populateList(items, itemsList);
    updateLocalStorage();
  }

  function checkAllItems() {
    items.forEach((item) => (item.done = true)); // Set all items as done
    populateList(items, itemsList);
    updateLocalStorage();
  }

  function uncheckAllItems() {
    items.forEach((item) => (item.done = false)); // Set all items as not done
    populateList(items, itemsList);
    updateLocalStorage();
  }

  clearAllButton.addEventListener("click", clearAllItems);
  checkAllButton.addEventListener("click", checkAllItems);
  uncheckAllButton.addEventListener("click", uncheckAllItems);
});

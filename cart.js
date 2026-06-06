const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const section = document.querySelector(".container-for-catalog");
if (!currentUser) {
  section.innerHTML = `
      <div style="text-align: center; margin-top: 50px;">
        <h2>Please authorize to see your Cart</h2>
        <button class="my-custom-button" onclick="location.href='auth.html'" style="margin-top: 15px;">Login Page</button>
      </div>
    `;
}
const container = document.createElement("div");
container.className = "container-for-catalog-cards";
section.appendChild(container);

async function loadProduct() {
  try {
    const response = await fetch(
      `http://localhost:3000/cart?userId=${currentUser.id}`,
    );
    if (!response.ok) {
      throw new Error("Ошибка сервера:${response.status}");
    }
    const data = await response.json();

    renderCards(data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}
function renderCards(input) {
  container.innerHTML = "";
  if (!input || input.length === 0) {
    container.innerHTML = "<p>Товары не найдены</p>";
    return;
  }

  input.forEach((element) => {
    const currentAmount = element.amount || 1;
    const card = document.createElement("div");

    card.className = "container-for-every-card-mets";
    container.appendChild(card);
    const buyBtn = document.createElement("button");
    buyBtn.className = "buy-button-on-img";
    buyBtn.textContent = "Buy";
    buyBtn.addEventListener("click", () => {
      processPurchase(element);
    });
    card.appendChild(buyBtn);
    const image = document.createElement("img");
    image.className = "acne1";
    card.appendChild(image);
    image.src = element.photo;
    const text1 = document.createElement("p");
    text1.className = "item-first-card-mets";
    card.appendChild(text1);
    text1.textContent = element.name;
    const text2 = document.createElement("p");
    text2.className = "item-first-card-mets1";
    card.appendChild(text2);
    text2.textContent = element.description;
    const button = document.createElement("div");
    button.className = "container-for-button-catalog2";
    card.appendChild(button);
    const text_button = document.createElement("button");
    text_button.className = "button-emo itame-for-button-catalog";
    button.appendChild(text_button);
    text_button.textContent = "🗑️";
    text_button.addEventListener("click", () => {
      Delete(element);
    });
    const container_amount = document.createElement("div");
    container_amount.className = "container-buttons-amount";
    button.appendChild(container_amount);
    const plus = document.createElement("button");
    plus.className = "button-emo itame-for-button-catalog";
    plus.textContent = "+";
    container_amount.appendChild(plus);
    plus.addEventListener("click", () => {
      UpdateAmount(element.id, currentAmount + 1);
    });
    const amountText = document.createElement("span");
    amountText.textContent = currentAmount;

    container_amount.appendChild(amountText);
    const minus = document.createElement("button");
    minus.className = "button-emo itame-for-button-catalog";
    minus.textContent = "-";
    container_amount.appendChild(minus);
    minus.addEventListener("click", () => {
      if (currentAmount > 1) {
        UpdateAmount(element.id, currentAmount - 1);
      } else {
        Delete(element);
      }
    });
    const cost = document.createElement("p");
    cost.className = "itame-for-button-for-last3cardmets1";
    button.appendChild(cost);
    const price = parseFloat(element.cost);
    const total = price * currentAmount;
    cost.textContent = total + "$";
  });
}

async function processPurchase(product) {
  try {
    const orderData = {
      userId: currentUser.id,
      items: [
        {
          productId: product.productId,
          name: product.name,
          cost: product.cost,
          amount: product.amount || 1,
        },
      ],
      date: new Date().toLocaleDateString(),
    };
    const url = await fetch(`http://localhost:3000/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!url.ok) {
      throw new Error("Не удалось создать заказ в базе");
    }
    await fetch(`http://localhost:3000/cart/${product.id}`, {
      method: "DELETE",
    });
    alert("Покупка успешно оформлена!");
    loadProduct();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при оформлении покупки");
  }
}
async function Delete(product) {
  try {
    const url = await fetch(`http://localhost:3000/cart/${product.id}`, {
      method: "DELETE",
    });
    if (!url.ok) {
      throw new Error("Не удалось удалить товар из корзины");
    }

    alert(`Товар "${product.name}" удалено из корзины!`);
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при удалении из корзины");
  }
}
async function UpdateAmount(id, amount) {
  try {
    const response = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при обновлении количества");
    }
    loadProduct();
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

loadProduct();

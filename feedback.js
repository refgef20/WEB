document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Пожалуйста, сначала авторизуйтесь!");
    location.href = "auth.html";
    return;
  }

  if (currentUser.role === "admin") {
    alert("Администраторы не могут оставлять отзывы!");
    location.href = "index.html";
    return;
  }

  const productSelect = document.getElementById("review-product");
  const reviewText = document.getElementById("review-text");
  const charCounter = document.getElementById("char-counter");
  const feedbackSubmitBtn = document.getElementById("feedback-submit-btn");
  const feedbackForm = document.getElementById("feedback-form");

  const ordersResponse = await fetch(
    `http://localhost:3000/orders?userId=${currentUser.id}`,
  );
  const orders = await ordersResponse.json();

  const purchasedProductIds = new Set();
  orders.forEach((order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item) => purchasedProductIds.add(item.productId));
    } else if (order.productId) {
      purchasedProductIds.add(order.productId);
    }
  });

  const productsResponse = await fetch("http://localhost:3000/products");
  const products = await productsResponse.json();

  products.forEach((p) => {
    if (purchasedProductIds.has(p.id)) {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.dataset.name = p.name;
      opt.textContent = p.name;
      productSelect.appendChild(opt);
    }
  });

  if (productSelect.options.length === 1) {
    const opt = document.createElement("option");
    opt.disabled = true;
    opt.textContent = "Вы еще ничего не купили в магазине!";
    productSelect.appendChild(opt);
  }

  reviewText.addEventListener("input", () => {
    const len = reviewText.value.length;
    charCounter.textContent = `Symbols: ${len}`;

    if (len >= 20 && productSelect.value !== "") {
      feedbackSubmitBtn.disabled = false;
    } else {
      feedbackSubmitBtn.disabled = true;
    }
  });

  productSelect.addEventListener("change", () => {
    if (reviewText.value.length >= 20 && productSelect.value !== "") {
      feedbackSubmitBtn.disabled = false;
    } else {
      feedbackSubmitBtn.disabled = true;
    }
  });

  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const newFeedback = {
      userId: currentUser.id,
      username: currentUser.username,
      productId: productSelect.value,
      productName: selectedOption.dataset.name,
      text: reviewText.value.trim(),
      date: new Date().toLocaleDateString(),
    };

    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });

      if (!response.ok) throw new Error("Не удалось опубликовать отзыв");

      alert("Отзыв успешно добавлен!");
      location.href = "index.html";
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении отзыва.");
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "admin") {
    alert("Доступ запрещен!");
    location.href = "index.html";
    return;
  }

  const productForm = document.getElementById("product-form");
  const formModeTitle = document.getElementById("form-mode-title");
  const prodIdInput = document.getElementById("prod-id");
  const prodNameInput = document.getElementById("prod-name");
  const prodCostInput = document.getElementById("prod-cost");
  const prodDescInput = document.getElementById("prod-desc");
  const prodCategorySelect = document.getElementById("prod-category");
  const prodPhotoInput = document.getElementById("prod-photo");
  const productSubmitBtn = document.getElementById("product-submit-btn");

  const productsContainer = document.getElementById("admin-products-container");
  const reviewsContainer = document.getElementById("admin-reviews-container");

  const filterByProduct = document.getElementById("filter-by-product");
  const filterByUser = document.getElementById("filter-by-user");

  // Динамическая валидация формы создания товара
  function showError(input, text) {
    let errorSpan = input.parentNode.querySelector(".error-message");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      input.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = text;
    errorSpan.style.display = "block";
  }

  function hideError(input) {
    const errorSpan = input.parentNode.querySelector(".error-message");
    if (errorSpan) {
      errorSpan.style.display = "none";
    }
  }

  [prodNameInput, prodCostInput, prodDescInput, prodPhotoInput].forEach(
    (el) => {
      el.addEventListener("input", () => {
        hideError(el);
        validateProductForm();
      });
    },
  );

  function validateProductForm() {
    let isValid = true;
    if (!prodNameInput.value.trim()) isValid = false;

    const cost = parseFloat(prodCostInput.value);
    if (isNaN(cost) || cost <= 0) isValid = false;

    if (!prodDescInput.value.trim()) isValid = false;
    if (!prodPhotoInput.value.trim()) isValid = false;

    productSubmitBtn.disabled = !isValid;
  }

  // Загрузка товаров в селект и каталог
  async function loadCatalog() {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();

    productsContainer.innerHTML = "";
    filterByProduct.innerHTML = `<option value="">-- All Products --</option>`;

    products.forEach((p) => {
      // Рендерим карточку товара
      const card = document.createElement("div");
      card.className = "prod-card";
      card.innerHTML = `
        <img src="${p.photo}" alt="" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
        <h4 style="margin: 8px 0 4px 0;">${p.name}</h4>
        <p style="font-weight: bold; margin-bottom: 10px;">${p.cost}$</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button class="my-custom-button edit-btn" style="padding: 5px 10px; font-size: 13px;">Edit</button>
          <button class="my-custom-button delete-btn" style="padding: 5px 10px; font-size: 13px; background-color: palevioletred; color: white;">Delete</button>
        </div>
      `;

      card.querySelector(".edit-btn").addEventListener("click", () => {
        formModeTitle.textContent = `Edit Product: ${p.name}`;
        prodIdInput.value = p.id;
        prodNameInput.value = p.name;
        prodCostInput.value = p.cost;
        prodDescInput.value = p.description;
        prodCategorySelect.value = p.category;
        prodPhotoInput.value = p.photo;
        validateProductForm();
      });

      card.querySelector(".delete-btn").addEventListener("click", async () => {
        if (confirm(`Удалить товар "${p.name}"?`)) {
          await fetch(`http://localhost:3000/products/${p.id}`, {
            method: "DELETE",
          });
          loadCatalog();
        }
      });

      productsContainer.appendChild(card);

      // Добавление в селекты отзывов
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      filterByProduct.appendChild(opt);
    });
  }

  // Загрузка пользователей
  async function loadUsers() {
    const response = await fetch("http://localhost:3000/users?role=client");
    const clients = await response.json();
    filterByUser.innerHTML = `<option value="">-- All Clients --</option>`;
    clients.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `@${c.username} (${c.firstName} ${c.lastName})`;
      filterByUser.appendChild(opt);
    });
  }

  // Создание/Обновление товара
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const costValue = parseFloat(prodCostInput.value);

    const productData = {
      name: prodNameInput.value.trim(),
      cost: costValue,
      description: prodDescInput.value.trim(),
      category: prodCategorySelect.value,
      photo: prodPhotoInput.value.trim(),
      rating: 5.0,
    };

    const editId = prodIdInput.value;

    try {
      if (editId) {
        // PUT-запрос
        await fetch(`http://localhost:3000/products/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        alert("Товар обновлен!");
      } else {
        // POST-запрос
        await fetch(`http://localhost:3000/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        alert("Товар успешно добавлен в систему!");
      }

      productForm.reset();
      prodIdInput.value = "";
      formModeTitle.textContent = "Create New Product";
      productSubmitBtn.disabled = true;
      loadCatalog();
    } catch (err) {
      console.error(err);
    }
  });

  // Загрузка и удаление отзывов
  async function loadReviews() {
    let url = "http://localhost:3000/feedback?";
    const prodVal = filterByProduct.value;
    const userVal = filterByUser.value;

    if (prodVal) url += `productId=${prodVal}&`;
    if (userVal) url += `userId=${userVal}&`;

    const response = await fetch(url);
    const reviews = await response.json();

    reviewsContainer.innerHTML = "";
    if (reviews.length === 0) {
      reviewsContainer.innerHTML = "<p>Отзывов не найдено.</p>";
      return;
    }

    reviews.forEach((r) => {
      const item = document.createElement("div");
      item.className = "feedback-item";
      item.innerHTML = `
        <div>
          <p><strong>Product:</strong> ${r.productName}</p>
          <p><strong>Author:</strong> @${r.username}</p>
          <p style="margin: 6px 0;">"${r.text}"</p>
          <small style="color: #666;">Date: ${r.date}</small>
        </div>
        <button class="my-custom-button delete-feed-btn" style="background-color: palevioletred; color: white;">Delete</button>
      `;

      item
        .querySelector(".delete-feed-btn")
        .addEventListener("click", async () => {
          if (confirm("Вы действительно хотите удалить этот отзыв?")) {
            await fetch(`http://localhost:3000/feedback/${r.id}`, {
              method: "DELETE",
            });
            loadReviews();
          }
        });

      reviewsContainer.appendChild(item);
    });
  }

  filterByProduct.addEventListener("change", loadReviews);
  filterByUser.addEventListener("change", loadReviews);

  loadCatalog();
  loadUsers();
  loadReviews();
});

document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "admin") {
    alert("Доступ запрещен!");
    location.href = "../main.HTML";
    return;
  }

  // Вкладки
  const tabProducts = document.getElementById("tab-products-btn");
  const tabServices = document.getElementById("tab-services-btn");
  const productsSection = document.getElementById("products-admin-section");
  const servicesSection = document.getElementById("services-admin-section");

  tabProducts.addEventListener("click", () => {
    tabProducts.classList.add("active");
    tabServices.classList.remove("active");
    productsSection.classList.remove("hidden");
    servicesSection.classList.add("hidden");
  });

  tabServices.addEventListener("click", () => {
    tabServices.classList.add("active");
    tabProducts.classList.remove("active");
    servicesSection.classList.remove("hidden");
    productsSection.classList.add("hidden");
  });

  // Элементы формы товаров
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

  // Элементы формы услуг
  const serviceForm = document.getElementById("service-form");
  const serviceFormModeTitle = document.getElementById(
    "service-form-mode-title",
  );
  const servIdInput = document.getElementById("serv-id");
  const servTitleInput = document.getElementById("serv-title");
  const servPhotoInput = document.getElementById("serv-photo");
  const servDescInput = document.getElementById("serv-desc");
  const servStashName = document.getElementById("serv-stash-name");
  const servStashPrice = document.getElementById("serv-stash-price");
  const servMastName = document.getElementById("serv-mast-name");
  const servMastPrice = document.getElementById("serv-mast-price");
  const servProName = document.getElementById("serv-pro-name");
  const servProPrice = document.getElementById("serv-pro-price");
  const serviceSubmitBtn = document.getElementById("service-submit-btn");
  const servicesContainer = document.getElementById("admin-services-container");

  const reviewsContainer = document.getElementById("admin-reviews-container");
  const filterByProduct = document.getElementById("filter-by-product");
  const filterByUser = document.getElementById("filter-by-user");

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

  // Валидация товаров
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

  // Валидация услуг
  const servInputs = [
    servTitleInput,
    servPhotoInput,
    servDescInput,
    servStashName,
    servStashPrice,
    servMastName,
    servMastPrice,
    servProName,
    servProPrice,
  ];
  servInputs.forEach((el) => {
    el.addEventListener("input", () => {
      hideError(el);
      validateServiceForm();
    });
  });

  function validateServiceForm() {
    let isValid = true;
    if (!servTitleInput.value.trim()) isValid = false;
    if (!servPhotoInput.value.trim()) isValid = false;
    if (!servDescInput.value.trim()) isValid = false;
    if (
      !servStashName.value.trim() ||
      isNaN(parseFloat(servStashPrice.value)) ||
      parseFloat(servStashPrice.value) <= 0
    )
      isValid = false;
    if (
      !servMastName.value.trim() ||
      isNaN(parseFloat(servMastPrice.value)) ||
      parseFloat(servMastPrice.value) <= 0
    )
      isValid = false;
    if (
      !servProName.value.trim() ||
      isNaN(parseFloat(servProPrice.value)) ||
      parseFloat(servProPrice.value) <= 0
    )
      isValid = false;

    serviceSubmitBtn.disabled = !isValid;
  }

  // Загрузка каталога товаров
  async function loadCatalog() {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();

    productsContainer.innerHTML = "";
    filterByProduct.innerHTML = `<option value="">Все товары</option>`;

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "prod-card";
      card.innerHTML = `
        <img src="${p.photo}" alt="">
        <h4>${p.name}</h4>
        <p class="card-price">${p.price} ₽</p>
        <div class="card-actions">
          <button class="edit-btn-style edit-btn">Ред.</button>
          <button class="delete-btn-style delete-btn">Удалить</button>
        </div>
      `;

      card.querySelector(".edit-btn").addEventListener("click", () => {
        formModeTitle.textContent = `Редактирование: ${p.name}`;
        prodIdInput.value = p.id;
        prodNameInput.value = p.name;
        prodCostInput.value = p.price;
        prodDescInput.value = p.description;
        prodCategorySelect.value = p.category;
        prodPhotoInput.value = p.photo;
        validateProductForm();
        tabProducts.click();
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

      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      filterByProduct.appendChild(opt);
    });
  }

  // Загрузка услуг
  async function loadServices() {
    const response = await fetch("http://localhost:3000/services");
    const services = await response.json();

    servicesContainer.innerHTML = "";
    services.forEach((s) => {
      // Формируем детальное отображение категорий (подкатегорий) услуги
      let subcategoriesHTML = "";
      if (s.subcategories && s.subcategories.length > 0) {
        subcategoriesHTML = `
          <div class="admin-service-subcategories">
            ${s.subcategories
              .map(
                (sub) => `
              <div class="admin-subcat-block">
                <p class="admin-subcat-title">${sub.title}</p>
                <ul class="admin-subcat-items">
                  ${sub.items
                    .map(
                      (item) => `
                    <li>${item.name}: <span class="admin-price-badge">${item.price} ₽</span></li>
                  `,
                    )
                    .join("")}
                </ul>
              </div>
            `,
              )
              .join("")}
          </div>
        `;
      } else {
        // Запасной вариант (для базовой структуры услуги без подкатегорий)
        subcategoriesHTML = `
          <div class="admin-service-subcategories">
            <div class="admin-subcat-block">
              <p class="admin-subcat-title">Базовые тарифы</p>
              <ul class="admin-subcat-items">
                <li>${s.fromstash || "Услуга у стажёра"}: <span class="admin-price-badge">${s.startingPricestach || s.price || 0} ₽</span></li>
                <li>${s.frommast || "Услуга у мастера"}: <span class="admin-price-badge">${s.startingPricemast || s.price || 0} ₽</span></li>
                <li>${s.frompro || "Услуга у профи"}: <span class="admin-price-badge">${s.startingPricepro || s.price || 0} ₽</span></li>
              </ul>
            </div>
          </div>
        `;
      }

      const card = document.createElement("div");
      card.className = "prod-card";
      card.innerHTML = `
        <img src="${s.photo}" alt="">
        <h4>${s.title}</h4>
        <p class="card-price">от ${s.startingPricestach} ₽</p>
        ${subcategoriesHTML}
        <div class="card-actions">
          <button class="edit-btn-style edit-serv-btn">Ред.</button>
          <button class="delete-btn-style delete-serv-btn">Удалить</button>
        </div>
      `;

      card.querySelector(".edit-serv-btn").addEventListener("click", () => {
        serviceFormModeTitle.textContent = `Редактирование: ${s.title}`;
        servIdInput.value = s.id;
        servTitleInput.value = s.title;
        servPhotoInput.value = s.photo;
        servDescInput.value = s.description;
        servStashName.value = s.fromstash;
        servStashPrice.value = s.startingPricestach;
        servMastName.value = s.frommast;
        servMastPrice.value = s.startingPricemast;
        servProName.value = s.frompro;
        servProPrice.value = s.startingPricepro;
        validateServiceForm();
        tabServices.click();
      });

      card
        .querySelector(".delete-serv-btn")
        .addEventListener("click", async () => {
          if (confirm(`Удалить услугу "${s.title}"?`)) {
            await fetch(`http://localhost:3000/services/${s.id}`, {
              method: "DELETE",
            });
            loadServices();
          }
        });

      servicesContainer.appendChild(card);
    });
  }

  // Добавление / Редактирование товаров
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const costValue = parseFloat(prodCostInput.value);

    const productData = {
      name: prodNameInput.value.trim(),
      price: costValue,
      description: prodDescInput.value.trim(),
      category: prodCategorySelect.value,
      photo: prodPhotoInput.value.trim(),
      rating: 5.0,
    };

    const editId = prodIdInput.value;

    try {
      if (editId) {
        await fetch(`http://localhost:3000/products/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        alert("Товар обновлен!");
      } else {
        await fetch(`http://localhost:3000/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        alert("Товар успешно добавлен в систему!");
      }

      productForm.reset();
      prodIdInput.value = "";
      formModeTitle.textContent = "Создать новый товар";
      productSubmitBtn.disabled = true;
      loadCatalog();
    } catch (err) {
      console.error(err);
    }
  });

  // Добавление / Редактирование услуг
  serviceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editId = servIdInput.value;
    let existingSubcategories = [];

    // При изменении услуги извлечем её текущие категории, чтобы не стереть их
    if (editId) {
      try {
        const getRes = await fetch(`http://localhost:3000/services/${editId}`);
        const currentServ = await getRes.json();
        existingSubcategories = currentServ.subcategories || [];
      } catch (err) {
        console.error("Ошибка получения подкатегорий:", err);
      }
    }

    const serviceData = {
      title: servTitleInput.value.trim(),
      photo: servPhotoInput.value.trim(),
      description: servDescInput.value.trim(),
      fromstash: servStashName.value.trim(),
      startingPricestach: parseFloat(servStashPrice.value),
      frommast: servMastName.value.trim(),
      startingPricemast: parseFloat(servMastPrice.value),
      frompro: servProName.value.trim(),
      startingPricepro: parseFloat(servProPrice.value),
      subcategories: existingSubcategories,
    };

    try {
      if (editId) {
        await fetch(`http://localhost:3000/services/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        });
        alert("Услуга обновлена!");
      } else {
        serviceData.id = servTitleInput.value
          .toLowerCase()
          .replace(/[^a-z0-9]/gi, "_");
        await fetch(`http://localhost:3000/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        });
        alert("Услуга успешно добавлена в систему!");
      }

      serviceForm.reset();
      servIdInput.value = "";
      serviceFormModeTitle.textContent = "Создать новую услугу";
      serviceSubmitBtn.disabled = true;
      loadServices();
    } catch (err) {
      console.error(err);
    }
  });

  async function loadUsers() {
    const response = await fetch("http://localhost:3000/users?role=client");
    const clients = await response.json();
    filterByUser.innerHTML = `<option value="">Все клиенты</option>`;
    clients.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `@${c.username} (${c.firstName} ${c.lastName})`;
      filterByUser.appendChild(opt);
    });
  }

  async function loadReviews() {
    const url = new URL("http://localhost:3000/feedback");
    const prodVal = filterByProduct.value;
    const userVal = filterByUser.value;

    if (prodVal) url.searchParams.set("productId", prodVal);
    if (userVal) url.searchParams.set("userId", userVal);

    const response = await fetch(url);
    const reviews = await response.json();

    reviewsContainer.innerHTML = "";
    if (reviews.length === 0) {
      reviewsContainer.innerHTML =
        "<p style='color:#fff;'>Отзывов не найдено.</p>";
      return;
    }

    reviews.forEach((r) => {
      const item = document.createElement("div");
      item.className = "feedback-item";
      item.style.background = "#222";
      item.style.padding = "15px";
      item.style.borderRadius = "12px";
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.alignItems = "center";
      item.innerHTML = `
        <div style="color:#fff;">
          <p><strong>Товар:</strong> ${r.productName}</p>
          <p><strong>Автор:</strong> @${r.username}</p>
          <p style="margin: 6px 0; font-style: italic;">"${r.text}"</p>
          <small style="color: #888;">Дата: ${r.date}</small>
        </div>
        <button class="my-custom-button delete-feed-btn" style="background-color: palevioletred; color: white; border:none; cursor:pointer; padding:5px 10px;">Удалить</button>
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
  loadServices();
  loadUsers();
  loadReviews();
});

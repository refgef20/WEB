// const cards = [
//   {
//     name: "NEOGEN",
//     cost: "12$",
//     description:
//       "Innovative nitrogen plasma rejuvenation device that uses the power of ionized gas (plasma) to deliver controlled stimulation to the skin.",
//     category: "Acne",
//     rating: 4.7,
//     photo: "images\\noegen.jpg",
//   },
//   {
//     name: "CORSX Centella Blemish Cream",
//     cost: "22$",
//     description:
//       "A classic for spot treatment of inflammation. It doesn't dry out the skin, unlike many pharmacy products.",
//     category: "Acne",
//     rating: 4.9,
//     photo: "images\\centella.jpg",
//   },
//   {
//     name: "Dr.G Red Blemish Clear Soothing Cream",
//     cost: "34$",
//     description:
//       "A light, soothing gel-cream containing a complex of 10 types of centella. It effectively relieves irritation. ",
//     category: "Acne",
//     rating: 4.9,
//     photo: "images\\red.webp",
//   },

//   {
//     name: "Axis-Y Dark Spot Correcting Glow Serum",
//     cost: "20$",
//     description:
//       "A highly effective serum formulated with 5% niacinamide and squalane. It corrects dark spots.",
//     category: "Pigmentation",
//     rating: 4.8,
//     photo: "images\\axis_y.webp",
//   },
//   {
//     name: "Goodal Green Tangerine Vita C Serum",
//     cost: "28$",
//     description:
//       "Packed with 70% green tangerine extract, this gentle vitamin C serum effectively fades acne scars and hyperpigment without irritation.",
//     category: "Pigmentation",
//     rating: 4.7,
//     photo: "images\\goodal_vitac.jpg",
//   },
//   {
//     name: "Hada Labo Shirojyun Premium Lotion",
//     cost: "18$",
//     description:
//       "Contains tranexamic acid and nano-hyaluronic acid to deeply hydrate the skin while actively fading sun spots and preventing future pigment.",
//     category: "Pigmentation",
//     rating: 4.9,
//     photo: "images\\hadalabo.jpg",
//   },
//   {
//     name: "Some By Mi Cica Peptide Anti Hair Loss Tonic",
//     cost: "15$",
//     description:
//       "A cooling scalp tonic enriched with peptides and cica extract to soothe the scalp, nourish hair roots, and significantly reduce hair fallout.",
//     category: "Hair loss",
//     rating: 4.6,
//     photo: "images\\somebymi_tonic.jpg",
//   },
//   {
//     name: "Aromatica Rosemary Root Enhancer",
//     cost: "24$",
//     description:
//       "A direct-to-scalp spray powered by essential oils and rosemary extract to stimulate hair follicles, promote growth, and strengthen weak roots.",
//     category: "Hair loss",
//     rating: 4.8,
//     photo: "images\\aromatica.jpg",
//   },
//   {
//     name: "Lador Dermatical Active Ampoule",
//     cost: "26$",
//     description:
//       "Highly concentrated ampoules with salicylic acid, panthenol, and peptides to deeply exfoliate the scalp, clear build-up, and boost hair density.",
//     category: "Hair loss",
//     rating: 4.7,
//     photo: "images\\lador_ampoule.jpg",
//   },
//   {
//     name: "Paula's Choice 1% Retinol Treatment",
//     cost: "58$",
//     description:
//       "A potent anti-aging serum with 1% retinol and peptides to visibly reduce fine lines, wrinkles, and uneven skin tone.",
//     category: "Ageing",
//     rating: 4.8,
//     photo:
//       "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Drunk Elephant Polypeptide Cream",
//     cost: "68$",
//     description:
//       "A protein-rich moisturizer that combines signal peptides and growth factors to improve skin tone, texture, and firmness.",
//     category: "Ageing",
//     rating: 4.9,
//     photo:
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Estee Lauder Advanced Night Repair Eye",
//     cost: "64$",
//     description:
//       "A supercharged eye gel-cream that targets dark circles, fine lines, and signs of aging around the delicate eye area.",
//     category: "Ageing",
//     rating: 4.7,
//     photo:
//       "data:image/jpeg;base64,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",
//   },
//   {
//     name: "CeraVe Hydrating Facial Cleanser",
//     cost: "16$",
//     description:
//       "A gentle, non-foaming daily cleanser with ceramides and hyaluronic acid that cleanses without disrupting the skin barrier.",
//     category: "Everyday care",
//     rating: 4.9,
//     photo:
//       "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "Beauty of Joseon Relief Sun: Rice + Probiotics",
//     cost: "18$",
//     description:
//       "A lightweight, creamy organic sunscreen that provides high UV protection while nourishing the skin with rice extract.",
//     category: "Everyday care",
//     rating: 4.8,
//     photo:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnK4yNbyHMfOVte-DujPeLF5zSn7cuorfn1Q&s",
//   },
//   {
//     name: "Illiyoon Ceramide Ato Concentrate Cream",
//     cost: "22$",
//     description:
//       "A deeply hydrating, fragrance-free face and body cream designed to soothe and repair dry, sensitive skin for daily use.",
//     category: "Everyday care",
//     rating: 4.7,
//     photo:
//       "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
//   },
// ];
let currentPage = 1;
const limit = 5;
const url = new URL(`http://localhost:3000/products`);
url.searchParams.set("_page", currentPage);
url.searchParams.set("_per_page", limit);

async function loadProduct() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Ошибка сервера:${response.status}");
    }
    const data = await response.json();

    renderCards(data.data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}
const tasks = [
  {
    name: "Cost < 25$",
    action: () => renderCards(cards.filter((c) => parseFloat(c.cost) < 25)),
  },
  {
    name: "Rating > 4.7",
    action: () => renderCards(cards.filter((c) => c.rating > 4.7)),
  },
  {
    name: "Upper Name",
    action: () => {
      let mapped = cards.map((c) => ({ ...c, name: c.name.toUpperCase() }));
      renderCards(mapped);
    },
  },
  {
    name: "Sum Cost",
    action: () => {
      let total = cards.reduce((sum, c) => sum + parseFloat(c.cost), 0);
      alert("Общая стоимость товаров: " + total + "$");
    },
  },
  {
    name: "Exist cost > 50$ ",
    action: () => alert(cards.some((c) => parseFloat(c.cost) > 50)),
  },
  {
    name: "Remove last",
    action: () => {
      cards.pop();
      renderCards(cards);
    },
  },
  {
    name: "Show 3 first",
    action: () => {
      renderCards(cards.slice(0, 3));
    },
  },
  {
    name: "All",
    action: () => {
      renderCards([...cards].reverse());
    },
  },
  {
    name: "Exist 'NEOGEN'",
    action: () => {
      const hasNeogen = cards.map((c) => c.name).includes("NEOGEN");
      alert("Товар NEOGEN в каталоге: " + hasNeogen);
    },
  },
  {
    name: "Index 'Axis-Y'",
    action: () => {
      const index = cards.findIndex(
        (c) => c.name === "Axis-Y Dark Spot Correcting Glow Serum",
      );
      alert("Порядковый номер товара: " + index);
    },
  },
];

function renderCards(input) {
  container.innerHTML = "";
  if (!input || input.length === 0) {
    container.innerHTML = "<p>Товары не найдены</p>";
    return;
  }
  input.forEach((element) => {
    const card = document.createElement("div");
    card.className = "container-for-every-card-mets";
    container.appendChild(card);
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
    button.className = "container-for-button-catalog";
    card.appendChild(button);
    const fc = document.createElement("div");
    fc.className = "container-for-button-catalog1";
    button.appendChild(fc);
    const text_button = document.createElement("button");
    text_button.className = "button-emo itame-for-button-catalog";
    fc.appendChild(text_button);
    text_button.textContent = "🛒";
    text_button.addEventListener("click", () => {
      AddCart(element);
    });
    const h_button = document.createElement("button");
    h_button.className = "button-emo itame-for-button-catalog";
    h_button.addEventListener("click", () => {
      AddFavorite(element);
    });
    fc.appendChild(h_button);
    h_button.textContent = "❤️";
    const cost = document.createElement("p");
    cost.className = "itame-for-button-for-last3cardmets1";
    button.appendChild(cost);
    cost.textContent = element.cost + "$";
  });
}
async function AddCart(product) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Пожалуйста, сначала войдите в систему!");
    location.href = "auth.html";
    return;
  }
  try {
    const filterQuery = JSON.stringify({
      userId: { eq: currentUser.id },
      productId: { eq: product.id },
    });

    const checkRes = await fetch(
      `http://localhost:3000/cart?_where=${encodeURIComponent(filterQuery)}`,
    );

    const existing = await checkRes.json();

    if (existing.length > 0) {
      const item = existing[0];
      const updatedAmount = (item.amount || 1) + 1;
      await fetch(`http://localhost:3000/cart/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: updatedAmount }),
      });
      alert(`Количество товара "${product.name}" в корзине обновлено!`);
    } else {
      const cartItem = {
        userId: currentUser.id,
        productId: product.id,
        name: product.name,
        cost: product.cost,
        description: product.description,
        photo: product.photo,
        amount: 1,
      };
      await fetch(`http://localhost:3000/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      alert(`Товар "${product.name}" добавлен в корзину!`);
    }
  } catch (error) {
    console.error("Ошибка при добавлении в корзину:", error);
  }
}
async function AddFavorite(product) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Пожалуйста, сначала войдите в систему!");
    location.href = "auth.html";
    return;
  }

  try {
    const filterQuery = JSON.stringify({
      userId: { eq: currentUser.id },
      productId: { eq: product.id },
    });

    const checkRes = await fetch(
      `http://localhost:3000/favorites?_where=${encodeURIComponent(filterQuery)}`,
    );
    const existing = await checkRes.json();

    if (existing.length > 0) {
      alert(`Товар "${product.name}" уже добавлен в избранное!`);
      return;
    } else {
      const favItem = {
        userId: currentUser.id,
        productId: product.id,
        name: product.name,
        cost: product.cost,
        description: product.description,
        photo: product.photo,
      };
      await fetch(`http://localhost:3000/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favItem),
      });
      alert(`Товар "${product.name}" добавлен в избранное!`);
    }
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
  }
}
async function sort_cards() {
  // cards.sort((a, b) => {
  //   const priceA = parseFloat(a.cost);
  //   const priceB = parseFloat(b.cost);
  //   return priceA - priceB;
  // });
  // renderCards(cards);
  try {
    const params = { _sort: "cost" };

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const sortCost = await fetch(url);

    if (!sortCost.ok) {
      throw new Error("Ошибка сервера:${sortCost.status}");
    }
    const result = await sortCost.json();
    renderCards(result.data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}
async function nameCards() {
  // cards.sort((a, b) => {
  //   return a.name.localeCompare(b.name);
  // });
  // renderCards(cards);
  try {
    const params = { _sort: "name" };
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
    const sortName = await fetch(url);
    if (!sortName.ok) {
      throw new Error("Ошибка сервера:${sortName.status}");
    }
    const result = await sortName.json();
    renderCards(result.data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}
async function ratingCards() {
  try {
    const params = { _sort: "rating" };
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
    const sortRating = await fetch(url);
    if (!sortRating.ok) {
      throw new Error("Ошибка сервера:${sortName.status}");
    }
    const result = await sortRating.json();
    renderCards(result.data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}
async function sortCategory(category) {
  try {
    const params = { category: category };
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    console.log("ссыдка", url.href);
    const sortCategory = await fetch(url);

    if (!sortCategory.ok) {
      throw new Error("Ошибка сервера:${sortCategory.status}");
    }
    const result = await sortCategory.json();
    renderCards(result.data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}
function list(list_f) {
  if (list_f == "cost") {
    sort_cards();
  }
  if (list_f == "name") {
    nameCards();
  }
  if (list_f == "rating") {
    ratingCards();
  }
}
async function findCard(input) {
  // const inp = input.toLowerCase();
  // const result = cards.filter((item) => {
  //   return (
  //     item.name.toLowerCase().includes(inp) ||
  //     item.description.toLowerCase().includes(inp)
  //   );
  // });
  // renderCards(result);
  try {
    const params = {
      _where: JSON.stringify({
        or: [
          { name: { contains: input } },
          { description: { contains: input } },
        ],
      }),
    };
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
    const findResult = await fetch(url);
    if (!findResult.ok) {
      throw new Error("Ошибка сервера:${findResult.status}");
    }
    const result = await findResult.json();

    renderCards(result.data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    container.innerHTML =
      "<p>Упс! Что-то пошло не так с загрузкой товаров.</p>";
  }
}

function applyPriceFilter() {
  const min = inputMin.value;
  const max = inputMax.value;
  if (min) url.searchParams.set("cost:gte", min);
  else url.searchParams.delete("cost:gte");

  if (max) url.searchParams.set("cost:lte", max);
  else url.searchParams.delete("cost:lte");
  loadProduct();
}

loadProduct();
const section = document.querySelector(".container-for-catalog");
const buttons = document.createElement("div");
buttons.className = "container-for-buttons";
section.appendChild(buttons);
const find = document.createElement("input");
find.className = "find-card";
find.placeholder = "🔍";
find.addEventListener("input", function () {
  findCard(find.value);
});
buttons.appendChild(find);

const list_filter = document.createElement("select");
list_filter.className = "category-filter";
const sort = document.createElement("option");
sort.textContent = "Sort by";
buttons.appendChild(list_filter);

const button_sort = document.createElement("option");
button_sort.value = "Cost";
button_sort.textContent = "Cost";
const button_resort = document.createElement("option");
button_resort.value = "Name";
button_resort.textContent = "Name";
const button_category = document.createElement("option");
button_category.value = "Rating";
button_category.textContent = "Rating";
list_filter.addEventListener("change", function () {
  const list_f = list_filter.value.toLowerCase();
  list(list_f);
});
list_filter.appendChild(sort);
list_filter.appendChild(button_sort);
list_filter.appendChild(button_resort);
list_filter.appendChild(button_category);

const priceFilterContainer = document.createElement("div");
priceFilterContainer.className = "container-for-buttons";
buttons.appendChild(priceFilterContainer);
const inputMin = document.createElement("input");
inputMin.type = "number";
inputMin.placeholder = "Min $";
inputMin.className = "find-card";
inputMin.style.maxWidth = "180px";
const inputMax = document.createElement("input");
inputMax.type = "number";
inputMax.placeholder = "Max $";
inputMax.className = "find-card";
inputMax.style.maxWidth = "180px";
inputMin.addEventListener("input", applyPriceFilter);
inputMax.addEventListener("input", applyPriceFilter);

priceFilterContainer.appendChild(inputMin);
priceFilterContainer.appendChild(inputMax);

const containernav = document.createElement("ul");
containernav.className = "nav-bar-for-mets";
section.appendChild(containernav);

const acne = document.createElement("li");
acne.classList.add("button-for-nav-second", "item-for-nav-mets-last3");
acne.textContent = "Acne";
acne.addEventListener("click", () => {
  sortCategory("Acne");
});
containernav.appendChild(acne);

const pigmentation = document.createElement("li");
pigmentation.classList.add("button-for-nav-second", "item-for-nav-mets-last3");
pigmentation.textContent = "Pigmentation";
pigmentation.addEventListener("click", () => {
  sortCategory("Pigmentation");
});
containernav.appendChild(pigmentation);

const hair = document.createElement("li");
hair.classList.add("button-for-nav-second", "item-for-nav-mets-last3");
hair.textContent = "Hair loss";
hair.addEventListener("click", () => {
  sortCategory("Hair loss");
});
containernav.appendChild(hair);

const ageing = document.createElement("li");
ageing.classList.add("button-for-nav-second", "item-for-nav-mets-last3");
ageing.textContent = "Ageing";
ageing.addEventListener("click", () => {
  sortCategory("Ageing");
});
containernav.appendChild(ageing);

const ecare = document.createElement("li");
ecare.classList.add("button-for-nav-second", "item-for-nav-mets-last3");
ecare.textContent = "Everyday care";
ecare.addEventListener("click", () => {
  sortCategory("Everyday care");
});
containernav.appendChild(ecare);
const container = document.createElement("div");
container.className = "container-for-catalog-cards";
section.appendChild(container);
loadProduct();
const container_buttonPag = document.createElement("div");
container_buttonPag.className = "container-buttons";
section.appendChild(container_buttonPag);
const btnPrev = document.createElement("button");
btnPrev.textContent = "Back";
btnPrev.className = "my-custom-button";
btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    url.searchParams.set("_page", currentPage);
    loadProduct();
  } else {
    btnPrev.disabled;
  }
});
const btnNext = document.createElement("button");
btnNext.textContent = "Next";
btnNext.className = "my-custom-button";
btnNext.addEventListener("click", () => {
  if (currentPage < 3) {
    currentPage++;
    url.searchParams.set("_page", currentPage);
    loadProduct();
  } else {
    btnNext.disabled;
  }
});
container_buttonPag.appendChild(btnPrev);
container_buttonPag.appendChild(btnNext);

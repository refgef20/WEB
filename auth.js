const TOP_100_PASSWORDS_2024 = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "123456789",
  "12345",
  "1234567890",
  "1234567",
  "555555",
  "111111",
  "admin",
  "welcome",
  "letmein",
  "secret",
  "password123",
];

const suffixes = ["_dev", "_skin", "_hub", "_art", "_guru", "_core"];

let nicknameAttempts = 0;

function translit(text) {
  const rules = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };
  return text
    .split("")
    .map((char) => rules[char] || char)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Переключение вкладок
  const tabLogin = document.getElementById("tab-login-btn");
  const tabRegister = document.getElementById("tab-register-btn");
  const loginFormContainer = document.getElementById("login-form-container");
  const registerFormContainer = document.getElementById(
    "register-form-container",
  );

  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginFormContainer.classList.remove("hidden");
    registerFormContainer.classList.add("hidden");
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerFormContainer.classList.remove("hidden");
    loginFormContainer.classList.add("hidden");
  });

  // Элементы формы регистрации
  const regForm = document.getElementById("register-form");
  const lastNameInput = document.getElementById("reg-lastname");
  const firstNameInput = document.getElementById("reg-firstname");
  const patronymicInput = document.getElementById("reg-patronymic");
  const phoneInput = document.getElementById("reg-phone");
  const emailInput = document.getElementById("reg-email");
  const birthdateInput = document.getElementById("reg-birthdate");
  const usernameInput = document.getElementById("reg-username");
  const generateNickBtn = document.getElementById("generate-nick-btn");
  const nickAttemptsInfo = document.getElementById("nick-attempts-info");

  const passModeRadio = document.getElementsByName("pass-mode");
  const manualPasswordFields = document.getElementById(
    "manual-password-fields",
  );
  const autoPasswordInfo = document.getElementById("auto-password-info");

  const passwordInput = document.getElementById("reg-password");
  const confirmPasswordInput = document.getElementById("reg-confirm-password");
  const agreementCheckbox = document.getElementById("reg-agreement");
  const registerSubmitBtn = document.getElementById("register-submit-btn");

  // Запретить вставку в поле подтверждения пароля
  confirmPasswordInput.addEventListener("paste", (e) => {
    e.preventDefault();
    showError(confirmPasswordInput, "Вставка пароля запрещена!");
  });

  // Логика выбора способа пароля
  passModeRadio.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "auto") {
        manualPasswordFields.classList.add("hidden");
        autoPasswordInfo.classList.remove("hidden");
      } else {
        manualPasswordFields.classList.remove("hidden");
        autoPasswordInfo.classList.add("hidden");
      }
      validateForm();
    });
  });

  // Ошибки динамической валидации
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

  // Скрытие ошибок при вводе
  [
    lastNameInput,
    firstNameInput,
    phoneInput,
    emailInput,
    birthdateInput,
    passwordInput,
    confirmPasswordInput,
    agreementCheckbox,
  ].forEach((el) => {
    el.addEventListener("input", () => {
      hideError(el);
      validateForm();
    });
  });

  // Генерация никнейма
  generateNickBtn.addEventListener("click", async () => {
    const fName = firstNameInput.value.trim();
    const lName = lastNameInput.value.trim();

    if (!fName || !lName) {
      showError(usernameInput, "Сначала заполните Имя и Фамилию!");
      return;
    }
    hideError(usernameInput);

    if (nicknameAttempts < 5) {
      const generated = makeNickname(fName, lName);

      // Проверяем уникальность
      const response = await fetch(
        `http://localhost:3000/users?username=${generated}`,
      );
      const data = await response.json();

      if (data.length > 0) {
        showError(
          usernameInput,
          "Сгенерированный ник уже занят, попробуйте еще раз.",
        );
      } else {
        usernameInput.value = generated;
        nicknameAttempts++;
        nickAttemptsInfo.textContent = `Попыток генерации: ${nicknameAttempts}/5`;
        if (nicknameAttempts >= 5) {
          usernameInput.removeAttribute("readonly");
          nickAttemptsInfo.textContent +=
            " (Теперь вы можете ввести никнейм вручную)";
        }
      }
    } else {
      alert(
        "Достигнут лимит автогенерации. Пожалуйста, введите никнейм вручную.",
      );
    }
    validateForm();
  });

  function makeNickname(firstName, lastName) {
    const f = translit(firstName)
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, Math.floor(Math.random() * 3) + 1);
    const l = translit(lastName)
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, Math.floor(Math.random() * 3) + 1);
    const num = Math.floor(Math.random() * 990) + 10;
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${f}${l}${num}${Math.random() > 0.5 ? suf : ""}`;
  }

  // Общая валидация формы
  function validateForm() {
    let isValid = true;

    if (!lastNameInput.value.trim()) isValid = false;
    if (!firstNameInput.value.trim()) isValid = false;

    // Беларусь (РБ) телефон +375(25/29/33/44/17)XXXXXXX
    const phoneRegex = /^\+375(25|29|33|44|17)\d{7}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) isValid = false;

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) isValid = false;

    // Дата рождения 16+ лет
    if (birthdateInput.value) {
      const bDate = new Date(birthdateInput.value);
      const today = new Date();
      let age = today.getFullYear() - bDate.getFullYear();
      const m = today.getMonth() - bDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
        age--;
      }
      if (age < 16) isValid = false;
    } else {
      isValid = false;
    }

    // Никнейм
    if (!usernameInput.value.trim()) isValid = false;

    // Пароль
    const isManual =
      document.querySelector('input[name="pass-mode"]:checked').value ===
      "manual";
    if (isManual) {
      const pass = passwordInput.value;
      const confirm = confirmPasswordInput.value;

      const hasUpper = /[A-Z]/.test(pass);
      const hasLower = /[a-z]/.test(pass);
      const hasDigit = /\d/.test(pass);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
      const isTooShortOrLong = pass.length < 8 || pass.length > 20;
      const isCommon = TOP_100_PASSWORDS_2024.includes(pass);

      if (
        isTooShortOrLong ||
        !hasUpper ||
        !hasLower ||
        !hasDigit ||
        !hasSpecial ||
        isCommon ||
        pass !== confirm
      ) {
        isValid = false;
      }
    }

    if (!agreementCheckbox.checked) isValid = false;

    registerSubmitBtn.disabled = !isValid;
  }

  // Отправка регистрации
  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Финальная проверка на существование никнейма в бд
    const checkUser = await fetch(
      `http://localhost:3000/users?username=${usernameInput.value.trim()}`,
    );
    const existing = await checkUser.json();
    if (existing.length > 0) {
      showError(usernameInput, "Данный никнейм уже существует в системе!");
      return;
    }

    let finalPassword = passwordInput.value;
    const isAuto =
      document.querySelector('input[name="pass-mode"]:checked').value ===
      "auto";
    if (isAuto) {
      finalPassword = "Gen@" + Math.random().toString(36).slice(-8) + "!";
    }

    const newUser = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      patronymic: patronymicInput.value.trim() || "",
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      birthDate: birthdateInput.value,
      username: usernameInput.value.trim(),
      password: finalPassword,
      role: "client",
    };

    try {
      const saveRes = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!saveRes.ok) throw new Error("Сервер не смог сохранить пользователя");

      alert(
        `Успешная регистрация!\nВаш логин: ${newUser.username}\nПароль: ${newUser.password}`,
      );
      location.reload();
    } catch (err) {
      console.error(err);
      alert("Не удалось завершить регистрацию");
    }
  });

  // Модалка соглашения
  const modal = document.getElementById("agreement-modal");
  const agreementLink = document.getElementById("agreement-link");
  const closeModalBtn = document.getElementById("close-modal-btn");

  agreementLink.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    agreementCheckbox.checked = true;
    validateForm();
  });

  // Авторизация
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cred = document.getElementById("login-username").value.trim();
    const pass = document.getElementById("login-password").value;

    const response = await fetch(`http://localhost:3000/users`);
    const users = await response.json();

    const matched = users.find(
      (u) => (u.username === cred || u.email === cred) && u.password === pass,
    );

    if (matched) {
      localStorage.setItem("currentUser", JSON.stringify(matched));
      alert("Авторизация прошла успешно!");
      location.href = "index.html";
    } else {
      alert("Неверные учетные данные!");
    }
  });
});

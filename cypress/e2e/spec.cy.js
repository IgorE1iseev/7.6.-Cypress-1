describe("Тесты Books list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Страница приложения отображается", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Успешный вход", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Неуспешный вход с ошибкой при пустом email", () => {
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false"); // Валидация поля ввода
  });

  it("Неуспешный вход с ошибкой при пустом пароле", () => {
    cy.login("test@test.com", "{Enter}"); // При выставлении пробела в поле пароля рисуется символ *
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});
describe("Функционал избранное", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Добавление новой книги", () => {
    cy.contains("Add new").click();
    cy.contains("Book description").should("be.visible");
    cy.get("#title").type("Пикник на обочине");
    cy.get("#description").type("Увлекательная история сталкеров");
    cy.get("#fileCover").selectFile("./datatest/Picnic.png"); // Добавление обложки книги из папки
    cy.get("#fileBook").selectFile("./datatest/Picnic.txt"); // Добавление текста книги
    cy.get("#authors").type("Аркадий и Борис Стругацкие");
    cy.contains("Submit").click();
    cy.contains("Пикник на обочине").should("be.visible");
  });

  it("Добавление книги в избранное", () => {
    cy.contains("Add to favorite").click();
    cy.get("h4").click(); // Нажатие на Favorite
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Загрузка себе добавленной книги", () => {
    cy.contains("Пикник на обочине").click();
    cy.contains("Увлекательная история сталкеров").should("be.visible");
    cy.contains("Dowload book").should("be.visible").and("not.be.disabled"); // Проверка видимости и кликабельности кнопки загрузки книги
  });
});

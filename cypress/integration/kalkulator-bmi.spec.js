/// <reference types="cypress" />
import { ParametryModule } from "../page-objects/parametryModule";

const parametryModule = new ParametryModule();

describe("kalkulator BMI", () => {
  beforeEach(() => {
    //Wejdź na stronę
    cy.visit("https://magda-andrzejczuk.github.io/kalkulator-bmi/src/");
  });

  it(
    "Test1: zawiera 3 sekcje: 'Parametry', 'Wynik', 'Historia pomiarów'",
    { tags: "local" },
    () => {
      cy.get(".sekcje div.modul").should("have.length", 3);
      cy.contains("Parametry").should("exist");
      cy.contains("Wynik").should("exist");
      cy.contains("Historia pomiarów").should("exist");
      //Aplikacja zawiera 3 sekcje: 'Parametry', 'Wynik', 'Historia pomiarów'
    }
  );

  it("Test2: poprawnie wylicza BMI", () => {
    // Wpisz wagę, wzrost a następnie kliknij przycisk zatwierdź
    parametryModule.selectWagaInput().type("45");
    parametryModule.selectWzrostInput().type("160");
    parametryModule.selectZatwierdzButton().click();
    // Waga, wzrost oraz wyliczone BMI wyświetla się poprawnie
    cy.get("#podanaWaga").should("have.text", "45 kg");
    cy.get("#podanyWzrost").should("have.text", "160 cm");
    cy.get("#wyliczoneBMI").should("have.text", "17.58");
  });

  it("Test3: po kliknięciu zatwierdź czyści pola tekstowe", () => {
    //Wpisz wagę, wzrost a następnie kliknij przycisk zatwierdź
    parametryModule.selectWagaInput().type("45");
    parametryModule.selectWzrostInput().type("160");
    parametryModule.selectZatwierdzButton().click();

    //Wpisane wartości zostały wyczyszczone
    parametryModule.selectWagaInput().should("be.empty");
    parametryModule.selectWzrostInput().should("be.empty");
  });

  it(
    "Test4: po wpisaniu błędnej wagi, wyświetla komunikat o niepoprawności",
    { tags: "local" },
    () => {
      //Wpisz niepoprawną wagę <40 kg lub >200 kg, poprawny wzrost i kliknij przycisk 'zatwierdź'
      parametryModule.selectWzrostInput().type("160");
      parametryModule.selectZatwierdzButton().click();
      // Pojawia się komunikat o niepoprawności wagi
      cy.get("#podanaWaga").should("have.text", "nie jest poprawna");
      cy.get("#podanyWzrost").should("have.text", "160 cm");
      cy.get("#wyliczoneBMI").should("have.text", "-");
    }
  );

  it("Test5: po wpisaniu błędnego wzrostu, wyświetla komunikat o niepoprawności", () => {
    //Wpisz wagę, niepoprawny wzrost  <120 cm lub > 240 cm i kliknij przycisk 'zatwierdź'
    parametryModule.selectWagaInput().type("40");
    parametryModule.selectWzrostInput().type("119");
    parametryModule.selectZatwierdzButton().click();
    //Pojawia się komunikat o niepoprawności wzrostu
    cy.get("#podanaWaga").should("have.text", "40 kg");
    cy.get("#podanyWzrost").should("have.text", "nie jest poprawny");
    cy.get("#wyliczoneBMI").should("have.text", "-");
  });

  it("Test6: po wpisaniu błędnego wzrostu i wagi, wyświetla komunikat o niepoprawności", () => {
    //Wpisz niepoprawną wagę, niepoprawny wzrost i kliknij przycisk 'zatwierdź'
    parametryModule.selectWagaInput().type("39");
    parametryModule.selectWzrostInput().type("119");
    parametryModule.selectZatwierdzButton().click();
    // Pojawia się komunikat o niepoprawności wagi oraz wzrostu
    cy.get("#podanaWaga").should("have.text", "nie jest poprawna");
    cy.get("#podanyWzrost").should("have.text", "nie jest poprawny");
    cy.get("#wyliczoneBMI").should("have.text", "-");
  });

  it(
    "Test7: po wpisaniu poprawnych wartości, zapisze uzyskany wynik do historii pomiarów",
    { tags: "local" },
    () => {
      //  Wpisz wagę, wzrost i kliknij przycisk 'zatwierdź'
      parametryModule.selectWagaInput().type("40");
      parametryModule.selectWzrostInput().type("120");
      parametryModule.selectZatwierdzButton().click();
      // Wynik zapisał się w historii pomiarów
      cy.get("#historiaPomiarow li").should("exist");
    }
  );

  context("po uzyskaniu kilku poprawnych wyników", () => {
    beforeEach(() => {
      //wprowadź dwa poprawne wyniki
      parametryModule.selectWagaInput().type("40");
      parametryModule.selectWzrostInput().type("120");
      parametryModule.selectZatwierdzButton().click();

      parametryModule.selectWagaInput().type("60");
      parametryModule.selectWzrostInput().type("140");
      parametryModule.selectZatwierdzButton().click();
    });

    it("Test8: zapisze wszystkie wyniki w historii pomiarów", () => {
      cy.get("#historiaPomiarow li").should("have.length.at.least", 2);
      // Wszystkie wyniki zapisały się w historii pomiarów
    });

    it("Test9: pokaże komunikat o tym, że BMI wzrosło", () => {
      cy.get("#komunikatBMI").should("have.text", "Twoje BMI wzrosło!");
      //Pojawił się komunikat 'Twoje BMI wzrosło'
    });

    it("Test10: pokaże komunikat o tym, że BMI spadło", () => {
      //Wpisz kolejny wynik
      parametryModule.selectWagaInput().type("58");
      parametryModule.selectWzrostInput().type("140");
      parametryModule.selectZatwierdzButton().click();
      //Pojawił się komunikat 'Twoje BMI spadło'
      cy.get("#komunikatBMI").should("have.text", "Twoje BMI spadło!");
    });
    it("Test11: po wciśnięciu przycisku 'czyść', wyczyści historię pomiarów", () => {
      //Kliknij przycisk 'Czyść'
      cy.get("#czyscButton").click();
      cy.get("#historiaPomiarow li").should("have.length", 0);
      //Historia pomiarów została wyczyszczona
    });
  });
});

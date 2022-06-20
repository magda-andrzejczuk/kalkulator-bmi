export class ParametryModule {
  _wagaInputSelector = "#waga";
  _wzrostInputSelector = "#wzrost";
  _zatwierdzButtonSelector = "#zatwierdz";

  selectWagaInput() {
    return cy.get(this._wagaInputSelector);
  }

  selectWzrostInput() {
    return cy.get(this._wzrostInputSelector);
  }

  selectZatwierdzButton() {
    return cy.get(this._zatwierdzButtonSelector);
  }
}

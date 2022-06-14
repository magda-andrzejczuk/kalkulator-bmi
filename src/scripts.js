const wagaElement = document.querySelector("#waga");
const wzrostElement = document.querySelector("#wzrost");
const zatwierdzElement = document.querySelector("#zatwierdz");
const podanaWagaElement = document.querySelector("#podanaWaga");
const podanyWzrostElement = document.querySelector("#podanyWzrost");
const wyliczoneBMIElement = document.querySelector("#wyliczoneBMI");
const sredniaWynikowBMIElement = document.querySelector("#sredniaWynikowBMI");
const czyscButton = document.querySelector("#czyscButton");
const historiaPomiarowElement = document.querySelector("#historiaPomiarow");
const komunikatBMIElement = document.querySelector("#komunikatBMI");

let listaPomiarow = [];

function licz() {
  // czyścimy elementy html
  wyliczoneBMIElement.innerHTML = "-";

  // parsujemy zmienne tekstowe na liczby
  const wagaElementWartosc = parseInt(wagaElement.value);
  const wzrostElementWartosc = parseInt(wzrostElement.value);

  // sprawdzamy poprawność wagi
  if (wagaElementWartosc >= 40 && wagaElementWartosc <= 200) {
    podanaWagaElement.innerHTML = `${wagaElementWartosc} kg`;
  } else {
    podanaWagaElement.innerHTML = `nie jest poprawna`;
  }

  // sprawdzamy poprawność wzrostu
  if (wzrostElementWartosc >= 120 && wzrostElementWartosc <= 240) {
    podanyWzrostElement.innerHTML = `${wzrostElementWartosc} cm`;
  } else {
    podanyWzrostElement.innerHTML = `nie jest poprawny`;
  }

  // BMI
  if (
    wagaElementWartosc >= 40 &&
    wagaElementWartosc <= 200 &&
    wzrostElementWartosc >= 120 &&
    wzrostElementWartosc <= 240
  ) {
    const BMI = parseFloat((
      wagaElementWartosc /
      (wzrostElementWartosc / 100) ** 2
    ).toFixed(2));
    wyliczoneBMIElement.innerHTML = `${BMI}`;

    const biezacaData = (new Date()).toLocaleString();
    const pomiar = {
      data: biezacaData,
      waga: wagaElementWartosc,
      wzrost: wzrostElementWartosc,
      BMI: BMI,
    };
    listaPomiarow.push(pomiar);
    const kolejnyPomiar = document.createElement("li");
    const nowyPomiar = document.createTextNode(`Pomiar z dnia [${pomiar.data}]`);
    kolejnyPomiar.appendChild(nowyPomiar);
    historiaPomiarowElement.append(kolejnyPomiar);

    function wczytajPomiar() {
      komunikatBMIElement.innerHTML = "";
      podanaWagaElement.innerHTML = `${pomiar.waga} kg`;
      podanyWzrostElement.innerHTML = `${pomiar.wzrost} cm`;
      wyliczoneBMIElement.innerHTML = `${pomiar.BMI}`;
    }
    kolejnyPomiar.addEventListener("click", wczytajPomiar);

    let sumaPomiarow = 0;
    for (let i = 0; i < listaPomiarow.length; i++) {
      sumaPomiarow = sumaPomiarow + listaPomiarow[i].BMI;
    }
    const sredniaBMI = sumaPomiarow / listaPomiarow.length;
  
    sredniaWynikowBMIElement.innerHTML = `Średnie BMI to ${sredniaBMI.toFixed(2)}`;
  }

  // sprawdzamy w historii czy są minimum 2 pomiary
  if (listaPomiarow.length > 1) {
    const ostatniPomiar = listaPomiarow[listaPomiarow.length - 1];
    const przedostatniPomiar = listaPomiarow[listaPomiarow.length - 2];

    if (ostatniPomiar.BMI < przedostatniPomiar.BMI) {
      komunikatBMIElement.innerHTML = `Twoje BMI spadło!`;
    }
    if (ostatniPomiar.BMI > przedostatniPomiar.BMI) {
      komunikatBMIElement.innerHTML = `Twoje BMI wzrosło!`;
    }
  }

  wagaElement.value = "";
  wzrostElement.value = "";
}
zatwierdzElement.addEventListener("click", licz);

function czysc() {
  listaPomiarow = [];
  komunikatBMIElement.innerHTML = "";
  sredniaWynikowBMIElement.innerHTML = "";
  historiaPomiarowElement.innerHTML = "";
  wagaElement.value = "";
  wzrostElement.value = "";
  podanaWagaElement.innerHTML = "-";
  podanyWzrostElement.innerHTML = "-";
  wyliczoneBMIElement.innerHTML = "-";
}
czyscButton.addEventListener("click", czysc);

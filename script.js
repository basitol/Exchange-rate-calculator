const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const amountOne = document.querySelector("#amount-one");
const amountTwo = document.querySelector("#amount-two");

const swap = document.querySelector("#swap");
const rate = document.querySelector("#rate");

const calculate = () => {
  const currencyOneVal = currencyOne.value;
  const currencyTwoVal = currencyTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/ba46e52903a0b7141df835f1/latest/${currencyOneVal}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const exRate = data.conversion_rates[currencyTwoVal];

      rate.innerText = `1 ${currencyOneVal} = ${exRate} ${currencyTwoVal}`;

      amountTwo.value = (exRate * amountOne.value).toFixed(2);
    });
};

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;

  calculate();
});

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

calculate();

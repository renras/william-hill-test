const jackpotNumber = document.querySelector("#jackpot-number");

(async () => {
  // had to fix the api url because it wasn't working
  let value = Number(
    jackpotNumber.textContent.trim().substring(1).replace(/,/g, "")
  );

  await fetch(
    "https://feedsapi.safe-installation.com/api/GetJackpotTotalAmount?CurrencyCode=USD&amp;currencySymbol=$&BrandID=0"
  )
    .then((response) => response.json())
    .then((data) => {
      value = data.entity.totalAmount;
      jackpotNumber.textContent = `$${value.toLocaleString("en-US")}`;
    })
    .catch((error) => {
      console.error(error);
    });

  const intervalId = setInterval(function () {
    const randomCent = Number((Math.random() * 0.09 + 0.01).toFixed(2));
    value += randomCent;
    jackpotNumber.textContent = `$${value.toLocaleString("en-US")}`;
    console.log(value.toLocaleString("en-US"));
  }, 3000);
})();

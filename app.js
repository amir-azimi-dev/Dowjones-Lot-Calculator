const $ = document;

const balanceInputElem = $.getElementById("balance-input");
const riskPercentageInputElem = $.getElementById("risk-percentage-input");
const stopPipsInputElem = $.getElementById("stop-pips-input");
const pipValuePerLotInputElem = $.getElementById("pip-value-per-lot-input");
const calculateButtonElem = $.querySelector("button");

const outputContainer = $.querySelector(".output");
const lotValueResult = $.querySelector(".lot-value");
const riskValueResult = $.querySelector(".risk-value");
const pipValueResult = $.querySelector(".pip-value");

const calculateResults = (balance, risk, stopPips, pipValuePerLot) => {
    const riskInDollars = (balance * (risk / 100));
    const pipValue = (riskInDollars / stopPips);
    const lotValue = pipValue / pipValuePerLot;

    return { lotValue, riskInDollars, pipValue };
};

const scrollToResults = () => {
    outputContainer.scrollIntoView({ behavior: "smooth" });
};

calculateButtonElem.addEventListener("click", () => {
    const balance = parseFloat(balanceInputElem.value);
    const risk = parseFloat(riskPercentageInputElem.value);
    const stopPips = parseFloat(stopPipsInputElem.value);
    const pipValuePerLot = parseFloat(pipValuePerLotInputElem.value);

    if (isNaN(balance) || isNaN(risk) || isNaN(stopPips) || isNaN(pipValuePerLot) || balance <= 0 || risk <= 0 || stopPips <= 0 || pipValuePerLot <= 0) {
        return alert("Invalid Entries!");
    }

    const { lotValue, riskInDollars, pipValue } = calculateResults(balance, risk, stopPips, pipValuePerLot);

    lotValueResult.innerHTML = lotValue.toFixed(2);
    riskValueResult.innerHTML = riskInDollars.toFixed(2) + " $";
    pipValueResult.innerHTML = pipValue.toFixed(2) + " $";

    scrollToResults();
});

window.addEventListener("load", () => {
    riskPercentageInputElem.value = 2;
    pipValuePerLotInputElem.value = 1;
});
const kortingsPercentage = [
	20, 30, 40, 45, 50, 55, 60, 65, 67, 69, 70, 71, 72, 73, 74, 75,
];

const userInputSvj = document.getElementById('svj-field-input-id');
const userInputSchade = document.getElementById('schades-field-input-id');
const userInputPremie = document.getElementById('premie-field-input-id');

const kortingKlant = document.getElementById('korting-percentage-id');
const bevestigenButton = document.getElementById('button-bevestigen-id');
const uitkomst = document.getElementById('korting-id');

function applyDiscount() {
	if (userInputSvj.value >= 10) {
		kortingKlant.innerHTML = kortingsPercentage[15];
	} else if (userInputSvj.value == 9) {
		kortingKlant.innerHTML = kortingsPercentage[14];
	} else if (userInputSvj.value == 8) {
		kortingKlant.innerHTML = kortingsPercentage[13];
	} else if (userInputSvj.value == 7) {
		kortingKlant.innerHTML = kortingsPercentage[12];
	} else if (userInputSvj.value == 6) {
		kortingKlant.innerHTML = kortingsPercentage[11];
	} else if (userInputSvj.value == 5) {
		kortingKlant.innerHTML = kortingsPercentage[10];
	} else if (userInputSvj.value == 4) {
		kortingKlant.innerHTML = kortingsPercentage[9];
	} else if (userInputSvj.value == 3) {
		kortingKlant.innerHTML = kortingsPercentage[8];
	} else if (userInputSvj.value == 2) {
		kortingKlant.innerHTML = kortingsPercentage[7];
	} else if (userInputSvj.value == 1) {
		kortingKlant.innerHTML = kortingsPercentage[6];
	} else if (userInputSvj.value == 0) {
		kortingKlant.innerHTML = kortingsPercentage[5];
	} else if (userInputSvj.value == -1) {
		kortingKlant.innerHTML = kortingsPercentage[4];
	} else if (userInputSvj.value == -2) {
		kortingKlant.innerHTML = kortingsPercentage[3];
	} else if (userInputSvj.value == -3) {
		kortingKlant.innerHTML = kortingsPercentage[2];
	} else if (userInputSvj.value == -4) {
		kortingKlant.innerHTML = kortingsPercentage[1];
	} else if (userInputSvj.value <= -5) {
		kortingKlant.innerHTML = kortingsPercentage[0];
	}	
}

bevestigenButton.addEventListener('click', applyDiscount);

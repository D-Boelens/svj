const kortingsPercentage = [20, 30, 40, 45, 50, 55, 60, 65, 67, 69, 70, 71, 72, 73, 74, 75];

const userInputSvj = document.getElementById('svj-field-input-id');
const userInputSchade = document.getElementById('schades-field-input-id');
const userInputPremie = document.getElementById('premie-field-input-id');
const buttonBevestigen = document.getElementById('button-bevestigen-id');
const kortingKlant = document.getElementById('korting-percentage-id');

const uitkomst = document.getElementById('korting-id');

const svjNieuw = document.getElementById('svj-nieuw-id');
const kortingNieuw = document.getElementById('korting-nieuw-id');

function applyMalus() {
  let svjInput = parseInt(userInputSvj.value);
  let schadesInput = parseInt(userInputSchade.value);  
  let index;
  let indexNew

	if (svjInput >= 10) {
		index = 15;
	} else if (svjInput <= -5) {
		index = 0;
	} else {
		index = svjInput + 5;
  }

  if (schadesInput == 1 ) {
    indexNew = index - (schadesInput *5)
  } else if (schadesInput == 2) {
		indexNew = index - schadesInput * 5;
  } else if (schadesInput == 3) {
		indexNew = index - schadesInput * 5;
  } else if (schadesInput >= 4) {
		indexNew = 0
  } else indexNew = 0;
    
  kortingKlant.innerHTML = kortingsPercentage[index];
  svjNieuw.innerHTML = svjInput - (schadesInput * 5)
  kortingNieuw.innerHTML = kortingsPercentage[indexNew] + "%";

}

buttonBevestigen.addEventListener('click', applyMalus);

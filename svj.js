const kortingPerTrede = [20, 30, 40, 45, 50, 55, 60, 65, 67, 69, 70, 71, 72, 73, 74, 75, 75, 75, 75, 75]; //Kortingspercentages per bonus-malus trede.
const svjPerTrede = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; //Svj per bonus-malus trede.
const userInputSvj = document.getElementById('svj-field-input-id');
const userInputSchade = document.getElementById('schades-field-input-id');
const userInputPremie = document.getElementById('premie-field-input-id');
const buttonBevestigen = document.getElementById('button-bevestigen-id');
const huidigeKorting = document.getElementById('korting-percentage-id');
const uitkomst = document.getElementById('korting-id');// Nog gebruiken voor complerte innerHTML van uitkomst
const svjNieuw = document.getElementById('svj-nieuw-id');
const kortingNieuw = document.getElementById('korting-nieuw-id');

function malusBerekening() {
	let svjInput = parseInt(userInputSvj.value);
	let schadesInput = parseInt(userInputSchade.value);
	let svjNaSchade;
	let kortingTrede;
	let kortingsTredeNaSchade;

	//Geeft huidige korting weer op basis van svjInput klant
	if (svjInput >= -4 && svjInput < 14) {
		kortingTrede = svjInput + 5;
	} else if (svjInput >= 14) {
		kortingTrede = 19;
	} else if (svjInput <= -5) {
		kortingTrede = 0;
	}
  huidigeKorting.innerHTML = kortingPerTrede[kortingTrede];
  
	//Aantal svj na schadeclaim(s)
  if (svjInput >= 14 ) {
    svjInput = 14
  }  
	if (schadesInput >= 1 && schadesInput <= 3) {
		svjNaSchade = svjInput - schadesInput * 5;
	} else if (schadesInput >= 4) {
		svjNaSchade = 0;
	} 
	// Houdt uitkomst svjNaSchade binnen array svjPerTrede
	svjNaSchade = Math.max(0, Math.min(svjNaSchade, svjPerTrede.length - 1));
  svjNieuw.innerHTML = svjPerTrede[svjNaSchade];
  
	//Aantal procent korting na schadeclaim(s)
	if (schadesInput >= 1 && schadesInput <= 3) {
		kortingsTredeNaSchade = kortingTrede - schadesInput * 5;
	} else if (schadesInput >= 4) {
		kortingsTredeNaSchade = 0;
	} else {
		kortingsTredeNaSchade = kortingTrede;
	}
	// Houdt uitkomst kortingsTredeNaSchade binnen array kortingPerTrede
	kortingsTredeNaSchade = Math.max(0, Math.min(kortingsTredeNaSchade, kortingPerTrede.length - 1));
	kortingNieuw.innerHTML = kortingPerTrede[kortingsTredeNaSchade];
}

buttonBevestigen.addEventListener('click', malusBerekening);

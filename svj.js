const kortingPerTrede = [20, 30, 40, 45, 50, 55, 60, 65, 67, 69, 70, 71, 72, 73, 74, 75, 75, 75, 75, 75, 75]; //Kortingspercentages per bonus-malus trede.
const userInputSvj = document.getElementById('svj-field-input-id');
const userInputSchade = document.getElementById('schades-field-input-id');
const userInputWaPremie = document.getElementById('wa-premie-field-input-id');
const userInputCascoPremie = document.getElementById('casco-premie-field-input-id');
const buttonBevestigen = document.getElementById('button-bevestigen-id');
const huidigeKorting = document.getElementById('korting-percentage-id');
const uitkomst = document.getElementById('korting-id'); // Nog gebruiken voor complerte innerHTML van uitkomst
const svjNieuw = document.getElementById('svj-nieuw-id');
const kortingNieuw = document.getElementById('korting-nieuw-id');
const premieNieuw = document.getElementById('premie-nieuw-id');

//Nog inbouwen: Geen negatieve schades/Required fields overall maken/Alerts.

function malusBerekening() {
	let svjInput = parseInt(userInputSvj.value);
	let schadesInput = parseInt(userInputSchade.value);
	let waPremieInput = parseInt(userInputWaPremie.value);
	let svjNaSchade;
	let kortingTrede;
	let kortingsTredeNaSchade;

	if (isNaN(schadesInput, svjInput) || schadesInput < 0) {
		alert('Voer s.v.p. een geldig aantal in');
		return;
	}

	//Geeft huidige korting weer op basis van svjInput klant
	if (svjInput >= -4 && svjInput < 15) {
		kortingTrede = svjInput + 5;
	} else if (svjInput >= 15) {
		kortingTrede = 20;
	} else if (svjInput <= -5) {
		kortingTrede = 0;
	}
	huidigeKorting.innerHTML = kortingPerTrede[kortingTrede] + '%  korting (trede ' + (kortingTrede + 1) + ')';

	//Aantal svj na schadeclaim(s)
	if (svjInput >= 14) {
		svjInput = 14;
	}
	if (schadesInput >= 0 && schadesInput <= 3) {
		svjNaSchade = svjInput - schadesInput * 5;
	} else if (schadesInput >= 4) {
		svjNaSchade = -5;
	}
	svjNaSchade = Math.max(-5, Math.min(svjNaSchade, 14));
	svjNieuw.innerHTML = svjNaSchade;

	//Aantal procent korting na schadeclaim(s)
	if (schadesInput >= 1 && schadesInput <= 3) {
		kortingsTredeNaSchade = kortingTrede - schadesInput * 5;
	} else if (schadesInput >= 4) {
		kortingsTredeNaSchade = 0;
	} else {
		kortingsTredeNaSchade = kortingTrede;
	}
	kortingsTredeNaSchade = Math.max(0, Math.min(kortingsTredeNaSchade, kortingPerTrede.length - 1));
	kortingNieuw.innerHTML = kortingPerTrede[kortingsTredeNaSchade] + '%  korting (trede ' + (kortingsTredeNaSchade + 1) + ')';

	//Nieuwe premie na schadeclaim(s)
	if (!isNaN(waPremieInput)) {
		let huidigeKortingPercentage = kortingPerTrede[kortingTrede];
		let nieuweKortingPercentage = kortingPerTrede[kortingsTredeNaSchade];
		let oorspronkelijkePremie = waPremieInput / ((100 - huidigeKortingPercentage) / 100);
		let nieuwePremie = oorspronkelijkePremie * ((100 - nieuweKortingPercentage) / 100) * 1.21;

		// nieuwePremie = nieuwePremie * 1.032;

		premieNieuw.innerHTML = nieuwePremie.toFixed(2);
	}
}

buttonBevestigen.addEventListener('click', malusBerekening);

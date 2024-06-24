const kortingPerTrede = [20, 30, 40, 45, 50, 55, 60, 65, 67, 69, 70, 71, 72, 73, 74, 75, 75, 75, 75, 75, 75]; // Kortingspercentages per bonus-malus trede
const userInputSvj = document.getElementById('svj-field-input-id');
const userInputSchade = document.getElementById('schades-field-input-id');
const userInputWaPremie = document.getElementById('wa-premie-field-input-id');
const userInputCascoPremie = document.getElementById('casco-premie-field-input-id');
const buttonBevestigen = document.getElementById('button-bevestigen-id');
const huidigeKorting = document.getElementById('korting-percentage-id');
const uitkomst = document.getElementById('korting-id'); // Nog gebruiken voor complete innerHTML van uitkomst
const svjNieuw = document.getElementById('svj-nieuw-id');
const kortingNieuw = document.getElementById('korting-nieuw-id');
const premieNieuw = document.getElementById('premie-nieuw-id');

// Alert bij ongeldige waarde svj, schades of premie
function geldigeInput(svj, schades, premieWa) {
	if (isNaN(svj) || isNaN(schades) || isNaN(premieWa) || schades < 0 || premieWa < 0) {
		alert('Vul alle verplichte velden in');
		return false;
	}
	return true;
}

// Kortingstrede op basis van svj
function bepaalKortingTrede(svj) {
	if (svj >= -4 && svj < 15) {
		return svj + 5;
	} else if (svj >= 15) {
		return 20;
	} else if (svj <= -5) {
		return 0;
	}
}

// Nieuwe svj na schade
function berekenSvjNaSchade(svj, schades) {
	if (svj >= 14) {
		svj = 14;
	}
	if (schades >= 0 && schades <= 3) {
		return Math.max(-5, Math.min(svj - schades * 5, 14));
	} else if (schades >= 4) {
		return -5;
	}
	return svj;
}

// Nieuwe kortingstrede na schade
function berekenKortingTredeNaSchade(kortingTrede, schades) {
	if (schades >= 1 && schades <= 3) {
		return Math.max(0, Math.min(kortingTrede - schades * 5, kortingPerTrede.length - 1));
	} else if (schades >= 4) {
		return 0;
	}
	return kortingTrede;
}

// Nieuwe premie na schade
function berekenNieuwePremie(waPremie, huidigeKortingPercentage, nieuweKortingPercentage) {
	const oorspronkelijkePremie = waPremie / ((100 - huidigeKortingPercentage) / 100);
	return (oorspronkelijkePremie * ((100 - nieuweKortingPercentage) / 100) * 1.21).toFixed(2);
}

//Totale uitkomst oud en nieuw
function malusBerekening() {
	const svjInput = parseInt(userInputSvj.value);
	const schadesInput = parseInt(userInputSchade.value);
	const waPremieInput = parseFloat(userInputWaPremie.value);

	if (!geldigeInput(svjInput, schadesInput, waPremieInput)) {
		return;
	}

	// Huidige korting op basis van svjInput klant
	const kortingTrede = bepaalKortingTrede(svjInput);
	huidigeKorting.innerHTML = kortingPerTrede[kortingTrede] + '% korting (trede ' + (kortingTrede + 1) + ')';

	// Aantal svj na schadeclaim(s)
	const svjNaSchade = berekenSvjNaSchade(svjInput, schadesInput);
	svjNieuw.innerHTML = svjNaSchade;

	// Aantal procent korting na schadeclaim(s)
	const kortingsTredeNaSchade = berekenKortingTredeNaSchade(kortingTrede, schadesInput);
	kortingNieuw.innerHTML = kortingPerTrede[kortingsTredeNaSchade] + '% korting (trede ' + (kortingsTredeNaSchade + 1) + ')';

	// Nieuwe premie na schadeclaim(s)
	if (!isNaN(waPremieInput)) {
		const huidigeKortingPercentage = kortingPerTrede[kortingTrede];
		const nieuweKortingPercentage = kortingPerTrede[kortingsTredeNaSchade];
		const nieuwePremie = berekenNieuwePremie(waPremieInput, huidigeKortingPercentage, nieuweKortingPercentage);
		premieNieuw.innerHTML = nieuwePremie;
	}
}

buttonBevestigen.addEventListener('click', malusBerekening);

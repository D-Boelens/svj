const kortingPerTrede = [20, 30, 40, 45, 50, 55, 60, 65, 67, 69, 70, 71, 72, 73, 74, 75, 75, 75, 75, 75, 75];// Kortingspercentages per bonus-malus trede
const userInputSvj = document.getElementById('svj-field-input-id');
const userInputSchade = document.getElementById('schades-field-input-id');
const userInputWaPremie = document.getElementById('wa-premie-field-input-id');
const userInputCascoPremie = document.getElementById('casco-premie-field-input-id');
const buttonBevestigen = document.getElementById('button-bevestigen-id');
const huidigeKorting = document.getElementById('korting-percentage-id');
const uitkomst = document.getElementById('korting-id');// Nog gebruiken voor complete innerHTML van uitkomst
const svjNieuw = document.getElementById('svj-nieuw-id');
const kortingNieuw = document.getElementById('korting-nieuw-id');
const premieNieuw = document.getElementById('premie-nieuw-id');
const checkBoxMaand = document.getElementById('checkbox-id-maand')

// Alert bij ongeldige waarde svj, schades of premie
function geldigeInput (svj, schades, premieWa, premieCasco) {
  if (isNaN(svj) || isNaN(schades) || isNaN(premieWa) || schades < 0 || premieWa < 0 || premieCasco < 0) {
		alert('Vul alle verplichte velden in');
		return false;
  }
  return true;
}

// Kortingstrede op basis van svj
function huidigeKortingsTrede(svj) {
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

// Nieuwe WA premie na schade
function berekenNieuweWaPremie(waPremie, huidigeKortingPercentage, nieuweKortingPercentage) {
	const oorspronkelijkeWaPremie = waPremie / ((100 - huidigeKortingPercentage) / 100);
	return (oorspronkelijkeWaPremie * ((100 - nieuweKortingPercentage) / 100) * 1.21).toFixed(2);
}

// Nieuwe Casco premie na schade
function berekenNieuweCascoPremie(cascoPremie, huidigeKortingPercentage, nieuweKortingPercentage) {
	const oorspronkelijkeCascoPremie = cascoPremie / ((100 - huidigeKortingPercentage) / 100);
	return (oorspronkelijkeCascoPremie * ((100 - nieuweKortingPercentage) / 100) * 1.21).toFixed(2);
}

//Totale uitkomst oud en nieuw
function malusBerekening() {
	const svjInput = parseInt(userInputSvj.value);
	const schadesInput = parseInt(userInputSchade.value);
	const waPremieInput = parseFloat(userInputWaPremie.value);
	const cascoPremieInput = parseFloat(userInputCascoPremie.value);
	if (!geldigeInput(svjInput, schadesInput, waPremieInput, cascoPremieInput)) {
		return;
	}

	let kortingTrede = huidigeKortingsTrede(svjInput);
	huidigeKorting.innerHTML = kortingPerTrede[kortingTrede] + '% korting (trede ' + (kortingTrede + 1) + ')';

	let svjNaSchade = berekenSvjNaSchade(svjInput, schadesInput);
	svjNieuw.innerHTML = svjNaSchade;

	let kortingsTredeNaSchade = berekenKortingTredeNaSchade(kortingTrede, schadesInput);
	kortingNieuw.innerHTML = kortingPerTrede[kortingsTredeNaSchade] + '% korting (trede ' + (kortingsTredeNaSchade + 1) + ')';

	let huidigeKortingPercentage = kortingPerTrede[kortingTrede];
	let nieuweKortingPercentage = kortingPerTrede[kortingsTredeNaSchade];

  //Voorkomt berekening bij uitkomst lager dan -5 svj
	if (svjInput <= 0 && schadesInput >= 1) {
		kortingTrede = huidigeKortingsTrede(0);
		huidigeKortingPercentage = kortingPerTrede[kortingTrede];
		svjNaSchade = berekenSvjNaSchade(0, schadesInput);
		kortingsTredeNaSchade = berekenKortingTredeNaSchade(kortingTrede, schadesInput);
		nieuweKortingPercentage = kortingPerTrede[kortingsTredeNaSchade];
	}

	const nieuweWaPremie = parseFloat(berekenNieuweWaPremie(waPremieInput, huidigeKortingPercentage, nieuweKortingPercentage));
	let nieuwePremie = nieuweWaPremie;

	//Nieuwe WA + Casco premie (optioneel)
	if (!isNaN(cascoPremieInput)) {
		const nieuweCascoPremie = parseFloat(
			berekenNieuweCascoPremie(cascoPremieInput, huidigeKortingPercentage, nieuweKortingPercentage)
		);
		nieuwePremie += nieuweCascoPremie;
  }
  
  if (checkBoxMaand.checked) {
		nieuwePremie *= 1.032;
  }

	premieNieuw.innerHTML = nieuwePremie.toFixed(2);
}

buttonBevestigen.addEventListener('click', malusBerekening);
checkBoxMaand.addEventListener('change', malusBerekening);

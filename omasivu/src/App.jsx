function KirjauduSisaan(event){	
	event.preventDefault(); 
	const vir_mol = document.getElementById("virhe");
	const vir_kay = document.getElementById("kayttajavirhe");
	const vir_sal = document.getElementById("salasanavirhe");
	const ok = document.getElementById("onnistuminen");
    
	let nimi = document.getElementById("kayttaja");
	let salasana = document.getElementById("salasana");
	
	
	if (nimi.value === "" && salasana.value === "") {
		vir_mol.style.display = "block";
		vir_kay.style.display = "none";
		vir_sal.style.display = "none";
		ok.style.display = "none";
	}
	else if (nimi.value === "Juhani" && salasana.value !== "Salainen.123") {
		vir_mol.style.display = "none";
		vir_kay.style.display = "none";
		vir_sal.style.display = "block";
		ok.style.display = "none";
	}
	else if (nimi.value !== "Juhani" && salasana.value === "Salainen.123") {
		vir_mol.style.display = "none";
		vir_kay.style.display = "block";
		vir_sal.style.display = "none";
		ok.style.display = "none";
	}
	else if (nimi.value !== "Juhani" && salasana.value !== "Salainen.123") {
		vir_mol.style.display = "block";
		vir_kay.style.display = "none";
		vir_sal.style.display = "none";
		ok.style.display = "none";
	}
	else{
	vir_mol.style.display = "none";
	vir_kay.style.display = "none";
	vir_sal.style.display = "none";
		ok.style.display = "block";
	}
}
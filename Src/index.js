// Adds days on to a date
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

window.addEventListener("load", function(event) {
	// Header HTML tags
	document.getElementById("Logo").src = data["Images"]["Logo"];
	document.getElementById("Title").innerHTML = data["Policy"]["Title"];
	let date = new Date(data["Invoice"]["Date"]).toLocaleDateString('en-US')
	document.getElementById("InvoiceDate").innerHTML += date;
	date = new Date(data["Invoice"]["Date"]).toLocaleDateString('en-US').split("/");
	date = date[0] + date[1] + date[2].substring(2, 4);
	let invoiceNumber = data["Invoice"]["Number"].toString();
	document.getElementById("InvoiceNumber").innerHTML += date + invoiceNumber;
	document.getElementById("DeviceID").innerHTML += data["Invoice"]["DeviceID"];
	document.getElementById("UserName").innerHTML += data["Invoice"]["UserName"];
	
	// Device info HTML tags
	document.getElementById("DeviceBrand").innerHTML += data["Device"]["Brand"];
	document.getElementById("DeviceSN").innerHTML += data["Device"]["Serial"];
	date = new Date(data["Device"]["manufactured"]).toLocaleDateString('en-US')
	document.getElementById("DeviceManuf").innerHTML += date;
	document.getElementById("DeviceMSRP").innerHTML += "$" + data["Device"]["MSRP"];
	
	// Device image HTML tags
	document.getElementById("DeviceLeftTitle").innerHTML = data["Images"]["Left"]["Title"];
	document.getElementById("DeviceMiddleTitle").innerHTML = data["Images"]["Middle"]["Title"];
	document.getElementById("DeviceRightTitle").innerHTML = data["Images"]["Right"]["Title"];
	document.getElementById("DeviceLeftPath").src = data["Images"]["Left"]["Path"];
	document.getElementById("DeviceMiddlePath").src = data["Images"]["Middle"]["Path"];
	document.getElementById("DeviceRightPath").src = data["Images"]["Right"]["Path"];
	
	// Left side note HTML tags
	document.getElementById("IncidentNotes").innerHTML = data["Report"]["Incident"];
	document.getElementById("RepairNotes").innerHTML = data["Report"]["Repair"];
	
	// Itemized table HTML tags
	let totalPrice = 0;
	let itemized = document.getElementById("Itemized");
	for(i=0; i<6; i+=1) {
		let row = itemized.insertRow(-1);
		let description = row.insertCell(0);
		let price = row.insertCell(1);
		description.innerHTML = data["Itemized"][i]["Description"];
		if(data["Itemized"][i]["Price"] != 0) {
			price.innerHTML = "$" + data["Itemized"][i]["Price"];
		}
		totalPrice += data["Itemized"][i]["Price"];
	}
	
	// Cost of repair table HTML tags
	document.getElementById("TotalPrice").innerHTML += totalPrice;
	if(totalPrice <= data["Policy"]["MustPayMax"]) {
		document.getElementById("TotalCoverage").innerHTML += 0;
		document.getElementById("TotalDue").innerHTML += totalPrice;
	} else {
		document.getElementById("TotalCoverage").innerHTML += (totalPrice-data["Policy"]["MustPayMax"]).toFixed(2);
		document.getElementById("TotalDue").innerHTML += data["Policy"]["MustPayMax"];
	}
	
	// Repair policy HTML tags
	let dueDate = new Date(data["Invoice"]["Date"]);
	dueDate = dueDate.addDays(data["Policy"]["DaysToPay"]);
	document.getElementById("PayTo").innerHTML += data["Policy"]["PayableTo"];
	document.getElementById("PayBy").innerHTML += dueDate.toLocaleDateString('en-US');
	document.getElementById("Phone").innerHTML = data["Policy"]["Phone"];
	
	
});

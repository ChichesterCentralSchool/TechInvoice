Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

window.addEventListener("load", function(event) {
	
	document.getElementById("Logo").src = data["Images"]["Logo"];
	document.getElementById("Title").innerHTML = data["Policy"]["Title"];
	let date = new Date(data["Invoice"]["Date"]).toLocaleDateString('en-US')
	document.getElementById("InvoiceDate").innerHTML += date;
	let invoiceNumber = data["Invoice"]["Number"].toString();
	while(invoiceNumber.length < 2) {
		invoiceNumber = "0" + invoiceNumber;
	}
	date = new Date(data["Invoice"]["Date"]).toLocaleDateString('en-US').replaceAll("/","");
	document.getElementById("InvoiceNumber").innerHTML += date  + invoiceNumber;
	document.getElementById("DeviceID").innerHTML += data["Invoice"]["DeviceID"];
	document.getElementById("UserName").innerHTML += data["Invoice"]["UserName"];
	
	document.getElementById("DeviceBrand").innerHTML += data["Device"]["Brand"];
	document.getElementById("DeviceSN").innerHTML += data["Device"]["Serial"];
	date = new Date(data["Device"]["manufactured"]).toLocaleDateString('en-US')
	document.getElementById("DeviceManuf").innerHTML += date;
	document.getElementById("DeviceMSRP").innerHTML += "$" + data["Device"]["MSRP"];
	
	document.getElementById("DeviceTop").src = data["Images"]["Top"];
	document.getElementById("DeviceBottom").src = data["Images"]["Bottom"];
	document.getElementById("DeviceZoomed").src = data["Images"]["Zoomed"];
	
	document.getElementById("IncidentReported").innerHTML = data["Report"]["Incident"];
	document.getElementById("RepairNotes").innerHTML = data["Report"]["Notes"];
	
	let totalPrice = 0;
	let itemized = document.getElementById("Itemized");
	for(i=0; i<6; i+=1) {
		let row = itemized.insertRow(-1);
		let description = row.insertCell(0);
		let price = row.insertCell(1);
		description.innerHTML = data["Itemized"][i]["Description"];
		price.innerHTML = "$" + data["Itemized"][i]["Price"];
		totalPrice += data["Itemized"][i]["Price"];
	}
	
	document.getElementById("TotalPrice").innerHTML += totalPrice;
	if(totalPrice <= data["Policy"]["MustPayMax"]) {
		document.getElementById("TotalCoverage").innerHTML += 0;
		document.getElementById("TotalDue").innerHTML += totalPrice;
	} else {
		document.getElementById("TotalCoverage").innerHTML += (totalPrice-data["Policy"]["MustPayMax"]).toFixed(2);
		document.getElementById("TotalDue").innerHTML += data["Policy"]["MustPayMax"];
	}
	
	let dueDate = new Date(data["Invoice"]["Date"]);
	dueDate = dueDate.addDays(data["Policy"]["DaysToPay"]);
	
	document.getElementById("PayTo").innerHTML += data["Policy"]["PayableTo"];
	document.getElementById("PayBy").innerHTML += dueDate.toLocaleDateString('en-US');
	document.getElementById("Phone").innerHTML = data["Policy"]["Phone"];
	
	
});
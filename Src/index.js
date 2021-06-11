// Adds days on to a date
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// Set images to Blank.jpg if no URL is given
function set_image(imageUrl) {
	if (imageUrl == "")
		return "./Src/Blank.png";
	return imageUrl;
}

// Set dates to 1/1/1970 if no date is given
function set_date(date) {
	if (date == "")
		return "Jan 1, 1970";
	return date;
}

// Create an hash number using a string
function hash_str(string) {
	var hash = 0;
	if (string.length == 0)
		return hash;
	for (i = 0 ; i<string.length; i++) {
		ch = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + ch;
		hash = hash & hash;
	}
	return Math.abs(hash);
}

// Add CSS to the header of the document
function css_injector(code) {
	let styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = code;
	document.head.appendChild(styleSheet);
}

// Run when the page is loaded
window.addEventListener("load", function(event) {

	// Set page colors
	css_injector("#Body {background-color: " + data["Theme"]["Body"] + "}");
	css_injector("#Header {background-color: " + data["Theme"]["Header"] + "}");
	css_injector("#IncidentNotes {background-color: " + data["Theme"]["Notes"] + "}");
	css_injector("#SubNotes {background-color: " + data["Theme"]["Notes"] + "}");
	css_injector("tr:nth-child(even) {background-color: " + data["Theme"]["Table"]["Even"] + "}");
	css_injector("tr:nth-child(odd) {background-color: " + data["Theme"]["Table"]["Odd"] + "}");
	
	// Header HTML tags
	document.getElementById("Logo").src = set_image(data["Images"]["Logo"]);
	document.getElementById("Title").innerHTML = data["Report"]["Title"];
	document.getElementById("Subtitle").innerHTML = data["Report"]["Subtitle"];
	let date = new Date(set_date(data["Invoice"]["Date"])).toLocaleDateString('en-US')
	document.getElementById("InvoiceDate").innerHTML += date;
	date = new Date(set_date(data["Invoice"]["Date"])).toLocaleDateString('en-US');
	let invoiceNumber = date + data["Invoice"]["DeviceID"] + data["Invoice"]["UserName"];
	document.getElementById("InvoiceNumber").innerHTML += hash_str(invoiceNumber);
	document.getElementById("DeviceID").innerHTML += data["Invoice"]["DeviceID"];
	document.getElementById("UserName").innerHTML += data["Invoice"]["UserName"];

	// Device info HTML tags
	document.getElementById("DeviceBrand").innerHTML += data["Device"]["Brand"];
	document.getElementById("DeviceSN").innerHTML += data["Device"]["Serial"];
	date = new Date(set_date(data["Device"]["manufactured"])).toLocaleDateString('en-US')
	document.getElementById("DeviceManuf").innerHTML += date;
	document.getElementById("DeviceMSRP").innerHTML += "$" + data["Device"]["MSRP"];

	// Device image HTML tags
	document.getElementById("DeviceLeftTitle").innerHTML = data["Images"]["Left"]["Title"];
	document.getElementById("DeviceMiddleTitle").innerHTML = data["Images"]["Middle"]["Title"];
	document.getElementById("DeviceRightTitle").innerHTML = data["Images"]["Right"]["Title"];
	document.getElementById("DeviceLeftPath").src = set_image(data["Images"]["Left"]["Path"]);
	document.getElementById("DeviceMiddlePath").src = set_image(data["Images"]["Middle"]["Path"]);
	document.getElementById("DeviceRightPath").src = set_image(data["Images"]["Right"]["Path"]);

	// Left side note HTML tags
	document.getElementById("IncidentNotes").innerHTML = data["Report"]["Incident"];
	document.getElementById("SubNoteText").innerHTML = data["Report"]["Subtitle"];
	document.getElementById("SubNotes").innerHTML = data["Report"]["Repair"];

	// Itemized table HTML tags
	document.getElementById("CostOfText").innerHTML = data["Report"]["Subtitle"];
	let totalPrice = 0;
	let itemized = document.getElementById("Itemized");
	for(i=0; i<6; i+=1) {
		let row = itemized.insertRow(-1);
		let description = row.insertCell(0);
		let price = row.insertCell(1);
		description.innerHTML =
			"<a href='"+ data["Itemized"][i]["Link"] + "'>"
			+ data["Itemized"][i]["Description"] + "</a>";
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
	date = new Date(set_date(data["Invoice"]["Date"]));
	date = date.addDays(data["Policy"]["DaysToPay"]);
	document.getElementById("PayTo").innerHTML += data["Policy"]["PayableTo"];
	document.getElementById("PayBy").innerHTML += date.toLocaleDateString('en-US');
	document.getElementById("Phone").innerHTML = data["Policy"]["Phone"];

});

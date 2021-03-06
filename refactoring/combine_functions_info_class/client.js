// Data
function acquireReading(){
	const reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};
	return reading;
}

class Reading {
	constructor(data){
		this._customer = data.customer;
		this._quantity = data.quantity;
		this._month = data.month;
		this._year = data.year;
	}
	get customer() {return this._customer;}
	get quantity() {return this._quantity;}
	get month() {return this._month;}
	get year() {return this._year;}
	get baseCharge() {	// 기본 요금 계산 함수
		return baseRate(this.month, this.year) * this.quantity;
	}

	get taxableCharge() {
		return Math.max(0, this.baseCharge - taxThreshold(this.year));
	}
}

// Client1
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;


// Client2
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge

function taxableChargeFn(aReading) {
	return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}


// Client3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;
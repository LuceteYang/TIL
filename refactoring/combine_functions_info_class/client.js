// Data
function acquireReading(){
	const reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};
	return reading;
}


// Client1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;


// Client2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const texableCharge = Math.max(0, base - taxThreshold(aReading.year));


// Client3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {	// 기본 요금 계산 함수
	return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
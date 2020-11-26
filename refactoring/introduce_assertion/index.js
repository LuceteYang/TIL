class Customer {
  _discountRate: number;

  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0);
    this._discountRate = aNumber;
  }

  get discountRate() {
    return this._discountRate;
  }

  applyDiscount(aNumber) {
    if (!this._discountRate) return aNumber;
    else {
      return aNumber - (this._discountRate) * aNumber;
    } 
  }
}
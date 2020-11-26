class Customer {
  _discountRate: number;

  set discountRate(aNumber) {
    this._discountRate = aNumber;
  }

  get discountRate() {
    return this._discountRate;
  }

  applyDiscount(aNumber) {
    if (!this._discountRate) return aNumber;
    else {
      assert(this._discountRate >= 0);
      return aNumber - (this._discountRate) * aNumber;
    } 
  }
}
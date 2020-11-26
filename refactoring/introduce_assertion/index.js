class Customer {
  discountRate: number;

  applyDiscount(aNumber) {
    return (this.discountRate)
      ? aNumber - (this.discountRate) * aNumber
      : aNumber;
  }
}
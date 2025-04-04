
export default  function ShippingOptions({ cartItems }: { cartItems: any[] }) {
  const shippingOptions = [
    { name: "Standard Shipping", price: 5.0 },
    { name: "Express Shipping", price: 15.0 },
    { name: "Overnight Shipping", price: 30.0 },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="text-xl font-semibold">Shipping Options</h2>
      <ul className="space-y-2">
        {shippingOptions.map((option) => (
          <li key={option.name} className="flex justify-between">
            <span>{option.name}</span>
            <span>${option.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

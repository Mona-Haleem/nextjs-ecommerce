import { Order, Product } from "../types";

export function calculateExpectedDeliveryDate(
  items: Product[],
  orderDate: Date
): string {
  const regex =
    /Ships(?:\s+in)?\s+(?:(\d+)(?:-(\d+))?\s+)?(month|week|day|business day|overnight)s?/i;
  const daysToDeliver = items.reduce((acc: number, item: Product) => {
    const match = item.shippingInformation?.match(regex) ?? null;
    console.log(match,item.shippingInformation)
    const deliverIn = convertShippingTime(match);
    console.log(deliverIn)
    return deliverIn > acc ? deliverIn : acc;
  }, 0);

  const expectedDay = new Date(orderDate);
  expectedDay.setDate(expectedDay.getDate() + daysToDeliver);
  return expectedDay.toISOString();
}
export function calculateShippingStatus(order: Order) {
  const today = new Date();
  console.log(order)
  if (!order.expectedDeliveryDate) {
    order.expectedDeliveryDate = calculateExpectedDeliveryDate(
      order.items,
      new Date(order.date)
    );
  }

  const expectedDay = new Date(order.expectedDeliveryDate);
  console.log(expectedDay)
  const rand = Math.random();

  let status: Order["status"];
  if (today < expectedDay) {
    status = rand < 0.9 ? "pending" : "delivered";
  } else {
    status = rand < 0.8 ? "delivered" : "late";
  }


  
  return status;
}

function convertShippingTime(match: RegExpMatchArray | null): number {
  if (!match) return 0;

  const [, minStr, maxStr, unit] = match;

  // Numbers or defaults
  const min = minStr ? parseInt(minStr, 10) : 0;
  const max = maxStr ? parseInt(maxStr, 10) : 0;

  // Convert units to days
  const unitToDays = (count: number, unit: string): number => {
    switch (unit) {
      case "day":
        return count;
      case "business day":
        return count + Math.floor(count / 5) * 2
      case "week":
        return count * 7;
      case "month":
        return count * 30;
      case "overnight":
        return 1;
      default:
        return count;
    }
  };

  if (unit === "overnight") return 1;

  const minDays = unitToDays(min, unit);
  const maxDays = max ? unitToDays(max, unit) : minDays;

  return Math.round((minDays + maxDays) / 2);
}
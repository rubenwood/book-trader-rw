import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"


function totalBooks(sales: Sale[]): number {
    return sales.reduce((total, sale) => total + sale.book_count, 0);
}
function totalSaleValue(sales: Sale[]): number {
    return sales.reduce((total, sale) => total + sale.sale_value, 0);
}
function totalCost(sales: Sale[]): number {
    return sales.reduce((total, sale) => total + sale.cost, 0);
}

function highestTotalValueShop(sales: Sale[]): number | null {
    const maxSale = sales.reduce((max, sale) => sale.sale_value > max.sale_value ? sale : max, sales[0]);
    return maxSale ? maxSale.shop_id : null;
}

export function SalesPane(props: { sales: Sale[] }) {
    return (
        <div className="p-4">
            <Table className="mt-4">
                <TableCaption>List of your sales</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Shop</TableHead>
                        <TableHead className="font-bold">Books Sold</TableHead>
                        <TableHead className="font-bold">Sale Value</TableHead>
                        <TableHead className="font-bold">Cost</TableHead>
                        <TableHead className="font-bold">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.sales.map((sale, index) => (
                        <TableRow key={index}>
                            <TableCell>{sale.shop_id}</TableCell>
                            <TableCell>{sale.book_count}</TableCell>
                            <TableCell>£{sale.sale_value.toFixed(2)}</TableCell>
                            <TableCell>£{sale.cost.toFixed(2)}</TableCell>
                            <TableCell>{sale.date.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="font-bold">{totalBooks(props.sales)}</TableCell>
                        <TableCell className="font-bold">£{totalSaleValue(props.sales).toFixed(2)}</TableCell>
                        <TableCell className="font-bold">£{totalCost(props.sales).toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Separator className="my-4" />
            <p>Profit: £{(totalSaleValue(props.sales) - totalCost(props.sales)).toFixed(2)}</p>
            <br/>
            <p className="text-sm text-muted-foreground">
                Highest value store (individual sale): 
            </p>
            <p className="text-sm text-muted-foreground">
                Highest value store (total sale value): {highestTotalValueShop(props.sales) !== null ? highestTotalValueShop(props.sales) : "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">
                Highest value store (per book): 
            </p>
        </div>
    );
}
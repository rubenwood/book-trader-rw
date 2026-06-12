import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function totalRevenue(sales: Sale[]): number {
    return sales.reduce((total, sale) => total + sale.sale_value, 0);
}

export function SalesPane(props: { sales: Sale[] }) {
    return (
        <div className="p-4">
            <Table className="mt-4">
                <TableCaption>List of your sales</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Shop Name</TableHead>
                        <TableHead className="font-bold">Books Sold</TableHead>
                        <TableHead className="font-bold">Total Price</TableHead>
                        <TableHead className="font-bold">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.sales.map((sale, index) => (
                        <TableRow key={index}>
                            <TableCell>{sale.shop_id}</TableCell>
                            <TableCell>{sale.book_count}</TableCell>
                            <TableCell>£{sale.sale_value.toFixed(2)}</TableCell>
                            <TableCell>{sale.date.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="font-bold">£{totalRevenue(props.sales).toFixed(2)}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
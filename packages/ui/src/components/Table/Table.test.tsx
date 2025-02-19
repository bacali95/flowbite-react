import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { TableProps } from "./Table";
import { Table } from "./Table";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableHeadCell } from "./TableHeadCell";
import { TableRow } from "./TableRow";

describe("Components / Table", () => {
  it("should be able to render a table", () => {
    render(<TestTable />);

    expect(screen.getByTestId("table-element")).toBeTruthy();
  });

  it("should be able to render a striped table", () => {
    render(<TestTable striped />);

    const rows = screen.getAllByTestId("table-row-element");

    expect(rows[0].className).toContain("odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700");
  });

  it("should be able to render a hoverable table", () => {
    render(<TestTable hoverable />);

    const rows = screen.getAllByTestId("table-row-element");

    expect(rows[0].className).toContain("hover:bg-gray-50 dark:hover:bg-gray-600");
  });
});

const TestTable = (props: TableProps) => (
  <Table {...props}>
    <TableHead>
      <TableRow>
        <TableHeadCell>Product name</TableHeadCell>
        <TableHeadCell>Color</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>
          <span className="sr-only">Edit</span>
        </TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody className="divide-y">
      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          Apple MacBook Pro 17"
        </TableCell>
        <TableCell>Sliver</TableCell>
        <TableCell>Laptop</TableCell>
        <TableCell>$2999</TableCell>
        <TableCell>
          <a href="/tables" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            Edit
          </a>
        </TableCell>
      </TableRow>
      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          Microsoft Surface Pro
        </TableCell>
        <TableCell>White</TableCell>
        <TableCell>Laptop PC</TableCell>
        <TableCell>$1999</TableCell>
        <TableCell>
          <a href="/tables" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            Edit
          </a>
        </TableCell>
      </TableRow>
      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</TableCell>
        <TableCell>Black</TableCell>
        <TableCell>Accessories</TableCell>
        <TableCell>$99</TableCell>
        <TableCell>
          <a href="/tables" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            Edit
          </a>
        </TableCell>
      </TableRow>
      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          Google Pixel Phone
        </TableCell>
        <TableCell>Gray</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>$799</TableCell>
        <TableCell>
          <a href="/tables" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            Edit
          </a>
        </TableCell>
      </TableRow>
      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Apple Watch 5</TableCell>
        <TableCell>Red</TableCell>
        <TableCell>Wearables</TableCell>
        <TableCell>$999</TableCell>
        <TableCell>
          <a href="/tables" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            Edit
          </a>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

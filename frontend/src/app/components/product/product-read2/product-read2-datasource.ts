import { Product } from "./../product.model";
import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  { id: 1, name: "Hydrogen" },
  { id: 2, name: "Helium" },
  { id: 3, name: "Lithium" },
  { id: 4, name: "Beryllium" },
  { id: 5, name: "Boron" },
  { id: 6, name: "Carbon" },
  { id: 7, name: "Nitrogen" },
  { id: 8, name: "Oxygen" },
  { id: 9, name: "Fluorine" },
  { id: 10, name: "Neon" },
  { id: 11, name: "Sodium" },
  { id: 12, name: "Magnesium" },
  { id: 13, name: "Aluminum" },
  { id: 14, name: "Silicon" },
  { id: 15, name: "Phosphorus" },
  { id: 16, name: "Sulfur" },
  { id: 17, name: "Chlorine" },
  { id: 18, name: "Argon" },
  { id: 19, name: "Potassium" },
  { id: 20, name: "Calcium" },
];

export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        "Please set the paginator and sort on the data source before connecting."
      );
    }
  }

  disconnect(): void {}

  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === "asc";
      switch (this.sort?.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "id":
          return compare(+(a.id ?? 0), +(b.id ?? 0), isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

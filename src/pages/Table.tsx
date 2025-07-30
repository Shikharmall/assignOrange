import { useEffect, useState } from "react";
import { getDataAPI } from "../api/getDataAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { ArtApiResponse, Artwork, TableColumn } from "../utils/types";

const columns: TableColumn[] = [
  { field: "title", header: "Title" },
  { field: "place_of_origin", header: "Place of Origin" },
  { field: "artist_display", header: "Artist" },
  { field: "inscriptions", header: "Inscriptions" },
  { field: "date_start", header: "Start Date" },
  { field: "date_end", header: "End Date" },
];

const Table = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const res: ArtApiResponse = await getDataAPI(page + 1, limit);
        setData(res.data);
        setTotalRecords(res.pagination.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [page, limit]);

  console.log(page + " and " + limit);

  return (
    <DataTable
      value={data}
      lazy
      paginator
      rows={limit}
      first={page * limit}
      totalRecords={totalRecords}
      rowsPerPageOptions={[10, 25, 50, 100]}
      onPage={(e) => {
        setPage(e.first / e.rows);
        setLimit(e.rows);
      }}
      selection={selectedRows}
      onSelectionChange={(e) => setSelectedRows(e.value)}
      selectionMode="multiple"
      dataKey="id"
      tableStyle={{ minWidth: "50rem" }}
      loading={loader}
    >
      <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
      <Column field="id" header="ID" body={(rowData) => rowData.id || "—"} />
      {columns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} />
      ))}
    </DataTable>

  );
};

export default Table;

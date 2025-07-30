import { useEffect, useState, useRef } from "react";
import { getDataAPI } from "../api/getDataAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
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
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [rows, setRows] = useState<number>(0);
  const op = useRef<OverlayPanel>(null);

  const addRows = (inputRows: number, currentData: Artwork[] = data) => {
    const parsedRows = Math.max(0, inputRows);
    const selectedData = currentData.slice(0, parsedRows);
    const selectedIds = selectedData.map((row) => row.id);

    const combinedIds = Array.from(new Set([...selectedRowIds, ...selectedIds]));
    setSelectedRowIds(combinedIds);
    localStorage.setItem("selectedIds", JSON.stringify(combinedIds));

    const updatedSelectedRows = [
      ...selectedRows,
      ...selectedData.filter((d) => !selectedRows.some((s) => s.id === d.id)),
    ];
    setSelectedRows(updatedSelectedRows);

    const remaining = parsedRows - Math.min(limit, parsedRows);
    setRows(remaining);
    localStorage.setItem("rows", String(remaining));

    op.current?.hide();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const res: ArtApiResponse = await getDataAPI(page + 1, limit);
        setData(res.data);
        setTotalRecords(res.pagination.total);

        const storedIds: number[] = JSON.parse(localStorage.getItem("selectedIds") || "[]");
        setSelectedRowIds(storedIds);

        const matchedRows = res.data.filter((item) => storedIds.includes(item.id));
        const updatedSelection = [
          ...selectedRows,
          ...matchedRows.filter((r) => !selectedRows.some((s) => s.id === r.id)),
        ];
        setSelectedRows(updatedSelection);

        const rowsFromStorage = Number(localStorage.getItem("rows"));
        if (!isNaN(rowsFromStorage) && rowsFromStorage > 0) {
          addRows(rowsFromStorage, res.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return (
    <>
      <div className="card flex justify-content-center mb-4">
        <OverlayPanel ref={op}>
          <InputText
            keyfilter="int"
            placeholder="Select rows..."
            value={rows.toString()}
            onChange={(e) => setRows(Number(e.target.value))}
          />
          <br />
          <br />
          <Button type="button" label="Submit" onClick={() => addRows(rows)} />
        </OverlayPanel>
      </div>

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
        onSelectionChange={(e) => {
          const currentSelections: Artwork[] = e.value;
          const currentIds = currentSelections.map((row) => row.id);

          const newSelectedIds = Array.from(
            new Set([
              ...selectedRowIds.filter((id) => currentIds.includes(id)),
              ...currentIds,
            ])
          );
          setSelectedRowIds(newSelectedIds);
          localStorage.setItem("selectedIds", JSON.stringify(newSelectedIds));

          setSelectedRows((prev) => {
            const currentSelectedFromData = data.filter((d) => currentIds.includes(d.id));
            const rest = prev.filter((p) => !data.some((d) => d.id === p.id));
            return [...rest, ...currentSelectedFromData];
          });
        }}
        selectionMode="multiple"
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
        loading={loader}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "4rem" }}
          header={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span style={{ flex: 1 }} />
              <Button
                icon="pi pi-chevron-down"
                className="p-button-sm p-button-text"
                onClick={(e) => op.current?.toggle(e)}
                type="button"
              />
            </div>
          }
        />

        {/* <Column field="id" header="ID" body={(rowData) => rowData.id || "—"} /> */}
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </>
  );
};

export default Table;

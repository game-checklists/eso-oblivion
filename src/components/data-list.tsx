import * as React from "react";
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridCell,
  DataGridBody,
  createTableColumn,
  TableCellLayout,
  Field,
  Text,
  ProgressBar,
  tokens,
} from "@fluentui/react-components";

interface QuestItem {
  id: string;
  name: string;
  isOptional?: boolean;
  condition?: string;
}

interface DataListProps {
  data: QuestItem[];
  heading: string;
}

const columns = [
  createTableColumn<QuestItem>({
    columnId: "name",
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => <Text weight="semibold">Name</Text>,
    renderCell: (item) => (
      <TableCellLayout>
        <div>
          <div>{item.name}</div>
          {typeof item.isOptional === "boolean" && (
            <Text
              size="small"
              style={{ color: "gray", marginTop: 2, fontStyle: "italic" }}
            >
              {item.isOptional ? "Optional" : "Mandatory"}
            </Text>
          )}
          {typeof item.condition === "string" && (
            <Text
              size="small"
              style={{ color: "gray", marginTop: 2, fontStyle: "italic" }}
            >
              {item.condition}
            </Text>
          )}
        </div>
      </TableCellLayout>
    ),
  }),
  createTableColumn<QuestItem>({
    columnId: "location",
    renderHeaderCell: () => <Text weight="semibold">&nbsp;</Text>,
    renderCell: () => <TableCellLayout>&nbsp;</TableCellLayout>,
  }),
];

export const DataList: React.FC<DataListProps> = ({ data, heading }) => {
  // Key for localStorage per table/heading
  const storageKey = `eso-oblivion-checklist-progress-${heading
    .replace(/\s+/g, "_")
    .toLowerCase()}`;

  // Initialize from localStorage or empty set
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return new Set(parsed);
      }
    } catch {
      // ignore parsing errors
    }
    return new Set();
  });

  const onSelectionChange = (_ev: any, data: any) => {
    const selectedKeySet: Set<string> = data.selectedItems;

    setSelectedItems(selectedKeySet);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(Array.from(selectedKeySet))
      );
    } catch {}
  };

  const dataTotal = data.length;
  const dataSelected = selectedItems.size;

  return (
    <div>
      <Field
        validationMessage={`${dataSelected}/${dataTotal} Completed`}
        validationState="none"
      ></Field>
      <ProgressBar
        max={dataTotal}
        value={dataSelected}
        thickness="large"
        color="success"
      />
      <DataGrid
        items={data}
        columns={columns}
        selectionMode="multiselect"
        getRowId={(item: any) => item.id}
        selectionAppearance="brand"
        focusMode="composite"
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        onSelectionChange={onSelectionChange}
        selectedItems={selectedItems} // pass selection to DataGrid so it stays controlled
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { "aria-label": "Completed" },
            }}
            style={{ backgroundColor: tokens.colorBrandShadowAmbient }}
          >
            {({ renderHeaderCell }) => (
              <>
                <DataGridHeaderCell>
                  {renderHeaderCell("name")}
                </DataGridHeaderCell>
              </>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<QuestItem>>
          {({ item, rowId }) => (
            <DataGridRow<QuestItem>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { "aria-label": "Select row" },
              }}
            >
              {({ renderCell }) => (
                <>
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                </>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

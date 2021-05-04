import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridDensitySelector,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridDensitySelector />
    </GridToolbarContainer>
  );
}

export default function DensitySelectorGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

{
  /* <Autocomplete
  id="combo-box-demo"
  options={top100Films}
  getOptionLabel={(option) => option.title}
  style={{ width: 300 }}
  renderInput={(params) => (
    <TextField {...params} label="Combo box" variant="outlined" />
  )}
/>; */
}

// import * as React from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import { useDemoData } from "@material-ui/x-grid-data-generator";

// export default function BasicSortingGrid() {
//   const { data } = useDemoData({
//     dataSet: "Commodity",
//     rowLength: 10,
//     maxColumns: 6,
//   });

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         {...data}
//         sortModel={[
//           {
//             field: "commodity",
//             sort: "asc",
//           },
//         ]}
//       />
//     </div>
//   );
// }

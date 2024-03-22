import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export function Addbutton(props) {
  return (
    <Stack display="flex" justifyContent={"right"}>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100px",
          backgroundColor: "#3A7198",
          color: "white",
          "&:hover": {
            backgroundColor: "#3A7198",
          },
        }}
      >
        {props.Name}
      </Button>
    </Stack>
  );
}

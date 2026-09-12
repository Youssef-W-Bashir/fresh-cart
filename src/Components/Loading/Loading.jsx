import { Grid } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <Grid
        visible={true}
        height="80"
        width="80"
        color="rgb(79 70 229)"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </>
  );
}

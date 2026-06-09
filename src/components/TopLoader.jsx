import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#6b7280"
      height={2}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}
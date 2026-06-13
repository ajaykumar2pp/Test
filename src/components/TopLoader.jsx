import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#2563eb"
      height={2}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}

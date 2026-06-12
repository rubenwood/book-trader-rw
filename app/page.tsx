import { MainPage } from "./components/main/main-page";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-black">
      <h1 className="mt-8 mb-6 text-center text-3xl font-bold">Book Trader</h1>
      <br/>
      <div className="flex-1">
        <MainPage />
      </div>
    </div>
  );
}

import ShopMapClient from "./components/map/ShopMap";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-black">
      <h1 className="text-xl font-bold">Book Trader</h1>
      <br/>
      <div className="flex-1">
        <ShopMapClient />
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { ShopMapClient } from "../map/ShopMap";
import { SalesPane } from "../sales/SalesPane";
import { Login } from "../login/login";

export async function MainPage() {
    const supabase = await createClient();

    const { data: shops } = await supabase
        .from("shops")
        .select("*") as { data: Shop[] };

    const { data: sales } = await supabase
        .from("sales")
        .select("*") as { data: Sale[] };

    const loggedIn = await supabase.auth.getSession().then(({ data: { session } }) => !!session);

    return (
        <div>
            {loggedIn ? (
                <div className="flex flex-col md:flex-row h-full">           
                    <SalesPane sales={sales} />
                    <ShopMapClient shops={shops} />
                </div>
            )
            :
                <Login />
            }
        </div>
    );
}
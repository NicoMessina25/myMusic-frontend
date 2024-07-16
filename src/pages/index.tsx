import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useRouter } from "next/router";
import ViewWrapper from "@/components/ViewWrapper/ViewWrapper";
import MenuNav from "@/components/MenuNav/MenuNav";



export default function Home() {
  return (
    <ViewWrapper>
      <div className="w-full flex justify-center">
        <MenuNav menuItems={[
          {
            name: "Canciones",
            route: "/songs"
          },
          {
            name: "Playlists",
          }
        ]} />
      </div>
    </ViewWrapper>
  );
}

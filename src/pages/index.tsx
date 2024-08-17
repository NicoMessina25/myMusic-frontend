import ViewWrapper from "@/components/ViewWrapper/ViewWrapper";
import MenuNav from "@/components/MenuNav/MenuNav";
import useLoggedUser from "@/hooks/useLoggedUser";
import { EProfile } from '../types/profile'



export default function Home() {
  const user = useLoggedUser()

  return (
    <ViewWrapper>
      <div className="w-full flex justify-center">
        <MenuNav menuItems={[
          {
            name: "Canciones",
            route: "/songs"
          },
          {
            name: "Playlist",
            route: "/playlists",
          },
          {
            name: "Usuarios",
            visible: user?.profile?.profileId == EProfile.ADMIN,
            route: "/users"
          }
        ]} />
      </div>
    </ViewWrapper>
  );
}

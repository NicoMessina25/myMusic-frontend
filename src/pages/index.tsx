import Title from "@/components/Labels/Title/Title";
import ViewWrapper from "@/components/ViewWrapper/ViewWrapper";
import useLoggedUser from "@/hooks/useLoggedUser";



export default function Home() {
  const user = useLoggedUser()

  return (
    <ViewWrapper>
      <div className="flex-grow flex mt-10 justify-center">   
        <h1 className="text-6xl font-bold">
          Bienvenido {user?.username}!
        </h1>
      </div>
    </ViewWrapper>
  );
}

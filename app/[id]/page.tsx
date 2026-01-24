"use server";
import getUserByUserName from "../actions/getUserByUserName";
import Image from "next/image";
import RenderLinks from "@/components/layout/renderLinks";
import Not_found from "@/components/layout/not_found";

type PageProps = {
  params: { id: string };
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const data = await getUserByUserName(id);

  if (!data) {
    return <Not_found />;
  }

  return (
    <div className="h-dvh w-full  p-10 flex items-center justify-center">
      <div className="w-full max-sm:px-2 flex items-center flex-col max-w-120  h-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-lg p-5">
        <Image
          src={data.image || "/default_avatar.png"}
          alt="Avatar"
          width={110}
          height={110}
          className="rounded-full max-md:w-20 mb-4 border border-gray-200"
        />
        <h1 className="text-3xl max-md:text-xl font-semibold mb-2">
          {data.name}
        </h1>
        <p className="text-gray-600 mb-4 max-md:text-sm text-lg">
          @{data.username}
        </p>

        {data.bio && (
          <p className="text-center max-lg:text-sm text-gray-700 mb-4">
            {data.bio}
          </p>
        )}
        <RenderLinks links={data.links || []} cards={data.cards || []} />
      </div>
    </div>
  );
};

export default Page;

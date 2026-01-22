type PageProps = {
  params: { id: string };
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  console.log(id)
  return <div>Page {id}</div>;
};

export default Page;

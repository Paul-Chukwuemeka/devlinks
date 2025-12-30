import getUserInfo from "@/app/actions/getUserInfo";

export async function getUser(id: string) {
  const data = await getUserInfo(id);
  return data
}

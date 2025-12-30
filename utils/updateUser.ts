import update from "@/app/actions/updateUserProfile";
import { profileType } from "@/types/profile-type";



export default async function UpdateUserProfile(id: string, data: profileType) {
  await update(id, data);
}

import { supabaseClient } from "@/lib/supabase";

export type UploadResult = {
  publicUrl: string | null;
};

export async function uploadUserPhoto(file: File): Promise<UploadResult> {
  const supabase = supabaseClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `user_photos/${fileName}`;

  const { error } = await supabase.storage
    .from("user_photos")
    .upload(filePath, file);
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("user_photos")
    .getPublicUrl(filePath);
  const publicUrl = urlData?.publicUrl ?? null;

  return { publicUrl };
}

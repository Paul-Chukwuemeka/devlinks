import { useState, useEffect, useRef } from "react";
import { supabaseClient } from "@/lib/supabase";

export const useGetAvatars = () => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = supabaseClient();
  const mounted = useRef(true);
  useEffect(() => {
    const getAvatars = async () => {
      const { data, error } = await supabase.storage.from("avatars").list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

      if (error) {
        console.error("Error fetching avatars:", error);
        return [];
      }

      const names = data.map((item) => item.name);
      const urls = await Promise.all(
        names.map(
          (name) =>
            supabase.storage.from("avatars").getPublicUrl(name).data.publicUrl
        )
      );
      return urls.filter((url): url is string => url !== null);
    };
    mounted.current = true;

    const fetchAvatars = async () => {
      try {
        const urls = await getAvatars();
        if (mounted.current) setAvatars(urls);
      } catch (err) {
        if (mounted.current)
          setError(
            err instanceof Error ? err.message : "Failed to fetch avatars"
          );
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    fetchAvatars();

    return () => {
      mounted.current = false;
    };
  }, [supabase]);

  return { avatars, loading, error };
};

import { LinkType } from "@/types/types";
import { useState, useEffect, useRef } from "react";
import { getLinks } from "@/app/actions/getLinks";

const useGetLinks = (id: string) => {
  const [response, setResponse] = useState<LinkType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const mounted = useRef(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        if (mounted.current) {
          const res = await getLinks(id);
          setResponse(res)
        }
      } catch (error) {
        if (mounted.current) setError((error as Error).message);
      } finally {
        if (mounted.current) setLoading(false);
      }
    }

    fetchLinks();
    return () => {
      mounted.current = false;
    };
  }, [id]);
  return { response, error, loading };
};

export default useGetLinks;

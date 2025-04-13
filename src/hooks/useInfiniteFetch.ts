import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { Query } from "appwrite";

const useInfiniteFetch = (
  baseQuery: string[],
  fetcher: (
    queries?: string[]
  ) => Promise<false | Models.DocumentList<Models.Document>>,
  limit: number = 10
) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState<string[]>(
    baseQuery.concat(Query.limit(limit))
  );

  const [data, setData] = useState<
    false | Models.DocumentList<Models.Document>
  >({ documents: [], total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State to track the debounce timeout
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const refreshData = () => {
    setData({ documents: [], total: 0 });
    setQuery(baseQuery.concat(Query.limit(limit)));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          // Clear the previous timeout (if any)
          if (debounceTimeout) {
            clearTimeout(debounceTimeout);
          }

          // Set a new timeout to delay the API call
          const timeout = setTimeout(async () => {
            // trigger API call
            if (!query) return;
            if (
              data &&
              data.documents.length &&
              data.documents.length >= data.total
            )
              return;

            setIsLoading(true);

            const res = await fetcher(query);

            if (res) {
              setData((prev) => {
                return {
                  documents:
                    prev && prev.documents
                      ? [...(prev?.documents || []), ...res.documents]
                      : res.documents,
                  total: res.total,
                };
              });
              setError(null);

              setQuery(
                baseQuery.concat(
                  Query.limit(limit),
                  Query.cursorAfter(
                    res?.documents[res.documents.length - 1].$id
                  )
                )
              );
            } else {
              setError("Failed to load data. Please refresh this page");
            }

            setIsLoading(false);
          }, 10);

          setDebounceTimeout(timeout);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }

      // Clear timeout on unmount
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout, isLoading, query]);

  useEffect(() => {
    refreshData();
  }, [baseQuery]);

  return { data, isLoading, error, refreshData, loaderRef };
};

export default useInfiniteFetch;

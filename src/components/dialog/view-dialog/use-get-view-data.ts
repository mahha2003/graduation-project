import { useEffect, useRef, useState } from "react";

type UseGetViewDataProps<T> = {
  id: number | string | null;
  isOpen: boolean;
  getById:
    | ((id: number) => Promise<T | null | undefined>)
    | ((id: string) => Promise<T | null | undefined>);
};

export function useGetViewData<T>({
  id,
  isOpen,
  getById,
}: UseGetViewDataProps<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const alreadyFetched = useRef(false);

  useEffect(() => {
    function fetchData() {
      if (id === null) return;
      setLoading(true);
      //@ts-expect-error //!! Typescript Can not detect the type of the id
      getById(id)
        .then((result) => {
          if (result) {
            setData(result);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    function clearData() {
      setData(null);
    }

    if (isOpen && !alreadyFetched.current) {
      fetchData();
      alreadyFetched.current = true;
    }

    if (!isOpen) {
      clearData();
      alreadyFetched.current = false;
    }
  }, [isOpen, id, data, loading, getById]);

  return { loading, data };
}

import { useState, useEffect } from "react";

/**
 * Hook personalizado para realizar solicitudes de datos.
 * @param fetchFunction - La función asíncrona que realiza la solicitud de datos.
 * @returns Un objeto con los datos, estado de carga y error.
 */
const useFetch = <T>(
  fetchFunction: () => Promise<T>
): {
  data: T | null;
  loading: boolean;
  error: string | null;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones de estado en componentes desmontados

    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message || "An error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup para evitar actualizaciones de estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useFetch;

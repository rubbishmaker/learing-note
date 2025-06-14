import { useRef } from "react";
/**
 * Custom hook to handle cancellable requests.
 * @param {Function} request - The request function to be called.
 * @param {Object} params - Parameters to be passed to the request function.
 * @returns {Object} - An object containing the fetchData function, cancel function, and isCancelled status.
 */

interface UseCancalRequest {
  request?: (params: any) => Promise<any>;
  params?: any;
}
export default ({ request, params }: UseCancalRequest) => {
  const abortRef = useRef<AbortController | null>(null);
  const fetchData = async () => {
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;
    const loadData = await Promise.race([
      request?.(params),
      new Promise((_, reject) => {
        abortRef.current?.signal?.addEventListener("abort", () => {
          reject(new Error("接口取消了"));
        });
      }),
    ]);
    return loadData;
  };

  return {
    fetchData,
    cancel: () => {
      abortRef.current?.abort();
      abortRef.current = null;
    },
  };
};

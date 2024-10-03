/* eslint-disable react-hooks/exhaustive-deps */
import { deleteItem, setItem, getItem } from "@/lib/async-storage";
import { useReducer, useEffect, useCallback } from "react";

type State<T> = {
  loading: boolean;
  value: T | null;
};

type Action<T> =
  | { type: "setValue"; value: T | null }
  | { type: "setLoading"; loading: boolean };

type UseStateHook<T> = [State<T>, (value: T | null) => void];

export function useAsyncStorageState<T>(
  initialValue: State<T> = { loading: true, value: null },
): UseStateHook<T> {
  const reducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "setValue":
        return { loading: false, value: action.value };
      case "setLoading":
        return { ...state, loading: action.loading };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);

  const setValue = (value: T | null) => {
    dispatch({ type: "setValue", value });
  };

  return [state, setValue];
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value === null) {
    await deleteItem(key);
  } else {
    await setItem(key, value);
  }
}

export function useAsyncStorage(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncStorageState<string>();

  useEffect(() => {
    setState(null); // Define o estado como carregando
    getItem(key).then((value) => {
      setState(value);
    });
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key],
  );

  return [state, setValue];
}

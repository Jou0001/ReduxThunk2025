import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()       //unwrap() er en metode der returnerer den faktiske værdi af en promise altså et typisk promise objekt
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}

//useCallback er et hook der angiver at en funktion ikke ændres over tid (mellem rendering af forskellige komponenter)
//det er med til at sikre der ikke sker et uendeligt loop - specielt benyttet ifm useEffect
//beregnet til at lave et "bugfix"
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';

const SHOP_ROUTE_PATTERN = /^\/(shop|category\/|collection\/)/;

function isShopRoute(pathname) {
  return SHOP_ROUTE_PATTERN.test(pathname);
}

/**
 * Manages search input, debounced keyword, and URL `?keyword=` sync.
 */
export function useProductSearch(debounceMs = 400) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlKeyword = searchParams.get('keyword') ?? '';
  const [inputValue, setInputValue] = useState(urlKeyword);
  const debouncedKeyword = useDebounce(inputValue.trim(), debounceMs);

  const isDebouncing = inputValue.trim() !== debouncedKeyword;

  useEffect(() => {
    setInputValue(urlKeyword);
  }, [urlKeyword]);

  useEffect(() => {
    const currentKeyword = (searchParams.get('keyword') ?? '').trim();
    if (debouncedKeyword === currentKeyword) return;

    if (isShopRoute(location.pathname)) {
      const nextParams = new URLSearchParams(searchParams);
      if (debouncedKeyword) {
        nextParams.set('keyword', debouncedKeyword);
      } else {
        nextParams.delete('keyword');
      }
      setSearchParams(nextParams, { replace: true });
      return;
    }

    if (debouncedKeyword) {
      navigate(`/shop?keyword=${encodeURIComponent(debouncedKeyword)}`, { replace: true });
    }
  }, [debouncedKeyword, location.pathname, navigate, searchParams, setSearchParams]);

  const clearSearch = useCallback(() => setInputValue(''), []);

  return useMemo(
    () => ({
      inputValue,
      setInputValue,
      debouncedKeyword,
      clearSearch,
      isDebouncing,
      hasActiveSearch: Boolean(debouncedKeyword),
    }),
    [inputValue, debouncedKeyword, clearSearch, isDebouncing]
  );
}

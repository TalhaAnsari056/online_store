import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useProductSearchContext } from '../context/ProductSearchContext';

function ProductSearch({
  className = '',
  inputClassName = '',
  onNavigate,
  showClear = true,
  id = 'product-search',
}) {
  const { inputValue, setInputValue, clearSearch, isDebouncing, hasActiveSearch } =
    useProductSearchContext();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    clearSearch();
    onNavigate?.();
  };

  return (
    <div className={className}>
      <HiMagnifyingGlass
        className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
          isDebouncing ? 'text-indigo-500' : 'text-slate-400'
        }`}
      />
      <input
        id={id}
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search streetwear..."
        className={inputClassName}
        aria-label="Search products"
        autoComplete="off"
      />
      {showClear && hasActiveSearch ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Clear search"
        >
          <HiXMark size={16} />
        </button>
      ) : null}
    </div>
  );
}

export default ProductSearch;

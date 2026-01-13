export default function QuantitySelector({ value, onChange }) {
  const increase = () => onChange(value + 1);
  const decrease = () => {
    if (value > 0) onChange(value - 1);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    if (val === "") {
      onChange(0);
      return;
    }
    const num = Number(val);
    if (!isNaN(num) && num >= 0) {
      onChange(num);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrease}
        className="px-3 py-1 bg-gray-200 rounded text-lg"
      >
        −
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInput}
        className="w-14 text-center border rounded"
      />

      <button
        onClick={increase}
        className="px-3 py-1 bg-gray-200 rounded text-lg"
      >
        +
      </button>
    </div>
  );
}

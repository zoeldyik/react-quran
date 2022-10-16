export default function ErrorComponent({ IsError }) {
  return (
    <div
      className={`w-full h-screen ${
        IsError ? "flex items-center justify-center" : "hidden"
      }`}
    >
      <div>
        <img src="error.svg" className="w-full max-w-sm" />
        <p className="text-3xl mt-5 font-semibold text-neutral-700 text-center px-5">
          Duh kok gini, salah siapa ya?
        </p>
      </div>
    </div>
  );
}

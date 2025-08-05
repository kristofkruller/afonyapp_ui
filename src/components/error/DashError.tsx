const InputError = ({ error }: { error?: string }) =>
  error ? <p className="err">{error}</p> : null;

export { InputError }
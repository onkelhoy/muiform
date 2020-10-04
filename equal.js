export default function (prevProps, nextProps) {
  if (prevProps.error !== nextProps.error) return false;
  if (prevProps.isTouched !== nextProps.isTouched) return false;

  if (prevProps.value instanceof Object) {
    if (
      Object.keys(prevProps.value).length !==
      Object.keys(nextProps.value).length
    )
      return false;
    for (const key in prevProps.value) {
      if (!nextProps.value[key]) return false;
      if (prevProps.value[key] !== nextProps.value[key]) return false;
    }

    return true;
  }
  if (prevProps.value instanceof Array) {
    if (prevProps.value.length !== nextProps.value.length) return false;
    for (let i = 0; i < prevProps.value.length; i++) {
      if (prevProps.value[i] !== nextProps.value[i]) return false;
    }

    return true;
  }

  return prevProps.value === nextProps.value;
}

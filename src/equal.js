export default function (prevProps, nextProps) {
  if (prevProps.error !== nextProps.error) return false;
  if (prevProps.isTouched !== nextProps.isTouched) return false;
  if (!checkObject(prevProps.props, nextProps.props)) return false;
  
  if (prevProps.value instanceof Object) {
    return checkObject(prevProps.value, nextProps.value);
  }
  if (prevProps.value instanceof Array) {
    if (prevProps.value.length !== nextProps.value.length) return false;
    for (let i = 0; i < prevProps.value.length; i++) {
      if (prevProps.value[i] !== nextProps.value[i]) return false;
    }
    
    return true;
  }
    
  if (prevProps.value !== nextProps.value) return false;
}

function checkObject(a, b) {
  if (Object.keys(pa).length !== Object.keys(b).length) return false;
  for (const key in pa) {
    if (!b[key]) return false;
    if (pa[key] !== b[key]) return false;
  }
  
  return true;
}

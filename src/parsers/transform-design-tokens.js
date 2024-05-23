export default function transformDesignTokens(
  inputJson,
  modifyReferences = false
) {
  function transformObject(obj) {
    const transformed = {};
    Object.keys(obj).forEach((key) => {
      let newKey = key.replace(/^\$/, ""); // Remove $ at the start of a key
      let value = obj[key];

      if (typeof value === "object" && value !== null) {
        value = transformObject(value); // Recursive call to transform nested objects
      } else if (typeof value === "string" && modifyReferences) {
        value = value.replace(/\{core\.(color|neutral)\.(.*?)\}/g, "{$1.$2}");
      }

      transformed[newKey] = value;
    });
    return transformed;
  }

  return transformObject(inputJson);
}

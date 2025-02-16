/**
 * Formats a numeric value as a currency string.
 *
 * @param {number} value - The numeric value to format.
 * @param {string} currency - The currency code (e.g., "USD", "EUR", "INR").
 * @param {Object} [options={}] - Additional formatting options for Intl.NumberFormat.
 * @returns {string} - The formatted currency string or "N/A" if the value is invalid.
 */

function formatCurrency(value, currency, options = {}) {
  if (value === null || value === undefined) return "N/A";

  if (!currency) currency = "usd";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.trim().toLowerCase(),
      ...options,
    }).format(value);
  } catch (err) {
    console.error("Currency formatting error:", err);

    return "N/A";
  }
}

/**
 * Safely retrieves a nested property from an object using a dot-separated path.
 * Handles both object properties and array indices.
 *
 * @param {Object} obj - The object to retrieve the property from.
 * @param {string} path - The path to the desired property (e.g., "user.addresses.0.street")
 * @param {*} [defaultValue="N/A"] - The default value to return if the property is not found
 * @returns {*} - The retrieved property value or the default value if the property doesn't exist
 */

function safeGet(obj, path, defaultValue = "N/A") {
  if (!obj || !path) return defaultValue;

  try {
    // Split the path into parts, handling both dots and array indices
    const parts = path.split(/\.|\[|\]/).filter(Boolean);

    const result = parts.reduce((acc, part) => {
      if (acc == null) return acc;

      // Handle both array indices and object properties
      return acc[part];
    }, obj);

    return result !== null && result !== undefined ? result : defaultValue;
  } catch (err) {
    console.error(`Error in safeGet for path "${path}":`, err);

    return defaultValue;
  }
}

export { formatCurrency, safeGet };

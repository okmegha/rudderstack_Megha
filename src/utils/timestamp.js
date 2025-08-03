/**
 * Utility function to generate current timestamp in ISO format
 * @returns {string} Current timestamp in yyyy-MM-ddTHH:mm:ss.SSSZ format
 */
function getCurrentTimestamp() {
    return new Date().toISOString();
}

module.exports = {
    getCurrentTimestamp
};
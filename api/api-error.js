class APIError extends Error {
  /**
   * @param {Response} res
   * @param {any} payload
   */
  constructor(res, payload) {
    super(`APIError. Response status ${res.status} ${res.statusText} on [${res.url}]`);
    this.status = res.status;
    this.statusText = res.statusText;
    this.url = res.url;
    this.payload = payload;
  }

  toString() {
    return `APIError. Response status ${this.status} ${this.statusText} on [${this.url}]${
      this.payload ? `\nPayload: ${JSON.stringify(this.payload, null, 2)}` : ''
    }`;
  }
}

export default APIError;

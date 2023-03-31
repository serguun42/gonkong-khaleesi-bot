class APIError extends Error {
  /**
   * @param {Response} serverResponse
   * @param {string} textResponse
   * @param {any} payload
   */
  constructor(serverResponse, textResponse, payload) {
    super(`APIError. Response status ${serverResponse.status} ${serverResponse.statusText} on [${serverResponse.url}]`);
    this.status = serverResponse.status;
    this.statusText = serverResponse.statusText;
    this.url = serverResponse.url;
    this.textResponse = textResponse;
    this.payload = payload;
  }

  toString() {
    return `APIError.\n\tResponse status ${this.status} ${this.statusText} on [${this.url}]\n\tResponse text: ${
      this.textResponse
    }${this.payload ? `\n\tPayload: ${JSON.stringify(this.payload, null, 2)}` : ''}`;
  }
}

export default APIError;

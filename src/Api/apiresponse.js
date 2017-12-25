/* eslint-disable */
export default class ApiResponse {
  constructor(data) {
    const privateScope = {};
    if (data.status) privateScope.status = data.status;
    if (data.result) privateScope.result = data.result;
    if (data.data) privateScope.data = data.data;

    this.getStatus = this.getStatus.bind(privateScope);
    this.getResult = this.getResult.bind(privateScope);
    this.getData = this.getData.bind(privateScope);
  }

  getStatus() {
    return this.status;
  }

  getResult() {
    return this.result;
  }

  getData() {
    return this.data;
  }
}

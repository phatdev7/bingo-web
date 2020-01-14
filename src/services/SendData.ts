class SendData {
  cmd: string;
  params: any;
  constructor(cmd: string) {
    this.cmd = cmd;
    this.params = {};
  }

  getCmd = () => {
    return this.cmd;
  };

  getParams = () => {
    return this.params;
  };

  addParam = (key: string, value: any) => {
    this.params[key] = value;
    return this;
  };

  addParams = (params: any) => {
    this.params = { ...this.params, ...params };
  };
}

export default SendData;

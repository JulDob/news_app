export default class Exception {
  public code: number;

  public massage: string;

  constructor(code: number, massage: string) {
    this.code = code;
    this.massage = massage;
  }
}

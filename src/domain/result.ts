export default class Result<T> {
  constructor(public success: boolean, public message: T) {}

  static ok<U>(message: U): Result<U> {
    return new Result<U>(true, message);
  }

  static fail<U>(message: U): Result<U> {
    return new Result<U>(false, message);
  }
}

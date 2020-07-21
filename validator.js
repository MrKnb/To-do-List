export default class Validator {
  static validate(value) {
    return value.trim().length > 0;
  }
}
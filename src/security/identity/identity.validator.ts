export class IdentityValidator {

  static validate(identity: any) {

    if (!identity) {
      return false;
    }

    if (identity.system !== 'KVR') {
      return false;
    }

    if (identity.status !== 'active') {
      return false;
    }

    return true;
  }

}
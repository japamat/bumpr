/**
 * Checks whether the viewing device is mobile
 */

export const checkMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile|mobile|IEMobile|Opera Mini/i.test(navigator.userAgent);

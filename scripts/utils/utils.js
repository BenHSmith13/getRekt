// Got these function from Joseph Ditton

// Makes these static, kinda
class Utils {}

Utils.sin = function(degrees) {
  return Math.sin(Utils.degToRad(degrees));
};

Utils.cos = function(degrees) {
  return Math.cos(Utils.degToRad(degrees));
};

Utils.degToRad = function(deg) {
  return deg * (Math.PI/180);
};

Utils.radToDeg = function(rad) {
  return rad * (180/Math.PI);
};

Utils.asin = function(val) {
  return Utils.radToDeg(Math.asin(val));
};

Utils.acos = function(val) {
  return Utils.radToDeg(Math.acos(val));
};

Utils.isBetween = function(lower, upper, target) {
  return target >= lower && target <= upper;
};

Utils.random = function(upper, lower = 0) {
  return _.random(lower, upper);
};

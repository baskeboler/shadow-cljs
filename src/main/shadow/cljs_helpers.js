goog.provide("shadow.cljs_helpers");
goog.require("goog.object");

shadow.cljs_helpers.find_protocol_impl = function(protocol, target) {
  // protocol impls for string,array,object,function,null and lastly default via "_"
  return goog.object.get(protocol, goog.typeOf(target)) || goog.object.get(protocol, "_");
}

// these are called by the emitted CLJS code
// unused versions will be removed by DCE

shadow.cljs_helpers.maybe_ifn0 = function (target) {
  return target.cljs$core$IFn$_invoke$arity$0 ? target.cljs$core$IFn$_invoke$arity$0() : target.call(null);
}

shadow.cljs_helpers.maybe_ifn1 = function (target,a1) {
  return target.cljs$core$IFn$_invoke$arity$1 ? target.cljs$core$IFn$_invoke$arity$1(a1) : target.call(null,a1);
}

shadow.cljs_helpers.maybe_ifn2 = function (target,a1,a2) {
  return target.cljs$core$IFn$_invoke$arity$2 ? target.cljs$core$IFn$_invoke$arity$2(a1,a2) : target.call(null,a1,a2);
}

shadow.cljs_helpers.maybe_ifn3 = function (target,a1,a2,a3) {
  return target.cljs$core$IFn$_invoke$arity$3 ? target.cljs$core$IFn$_invoke$arity$3(a1,a2,a3) : target.call(null,a1,a2,a3);
}

shadow.cljs_helpers.maybe_ifn4 = function (target,a1,a2,a3,a4) {
  return target.cljs$core$IFn$_invoke$arity$4 ? target.cljs$core$IFn$_invoke$arity$4(a1,a2,a3,a4) : target.call(null,a1,a2,a3,a4);
}

shadow.cljs_helpers.maybe_ifn5 = function (target,a1,a2,a3,a4,a5) {
  return target.cljs$core$IFn$_invoke$arity$5 ? target.cljs$core$IFn$_invoke$arity$5(a1,a2,a3,a4,a5) : target.call(null,a1,a2,a3,a4,a5);
}

shadow.cljs_helpers.maybe_ifn6 = function (target,a1,a2,a3,a4,a5,a6) {
  return target.cljs$core$IFn$_invoke$arity$6 ? target.cljs$core$IFn$_invoke$arity$6(a1,a2,a3,a4,a5,a6) : target.call(null,a1,a2,a3,a4,a5,a6);
}

shadow.cljs_helpers.maybe_ifn7 = function (target,a1,a2,a3,a4,a5,a6,a7) {
  return target.cljs$core$IFn$_invoke$arity$7 ? target.cljs$core$IFn$_invoke$arity$7(a1,a2,a3,a4,a5,a6,a7) : target.call(null,a1,a2,a3,a4,a5,a6,a7);
}

shadow.cljs_helpers.maybe_ifn8 = function (target,a1,a2,a3,a4,a5,a6,a7,a8) {
  return target.cljs$core$IFn$_invoke$arity$8 ? target.cljs$core$IFn$_invoke$arity$8(a1,a2,a3,a4,a5,a6,a7,a8) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8);
}

shadow.cljs_helpers.maybe_ifn9 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  return target.cljs$core$IFn$_invoke$arity$9 ? target.cljs$core$IFn$_invoke$arity$9(a1,a2,a3,a4,a5,a6,a7,a8,a9) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9);
}

shadow.cljs_helpers.maybe_ifn10 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  return target.cljs$core$IFn$_invoke$arity$10 ? target.cljs$core$IFn$_invoke$arity$10(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
}

shadow.cljs_helpers.maybe_ifn11 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  return target.cljs$core$IFn$_invoke$arity$11 ? target.cljs$core$IFn$_invoke$arity$11(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11);
}

shadow.cljs_helpers.maybe_ifn12 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) {
  return target.cljs$core$IFn$_invoke$arity$12 ? target.cljs$core$IFn$_invoke$arity$12(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
}

shadow.cljs_helpers.maybe_ifn13 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13) {
  return target.cljs$core$IFn$_invoke$arity$13 ? target.cljs$core$IFn$_invoke$arity$13(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13);
}

shadow.cljs_helpers.maybe_ifn14 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14) {
  return target.cljs$core$IFn$_invoke$arity$14 ? target.cljs$core$IFn$_invoke$arity$14(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14);
}

shadow.cljs_helpers.maybe_ifn15 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) {
  return target.cljs$core$IFn$_invoke$arity$15 ? target.cljs$core$IFn$_invoke$arity$15(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15);
}

shadow.cljs_helpers.maybe_ifn16 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16) {
  return target.cljs$core$IFn$_invoke$arity$16 ? target.cljs$core$IFn$_invoke$arity$16(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16);
}

shadow.cljs_helpers.maybe_ifn17 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17) {
  return target.cljs$core$IFn$_invoke$arity$17 ? target.cljs$core$IFn$_invoke$arity$17(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17);
}

shadow.cljs_helpers.maybe_ifn18 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18) {
  return target.cljs$core$IFn$_invoke$arity$18 ? target.cljs$core$IFn$_invoke$arity$18(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18);
}

shadow.cljs_helpers.maybe_ifn19 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19) {
  return target.cljs$core$IFn$_invoke$arity$19 ? target.cljs$core$IFn$_invoke$arity$19(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19);
}

shadow.cljs_helpers.maybe_ifn20 = function (target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20) {
  return target.cljs$core$IFn$_invoke$arity$20 ? target.cljs$core$IFn$_invoke$arity$20(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20) : target.call(null,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20);
}

// :fn-invoke-direct support

shadow.cljs_helpers.maybe_ifn0_direct = function(target) {
  return target.cljs$core$IFn$_invoke$arity$0 ? target.cljs$core$IFn$_invoke$arity$0() : target();
}

shadow.cljs_helpers.maybe_ifn1_direct = function(target,a1) {
  return target.cljs$core$IFn$_invoke$arity$1 ? target.cljs$core$IFn$_invoke$arity$1(a1) : target(a1);
}

shadow.cljs_helpers.maybe_ifn2_direct = function(target,a1,a2) {
  return target.cljs$core$IFn$_invoke$arity$2 ? target.cljs$core$IFn$_invoke$arity$2(a1,a2) : target(a1,a2);
}

shadow.cljs_helpers.maybe_ifn3_direct = function(target,a1,a2,a3) {
  return target.cljs$core$IFn$_invoke$arity$3 ? target.cljs$core$IFn$_invoke$arity$3(a1,a2,a3) : target(a1,a2,a3);
}

shadow.cljs_helpers.maybe_ifn4_direct = function(target,a1,a2,a3,a4) {
  return target.cljs$core$IFn$_invoke$arity$4 ? target.cljs$core$IFn$_invoke$arity$4(a1,a2,a3,a4) : target(a1,a2,a3,a4);
}

shadow.cljs_helpers.maybe_ifn5_direct = function(target,a1,a2,a3,a4,a5) {
  return target.cljs$core$IFn$_invoke$arity$5 ? target.cljs$core$IFn$_invoke$arity$5(a1,a2,a3,a4,a5) : target(a1,a2,a3,a4,a5);
}

shadow.cljs_helpers.maybe_ifn6_direct = function(target,a1,a2,a3,a4,a5,a6) {
  return target.cljs$core$IFn$_invoke$arity$6 ? target.cljs$core$IFn$_invoke$arity$6(a1,a2,a3,a4,a5,a6) : target(a1,a2,a3,a4,a5,a6);
}

shadow.cljs_helpers.maybe_ifn7_direct = function(target,a1,a2,a3,a4,a5,a6,a7) {
  return target.cljs$core$IFn$_invoke$arity$7 ? target.cljs$core$IFn$_invoke$arity$7(a1,a2,a3,a4,a5,a6,a7) : target(a1,a2,a3,a4,a5,a6,a7);
}

shadow.cljs_helpers.maybe_ifn8_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8) {
  return target.cljs$core$IFn$_invoke$arity$8 ? target.cljs$core$IFn$_invoke$arity$8(a1,a2,a3,a4,a5,a6,a7,a8) : target(a1,a2,a3,a4,a5,a6,a7,a8);
}

shadow.cljs_helpers.maybe_ifn9_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  return target.cljs$core$IFn$_invoke$arity$9 ? target.cljs$core$IFn$_invoke$arity$9(a1,a2,a3,a4,a5,a6,a7,a8,a9) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9);
}

shadow.cljs_helpers.maybe_ifn10_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  return target.cljs$core$IFn$_invoke$arity$10 ? target.cljs$core$IFn$_invoke$arity$10(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
}

shadow.cljs_helpers.maybe_ifn11_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  return target.cljs$core$IFn$_invoke$arity$11 ? target.cljs$core$IFn$_invoke$arity$11(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11);
}

shadow.cljs_helpers.maybe_ifn12_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) {
  return target.cljs$core$IFn$_invoke$arity$12 ? target.cljs$core$IFn$_invoke$arity$12(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
}

shadow.cljs_helpers.maybe_ifn13_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13) {
  return target.cljs$core$IFn$_invoke$arity$13 ? target.cljs$core$IFn$_invoke$arity$13(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13);
}

shadow.cljs_helpers.maybe_ifn14_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14) {
  return target.cljs$core$IFn$_invoke$arity$14 ? target.cljs$core$IFn$_invoke$arity$14(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14);
}

shadow.cljs_helpers.maybe_ifn15_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) {
  return target.cljs$core$IFn$_invoke$arity$15 ? target.cljs$core$IFn$_invoke$arity$15(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15);
}

shadow.cljs_helpers.maybe_ifn16_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16) {
  return target.cljs$core$IFn$_invoke$arity$16 ? target.cljs$core$IFn$_invoke$arity$16(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16);
}

shadow.cljs_helpers.maybe_ifn17_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17) {
  return target.cljs$core$IFn$_invoke$arity$17 ? target.cljs$core$IFn$_invoke$arity$17(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17);
}

shadow.cljs_helpers.maybe_ifn18_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18) {
  return target.cljs$core$IFn$_invoke$arity$18 ? target.cljs$core$IFn$_invoke$arity$18(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18);
}

shadow.cljs_helpers.maybe_ifn19_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19) {
  return target.cljs$core$IFn$_invoke$arity$19 ? target.cljs$core$IFn$_invoke$arity$19(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19);
}

shadow.cljs_helpers.maybe_ifn20_direct = function(target,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20) {
  return target.cljs$core$IFn$_invoke$arity$20 ? target.cljs$core$IFn$_invoke$arity$20(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20) : target(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20);
}









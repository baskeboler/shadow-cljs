import cljs from "goog:cljs.core";
export let foo = "es6/foo";
export let map = cljs.assoc(null, "a", 1);
export default "es6-default";
export let nested = { extra: { bar: 1 }};
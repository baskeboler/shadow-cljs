(ns shadow.remote.runtime.cljs.node
  (:require
    [cognitect.transit :as transit]
    ;; this will eventually replace shadow.cljs.devtools.client completely
    [shadow.cljs.devtools.client.env :as env]
    [shadow.remote.runtime.api :as api]
    [shadow.remote.runtime.shared :as shared]
    [shadow.remote.runtime.cljs.env :as renv]
    [shadow.remote.runtime.cljs.js-builtins]
    [shadow.remote.runtime.tap-support :as tap-support]
    [shadow.remote.runtime.obj-support :as obj-support]
    ["ws" :as ws]))

(defrecord NodeRuntime [ws state-ref]
  api/IRuntime
  (relay-msg [runtime msg]
    (let [w (transit/writer :json)
          json (transit/write w msg)]
      (.send ws json)))
  (add-extension [runtime key spec]
    (shared/add-extension runtime key spec))
  (del-extension [runtime key]
    (shared/del-extension runtime key)))

(defn start []
  (let [ws-url (str (env/get-ws-url-base) "/api/runtime")
        socket (ws. ws-url)

        state-ref
        (atom {})

        runtime
        (doto (NodeRuntime. socket state-ref)
          (shared/add-defaults))

        obj-support
        (obj-support/start runtime)

        tap-support
        (tap-support/start runtime obj-support)

        stop
        (fn []
          (tap-support/stop tap-support)
          (obj-support/stop obj-support))]

    (reset! renv/runtime-ref {:runtime runtime
                              :obj-support obj-support
                              :tap-support tap-support})

    (.on socket "message"
      (fn [data]
        (let [t (transit/reader :json)
              msg (transit/read t data)]

          (shared/process runtime msg))))

    (.on socket "open"
      (fn [e]
        ;; allow shared/process to send messages directly to relay
        ;; without being coupled to the implementation of exactly how
        ))

    (.on socket "close"
      (fn [e]
        (stop)))

    (.on socket "error"
      (fn [e]
        (js/console.warn "tap-socket error" e)
        (stop)
        ))))

;; want things to start when this ns is in :preloads
(start)

(ns shadow.cljs.ui.pages.repl
  (:require
    [clojure.string :as str]
    [shadow.react.component :as comp]
    [shadow.markup.react :as html :refer (defstyled)]
    [shadow.cljs.model :as m]
    [shadow.cljs.ui.env :as env]
    [shadow.cljs.ui.util :as util]
    [shadow.cljs.ui.model :as ui-model]
    [shadow.cljs.ui.style :as s]
    [cljs.core.async :as async :refer (go alt!)]
    ["react-dom" :as rd]
    ["codemirror" :as cm]
    ["codemirror/mode/clojure/clojure"]
    ["parinfer-codemirror" :as par-cm]
    ["xterm" :as xterm]
    ["xterm/lib/addons/fit/fit" :as xterm-fit]
    [com.fulcrologic.fulcro.application :as fa]
    [com.fulcrologic.fulcro.components :as fc :refer (defsc)]
    [com.fulcrologic.fulcro.data-fetch :as fdf]
    [com.fulcrologic.fulcro.algorithms.merge :as fam]
    [shadow.cljs.ui.transactions :as tx]
    [shadow.cljs.ui.routing :as routing]
    [shadow.cljs.ui.fulcro-mods :as fm]
    [shadow.cljs.ui.websocket :as ws]))

(defn attach-terminal [comp term-div session-id]
  ;; (js/console.log ::attach-terminal term-div comp)

  (if-not term-div
    (let [{::keys [term term-resize]} (util/get-local! comp)]
      (when term-resize
        (js/window.removeEventListener "resize" term-resize))
      (when term
        (.destroy term))
      (util/swap-local! comp dissoc ::term ::term-resize))

    ;; fresh mount
    (let [term
          (doto (xterm/Terminal. #js {:disableStdin true
                                      :convertEol true
                                      :fontFamily "monospace"
                                      :fontSize 14
                                      :theme #js {:foreground "#000000"
                                                  :background "#FFFFFF"
                                                  :selection "rgba(0,0,0,0.3)"}})
            (.open term-div))

          term-resize
          (fn []
            (xterm-fit/fit term))

          sub-chan
          (async/chan 10)]

      (async/sub (fc/shared comp ::env/broadcast-pub) [::ui-model/session-out session-id] sub-chan)

      (go (loop []
            (when-some [{::m/keys [text] :as msg} (<! sub-chan)]
              (.write term (str (str/trim text) "\n"))
              (recur))))

      (term-resize)

      (js/window.addEventListener "resize" term-resize)

      (util/swap-local! comp assoc
        ::term term
        ::term-resize term-resize))))

(defn do-eval [comp]
  (let [{::keys [^js editor term]} (util/get-local! comp)
        text (str/trim (.getValue editor))]

    (when (seq text)
      (.write term "-->\n")
      (.write term (str text "\n"))
      (.write term "-->\n")

      (.setValue editor "")

      (fc/transact! comp [(tx/process-repl-input {:text text})]))))

(defn attach-codemirror [comp cm-input]
  ;; (js/console.log ::attach-codemirror cm-input comp)
  (if-not cm-input
    (let [{::keys [editor]} (util/get-local! comp)]
      (when editor
        (.toTextArea editor))
      (util/swap-local! comp dissoc ::editor))

    (let [editor
          (cm/fromTextArea
            cm-input
            #js {:lineNumbers true
                 :mode "clojure"
                 :theme "github"
                 :autofocus true
                 :matchBrackets true})]

      (.setOption editor "extraKeys"
        #js {"Ctrl-Enter" #(do-eval comp)
             "Shift-Enter" #(do-eval comp)})

      (par-cm/init editor)
      (util/swap-local! comp assoc ::editor editor))))

(defstyled html-container :div [_]
  {:flex 1
   :display "flex"
   :flex-direction "column"})

(defstyled term-container :div [_]
  {:flex 1
   :padding-left 10
   :overflow "hidden"})

(defstyled editor-container :div [_]
  {:height 200
   :border-bottom "2px solid #eee"
   :border-top "2px solid #eee"})

(defstyled html-toolbar :div [_]
  {:padding 10
   :margin-bottom 10
   :font-weight "bold"})

(defstyled input-toolbar :div [_]
  {:padding 10
   :display "flex"})

(defstyled status-bar-container :div [_]
  {:border-top "2px solid #eee"
   :display "flex"})

(defstyled status-bar-ns :div [_]
  {:padding 10
   :flex 1})

(defstyled status-bar-status :div [_]
  {:padding 10})

(defsc Session [this {::m/keys [session-id] :as props}]
  {:ident
   (fn []
     [::m/session-id session-id])

   :query
   (fn []
     [::m/session-id
      ::m/session-ns
      ::m/session-status
      {::m/runtime [::m/runtime-id
                    ::m/runtime-active
                    ::m/runtime-info]}])}

  (let [{::m/keys [session-ns session-status runtime]} props]
    (html-container
      (html-toolbar "REPL")
      (term-container {:ref (util/comp-fn this ::term-ref attach-terminal session-id)})
      (status-bar-container
        (status-bar-status (str session-status))
        (status-bar-ns (str session-ns)))
      (if-not (::m/runtime-active runtime)
        (html/h1 "runtime disconnected, session ended.")
        (editor-container
          (html/input {:ref (util/comp-fn this ::editor-ref attach-codemirror)})))
      (when (::m/runtime-active runtime)
        (input-toolbar
          (s/toolbar-actions
            (s/toolbar-action
              {:type "button"
               :title "shift+enter"
               :onClick
               (fn [e]
                 (.preventDefault e)
                 (do-eval this))}
              "eval")

            (s/toolbar-action
              {:type "button"
               :title "ctrl+e"}
              "history")
            ))))))

(def ui-session (fc/factory Session {:keyfn ::m/session-id}))

(defn runtime-description [{:keys [lang build-id runtime-type user-agent]}]
  (str build-id " - " lang " - " runtime-type " - " user-agent))

(defsc RuntimeInfo [this {::m/keys [runtime-id runtime-active] :as props}]
  {:ident
   (fn []
     [::m/runtime-id runtime-id])

   :query
   (fn []
     [::m/runtime-id
      ::m/runtime-active
      ::m/runtime-info])}

  (let [{:keys [lang since build-id user-agent]}
        (::m/runtime-info props)]

    (html/tr
      (html/td (str since))
      (html/td (str lang))
      (html/td (str build-id))
      (html/td (str user-agent))
      (html/td
        (when runtime-active
          (html/button {:onClick #(fc/transact! this [(tx/repl-session-start {:runtime-id runtime-id})])} "connect")))
      )))

(def ui-runtime-info (fc/factory RuntimeInfo {:keyfn ::m/runtime-id}))

(defsc Page [this props]
  {:ident
   (fn []
     [::ui-model/page-repl 1])

   :query
   (fn []
     [{::ui-model/runtimes (fc/get-query RuntimeInfo)}
      {::ui-model/sessions (fc/get-query Session)}])

   :initial-state
   (fn [p]
     {::ui-model/runtimes []
      ::ui-model/sessions []})}

  (s/main-contents
    (s/page-title "Available Runtimes")
    (html/table
      (html/tbody
        (html/for [runtime (::ui-model/runtimes props)]
          (ui-runtime-info runtime)
          )))

    (html/h2 "REPL Sessions")
    (html/div
      (html/for [{::m/keys [session-id] :as session} (::ui-model/sessions props)]
        (html/div {:key session-id}
          (html/a {:href (str "/repl/session/" session-id)}
            (-> session (get-in [::m/runtime ::m/runtime-info]) pr-str)))))
    ))

(def ui-page (fc/factory Page {}))

(routing/register ::ui-model/root-router ::ui-model/page-repl
  {:class Page
   :factory ui-page})

(routing/register ::ui-model/root-router ::m/session-id
  {:class Session
   :factory ui-session})

(defn route [tokens]
  (let [[sub & more] tokens]
    (case sub
      "session"
      (let [session-id
            (first more)

            state
            (::fa/state-atom env/app)

            {::env/keys [^goog history]}
            (-> env/app ::fa/runtime-atom deref ::fa/static-shared-props)]

        ;; FIXME: has fulcro something built-in for this?
        (if-not (get-in @state [::m/session-id session-id])
          (do (js/console.warn "session not found, replacing request")
              (.replaceToken history "repl"))

          ;; session found
          (fc/transact! env/app
            [(routing/set-route
               {:router ::ui-model/root-router
                :ident [::m/session-id session-id]})])))

      ;; default
      (fc/transact! env/app
        [(routing/set-route
           {:router ::ui-model/root-router
            :ident [::ui-model/page-repl 1]})]))))

(defn repl-session-start*
  [state env {:keys [runtime-id] :as params}]
  (let [session-id (str (random-uuid))]

    ;; FIXME: how do I trigger things properly AFTER the tx completes?
    (js/setTimeout
      (fn []
        (ws/send env {::m/op ::m/session-start
                      ::m/runtime-id runtime-id
                      ::m/session-id session-id})
        (routing/set-token! env (str "repl/session/" session-id)))
      1)

    ;; optimistic so the page has at least some info on it

    (fam/merge-component state Session
      {::m/runtime [::m/runtime-id runtime-id]
       ::m/session-start (js/Date.now)
       ::m/session-id session-id
       ::m/session-status :pending})))

(defn update-sessions* [state]
  (let [sessions
        (->> (::m/session-id state)
             (vals)
             (filter #(get-in state (conj (::m/runtime %) ::m/runtime-active)))
             (sort-by ::m/session-start)
             (reverse)
             (map (fn [{::m/keys [session-id]}]
                    [::m/session-id session-id]))
             (into []))]

    (assoc-in state [::ui-model/page-repl 1 ::ui-model/sessions] sessions)))

(fm/handle-mutation tx/repl-session-start
  (fn [state env params]
    (-> state
        (repl-session-start* env params)
        (update-sessions*))))

(fm/handle-mutation tx/process-repl-input
  (fn [state {:keys [ref] :as env} {:keys [text] :as params}]
    (let [{::m/keys [session-id runtime] :as session}
          (get-in state ref)

          {::m/keys [runtime-id] :as runtime}
          (get-in state runtime)

          input-id
          (util/gen-id)]

      (ws/send env {::m/op ::m/session-eval
                    ::m/runtime-id runtime-id
                    ::m/session-id session-id
                    ::m/input-id input-id
                    ::m/input-text text})

      (-> state
          (update-in [::m/input-id input-id] merge {::m/runtime [::m/runtime-id runtime-id]
                                                    ::m/session [::m/session-id session-id]
                                                    ::m/input-id input-id
                                                    ::m/input-text text})
          (update-in (conj ref ::ui-model/repl-history) util/conj-vec [::m/input-id input-id]))
      )))

(defn init []
  (fdf/load env/app ::m/repl-runtimes RuntimeInfo
    {:target [::ui-model/page-repl 1 ::ui-model/runtimes]}))
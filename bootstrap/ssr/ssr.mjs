import { useSSRContext, mergeProps, watch, onMounted, onUnmounted, computed, unref, withCtx, createVNode, openBlock, createBlock, renderSlot, ref, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, isRef, withModifiers, onBeforeMount, withDirectives, vModelSelect, vModelText, nextTick, defineComponent, resolveComponent, TransitionGroup, onUpdated, vShow, useSlots, withKeys, reactive, resolveDynamicComponent, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot, ssrRenderTeleport, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderVNode } from "vue/server-renderer";
import { useForm, router, Link as Link$1, usePage, Head, createInertiaApp } from "@inertiajs/vue3";
import route$1 from "ziggy-js";
import { useDark, useToggle } from "@vueuse/core";
import { MeiliSearch } from "meilisearch";
import { defineStore } from "pinia";
import { VueRenderer, useEditor, EditorContent } from "@tiptap/vue-3";
import { Mention } from "@tiptap/extension-mention";
import tippy from "tippy.js";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Image } from "@tiptap/extension-image";
import { Link as Link$2 } from "@tiptap/extension-link";
import { StarterKit } from "@tiptap/starter-kit";
import prettyBytes from "pretty-bytes";
import Resumable from "resumablejs";
import getYouTubeID from "get-youtube-id";
import { renderToString } from "@vue/server-renderer";
import createServer from "@inertiajs/vue3/server";
const _sfc_main$1S = {
  __name: "ActionMessage",
  __ssrInlineRender: true,
  props: {
    on: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div style="${ssrRenderStyle(__props.on ? null : { display: "none" })}" class="text-sm text-gray-600">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1S = _sfc_main$1S.setup;
_sfc_main$1S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ActionMessage.vue");
  return _sfc_setup$1S ? _sfc_setup$1S(props, ctx) : void 0;
};
const _sfc_main$1R = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex select-none items-center px-4 py-2 bg-neutral-200 dark:bg-ui-700 border border-transparent rounded-md font-semibold text-xs text-neutral-700 dark:text-ui-200 uppercase tracking-widest hover:bg-neutral-300 dark:hover:bg-ui-600 active:bg-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring focus:ring-neutral-300 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1R = _sfc_main$1R.setup;
_sfc_main$1R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Button.vue");
  return _sfc_setup$1R ? _sfc_setup$1R(props, ctx) : void 0;
};
const _sfc_main$1Q = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    watch(() => props.show, () => {
      if (props.show) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = null;
      }
    });
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        "sm": "sm:max-w-sm",
        "md": "sm:max-w-md",
        "lg": "sm:max-w-lg",
        "xl": "sm:max-w-xl",
        "2xl": "sm:max-w-2xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([unref(maxWidthClass), "mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"])}">`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1Q = _sfc_main$1Q.setup;
_sfc_main$1Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Modal.vue");
  return _sfc_setup$1Q ? _sfc_setup$1Q(props, ctx) : void 0;
};
const _sfc_main$1P = {
  __name: "ConfirmationModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1Q, mergeProps({
        show: __props.show,
        "max-width": __props.maxWidth,
        closeable: __props.closeable,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"${_scopeId}><div class="sm:flex sm:items-start"${_scopeId}><div class="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"${_scopeId}><svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"${_scopeId}><h3 class="text-lg"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            _push2(`</h3><div class="mt-2"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div></div></div><div class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-right"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, [
                createVNode("div", { class: "sm:flex sm:items-start" }, [
                  createVNode("div", { class: "mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-6 w-6 text-red-600",
                      stroke: "currentColor",
                      fill: "none",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, [
                    createVNode("h3", { class: "text-lg" }, [
                      renderSlot(_ctx.$slots, "title")
                    ]),
                    createVNode("div", { class: "mt-2" }, [
                      renderSlot(_ctx.$slots, "content")
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "flex flex-row justify-end px-6 py-4 bg-gray-100 text-right" }, [
                renderSlot(_ctx.$slots, "footer")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1P = _sfc_main$1P.setup;
_sfc_main$1P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ConfirmationModal.vue");
  return _sfc_setup$1P ? _sfc_setup$1P(props, ctx) : void 0;
};
const _sfc_main$1O = {
  __name: "DangerButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1O = _sfc_main$1O.setup;
_sfc_main$1O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/DangerButton.vue");
  return _sfc_setup$1O ? _sfc_setup$1O(props, ctx) : void 0;
};
const _sfc_main$1N = {
  __name: "DialogModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1Q, mergeProps({
        show: __props.show,
        "max-width": __props.maxWidth,
        closeable: __props.closeable,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-6 py-4"${_scopeId}><div class="text-lg"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div><div class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-right"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-6 py-4" }, [
                createVNode("div", { class: "text-lg" }, [
                  renderSlot(_ctx.$slots, "title")
                ]),
                createVNode("div", { class: "mt-4" }, [
                  renderSlot(_ctx.$slots, "content")
                ])
              ]),
              createVNode("div", { class: "flex flex-row justify-end px-6 py-4 bg-gray-100 text-right" }, [
                renderSlot(_ctx.$slots, "footer")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1N = _sfc_main$1N.setup;
_sfc_main$1N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/DialogModal.vue");
  return _sfc_setup$1N ? _sfc_setup$1N(props, ctx) : void 0;
};
const _sfc_main$1M = {
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    prefix: String,
    type: String,
    pattern: String,
    placeholder: String
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex rounded transition-colors bg-neutral-100 bg-opacity-50 dark:bg-ui-950 overflow-clip" }, _attrs))}>`);
      if (__props.prefix) {
        _push(`<span class="whitespace-nowrap select-none rounded-l pl-2 pr-1 py-1 bg-neutral-200 dark:bg-ui-800 text-neutral-500 dark:text-ui-500 border-r border-r-neutral-300 dark:border-r-ui-700">${ssrInterpolate(__props.prefix)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("pattern", __props.pattern)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass([{ "rounded": !__props.prefix, "pl-1": __props.prefix }, "pr-2 py-1 w-full placeholder-neutral-500 dark:placeholder-ui-500 bg-transparent border-none focus:ring-0 focus:outline-none rounded-r shadow-sm"])}"${ssrRenderAttr("value", __props.modelValue)}></div>`);
    };
  }
};
const _sfc_setup$1M = _sfc_main$1M.setup;
_sfc_main$1M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Input.vue");
  return _sfc_setup$1M ? _sfc_setup$1M(props, ctx) : void 0;
};
const _sfc_main$1L = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        checked: Array.isArray(unref(proxyChecked)) ? ssrLooseContain(unref(proxyChecked), __props.value) : unref(proxyChecked),
        type: "checkbox",
        value: __props.value,
        class: "rounded border-neutral-300 dark:border-ui-600 bg-neutral-100 dark:bg-ui-900 shadow-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus:outline-0"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(proxyChecked)))))}>`);
    };
  }
};
const _sfc_setup$1L = _sfc_main$1L.setup;
_sfc_main$1L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Checkbox.vue");
  return _sfc_setup$1L ? _sfc_setup$1L(props, ctx) : void 0;
};
const _sfc_main$1K = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: __props.message ? null : { display: "none" }
      }, _attrs))}><p class="text-sm text-red-600">${ssrInterpolate(__props.message)}</p></div>`);
    };
  }
};
const _sfc_setup$1K = _sfc_main$1K.setup;
_sfc_main$1K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/InputError.vue");
  return _sfc_setup$1K ? _sfc_setup$1K(props, ctx) : void 0;
};
const _sfc_main$1J = {
  __name: "Label",
  __ssrInlineRender: true,
  props: {
    value: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$1J = _sfc_main$1J.setup;
_sfc_main$1J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Label.vue");
  return _sfc_setup$1J ? _sfc_setup$1J(props, ctx) : void 0;
};
const _sfc_main$1I = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1I = _sfc_main$1I.setup;
_sfc_main$1I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/SecondaryButton.vue");
  return _sfc_setup$1I ? _sfc_setup$1I(props, ctx) : void 0;
};
const _sfc_main$1H = {
  __name: "ApiTokenManager",
  __ssrInlineRender: true,
  props: {
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
  },
  setup(__props) {
    const props = __props;
    const createApiTokenForm = useForm({
      name: "",
      permissions: props.defaultPermissions
    });
    const updateApiTokenForm = useForm({
      permissions: []
    });
    const deleteApiTokenForm = useForm({});
    const displayingToken = ref(false);
    const managingPermissionsFor = ref(null);
    const apiTokenBeingDeleted = ref(null);
    const updateApiToken = () => {
      updateApiTokenForm.put(route$1("settings::tokens.update", managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => managingPermissionsFor.value = null
      });
    };
    const deleteApiToken = () => {
      deleteApiTokenForm.delete(route$1("settings::tokens.destroy", apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => apiTokenBeingDeleted.value = null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mt-5 md:mt-0"><form><div class="px-4 py-5 sm:p-6 shadow glass sm:rounded-tl-md sm:rounded-tr-md"><div class="grid grid-cols-6 gap-6"><div class="col-span-6 sm:col-span-4">`);
      _push(ssrRenderComponent(_sfc_main$1J, {
        for: "name",
        value: "Name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1M, {
        id: "name",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(createApiTokenForm).name,
        "onUpdate:modelValue": ($event) => unref(createApiTokenForm).name = $event,
        autofocus: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1K, {
        message: unref(createApiTokenForm).errors.name,
        class: "mt-2"
      }, null, _parent));
      _push(`</div>`);
      if (__props.availablePermissions.length > 0) {
        _push(`<div class="col-span-6">`);
        _push(ssrRenderComponent(_sfc_main$1J, {
          for: "permissions",
          value: "Permissions"
        }, null, _parent));
        _push(`<div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(__props.availablePermissions, (permission) => {
          _push(`<div><label class="flex items-center">`);
          _push(ssrRenderComponent(_sfc_main$1L, {
            value: permission,
            checked: unref(createApiTokenForm).permissions,
            "onUpdate:checked": ($event) => unref(createApiTokenForm).permissions = $event
          }, null, _parent));
          _push(`<span class="ml-2 text-sm text-gray-600">${ssrInterpolate(permission)}</span></label></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center glass justify-end px-4 py-3 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">`);
      _push(ssrRenderComponent(_sfc_main$1S, {
        on: unref(createApiTokenForm).recentlySuccessful,
        class: "mr-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Created. `);
          } else {
            return [
              createTextVNode(" Created. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1R, {
        class: { "opacity-25": unref(createApiTokenForm).processing },
        disabled: unref(createApiTokenForm).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create `);
          } else {
            return [
              createTextVNode(" Create ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div>`);
      if (__props.tokens.length > 0) {
        _push(`<div><div class="mt-10 sm:mt-0"><div class="space-y-6"><!--[-->`);
        ssrRenderList(__props.tokens, (token) => {
          _push(`<div class="flex items-center justify-between pane"><div>${ssrInterpolate(token.name)}</div><div class="flex items-center">`);
          if (token.last_used_ago) {
            _push(`<div class="text-sm text-gray-400"> Last used ${ssrInterpolate(token.last_used_ago)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.availablePermissions.length > 0) {
            _push(`<button class="cursor-pointer ml-6 text-sm text-gray-400 underline"> Permissions </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="cursor-pointer ml-6 text-sm text-red-500"> Delete </button></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1N, {
        show: displayingToken.value,
        onClose: ($event) => displayingToken.value = false
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` API Token `);
          } else {
            return [
              createTextVNode(" API Token ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}> Please copy your new API token. For your security, it won&#39;t be shown again. </div>`);
            if (_ctx.$page.props.app.flash.token) {
              _push2(`<div class="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$page.props.app.flash.token)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", null, " Please copy your new API token. For your security, it won't be shown again. "),
              _ctx.$page.props.app.flash.token ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500"
              }, toDisplayString(_ctx.$page.props.app.flash.token), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1I, {
              onClick: ($event) => displayingToken.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Close `);
                } else {
                  return [
                    createTextVNode(" Close ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1I, {
                onClick: ($event) => displayingToken.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Close ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1N, {
        show: managingPermissionsFor.value,
        onClose: ($event) => managingPermissionsFor.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` API Token Permissions `);
          } else {
            return [
              createTextVNode(" API Token Permissions ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.availablePermissions, (permission) => {
              _push2(`<div${_scopeId}><label class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1L, {
                value: permission,
                checked: unref(updateApiTokenForm).permissions,
                "onUpdate:checked": ($event) => unref(updateApiTokenForm).permissions = $event
              }, null, _parent2, _scopeId));
              _push2(`<span class="ml-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(permission)}</span></label></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.availablePermissions, (permission) => {
                  return openBlock(), createBlock("div", { key: permission }, [
                    createVNode("label", { class: "flex items-center" }, [
                      createVNode(_sfc_main$1L, {
                        value: permission,
                        checked: unref(updateApiTokenForm).permissions,
                        "onUpdate:checked": ($event) => unref(updateApiTokenForm).permissions = $event
                      }, null, 8, ["value", "checked", "onUpdate:checked"]),
                      createVNode("span", { class: "ml-2 text-sm text-gray-600" }, toDisplayString(permission), 1)
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1I, {
              onClick: ($event) => managingPermissionsFor.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: ["ml-3", { "opacity-25": unref(updateApiTokenForm).processing }],
              onClick: updateApiToken,
              disabled: unref(updateApiTokenForm).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save `);
                } else {
                  return [
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1I, {
                onClick: ($event) => managingPermissionsFor.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$1R, {
                class: ["ml-3", { "opacity-25": unref(updateApiTokenForm).processing }],
                onClick: updateApiToken,
                disabled: unref(updateApiTokenForm).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1P, {
        show: apiTokenBeingDeleted.value,
        onClose: ($event) => apiTokenBeingDeleted.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Delete API Token `);
          } else {
            return [
              createTextVNode(" Delete API Token ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Are you sure you would like to delete this API token? `);
          } else {
            return [
              createTextVNode(" Are you sure you would like to delete this API token? ")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1I, {
              onClick: ($event) => apiTokenBeingDeleted.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1O, {
              class: ["ml-3", { "opacity-25": unref(deleteApiTokenForm).processing }],
              onClick: deleteApiToken,
              disabled: unref(deleteApiTokenForm).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete `);
                } else {
                  return [
                    createTextVNode(" Delete ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1I, {
                onClick: ($event) => apiTokenBeingDeleted.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$1O, {
                class: ["ml-3", { "opacity-25": unref(deleteApiTokenForm).processing }],
                onClick: deleteApiToken,
                disabled: unref(deleteApiTokenForm).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Delete ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1H = _sfc_main$1H.setup;
_sfc_main$1H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Partials/ApiTokenManager.vue");
  return _sfc_setup$1H ? _sfc_setup$1H(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1H
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1G = {
  __name: "NetworkNav",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "x z-30 !hidden transition-colors justify-center w-full bg-neutral-300 dark:bg-neutral-900" }, _attrs))}><div class="hidden md:flex justify-between w-full items-center lg:max-w-5xl xl:max-w-6xl w-full text-xs"><div class="x divide-x divide-neutral-200 dark:divide-neutral-800"><a class="px-2 py-1 transition-colors bg-neutral-200 dark:bg-neutral-800 border-l dark:border-neutral-800">Geometry Dash</a><a href="https://soundodger-community.com" class="hidden px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">Soundodger</a><a href="https://userlevels.com/impossible" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 !border-r border-neutral-200 dark:border-neutral-800">The Impossible Game 2</a></div></div></div>`);
    };
  }
};
const _sfc_setup$1G = _sfc_main$1G.setup;
_sfc_main$1G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NetworkNav.vue");
  return _sfc_setup$1G ? _sfc_setup$1G(props, ctx) : void 0;
};
const _sfc_main$1F = {
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    message: [String, Number],
    caret: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref: "base",
        class: "relative group"
      }, _attrs))}><div class="static">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (_ctx.$slots.content || __props.message) {
        _push(`<div class="absolute left-0 transition-[visibility] duration-0 invisible group-hover:visible"><div class="y items-center w-full pt-2 transition ease-out transform duration-75 opacity-0 scale-95 group-hover:opacity-100 group-hover:duration-200 group-hover:scale-100">`);
        if (__props.caret) {
          _push(`<!--[--><div class="drop-shadow absolute border-[8px] border-t-0 top-0 border-transparent border-b-neutral-300 dark:border-b-ui-700"></div><div class="z-10 absolute border-[8px] border-t-0 top-[1.5px] border-transparent border-b-neutral-100 dark:border-b-ui-900"></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="shadow-lg box !py-0 !px-0">`);
        if (__props.message) {
          _push(`<div class="px-2"><span class="text-center text-xs select-none whitespace-nowrap">${ssrInterpolate(__props.message)}</span></div>`);
        } else {
          ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1F = _sfc_main$1F.setup;
_sfc_main$1F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Tooltip.vue");
  return _sfc_setup$1F ? _sfc_setup$1F(props, ctx) : void 0;
};
const _sfc_main$1E = {
  __name: "Toggle",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    disabled: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value2) {
        emit("update:modelValue", value2);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative", { "opacity-50": __props.disabled, "cursor-pointer": !__props.disabled }]
      }, _attrs))}><label><input type="checkbox" class="sr-only"${ssrIncludeBooleanAttr(Array.isArray(unref(value)) ? ssrLooseContain(unref(value), null) : unref(value)) ? " checked" : ""}></label><div class="${ssrRenderClass([unref(value) ? "bg-green-400" : "bg-neutral-300 dark:bg-ui-800", "block w-9 h-5 rounded-full transition-colors"])}"></div><div class="${ssrRenderClass([unref(value) ? "translate-x-full" : "", "absolute shadow left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform"])}"></div></div>`);
    };
  }
};
const _sfc_setup$1E = _sfc_main$1E.setup;
_sfc_main$1E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toggle.vue");
  return _sfc_setup$1E ? _sfc_setup$1E(props, ctx) : void 0;
};
const _sfc_main$1D = {
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    user: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<img${ssrRenderAttrs(mergeProps({
        class: "rounded-full",
        src: (_a = __props.user.avatar_url) != null ? _a : "https://ui-avatars.com/api/?background=random&size=256&rounded=true&&format=svg&name=" + __props.user.name,
        alt: "avatar"
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$1D = _sfc_main$1D.setup;
_sfc_main$1D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Avatar.vue");
  return _sfc_setup$1D ? _sfc_setup$1D(props, ctx) : void 0;
};
const Dropdown_vue_vue_type_style_index_0_scoped_b8f78d64_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1C = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: Array,
      default: () => []
    },
    containerClasses: {
      type: Array,
      default: () => ["mt-2"]
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const open = ref(false);
    expose({ open });
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        "48": "w-48",
        "full": "w-full",
        "fit": "w-fit"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "origin-top-left left-0";
      }
      if (props.align === "right") {
        return "origin-top-right right-0";
      }
      return "origin-top";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative select-none cursor-pointer" }, _attrs))} data-v-b8f78d64><div data-v-b8f78d64>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40" data-v-b8f78d64></div><div style="${ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[unref(widthClass), unref(alignmentClasses), __props.containerClasses], "absolute z-50 rounded-md shadow-lg"])}" data-v-b8f78d64><div class="${ssrRenderClass([__props.contentClasses, "dropdown rounded-md transition-colors overflow-hidden bg-neutral-100 dark:bg-ui-900 border border-neutral-300 dark:border-ui-700"])}" data-v-b8f78d64>`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1C = _sfc_main$1C.setup;
_sfc_main$1C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Dropdown.vue");
  return _sfc_setup$1C ? _sfc_setup$1C(props, ctx) : void 0;
};
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$1C, [["__scopeId", "data-v-b8f78d64"]]);
const isDark = ref(useDark({
  selector: "#body"
}));
const toggleDark = () => {
  useToggle(isDark.value);
};
const logout = () => {
  router.post(route$1("auth::logout"));
};
const invisiblePixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";
const _sfc_main$1B = {
  __name: "SearchBar",
  __ssrInlineRender: true,
  setup(__props) {
    const focused = ref(true);
    const client = new MeiliSearch({
      host: "https://search.gdps.io",
      apiKey: "Ywqrxd0V620a8702732c96928505a5689f8e7d117ad420bec4f765761470f909f9eaf060"
    });
    const index = client.index("levels_index");
    const newQuery = ref(null);
    const lastQuery = ref(null);
    const searches = ref({});
    watch(newQuery, async () => {
      if (!searches.value.hasOwnProperty(newQuery.value)) {
        searches.value[newQuery.value] = await index.search(newQuery.value);
      }
      lastQuery.value = newQuery.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "globalSearchBar",
        class: "x h-fit relative items-center rounded-lg transition-colors bg-neutral-300 dark:bg-ui-800"
      }, _attrs))}><input placeholder="Search Levels..."${ssrRenderAttr("value", newQuery.value)} type="text" class="pl-3 text-sm py-1.5 border-none focus-visible:ring-0 bg-transparent dark:placeholder-ui-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>`);
      if (focused.value && searches.value[lastQuery.value]) {
        _push(`<div class="absolute box shadow-xl top-12 min-w-full"><div style="${ssrRenderStyle(searches.value[lastQuery.value].hits.length === 0 ? null : { display: "none" })}">No results</div><!--[-->`);
        ssrRenderList(searches.value[lastQuery.value].hits, (hit, index2) => {
          _push(`<div class="hover:opacity-50">`);
          _push(ssrRenderComponent(unref(Link$1), {
            href: unref(route$1)("levels.show", hit.level_id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(hit.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(hit.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1B = _sfc_main$1B.setup;
_sfc_main$1B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SearchBar.vue");
  return _sfc_setup$1B ? _sfc_setup$1B(props, ctx) : void 0;
};
const _sfc_main$1A = {
  __name: "SiteLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link$1), mergeProps({
        href: unref(route$1)("home"),
        class: "font-bold text-2xl select-none"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-transparent bg-gradient-to-r from-red-600 to-fuchsia-600 bg-clip-text"${_scopeId}>Hyperdodger</span>`);
          } else {
            return [
              createVNode("span", { class: "text-transparent bg-gradient-to-r from-red-600 to-fuchsia-600 bg-clip-text" }, "Hyperdodger")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1A = _sfc_main$1A.setup;
_sfc_main$1A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SiteLogo.vue");
  return _sfc_setup$1A ? _sfc_setup$1A(props, ctx) : void 0;
};
const useSettingsStore = defineStore("settings", () => {
  const settings = ref(usePage().props.app.settings);
  return { settings };
});
const _sfc_main$1z = {
  __name: "SiteNav",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileNavOpen = ref(false);
    const navigation = useSettingsStore().settings["navigation"]["value"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="y top-0 items-center relative z-20 transition-colors w-full py-4 bg-neutral-200 dark:bg-ui-900"><div class="x px-2 justify-between lg:max-w-5xl xl:max-w-6xl w-full"><div class="x items-center space-x-4">`);
      _push(ssrRenderComponent(_sfc_main$1A, null, null, _parent));
      _push(`<div class="hidden md:flex items-center space-x-4 text-sm">`);
      if (unref(navigation).length === 0) {
        _push(`<span class="text-red-500">No key &#39;navigation&#39; defined in site settings</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(navigation), (node, key) => {
        _push(`<!--[-->`);
        if (node.hasOwnProperty("children")) {
          _push(ssrRenderComponent(_sfc_main$1F, { caret: false }, {
            content: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="y divide-y divide-neutral-300 dark:divide-ui-700 w-32"${_scopeId}><!--[-->`);
                ssrRenderList(node.children, (child, key2) => {
                  _push2(ssrRenderComponent(unref(Link$1), {
                    key: key2,
                    class: "px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800",
                    href: unref(route$1)(child.route)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(child.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(child.name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                return [
                  createVNode("div", { class: "y divide-y divide-neutral-300 dark:divide-ui-700 w-32" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(node.children, (child, key2) => {
                      return openBlock(), createBlock(unref(Link$1), {
                        key: key2,
                        class: "px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800",
                        href: unref(route$1)(child.route)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(child.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="x items-center"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link$1), {
                  href: unref(route$1)(node.route),
                  class: "hover:text-ui-500 transition transition-colors"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(node.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(node.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"${_scopeId}></path></svg></div>`);
              } else {
                return [
                  createVNode("div", { class: "x items-center" }, [
                    createVNode(unref(Link$1), {
                      href: unref(route$1)(node.route),
                      class: "hover:text-ui-500 transition transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(node.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["href"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      class: "w-5 h-5"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(unref(Link$1), {
            href: unref(route$1)(node.route),
            class: "hover:text-ui-500 transition transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(node.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(node.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div><div class="hidden md:flex items-center space-x-4">`);
      _push(ssrRenderComponent(_sfc_main$1B, null, null, _parent));
      if (_ctx.$page.props.auth) {
        _push(`<div class="flex items-center space-x-4">`);
        _push(ssrRenderComponent(Dropdown, null, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative"${_scopeId}><span class="absolute flex -top-0.5 -right-0.5 h-3 w-3"${_scopeId}><span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"${_scopeId}></span><span class="inline-flex bg-blue-500 rounded-full h-3 w-3"${_scopeId}></span></span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clip-rule="evenodd"${_scopeId}></path></svg></div>`);
            } else {
              return [
                createVNode("div", { class: "relative" }, [
                  createVNode("span", { class: "absolute flex -top-0.5 -right-0.5 h-3 w-3" }, [
                    createVNode("span", { class: "animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75" }),
                    createVNode("span", { class: "inline-flex bg-blue-500 rounded-full h-3 w-3" })
                  ]),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-5 h-5"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (_ctx.$page.props.user.notifications.length === 0) {
                _push2(`<div class="px-2 py-1"${_scopeId}>No new notifications.</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="rounded overflow-clip"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.user.notifications, (notification) => {
                _push2(`<div class="px-2 py-1 cursor-pointer hover:bg-neutral-800"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link$1), {
                  href: notification.data.link
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(notification.data.message)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(notification.data.message), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                _ctx.$page.props.user.notifications.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "px-2 py-1"
                }, "No new notifications.")) : createCommentVNode("", true),
                createVNode("div", { class: "rounded overflow-clip" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.user.notifications, (notification) => {
                    return openBlock(), createBlock("div", { class: "px-2 py-1 cursor-pointer hover:bg-neutral-800" }, [
                      createVNode(unref(Link$1), {
                        href: notification.data.link
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(notification.data.message), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ]);
                  }), 256))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link$1), {
          class: "relative",
          href: unref(route$1)("inbox.index")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="absolute flex -top-0.5 -right-0.5 h-3 w-3"${_scopeId}><span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"${_scopeId}></span><span class="inline-flex bg-blue-500 rounded-full h-3 w-3"${_scopeId}></span></span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            } else {
              return [
                createVNode("span", { class: "absolute flex -top-0.5 -right-0.5 h-3 w-3" }, [
                  createVNode("span", { class: "animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75" }),
                  createVNode("span", { class: "inline-flex bg-blue-500 rounded-full h-3 w-3" })
                ]),
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  class: "w-5 h-5"
                }, [
                  createVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z",
                    "clip-rule": "evenodd"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (_ctx.$page.props.user.roles.includes("admin")) {
          _push(ssrRenderComponent(unref(Link$1), {
            href: unref(route$1)("inbox.index")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    class: "w-5 h-5"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(Dropdown, null, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="x transition-colors bg-neutral-100 dark:bg-ui-950 p-1 rounded-full items-center cursor-pointer"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                class: "w-8 mr-2",
                user: _ctx.$page.props.user
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$page.props.user.name)}</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mx-1 w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"${_scopeId}></path></svg></div>`);
            } else {
              return [
                createVNode("div", { class: "x transition-colors bg-neutral-100 dark:bg-ui-950 p-1 rounded-full items-center cursor-pointer" }, [
                  createVNode(_sfc_main$1D, {
                    class: "w-8 mr-2",
                    user: _ctx.$page.props.user
                  }, null, 8, ["user"]),
                  createVNode("span", null, toDisplayString(_ctx.$page.props.user.name), 1),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "mx-1 w-5 h-5"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("users.show", _ctx.$page.props.user.id),
                class: "block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Profile`);
                  } else {
                    return [
                      createTextVNode("Profile")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("settings.home"),
                class: "block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Settings`);
                  } else {
                    return [
                      createTextVNode("Settings")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (_ctx.$page.props.user.roles.includes("admin")) {
                _push2(ssrRenderComponent(unref(Link$1), {
                  href: unref(route$1)("system.home"),
                  class: "block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Admin Panel`);
                    } else {
                      return [
                        createTextVNode("Admin Panel")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="transition-colors border-t border-t-neutral-300 dark:border-t-ui-700"${_scopeId}></div><label class="x items-center justify-between px-2 py-1"${_scopeId}><span${_scopeId}>Dark Mode</span>`);
              _push2(ssrRenderComponent(_sfc_main$1E, {
                class: "pointer-events-none cursor-pointer",
                onClick: unref(toggleDark),
                modelValue: unref(isDark),
                "onUpdate:modelValue": ($event) => isRef(isDark) ? isDark.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`</label><div class="transition-colors border-t border-t-neutral-300 dark:border-t-ui-700"${_scopeId}></div>`);
              if (_ctx.$page.props.user.impersonating) {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(unref(Link$1), {
                  href: unref(route$1)("impersonate.leave"),
                  class: "block px-2 py-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-ui-800"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Stop Impersonating`);
                    } else {
                      return [
                        createTextVNode("Stop Impersonating")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<div class="transition-colors border-t border-t-neutral-300 dark:border-t-neutral-700"${_scopeId}></div><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white"${_scopeId}>Logout</div>`);
            } else {
              return [
                createVNode(unref(Link$1), {
                  href: unref(route$1)("users.show", _ctx.$page.props.user.id),
                  class: "block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Profile")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(unref(Link$1), {
                  href: unref(route$1)("settings.home"),
                  class: "block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Settings")
                  ]),
                  _: 1
                }, 8, ["href"]),
                _ctx.$page.props.user.roles.includes("admin") ? (openBlock(), createBlock(unref(Link$1), {
                  key: 0,
                  href: unref(route$1)("system.home"),
                  class: "block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Admin Panel")
                  ]),
                  _: 1
                }, 8, ["href"])) : createCommentVNode("", true),
                createVNode("div", { class: "transition-colors border-t border-t-neutral-300 dark:border-t-ui-700" }),
                createVNode("label", {
                  onClick: withModifiers(() => {
                  }, ["stop"]),
                  class: "x items-center justify-between px-2 py-1"
                }, [
                  createVNode("span", null, "Dark Mode"),
                  createVNode(_sfc_main$1E, {
                    class: "pointer-events-none cursor-pointer",
                    onClick: unref(toggleDark),
                    modelValue: unref(isDark),
                    "onUpdate:modelValue": ($event) => isRef(isDark) ? isDark.value = $event : null
                  }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue"])
                ], 8, ["onClick"]),
                createVNode("div", { class: "transition-colors border-t border-t-neutral-300 dark:border-t-ui-700" }),
                _ctx.$page.props.user.impersonating ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(unref(Link$1), {
                    href: unref(route$1)("impersonate.leave"),
                    class: "block px-2 py-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-ui-800"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Stop Impersonating")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode("div", { class: "transition-colors border-t border-t-neutral-300 dark:border-t-neutral-700" })
                ], 64)) : createCommentVNode("", true),
                createVNode("div", {
                  onClick: unref(logout),
                  class: "px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white"
                }, "Logout", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="x items-center space-x-4">`);
        _push(ssrRenderComponent(unref(Link$1), {
          href: unref(route$1)("auth::login")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link$1), {
          href: unref(route$1)("auth::register"),
          class: "bg-cyan-500 text-white dark:bg-ui-700 dark:text-ui-200 rounded-md font-bold px-2 py-0.5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Register`);
            } else {
              return [
                createTextVNode("Register")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="x md:hidden items-center cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></div></div></div>`);
      if (mobileNavOpen.value) {
        _push(`<div class="y md:hidden relative z-20 bg-neutral-300 dark:bg-ui-900 w-full space-y-2 pt-2"><!--[-->`);
        ssrRenderList(unref(navigation), (node, key) => {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(unref(Link$1), {
            href: unref(route$1)(node.route),
            class: "hover:text-neutral-500 dark:hover:text-ui-500 transition transition-colors px-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(node.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(node.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (node.hasOwnProperty("children")) {
            _push(`<div class="y bg-neutral-200"><!--[-->`);
            ssrRenderList(node.children, (child, key2) => {
              _push(ssrRenderComponent(unref(Link$1), {
                key: key2,
                class: "px-8 py-1 bg-neutral-200 dark:bg-ui-800 hover:bg-neutral-100 dark:hover:bg-ui-700",
                href: unref(route$1)(child.route)
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(child.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(child.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1z = _sfc_main$1z.setup;
_sfc_main$1z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SiteNav.vue");
  return _sfc_setup$1z ? _sfc_setup$1z(props, ctx) : void 0;
};
const _sfc_main$1y = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "x z-10 transition-colors justify-center w-full mt-4" }, _attrs))}><div class="x items-start gap-2 justify-between lg:max-w-5xl xl:max-w-6xl w-full text-xs px-2 bg-neutral-200 dark:border dark:border-ui-800 dark:bg-ui-900 rounded-lg"><div class="x space-x-2 py-2">`);
      _push(ssrRenderComponent(unref(Link$1), {
        href: unref(route$1)("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Hyperdodger`);
          } else {
            return [
              createTextVNode("Hyperdodger")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="flex items-center h-full"><label class="flex items-center cursor-pointer gap-2"><span class="text-xs font-bold opacity-60">DARK MODE</span><input type="checkbox" class="rounded pointer-events-none"${ssrIncludeBooleanAttr(Array.isArray(unref(isDark)) ? ssrLooseContain(unref(isDark), null) : unref(isDark)) ? " checked" : ""}></label></div></div></div>`);
    };
  }
};
const _sfc_setup$1y = _sfc_main$1y.setup;
_sfc_main$1y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Breadcrumbs.vue");
  return _sfc_setup$1y ? _sfc_setup$1y(props, ctx) : void 0;
};
const _sfc_main$1x = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "y p-4 z-10 transition-colors items-center w-full bg-neutral-200 dark:bg-ui-900" }, _attrs))}><div class="px-4 lg:max-w-5xl xl:max-w-6xl w-full"><div class="flex justify-between items-center w-full text-neutral-500 dark:text-ui-500"><div><a href="#">\xA9 Hyperbolus 2022</a></div><div class="!hidden hidden md:flex transition-colors bg-neutral-100 dark:bg-ui-800 py-0.5 px-2 rounded text-sm">`);
      {
        _push(`<span>Featured Artwork by <span class="cursor-pointer underline">overdefo</span></span>`);
      }
      _push(`</div><div class="flex space-x-6">`);
      _push(ssrRenderComponent(unref(Link$1), { href: "/docs/terms" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Service`);
          } else {
            return [
              createTextVNode("Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link$1), { href: "/docs/terms" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$1x = _sfc_main$1x.setup;
_sfc_main$1x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Footer.vue");
  return _sfc_setup$1x ? _sfc_setup$1x(props, ctx) : void 0;
};
const dashBG = "/build/assets/wellrestedbg.87384d67.jpg";
const patternBG = "/build/assets/bg_tiles_sd.7ff02f39.svg";
const useStatisticsStore = defineStore("statistics", () => {
  const counts = ref(usePage().props.app.statistics.counts);
  const patreon = ref(usePage().props.app.statistics.patreon ? usePage().props.app.statistics.patreon.included[0].attributes : {
    completed_percentage: NaN,
    amount_cents: NaN,
    description: "Could Not Connect to Patreon API"
  });
  return { counts, patreon };
});
const Dash_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1w = {
  __name: "Dash",
  __ssrInlineRender: true,
  props: {
    title: String,
    background: {
      type: [String, Boolean],
      default: null
    },
    decorations: {
      type: Boolean,
      default: true
    },
    slotClasses: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    onBeforeMount(() => {
      setBG();
      useSettingsStore();
      useStatisticsStore();
    });
    const bgsrc = ref(null);
    const setBG = () => {
      var _a;
      bgsrc.value = props.background === false ? invisiblePixel : (_a = props.background) != null ? _a : dashBG;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref: "base",
        class: "y relative transition-colors items-center text-neutral-700 dark:text-ui-300 bg-neutral-300 dark:bg-ui-1000 min-h-screen grow"
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.title)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1G, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1z, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1y, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "breadcrumbs", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "breadcrumbs")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="absolute z-0 h-full w-full bg-rainbow" style="${ssrRenderStyle([{ "mask-size": "38rem" }, `mask-image: url('${unref(patternBG)}?');`])}"></div>`);
      {
        _push(`<!---->`);
      }
      _push(`<div class="y relative grow items-center w-full">`);
      if (__props.decorations) {
        _push(`<div class="flex flex-col flex-grow transition-colors shadow-xl backdrop-blur-lg dark:backdrop-blur-0 bg-neutral-200 dark:bg-ui-950 dark:border dark:border-ui-900 bg-opacity-75 md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4 my-4 rounded-lg">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1x, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Dash.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const _sfc_main$1v = {
  __name: "Index",
  __ssrInlineRender: true,
  props: [
    "tokens",
    "availablePermissions",
    "defaultPermissions"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "API Tokens" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> API Tokens </h2><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1H, {
              tokens: __props.tokens,
              "available-permissions": __props.availablePermissions,
              "default-permissions": __props.defaultPermissions
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " API Tokens "),
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$1H, {
                    tokens: __props.tokens,
                    "available-permissions": __props.availablePermissions,
                    "default-permissions": __props.defaultPermissions
                  }, null, 8, ["tokens", "available-permissions", "default-permissions"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Index.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1u = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: __props.title + " - Admin"
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Admin</span>`);
          } else {
            return [
              createVNode("span", null, "Admin")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="flex flex-col space-y-4 md:w-1/4"${_scopeId}><div class="y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.home"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Home`);
                } else {
                  return [
                    createTextVNode("Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.settings"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Settings`);
                } else {
                  return [
                    createTextVNode("Settings")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.users"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Users`);
                } else {
                  return [
                    createTextVNode("Users")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.forums"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.groups"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Groups`);
                } else {
                  return [
                    createTextVNode("Groups")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.permissions"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Permissions`);
                } else {
                  return [
                    createTextVNode("Permissions")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("system.cosmetics"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cosmetics`);
                } else {
                  return [
                    createTextVNode("Cosmetics")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col space-y-2 md:w-3/4"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "flex flex-col space-y-4 md:w-1/4" }, [
                  createVNode("div", { class: "y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50" }, [
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.home"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Home")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.settings"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Settings")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.users"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Users")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.forums"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Forums")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.groups"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Groups")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.permissions"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Permissions")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("system.cosmetics"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cosmetics")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col space-y-2 md:w-3/4" }, [
                  renderSlot(_ctx.$slots, "default")
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const _sfc_main$1t = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    list: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "x justify-center" }, _attrs))}><div class="x items-center pane overflow-clip !py-0 !px-0 !rounded-md w-fit">`);
      if (__props.list.current_page !== 1) {
        _push(`<!--[-->`);
        if (__props.list.current_page - 1 !== 1) {
          _push(ssrRenderComponent(unref(Link$1), {
            href: __props.list.first_page_url,
            class: "px-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clip-rule="evenodd"${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-5 h-5"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(Link$1), {
          href: __props.list.prev_page_url,
          class: "px-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  class: "w-5 h-5"
                }, [
                  createVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z",
                    "clip-rule": "evenodd"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.list.links.slice(1, -1), (link, index) => {
        _push(ssrRenderComponent(unref(Link$1), {
          href: link.url,
          key: index,
          class: ["px-2 bg-opacity-50 dark:bg-opacity-50 transition-colors", { "bg-neutral-300 dark:bg-ui-700": link.active }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.list.current_page !== __props.list.last_page) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Link$1), {
          href: __props.list.next_page_url,
          class: "px-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  class: "w-5 h-5"
                }, [
                  createVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                    "clip-rule": "evenodd"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (__props.list.current_page + 1 !== __props.list.links.length - 2) {
          _push(ssrRenderComponent(unref(Link$1), {
            href: __props.list.last_page_url,
            class: "px-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path><path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-5 h-5"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                      "clip-rule": "evenodd"
                    }),
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const _sfc_main$1s = {
  __name: "InlineForumEditor",
  __ssrInlineRender: true,
  props: {
    forum: Object
  },
  setup(__props) {
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="x justify-between px-2 py-1"><div class="x gap-2"><span class="opacity-50">${ssrInterpolate(__props.forum.id)}</span><span>${ssrInterpolate(__props.forum.name)}</span></div><div class="x items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"></path><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path><path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></div></div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="x bg-neutral-900 p-2"> ddddd </div><!--]-->`);
    };
  }
};
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InlineForumEditor.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const _sfc_main$1r = {
  __name: "Forums",
  __ssrInlineRender: true,
  props: {
    forums: Object
  },
  setup(__props) {
    const newForum = useForm({
      action: "create",
      name: null,
      description: null,
      slug: null,
      use_slug: true,
      parent_id: null,
      category: false,
      visible: true,
      priority: null,
      password: null
    });
    const addForum = () => {
      newForum.post(route$1("system.forums"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1u, mergeProps({ title: "Forums" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.forums }, null, _parent2, _scopeId));
            _push2(`<div class="y pane !px-0 !py-0 divide-y divide-neutral-200/50 dark:divide-neutral-700/50 overflow-clip"${_scopeId}><!--[-->`);
            ssrRenderList(__props.forums.data, (forum) => {
              _push2(`<div class="y"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1s, { forum }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><h2 class="font-bold text-2xl"${_scopeId}>Create New Forum</h2><div class="y pane !py-4"${_scopeId}><form class="y space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newForum).name,
              "onUpdate:modelValue": ($event) => unref(newForum).name = $event,
              type: "text",
              placeholder: "Forum Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newForum).description,
              "onUpdate:modelValue": ($event) => unref(newForum).description = $event,
              type: "text",
              placeholder: "Forum Description"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newForum).slug,
              "onUpdate:modelValue": ($event) => unref(newForum).slug = $event,
              type: "text",
              placeholder: "Custom Slug (optional)"
            }, null, _parent2, _scopeId));
            _push2(`<label class="x items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1L, {
              checked: unref(newForum).use_slug,
              "onUpdate:checked": ($event) => unref(newForum).use_slug = $event
            }, null, _parent2, _scopeId));
            _push2(` Use Slug </label>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              placeholder: "Password (optional)"
            }, null, _parent2, _scopeId));
            _push2(`<label class="x items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1L, {
              checked: unref(newForum).category,
              "onUpdate:checked": ($event) => unref(newForum).category = $event
            }, null, _parent2, _scopeId));
            _push2(` Category </label><label class="x items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1L, {
              checked: unref(newForum).visible,
              "onUpdate:checked": ($event) => unref(newForum).visible = $event
            }, null, _parent2, _scopeId));
            _push2(` Visible </label>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newForum).priority,
              "onUpdate:modelValue": ($event) => unref(newForum).priority = $event,
              type: "number",
              placeholder: "Priority"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newForum).parent_id,
              "onUpdate:modelValue": ($event) => unref(newForum).parent_id = $event,
              type: "number",
              placeholder: "Parent ID"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create Forum`);
                } else {
                  return [
                    createTextVNode("Create Forum")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode(_sfc_main$1t, { list: __props.forums }, null, 8, ["list"]),
              createVNode("div", { class: "y pane !px-0 !py-0 divide-y divide-neutral-200/50 dark:divide-neutral-700/50 overflow-clip" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.forums.data, (forum) => {
                  return openBlock(), createBlock("div", { class: "y" }, [
                    createVNode(_sfc_main$1s, { forum }, null, 8, ["forum"])
                  ]);
                }), 256))
              ]),
              createVNode("h2", { class: "font-bold text-2xl" }, "Create New Forum"),
              createVNode("div", { class: "y pane !py-4" }, [
                createVNode("form", {
                  onSubmit: withModifiers(addForum, ["prevent"]),
                  class: "y space-y-2"
                }, [
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newForum).name,
                    "onUpdate:modelValue": ($event) => unref(newForum).name = $event,
                    type: "text",
                    placeholder: "Forum Name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newForum).description,
                    "onUpdate:modelValue": ($event) => unref(newForum).description = $event,
                    type: "text",
                    placeholder: "Forum Description"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newForum).slug,
                    "onUpdate:modelValue": ($event) => unref(newForum).slug = $event,
                    type: "text",
                    placeholder: "Custom Slug (optional)"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("label", { class: "x items-center gap-1" }, [
                    createVNode(_sfc_main$1L, {
                      checked: unref(newForum).use_slug,
                      "onUpdate:checked": ($event) => unref(newForum).use_slug = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createTextVNode(" Use Slug ")
                  ]),
                  createVNode(_sfc_main$1M, {
                    type: "text",
                    placeholder: "Password (optional)"
                  }),
                  createVNode("label", { class: "x items-center gap-1" }, [
                    createVNode(_sfc_main$1L, {
                      checked: unref(newForum).category,
                      "onUpdate:checked": ($event) => unref(newForum).category = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createTextVNode(" Category ")
                  ]),
                  createVNode("label", { class: "x items-center gap-1" }, [
                    createVNode(_sfc_main$1L, {
                      checked: unref(newForum).visible,
                      "onUpdate:checked": ($event) => unref(newForum).visible = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createTextVNode(" Visible ")
                  ]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newForum).priority,
                    "onUpdate:modelValue": ($event) => unref(newForum).priority = $event,
                    type: "number",
                    placeholder: "Priority"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newForum).parent_id,
                    "onUpdate:modelValue": ($event) => unref(newForum).parent_id = $event,
                    type: "number",
                    placeholder: "Parent ID"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1R, { class: "w-fit" }, {
                    default: withCtx(() => [
                      createTextVNode("Create Forum")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Forums.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1q = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    let message = ref(null);
    let link = ref(null);
    const announcementSend = (message2, link2) => {
      router.post("/admin?" + new URLSearchParams({
        message: message2,
        link: link2,
        action: "send announcement"
      }).toString());
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1u, mergeProps({ title: "Home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y pane space-y-2"${_scopeId}><p${_scopeId}>This is the button that annoys the hoes</p>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              modelValue: unref(message),
              "onUpdate:modelValue": ($event) => isRef(message) ? message.value = $event : message = $event,
              placeholder: "Message",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              modelValue: unref(link),
              "onUpdate:modelValue": ($event) => isRef(link) ? link.value = $event : link = $event,
              placeholder: "Link",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, {
              onClick: ($event) => announcementSend(unref(message), unref(link)),
              class: "w-fit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`button`);
                } else {
                  return [
                    createTextVNode("button")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y pane space-y-2" }, [
                createVNode("p", null, "This is the button that annoys the hoes"),
                createVNode(_sfc_main$1M, {
                  type: "text",
                  modelValue: unref(message),
                  "onUpdate:modelValue": ($event) => isRef(message) ? message.value = $event : message = $event,
                  placeholder: "Message",
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1M, {
                  type: "text",
                  modelValue: unref(link),
                  "onUpdate:modelValue": ($event) => isRef(link) ? link.value = $event : link = $event,
                  placeholder: "Link",
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1R, {
                  onClick: ($event) => announcementSend(unref(message), unref(link)),
                  class: "w-fit"
                }, {
                  default: withCtx(() => [
                    createTextVNode("button")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Home.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1p = {
  __name: "Settings",
  __ssrInlineRender: true,
  props: {
    settings: Object
  },
  setup(__props) {
    const newSetting = useForm({
      action: "create",
      site: 0,
      key: null,
      value: "",
      type: 0
    });
    const addUser = () => {
      newSetting.post(route$1("system.settings"));
    };
    const prettify = () => {
      let json;
      try {
        json = JSON.parse(newSetting.value);
        newSetting.value = JSON.stringify(json, null, 2);
      } catch (e) {
        alert(e);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1u, mergeProps({ title: "Users" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.settings }, null, _parent2, _scopeId));
            _push2(`<div class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.settings.data, (setting) => {
              _push2(`<div class="x justify-between px-2 py-1"${_scopeId}><div class="x gap-2"${_scopeId}><span class="opacity-50"${_scopeId}>${ssrInterpolate(setting.id)}</span><span${_scopeId}>${ssrInterpolate(setting.site)}</span><span${_scopeId}>${ssrInterpolate(setting.key)}</span></div><div class="x items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"${_scopeId}></path><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"${_scopeId}></path></svg></div></div>`);
            });
            _push2(`<!--]--></div><h2 class="font-bold text-2xl"${_scopeId}>Create New Setting</h2><div class="y pane !py-4"${_scopeId}><form class="y space-y-2"${_scopeId}><div class="x gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              class: "w-full font-mono",
              modelValue: unref(newSetting).key,
              "onUpdate:modelValue": ($event) => unref(newSetting).key = $event,
              type: "text",
              placeholder: "Setting Key"
            }, null, _parent2, _scopeId));
            _push2(`<select class="pane !py-1 border-0"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.app.sites, (site, index) => {
              _push2(`<option${ssrRenderAttr("value", index)}${ssrIncludeBooleanAttr(index === 0) ? " selected" : ""}${_scopeId}>${ssrInterpolate(index)}: ${ssrInterpolate(site)}</option>`);
            });
            _push2(`<!--]--></select><select class="pane !py-1 border-0"${_scopeId}><option${ssrRenderAttr("value", 0)} selected${_scopeId}>Text</option><option${ssrRenderAttr("value", 1)} selected${_scopeId}>Integer</option><option${ssrRenderAttr("value", 2)} selected${_scopeId}>Decimal</option><option${ssrRenderAttr("value", 3)} selected${_scopeId}>Boolean</option><option${ssrRenderAttr("value", 4)} selected${_scopeId}>JSON</option></select></div><textarea spellcheck="false" placeholder="Value" class="whitespace-pre-wrap font-mono text-sm transition-colors bg-neutral-100 dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60 rounded border-0 text-neutral-700 dark:text-neutral-300 placeholder-neutral-300 dark:placeholder-neutral-500"${_scopeId}>${ssrInterpolate(unref(newSetting).value)}</textarea>`);
            if (unref(newSetting).type === 4) {
              _push2(`<span class="text-sm text-blue-500 cursor-pointer"${_scopeId}>Prettify</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create Setting`);
                } else {
                  return [
                    createTextVNode("Create Setting")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode(_sfc_main$1t, { list: __props.settings }, null, 8, ["list"]),
              createVNode("div", { class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.settings.data, (setting) => {
                  return openBlock(), createBlock("div", { class: "x justify-between px-2 py-1" }, [
                    createVNode("div", { class: "x gap-2" }, [
                      createVNode("span", { class: "opacity-50" }, toDisplayString(setting.id), 1),
                      createVNode("span", null, toDisplayString(setting.site), 1),
                      createVNode("span", null, toDisplayString(setting.key), 1)
                    ]),
                    createVNode("div", { class: "x items-center gap-2" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5"
                      }, [
                        createVNode("path", { d: "M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" }),
                        createVNode("path", { d: "M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5"
                      }, [
                        createVNode("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
                      ]))
                    ])
                  ]);
                }), 256))
              ]),
              createVNode("h2", { class: "font-bold text-2xl" }, "Create New Setting"),
              createVNode("div", { class: "y pane !py-4" }, [
                createVNode("form", {
                  onSubmit: withModifiers(addUser, ["prevent"]),
                  class: "y space-y-2"
                }, [
                  createVNode("div", { class: "x gap-2" }, [
                    createVNode(_sfc_main$1M, {
                      class: "w-full font-mono",
                      modelValue: unref(newSetting).key,
                      "onUpdate:modelValue": ($event) => unref(newSetting).key = $event,
                      type: "text",
                      placeholder: "Setting Key"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("select", { class: "pane !py-1 border-0" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.app.sites, (site, index) => {
                        return openBlock(), createBlock("option", {
                          key: index,
                          value: index,
                          selected: index === 0
                        }, toDisplayString(index) + ": " + toDisplayString(site), 9, ["value", "selected"]);
                      }), 128))
                    ]),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(newSetting).type = $event,
                      class: "pane !py-1 border-0"
                    }, [
                      createVNode("option", {
                        value: 0,
                        selected: ""
                      }, "Text"),
                      createVNode("option", {
                        value: 1,
                        selected: ""
                      }, "Integer"),
                      createVNode("option", {
                        value: 2,
                        selected: ""
                      }, "Decimal"),
                      createVNode("option", {
                        value: 3,
                        selected: ""
                      }, "Boolean"),
                      createVNode("option", {
                        value: 4,
                        selected: ""
                      }, "JSON")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, unref(newSetting).type]
                    ])
                  ]),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(newSetting).value = $event,
                    spellcheck: "false",
                    placeholder: "Value",
                    class: "whitespace-pre-wrap font-mono text-sm transition-colors bg-neutral-100 dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60 rounded border-0 text-neutral-700 dark:text-neutral-300 placeholder-neutral-300 dark:placeholder-neutral-500"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(newSetting).value]
                  ]),
                  unref(newSetting).type === 4 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-sm text-blue-500 cursor-pointer",
                    onClick: prettify
                  }, "Prettify")) : createCommentVNode("", true),
                  createVNode(_sfc_main$1R, { class: "w-fit" }, {
                    default: withCtx(() => [
                      createTextVNode("Create Setting")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1p
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1o = {
  __name: "Users",
  __ssrInlineRender: true,
  props: {
    users: Object
  },
  setup(__props) {
    const newUser = useForm({
      action: "create",
      user_id: null,
      username: null,
      email: null,
      password: null,
      confirm_password: null,
      referrer_id: null
    });
    const addUser = () => {
      newUser.post(route$1("system.users"));
    };
    const impersonate = (id) => {
      router.post(route$1("system.users"), {
        action: "impersonate",
        user: id
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1u, mergeProps({ title: "Users" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.users }, null, _parent2, _scopeId));
            _push2(`<div class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.users.data, (user) => {
              _push2(`<div class="x justify-between px-2 py-1"${_scopeId}><div class="x gap-2"${_scopeId}><span class="opacity-50"${_scopeId}>${ssrInterpolate(user.id)}</span><span${_scopeId}>${ssrInterpolate(user.name)}</span></div><div class="x items-center gap-2"${_scopeId}><div title="Impersonate User" class="cursor-pointer"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"${_scopeId}></path></svg></div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"${_scopeId}></path><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"${_scopeId}><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"${_scopeId}></path></svg></div></div>`);
            });
            _push2(`<!--]--></div><h2 class="font-bold text-2xl"${_scopeId}>Create New User</h2><div class="y pane !py-4"${_scopeId}><form class="y space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newUser).username,
              "onUpdate:modelValue": ($event) => unref(newUser).username = $event,
              type: "text",
              placeholder: "Username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newUser).email,
              "onUpdate:modelValue": ($event) => unref(newUser).email = $event,
              type: "text",
              placeholder: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newUser).password,
              "onUpdate:modelValue": ($event) => unref(newUser).password = $event,
              type: "password",
              placeholder: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newUser).confirm_password,
              "onUpdate:modelValue": ($event) => unref(newUser).confirm_password = $event,
              type: "password",
              placeholder: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newUser).referrer_id,
              "onUpdate:modelValue": ($event) => unref(newUser).referrer_id = $event,
              type: "number",
              placeholder: "Referrer ID"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(newUser).user_id,
              "onUpdate:modelValue": ($event) => unref(newUser).user_id = $event,
              type: "number",
              placeholder: "User ID"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create User`);
                } else {
                  return [
                    createTextVNode("Create User")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode(_sfc_main$1t, { list: __props.users }, null, 8, ["list"]),
              createVNode("div", { class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (user) => {
                  return openBlock(), createBlock("div", { class: "x justify-between px-2 py-1" }, [
                    createVNode("div", { class: "x gap-2" }, [
                      createVNode("span", { class: "opacity-50" }, toDisplayString(user.id), 1),
                      createVNode("span", null, toDisplayString(user.name), 1)
                    ]),
                    createVNode("div", { class: "x items-center gap-2" }, [
                      createVNode("div", {
                        title: "Impersonate User",
                        class: "cursor-pointer",
                        onClick: ($event) => impersonate(user.id)
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          class: "w-5 h-5"
                        }, [
                          createVNode("path", { d: "M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" })
                        ]))
                      ], 8, ["onClick"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5"
                      }, [
                        createVNode("path", { d: "M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" }),
                        createVNode("path", { d: "M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5"
                      }, [
                        createVNode("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
                      ]))
                    ])
                  ]);
                }), 256))
              ]),
              createVNode("h2", { class: "font-bold text-2xl" }, "Create New User"),
              createVNode("div", { class: "y pane !py-4" }, [
                createVNode("form", {
                  onSubmit: withModifiers(addUser, ["prevent"]),
                  class: "y space-y-2"
                }, [
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newUser).username,
                    "onUpdate:modelValue": ($event) => unref(newUser).username = $event,
                    type: "text",
                    placeholder: "Username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newUser).email,
                    "onUpdate:modelValue": ($event) => unref(newUser).email = $event,
                    type: "text",
                    placeholder: "Email"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newUser).password,
                    "onUpdate:modelValue": ($event) => unref(newUser).password = $event,
                    type: "password",
                    placeholder: "Password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newUser).confirm_password,
                    "onUpdate:modelValue": ($event) => unref(newUser).confirm_password = $event,
                    type: "password",
                    placeholder: "Confirm Password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newUser).referrer_id,
                    "onUpdate:modelValue": ($event) => unref(newUser).referrer_id = $event,
                    type: "number",
                    placeholder: "Referrer ID"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(newUser).user_id,
                    "onUpdate:modelValue": ($event) => unref(newUser).user_id = $event,
                    type: "number",
                    placeholder: "User ID"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$1R, { class: "w-fit" }, {
                    default: withCtx(() => [
                      createTextVNode("Create User")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1n = {
  __name: "AuthenticationCard",
  __ssrInlineRender: true,
  setup(__props) {
    onBeforeMount(() => {
      useSettingsStore();
      useStatisticsStore();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-neutral-100 dark:bg-ui-900 text-neutral-800 dark:text-ui-200" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "logo", {}, null, _push, _parent);
      _push(`</div><div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-ui-800 shadow-md overflow-hidden sm:rounded-lg">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/AuthenticationCard.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const _sfc_main$1m = {
  __name: "AuthenticationCardLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link$1), mergeProps({
        href: _ctx.route("home"),
        class: "font-bold text-3xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-cyan-400"${_scopeId}>Dash</span>Net`);
          } else {
            return [
              createVNode("span", { class: "text-cyan-400" }, "Dash"),
              createTextVNode("Net")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/AuthenticationCardLogo.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const _sfc_main$1l = {
  __name: "ValidationErrors",
  __ssrInlineRender: true,
  setup(__props) {
    const errors = computed(() => usePage().props.errors);
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasErrors)) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="font-medium text-red-600"> Whoops! Something went wrong. </div><ul class="mt-3 list-disc list-inside text-sm text-red-600"><!--[-->`);
        ssrRenderList(unref(errors), (error, key) => {
          _push(`<li>${ssrInterpolate(error)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ValidationErrors.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const _sfc_main$1k = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      password: ""
    });
    const passwordInput = ref(null);
    const submit = () => {
      form.post(route$1("password.confirm"), {
        onFinish: () => {
          form.reset();
          passwordInput.value.focus();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Secure Area" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-neutral-600 dark:text-neutral-200"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "current-password",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirm `);
                } else {
                  return [
                    createTextVNode(" Confirm ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-neutral-600 dark:text-neutral-200" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              createVNode(_sfc_main$1l, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1J, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex justify-end mt-4" }, [
                  createVNode(_sfc_main$1R, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1j = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route$1("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1l, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Email Password Reset Link `);
                } else {
                  return [
                    createTextVNode(" Email Password Reset Link ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode(_sfc_main$1l, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1J, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(_sfc_main$1R, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Email Password Reset Link ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1i = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String,
    errors: Object
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.transform((data) => ({
        ...data,
        remember: form.remember ? "on" : ""
      })).post(route$1("auth::login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1l, { class: "mb-4" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1L, {
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event,
              name: "remember"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm text-neutral-600 dark:text-neutral-200"${_scopeId}>Remember me</span></label></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("auth::password.request"),
                class: "underline text-sm text-neutral-600 hover:text-neutral-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log in `);
                } else {
                  return [
                    createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(_sfc_main$1l, { class: "mb-4" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1J, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "block mt-4" }, [
                  createVNode("label", { class: "flex items-center" }, [
                    createVNode(_sfc_main$1L, {
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event,
                      name: "remember"
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ml-2 text-sm text-neutral-600 dark:text-neutral-200" }, "Remember me")
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  __props.canResetPassword ? (openBlock(), createBlock(unref(Link$1), {
                    key: 0,
                    href: unref(route$1)("auth::password.request"),
                    class: "underline text-sm text-neutral-600 hover:text-neutral-900"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot your password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$1R, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Log in ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1h = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false,
      agecheck: false
    });
    const submit = () => {
      form.post(route$1("auth::register"), {
        onFinish: () => {
          form.reset("password", "password_confirmation");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1l, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "name",
              value: "Username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: "",
              autofocus: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(`<div class="x mt-1 items-center text-xs text-neutral-400 dark:text-neutral-500"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1"${_scopeId}><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Choose carefully, you will not be able to change your username later!</span></div></div><div class="mt-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "password_confirmation",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, { for: "terms" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1L, {
                    id: "terms",
                    checked: unref(form).terms,
                    "onUpdate:checked": ($event) => unref(form).terms = $event,
                    name: "terms"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="ml-2"${_scopeId2}> I agree to the `);
                  _push3(ssrRenderComponent(unref(Link$1), {
                    target: "_blank",
                    href: unref(route$1)("legal.terms"),
                    class: "underline text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 text-sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terms of Service`);
                      } else {
                        return [
                          createTextVNode("Terms of Service")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` and `);
                  _push3(ssrRenderComponent(unref(Link$1), {
                    target: "_blank",
                    href: unref(route$1)("legal.privacy"),
                    class: "underline text-neutral-900 text-sm dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Privacy Policy`);
                      } else {
                        return [
                          createTextVNode("Privacy Policy")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode(_sfc_main$1L, {
                        id: "terms",
                        checked: unref(form).terms,
                        "onUpdate:checked": ($event) => unref(form).terms = $event,
                        name: "terms"
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("div", { class: "ml-2" }, [
                        createTextVNode(" I agree to the "),
                        createVNode(unref(Link$1), {
                          target: "_blank",
                          href: unref(route$1)("legal.terms"),
                          class: "underline text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 text-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Terms of Service")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createTextVNode(" and "),
                        createVNode(unref(Link$1), {
                          target: "_blank",
                          href: unref(route$1)("legal.privacy"),
                          class: "underline text-neutral-900 text-sm dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Privacy Policy")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, { for: "terms" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1L, {
                    id: "agecheck",
                    checked: unref(form).agecheck,
                    "onUpdate:checked": ($event) => unref(form).agecheck = $event,
                    name: "agecheck"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="ml-2"${_scopeId2}> I agree that I am 13 years or older </div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode(_sfc_main$1L, {
                        id: "agecheck",
                        checked: unref(form).agecheck,
                        "onUpdate:checked": ($event) => unref(form).agecheck = $event,
                        name: "agecheck"
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("div", { class: "ml-2" }, " I agree that I am 13 years or older ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("auth::login"),
              class: "underline text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-400 dark:hover:text-neutral-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already registered? `);
                } else {
                  return [
                    createTextVNode(" Already registered? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Register `);
                } else {
                  return [
                    createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(_sfc_main$1l, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1J, {
                    for: "name",
                    value: "Username"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "x mt-1 items-center text-xs text-neutral-400 dark:text-neutral-500" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      class: "w-4 h-4 mr-1"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z",
                        "clip-rule": "evenodd"
                      })
                    ])),
                    createVNode("span", null, "Choose carefully, you will not be able to change your username later!")
                  ])
                ]),
                createVNode("div", { class: "mt-1" }, [
                  createVNode(_sfc_main$1J, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1J, { for: "terms" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1L, {
                          id: "terms",
                          checked: unref(form).terms,
                          "onUpdate:checked": ($event) => unref(form).terms = $event,
                          name: "terms"
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("div", { class: "ml-2" }, [
                          createTextVNode(" I agree to the "),
                          createVNode(unref(Link$1), {
                            target: "_blank",
                            href: unref(route$1)("legal.terms"),
                            class: "underline text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 text-sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Terms of Service")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createTextVNode(" and "),
                          createVNode(unref(Link$1), {
                            target: "_blank",
                            href: unref(route$1)("legal.privacy"),
                            class: "underline text-neutral-900 text-sm dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Privacy Policy")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "mt-2" }, [
                  createVNode(_sfc_main$1J, { for: "terms" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1L, {
                          id: "agecheck",
                          checked: unref(form).agecheck,
                          "onUpdate:checked": ($event) => unref(form).agecheck = $event,
                          name: "agecheck"
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("div", { class: "ml-2" }, " I agree that I am 13 years or older ")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(unref(Link$1), {
                    href: unref(route$1)("auth::login"),
                    class: "underline text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-400 dark:hover:text-neutral-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Already registered? ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$1R, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Register ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1g = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: String,
    token: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route$1("password.update"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1l, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              id: "password_confirmation",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset Password `);
                } else {
                  return [
                    createTextVNode(" Reset Password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(_sfc_main$1l, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1J, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(_sfc_main$1R, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Reset Password ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1f = {
  __name: "TwoFactorChallenge",
  __ssrInlineRender: true,
  setup(__props) {
    const recovery = ref(false);
    const form = useForm({
      code: "",
      recovery_code: ""
    });
    const recoveryCodeInput = ref(null);
    const codeInput = ref(null);
    const toggleRecovery = async () => {
      recovery.value ^= true;
      await nextTick();
      if (recovery.value) {
        recoveryCodeInput.value.focus();
        form.code = "";
      } else {
        codeInput.value.focus();
        form.recovery_code = "";
      }
    };
    const submit = () => {
      form.post(route$1("two-factor.login"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Two-factor Confirmation" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<!--[--> Please confirm access to your account by entering the authentication code provided by your authenticator application. <!--]-->`);
            } else {
              _push2(`<!--[--> Please confirm access to your account by entering one of your emergency recovery codes. <!--]-->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1l, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1J, {
                for: "code",
                value: "Code"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1M, {
                id: "code",
                ref_key: "codeInput",
                ref: codeInput,
                modelValue: unref(form).code,
                "onUpdate:modelValue": ($event) => unref(form).code = $event,
                type: "text",
                inputmode: "numeric",
                class: "mt-1 block w-full",
                autofocus: "",
                autocomplete: "one-time-code"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1J, {
                for: "recovery_code",
                value: "Recovery Code"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1M, {
                id: "recovery_code",
                ref_key: "recoveryCodeInput",
                ref: recoveryCodeInput,
                modelValue: unref(form).recovery_code,
                "onUpdate:modelValue": ($event) => unref(form).recovery_code = $event,
                type: "text",
                class: "mt-1 block w-full",
                autocomplete: "one-time-code"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<div class="flex items-center justify-end mt-4"${_scopeId}><button type="button" class="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<!--[--> Use a recovery code <!--]-->`);
            } else {
              _push2(`<!--[--> Use an authentication code <!--]-->`);
            }
            _push2(`</button>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log in `);
                } else {
                  return [
                    createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, [
                !recovery.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createTextVNode(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createTextVNode(" Please confirm access to your account by entering one of your emergency recovery codes. ")
                ], 64))
              ]),
              createVNode(_sfc_main$1l, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                !recovery.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_sfc_main$1J, {
                    for: "code",
                    value: "Code"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "code",
                    ref_key: "codeInput",
                    ref: codeInput,
                    modelValue: unref(form).code,
                    "onUpdate:modelValue": ($event) => unref(form).code = $event,
                    type: "text",
                    inputmode: "numeric",
                    class: "mt-1 block w-full",
                    autofocus: "",
                    autocomplete: "one-time-code"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_sfc_main$1J, {
                    for: "recovery_code",
                    value: "Recovery Code"
                  }),
                  createVNode(_sfc_main$1M, {
                    id: "recovery_code",
                    ref_key: "recoveryCodeInput",
                    ref: recoveryCodeInput,
                    modelValue: unref(form).recovery_code,
                    "onUpdate:modelValue": ($event) => unref(form).recovery_code = $event,
                    type: "text",
                    class: "mt-1 block w-full",
                    autocomplete: "one-time-code"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode("button", {
                    type: "button",
                    class: "text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer",
                    onClick: withModifiers(toggleRecovery, ["prevent"])
                  }, [
                    !recovery.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(" Use a recovery code ")
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(" Use an authentication code ")
                    ], 64))
                  ], 8, ["onClick"]),
                  createVNode(_sfc_main$1R, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Log in ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1e = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm();
    const submit = () => {
      form.post(route$1("verification.send"));
    };
    const verificationLinkSent = computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1n, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1m)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
            if (unref(verificationLinkSent)) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided in your profile settings. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Resend Verification Email `);
                } else {
                  return [
                    createTextVNode(" Resend Verification Email ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("profile.show"),
              class: "underline text-sm text-gray-600 hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Profile`);
                } else {
                  return [
                    createTextVNode(" Edit Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("logout"),
              method: "post",
              as: "button",
              class: "underline text-sm text-gray-600 hover:text-gray-900 ml-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out `);
                } else {
                  return [
                    createTextVNode(" Log Out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
              unref(verificationLinkSent) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, " A new verification link has been sent to the email address you provided in your profile settings. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode(_sfc_main$1R, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Resend Verification Email ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"]),
                  createVNode("div", null, [
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("profile.show"),
                      class: "underline text-sm text-gray-600 hover:text-gray-900"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Profile")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("logout"),
                      method: "post",
                      as: "button",
                      class: "underline text-sm text-gray-600 hover:text-gray-900 ml-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Log Out ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1d = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Create Contest" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("contests.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Contests`);
                } else {
                  return [
                    createTextVNode("Contests")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Create</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("contests.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Contests")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Create")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 md:w-2/3"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Create a New Contest</h2><div class="y pane space-y-2"${_scopeId}><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Name</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Short Description</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label><label class="y"${_scopeId}><span class="my-1"${_scopeId}>URL</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              prefix: "https://gdforums.com/contest/",
              class: "p-0",
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label><label class="y space-y-2"${_scopeId}><span class="flex items-center"${_scopeId}><input type="radio" name="ranked_type" value="true" class="mr-1"${_scopeId}> Ranked \u2014 Submission are voted on and placed</span><span class="flex items-center"${_scopeId}><input type="radio" name="ranked_type" value="false" class="mr-1"${_scopeId}> Unranked \u2014 Submissions are not voted on, just for fun!</span></label>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              onclick: "alert('wip!')",
              class: "w-fit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create Contest`);
                } else {
                  return [
                    createTextVNode("Create Contest")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 md:w-2/3" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Create a New Contest"),
                createVNode("div", { class: "y pane space-y-2" }, [
                  createVNode("label", { class: "y" }, [
                    createVNode("span", { class: "my-1" }, "Name"),
                    createVNode(_sfc_main$1M, {
                      type: "text",
                      placeholder: "Required"
                    })
                  ]),
                  createVNode("label", { class: "y" }, [
                    createVNode("span", { class: "my-1" }, "Short Description"),
                    createVNode(_sfc_main$1M, {
                      type: "text",
                      placeholder: "Required"
                    })
                  ]),
                  createVNode("label", { class: "y" }, [
                    createVNode("span", { class: "my-1" }, "URL"),
                    createVNode(_sfc_main$1M, {
                      type: "text",
                      prefix: "https://gdforums.com/contest/",
                      class: "p-0",
                      placeholder: "Required"
                    })
                  ]),
                  createVNode("label", { class: "y space-y-2" }, [
                    createVNode("span", { class: "flex items-center" }, [
                      createVNode("input", {
                        type: "radio",
                        name: "ranked_type",
                        value: "true",
                        class: "mr-1"
                      }),
                      createTextVNode(" Ranked \u2014 Submission are voted on and placed")
                    ]),
                    createVNode("span", { class: "flex items-center" }, [
                      createVNode("input", {
                        type: "radio",
                        name: "ranked_type",
                        value: "false",
                        class: "mr-1"
                      }),
                      createTextVNode(" Unranked \u2014 Submissions are not voted on, just for fun!")
                    ])
                  ]),
                  createVNode(_sfc_main$1R, {
                    onclick: "alert('wip!')",
                    class: "w-fit"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Create Contest")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contests/Create.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1c = {
  __name: "StatsPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = useStatisticsStore().counts;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><h2 class="mx-2 font-bold text-2xl">Statistics</h2><div class="pane"><!--[-->`);
      ssrRenderList(unref(stats), (statistic, key) => {
        _push(`<div class="flex justify-between"><span class="capitalize">${ssrInterpolate(key)}</span><span>${ssrInterpolate(statistic)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/StatsPanel.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const _sfc_main$1b = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Contests" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("contests.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Contests`);
                } else {
                  return [
                    createTextVNode("Contests")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.route("contests.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Contests")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="flex flex-col space-y-4 md:w-3/4"${_scopeId}><div${_scopeId}>ooh look a contest</div><div${_scopeId}>wow another</div><div class="text-green-500 bg-red-50 w-fit px-4 rounded"${_scopeId}><p${_scopeId}>&gt; mfw wip feature</p><p${_scopeId}>&gt; picrel</p></div></div><div class="flex flex-col space-y-4 md:w-1/4"${_scopeId}><h2 class="font-bold text-2xl mx-2"${_scopeId}>More</h2>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("contests.create"),
              class: "rounded bg-cyan-400 font-bold px-4 py-2 text-neutral-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create a Contest `);
                } else {
                  return [
                    createTextVNode(" Create a Contest ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1c, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "flex flex-col space-y-4 md:w-3/4" }, [
                  createVNode("div", null, "ooh look a contest"),
                  createVNode("div", null, "wow another"),
                  createVNode("div", { class: "text-green-500 bg-red-50 w-fit px-4 rounded" }, [
                    createVNode("p", null, "> mfw wip feature"),
                    createVNode("p", null, "> picrel")
                  ])
                ]),
                createVNode("div", { class: "flex flex-col space-y-4 md:w-1/4" }, [
                  createVNode("h2", { class: "font-bold text-2xl mx-2" }, "More"),
                  createVNode(unref(Link$1), {
                    href: _ctx.route("contests.create"),
                    class: "rounded bg-cyan-400 font-bold px-4 py-2 text-neutral-50"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create a Contest ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$1c)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contests/Index.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1a = {
  __name: "DashboardLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: __props.title + " - Dashboard"
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Admin</span>`);
          } else {
            return [
              createVNode("span", null, "Admin")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="flex flex-col space-y-4 md:w-1/3"${_scopeId}><div class="y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("settings.home"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Home`);
                } else {
                  return [
                    createTextVNode("Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("settings.account"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Account Settings`);
                } else {
                  return [
                    createTextVNode("Account Settings")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("settings.profile"),
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Edit Profile`);
                } else {
                  return [
                    createTextVNode("Edit Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col space-y-2 md:w-2/3"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "flex flex-col space-y-4 md:w-1/3" }, [
                  createVNode("div", { class: "y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50" }, [
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("settings.home"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Home")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("settings.account"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Account Settings")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("settings.profile"),
                      class: "p-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit Profile")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col space-y-2 md:w-2/3" }, [
                  renderSlot(_ctx.$slots, "default")
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/DashboardLayout.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const _sfc_main$19 = {
  __name: "Account",
  __ssrInlineRender: true,
  props: {
    profile: Object
  },
  setup(__props) {
    const props = __props;
    const email = useForm({
      action: "update email",
      email: props.profile.email,
      password: null
    });
    const password = useForm({
      action: "update password",
      current_password: null,
      new_password: null,
      new_password_confirmation: null
    });
    const changeEmail = () => {
      email.post(route$1("settings.home"), {
        errorBag: "changeEmail",
        onSuccess: () => {
          email.password = "";
        }
      });
    };
    const changePassword = () => {
      password.post(route$1("settings.home"), {
        errorBag: "changePassword",
        onSuccess: () => {
          password.current_password = "";
          password.new_password = "";
          password.new_password_confirmation = "";
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({ title: "Home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Change Email</h2><div${_scopeId}><span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300"${_scopeId}>Email</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(email).email,
              "onUpdate:modelValue": ($event) => unref(email).email = $event,
              class: "mt-1",
              type: "email",
              placeholder: "Email"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300"${_scopeId}>Confirm Password</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(email).password,
              "onUpdate:modelValue": ($event) => unref(email).password = $event,
              class: "mt-1",
              type: "password",
              placeholder: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(`</div><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors.changeEmail, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Email`);
                } else {
                  return [
                    createTextVNode("Change Email")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Change Password</h2><div${_scopeId}><span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300"${_scopeId}>Current Password</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(password).current_password,
              "onUpdate:modelValue": ($event) => unref(password).current_password = $event,
              class: "mt-1",
              type: "password",
              placeholder: "Current Password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300"${_scopeId}>New Password</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(password).new_password,
              "onUpdate:modelValue": ($event) => unref(password).new_password = $event,
              class: "mt-1",
              type: "password",
              placeholder: "New Password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300"${_scopeId}>Confirm New Password</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(password).new_password_confirmation,
              "onUpdate:modelValue": ($event) => unref(password).new_password_confirmation = $event,
              class: "mt-1",
              type: "password",
              placeholder: "Confirm New Password"
            }, null, _parent2, _scopeId));
            _push2(`</div><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors.changePassword, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Password`);
                } else {
                  return [
                    createTextVNode("Change Password")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(changeEmail, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Change Email"),
                createVNode("div", null, [
                  createVNode("span", { class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, "Email"),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(email).email,
                    "onUpdate:modelValue": ($event) => unref(email).email = $event,
                    class: "mt-1",
                    type: "email",
                    placeholder: "Email"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("span", { class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, "Confirm Password"),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(email).password,
                    "onUpdate:modelValue": ($event) => unref(email).password = $event,
                    class: "mt-1",
                    type: "password",
                    placeholder: "Confirm Password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors.changeEmail, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Email")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode("form", {
                onSubmit: withModifiers(changePassword, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Change Password"),
                createVNode("div", null, [
                  createVNode("span", { class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, "Current Password"),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(password).current_password,
                    "onUpdate:modelValue": ($event) => unref(password).current_password = $event,
                    class: "mt-1",
                    type: "password",
                    placeholder: "Current Password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("span", { class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, "New Password"),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(password).new_password,
                    "onUpdate:modelValue": ($event) => unref(password).new_password = $event,
                    class: "mt-1",
                    type: "password",
                    placeholder: "New Password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("span", { class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, "Confirm New Password"),
                  createVNode(_sfc_main$1M, {
                    modelValue: unref(password).new_password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(password).new_password_confirmation = $event,
                    class: "mt-1",
                    type: "password",
                    placeholder: "Confirm New Password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors.changePassword, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Password")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Account.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$19
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$18 = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({ title: "Home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="y pane"${_scopeId}>Welcome to the bathroom</p>`);
          } else {
            return [
              createVNode("p", { class: "y pane" }, "Welcome to the bathroom")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Home.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$18
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$17 = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    profile: Object
  },
  setup(__props) {
    const props = __props;
    const previewImage = (e, form, ref2) => {
      form.content = e.target.files[0];
      ref2.src = URL.createObjectURL(form.content);
    };
    const bio = useForm({
      action: "update bio",
      content: props.profile.bio
    });
    const changeBio = () => {
      bio.post(route$1("settings.update"));
    };
    const signature = useForm({
      action: "update signature",
      content: props.profile.signature
    });
    const changeSignature = () => {
      bio.post(route$1("settings.update"));
    };
    const avatar = useForm({
      action: "update avatar",
      content: null
    });
    ref(null);
    const changeAvatar = () => {
      avatar.post(route$1("settings.update"), {
        errorBag: "changeAvatar"
      });
    };
    const banner = useForm({
      action: "update banner",
      content: null
    });
    ref(null);
    const changeBanner = () => {
      banner.post(route$1("settings.update"), {
        errorBag: "changeBanner"
      });
    };
    const flag = useForm({
      action: "update banner",
      content: null
    });
    const changeFlag = () => {
      banner.post(route$1("settings.update"), {
        errorBag: "changeBanner"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1a, mergeProps({ title: "Home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Avatar</h2><img class="max-h-32 w-32"${ssrRenderAttr("src", __props.profile.avatar_url)} alt="Avatar"${_scopeId}><input type="file"${_scopeId}><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors.changeAvatar, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Avatar`);
                } else {
                  return [
                    createTextVNode("Change Avatar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Banner</h2><img class="max-h-32 self-start object-scale-down"${ssrRenderAttr("src", __props.profile.banner_url)} alt="Banner"${_scopeId}><input type="file"${_scopeId}><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors.changeBanner, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Profile Banner`);
                } else {
                  return [
                    createTextVNode("Change Profile Banner")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Country Flag</h2><select${_scopeId}><option${_scopeId}>United States of America</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Flag`);
                } else {
                  return [
                    createTextVNode("Change Flag")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Bio</h2><textarea placeholder="Once upon a time..." class="resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"${_scopeId}>${ssrInterpolate(unref(bio).content)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Bio`);
                } else {
                  return [
                    createTextVNode("Change Bio")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Signature</h2><textarea placeholder="Sincerely, Summer Glau" class="resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"${_scopeId}>${ssrInterpolate(unref(signature).content)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Signature`);
                } else {
                  return [
                    createTextVNode("Change Signature")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(changeAvatar, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Avatar"),
                createVNode("img", {
                  class: "max-h-32 w-32",
                  ref: "avatar_preview",
                  src: __props.profile.avatar_url,
                  alt: "Avatar"
                }, null, 8, ["src"]),
                createVNode("input", {
                  type: "file",
                  onInput: ($event) => previewImage($event, unref(avatar), _ctx.$refs.avatar_preview)
                }, null, 40, ["onInput"]),
                createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors.changeAvatar, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Avatar")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode("form", {
                onSubmit: withModifiers(changeBanner, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Banner"),
                createVNode("img", {
                  class: "max-h-32 self-start object-scale-down",
                  ref: "banner_preview",
                  src: __props.profile.banner_url,
                  alt: "Banner"
                }, null, 8, ["src"]),
                createVNode("input", {
                  type: "file",
                  onInput: ($event) => previewImage($event, unref(banner), _ctx.$refs.banner_preview)
                }, null, 40, ["onInput"]),
                createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors.changeBanner, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Profile Banner")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode("form", {
                onSubmit: withModifiers(changeFlag, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Country Flag"),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(flag).content = $event
                }, [
                  createVNode("option", null, "United States of America")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(flag).content]
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Flag")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode("form", {
                onSubmit: withModifiers(changeBio, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Bio"),
                withDirectives(createVNode("textarea", {
                  "onUpdate:modelValue": ($event) => unref(bio).content = $event,
                  placeholder: "Once upon a time...",
                  class: "resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(bio).content]
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Bio")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode("form", {
                onSubmit: withModifiers(changeSignature, ["prevent"]),
                class: "y pane space-y-2"
              }, [
                createVNode("h2", { class: "font-bold text-xl" }, "Signature"),
                withDirectives(createVNode("textarea", {
                  "onUpdate:modelValue": ($event) => unref(signature).content = $event,
                  placeholder: "Sincerely, Summer Glau",
                  class: "resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(signature).content]
                ]),
                createVNode(_sfc_main$1R, { class: "w-fit" }, {
                  default: withCtx(() => [
                    createTextVNode("Change Signature")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Profile.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$17
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$16 = defineComponent({
  components: {
    SiteLogo: _sfc_main$1A,
    Link: Link$1,
    Head
  }
});
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_SiteLogo = resolveComponent("SiteLogo");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "F.A.Q." }, null, _parent));
  _push(`<div class="font-sans text-gray-900 antialiased"><div class="pt-4 bg-gray-100"><div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0"><div>`);
  _push(ssrRenderComponent(_component_SiteLogo, null, null, _parent));
  _push(`</div><div class="w-full sm:max-w-2xl my-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose"><div class="max-w-6xl"><h1 class="text-xl font-bold text-center">Frequently Asked Questions</h1><h6 class="underline text-center">`);
  _push(ssrRenderComponent(_component_Link, { href: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Return Home`);
      } else {
        return [
          createTextVNode("Return Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</h6><h2 class="text-md font-bold">Do you store my GD password?</h2><p>No. Not unless you tell us to. When you link your GD account we ask for a password only to verify you own the account, but we do not store it. When you link your GD account you will have two options: Ownership Verification and Full Access. The first one checks ownership only but does not store your password. The second one does store your password for API access to your account. Do to the nature of how GD&#39;s servers work having your password is required for performing some of the actions in a Full Access account, but we do encrypt the passwords so even if our database was hacked the hacker would not be able to read your password in plain text. Regardless, for security reasons only certain testers can create Full Access accounts while they are still in beta. The ability to create Full Access accounts are primarily given to other developers. If you are interested in testing it out, feel free to contact staff via Discord. Again, as a precaution if you are a high-profile user such as a top leaderboard player / creator / moderator then you will not be able to create a Full Access link with that GD account.</p><h2 class="text-md font-bold">I still don&#39;t trust it. Is there a way to link my account without a password?</h2><p>Yes, you can still link your account without entering your password. That&#39;s smart security, and I respect that! You can contact a staff member on Discord to walk you through the instructions. We do not have an automated system such as making a profile post or sending a private message in GD to verify to prevent social engineering. We may implement this in the future once we find a method that we determine to be robust enough to prevent less tech-informed users from inadvertently letting someone else link their account on DashLink.</p><h2 class="text-md font-bold">I tried linking my account and it said it requires further verification. I can&#39;t log in with DashLink on other sites ever after linking my account.</h2><p>There may be a few reason why this has happened.</p><p>1. Your account may have been banned from using DashLink which can happen for a number of reasons. You can join our discord and ask a staff member for more information.</p><p>2. Some high-profile accounts have locks on them to prevent unauthorized authentication on other sites. Please contact us on our Discord so we can enable your account manually or let you know why your account is banned.</p><p>3. If you linked your account but you can&#39;t log in on another site, DashLink may be down for maintenance.</p><h2 class="text-md font-bold">How does Two Factor Authentication work?</h2><p>Any time you log into DashLink, or you try to log in to another service with DashLink, you will get a Two Factor Authentication code so that you always know when your account is being accessed. If you are a High-Profile account such as a top 100 player, creator, or moderator, 2fa is required.</p><h2 class="text-md font-bold">What&#39;s the point of this?</h2><p>TL;DR it&#39;s like that &quot;Log In with Google&quot; button you see on a lot of websites, except for GD.</p><p>DashLink may seem less useful from an end-user point of view, but say for example you were a developer of a Geometry Dash related website like MyDemonList, Pointercrae, Lotus or GD Profiles. If you want someone to link their account, you want to be sure that they actually own that account. There are a few ways to do this, but they can require complicated methods like messaging or adding friends within GD. Or typing in your GD password. Some of these methods may take time to verify, especially if done manually. And what if you don&#39;t trust the website with your password? We use something called OAuth 2.0 to provide a standard way of authenticating users with their Geometry Dash accounts on other websites. This way you are fully in control. If you wish to remove a third-party website you can simply go on the connections page and remove it.</p><h2 class="text-md font-bold">How do I use DashLink as a developer?</h2><p>You can request an API token at the `);
  _push(ssrRenderComponent(_component_Link, { href: "/help/developers" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Developer Center`);
      } else {
        return [
          createTextVNode("Developer Center")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(` along with instructions on using OAuth 2.0</p><h2 class="text-md font-bold">How is DashLink pronounced?</h2><p>It&#39;s spelled DashLink but pronounced Da Shlink.</p><h2 class="text-md font-bold">Is there a based balls minigame?</h2>`);
  _push(ssrRenderComponent(_component_Link, { href: "/basedball" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Yep.`);
      } else {
        return [
          createTextVNode("Yep.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div><!--]-->`);
}
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Docs/Help.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const Help = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["ssrRender", _sfc_ssrRender$j]]);
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Help
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$15 = {};
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Docs/Index.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const Index$2 = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["ssrRender", _sfc_ssrRender$i]]);
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$14 = {
  __name: "PrivacyPolicy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_P = resolveComponent("P");
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Privacy Policy" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Privacy Policy</span>`);
          } else {
            return [
              createVNode("span", null, "Privacy Policy")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y p-4 w-full max-w-none space-y-2 prose prose-neutral dark:prose-gray dark:!prose-invert"${_scopeId}><h1${_scopeId}>Privacy Policy for DashNet</h1><p${_scopeId}>At DashNet, accessible from https://gdforums.com &amp; https://profile.gd, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DashNet and how we use it.</p><p${_scopeId}>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p><p${_scopeId}>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in DashNet. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://postsrc.com/tools/privacy-policy-generator"${_scopeId}>PostSrc Privacy Policy Generator</a>.</p><h2${_scopeId}>Consent</h2><p${_scopeId}>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p><h2${_scopeId}>Information we collect</h2><p${_scopeId}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p><p${_scopeId}>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p><p${_scopeId}>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p><h2${_scopeId}>How we use your information</h2><p${_scopeId}>We use the information we collect in various ways, including to:</p><ul${_scopeId}><li${_scopeId}>Provide, operate, and maintain our website</li><li${_scopeId}>Improve, personalize, and expand our website</li><li${_scopeId}>Understand and analyze how you use our website</li><li${_scopeId}>Develop new products, services, features, and functionality</li><li${_scopeId}>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li><li${_scopeId}>Send you emails</li><li${_scopeId}>Find and prevent fraud</li></ul><h2${_scopeId}>Log Files</h2><p${_scopeId}>DashNet follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&#39; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&#39; movement on the website, and gathering demographic information.</p><h2${_scopeId}>Cookies and Web Beacons</h2><p${_scopeId}>Like any other website, DashNet uses &#39;cookies&#39;. These cookies are used to store information including visitors&#39; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&#39; experience by customizing our web page content based on visitors&#39; browser type and/or other information.</p><h2${_scopeId}>Google DoubleClick DART Cookie</h2><p${_scopeId}>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL \u2013 <a href="https://policies.google.com/technologies/ads"${_scopeId}>https://policies.google.com/technologies/ads</a></p><h2${_scopeId}>Our Advertising Partners</h2><p${_scopeId}>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p><ul${_scopeId}><li${_scopeId}><p${_scopeId}>Google</p><p${_scopeId}><a href="https://policies.google.com/technologies/ads"${_scopeId}>https://policies.google.com/technologies/ads</a></p></li></ul><h2${_scopeId}>Advertising Partners Privacy Policies</h2>`);
            _push2(ssrRenderComponent(_component_P, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`You may consult this list to find the Privacy Policy for each of the advertising partners of DashNet.`);
                } else {
                  return [
                    createTextVNode("You may consult this list to find the Privacy Policy for each of the advertising partners of DashNet.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on DashNet, which are sent directly to users&#39; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p><p${_scopeId}>Note that DashNet has no access to or control over these cookies that are used by third-party advertisers.</p><h2${_scopeId}>Third Party Privacy Policies</h2><p${_scopeId}>DashNet&#39;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p><p${_scopeId}>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&#39; respective websites.</p><h2${_scopeId}>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2><p${_scopeId}>Under the CCPA, among other rights, California consumers have the right to:</p><p${_scopeId}>Request that a business that collects a consumer&#39;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p><p${_scopeId}>Request that a business delete any personal data about the consumer that a business has collected.</p><p${_scopeId}>Request that a business that sells a consumer&#39;s personal data, not sell the consumer&#39;s personal data.</p><p${_scopeId}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p><h2${_scopeId}>GDPR Data Protection Rights</h2><p${_scopeId}>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p><p${_scopeId}>The right to access \u2013 You have the right to request copies of your personal data. We may charge you a small fee for this service.</p><p${_scopeId}>The right to rectification \u2013 You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p><p${_scopeId}>The right to erasure \u2013 You have the right to request that we erase your personal data, under certain conditions.</p><p${_scopeId}>The right to restrict processing \u2013 You have the right to request that we restrict the processing of your personal data, under certain conditions.</p><p${_scopeId}>The right to object to processing \u2013 You have the right to object to our processing of your personal data, under certain conditions.</p><p${_scopeId}>The right to data portability \u2013 You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p><p${_scopeId}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p><h2${_scopeId}>Children&#39;s Information</h2><p${_scopeId}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p><p${_scopeId}>DashNet does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p></div>`);
          } else {
            return [
              createVNode("div", { class: "y p-4 w-full max-w-none space-y-2 prose prose-neutral dark:prose-gray dark:!prose-invert" }, [
                createVNode("h1", null, "Privacy Policy for DashNet"),
                createVNode("p", null, "At DashNet, accessible from https://gdforums.com & https://profile.gd, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DashNet and how we use it."),
                createVNode("p", null, "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us."),
                createVNode("p", null, [
                  createTextVNode("This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in DashNet. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the "),
                  createVNode("a", { href: "https://postsrc.com/tools/privacy-policy-generator" }, "PostSrc Privacy Policy Generator"),
                  createTextVNode(".")
                ]),
                createVNode("h2", null, "Consent"),
                createVNode("p", null, "By using our website, you hereby consent to our Privacy Policy and agree to its terms."),
                createVNode("h2", null, "Information we collect"),
                createVNode("p", null, "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information."),
                createVNode("p", null, "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."),
                createVNode("p", null, "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number."),
                createVNode("h2", null, "How we use your information"),
                createVNode("p", null, "We use the information we collect in various ways, including to:"),
                createVNode("ul", null, [
                  createVNode("li", null, "Provide, operate, and maintain our website"),
                  createVNode("li", null, "Improve, personalize, and expand our website"),
                  createVNode("li", null, "Understand and analyze how you use our website"),
                  createVNode("li", null, "Develop new products, services, features, and functionality"),
                  createVNode("li", null, "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes"),
                  createVNode("li", null, "Send you emails"),
                  createVNode("li", null, "Find and prevent fraud")
                ]),
                createVNode("h2", null, "Log Files"),
                createVNode("p", null, "DashNet follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."),
                createVNode("h2", null, "Cookies and Web Beacons"),
                createVNode("p", null, "Like any other website, DashNet uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."),
                createVNode("h2", null, "Google DoubleClick DART Cookie"),
                createVNode("p", null, [
                  createTextVNode("Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL \u2013 "),
                  createVNode("a", { href: "https://policies.google.com/technologies/ads" }, "https://policies.google.com/technologies/ads")
                ]),
                createVNode("h2", null, "Our Advertising Partners"),
                createVNode("p", null, "Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below."),
                createVNode("ul", null, [
                  createVNode("li", null, [
                    createVNode("p", null, "Google"),
                    createVNode("p", null, [
                      createVNode("a", { href: "https://policies.google.com/technologies/ads" }, "https://policies.google.com/technologies/ads")
                    ])
                  ])
                ]),
                createVNode("h2", null, "Advertising Partners Privacy Policies"),
                createVNode(_component_P, null, {
                  default: withCtx(() => [
                    createTextVNode("You may consult this list to find the Privacy Policy for each of the advertising partners of DashNet.")
                  ]),
                  _: 1
                }),
                createVNode("p", null, "Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on DashNet, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit."),
                createVNode("p", null, "Note that DashNet has no access to or control over these cookies that are used by third-party advertisers."),
                createVNode("h2", null, "Third Party Privacy Policies"),
                createVNode("p", null, "DashNet's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. "),
                createVNode("p", null, "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites."),
                createVNode("h2", null, "CCPA Privacy Rights (Do Not Sell My Personal Information)"),
                createVNode("p", null, "Under the CCPA, among other rights, California consumers have the right to:"),
                createVNode("p", null, "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers."),
                createVNode("p", null, "Request that a business delete any personal data about the consumer that a business has collected."),
                createVNode("p", null, "Request that a business that sells a consumer's personal data, not sell the consumer's personal data."),
                createVNode("p", null, "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."),
                createVNode("h2", null, "GDPR Data Protection Rights"),
                createVNode("p", null, "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:"),
                createVNode("p", null, "The right to access \u2013 You have the right to request copies of your personal data. We may charge you a small fee for this service."),
                createVNode("p", null, "The right to rectification \u2013 You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete."),
                createVNode("p", null, "The right to erasure \u2013 You have the right to request that we erase your personal data, under certain conditions."),
                createVNode("p", null, "The right to restrict processing \u2013 You have the right to request that we restrict the processing of your personal data, under certain conditions."),
                createVNode("p", null, "The right to object to processing \u2013 You have the right to object to our processing of your personal data, under certain conditions."),
                createVNode("p", null, "The right to data portability \u2013 You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions."),
                createVNode("p", null, "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."),
                createVNode("h2", null, "Children's Information"),
                createVNode("p", null, "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity."),
                createVNode("p", null, "DashNet does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Docs/PrivacyPolicy.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$14
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$13 = {
  __name: "TermsOfService",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Terms of Service" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Terms of Service</span>`);
          } else {
            return [
              createVNode("span", null, "Terms of Service")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y p-4 w-full max-w-none space-y-2 prose prose-neutral dark:prose-gray dark:!prose-invert"${_scopeId}><h1${_scopeId}>Terms of Service</h1><h2${_scopeId}>Agreement to Terms</h2><p${_scopeId}>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (\u201Cyou\u201D) and Bird Cafe (&quot;Company,&quot; \u201Cwe,&quot; \u201Cus,&quot; or \u201Cour\u201D), concerning your access to and use of the https://www.dashlink.net website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the \u201CSite\u201D). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY. Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time. We will alert you about any changes by updating the \u201CLast updated\u201D date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted. The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA). The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.</p><h2${_scopeId}>User Registration</h2><p${_scopeId}>You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p><h2${_scopeId}>Prohibited Activities</h2><p${_scopeId}>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:</p><ul${_scopeId}><li${_scopeId}>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li><li${_scopeId}>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li><li${_scopeId}>Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li><li${_scopeId}>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li><li${_scopeId}>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li><li${_scopeId}>Make improper use of our support services or submit false reports of abuse or misconduct.</li><li${_scopeId}>Use the Site in a manner inconsistent with any applicable laws or regulations.</li><li${_scopeId}>Engage in unauthorized framing of or linking to the Site.</li><li${_scopeId}>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party\u2019s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.</li><li${_scopeId}>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li><li${_scopeId}>Delete the copyright or other proprietary rights notice from any Content.</li><li${_scopeId}>Attempt to impersonate another user or person or use the username of another user.</li><li${_scopeId}>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (\u201Cgifs\u201D), 1\xD71 pixels, web bugs, cookies, or other similar devices (sometimes referred to as \u201Cspyware\u201D or \u201Cpassive collection mechanisms\u201D or \u201Cpcms\u201D).</li><li${_scopeId}>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li><li${_scopeId}>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.</li><li${_scopeId}>Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.</li><li${_scopeId}>Copy or adapt the Site\u2019s software, including but not limited to PHP, HTML, JavaScript, or other code.</li><li${_scopeId}>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.</li><li${_scopeId}>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li><li${_scopeId}>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li><li${_scopeId}>Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li></ul><h2${_scopeId}>Third Party Website and Content</h2><p${_scopeId}>The Site may contain (or you may be sent via the Site) links to other websites (&quot;Third-Party Websites&quot;) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (&quot;Third-Party Content&quot;). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site or relating to any applications you use or install from the Site. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.</p><h2${_scopeId}>Site Management</h2><p${_scopeId}>We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.</p><h2${_scopeId}>Privacy Policy</h2><p${_scopeId}>We care about data privacy and security. Please review our Privacy Policy: https://www.dashlink.net/help/privacy. By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. Please be advised the Site is hosted in the United States. If you access the Site from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Site, you are transferring your data to the United States, and you agree to have your data transferred to and processed in the United States. Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children\u2019s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Site as quickly as is reasonably practical.</p><h2${_scopeId}>Modifications and Interruptions</h2><p${_scopeId}>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site. We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.</p><h2${_scopeId}>Term and Termination</h2><p${_scopeId}>These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION. If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p><h2${_scopeId}>Governing Law</h2><p${_scopeId}> These Terms of Use and your use of the Site are governed by and construed in accordance with the laws of the State of Illinois applicable to agreements made and to be entirely performed within the State of Illinois, without regard to its conflict of law principles.</p><h2${_scopeId}>Corrections</h2><p${_scopeId}>There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including but not limited to descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.</p><h2${_scopeId}>Indemnification</h2><p${_scopeId}>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys\u2019 fees and expenses, made by any third party due to or arising out of: (1) use of the Site; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Site with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p><h2${_scopeId}>Disclaimer</h2><p${_scopeId}>THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE\u2019S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p><h2${_scopeId}>Liability</h2><p${_scopeId}>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. </p><h2${_scopeId}>User Data</h2><p${_scopeId}>We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p><h2${_scopeId}>Communications</h2><p${_scopeId}>Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.</p><h2${_scopeId}>Miscellaneous</h2><p${_scopeId}>These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.</p></div>`);
          } else {
            return [
              createVNode("div", { class: "y p-4 w-full max-w-none space-y-2 prose prose-neutral dark:prose-gray dark:!prose-invert" }, [
                createVNode("h1", null, "Terms of Service"),
                createVNode("h2", null, "Agreement to Terms"),
                createVNode("p", null, 'These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (\u201Cyou\u201D) and Bird Cafe ("Company," \u201Cwe," \u201Cus," or \u201Cour\u201D), concerning your access to and use of the https://www.dashlink.net website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the \u201CSite\u201D). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY. Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time. We will alert you about any changes by updating the \u201CLast updated\u201D date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted. The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA). The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.'),
                createVNode("h2", null, "User Registration"),
                createVNode("p", null, "You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable."),
                createVNode("h2", null, "Prohibited Activities"),
                createVNode("p", null, "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:"),
                createVNode("ul", null, [
                  createVNode("li", null, "Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us."),
                  createVNode("li", null, "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords."),
                  createVNode("li", null, "Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein."),
                  createVNode("li", null, "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site."),
                  createVNode("li", null, "Use any information obtained from the Site in order to harass, abuse, or harm another person."),
                  createVNode("li", null, "Make improper use of our support services or submit false reports of abuse or misconduct."),
                  createVNode("li", null, "Use the Site in a manner inconsistent with any applicable laws or regulations."),
                  createVNode("li", null, "Engage in unauthorized framing of or linking to the Site."),
                  createVNode("li", null, "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party\u2019s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site."),
                  createVNode("li", null, "Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools."),
                  createVNode("li", null, "Delete the copyright or other proprietary rights notice from any Content."),
                  createVNode("li", null, "Attempt to impersonate another user or person or use the username of another user."),
                  createVNode("li", null, "Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (\u201Cgifs\u201D), 1\xD71 pixels, web bugs, cookies, or other similar devices (sometimes referred to as \u201Cspyware\u201D or \u201Cpassive collection mechanisms\u201D or \u201Cpcms\u201D)."),
                  createVNode("li", null, "Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site."),
                  createVNode("li", null, "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you."),
                  createVNode("li", null, "Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site."),
                  createVNode("li", null, "Copy or adapt the Site\u2019s software, including but not limited to PHP, HTML, JavaScript, or other code."),
                  createVNode("li", null, "Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site."),
                  createVNode("li", null, "Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software."),
                  createVNode("li", null, "Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses."),
                  createVNode("li", null, "Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.")
                ]),
                createVNode("h2", null, "Third Party Website and Content"),
                createVNode("p", null, 'The Site may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site or relating to any applications you use or install from the Site. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.'),
                createVNode("h2", null, "Site Management"),
                createVNode("p", null, "We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site."),
                createVNode("h2", null, "Privacy Policy"),
                createVNode("p", null, "We care about data privacy and security. Please review our Privacy Policy: https://www.dashlink.net/help/privacy. By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. Please be advised the Site is hosted in the United States. If you access the Site from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Site, you are transferring your data to the United States, and you agree to have your data transferred to and processed in the United States. Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children\u2019s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Site as quickly as is reasonably practical."),
                createVNode("h2", null, "Modifications and Interruptions"),
                createVNode("p", null, "We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site. We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith."),
                createVNode("h2", null, "Term and Termination"),
                createVNode("p", null, "These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION. If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress."),
                createVNode("h2", null, "Governing Law"),
                createVNode("p", null, " These Terms of Use and your use of the Site are governed by and construed in accordance with the laws of the State of Illinois applicable to agreements made and to be entirely performed within the State of Illinois, without regard to its conflict of law principles."),
                createVNode("h2", null, "Corrections"),
                createVNode("p", null, "There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including but not limited to descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice."),
                createVNode("h2", null, "Indemnification"),
                createVNode("p", null, "You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys\u2019 fees and expenses, made by any third party due to or arising out of: (1) use of the Site; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Site with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it."),
                createVNode("h2", null, "Disclaimer"),
                createVNode("p", null, "THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE\u2019S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE."),
                createVNode("h2", null, "Liability"),
                createVNode("p", null, "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. "),
                createVNode("h2", null, "User Data"),
                createVNode("p", null, "We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data."),
                createVNode("h2", null, "Communications"),
                createVNode("p", null, "Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means."),
                createVNode("h2", null, "Miscellaneous"),
                createVNode("p", null, "These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Docs/TermsOfService.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$13
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$12 = {
  __name: "Forge",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Forge" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Forge</span>`);
          } else {
            return [
              createVNode("span", null, "Forge")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 md:w-3/4"${_scopeId}><div class="space-y-2"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Forge</h2><div class="pane"${_scopeId}><p${_scopeId}>wip coming soon [UPCOMING TOP 1]</p></div></div></div><div class="y space-y-2 md:w-1/4"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>More</h2><div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50"${_scopeId}> Join us on Discord </div>`);
            _push2(ssrRenderComponent(_sfc_main$1c, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 md:w-3/4" }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Forge"),
                  createVNode("div", { class: "pane" }, [
                    createVNode("p", null, "wip coming soon [UPCOMING TOP 1]")
                  ])
                ])
              ]),
              createVNode("div", { class: "y space-y-2 md:w-1/4" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "More"),
                createVNode("div", { class: "rounded bg-[#5865F2] px-4 py-2 text-neutral-50" }, " Join us on Discord "),
                createVNode(_sfc_main$1c)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Forge.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$12
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$11 = {
  __name: "Timestamp",
  __ssrInlineRender: true,
  props: {
    time: [String, Number],
    length: Boolean
  },
  setup(__props) {
    const props = __props;
    const MONTH_NAMES = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const getFormattedDate = (date, prefomattedDate = false, hideYear = false) => {
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (prefomattedDate) {
        return `${prefomattedDate} at ${hours}:${minutes}`;
      }
      if (hideYear) {
        return `${day}, ${month} at ${hours}:${minutes}`;
      }
      return `${day}, ${month} ${year}, at ${hours}:${minutes}`;
    };
    const timeAgo = (dateParam) => {
      if (!dateParam) {
        return null;
      }
      const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
      const DAY_IN_MS = 864e5;
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      const seconds = Math.round((today - date) / 1e3);
      const minutes = Math.round(seconds / 60);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();
      if (seconds < 5) {
        return "now";
      } else if (seconds < 60) {
        return `${seconds} seconds ago`;
      } else if (seconds < 90) {
        return "about a minute ago";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (isToday) {
        return getFormattedDate(date, "Today,");
      } else if (isYesterday) {
        return getFormattedDate(date, "Yesterday,");
      } else if (isThisYear) {
        return getFormattedDate(date, false, true);
      }
      return getFormattedDate(date);
    };
    const timeLength = (seconds) => {
      if (!seconds) {
        return "none";
      }
      let time = "";
      const years = Math.floor(seconds / 22896e3);
      seconds -= years * 22896e3;
      const months = Math.floor(seconds / 2592e3);
      seconds -= months * 2592e3;
      const days = Math.floor(seconds / 86400);
      seconds -= days * 86400;
      const hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      const minutes = Math.floor(seconds / 60);
      if (years > 0) {
        time += years + " year" + (years > 1 ? "s" : "") + ", ";
      }
      if (months > 0) {
        time += months + " month" + (months > 1 ? "s" : "") + ", ";
      }
      if (days > 0) {
        time += days + " day" + (days > 1 ? "s" : "");
      }
      if (hours > 0 && years === 0) {
        if (days > 0) {
          time += ", ";
        }
        time += hours + " hour" + (hours > 1 ? "s" : "");
      }
      if (minutes > 0 && months === 0) {
        if (days > 0 || hours > 0) {
          time += ", ";
        }
        time += minutes + " minute" + (minutes > 1 ? "s" : "");
      }
      return time;
    };
    const result = ref(null);
    onBeforeMount(() => {
      result.value = props.length ? timeLength(props.time) : timeAgo(props.time);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.length) {
        _push(`<!--[-->${ssrInterpolate(result.value)}<!--]-->`);
      } else {
        _push(ssrRenderComponent(_sfc_main$1F, mergeProps({
          class: "select-none inline-block",
          message: __props.time
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(result.value)}`);
            } else {
              return [
                createTextVNode(toDisplayString(result.value), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Timestamp.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _sfc_main$10 = {
  __name: "Username",
  __ssrInlineRender: true,
  props: {
    user: Object,
    href: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Link$1), mergeProps({
        href: (_a = __props.href) != null ? _a : unref(route$1)("users.show", __props.user.id),
        class: "transition-colors text-neutral-900 dark:text-ui-200 break-all"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.user.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.user.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Username.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const _sfc_main$$ = {
  __name: "ForumTicket",
  __ssrInlineRender: true,
  props: {
    forum: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "x overflow-clip items-stretch items-center rounded-lg bg-opacity-60 bg-white dark:bg-ui-900 shadow transition hover:shadow-lg hover:bg-opacity-75 dark:hover:bg-opacity-75 gap-4 px-4" }, _attrs))}><div class="x space-x-4 grow"><div class="x items-center my-4"><div class="transition-colors bg-neutral-200 dark:bg-ui-800 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path></svg></div></div>`);
      _push(ssrRenderComponent(unref(Link$1), {
        href: _ctx.route("forums.show", __props.forum.slug),
        class: "y justify-center py-2 grow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg"${_scopeId}>${ssrInterpolate(__props.forum.name)}</h2><p class="text-sm"${_scopeId}>${ssrInterpolate(__props.forum.description)}</p>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg" }, toDisplayString(__props.forum.name), 1),
              createVNode("p", { class: "text-sm" }, toDisplayString(__props.forum.description), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="x items-center text-center gap-2"><div class="y"><h2>${ssrInterpolate(__props.forum.posts_count)}</h2><p class="text-xs">Posts</p></div><div class="y"><h2>${ssrInterpolate(__props.forum.threads_count)}</h2><p class="text-xs">Threads</p></div></div></div><div class="hidden md:block py-3 rounded border-r border-r-neutral-300 self-center"></div><div class="hidden md:flex justify-between space-x-2 mr-4 w-1/4 shrink-0">`);
      if (__props.forum.last_post) {
        _push(`<div class="y justify-center">`);
        _push(ssrRenderComponent(unref(Link$1), {
          href: _ctx.route("threads.show", __props.forum.last_post.thread),
          class: "z-10 font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.forum.last_post.thread.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.forum.last_post.thread.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="text-xs">`);
        _push(ssrRenderComponent(_sfc_main$10, {
          user: __props.forum.last_post.author
        }, null, _parent));
        _push(` \u2022 `);
        _push(ssrRenderComponent(_sfc_main$11, {
          time: __props.forum.last_post.created_at
        }, null, _parent));
        _push(`</span></div>`);
      } else {
        _push(`<div class="y justify-center"><span class="z-10 font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis opacity-50">No posts</span></div>`);
      }
      _push(`<div class="!hidden x items-center shrink-0">`);
      if (__props.forum.last_post) {
        _push(ssrRenderComponent(_sfc_main$1D, {
          class: "w-10",
          user: __props.forum.last_post.author
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ForumTicket.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = {
  __name: "DiscordInvite",
  __ssrInlineRender: true,
  props: {
    code: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: `https://discord.gg/${__props.code}`,
        target: "_blank",
        class: "x group justify-between items-center rounded-lg px-6 py-4 bg-[#5865F2] text-white"
      }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" width="163.84" height="32" viewBox="0 0 512 100"><path fill="white" d="M82.003 0a104.229 104.229 0 0 1 26.402 8.297c14.484 21.63 21.68 46.025 19.023 74.163c-11.082 8.286-21.831 13.313-32.4 16.603a80.176 80.176 0 0 1-6.935-11.421a68.02 68.02 0 0 0 10.94-5.326a65.816 65.816 0 0 1-2.677-2.118c-20.805 9.85-43.684 9.85-64.74 0c-.866.73-1.762 1.44-2.678 2.118a68.192 68.192 0 0 0 10.921 5.315a80.53 80.53 0 0 1-6.935 11.422C22.365 95.763 11.626 90.736.544 82.46C-1.722 58.188 2.807 33.566 19.516 8.317A103.882 103.882 0 0 1 45.939 0c1.147 2.056 2.506 4.822 3.422 7.022c9.663-1.48 19.416-1.48 29.26 0A77.412 77.412 0 0 1 82.003 0Zm253.933 31.687c7.045 0 12.893 1.51 17.544 4.533v13.17c-1.64-1.152-3.554-2.087-5.738-2.807c-2.184-.72-4.52-1.08-7.016-1.08c-4.368 0-7.78.813-10.246 2.447c-2.467 1.635-3.703 3.763-3.703 6.405c0 2.59 1.196 4.709 3.592 6.374c2.397 1.655 5.868 2.488 10.428 2.488c2.345 0 4.66-.35 6.945-1.038c2.275-.7 4.238-1.553 5.878-2.56v12.737c-5.163 3.167-11.152 4.75-17.967 4.75c-5.736-.02-10.629-1.028-14.665-3.043c-4.035-2.015-7.086-4.75-9.119-8.204c-2.033-3.454-3.06-7.34-3.06-11.658s1.057-8.183 3.17-11.586c2.114-3.403 5.214-6.076 9.302-8.02c4.085-1.942 8.967-2.908 14.655-2.908Zm-52.917-.01c3.945 0 7.559.431 10.852 1.295c3.29.864 6.008 1.964 8.173 3.31v11.299c-2.216-1.347-4.753-2.406-7.65-3.208a33.572 33.572 0 0 0-8.92-1.182c-4.418 0-6.621.77-6.621 2.303c0 .72.342 1.254 1.026 1.614c.684.36 1.942.73 3.764 1.12l7.045 1.296c4.602.812 8.033 2.24 10.287 4.276c2.256 2.036 3.382 5.048 3.382 9.037c0 4.37-1.86 7.834-5.596 10.404c-3.734 2.57-9.029 3.855-15.893 3.855c-4.037-.01-7.96-.514-11.766-1.522c-3.805-1.007-7.238-2.467-10.287-4.39V59.24c2.305 1.82 5.395 3.32 9.27 4.503c3.875 1.172 7.62 1.758 11.243 1.758c1.69 0 2.97-.227 3.835-.679c.866-.452 1.3-.997 1.3-1.624c0-.72-.232-1.316-.706-1.8c-.473-.483-1.39-.884-2.747-1.223l-8.455-1.943c-4.842-1.151-8.275-2.745-10.317-4.79c-2.044-2.036-3.061-4.709-3.061-8.02c0-2.785.886-5.201 2.678-7.268c1.781-2.066 4.318-3.66 7.609-4.78c3.292-1.13 7.136-1.696 11.555-1.696ZM512 23.833v51.813h-17.263V66.22c-1.46 3.547-3.674 6.25-6.653 8.101c-2.98 1.84-6.664 2.766-11.032 2.766c-3.905 0-7.306-.967-10.217-2.91c-2.908-1.943-5.152-4.605-6.732-7.988c-1.57-3.382-2.367-7.206-2.367-11.483c-.05-4.41.786-8.368 2.507-11.874c1.712-3.506 4.136-6.24 7.257-8.204c3.12-1.963 6.684-2.95 10.68-2.95c8.082 0 13.548 3.524 16.408 10.564l.148.373V23.833H512Zm-126.533 7.833c5.587 0 10.407.956 14.444 2.879c4.036 1.922 7.117 4.554 9.23 7.916c2.115 3.362 3.17 7.217 3.17 11.586c0 4.318-1.055 8.225-3.17 11.73c-2.113 3.506-5.204 6.26-9.27 8.276c-4.067 2.015-8.868 3.022-14.413 3.022c-5.547 0-10.348-.997-14.404-3.012c-4.067-2.015-7.166-4.77-9.301-8.276c-2.133-3.505-3.21-7.412-3.21-11.73c0-4.317 1.066-8.173 3.21-11.555c2.143-3.382 5.224-6.035 9.27-7.957c4.036-1.923 8.858-2.879 14.444-2.879Zm-132.36 11.802v32.404h-17.21V43.468c5.273 2.323 11.816 2.426 17.21 0Zm195.128-10.856c2.486 0 4.62.576 6.412 1.727v15.544c-1.791-1.203-4.107-1.799-6.975-1.799c-3.756 0-6.654 1.162-8.668 3.485c-2.022 2.324-3.03 5.942-3.03 10.836v13.241h-17.261V33.548h16.91v13.385c.936-4.894 2.457-8.502 4.55-10.836c2.084-2.323 4.78-3.485 8.062-3.485Zm-248.79-7.34c6.624 0 12.22 1.059 16.81 3.166c4.58 2.108 8.013 5.048 10.288 8.81c2.273 3.763 3.42 8.07 3.42 12.923c0 4.75-1.187 9.057-3.562 12.912c-2.376 3.866-5.99 6.92-10.85 9.17c-4.861 2.252-10.882 3.383-18.078 3.383h-25.506V25.272h27.478ZM42.728 41.348c-6.432 0-11.505 5.912-11.505 13.098c0 7.186 5.184 13.087 11.505 13.087c6.432 0 11.515-5.901 11.505-13.087c.11-7.197-5.073-13.098-11.505-13.098Zm42.516 0c-6.432 0-11.505 5.912-11.505 13.098c0 7.186 5.184 13.087 11.505 13.087c6.432 0 11.505-5.901 11.505-13.087c.11-7.197-5.073-13.098-11.505-13.098Zm300.214 3.58c-3.01 0-5.366.853-7.087 2.56c-1.71 1.707-2.567 3.989-2.567 6.868c0 2.878.856 5.191 2.567 6.939c1.712 1.748 4.076 2.632 7.087 2.632c2.957-.01 5.294-.884 7.004-2.632c1.713-1.748 2.577-4.06 2.577-6.94c0-2.878-.856-5.17-2.577-6.867c-1.71-1.707-4.047-2.56-7.004-2.56Zm99.767.216c-2.909 0-5.233.853-6.975 2.56s-2.607 3.917-2.607 6.652c0 2.734.865 4.965 2.607 6.692c1.742 1.727 4.037 2.59 6.905 2.59c2.908-.01 5.243-.883 7.006-2.63c1.762-1.749 2.637-4.02 2.637-6.796c0-2.684-.856-4.873-2.567-6.55c-1.712-1.675-4.057-2.518-7.006-2.518Zm-287.038-7.063h-8.596v24.756h7.6c4.46 0 7.892-1.141 10.287-3.413c2.396-2.283 3.594-5.387 3.594-9.325c0-3.65-1.068-6.559-3.201-8.738c-2.134-2.18-5.365-3.28-9.684-3.28ZM244.51 22.24c4.752 0 8.606 3.534 8.606 7.895c0 4.36-3.854 7.896-8.606 7.896c-4.754 0-8.607-3.535-8.607-7.896c0-4.36 3.853-7.895 8.607-7.895Z"></path></svg><div class="x space-x-[0rem] transition-transform group-hover:translate-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-transform transition-opacity opacity-0 group-hover:translate-x-4 group-hover:opacity-100"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg></div></a>`);
    };
  }
};
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DiscordInvite.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _sfc_main$Z = {
  __name: "Forums",
  __ssrInlineRender: true,
  props: {
    forums: Array,
    latestPosts: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.props.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.$page.props.url
              }, {
                default: withCtx(() => [
                  createTextVNode("Forums")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 md:w-3/4"${_scopeId}>`);
            if (__props.forums.length === 0) {
              _push2(`<div${_scopeId}><p class="pane"${_scopeId}>No Fooms Have Been Created :(</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.forums, (forum) => {
              _push2(`<div class="flex-col space-y-2"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>${ssrInterpolate(forum.name)}</h2><!--[-->`);
              ssrRenderList(forum.children, (subforum) => {
                _push2(ssrRenderComponent(_sfc_main$$, { forum: subforum }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            });
            _push2(`<!--]--></div><div class="y space-y-2 md:w-1/4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>More</h2>`);
            _push2(ssrRenderComponent(_sfc_main$_, { code: "bWt5aks8jb" }, null, _parent2, _scopeId));
            _push2(`<h2 class="mx-2 font-bold text-2xl"${_scopeId}>Latest Activity</h2><div class="pane !p-0 divide-y divide-neutral-700 dark:divide-ui-700"${_scopeId}>`);
            if (__props.latestPosts.length === 0) {
              _push2(`<div class="px-4 py-2"${_scopeId}>No activity</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.latestPosts, (post) => {
              _push2(`<div class="y px-4 py-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("threads.show", post.thread),
                class: "z-10 font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(post.thread.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(post.thread.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<span class="z-10 text-xs"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$10, {
                user: post.author
              }, null, _parent2, _scopeId));
              _push2(` \u2022 `);
              _push2(ssrRenderComponent(_sfc_main$11, {
                time: post.created_at
              }, null, _parent2, _scopeId));
              _push2(`</span></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 md:w-3/4" }, [
                __props.forums.length === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "pane" }, "No Fooms Have Been Created :(")
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.forums, (forum) => {
                  return openBlock(), createBlock("div", { class: "flex-col space-y-2" }, [
                    createVNode("h2", { class: "mx-2 font-bold text-2xl" }, toDisplayString(forum.name), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(forum.children, (subforum) => {
                      return openBlock(), createBlock(_sfc_main$$, { forum: subforum }, null, 8, ["forum"]);
                    }), 256))
                  ]);
                }), 256))
              ]),
              createVNode("div", { class: "y space-y-2 md:w-1/4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "More"),
                createVNode(_sfc_main$_, { code: "bWt5aks8jb" }),
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Latest Activity"),
                createVNode("div", { class: "pane !p-0 divide-y divide-neutral-700 dark:divide-ui-700" }, [
                  __props.latestPosts.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-4 py-2"
                  }, "No activity")) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.latestPosts, (post) => {
                    return openBlock(), createBlock("div", { class: "y px-4 py-3" }, [
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("threads.show", post.thread),
                        class: "z-10 font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(post.thread.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]),
                      createVNode("span", { class: "z-10 text-xs" }, [
                        createVNode(_sfc_main$10, {
                          user: post.author
                        }, null, 8, ["user"]),
                        createTextVNode(" \u2022 "),
                        createVNode(_sfc_main$11, {
                          time: post.created_at
                        }, null, 8, ["time"])
                      ])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Forums.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Y = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    forum: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Forums" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("forums.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(__props.forum.name)}</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("forums.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Forums")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, toDisplayString(__props.forum.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y w-full space-y-2"${_scopeId}><div${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>${ssrInterpolate(__props.forum.name)}</h2><p class="text-sm mx-2"${_scopeId}>${ssrInterpolate(__props.forum.description)}</p></div><div class="flex justify-between"${_scopeId}><div class="w-full"${_scopeId}></div>`);
            if (_ctx.$page.props.auth) {
              _push2(`<div class="w-full flex justify-end"${_scopeId}>`);
              if (!__props.forum.group_id || __props.forum.group_id === _ctx.$page.props.user.primary_group_id) {
                _push2(ssrRenderComponent(unref(Link$1), {
                  href: unref(route$1)("threads.create") + "?fid=" + __props.forum.id,
                  class: "button"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Create Thread`);
                    } else {
                      return [
                        createTextVNode("Create Thread")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!--[-->`);
            ssrRenderList(__props.forum.children, (subforum) => {
              _push2(`<div class="flex-col space-y-2"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>${ssrInterpolate(subforum.name)}</h2></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.forum.threads.length === 0) {
              _push2(`<div${_scopeId}><span${_scopeId}>no threads ;(</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.forum.threads, (thread) => {
              _push2(`<div class="x items-center justify-between pane"${_scopeId}><div class="x items-center gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                class: "w-8",
                user: thread.author
              }, null, _parent2, _scopeId));
              _push2(`<div class="y"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("threads.show", thread),
                class: "font-bold text-lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(thread.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(thread.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<span class="text-xs text-neutral-500 dark:text-ui-400"${_scopeId}>By `);
              _push2(ssrRenderComponent(_sfc_main$10, {
                user: thread.author
              }, null, _parent2, _scopeId));
              _push2(`, ${ssrInterpolate(new Date(thread.created_at).toISOString().replace("T", ", ").replace(".000Z", ""))}</span></div></div><div class="x items-center gap-4"${_scopeId}><div class="y text-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(thread.views)}</span><span class="text-xs uppercase"${_scopeId}>VIEWS</span></div><div class="y text-center"${_scopeId}><span${_scopeId}>${ssrInterpolate(Math.max(thread.posts_count - 1, 0))}</span><span class="text-xs uppercase"${_scopeId}>REPLIES</span></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "y w-full space-y-2" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, toDisplayString(__props.forum.name), 1),
                  createVNode("p", { class: "text-sm mx-2" }, toDisplayString(__props.forum.description), 1)
                ]),
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("div", { class: "w-full" }),
                  _ctx.$page.props.auth ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-full flex justify-end"
                  }, [
                    !__props.forum.group_id || __props.forum.group_id === _ctx.$page.props.user.primary_group_id ? (openBlock(), createBlock(unref(Link$1), {
                      key: 0,
                      href: unref(route$1)("threads.create") + "?fid=" + __props.forum.id,
                      class: "button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Create Thread")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.forum.children, (subforum) => {
                  return openBlock(), createBlock("div", { class: "flex-col space-y-2" }, [
                    createVNode("h2", { class: "font-bold text-2xl" }, toDisplayString(subforum.name), 1)
                  ]);
                }), 256)),
                __props.forum.threads.length === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("span", null, "no threads ;(")
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.forum.threads, (thread) => {
                  return openBlock(), createBlock("div", { class: "x items-center justify-between pane" }, [
                    createVNode("div", { class: "x items-center gap-4" }, [
                      createVNode(_sfc_main$1D, {
                        class: "w-8",
                        user: thread.author
                      }, null, 8, ["user"]),
                      createVNode("div", { class: "y" }, [
                        createVNode(unref(Link$1), {
                          href: unref(route$1)("threads.show", thread),
                          class: "font-bold text-lg"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(thread.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("span", { class: "text-xs text-neutral-500 dark:text-ui-400" }, [
                          createTextVNode("By "),
                          createVNode(_sfc_main$10, {
                            user: thread.author
                          }, null, 8, ["user"]),
                          createTextVNode(", " + toDisplayString(new Date(thread.created_at).toISOString().replace("T", ", ").replace(".000Z", "")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "x items-center gap-4" }, [
                      createVNode("div", { class: "y text-center" }, [
                        createVNode("span", null, toDisplayString(thread.views), 1),
                        createVNode("span", { class: "text-xs uppercase" }, "VIEWS")
                      ]),
                      createVNode("div", { class: "y text-center" }, [
                        createVNode("span", null, toDisplayString(Math.max(thread.posts_count - 1, 0)), 1),
                        createVNode("span", { class: "text-xs uppercase" }, "REPLIES")
                      ])
                    ])
                  ]);
                }), 256))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Forums/Show.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$X = {
  __name: "PatreonGoal",
  __ssrInlineRender: true,
  setup(__props) {
    const goal = useStatisticsStore().patreon;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "y text-sm rounded overflow-clip shadow" }, _attrs))}><div class="x transition-colors justify-between px-2 py-2 bg-white dark:bg-ui-900"><a class="font-bold px-2 text-neutral-100 rounded-full" style="${ssrRenderStyle({ "background-color": "#FF424D" })}" href="https://patreon.com/hyperbolus" target="_blank">Patreon</a><span>Monthly Funding Goal</span></div>`);
      if (unref(goal)) {
        _push(`<div class="px-2 transition-colors py-1 bg-white dark:bg-ui-900"><div class="transition-colors bg-white px-1 dark:bg-ui-800 text-center font-bold text-lg py-1 rounded-full w-full"><div class="${ssrRenderClass([unref(goal).completed_percentage >= 100 ? "bg-amber-50 shadow-[0_0px_6px_4px_rgba(200,120,40,0.75)]" : "bg-cyan-400", "text-center font-bold text-lg py-1 px-1 rounded-full"])}" style="${ssrRenderStyle(`width: ${Math.min(unref(goal).completed_percentage, 100)}%;`)}"></div></div><div class="px-2 py-1 x text-xs justify-between"><span>${ssrInterpolate(unref(goal).completed_percentage)}%</span><span>$${ssrInterpolate((unref(goal).amount_cents / 100 * (unref(goal).completed_percentage / 100)).toFixed(2))} of $${ssrInterpolate(unref(goal).amount_cents / 100)} per month</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass([{ "text-red-500": !unref(goal) }, "px-2 py-1 transition-colors x bg-white dark:bg-ui-900"])}">${ssrInterpolate(unref(goal).description)}</p></div>`);
    };
  }
};
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PatreonGoal.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const hyper1 = "/build/assets/sd2_girl_base.2186cb6a.png";
const hyper2 = "/build/assets/sd2_girl_mask.017bac9e.png";
const _sfc_main$W = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("home")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Home`);
                } else {
                  return [
                    createTextVNode("Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("home")
              }, {
                default: withCtx(() => [
                  createTextVNode("Home")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 md:w-3/4"${_scopeId}><div class="space-y-2"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Home</h2><div class="x items-center !hidden"${_scopeId}><div class="shadow z-20 bg-gradient-to-t from-black to-neutral-900 rounded-l px-4 py-1 w-fit"${_scopeId}>Message</div><div class="z-10 bg-gradient-to-t from-black to-neutral-900 -skew-x-[45deg] border-r-[2px] border-r-red-500 w-12 py-1 -ml-4 h-full bg-black"${_scopeId}>\u200B</div><div class="shadow rounded -skew-x-[45deg] border-r-[8px] border-r-red-500 w-8 py-1 -ml-4 h-full bg-black"${_scopeId}>\u200B</div></div><div class="pane"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>About</h2><p${_scopeId}>Hyperdodger is currently in beta. Join our Discord to suggest new features, give feedback, and get help!</p><a class="underline" href="https://trello.com/b/JJOVCmbF/gdc" target="_blank"${_scopeId}>Click here to visit our Trello</a></div><div class="relative"${_scopeId}><img class="w-64"${ssrRenderAttr("src", unref(hyper1))}${_scopeId}><img class="absolute top-0 left-0 rotate-hue w-64"${ssrRenderAttr("src", unref(hyper2))}${_scopeId}></div><div class="hidden glass pt-2 overflow-clip"${_scopeId}><h2 class="font-bold text-xl mx-4 mb-2"${_scopeId}>Shoutbox</h2><div class="y transition-colors bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60 h-64 overflow-y-auto text-sm divide-y divide-neutral-200 dark:divide-neutral-700"${_scopeId}><span class="px-2 py-1"${_scopeId}>Chatter 1: hello!</span><span class="px-2 py-1 transition-colors"${_scopeId}>Chatter 2: hi!</span><span class="px-2 py-1 transition-colors"${_scopeId}>Chatter 192: hey!</span></div><input class="w-full transition-colors bg-neutral-200 dark:bg-neutral-900 outline-0 border-none focus:ring-0 placeholder-neutral-600 dark:placeholder-neutral-600" placeholder="Type your message..." type="text"${_scopeId}></div><div class="pane"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Special Thanks</h2><ul class="list-inside list-disc"${_scopeId}><li${_scopeId}>Cvolton for help regarding interacting with gd servers</li><li${_scopeId}>GD Colon for all of his awesome work with gd on web</li><li${_scopeId}>matcool for replay conversion code</li><li${_scopeId}>matcool again &amp; npesta for inspiring roulette game</li><li${_scopeId}>dogotrigger for providing a large cache of levels for research</li><li${_scopeId}>Geometry Dash Programming Discord</li><li${_scopeId}>Country flags by freakflags</li><li${_scopeId}>Durianhead for his amazing profile banner artwork (<a class="underline" href="https://twitter.com/real_durianhead/status/1462436726496890881?s=20"${_scopeId}>source</a>)</li><li${_scopeId}>Users like you, thank you!</li></ul></div></div></div><div class="y space-y-2 md:w-1/4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>More</h2>`);
            _push2(ssrRenderComponent(_sfc_main$_, { code: "bWt5aks8jb" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, null, null, _parent2, _scopeId));
            _push2(`<h2 class="mx-2 font-bold text-2xl"${_scopeId}>Staff</h2><div class="pane"${_scopeId}><ul class="list-inside list-disc"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("users.show", 0)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`System`);
                } else {
                  return [
                    createTextVNode("System")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("users.show", 1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Admin`);
                } else {
                  return [
                    createTextVNode("Admin")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>You?</li></ul></div>`);
            _push2(ssrRenderComponent(_sfc_main$1c, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 md:w-3/4" }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Home"),
                  createVNode("div", { class: "x items-center !hidden" }, [
                    createVNode("div", { class: "shadow z-20 bg-gradient-to-t from-black to-neutral-900 rounded-l px-4 py-1 w-fit" }, "Message"),
                    createVNode("div", { class: "z-10 bg-gradient-to-t from-black to-neutral-900 -skew-x-[45deg] border-r-[2px] border-r-red-500 w-12 py-1 -ml-4 h-full bg-black" }, "\u200B"),
                    createVNode("div", { class: "shadow rounded -skew-x-[45deg] border-r-[8px] border-r-red-500 w-8 py-1 -ml-4 h-full bg-black" }, "\u200B")
                  ]),
                  createVNode("div", { class: "pane" }, [
                    createVNode("h2", { class: "font-bold text-xl" }, "About"),
                    createVNode("p", null, "Hyperdodger is currently in beta. Join our Discord to suggest new features, give feedback, and get help!"),
                    createVNode("a", {
                      class: "underline",
                      href: "https://trello.com/b/JJOVCmbF/gdc",
                      target: "_blank"
                    }, "Click here to visit our Trello")
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode("img", {
                      class: "w-64",
                      src: unref(hyper1)
                    }, null, 8, ["src"]),
                    createVNode("img", {
                      class: "absolute top-0 left-0 rotate-hue w-64",
                      src: unref(hyper2)
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "hidden glass pt-2 overflow-clip" }, [
                    createVNode("h2", { class: "font-bold text-xl mx-4 mb-2" }, "Shoutbox"),
                    createVNode("div", { class: "y transition-colors bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60 h-64 overflow-y-auto text-sm divide-y divide-neutral-200 dark:divide-neutral-700" }, [
                      createVNode("span", { class: "px-2 py-1" }, "Chatter 1: hello!"),
                      createVNode("span", { class: "px-2 py-1 transition-colors" }, "Chatter 2: hi!"),
                      createVNode("span", { class: "px-2 py-1 transition-colors" }, "Chatter 192: hey!")
                    ]),
                    createVNode("input", {
                      class: "w-full transition-colors bg-neutral-200 dark:bg-neutral-900 outline-0 border-none focus:ring-0 placeholder-neutral-600 dark:placeholder-neutral-600",
                      placeholder: "Type your message...",
                      type: "text"
                    })
                  ]),
                  createVNode("div", { class: "pane" }, [
                    createVNode("h2", { class: "font-bold text-xl" }, "Special Thanks"),
                    createVNode("ul", { class: "list-inside list-disc" }, [
                      createVNode("li", null, "Cvolton for help regarding interacting with gd servers"),
                      createVNode("li", null, "GD Colon for all of his awesome work with gd on web"),
                      createVNode("li", null, "matcool for replay conversion code"),
                      createVNode("li", null, "matcool again & npesta for inspiring roulette game"),
                      createVNode("li", null, "dogotrigger for providing a large cache of levels for research"),
                      createVNode("li", null, "Geometry Dash Programming Discord"),
                      createVNode("li", null, "Country flags by freakflags"),
                      createVNode("li", null, [
                        createTextVNode("Durianhead for his amazing profile banner artwork ("),
                        createVNode("a", {
                          class: "underline",
                          href: "https://twitter.com/real_durianhead/status/1462436726496890881?s=20"
                        }, "source"),
                        createTextVNode(")")
                      ]),
                      createVNode("li", null, "Users like you, thank you!")
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "y space-y-2 md:w-1/4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "More"),
                createVNode(_sfc_main$_, { code: "bWt5aks8jb" }),
                createVNode(_sfc_main$X),
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Staff"),
                createVNode("div", { class: "pane" }, [
                  createVNode("ul", { class: "list-inside list-disc" }, [
                    createVNode("li", null, [
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("users.show", 0)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("System")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("li", null, [
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("users.show", 1)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Admin")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("li", null, "You?")
                  ])
                ]),
                createVNode(_sfc_main$1c)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$W
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$V = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    recipient: Object
  },
  setup(__props) {
    const props = __props;
    const dropdown = ref(null);
    const username = ref(props.recipient ? props.recipient.name : null);
    const users = ref([]);
    const latestResponse = ref(null);
    const message = useForm({
      recipient_id: props.recipient ? props.recipient.id : null,
      body: null
    });
    const sendMessage = () => {
      message.post(route$1("inbox.store"), {
        errorBag: "default"
      });
    };
    const searchName = async () => {
      let time = Date.now();
      message.recipient_id = null;
      fetch("/api/mention?except=" + usePage().props.user.id + "&name=" + username.value).then((res) => res.json()).then((data) => {
        if (latestResponse.value < time) {
          users.value = data;
          dropdown.value.open = true;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Messages" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("inbox.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Inbox`);
                } else {
                  return [
                    createTextVNode("Inbox")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>New Message</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("inbox.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Inbox")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "New Message")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-full"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Send a New Message</h2><form class="y pane space-y-2 !pb-4"${_scopeId}><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Recipient</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              onInput: searchName,
              modelValue: username.value,
              "onUpdate:modelValue": ($event) => username.value = $event,
              type: "text",
              placeholder: "User"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(Dropdown, {
              align: "left",
              ref_key: "dropdown",
              ref: dropdown
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul${_scopeId2}>`);
                  if (users.value.length === 0) {
                    _push3(`<li class="px-2 py-1 opacity-75 italic"${_scopeId2}>No Results</li>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(users.value, (user) => {
                    _push3(`<li class="px-2 py-1 hover:bg-neutral-400 dark:hover:bg-neutral-700"${_scopeId2}>${ssrInterpolate(user.name)}</li>`);
                  });
                  _push3(`<!--]--></ul>`);
                } else {
                  return [
                    createVNode("ul", null, [
                      users.value.length === 0 ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: "px-2 py-1 opacity-75 italic"
                      }, "No Results")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(users.value, (user) => {
                        return openBlock(), createBlock("li", {
                          class: "px-2 py-1 hover:bg-neutral-400 dark:hover:bg-neutral-700",
                          onClick: ($event) => {
                            unref(message).recipient_id = user.id;
                            username.value = user.name;
                          }
                        }, toDisplayString(user.name), 9, ["onClick"]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</label><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Message</span><textarea placeholder="Required" class="resize-none resize-y w-full pane placeholder-neutral-400 dark:placeholder-neutral-600 border-none"${_scopeId}>${ssrInterpolate(unref(message).body)}</textarea></label><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors.default, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Send Message`);
                } else {
                  return [
                    createTextVNode("Send Message")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-full" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Send a New Message"),
                createVNode("form", {
                  onSubmit: withModifiers(sendMessage, ["prevent"]),
                  class: "y pane space-y-2 !pb-4"
                }, [
                  createVNode("label", { class: "y" }, [
                    createVNode("span", { class: "my-1" }, "Recipient"),
                    createVNode(_sfc_main$1M, {
                      onInput: searchName,
                      modelValue: username.value,
                      "onUpdate:modelValue": ($event) => username.value = $event,
                      type: "text",
                      placeholder: "User"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(Dropdown, {
                      align: "left",
                      ref_key: "dropdown",
                      ref: dropdown
                    }, {
                      content: withCtx(() => [
                        createVNode("ul", null, [
                          users.value.length === 0 ? (openBlock(), createBlock("li", {
                            key: 0,
                            class: "px-2 py-1 opacity-75 italic"
                          }, "No Results")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(users.value, (user) => {
                            return openBlock(), createBlock("li", {
                              class: "px-2 py-1 hover:bg-neutral-400 dark:hover:bg-neutral-700",
                              onClick: ($event) => {
                                unref(message).recipient_id = user.id;
                                username.value = user.name;
                              }
                            }, toDisplayString(user.name), 9, ["onClick"]);
                          }), 256))
                        ])
                      ]),
                      _: 1
                    }, 512)
                  ]),
                  createVNode("label", { class: "y" }, [
                    createVNode("span", { class: "my-1" }, "Message"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(message).body = $event,
                      placeholder: "Required",
                      class: "resize-none resize-y w-full pane placeholder-neutral-400 dark:placeholder-neutral-600 border-none"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(message).body]
                    ])
                  ]),
                  createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors.default, (error, key) => {
                      return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                    }), 128))
                  ]),
                  createVNode(_sfc_main$1R, { class: "w-fit" }, {
                    default: withCtx(() => [
                      createTextVNode("Send Message")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Inbox/Create.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$V
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$U = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    conversations: Object
  },
  setup(__props) {
    const other = (obj) => {
      return obj.sender_id === usePage().props.user.id ? obj.recipient : obj.sender;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Messages" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Inbox</span>`);
          } else {
            return [
              createVNode("span", null, "Inbox")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-full"${_scopeId}><div class="x justify-between"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Conversations</h2>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("inbox.create"),
              class: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Start Conversation`);
                } else {
                  return [
                    createTextVNode("Start Conversation")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.conversations }, null, _parent2, _scopeId));
            if (__props.conversations.total === 0) {
              _push2(`<div class="pane text-center italic text-neutral-400 dark:text-neutral-500"${_scopeId}>damn nobody wanna talk to u fr (0 messages)</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="y space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.conversations.data, (conversation) => {
              _push2(`<div class="x pane justify-between items-center px-4 py-2"${_scopeId}><div class="x items-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                class: "w-8",
                user: other(conversation)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$10, {
                href: unref(route$1)("inbox.show", other(conversation).id),
                user: other(conversation)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_sfc_main$11, {
                time: conversation.created_at
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-full" }, [
                createVNode("div", { class: "x justify-between" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Conversations"),
                  createVNode(unref(Link$1), {
                    href: unref(route$1)("inbox.create"),
                    class: "button"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Start Conversation")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode(_sfc_main$1t, { list: __props.conversations }, null, 8, ["list"]),
                __props.conversations.total === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pane text-center italic text-neutral-400 dark:text-neutral-500"
                }, "damn nobody wanna talk to u fr (0 messages)")) : createCommentVNode("", true),
                createVNode("div", { class: "y space-y-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.conversations.data, (conversation) => {
                    return openBlock(), createBlock("div", { class: "x pane justify-between items-center px-4 py-2" }, [
                      createVNode("div", { class: "x items-center space-x-2" }, [
                        createVNode(_sfc_main$1D, {
                          class: "w-8",
                          user: other(conversation)
                        }, null, 8, ["user"]),
                        createVNode(_sfc_main$10, {
                          href: unref(route$1)("inbox.show", other(conversation).id),
                          user: other(conversation)
                        }, null, 8, ["href", "user"])
                      ]),
                      createVNode(_sfc_main$11, {
                        time: conversation.created_at
                      }, null, 8, ["time"])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Inbox/Index.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$U
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$T = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    messages: Object,
    recipient: Object
  },
  setup(__props) {
    const props = __props;
    const message = useForm({
      recipient_id: props.recipient.id,
      body: null
    });
    const sendMessage = () => {
      message.post(route$1("inbox.store"), {
        errorBag: "default",
        preserveScroll: true,
        onSuccess: () => {
          message.body = null;
        }
      });
    };
    const sender = (obj) => {
      return obj.sender_id === usePage().props.user.id ? usePage().props.user : props.recipient;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Messages" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("inbox.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Inbox`);
                } else {
                  return [
                    createTextVNode("Inbox")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Conversation with ${ssrInterpolate(__props.recipient.name)}</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("inbox.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Inbox")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Conversation with " + toDisplayString(__props.recipient.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-full"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Conversation with ${ssrInterpolate(__props.recipient.name)}</h2>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.messages }, null, _parent2, _scopeId));
            _push2(`<div class="pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.messages.data, (message2) => {
              _push2(`<div class="x items-center px-4 py-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                class: "w-8 mr-4",
                user: sender(message2)
              }, null, _parent2, _scopeId));
              _push2(`<div class="y w-full"${_scopeId}><div class="x justify-between text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$10, {
                user: sender(message2)
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-neutral-400 dark:text-neutral-600"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$11, {
                time: message2.created_at
              }, null, _parent2, _scopeId));
              _push2(`</span></div><p${_scopeId}>${ssrInterpolate(message2.body)}</p></div></div>`);
            });
            _push2(`<!--]--></div><form class="y pane space-y-2 !pb-4"${_scopeId}><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Message</span><textarea placeholder="Required" class="resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"${_scopeId}>${ssrInterpolate(unref(message).body)}</textarea></label>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Send Message`);
                } else {
                  return [
                    createTextVNode("Send Message")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-full" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Conversation with " + toDisplayString(__props.recipient.name), 1),
                createVNode(_sfc_main$1t, { list: __props.messages }, null, 8, ["list"]),
                createVNode("div", { class: "pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.messages.data, (message2) => {
                    return openBlock(), createBlock("div", { class: "x items-center px-4 py-2" }, [
                      createVNode(_sfc_main$1D, {
                        class: "w-8 mr-4",
                        user: sender(message2)
                      }, null, 8, ["user"]),
                      createVNode("div", { class: "y w-full" }, [
                        createVNode("div", { class: "x justify-between text-sm" }, [
                          createVNode(_sfc_main$10, {
                            user: sender(message2)
                          }, null, 8, ["user"]),
                          createVNode("span", { class: "text-neutral-400 dark:text-neutral-600" }, [
                            createVNode(_sfc_main$11, {
                              time: message2.created_at
                            }, null, 8, ["time"])
                          ])
                        ]),
                        createVNode("p", null, toDisplayString(message2.body), 1)
                      ])
                    ]);
                  }), 256))
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(sendMessage, ["prevent"]),
                  class: "y pane space-y-2 !pb-4"
                }, [
                  createVNode("label", { class: "y" }, [
                    createVNode("span", { class: "my-1" }, "Message"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(message).body = $event,
                      placeholder: "Required",
                      class: "resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(message).body]
                    ])
                  ]),
                  createVNode(_sfc_main$1R, { class: "w-fit" }, {
                    default: withCtx(() => [
                      createTextVNode("Send Message")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Inbox/Show.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$T
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$S = {
  __name: "Levels",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Levels</span>`);
          } else {
            return [
              createVNode("span", null, "Levels")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 md:w-3/4"${_scopeId}><div class="space-y-2"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Levels</h2><div class="pane"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              class: "underline",
              href: _ctx.route("levels.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Click here to visit the level reviews portal`);
                } else {
                  return [
                    createTextVNode("Click here to visit the level reviews portal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="y space-y-2 md:w-1/4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>More</h2><div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50"${_scopeId}> Join us on Discord </div>`);
            _push2(ssrRenderComponent(_sfc_main$1c, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 md:w-3/4" }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Levels"),
                  createVNode("div", { class: "pane" }, [
                    createVNode(unref(Link$1), {
                      class: "underline",
                      href: _ctx.route("levels.index")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Click here to visit the level reviews portal")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ]),
              createVNode("div", { class: "y space-y-2 md:w-1/4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "More"),
                createVNode("div", { class: "rounded bg-[#5865F2] px-4 py-2 text-neutral-50" }, " Join us on Discord "),
                createVNode(_sfc_main$1c)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Levels.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$S
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$R = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    level: Object
  },
  setup(__props) {
    const props = __props;
    const banner = useForm({
      action: "update banner",
      content: null
    });
    ref(null);
    const changeBanner = () => {
      banner.post(route$1("levels.update", props.level), {
        errorBag: "changeBanner"
      });
    };
    const previewImage = (e, form, ref2) => {
      form.content = e.target.files[0];
      ref2.src = URL.createObjectURL(form.content);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("levels.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Levels`);
                } else {
                  return [
                    createTextVNode("Levels")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("levels.show", __props.level.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.level.id)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.level.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Edit</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("levels.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Levels")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode(unref(Link$1), {
                href: unref(route$1)("levels.show", __props.level.id)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.level.id), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Edit")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-2/3"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Edit</h2><form class="y pane space-y-2"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>Banner</h2><img class="max-h-32 self-start object-scale-down"${ssrRenderAttr("src", __props.level.banner_url)} alt="Banner"${_scopeId}><input type="file"${_scopeId}><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors.changeBanner, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul><div class="x items-center pb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Change Level Banner`);
                } else {
                  return [
                    createTextVNode("Change Level Banner")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass([{ "!opacity-100": !unref(banner).isDirty && unref(banner).recentlySuccessful }, "x ml-2 text-green-500 opacity-0 transition-all"])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-0.5"${_scopeId}><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Done!</span></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-2/3" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Edit"),
                createVNode("form", {
                  onSubmit: withModifiers(changeBanner, ["prevent"]),
                  class: "y pane space-y-2"
                }, [
                  createVNode("h2", { class: "font-bold text-xl" }, "Banner"),
                  createVNode("img", {
                    class: "max-h-32 self-start object-scale-down",
                    ref: "banner_preview",
                    src: __props.level.banner_url,
                    alt: "Banner"
                  }, null, 8, ["src"]),
                  createVNode("input", {
                    type: "file",
                    onInput: ($event) => previewImage($event, unref(banner), _ctx.$refs.banner_preview)
                  }, null, 40, ["onInput"]),
                  createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors.changeBanner, (error, key) => {
                      return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                    }), 128))
                  ]),
                  createVNode("div", { class: "x items-center pb-2" }, [
                    createVNode(_sfc_main$1R, { class: "w-fit" }, {
                      default: withCtx(() => [
                        createTextVNode("Change Level Banner")
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      class: ["x ml-2 text-green-500 opacity-0 transition-all", { "!opacity-100": !unref(banner).isDirty && unref(banner).recentlySuccessful }]
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5 mr-0.5"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      createVNode("span", null, "Done!")
                    ], 2)
                  ])
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Levels/Edit.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$R
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Q = {
  __name: "Images",
  __ssrInlineRender: true,
  props: {
    level: Object,
    images: Array
  },
  setup(__props) {
    useForm({
      approved: true,
      tag_id: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("levels.show", __props.level.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.level.id)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.level.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Tags</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.route("levels.show", __props.level.id)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.level.id), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Tags")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 w-2/3"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Info</h2><p class="pane"${_scopeId}> Screenshot submissions coming soon to a local website near you! </p><p class="pane"${_scopeId}> Here you can vote on which tags do or don&#39;t fit a level by voting for or against them. </p><ul class="pane list-inside list-disc space-y-4"${_scopeId}><li${_scopeId}>The top rated images will appear on the level&#39;s page.</li><li${_scopeId}>Site moderators can manually mark images as &quot;verified.&quot;</li><li${_scopeId}>Images with consistently low scores will periodically be pruned from the list completely</li></ul></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 w-2/3" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Info"),
                createVNode("p", { class: "pane" }, " Screenshot submissions coming soon to a local website near you! "),
                createVNode("p", { class: "pane" }, " Here you can vote on which tags do or don't fit a level by voting for or against them. "),
                createVNode("ul", { class: "pane list-inside list-disc space-y-4" }, [
                  createVNode("li", null, "The top rated images will appear on the level's page."),
                  createVNode("li", null, 'Site moderators can manually mark images as "verified."'),
                  createVNode("li", null, "Images with consistently low scores will periodically be pruned from the list completely")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Levels/Images.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Q
}, Symbol.toStringTag, { value: "Module" }));
const Index_vue_vue_type_style_index_0_lang$1 = "";
const _sfc_main$P = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    levels: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const level_id = ref(null);
    let sortBy = props.filters.sortBy;
    const sortByNames = [
      "ID",
      "Overall Rating",
      "Gameplay Rating",
      "Visual Rating",
      "Difficulty Rating",
      "Review Count"
    ];
    let sortDir = props.filters.sortDir;
    const sortDirNames = [
      "Descending",
      "Ascending"
    ];
    let filter = props.filters.filter;
    const filterNames = [
      "All",
      "Reviewed",
      "Unreviewed"
    ];
    function setSortBy(value) {
      sortBy = value;
      search();
    }
    function setSortDir(value) {
      sortDir = value;
      search();
    }
    function setFilter(value) {
      filter = value;
      search();
    }
    const search = () => {
      router.get(route$1("levels.index") + "?" + new URLSearchParams({
        sortBy,
        sortDir,
        filter
      }).toString());
    };
    const difficulties = [
      "Unrated",
      "Auto",
      "Easy",
      "Normal",
      "Hard",
      "Harder",
      "Insane",
      "Easy Demon",
      "Medium Demon",
      "Hard Demon",
      "Insane Demon",
      "Extreme Demon"
    ];
    const face = (level) => {
      if (!level.difficulty) {
        return difficulties[0].toLowerCase();
      }
      let name = difficulties[level.difficulty].toLowerCase().split(" ").reverse().join("-");
      if (level.epic) {
        name += "-epic";
      } else if (level.featured) {
        name += "-featured";
      }
      return name;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Levels" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("levels.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Levels`);
                } else {
                  return [
                    createTextVNode("Levels")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("levels.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Levels")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 md:w-3/4"${_scopeId}><div class="x justify-between items-center"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Levels</h2><div class="x space-x-4 items-center"${_scopeId}><div class="x space-x-2 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize"${_scopeId2}>${ssrInterpolate(sortByNames[unref(sortBy)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", { class: "capitalize" }, toDisplayString(sortByNames[unref(sortBy)]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>ID</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Overall Rating</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Gameplay Rating</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Visual Rating</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Difficulty Rating</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Review Count</div>`);
                } else {
                  return [
                    createVNode("div", {
                      onClick: ($event) => setSortBy(0),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "ID", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(1),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Overall Rating", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(2),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Gameplay Rating", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(3),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Visual Rating", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(4),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Difficulty Rating", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(5),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Review Count", 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (_ctx.$page.props.auth) {
              _push2(`<div class="x space-x-2 items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
                trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize"${_scopeId2}>${ssrInterpolate(filterNames[unref(filter)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                        createVNode("span", { class: "capitalize" }, toDisplayString(filterNames[unref(filter)]), 1),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]))
                      ])
                    ];
                  }
                }),
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>All</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Reviewed</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Unreviewed</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        onClick: ($event) => setFilter(0),
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                      }, "All", 8, ["onClick"]),
                      createVNode("div", {
                        onClick: ($event) => setFilter(1),
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                      }, "Reviewed", 8, ["onClick"]),
                      createVNode("div", {
                        onClick: ($event) => setFilter(2),
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                      }, "Unreviewed", 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="x space-x-2 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(sortDirNames[unref(sortDir)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", null, toDisplayString(sortDirNames[unref(sortDir)]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Descending</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"${_scopeId2}>Ascending</div>`);
                } else {
                  return [
                    createVNode("div", {
                      onClick: ($event) => setSortDir(0),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Descending", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortDir(1),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                    }, "Ascending", 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.levels }, null, _parent2, _scopeId));
            _push2(`<div${ssrRenderAttrs({
              "enter-from-class": "opacity-0 -translate-x-6",
              "enter-to-class": "opacity-100 translate-x-0",
              appear: "",
              name: "fade",
              class: "y space-y-4"
            })}>`);
            ssrRenderList(__props.levels.data, (level, index) => {
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("levels.show", level.id),
                key: level.id,
                style: `transition-delay: ${index * 65}ms;`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="pane overflow-hidden relative space-y-2 hover:shadow-lg transition-shadow text-neutral-700 dark:text-ui-300 delay-0"${_scopeId2}><div class="y md:flex-row relative z-10 items-center md:space-x-4"${_scopeId2}><div class="x items-center grow"${_scopeId2}><img class="h-24 mr-4"${ssrRenderAttr("src", "https://browser.gdps.io/assets/difficulties/" + face(level) + ".png")} alt="difficulty"${_scopeId2}><div${_scopeId2}><h2 class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(level.name)}</h2><p class="text-lg"${_scopeId2}>${ssrInterpolate(level.creator)}</p></div></div><div class="x justify-end space-x-4 py-4 transition-[text-shadow] [text-shadow:white_0_0_10px] dark:[text-shadow:black_0_0_10px]"${_scopeId2}><div class="y items-center"${_scopeId2}><span class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(level.rating_difficulty ? Math.round(level.rating_difficulty / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId2}>DIFFICULTY</span></div><div class="y items-center"${_scopeId2}><span class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(level.rating_gameplay ? Math.round(level.rating_gameplay / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId2}>GAMEPLAY</span></div><div class="y items-center"${_scopeId2}><span class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(level.rating_visuals ? Math.round(level.rating_visuals / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId2}>VISUALS</span></div><div class="y items-center"${_scopeId2}><span class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(level.rating_overall ? Math.round(level.rating_overall / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId2}>OVERALL</span></div><div class="y items-center"${_scopeId2}><span class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(level.reviews_count)}</span><span class="text-xs"${_scopeId2}>REVIEWS</span></div></div></div>`);
                    if (level.banner_url) {
                      _push3(`<div class="absolute top-1/2 -translate-y-1/2 right-0 w-3/4 opacity-80" style="${ssrRenderStyle({ "mask-image": "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.8) 75%)" })}"${_scopeId2}><img${ssrRenderAttr("src", level.banner_url)} alt="Level Banner"${_scopeId2}></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "pane overflow-hidden relative space-y-2 hover:shadow-lg transition-shadow text-neutral-700 dark:text-ui-300 delay-0" }, [
                        createVNode("div", { class: "y md:flex-row relative z-10 items-center md:space-x-4" }, [
                          createVNode("div", { class: "x items-center grow" }, [
                            createVNode("img", {
                              class: "h-24 mr-4",
                              src: "https://browser.gdps.io/assets/difficulties/" + face(level) + ".png",
                              alt: "difficulty"
                            }, null, 8, ["src"]),
                            createVNode("div", null, [
                              createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(level.name), 1),
                              createVNode("p", { class: "text-lg" }, toDisplayString(level.creator), 1)
                            ])
                          ]),
                          createVNode("div", { class: "x justify-end space-x-4 py-4 transition-[text-shadow] [text-shadow:white_0_0_10px] dark:[text-shadow:black_0_0_10px]" }, [
                            createVNode("div", { class: "y items-center" }, [
                              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_difficulty ? Math.round(level.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                              createVNode("span", { class: "text-xs" }, "DIFFICULTY")
                            ]),
                            createVNode("div", { class: "y items-center" }, [
                              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_gameplay ? Math.round(level.rating_gameplay / 2 * 100) / 100 : "N/A"), 1),
                              createVNode("span", { class: "text-xs" }, "GAMEPLAY")
                            ]),
                            createVNode("div", { class: "y items-center" }, [
                              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_visuals ? Math.round(level.rating_visuals / 2 * 100) / 100 : "N/A"), 1),
                              createVNode("span", { class: "text-xs" }, "VISUALS")
                            ]),
                            createVNode("div", { class: "y items-center" }, [
                              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_overall ? Math.round(level.rating_overall / 2 * 100) / 100 : "N/A"), 1),
                              createVNode("span", { class: "text-xs" }, "OVERALL")
                            ]),
                            createVNode("div", { class: "y items-center" }, [
                              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.reviews_count), 1),
                              createVNode("span", { class: "text-xs" }, "REVIEWS")
                            ])
                          ])
                        ]),
                        level.banner_url ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute top-1/2 -translate-y-1/2 right-0 w-3/4 opacity-80",
                          style: { "mask-image": "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.8) 75%)" }
                        }, [
                          createVNode("img", {
                            src: level.banner_url,
                            alt: "Level Banner"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.levels }, null, _parent2, _scopeId));
            _push2(`</div><div class="y space-y-4 md:w-1/4"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Add Level</h2><div class="pane"${_scopeId}><div class="space-y-2 my-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              modelValue: level_id.value,
              "onUpdate:modelValue": ($event) => level_id.value = $event,
              placeholder: "Level ID",
              class: "w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, {
              onClick: ($event) => unref(router).get(level_id.value ? unref(route$1)("levels.show", level_id.value) : "#")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add`);
                } else {
                  return [
                    createTextVNode("Add")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 md:w-3/4" }, [
                createVNode("div", { class: "x justify-between items-center" }, [
                  createVNode("h2", { class: "font-bold text-2xl" }, "Levels"),
                  createVNode("div", { class: "x space-x-4 items-center" }, [
                    createVNode("div", { class: "x space-x-2 items-center" }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize" }, toDisplayString(sortByNames[unref(sortBy)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setSortBy(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "ID", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Overall Rating", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(2),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Gameplay Rating", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(3),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Visual Rating", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(4),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Difficulty Rating", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(5),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Review Count", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _ctx.$page.props.auth ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "x space-x-2 items-center"
                    }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize" }, toDisplayString(filterNames[unref(filter)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setFilter(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "All", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setFilter(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Reviewed", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setFilter(2),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Unreviewed", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "x space-x-2 items-center" }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", null, toDisplayString(sortDirNames[unref(sortDir)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setSortDir(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Descending", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortDir(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-ui-700"
                          }, "Ascending", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode(_sfc_main$1t, { list: __props.levels }, null, 8, ["list"]),
                createVNode(TransitionGroup, {
                  "enter-from-class": "opacity-0 -translate-x-6",
                  "enter-to-class": "opacity-100 translate-x-0",
                  appear: "",
                  name: "fade",
                  tag: "div",
                  class: "y space-y-4"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.levels.data, (level, index) => {
                      return openBlock(), createBlock(unref(Link$1), {
                        href: unref(route$1)("levels.show", level.id),
                        key: level.id,
                        style: `transition-delay: ${index * 65}ms;`
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "pane overflow-hidden relative space-y-2 hover:shadow-lg transition-shadow text-neutral-700 dark:text-ui-300 delay-0" }, [
                            createVNode("div", { class: "y md:flex-row relative z-10 items-center md:space-x-4" }, [
                              createVNode("div", { class: "x items-center grow" }, [
                                createVNode("img", {
                                  class: "h-24 mr-4",
                                  src: "https://browser.gdps.io/assets/difficulties/" + face(level) + ".png",
                                  alt: "difficulty"
                                }, null, 8, ["src"]),
                                createVNode("div", null, [
                                  createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(level.name), 1),
                                  createVNode("p", { class: "text-lg" }, toDisplayString(level.creator), 1)
                                ])
                              ]),
                              createVNode("div", { class: "x justify-end space-x-4 py-4 transition-[text-shadow] [text-shadow:white_0_0_10px] dark:[text-shadow:black_0_0_10px]" }, [
                                createVNode("div", { class: "y items-center" }, [
                                  createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_difficulty ? Math.round(level.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "DIFFICULTY")
                                ]),
                                createVNode("div", { class: "y items-center" }, [
                                  createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_gameplay ? Math.round(level.rating_gameplay / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "GAMEPLAY")
                                ]),
                                createVNode("div", { class: "y items-center" }, [
                                  createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_visuals ? Math.round(level.rating_visuals / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "VISUALS")
                                ]),
                                createVNode("div", { class: "y items-center" }, [
                                  createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.rating_overall ? Math.round(level.rating_overall / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "OVERALL")
                                ]),
                                createVNode("div", { class: "y items-center" }, [
                                  createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(level.reviews_count), 1),
                                  createVNode("span", { class: "text-xs" }, "REVIEWS")
                                ])
                              ])
                            ]),
                            level.banner_url ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute top-1/2 -translate-y-1/2 right-0 w-3/4 opacity-80",
                              style: { "mask-image": "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.8) 75%)" }
                            }, [
                              createVNode("img", {
                                src: level.banner_url,
                                alt: "Level Banner"
                              }, null, 8, ["src"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href", "style"]);
                    }), 128))
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$1t, { list: __props.levels }, null, 8, ["list"])
              ]),
              createVNode("div", { class: "y space-y-4 md:w-1/4" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Add Level"),
                createVNode("div", { class: "pane" }, [
                  createVNode("div", { class: "space-y-2 my-2" }, [
                    createVNode(_sfc_main$1M, {
                      type: "text",
                      modelValue: level_id.value,
                      "onUpdate:modelValue": ($event) => level_id.value = $event,
                      placeholder: "Level ID",
                      class: "w-full",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1R, {
                      onClick: ($event) => unref(router).get(level_id.value ? unref(route$1)("levels.show", level_id.value) : "#")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Add")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Levels/Index.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$P
}, Symbol.toStringTag, { value: "Module" }));
const background = "/build/assets/background.d19e8710.png";
const bg$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rw2Ecx182TIwpDpLDCKdNTImLwxajcJgpvy7b136obb59v1tarsp1RYmLXwf+Aq7KWSkiJUc5ExfW1+e7qS3Z5+nzfF7P+3k+n57n84AlmFCSenU/JFNpLeD3OucXFp22F+w0UUsn7SFFV6dnx4NUtM97qsx46zZrVT73rzWsRHQFquqERxVVSwtPCE+tp1WTd4RblXhoRfhM2KXJBYXvTD1c5FeTY0X+NlkLBnxgaRZ2xso4XMZKXEsKy8vpTiYyyu99zJfYI6m5WYld4h3oBPDjxckkY/gYYoARmYdw46FPVlTI7y/kz7AmuYrMKlk0VokRJ41L1IxUj0iMih6RkSBr9v9vX/XooKdY3e6FmmfDeO8B2zbkc4bxdWQY+WOwPsFlqpS/dgjDH6LnSlr3ATg24fyqpIV34WIL2h7VkBYqSFZxSzQKb6fQuAAtN1C/VOzZ7z4nDxDckK+6hr196JXzjuUfXFRn4aneSg0AAAAJcEhZcwAACxMAAAsTAQCanBgAAAyKSURBVHic7d1LaBNbGMDxk1CkXVjrwkXAjdI2C0VBERR8LrRi0bhRLFYEXYgvKgixPqgoggoWXHShuJCqCFUQdSGtiooLH/hALaiBiuCihfrC2japtPnu4nhzc5PMmTOTOed8J/n+q7uYTqbN756TOZMZQwDAFJRKpTZt2rRr165Vq1ap2D+FvJAKWKlUKhaL3b17t7Ky8tatW2SrDAsHvseMqpz/psqqgGHlSyJb5VmQsJwMka0yLDBYYj1kq9wKDNbAwEBvb69gg1Qq9fjx46BejkJeYLBmzJjx8OHDSCTitEE8Hj9x4kRQL0chL8jPWNFo1MlWPB4/ffp0gK9FIS/gs8KCtkhVGRb8OlaOLVJVnilZeWeMJRKJFStWbNmyhVSVZ35GrFQq1d7enk6nBdtEo9Hdu3fv27dPvKtnz57RGkRpBh5LJpP82l9zc/PExITTZnygikaj/f39Tts8ffq0urq6srKyu7vb62FQyPMGK6OK52Qre/pzssVV8W3IVunlAVaOKidb+R+q8m1lqyJbJZksrIKq8m05fVTPtpWvimyVXlKwBKqybYlPALktJ1Vkq8SSgnXmzBmBGN68efNct6mtrRWo4kUikdHRUdW/NqU6qXWsdDq9devWK1euuG5ZZDU1Nffv358/f77qF6JUJ7WOFQ6HOzs7m5ublR4KqSqlZBdIVdsiVSWWh5V3dbZIVenl7ZKOClukqiTLhZVKpT5//iz6gXC4s7NT5hwwGo2Gw+5wL1265Krqw4cPrvuhcJV9isjXqyKRyMePHwVnkjJfWFi4cOGvX78uX77saqu+vl5wPREAWlpaaH3Luv6Dlb0KKrAlr4pvX6StlpYWvg3Zsqu/sPLX1gva8qqK59tWRhXZsi4Gzldscmz5U8XzYStHFdmyKya+DpixVYwqnidbBVWRLYtisVhM/GZHIhGZ27ai0ahAFa+jo0NmP/F4XLxNZWXl8+fP9fyBKH+xnp6eyspKwbsYj8f7+/uj0aj4zQ6Hw5cvXxa80o8fP2QWq86ePZtIJAT3JzLGGhsbx8bGtP2NKB8xABDYisfjfLsibcmr4tsLbJEqK/p7VljQVkYVz7ctr6p4BW2RKlv6bx0rx1aOKp4PW/5U8XJskSqL+t/Ke8ZWQVU8T7aKUcXL2CJVdpX7DdKenp7Dhw+Lf6a/v7+2ttbVVkdHh4yq9vZ28cslEolt27aRKrvycyf0s2fPGhoahoaGvP5gwZqbmzs7O2UuV1MW5fntDFYVY+zKlStbt24V31dNWZc3WIGr4pGt0ssDLEWqeGSr1JL8LCa+HzCoxM+DoHLq6+vr6uoyfRSFkxqxlI5V2dG4JdOnT59OnTo1f/782trat2/fmj6cwknBGhoa+vPnj2CDmpqa27dv19fXi/fT3t6+efNm8TY/f/4cHx+XOapyK9vTwYMHX79+zRjbuHGj6eNySHJk6+7udrqeWFNT8/LlSwDo7+8X2OKroBMTEwJbjY2NqVRK4QBtYX19fSdPnix4k0FdXV06nTZ9gIXz8LSZgrYyqnhOtrLX1p1skarsBJ4yHTp0yPRhOubt+Vg5tnJU8fJt5V+xybdFqngynjK9efPG9PE65vmJfhlbBVXxsm05XQfMtkWqPHniYZ4HwQcsAOju7o5EIk6qePxateDqMvxrq5xV+fCUCfM8CP5gAYDMk4bi8XgikRBvMzExUYZXl4vxlAnzPAi+YbnG74aIRCKutsqnQDzxkM+DoAhW9j02ZCtAT5mQz4OgAlb+nVvlaUuFp0zI50EIHJbT/YDlY0upJx7+eRCChSW4y7TkbWnwlAn/PAgBwnr//r34/kTG2LZt24J6OSTp9JQJ/zwIwY5YguuJrLTuhhgZGdHviWfFPAiSX5uRrKGh4ebNmwVtNTY23rhxY9KkSQG+nMGqqqpGRkb49ws0t2HDhlAopP91PRc41fxxq5TGqkzpdPrIkSP63y8r5kFQtI6VbaskVfH027JlHgR1K+/cVgmr4mm2ZcX5IE8VLAB4/vx5aavi6bRlyzwISmGVT3psWTQPQrBnhWVbKBQ6fvy4alvWnA8yxlT8K/blmQZbeO+bKJSqf8W+PAOAtrY2mSdreq2uri6RSNCIVaapG7fsmgcZwQo8RbbsmgcZTYWKCnZOtG4eZDRiKSrYccu6eZARLHUFaMu6eZDRVKi64udEG+dBRiOW6ooft2ycBxnB0lCRtmycBxlNhdryNydaOg8yGrG05W/csnQeZARLZz5sWToPMpoK9Sc/J9o7DzIasfQnP27ZOw8ygmUkSVv2zoOMpkKDiedEq+dBRiOWwcTjltXzICNYZhPYsnoeZDQVYih/TrR9HmQ0YmEof9yyfR5kBAtJObZsnwcZTYWo4nNiV1eX7fMgI1jYAoB3797NnTvX9IEUG8GilESfsSglWQOLRla7sgNWMplcvXr1+fPnTR8IJVuF6QNwL5lMxmKxe/fu3bt3jzG2Y8cO00dEuYd9xMqoYowBwM6dO2ncsiLUsLJV8ciWLeGFla+KR7asCCksJ1U8soU/jLDEqnhkC3noYMmo4pEt1Ol62KlUo6OjK1eu9HT8oVDo3Llzpg+cyg0RLB+qyBbasMDyrYps4QwFrCJVkS2EmYclqaqlpWXOnDlky5YMw5JU1draCgBfv34lW7ZkEpYnVTyyZUvGYPlQxSNbVmQGlm9VPLKFPwOwilTFI1vI0w1LUtX06dN///4t3tXt27dd90O2TKUVlqf1qiVLlgwPDzvt6smTJ5MnT5bZD9kykj5YPlZBnWzJqyJbptIEy/faer4tr6rIlpF0wCryik22LX+qyJb+lMMK5Dogt1WMKrKlObWwJFUtXrzYdZsFCxa4qpo6deqsWbPIFoYUwpJUdeDAgXQ6ffToUdctXVW9evWK1reQpAqWJ1X8R4qxxVXx/ZAtDCmB5UMVz5+tbFU8smW84GH5VsXzaitfFY9smS1gWEWq4snbclLFI1sGCxhWU1OTq4ampiaBKp6krcePH4v3Mzg4OHXqVFdbd+7cCe5vQAEEDqu3t3fatGniN7Kqqurhw4euu5KxJb6eCAB79uxx3cm6devGxsYC+xNQAKDiMxYeW6TKYErOCjHYIlVmU7WOZdYWqTKewpV3U7ZIFYbUXivUb2vnzp2kCkPKv92g2RapQpKO72PhsUWqtKXpG6QYbJEqnen7zrtZW6RKc1rv0jFli1TpT/d9hfptkSoj6X4G6ezZsx88eCC2lUwm16xZ8+jRI8E2APD9+3fXl1u3bt3169cnTZrk9TjxNzAw8OfPH9NH4ZwRzkWOW+l0usxXQb98+TJz5sy1a9ei/QWNPW3Gty1SxVXxXxOtLZPPx/Jhi1Rlq8Jsy/AT/TzZIlX5qtDaMv8MUklbDx48IFUFVeG0ZR4WyNkKh91PYMtWFUJbKGCBnC1S5RoeW1hgQXG2SBU2W4hggV9bpAqhLVywwLstUoXTFjpY4MUWqUJrCyMskLNl/H9KdRWvyvifCCkscLNV5qoqKiq6urr27t2L1hZeWOBsi1Rdu3aNb4/WFmpYUMgWqcqo4uG0hR0W/N8WqcpRxUNoywJY8K8tUlVQFQ+bLTtgAUBfXx+pEu8HlS1rYJVqQani4bFFsEwWrCoeElsEy1gqVPEw2CJYZlKnimfcFsEykGpVPLO2CJbu9KjiGbRFsLQWoKqLFy8KHkWeyZQtgqWvAFVduHAhFAqJH3OfyYgtgqWpwFXxH0Fri2DpSJEqzLYIlvKUqkJri2CpTYMqnLYIltq2b9/u+kauX7/edT/fvn2bMmWKeD9Lly513c/w8HAkEnE9pKtXrxb5ixMstUn+c2itra2uu3ry5El1dbXTHmbPnj04OCjew8jIyLJly1wP5ujRo8X/4gRLeRpsYVMFBEtPSm0hVAUES1uKbOFUBQRLZ4HbQqsKCJbmArT14sULtKqAYOkvQFviDKoCgmUkDbbMqgKCZSqltoyrAoJlMEW2MKgCgmW2wG0hUQUEy3gB2sKjCggWhgKxhUoVECwkFWkLmyogWHjybQuhKiBYqPJhC6cqIFjY8mQLrSogWAiTtLV///7ly5fjVAUEC2eSttCqAoKFtuJtGVQFBAtzxdgyqwoIFvL82TKuCggW/rzawqAKCJYVydtqa2szfbB/I1h2JGMLjyogWBYltoVKFRAsu3KyhU0VECzryreFUBUQLBvLtoVTFQCEAEDmdINCVTKZjMViixYtOnbsmOljKRzBsrXx8fGKigrTR+EYwaKUFDZ9AFRpRrAoJf0DLyFDD2LywP0AAAAASUVORK5CYII=";
const Lightbox_vue_vue_type_style_index_0_scoped_a7f25400_lang = "";
const _sfc_main$O = {
  __name: "Lightbox",
  __ssrInlineRender: true,
  props: {
    image: String,
    alt: String,
    classes: String | Array,
    holo: Boolean
  },
  setup(__props) {
    const card = ref(null);
    const open = ref(false);
    onMounted(() => {
      card.value.style.setProperty("--url", `url('${bg$1}')`);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cursor-pointer" }, _attrs))} data-v-a7f25400>`);
      if (__props.image) {
        _push(`<img class="${ssrRenderClass([__props.classes, "rounded"])}"${ssrRenderAttr("alt", __props.alt)}${ssrRenderAttr("src", __props.image)} data-v-a7f25400>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="${ssrRenderClass([open.value ? "flex" : "hidden", "cursor-pointer items-center justify-center z-[100] fixed inset-0 bg-opacity-50 bg-neutral-900"])}" data-v-a7f25400><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="card rounded overflow-clip relative" data-v-a7f25400>`);
        if (__props.image) {
          _push2(`<img${ssrRenderAttr("alt", __props.alt)}${ssrRenderAttr("src", __props.image)} data-v-a7f25400>`);
        } else {
          _push2(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent);
        if (__props.holo) {
          _push2(`<div class="_sparkle absolute inset-0 w-full h-full" data-v-a7f25400></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.holo) {
          _push2(`<div class="_glare absolute inset-0 w-full h-full" data-v-a7f25400></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "#app", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Lightbox.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const Lightbox = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-a7f25400"]]);
const _sfc_main$N = {
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    images: Array
  },
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "x items-center relative" }, _attrs))}><div class="absolute left-2 drop-shadow cursor-pointer bg-neutral-100 dark:bg-ui-800 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="x w-full items-center space-x-2 snap-x pane !py-4 overflow-x-hidden"><!--[-->`);
      ssrRenderList(__props.images, (image, index) => {
        _push(ssrRenderComponent(Lightbox, {
          key: index,
          class: "shrink-0",
          classes: "max-h-40 object-fill",
          image: image.url,
          alt: image.caption
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="absolute right-2 drop-shadow cursor-pointer bg-neutral-100 dark:bg-ui-800 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div>`);
    };
  }
};
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Carousel.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const _sfc_main$M = {
  props: {
    items: {
      type: Array,
      required: true
    },
    command: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  watch: {
    items() {
      this.selectedIndex = 0;
    }
  },
  methods: {
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        this.upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        this.downHandler();
        return true;
      }
      if (event.key === "Enter") {
        this.enterHandler();
        return true;
      }
      return false;
    },
    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
    },
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    },
    enterHandler() {
      this.selectItem(this.selectedIndex);
    },
    selectItem(index) {
      const item = this.items[index];
      if (item) {
        this.command({ id: item.id, label: item.name });
      }
    }
  }
};
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300" }, _attrs))}>`);
  if ($props.items.length) {
    _push(`<!--[-->`);
    ssrRenderList($props.items, (item, index) => {
      _push(`<div class="${ssrRenderClass([{ "bg-neutral-200 dark:bg-neutral-800 font-bold": $data.selectedIndex === index }, "flex items-center gap-4 px-2 py-1 justify-between"])}"><span>${ssrInterpolate(item.name)}</span><span class="opacity-50 text-xs">ID: ${ssrInterpolate(item.id)}</span></div>`);
    });
    _push(`<!--]-->`);
  } else {
    _push(`<div class="px-2 py-1"> No results :( </div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/MentionList.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const MentionList = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["ssrRender", _sfc_ssrRender$h]]);
const TipTap_vue_vue_type_style_index_0_lang = "";
const _sfc_main$L = {
  __name: "TipTap",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const source = ref(false);
    ref([]);
    const searchNames = async (query) => {
      return fetch("/api/mention?name=" + query).then((data) => data.json());
    };
    const editable = ref(props.editable);
    watch(editable, (old, current) => {
      editor.value.setEditable(current);
    });
    const extensions = [
      StarterKit,
      Underline,
      Youtube,
      TextAlign,
      TextStyle,
      Placeholder,
      Image,
      Color,
      Link$2,
      CharacterCount,
      Mention.configure({
        HTMLAttributes: {
          class: "p-1 overflow-hidden rounded bg-neutral-100 dark:bg-ui-900"
        },
        suggestion: {
          items: ({ query }) => {
            return searchNames(query);
          },
          render: () => {
            let component, popup;
            return {
              onStart: (props2) => {
                component = new VueRenderer(MentionList, {
                  props: props2,
                  editor: props2.editor
                });
                popup = tippy("body", {
                  getReferenceClientRect: props2.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start"
                });
              },
              onUpdate(props2) {
                component.updateProps(props2);
                popup[0].setProps({
                  getReferenceClientRect: props2.clientRect
                });
              },
              onKeyDown(props2) {
                var _a;
                return (_a = component.ref) == null ? void 0 : _a.onKeyDown(props2);
              },
              onExit() {
                popup[0].destroy();
                component.destroy();
              }
            };
          }
        }
      })
    ];
    const editor = useEditor({
      extensions,
      content: props.modelValue,
      onUpdate: () => {
        emit("update:modelValue", editor.value.getHTML());
      },
      onCreate: () => {
        editor.value.setEditable(editable.value);
      }
    });
    watch(
      props.modelvalue,
      (old, current) => {
        editor.value.commands.setContent(props.modelValue, false);
      },
      {
        deep: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "y items-center" }, _attrs))}>`);
      if (unref(editor) && editable.value) {
        _push(`<div class="x w-full flex-wrap transition-colors divide-x divide-neutral-300 dark:divide-ui-700 border-b border-neutral-300 dark:border-ui-700"><div class="x items-center text-xl p-1 space-x-1"><button title="Bold" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("bold") }, "px-2 py-0.5 rounded"])}"><span class="block w-4">\u{1D401}</span></button><button title="Italics" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("italic") }, "px-2 py-0.5 rounded"])}"><span class="block w-4">\u{1D43C}</span></button><button title="Strikethrough" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("strike") }, "relative px-2 py-0.5 rounded"])}"><span class="block w-4 font-bold">S</span><span class="absolute rounded left-[25%] top-[.9rem] border-y border-neutral-700 dark:border-ui-300 px-2"></span></button><button title="Underline" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("underline") }, "relative px-2 py-0.5 rounded"])}"><span class="block w-4 font-bold text-lg relative -top-[0.05rem]">U</span><span class="absolute rounded left-[25%] bottom-[0.5rem] border-y border-neutral-700 dark:border-ui-300 px-2"></span></button></div><div class="x items-center p-1 transition-colors"><button title="Blockquote" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("blockquote") }, "px-2 py-1 rounded"])}"><span class="block px-1 scale-[1.8] translate-y-[.42rem]">\u{1F676}</span></button><button title="Bullet Points" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("bulletList") }, "px-2 py-1 rounded"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg></button><button title="Numbered List" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": unref(editor).isActive("orderedList") }, "px-2 py-1 rounded"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"></path></svg></button></div><div class="x items-center p-1 transition-colors"><button title="Undo" class="px-2 py-1 rounded"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd"></path></svg></button><button title="Redo" class="px-2 py-1 rounded"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clip-rule="evenodd"></path></svg></button>`);
        if (_ctx.$page.props.auth && _ctx.$page.props.user.roles.includes("admin")) {
          _push(`<button title="Source" class="${ssrRenderClass([{ "bg-neutral-300 dark:bg-ui-700": source.value }, "px-2 py-1 rounded"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="x items-center p-1 transition-colors">`);
        _push(ssrRenderComponent(Dropdown, {
          align: "left",
          width: "fit"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button title="Insert Image" class="px-2 py-1 rounded"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"${_scopeId}></path></svg></button>`);
            } else {
              return [
                createVNode("button", {
                  title: "Insert Image",
                  class: "px-2 py-1 rounded",
                  onClick: ($event) => unref(editor).chain().focus().undo().run()
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "w-5 h-5"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    })
                  ]))
                ], 8, ["onClick"])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-2"${_scopeId}><input type="file"${_scopeId}><span${_scopeId}>or</span>`);
              _push2(ssrRenderComponent(_sfc_main$1M, {
                class: "bg-neutral-200 dark:!bg-ui-800",
                type: "text",
                placeholder: "Image URL"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  onClick: withModifiers(() => {
                  }, ["stop"]),
                  class: "p-2"
                }, [
                  createVNode("input", { type: "file" }),
                  createVNode("span", null, "or"),
                  createVNode(_sfc_main$1M, {
                    class: "bg-neutral-200 dark:!bg-ui-800",
                    type: "text",
                    placeholder: "Image URL"
                  })
                ], 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(Dropdown, { align: "left" }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button title="Insert Image" class="px-2 py-1 rounded"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"${_scopeId}></path></svg></button>`);
            } else {
              return [
                createVNode("button", {
                  title: "Insert Image",
                  class: "px-2 py-1 rounded",
                  onClick: ($event) => unref(editor).chain().focus().undo().run()
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "w-5 h-5"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                    })
                  ]))
                ], 8, ["onClick"])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="y p-2 gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1M, {
                class: "bg-neutral-200 dark:!bg-ui-800",
                type: "text",
                placeholder: "URL"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1M, {
                class: "bg-neutral-200 dark:!bg-ui-800",
                type: "text",
                placeholder: "Text (optional)"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  onClick: withModifiers(() => {
                  }, ["stop"]),
                  class: "y p-2 gap-2"
                }, [
                  createVNode(_sfc_main$1M, {
                    class: "bg-neutral-200 dark:!bg-ui-800",
                    type: "text",
                    placeholder: "URL"
                  }),
                  createVNode(_sfc_main$1M, {
                    class: "bg-neutral-200 dark:!bg-ui-800",
                    type: "text",
                    placeholder: "Text (optional)"
                  })
                ], 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(EditorContent), {
        class: ["transition-colors w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-ui-600 prose-neutral !prose-invert", { "p-4 bg-neutral-100 dark:bg-ui-800": editable.value }],
        editor: unref(editor)
      }, null, _parent));
      if (source.value) {
        _push(`<pre class="p-2 text-xs w-full overflow-x-auto">${ssrInterpolate(__props.modelValue)}</pre>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TipTap.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const bg = "/build/assets/soundparty.7c623cec.jpg";
const _sfc_main$K = {
  __name: "Post",
  __ssrInlineRender: true,
  props: {
    post: {
      reactions: Array
    },
    preview: Boolean,
    postbit: {
      type: Boolean,
      default: true
    },
    user: Object,
    op: Number
  },
  setup(__props) {
    var _a;
    const props = __props;
    const user = (_a = props.post.author) != null ? _a : props.user;
    const repColor = (rep) => {
      if (rep > 0) {
        return "text-green-500";
      } else if (rep < 0) {
        return "text-red-500";
      }
    };
    const searchLikes = () => {
      let found = false;
      if (usePage().props.auth && props.post.reactions) {
        props.post.reactions.forEach((l) => {
          if (l.reacter_id === usePage().props.user.id) {
            found = true;
          }
        });
      }
      liked.value = found;
    };
    onBeforeMount(searchLikes);
    onUpdated(searchLikes);
    const liked = ref(false);
    useForm({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "y pane overflow-hidden !p-0 border border-neutral-200 dark:border-ui-700" }, _attrs))}><div class="flex flex-col md:flex-row">`);
      if (__props.postbit) {
        _push(`<div class="relative bg-white dark:bg-ui-800 !bg-opacity-50 shrink-0 items-center transition-colors md:border-r border-r-neutral-300 dark:border-r-ui-700"><div class="flex md:flex-col relative z-10 gap-4 p-4">`);
        if (unref(user).postbit_url) {
          _push(`<div class="absolute -z-10 top-0 left-0 w-full h-full opacity-50" style="${ssrRenderStyle("-webkit-mask:linear-gradient(rgba(255, 255, 255, 0.65) 50%, transparent 100%);background-image: url('" + unref(bg) + "');background-size:cover;background-position:top;")}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="hidden md:flex flex-col gap-1 text-center items-center py-1"><span class="x items-center gap-2"><span class="fflag ff-sm fflag-US"></span>`);
        _push(ssrRenderComponent(_sfc_main$10, {
          class: { "glass px-2 backdrop-blur-sm": unref(user).postbit_url },
          user: unref(user)
        }, null, _parent));
        _push(`</span><span class="${ssrRenderClass([{ "glass px-2 py-0.5 backdrop-blur-sm": unref(user).postbit_url }, "text-xs"])}">Junior Member</span></div><div class="flex place-center px-2">`);
        _push(ssrRenderComponent(_sfc_main$1D, {
          class: "w-32 md:w-40",
          user: unref(user)
        }, null, _parent));
        _push(`</div><div class="y grow gap-4 items-start"><div class="flex flex-col md:hidden gap-1 text-center items-center py-1"><span class="x items-center gap-2"><span class="fflag ff-sm fflag-US"></span>`);
        _push(ssrRenderComponent(_sfc_main$10, {
          class: { "glass px-2 backdrop-blur-sm": unref(user).postbit_url },
          user: unref(user)
        }, null, _parent));
        _push(`</span><span class="${ssrRenderClass([{ "glass px-2 py-0.5 backdrop-blur-sm": unref(user).postbit_url }, "text-xs"])}">Junior Member</span></div><div class="pane !px-3 space-y-1 w-full h-fit text-xs backdrop-blur-sm"><div class="flex justify-between"><span>Reputation:</span><span class="${ssrRenderClass(repColor(unref(user).reputation))}">${ssrInterpolate(unref(user).reputation)}</span></div><div class="flex justify-between"><span>Posts:</span><span>0</span></div><div class="flex justify-between"><span>Likes:</span><span>0</span></div><div class="flex justify-between"><span>Credits:</span><span>0</span></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="y w-full min-w-0"><div class="y h-full w-full justify-between p-4 gap-2"><div class="x justify-between items-center text-xs"><div class="${ssrRenderClass([__props.preview ? "text-amber-500" : "text-neutral-500 dark:text-ui-400", "x gap-1"])}">`);
      if (!__props.preview) {
        _push(`<!--[-->`);
        if (unref(user).id === __props.op) {
          _push(`<span class="text-xs pane !px-2 !py-0.5 font-bold">OP</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-shrink-0 w-3 h-3"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd"></path></svg><!--]-->`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-shrink-0 w-3 h-3"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`);
      }
      if (!__props.preview) {
        _push(`<span>${ssrInterpolate(new Date(__props.post.created_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }))}</span>`);
      } else {
        _push(`<span>THIS JUST A PREVIEW, YOU STILL NEED TO POST YOUR MESSAGE</span>`);
      }
      _push(`</div>`);
      if (!__props.preview && __props.postbit) {
        _push(`<div class="x gap-1">`);
        if (__props.post.ip) {
          _push(`<span>(IP: ${ssrInterpolate(__props.post.ip)})</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>(#${ssrInterpolate(__props.post.id)})</span><input type="checkbox" class="rounded dark:bg-ui-800"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!__props.post.body) {
        _push(`<p class="text-neutral-100 dark:text-ui-800 text-3xl text-center h-1/2">This post is empty... Like your soul...</p>`);
      } else {
        _push(`<div class="h-full w-full"><div class="y justify-between">`);
        _push(ssrRenderComponent(_sfc_main$L, {
          editable: false,
          modelValue: __props.post.body,
          "onUpdate:modelValue": ($event) => __props.post.body = $event
        }, null, _parent));
        if (_ctx.$page.props.auth && _ctx.$page.props.user.roles.includes("admin")) {
          _push(`<details class="text-xs"><summary class="opacity-50 cursor-pointer">Raw Message</summary><pre class="w-full overflow-x-auto">${ssrInterpolate(__props.post.body)}</pre></details>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      if (__props.post.media && __props.post.media.length > 0) {
        _push(`<!--[--><span class="text-sm tracking-widest uppercase opacity-50 mt-2">Attachments</span>`);
        if (!_ctx.$page.props.auth) {
          _push(`<span class="text-sm">(You must log in to download)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(__props.post.media, (media, index) => {
          _push(`<div class="y gap-2 my-2"><div class="x justify-between items-center rounded box !px-2 !py-1"><div class="x gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z"></path></svg><a class="text-sm text-blue-500 hover:underline" href="/download/X3D76GqO">${ssrInterpolate(media.filename)}</a><span class="text-xs">(${ssrInterpolate(unref(prettyBytes)(media.bytes))})</span></div><div class="x gap-2"><span class="text-xs">${ssrInterpolate(media.downloads)} Downloads</span></div></div></div>`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.preview && __props.post.created_at !== __props.post.updated_at) {
        _push(`<div class="x mb-2 items-center space-x-1 text-xs text-neutral-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"></path></svg><span>This post last modified `);
        _push(ssrRenderComponent(_sfc_main$11, {
          time: __props.post.created_at
        }, null, _parent));
        _push(`, by `);
        _push(ssrRenderComponent(_sfc_main$10, { user: unref(user) }, null, _parent));
        _push(`</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.preview) {
        _push(`<div class="x justify-between"><div onclick="alert(&#39;cry about it&#39;)" class="p-1.5 cursor-pointer bg-neutral-200 dark:bg-ui-800 text-neutral-400 dark:text-ui-400 hover:text-white hover:bg-red-500 transition rounded"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z"></path></svg></div><div class="x space-x-2"><div class="${ssrRenderClass([liked.value ? "text-red-500" : "text-green-500", "p-1.5 cursor-pointer bg-neutral-200 dark:bg-ui-800 hover:bg-green-500 hover:text-white transition rounded"])}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path></svg></div>`);
        if (_ctx.$page.props.auth && _ctx.$page.props.user.id === __props.post.author_id) {
          _push(ssrRenderComponent(unref(Link$1), {
            href: unref(route$1)("posts.edit", __props.post.id),
            class: "p-1.5 uppercase tracking-widest text-xs cursor-pointer bg-neutral-200 dark:bg-neutral-800 rounded"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Edit `);
              } else {
                return [
                  createTextVNode(" Edit ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.post.signature && unref(user).signature) {
        _push(`<div class="px-4 py-2 border-t border-t-neutral-300 dark:border-t-ui-700"><p class="whitespace-pre-wrap">${ssrInterpolate(unref(user).signature)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!__props.preview && __props.post.reactions.length > 0) {
        _push(`<div class="x items-center transition-colors border-t p-2 space-x-2 border-t-neutral-300 dark:border-t-ui-700"><div class="x items-center space-x-1 text-green-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path></svg><span>${ssrInterpolate(__props.post.reactions.length)}</span></div><!--[-->`);
        ssrRenderList(__props.post.reactions, (reaction, index) => {
          _push(ssrRenderComponent(unref(Link$1), {
            class: "text-sm",
            href: unref(route$1)("users.show", reaction.reacter.id),
            title: new Date(reaction.created_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_sfc_main$10, {
                  user: reaction.reacter
                }, null, _parent2, _scopeId));
                _push2(`${ssrInterpolate(index < __props.post.reactions.length - 1 ? "," : "")}`);
              } else {
                return [
                  createVNode(_sfc_main$10, {
                    user: reaction.reacter
                  }, null, 8, ["user"]),
                  createTextVNode(toDisplayString(index < __props.post.reactions.length - 1 ? "," : ""), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Post.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const _sfc_main$J = {
  __name: "PostPad",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    submit: Function,
    disabled: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const showingPreview = ref(false);
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value2) {
        emit("update:modelValue", value2);
      }
    });
    const dropbox = ref(null);
    const resumable = ref(new Resumable({
      chunkSize: 1 * 1024 * 1024,
      simultaneousUploads: 3,
      testChunks: false,
      throttleProgressCallbacks: 1,
      target: route$1("media.upload"),
      query: { _token: usePage().props.app.csrf }
    }));
    onMounted(() => {
      resumable.value.assignBrowse(dropbox.value);
      resumable.value.assignDrop(dropbox.value);
    });
    const filelist = ref({});
    const progress = ref(0);
    resumable.value.on("fileAdded", function(file, event) {
      filelist.value[file.uniqueIdentifier] = {
        "name": file.fileName,
        "size": file.size,
        "progress": file.progress()
      };
      resumable.value.upload();
    });
    resumable.value.on("fileSuccess", function(file, message) {
      console.log("file_success");
    });
    resumable.value.on("fileError", function(file, message) {
      console.log("file_error");
    });
    resumable.value.on("fileProgress", function(file, message) {
      filelist.value[file.uniqueIdentifier]["progress"] = file.progress();
      progress.value = resumable.value.progress();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="pane !p-0 border border-neutral-300 dark:border-ui-700 transition-colors">`);
      _push(ssrRenderComponent(_sfc_main$L, {
        modelValue: unref(value).body,
        "onUpdate:modelValue": ($event) => unref(value).body = $event
      }, null, _parent));
      _push(`<div class="y gap-2 p-4 bg-neutral-100 dark:bg-ui-800 transition-colors"><span class="tracking-widest uppercase text-sm dark:text-ui-500">Attachments:</span><div class="y cursor-pointer place-items-center gap-2 p-4 rounded border-2 transition-colors dark:text-ui-500 border-dashed border-neutral-300 dark:border-ui-700 bg-neutral-200 dark:bg-ui-900"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path></svg><span>Click or drag and drop some file(s) here to upload</span></div><!--[-->`);
      ssrRenderList(filelist.value, (file, id) => {
        _push(`<div class="y gap-2"><div class="x gap-2 justify-between items-center rounded box !px-2 !py-1"><div class="x gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z"></path></svg><a class="text-sm text-blue-500 hover:underline truncate whitespace-nowrap" href="/download/X3D76GqO">${ssrInterpolate(file.name)}</a><span class="text-xs whitespace-nowrap">(${ssrInterpolate(unref(prettyBytes)(file.size))})</span></div><div class="x items-center gap-2"><span class="text-xs">${ssrInterpolate(Math.round(file.progress * 100))}%</span><div class="rounded-full overflow-clip border border-neutral-300 dark:border-ui-700 w-64"><div class="${ssrRenderClass([file.progress === 1 ? "bg-green-500" : "bg-blue-500", "text-xs py-1 transition-[width] duration-500"])}" style="${ssrRenderStyle(`width: ${file.progress * 100}%;`)}"></div></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex p-2 items-center space-x-2 transition-colors border-t border-neutral-300 dark:border-ui-700">`);
      _push(ssrRenderComponent(_sfc_main$1F, {
        message: !_ctx.$page.props.user.signature ? "You have not specified a post signature in your profile settings" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1E, {
              disabled: !_ctx.$page.props.user.signature,
              modelValue: unref(value).signature,
              "onUpdate:modelValue": ($event) => unref(value).signature = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="${ssrRenderClass({ "opacity-50": !_ctx.$page.props.user.signature })}"${_scopeId}>Show Signature</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-2" }, [
                createVNode(_sfc_main$1E, {
                  disabled: !_ctx.$page.props.user.signature,
                  modelValue: unref(value).signature,
                  "onUpdate:modelValue": ($event) => unref(value).signature = $event
                }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue"]),
                createVNode("span", {
                  class: { "opacity-50": !_ctx.$page.props.user.signature }
                }, "Show Signature", 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (__props.submit) {
        _push(`<form class="flex justify-center space-x-2">`);
        _push(ssrRenderComponent(_sfc_main$1R, {
          class: unref(value).processing ? "opacity-50" : "",
          disabled: unref(value).processing
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Post Reply`);
            } else {
              return [
                createTextVNode("Post Reply")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass({ "hidden": !showingPreview.value })}">`);
      if (unref(value)) {
        _push(ssrRenderComponent(_sfc_main$K, {
          post: unref(value),
          preview: true,
          user: _ctx.$page.props.user
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PostPad.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const Show_vue_vue_type_style_index_0_scoped_1e079cf3_lang = "";
const _sfc_main$I = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    level: Object,
    review: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      rating_gameplay: props.review ? props.review.rating_gameplay : 5,
      rating_difficulty: props.review ? props.review.rating_difficulty : 5,
      rating_visuals: props.review ? props.review.rating_visuals : 5,
      rating_overall: props.review ? props.review.rating_overall : 5,
      body: props.review ? props.review.review : "",
      level_id: props.level.id
    });
    const submit = () => {
      form.post(route("reviews.store"), {
        preserveScroll: true
      });
    };
    const difficulties = [
      "Unrated",
      "Auto",
      "Easy",
      "Normal",
      "Hard",
      "Harder",
      "Insane",
      "Easy Demon",
      "Medium Demon",
      "Hard Demon",
      "Insane Demon",
      "Extreme Demon"
    ];
    const face = () => {
      if (!props.level.difficulty) {
        return difficulties[0].toLowerCase();
      }
      let name = difficulties[props.level.difficulty].toLowerCase().split(" ").reverse().join("-");
      if (props.level.epic) {
        name += "-epic";
      } else if (props.level.featured) {
        name += "-featured";
      }
      return name;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: "Home",
        decorations: false
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("levels.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Levels`);
                } else {
                  return [
                    createTextVNode("Levels")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4" data-v-1e079cf3${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-1e079cf3${_scopeId}></path></svg><span data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.id)}</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.route("levels.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Levels")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, toDisplayString(__props.level.id), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="y h-64 shadow-lg rounded-lg justify-between w-full bg-neutral-500 bg-ui-800 lg:max-w-5xl xl:max-w-6xl p-4 my-4 bg-center bg-cover" style="${ssrRenderStyle([{ "box-shadow": "rgba(0, 0, 0, 0.85) 0 -275px 75px -200px inset" }, `background-image: url('${(_a = __props.level.banner_url) != null ? _a : unref(background)}')`])}" data-v-1e079cf3${_scopeId}><div class="x justify-end items-start" data-v-1e079cf3${_scopeId}>`);
            if (_ctx.$page.props.auth && _ctx.$page.props.user.roles.includes("admin")) {
              _push2(ssrRenderComponent(unref(Link$1), {
                href: _ctx.route("levels.edit", __props.level),
                class: "button"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Edit`);
                  } else {
                    return [
                      createTextVNode("Edit")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="x justify-between items-end" data-v-1e079cf3${_scopeId}><div class="x items-end" data-v-1e079cf3${_scopeId}><div class="y items-center shrink-0" data-v-1e079cf3${_scopeId}><img class="h-24 mr-2"${ssrRenderAttr("src", "https://browser.gdps.io/assets/difficulties/" + face() + ".png")} alt="difficulty" data-v-1e079cf3${_scopeId}></div><div class="leading-none" data-v-1e079cf3${_scopeId}><div class="x items-center text-neutral-200" data-v-1e079cf3${_scopeId}><h1 class="font-bold text-2xl mr-2" data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.name)}</h1><span class="text-sm" data-v-1e079cf3${_scopeId}>by ${ssrInterpolate(__props.level.creator)}</span></div><p class="text-neutral-200" data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.description)}</p><div class="x items-center mt-2 space-x-2" data-v-1e079cf3${_scopeId}>`);
            if (__props.level.coins) {
              _push2(`<div class="x" data-v-1e079cf3${_scopeId}><img class="h-4" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin" data-v-1e079cf3${_scopeId}>`);
              if (__props.level.coins > 1) {
                _push2(`<img class="h-4 -ml-1.5" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin" data-v-1e079cf3${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.level.coins > 2) {
                _push2(`<img class="h-4 -ml-1.5" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin" data-v-1e079cf3${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.level.stars) {
              _push2(`<div class="x items-center px-2 py-0.5 text-sm transition-colors rounded bg-neutral-100 dark:bg-ui-800" data-v-1e079cf3${_scopeId}><span class="font-bold text-xs mr-1" data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.stars)}</span><img class="h-4" src="https://browser.gdps.io/assets/star.png" alt="star" data-v-1e079cf3${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.level.difficulty) {
              _push2(`<div class="px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800" data-v-1e079cf3${_scopeId}>${ssrInterpolate(difficulties[__props.level.difficulty])}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.level.featured) {
              _push2(`<div class="px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800" data-v-1e079cf3${_scopeId}>Featured</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.level.epic) {
              _push2(`<div class="px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800" data-v-1e079cf3${_scopeId}>Epic</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="x space-x-2 items-end" data-v-1e079cf3${_scopeId}><span data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A")}</span><span data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A")}</span><span data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A")}</span><span data-v-1e079cf3${_scopeId}>${ssrInterpolate(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A")}</span></div></div></div><div class="x transition-colors bg-neutral-200 dark:bg-ui-950 dark:border dark:border-ui-900 rounded-lg items-center space-x-2 lg:max-w-5xl xl:max-w-6xl w-full px-4 py-2" data-v-1e079cf3${_scopeId}><div class="y items-center font-bold text-sm" data-v-1e079cf3${_scopeId}> TOP TAGS </div><div class="py-2 select-none transition-colors border-r border-neutral-400 dark:border-ui-700" data-v-1e079cf3${_scopeId}></div>`);
            if (__props.level.tags.length === 0) {
              _push2(`<span class="opacity-50" data-v-1e079cf3${_scopeId}>No Tags</span>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(__props.level.tags, (tag) => {
                _push2(ssrRenderComponent(unref(Link$1), {
                  href: _ctx.route("tags.show", tag),
                  class: "x items-center text-neutral-700 dark:text-ui-300 px-2 py-1 text-sm rounded-md bg-neutral-100 dark:bg-ui-800 capitalize"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span title="Verified Tag" data-v-1e079cf3${_scopeId2}>`);
                      if (tag.pivot.verified) {
                        _push3(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="inline mr-1 rounded-full text-green-500 w-5 h-5" data-v-1e079cf3${_scopeId2}><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" data-v-1e079cf3${_scopeId2}></path></svg>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</span> ${ssrInterpolate(tag.name)}`);
                    } else {
                      return [
                        createVNode("span", { title: "Verified Tag" }, [
                          tag.pivot.verified ? (openBlock(), createBlock("svg", {
                            key: 0,
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            class: "inline mr-1 rounded-full text-green-500 w-5 h-5"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
                              "clip-rule": "evenodd"
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        createTextVNode(" " + toDisplayString(tag.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            }
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("levels.tags.show", __props.level),
              class: "text-sm rounded hover:underline cursor-pointer"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.level.tags.length === 0 ? "Submit" : "More")}...`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.level.tags.length === 0 ? "Submit" : "More") + "...", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col md:flex-row dark:bg-ui-950 dark:border dark:border-ui-900 rounded-lg p-4 lg:max-w-5xl xl:max-w-6xl w-full gap-4 my-4" data-v-1e079cf3${_scopeId}><div class="y space-y-2 md:w-3/4" data-v-1e079cf3${_scopeId}><div class="x items-center justify-between" data-v-1e079cf3${_scopeId}><h2 class="font-bold text-2xl" data-v-1e079cf3${_scopeId}>Images</h2>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("levels.images.show", __props.level.id),
              class: "pane !py-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit`);
                } else {
                  return [
                    createTextVNode("Submit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.level.images.length === 0) {
              _push2(`<div class="pane" data-v-1e079cf3${_scopeId}>No images available. Add one?</div>`);
            } else {
              _push2(ssrRenderComponent(_sfc_main$N, {
                images: __props.level.images
              }, null, _parent2, _scopeId));
            }
            _push2(`<h2 class="font-bold text-2xl" data-v-1e079cf3${_scopeId}>Reviews</h2>`);
            if (_ctx.$page.props.auth) {
              _push2(`<form class="y pane gap-4" data-v-1e079cf3${_scopeId}><div class="space-y-2 w-full" data-v-1e079cf3${_scopeId}><h2 class="text-xl" data-v-1e079cf3${_scopeId}>${ssrInterpolate(props.review ? "Edit Your" : "Submit")} Rating</h2><p data-v-1e079cf3${_scopeId}>${ssrInterpolate(unref(form).body)}</p><textarea class="hidden resize-none resize-y w-full pane !bg-ui-800 border-none" data-v-1e079cf3${_scopeId}>${ssrInterpolate(unref(form).body)}</textarea>`);
              _push2(ssrRenderComponent(_sfc_main$J, {
                modelValue: unref(form).body,
                "onUpdate:modelValue": ($event) => unref(form).body = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="w-full" data-v-1e079cf3${_scopeId}><h2 data-v-1e079cf3${_scopeId}>Gameplay Rating: ${ssrInterpolate(unref(form).rating_gameplay)}</h2><input class="w-full"${ssrRenderAttr("value", unref(form).rating_gameplay)} type="range" min="0" max="10" step="1" data-v-1e079cf3${_scopeId}><h2 data-v-1e079cf3${_scopeId}>Difficulty Rating: ${ssrInterpolate(unref(form).rating_difficulty)}</h2><input${ssrRenderAttr("value", unref(form).rating_difficulty)} type="range" min="0" max="100" step="1" data-v-1e079cf3${_scopeId}><h2 data-v-1e079cf3${_scopeId}>Visuals Rating: ${ssrInterpolate(unref(form).rating_visuals)}</h2><input${ssrRenderAttr("value", unref(form).rating_visuals)} type="range" min="0" max="10" step="1" data-v-1e079cf3${_scopeId}><h2 data-v-1e079cf3${_scopeId}>Overall Rating: ${ssrInterpolate(unref(form).rating_overall)}</h2><input${ssrRenderAttr("value", unref(form).rating_overall)} type="range" min="0" max="10" step="1" data-v-1e079cf3${_scopeId}></div>`);
              _push2(ssrRenderComponent(_sfc_main$1R, {
                class: "w-fit",
                onClick: submit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.review ? "Edit Your" : "Submit")} Rating`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.review ? "Edit Your" : "Submit") + " Rating", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</form>`);
            } else {
              _push2(`<div class="y pane" data-v-1e079cf3${_scopeId}><h2 class="text-xl" data-v-1e079cf3${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link$1), {
                class: "underline",
                href: _ctx.route("auth::login")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Log in`);
                  } else {
                    return [
                      createTextVNode("Log in")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` to submit a review</h2></div>`);
            }
            if (__props.level.reviews.length === 0) {
              _push2(`<div class="pane" data-v-1e079cf3${_scopeId}> This level has no reviews. Be the first! </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.level.reviews, (review) => {
              _push2(`<div class="x items-center pane" data-v-1e079cf3${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                class: "w-8 h-8 mr-4",
                user: review.author
              }, null, _parent2, _scopeId));
              _push2(`<div class="y w-full" data-v-1e079cf3${_scopeId}><div class="x justify-between items-center space-x-2" data-v-1e079cf3${_scopeId}><h2 data-v-1e079cf3${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$10, {
                user: review.author
              }, null, _parent2, _scopeId));
              _push2(`</h2><span data-v-1e079cf3${_scopeId}>${ssrInterpolate(review.rating_overall)}/5</span></div><p data-v-1e079cf3${_scopeId}>${ssrInterpolate(review.review)}</p></div></div>`);
            });
            _push2(`<!--]--></div><div class="y space-y-2 md:w-1/4" data-v-1e079cf3${_scopeId}><div class="w-full space-y-2" data-v-1e079cf3${_scopeId}><h2 class="font-bold text-2xl" data-v-1e079cf3${_scopeId}>Reviews</h2><div class="flex items-center justify-center rounded-md px-4 py-2 bg-rose-500 text-white" data-v-1e079cf3${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2" data-v-1e079cf3${_scopeId}><path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" data-v-1e079cf3${_scopeId}></path><path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" data-v-1e079cf3${_scopeId}></path></svg><span class="font-bold cursor-pointer" data-v-1e079cf3${_scopeId}>Download Level</span></div><div class="x items-center justify-between" data-v-1e079cf3${_scopeId}><h2 class="font-bold text-2xl" data-v-1e079cf3${_scopeId}>Videos</h2><span class="pane !py-1 cursor-pointer" data-v-1e079cf3${_scopeId}>Submit</span></div>`);
            if (__props.level.videos.length === 0) {
              _push2(`<div class="pane" data-v-1e079cf3${_scopeId}> No videos available </div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(__props.level.videos, (video) => {
                _push2(`<div class="pane" data-v-1e079cf3${_scopeId}><iframe class="!w-full"${ssrRenderAttr("src", "https://www.youtube-nocookie.com/embed/" + video.video_id)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-1e079cf3${_scopeId}></iframe></div>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div><div class="hidden md:block w-full space-y-2" data-v-1e079cf3${_scopeId}><div class="x items-center justify-between" data-v-1e079cf3${_scopeId}><h2 class="font-bold text-2xl" data-v-1e079cf3${_scopeId}>Replays</h2><span class="pane !py-1 cursor-pointer" data-v-1e079cf3${_scopeId}>Submit</span></div>`);
            {
              _push2(`<div class="pane" data-v-1e079cf3${_scopeId}>No replays available</div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "y h-64 shadow-lg rounded-lg justify-between w-full bg-neutral-500 bg-ui-800 lg:max-w-5xl xl:max-w-6xl p-4 my-4 bg-center bg-cover",
                style: [{ "box-shadow": "rgba(0, 0, 0, 0.85) 0 -275px 75px -200px inset" }, `background-image: url('${(_b = __props.level.banner_url) != null ? _b : unref(background)}')`]
              }, [
                createVNode("div", { class: "x justify-end items-start" }, [
                  _ctx.$page.props.auth && _ctx.$page.props.user.roles.includes("admin") ? (openBlock(), createBlock(unref(Link$1), {
                    key: 0,
                    href: _ctx.route("levels.edit", __props.level),
                    class: "button"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Edit")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "x justify-between items-end" }, [
                  createVNode("div", { class: "x items-end" }, [
                    createVNode("div", { class: "y items-center shrink-0" }, [
                      createVNode("img", {
                        class: "h-24 mr-2",
                        src: "https://browser.gdps.io/assets/difficulties/" + face() + ".png",
                        alt: "difficulty"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "leading-none" }, [
                      createVNode("div", { class: "x items-center text-neutral-200" }, [
                        createVNode("h1", { class: "font-bold text-2xl mr-2" }, toDisplayString(__props.level.name), 1),
                        createVNode("span", { class: "text-sm" }, "by " + toDisplayString(__props.level.creator), 1)
                      ]),
                      createVNode("p", { class: "text-neutral-200" }, toDisplayString(__props.level.description), 1),
                      createVNode("div", { class: "x items-center mt-2 space-x-2" }, [
                        __props.level.coins ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "x"
                        }, [
                          createVNode("img", {
                            class: "h-4",
                            src: "https://browser.gdps.io/assets/silvercoin.png",
                            alt: "coin"
                          }),
                          __props.level.coins > 1 ? (openBlock(), createBlock("img", {
                            key: 0,
                            class: "h-4 -ml-1.5",
                            src: "https://browser.gdps.io/assets/silvercoin.png",
                            alt: "coin"
                          })) : createCommentVNode("", true),
                          __props.level.coins > 2 ? (openBlock(), createBlock("img", {
                            key: 1,
                            class: "h-4 -ml-1.5",
                            src: "https://browser.gdps.io/assets/silvercoin.png",
                            alt: "coin"
                          })) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        __props.level.stars ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "x items-center px-2 py-0.5 text-sm transition-colors rounded bg-neutral-100 dark:bg-ui-800"
                        }, [
                          createVNode("span", { class: "font-bold text-xs mr-1" }, toDisplayString(__props.level.stars), 1),
                          createVNode("img", {
                            class: "h-4",
                            src: "https://browser.gdps.io/assets/star.png",
                            alt: "star"
                          })
                        ])) : createCommentVNode("", true),
                        __props.level.difficulty ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800"
                        }, toDisplayString(difficulties[__props.level.difficulty]), 1)) : createCommentVNode("", true),
                        __props.level.featured ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800"
                        }, "Featured")) : createCommentVNode("", true),
                        __props.level.epic ? (openBlock(), createBlock("div", {
                          key: 4,
                          class: "px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800"
                        }, "Epic")) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "x space-x-2 items-end" }, [
                    createVNode("span", null, toDisplayString(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                    createVNode("span", null, toDisplayString(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                    createVNode("span", null, toDisplayString(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                    createVNode("span", null, toDisplayString(__props.level.rating_difficulty ? Math.round(__props.level.rating_difficulty / 2 * 100) / 100 : "N/A"), 1)
                  ])
                ])
              ], 4),
              createVNode("div", { class: "x transition-colors bg-neutral-200 dark:bg-ui-950 dark:border dark:border-ui-900 rounded-lg items-center space-x-2 lg:max-w-5xl xl:max-w-6xl w-full px-4 py-2" }, [
                createVNode("div", { class: "y items-center font-bold text-sm" }, " TOP TAGS "),
                createVNode("div", { class: "py-2 select-none transition-colors border-r border-neutral-400 dark:border-ui-700" }),
                __props.level.tags.length === 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "opacity-50"
                }, "No Tags")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.level.tags, (tag) => {
                  return openBlock(), createBlock(unref(Link$1), {
                    href: _ctx.route("tags.show", tag),
                    class: "x items-center text-neutral-700 dark:text-ui-300 px-2 py-1 text-sm rounded-md bg-neutral-100 dark:bg-ui-800 capitalize"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { title: "Verified Tag" }, [
                        tag.pivot.verified ? (openBlock(), createBlock("svg", {
                          key: 0,
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          class: "inline mr-1 rounded-full text-green-500 w-5 h-5"
                        }, [
                          createVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
                            "clip-rule": "evenodd"
                          })
                        ])) : createCommentVNode("", true)
                      ]),
                      createTextVNode(" " + toDisplayString(tag.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"]);
                }), 256)),
                createVNode(unref(Link$1), {
                  href: _ctx.route("levels.tags.show", __props.level),
                  class: "text-sm rounded hover:underline cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.level.tags.length === 0 ? "Submit" : "More") + "...", 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              createVNode("div", { class: "flex flex-col md:flex-row dark:bg-ui-950 dark:border dark:border-ui-900 rounded-lg p-4 lg:max-w-5xl xl:max-w-6xl w-full gap-4 my-4" }, [
                createVNode("div", { class: "y space-y-2 md:w-3/4" }, [
                  createVNode("div", { class: "x items-center justify-between" }, [
                    createVNode("h2", { class: "font-bold text-2xl" }, "Images"),
                    createVNode(unref(Link$1), {
                      href: _ctx.route("levels.images.show", __props.level.id),
                      class: "pane !py-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Submit")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  __props.level.images.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "pane"
                  }, "No images available. Add one?")) : (openBlock(), createBlock(_sfc_main$N, {
                    key: 1,
                    images: __props.level.images
                  }, null, 8, ["images"])),
                  createVNode("h2", { class: "font-bold text-2xl" }, "Reviews"),
                  _ctx.$page.props.auth ? (openBlock(), createBlock("form", {
                    key: 2,
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "y pane gap-4"
                  }, [
                    createVNode("div", { class: "space-y-2 w-full" }, [
                      createVNode("h2", { class: "text-xl" }, toDisplayString(props.review ? "Edit Your" : "Submit") + " Rating", 1),
                      createVNode("p", null, toDisplayString(unref(form).body), 1),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).body = $event,
                        class: "hidden resize-none resize-y w-full pane !bg-ui-800 border-none"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).body]
                      ]),
                      createVNode(_sfc_main$J, {
                        modelValue: unref(form).body,
                        "onUpdate:modelValue": ($event) => unref(form).body = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "w-full" }, [
                      createVNode("h2", null, "Gameplay Rating: " + toDisplayString(unref(form).rating_gameplay), 1),
                      withDirectives(createVNode("input", {
                        class: "w-full",
                        "onUpdate:modelValue": ($event) => unref(form).rating_gameplay = $event,
                        type: "range",
                        min: "0",
                        max: "10",
                        step: "1"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).rating_gameplay]
                      ]),
                      createVNode("h2", null, "Difficulty Rating: " + toDisplayString(unref(form).rating_difficulty), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).rating_difficulty = $event,
                        type: "range",
                        min: "0",
                        max: "100",
                        step: "1"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).rating_difficulty]
                      ]),
                      createVNode("h2", null, "Visuals Rating: " + toDisplayString(unref(form).rating_visuals), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).rating_visuals = $event,
                        type: "range",
                        min: "0",
                        max: "10",
                        step: "1"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).rating_visuals]
                      ]),
                      createVNode("h2", null, "Overall Rating: " + toDisplayString(unref(form).rating_overall), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).rating_overall = $event,
                        type: "range",
                        min: "0",
                        max: "10",
                        step: "1"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).rating_overall]
                      ])
                    ]),
                    createVNode(_sfc_main$1R, {
                      class: "w-fit",
                      onClick: submit
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.review ? "Edit Your" : "Submit") + " Rating", 1)
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])) : (openBlock(), createBlock("div", {
                    key: 3,
                    class: "y pane"
                  }, [
                    createVNode("h2", { class: "text-xl" }, [
                      createVNode(unref(Link$1), {
                        class: "underline",
                        href: _ctx.route("auth::login")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Log in")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createTextVNode(" to submit a review")
                    ])
                  ])),
                  __props.level.reviews.length === 0 ? (openBlock(), createBlock("div", {
                    key: 4,
                    class: "pane"
                  }, " This level has no reviews. Be the first! ")) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.level.reviews, (review) => {
                    return openBlock(), createBlock("div", { class: "x items-center pane" }, [
                      createVNode(_sfc_main$1D, {
                        class: "w-8 h-8 mr-4",
                        user: review.author
                      }, null, 8, ["user"]),
                      createVNode("div", { class: "y w-full" }, [
                        createVNode("div", { class: "x justify-between items-center space-x-2" }, [
                          createVNode("h2", null, [
                            createVNode(_sfc_main$10, {
                              user: review.author
                            }, null, 8, ["user"])
                          ]),
                          createVNode("span", null, toDisplayString(review.rating_overall) + "/5", 1)
                        ]),
                        createVNode("p", null, toDisplayString(review.review), 1)
                      ])
                    ]);
                  }), 256))
                ]),
                createVNode("div", { class: "y space-y-2 md:w-1/4" }, [
                  createVNode("div", { class: "w-full space-y-2" }, [
                    createVNode("h2", { class: "font-bold text-2xl" }, "Reviews"),
                    createVNode("div", { class: "flex items-center justify-center rounded-md px-4 py-2 bg-rose-500 text-white" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-5 h-5 mr-2"
                      }, [
                        createVNode("path", { d: "M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" }),
                        createVNode("path", { d: "M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" })
                      ])),
                      createVNode("span", { class: "font-bold cursor-pointer" }, "Download Level")
                    ]),
                    createVNode("div", { class: "x items-center justify-between" }, [
                      createVNode("h2", { class: "font-bold text-2xl" }, "Videos"),
                      createVNode("span", { class: "pane !py-1 cursor-pointer" }, "Submit")
                    ]),
                    __props.level.videos.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "pane"
                    }, " No videos available ")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.level.videos, (video) => {
                      return openBlock(), createBlock("div", { class: "pane" }, [
                        createVNode("iframe", {
                          class: "!w-full",
                          src: "https://www.youtube-nocookie.com/embed/" + video.video_id,
                          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                          allowfullscreen: ""
                        }, null, 8, ["src"])
                      ]);
                    }), 256))
                  ]),
                  createVNode("div", { class: "hidden md:block w-full space-y-2" }, [
                    createVNode("div", { class: "x items-center justify-between" }, [
                      createVNode("h2", { class: "font-bold text-2xl" }, "Replays"),
                      createVNode("span", { class: "pane !py-1 cursor-pointer" }, "Submit")
                    ]),
                    (openBlock(), createBlock("div", {
                      key: 0,
                      class: "pane"
                    }, "No replays available"))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Levels/Show.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const Show$1 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-1e079cf3"]]);
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$H = {
  __name: "Tags",
  __ssrInlineRender: true,
  props: {
    level: Object,
    tags: Array
  },
  setup(__props) {
    const props = __props;
    const dropdown = ref(null);
    const tagname = ref(null);
    const tags = ref(props.tags);
    const latestResponse = ref(null);
    const form = useForm({
      approved: true,
      tag_id: null
    });
    const addTag = () => {
      form.post(route("levels.tags.store", props.level.id), {
        onSuccess: () => {
          tagname.value = "";
          form.reset();
        }
      });
    };
    const vote = (tag_id, approve) => {
      form.approved = approve;
      form.tag_id = tag_id;
      addTag();
    };
    const searchTag = async () => {
      let time = Date.now();
      form.tag_id = null;
      fetch("/api/search?type=tag&name=" + tagname.value).then((res) => res.json()).then((data) => {
        if (latestResponse.value < time) {
          tags.value = data;
          dropdown.value.open = true;
        }
      });
    };
    const selectTag = (tag) => {
      form.tag_id = tag.id;
      tagname.value = tag.name;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("levels.show", __props.level.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.level.id)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.level.id), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Tags</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.route("levels.show", __props.level.id)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.level.id), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Tags")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 md:w-1/3"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Info</h2>`);
            if (_ctx.$page.props.auth) {
              _push2(`<form class="y pane space-y-2"${_scopeId}><div${_scopeId}><span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300"${_scopeId}>Tag</span>`);
              _push2(ssrRenderComponent(_sfc_main$1M, {
                onClick: ($event) => dropdown.value.open = true,
                onInput: searchTag,
                modelValue: tagname.value,
                "onUpdate:modelValue": ($event) => tagname.value = $event,
                class: "mt-1",
                type: "text",
                placeholder: "Tag"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(Dropdown, {
                align: "left",
                ref_key: "dropdown",
                ref: dropdown
              }, {
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<ul${_scopeId2}>`);
                    if (tags.value.length === 0) {
                      _push3(`<li class="px-4 py-1"${_scopeId2}>No Results</li>`);
                    } else {
                      _push3(`<!--[--><li class="text-sm italic bg-neutral-200 dark:bg-ui-800 px-2 border-b border-neutral-300 dark:border-ui-700"${_scopeId2}>You must click to select</li><!--[-->`);
                      ssrRenderList(tags.value, (tag) => {
                        _push3(`<li class="px-2 py-1 dark:hover:bg-ui-700 cursor-pointer"${_scopeId2}>${ssrInterpolate(tag.name)}</li>`);
                      });
                      _push3(`<!--]--><!--]-->`);
                    }
                    _push3(`</ul>`);
                  } else {
                    return [
                      createVNode("ul", null, [
                        tags.value.length === 0 ? (openBlock(), createBlock("li", {
                          key: 0,
                          class: "px-4 py-1"
                        }, "No Results")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("li", { class: "text-sm italic bg-neutral-200 dark:bg-ui-800 px-2 border-b border-neutral-300 dark:border-ui-700" }, "You must click to select"),
                          (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                            return openBlock(), createBlock("li", {
                              class: "px-2 py-1 dark:hover:bg-ui-700 cursor-pointer",
                              onClick: ($event) => selectTag(tag)
                            }, toDisplayString(tag.name), 9, ["onClick"]);
                          }), 256))
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (_ctx.$page.props.errorBags.default) {
                _push2(`<ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
                ssrRenderList(_ctx.$page.props.errors, (error, key) => {
                  _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Submit Tag`);
                  } else {
                    return [
                      createTextVNode("Submit Tag")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</form>`);
            } else {
              _push2(`<!---->`);
            }
            if (!_ctx.$page.props.auth) {
              _push2(`<p class="pane"${_scopeId}> You must be `);
              _push2(ssrRenderComponent(unref(Link$1), {
                href: _ctx.route("auth::login"),
                class: "underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`logged in`);
                  } else {
                    return [
                      createTextVNode("logged in")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` to add or vote on tags. </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="pane"${_scopeId}> Here you can vote on which tags do or don&#39;t fit a level by voting for or against them. </p><ul class="pane list-inside list-disc space-y-4"${_scopeId}><li${_scopeId}>The top rated tags will appear on the level&#39;s page.</li><li${_scopeId}>Site moderators can manually mark tags as &quot;verified.&quot;</li><li${_scopeId}>Tags with consistently low scores will periodically be pruned from the tag list completely</li><li${_scopeId}>Available tags are pre-approved by moderators. If you want to discuss the removal or addition of a tag, visit the level discussion forum.</li></ul></div><div class="y space-y-2 md:w-2/3"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Level Tags</h2><div class="y space-y-2"${_scopeId}>`);
            if (__props.level.tags.length === 0) {
              _push2(`<div class="pane"${_scopeId}>This level has no tags.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.level.tags, (tag) => {
              _push2(`<div class="x pane justify-between"${_scopeId}><div class="x items-center space-x-2"${_scopeId}>`);
              if (tag.pivot.verified) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="inline rounded-full text-green-500 w-5 h-5"${_scopeId}><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"${_scopeId}></path></svg>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h2${_scopeId}>${ssrInterpolate(tag.name)}</h2>`);
              if (_ctx.$page.props.auth) {
                _push2(`<!--[--><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cursor-pointer w-5 h-5"${_scopeId}><path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cursor-pointer w-5 h-5"${_scopeId}><path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"${_scopeId}></path></svg><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><span${_scopeId}>Score: ${ssrInterpolate(tag.pivot.score)}</span></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 md:w-1/3" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Info"),
                _ctx.$page.props.auth ? (openBlock(), createBlock("form", {
                  key: 0,
                  onSubmit: withModifiers(addTag, ["prevent"]),
                  class: "y pane space-y-2"
                }, [
                  createVNode("div", null, [
                    createVNode("span", { class: "block font-medium text-sm text-neutral-500 dark:text-neutral-300" }, "Tag"),
                    createVNode(_sfc_main$1M, {
                      onClick: ($event) => dropdown.value.open = true,
                      onInput: searchTag,
                      modelValue: tagname.value,
                      "onUpdate:modelValue": ($event) => tagname.value = $event,
                      class: "mt-1",
                      type: "text",
                      placeholder: "Tag"
                    }, null, 8, ["onClick", "modelValue", "onUpdate:modelValue"]),
                    createVNode(Dropdown, {
                      align: "left",
                      ref_key: "dropdown",
                      ref: dropdown
                    }, {
                      content: withCtx(() => [
                        createVNode("ul", null, [
                          tags.value.length === 0 ? (openBlock(), createBlock("li", {
                            key: 0,
                            class: "px-4 py-1"
                          }, "No Results")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode("li", { class: "text-sm italic bg-neutral-200 dark:bg-ui-800 px-2 border-b border-neutral-300 dark:border-ui-700" }, "You must click to select"),
                            (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                              return openBlock(), createBlock("li", {
                                class: "px-2 py-1 dark:hover:bg-ui-700 cursor-pointer",
                                onClick: ($event) => selectTag(tag)
                              }, toDisplayString(tag.name), 9, ["onClick"]);
                            }), 256))
                          ], 64))
                        ])
                      ]),
                      _: 1
                    }, 512)
                  ]),
                  _ctx.$page.props.errorBags.default ? (openBlock(), createBlock("ul", {
                    key: 0,
                    class: "mt-3 list-disc list-inside text-sm text-red-600"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                      return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode(_sfc_main$1R, { class: "w-fit" }, {
                    default: withCtx(() => [
                      createTextVNode("Submit Tag")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])) : createCommentVNode("", true),
                !_ctx.$page.props.auth ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: "pane"
                }, [
                  createTextVNode(" You must be "),
                  createVNode(unref(Link$1), {
                    href: _ctx.route("auth::login"),
                    class: "underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("logged in")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createTextVNode(" to add or vote on tags. ")
                ])) : createCommentVNode("", true),
                createVNode("p", { class: "pane" }, " Here you can vote on which tags do or don't fit a level by voting for or against them. "),
                createVNode("ul", { class: "pane list-inside list-disc space-y-4" }, [
                  createVNode("li", null, "The top rated tags will appear on the level's page."),
                  createVNode("li", null, 'Site moderators can manually mark tags as "verified."'),
                  createVNode("li", null, "Tags with consistently low scores will periodically be pruned from the tag list completely"),
                  createVNode("li", null, "Available tags are pre-approved by moderators. If you want to discuss the removal or addition of a tag, visit the level discussion forum.")
                ])
              ]),
              createVNode("div", { class: "y space-y-2 md:w-2/3" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Level Tags"),
                createVNode("div", { class: "y space-y-2" }, [
                  __props.level.tags.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "pane"
                  }, "This level has no tags.")) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.level.tags, (tag) => {
                    return openBlock(), createBlock("div", { class: "x pane justify-between" }, [
                      createVNode("div", { class: "x items-center space-x-2" }, [
                        tag.pivot.verified ? (openBlock(), createBlock("svg", {
                          key: 0,
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          class: "inline rounded-full text-green-500 w-5 h-5"
                        }, [
                          createVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
                            "clip-rule": "evenodd"
                          })
                        ])) : createCommentVNode("", true),
                        createVNode("h2", null, toDisplayString(tag.name), 1),
                        _ctx.$page.props.auth ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          (openBlock(), createBlock("svg", {
                            onClick: ($event) => vote(tag.id, false),
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            class: "cursor-pointer w-5 h-5"
                          }, [
                            createVNode("path", { d: "M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z" })
                          ], 8, ["onClick"])),
                          (openBlock(), createBlock("svg", {
                            onClick: ($event) => vote(tag.id, true),
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            class: "cursor-pointer w-5 h-5"
                          }, [
                            createVNode("path", { d: "M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" })
                          ], 8, ["onClick"]))
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", null, "Score: " + toDisplayString(tag.pivot.score), 1)
                      ])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Levels/Tags.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$H
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$G = defineComponent({
  components: {
    AppLayout,
    DocumentHead: Head,
    Link: Link$1
  },
  props: {
    tokens: Array
  },
  methods: {
    deleteToken(token) {
      axios.delete("/settings/connection/" + token);
      router.reload({ only: ["tokens"] });
    }
  }
});
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Linked Apps" }, null, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/connections",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`connections`);
            } else {
              return [
                createTextVNode("connections")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/connections",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("connections")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h6 class="mx-32"${_scopeId}>Linked Apps</h6>`);
        if (_ctx.tokens.length === 0) {
          _push2(`<span class="font bold"${_scopeId}>You have no apps connected.</span>`);
        } else {
          _push2(`<div class="flex flex-col space-y-4 text-center m-4"${_scopeId}><!--[-->`);
          ssrRenderList(_ctx.tokens, (token) => {
            _push2(`<div class="${ssrRenderClass([token.revoked ? "bg-gray-200" : "", "flex flex-row justify-between border-b border-gray-200 bg-gray-50 rounded px-2 py-1"])}"${_scopeId}><span class="${ssrRenderClass(token.revoked ? "text-gray-500" : "")}"${_scopeId}>${ssrInterpolate(token.client_name)}</span>`);
            if (token.revoked) {
              _push2(`<span class="text-red-800"${_scopeId}>REVOKED</span>`);
            } else {
              _push2(`<span class="text-red-500 hover:underline hover:cursor-pointer"${_scopeId}>Delete</span>`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div>`);
        }
        _push2(`<span class="underline text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span>`);
      } else {
        return [
          createVNode("h6", { class: "mx-32" }, "Linked Apps"),
          _ctx.tokens.length === 0 ? (openBlock(), createBlock("span", {
            key: 0,
            class: "font bold"
          }, "You have no apps connected.")) : (openBlock(), createBlock("div", {
            key: 1,
            class: "flex flex-col space-y-4 text-center m-4"
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tokens, (token) => {
              return openBlock(), createBlock("div", {
                class: ["flex flex-row justify-between border-b border-gray-200 bg-gray-50 rounded px-2 py-1", token.revoked ? "bg-gray-200" : ""]
              }, [
                createVNode("span", {
                  class: token.revoked ? "text-gray-500" : ""
                }, toDisplayString(token.client_name), 3),
                token.revoked ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-red-800"
                }, "REVOKED")) : (openBlock(), createBlock("span", {
                  key: 1,
                  onClick: ($event) => _ctx.deleteToken(token.id),
                  class: "text-red-500 hover:underline hover:cursor-pointer"
                }, "Delete", 8, ["onClick"]))
              ], 2);
            }), 256))
          ])),
          createVNode("span", { class: "underline text-center" }, [
            createVNode(_component_Link, { href: "/" }, {
              default: withCtx(() => [
                createTextVNode("Go Back")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Link/Connections.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const Connections = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["ssrRender", _sfc_ssrRender$g]]);
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Connections
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$F = defineComponent({
  props: ["jetstream", "app", "user", "errorBags", "errors"],
  components: {
    DocumentHead: Head,
    Link: Link$1
  },
  data() {
    return {
      home: false
    };
  }
});
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Home" }, null, _parent));
  _push(`<div class="bg-gray-100 p-4 min-h-screen flex justify-center items-center"><div class="h-fit"><div class="flex flex-col text-center shadow bg-white rounded-lg p-4 text-gray-600"><h1 class="text-lg font-bold">DashLink</h1>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div><footer class="flex flex-row justify-between text-gray-400 mt-1"><span>~/ `);
  _push(ssrRenderComponent(_component_Link, {
    class: "underline",
    href: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`dashlink`);
      } else {
        return [
          createTextVNode("dashlink")
        ];
      }
    }),
    _: 1
  }, _parent));
  ssrRenderSlot(_ctx.$slots, "breadcrumbs", {}, null, _push, _parent);
  _push(`</span>`);
  ssrRenderSlot(_ctx.$slots, "build", {}, null, _push, _parent);
  _push(`</footer></div></div><!--]-->`);
}
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Link/Layout.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const AppLayout$1 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["ssrRender", _sfc_ssrRender$f]]);
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AppLayout$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$E = defineComponent({
  components: {
    AppLayout: AppLayout$1,
    DocumentHead: Head,
    Link: Link$1
  },
  props: {
    clients: Array
  },
  methods: {
    requestClient(token) {
      axios.delete("/settings/connection/" + token);
      router.reload({ only: ["clients"] });
    }
  }
});
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Linked Apps" }, null, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/connections",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`connections`);
            } else {
              return [
                createTextVNode("connections")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/connections",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("connections")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h6 class="mx-32"${_scopeId}>Linked Apps</h6>`);
        if (_ctx.clients.length === 0) {
          _push2(`<span class="font bold"${_scopeId}>You have no clients connected.</span>`);
        } else {
          _push2(`<div class="flex flex-col space-y-4 text-center m-4"${_scopeId}><!--[-->`);
          ssrRenderList(_ctx.clients, (token) => {
            _push2(`<div class="${ssrRenderClass([token.revoked ? "bg-gray-200" : "", "flex flex-row justify-between border-b border-gray-200 bg-gray-50 rounded px-2 py-1"])}"${_scopeId}><span class="${ssrRenderClass(token.revoked ? "text-gray-500" : "")}"${_scopeId}>${ssrInterpolate(token.name)}</span>`);
            if (token.revoked) {
              _push2(`<span class="text-red-800"${_scopeId}>REVOKED</span>`);
            } else {
              _push2(`<span class="text-red-500 hover:underline hover:cursor-pointer"${_scopeId}>Delete</span>`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div>`);
        }
        _push2(`<span class="underline text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span>`);
      } else {
        return [
          createVNode("h6", { class: "mx-32" }, "Linked Apps"),
          _ctx.clients.length === 0 ? (openBlock(), createBlock("span", {
            key: 0,
            class: "font bold"
          }, "You have no clients connected.")) : (openBlock(), createBlock("div", {
            key: 1,
            class: "flex flex-col space-y-4 text-center m-4"
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.clients, (token) => {
              return openBlock(), createBlock("div", {
                class: ["flex flex-row justify-between border-b border-gray-200 bg-gray-50 rounded px-2 py-1", token.revoked ? "bg-gray-200" : ""]
              }, [
                createVNode("span", {
                  class: token.revoked ? "text-gray-500" : ""
                }, toDisplayString(token.name), 3),
                token.revoked ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-red-800"
                }, "REVOKED")) : (openBlock(), createBlock("span", {
                  key: 1,
                  onClick: ($event) => _ctx.deleteToken(token.id),
                  class: "text-red-500 hover:underline hover:cursor-pointer"
                }, "Delete", 8, ["onClick"]))
              ], 2);
            }), 256))
          ])),
          createVNode("span", { class: "underline text-center" }, [
            createVNode(_component_Link, { href: "/" }, {
              default: withCtx(() => [
                createTextVNode("Go Back")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Link/Developers.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const Developers = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["ssrRender", _sfc_ssrRender$e]]);
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Developers
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$D = defineComponent({
  components: {
    AppLayout: AppLayout$1,
    DocumentHead: Head,
    Link: Link$1
  }
});
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Home" }, null, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    build: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}><span${_scopeId}>build</span><span class="font-mono bg-white rounded-sm text-sm mx-1 px-1"${_scopeId}>undefined</span><span${_scopeId}>on</span><span class="font-mono bg-white rounded-sm text-sm mx-1 px-1"${_scopeId}>local</span></div>`);
      } else {
        return [
          createVNode("div", { style: { "display": "none" } }, [
            createVNode("span", null, "build"),
            createVNode("span", { class: "font-mono bg-white rounded-sm text-sm mx-1 px-1" }, "undefined"),
            createVNode("span", null, "on"),
            createVNode("span", { class: "font-mono bg-white rounded-sm text-sm mx-1 px-1" }, "local")
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h6 class="mx-16 italic"${_scopeId}>All-in-One Account for Everything GD</h6><div class="flex flex-col space-y-4 text-center m-4"${_scopeId}>`);
        if (!_ctx.$page.props.app.auth) {
          _push2(`<!--[-->`);
          _push2(ssrRenderComponent(_component_Link, {
            href: _ctx.route("auth::login"),
            class: "shadow bg-gray-50 rounded py-1"
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`Login`);
              } else {
                return [
                  createTextVNode("Login")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_Link, {
            href: _ctx.route("auth::register"),
            class: "shadow bg-gray-50 rounded py-1"
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`Register`);
              } else {
                return [
                  createTextVNode("Register")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`<!--]-->`);
        } else {
          _push2(`<!--[-->`);
          if (_ctx.$page.props.user.linked_accounts.length > 0) {
            _push2(`<!--[--><a target="_blank"${ssrRenderAttr("href", "http://profile.gd/" + _ctx.$page.props.user.linked_accounts[0].name)} class="underline"${_scopeId}>Visit Your Profile</a>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: "/settings/profile",
              class: "shadow bg-gray-50 rounded py-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Customize Profile`);
                } else {
                  return [
                    createTextVNode("Customize Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--]-->`);
          } else {
            _push2(`<!--[--><p${_scopeId}>Link your GD Account to get a custom profile page!</p>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: "/link",
              class: "shadow bg-gray-50 rounded py-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Link GD Account`);
                } else {
                  return [
                    createTextVNode("Link GD Account")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--]-->`);
          }
          _push2(`<div class="border-b border-gray-200 m-2"${_scopeId}></div>`);
          _push2(ssrRenderComponent(_component_Link, {
            href: "/settings/connections",
            class: "shadow bg-gray-50 rounded py-1"
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`Connected Apps`);
              } else {
                return [
                  createTextVNode("Connected Apps")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_Link, {
            href: "/settings",
            class: "shadow bg-gray-50 rounded py-1"
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`Settings`);
              } else {
                return [
                  createTextVNode("Settings")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`<!--]-->`);
        }
        _push2(`<span class="flex flex-row justify-evenly"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/help/faq",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`F.A.Q. / Help`);
            } else {
              return [
                createTextVNode("F.A.Q. / Help")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` | `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/help/terms",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Terms of Service`);
            } else {
              return [
                createTextVNode("Terms of Service")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` | `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/help/privacy",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Privacy Policy`);
            } else {
              return [
                createTextVNode("Privacy Policy")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span></div>`);
      } else {
        return [
          createVNode("h6", { class: "mx-16 italic" }, "All-in-One Account for Everything GD"),
          createVNode("div", { class: "flex flex-col space-y-4 text-center m-4" }, [
            !_ctx.$page.props.app.auth ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              createVNode(_component_Link, {
                href: _ctx.route("auth::login"),
                class: "shadow bg-gray-50 rounded py-1"
              }, {
                default: withCtx(() => [
                  createTextVNode("Login")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_component_Link, {
                href: _ctx.route("auth::register"),
                class: "shadow bg-gray-50 rounded py-1"
              }, {
                default: withCtx(() => [
                  createTextVNode("Register")
                ]),
                _: 1
              }, 8, ["href"])
            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
              _ctx.$page.props.user.linked_accounts.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("a", {
                  target: "_blank",
                  href: "http://profile.gd/" + _ctx.$page.props.user.linked_accounts[0].name,
                  class: "underline"
                }, "Visit Your Profile", 8, ["href"]),
                createVNode(_component_Link, {
                  href: "/settings/profile",
                  class: "shadow bg-gray-50 rounded py-1"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Customize Profile")
                  ]),
                  _: 1
                })
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("p", null, "Link your GD Account to get a custom profile page!"),
                createVNode(_component_Link, {
                  href: "/link",
                  class: "shadow bg-gray-50 rounded py-1"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Link GD Account")
                  ]),
                  _: 1
                })
              ], 64)),
              createVNode("div", { class: "border-b border-gray-200 m-2" }),
              createVNode(_component_Link, {
                href: "/settings/connections",
                class: "shadow bg-gray-50 rounded py-1"
              }, {
                default: withCtx(() => [
                  createTextVNode("Connected Apps")
                ]),
                _: 1
              }),
              createVNode(_component_Link, {
                href: "/settings",
                class: "shadow bg-gray-50 rounded py-1"
              }, {
                default: withCtx(() => [
                  createTextVNode("Settings")
                ]),
                _: 1
              })
            ], 64)),
            createVNode("span", { class: "flex flex-row justify-evenly" }, [
              createVNode(_component_Link, {
                href: "/help/faq",
                class: "underline"
              }, {
                default: withCtx(() => [
                  createTextVNode("F.A.Q. / Help")
                ]),
                _: 1
              }),
              createTextVNode(" | "),
              createVNode(_component_Link, {
                href: "/help/terms",
                class: "underline"
              }, {
                default: withCtx(() => [
                  createTextVNode("Terms of Service")
                ]),
                _: 1
              }),
              createTextVNode(" | "),
              createVNode(_component_Link, {
                href: "/help/privacy",
                class: "underline"
              }, {
                default: withCtx(() => [
                  createTextVNode("Privacy Policy")
                ]),
                _: 1
              })
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Link/Home.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["ssrRender", _sfc_ssrRender$d]]);
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$C = defineComponent({
  props: {
    page: Number
  },
  components: {
    InputError: _sfc_main$1K,
    AppLayout: AppLayout$1,
    DocumentHead: Head,
    Link: Link$1,
    JetLabel: _sfc_main$1J,
    JetInput: _sfc_main$1M
  },
  data() {
    var _a;
    return {
      page: (_a = this.$page.props.page) != null ? _a : 0,
      stage: [
        false,
        false,
        false
      ],
      form: this.$inertia.form({
        type: null,
        method: null,
        user: this.$page.props.user.id,
        code: "",
        username: "",
        password: ""
      }),
      usernameInput: "",
      passwordInput: "",
      formMessage: ""
    };
  },
  methods: {
    submit() {
      axios.post("/proxy/login", {
        username: this.form.username,
        password: this.form.password,
        user: this.form.user
      }).then((response) => {
        if (response.data.status === "success") {
          this.page = 3;
        } else {
          this.formMessage = `Login failed. Error: ${response.data.reason} Try again.`;
        }
      });
    }
  },
  watch: {
    usernameInput(val) {
      this.form.username = val;
      this.stage[2] = !!(val && this.form.password);
    },
    passwordInput(val) {
      this.form.password = val;
      this.stage[2] = !!(this.form.username && val);
    },
    loginResponse() {
    }
  }
});
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link", true);
  const _component_jet_label = resolveComponent("jet-label");
  const _component_jet_input = resolveComponent("jet-input");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Home" }, null, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/link",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`link`);
            } else {
              return [
                createTextVNode("link")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/link",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("link")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.page === 0) {
          _push2(`<div${_scopeId}>`);
          if (_ctx.stage[0]) {
            _push2(`<p class="mb-2"${_scopeId}>Click &#39;Next&#39; to proceed</p>`);
          } else {
            _push2(`<p class="mb-2"${_scopeId}>Choose your verification level before clicking &#39;Next&#39;</p>`);
          }
          _push2(`<div class="select-none flex flex-row space-x-4 max-w-xl"${_scopeId}><div class="flex flex-col border-2 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 p-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([_ctx.stage[0] ? "stroke-green-300" : "stroke-gray-700", "mx-auto h-16 w-16"])}" fill="none" viewBox="0 0 24 24" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"${_scopeId}></path></svg><span class="font-bold"${_scopeId}>Ownership Verification</span><p class="text-gray-400 text-sm"${_scopeId}>The simplest form of account linking. Allows third-party services to verify, via OAuth 2.0, GD account ownership only. Not edit or access other account data such as messages, statuses, settings, or save data. No passwords are stored anywhere.</p></div><div class="select-none flex flex-col justify-center border-2 border-gray-200 bg-gray-50 rounded-lg p-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 stroke-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"${_scopeId}></path></svg><span class="font-bold"${_scopeId}>Full Access <span class="text-red-500"${_scopeId}>(Unavailable)</span></span><p class="text-gray-400 text-sm"${_scopeId}>The highest level of account linking which both verifies ownership as well as allowing configurable read/write access to a GD account. Since this account type requires storing your GD account password it is only available to select testers at the moment.</p></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.page === 1) {
          _push2(`<div${_scopeId}>`);
          if (_ctx.stage[1]) {
            _push2(`<p class="mb-2"${_scopeId}>Click &#39;Next&#39; to proceed</p>`);
          } else {
            _push2(`<p class="mb-2"${_scopeId}>Choose your verification method before clicking &#39;Next&#39;</p>`);
          }
          _push2(`<div class="flex flex-row space-x-4 max-w-xl"${_scopeId}><div class="select-none hover:cursor-pointer flex flex-col border-2 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 p-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([_ctx.stage[1] ? "stroke-green-300" : "stroke-gray-700", "mx-auto h-16 w-16"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"${_scopeId}></path></svg><span class="font-bold"${_scopeId}>Password</span><p class="text-gray-400 text-sm"${_scopeId}>Enter your GD account username and password. This is the quickest and simplest way of linking your GD account. `);
          if (_ctx.form.type === 0) {
            _push2(`<!--[-->Since your verification level is set to Ownership Verification, we will NOT store your password. It will only be used to log into your GD account.<!--]-->`);
          } else {
            _push2(`<!--[-->Since your verification level is set to Full Access, will WILL store your GD account password in our database. It will be encrypted.<!--]-->`);
          }
          _push2(`</p></div><div class="select-none flex flex-col justify-center border-2 border-gray-200 bg-gray-50 rounded-lg p-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 stroke-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg><span class="font-bold"${_scopeId}>GD Message <span class="text-red-500"${_scopeId}>(Unavailable)</span></span><p class="text-gray-400 text-sm"${_scopeId}>This method may be slower and is prone to error. You will send a message with a special code to a GD account from the account you wish to link. If your account is being linked manually or with a staff member, choose this option.</p></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.page === 2) {
          _push2(`<div${_scopeId}><p class="mx-32"${_scopeId}>Enter your information</p><p class="text-red-500"${_scopeId}>${ssrInterpolate(_ctx.formMessage)}</p><form class="text-left mt-2" role="presentation" autocomplete="off"${_scopeId}><div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_jet_label, {
            for: "gdname",
            value: "GD Username"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_jet_input, {
            id: "gdname",
            type: "text",
            class: "mt-1 block w-full",
            modelValue: _ctx.usernameInput,
            "onUpdate:modelValue": ($event) => _ctx.usernameInput = $event,
            required: "",
            autofocus: "",
            autocomplete: "gd_licker"
          }, null, _parent2, _scopeId));
          _push2(`</div><div class="mt-2"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_jet_label, {
            for: "gdpass",
            value: "GD Password"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_jet_input, {
            id: "gdpass",
            type: "password",
            class: "mt-1 block w-full",
            modelValue: _ctx.passwordInput,
            "onUpdate:modelValue": ($event) => _ctx.passwordInput = $event,
            required: "",
            autofocus: "",
            autocomplete: "gd_tickler"
          }, null, _parent2, _scopeId));
          _push2(`</div></form></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.page === 3) {
          _push2(`<div${_scopeId}><p class="mx-32 text-green-400"${_scopeId}>Success! Your account ${ssrInterpolate(_ctx.form.username)} has been linked.</p><h6 class="underline text-center"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_Link, { href: "/" }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`Return Home`);
              } else {
                return [
                  createTextVNode("Return Home")
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</h6></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.page !== 3) {
          _push2(`<div class="mt-4 flex flex-row justify-between"${_scopeId}>`);
          if (_ctx.page !== 0) {
            _push2(`<button class="rounded bg-gray-100 py-1 px-2 shadow hover:shadow-md transition-shadow"${_scopeId}>&lt; Back</button>`);
          } else {
            _push2(`<button disabled class="rounded text-white py-1 px-2"${_scopeId}>&lt; Back</button>`);
          }
          _push2(`<span${_scopeId}>Step ${ssrInterpolate(_ctx.page + 1)}</span>`);
          if (_ctx.page === 2) {
            _push2(`<!--[-->`);
            if (_ctx.stage[2]) {
              _push2(`<button class="select-none rounded bg-green-400 text-white py-1 px-2"${_scopeId}>Finish</button>`);
            } else {
              _push2(`<button disabled class="rounded bg-gray-200 text-gray-400 py-1 px-2 shadow hover:shadow-md transition-shadow"${_scopeId}>Finish</button>`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!--[-->`);
            if (_ctx.stage[_ctx.page]) {
              _push2(`<button class="rounded bg-gray-100 py-1 px-2 shadow hover:shadow-md transition-shadow"${_scopeId}>Next &gt;</button>`);
            } else {
              _push2(`<button disabled class="rounded bg-gray-200 text-gray-400 py-1 px-2"${_scopeId}>Next &gt;</button>`);
            }
            _push2(`<!--]-->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          _ctx.page === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
            _ctx.stage[0] ? (openBlock(), createBlock("p", {
              key: 0,
              class: "mb-2"
            }, "Click 'Next' to proceed")) : (openBlock(), createBlock("p", {
              key: 1,
              class: "mb-2"
            }, "Choose your verification level before clicking 'Next'")),
            createVNode("div", { class: "select-none flex flex-row space-x-4 max-w-xl" }, [
              createVNode("div", {
                onClick: ($event) => {
                  _ctx.form.type = 0;
                  _ctx.stage[0] = true;
                },
                class: "flex flex-col border-2 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 p-4"
              }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: ["mx-auto h-16 w-16", _ctx.stage[0] ? "stroke-green-300" : "stroke-gray-700"],
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  })
                ], 2)),
                createVNode("span", { class: "font-bold" }, "Ownership Verification"),
                createVNode("p", { class: "text-gray-400 text-sm" }, "The simplest form of account linking. Allows third-party services to verify, via OAuth 2.0, GD account ownership only. Not edit or access other account data such as messages, statuses, settings, or save data. No passwords are stored anywhere.")
              ], 8, ["onClick"]),
              createVNode("div", { class: "select-none flex flex-col justify-center border-2 border-gray-200 bg-gray-50 rounded-lg p-4" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "mx-auto h-16 w-16 stroke-gray-500",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  })
                ])),
                createVNode("span", { class: "font-bold" }, [
                  createTextVNode("Full Access "),
                  createVNode("span", { class: "text-red-500" }, "(Unavailable)")
                ]),
                createVNode("p", { class: "text-gray-400 text-sm" }, "The highest level of account linking which both verifies ownership as well as allowing configurable read/write access to a GD account. Since this account type requires storing your GD account password it is only available to select testers at the moment.")
              ])
            ])
          ])) : createCommentVNode("", true),
          _ctx.page === 1 ? (openBlock(), createBlock("div", { key: 1 }, [
            _ctx.stage[1] ? (openBlock(), createBlock("p", {
              key: 0,
              class: "mb-2"
            }, "Click 'Next' to proceed")) : (openBlock(), createBlock("p", {
              key: 1,
              class: "mb-2"
            }, "Choose your verification method before clicking 'Next'")),
            createVNode("div", { class: "flex flex-row space-x-4 max-w-xl" }, [
              createVNode("div", {
                onClick: ($event) => {
                  _ctx.form.method = 0;
                  _ctx.stage[1] = true;
                },
                class: "select-none hover:cursor-pointer flex flex-col border-2 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 p-4"
              }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: ["mx-auto h-16 w-16", _ctx.stage[1] ? "stroke-green-300" : "stroke-gray-700"],
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  })
                ], 2)),
                createVNode("span", { class: "font-bold" }, "Password"),
                createVNode("p", { class: "text-gray-400 text-sm" }, [
                  createTextVNode("Enter your GD account username and password. This is the quickest and simplest way of linking your GD account. "),
                  _ctx.form.type === 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode("Since your verification level is set to Ownership Verification, we will NOT store your password. It will only be used to log into your GD account.")
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("Since your verification level is set to Full Access, will WILL store your GD account password in our database. It will be encrypted.")
                  ], 64))
                ])
              ], 8, ["onClick"]),
              createVNode("div", { class: "select-none flex flex-col justify-center border-2 border-gray-200 bg-gray-50 rounded-lg p-4" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "mx-auto h-16 w-16 stroke-gray-500",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  })
                ])),
                createVNode("span", { class: "font-bold" }, [
                  createTextVNode("GD Message "),
                  createVNode("span", { class: "text-red-500" }, "(Unavailable)")
                ]),
                createVNode("p", { class: "text-gray-400 text-sm" }, "This method may be slower and is prone to error. You will send a message with a special code to a GD account from the account you wish to link. If your account is being linked manually or with a staff member, choose this option.")
              ])
            ])
          ])) : createCommentVNode("", true),
          _ctx.page === 2 ? (openBlock(), createBlock("div", { key: 2 }, [
            createVNode("p", { class: "mx-32" }, "Enter your information"),
            createVNode("p", { class: "text-red-500" }, toDisplayString(_ctx.formMessage), 1),
            createVNode("form", {
              onSubmit: withModifiers(_ctx.submit, ["prevent"]),
              class: "text-left mt-2",
              role: "presentation",
              autocomplete: "off"
            }, [
              createVNode("div", null, [
                createVNode(_component_jet_label, {
                  for: "gdname",
                  value: "GD Username"
                }),
                createVNode(_component_jet_input, {
                  id: "gdname",
                  type: "text",
                  class: "mt-1 block w-full",
                  modelValue: _ctx.usernameInput,
                  "onUpdate:modelValue": ($event) => _ctx.usernameInput = $event,
                  required: "",
                  autofocus: "",
                  autocomplete: "gd_licker"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode("div", { class: "mt-2" }, [
                createVNode(_component_jet_label, {
                  for: "gdpass",
                  value: "GD Password"
                }),
                createVNode(_component_jet_input, {
                  id: "gdpass",
                  type: "password",
                  class: "mt-1 block w-full",
                  modelValue: _ctx.passwordInput,
                  "onUpdate:modelValue": ($event) => _ctx.passwordInput = $event,
                  required: "",
                  autofocus: "",
                  autocomplete: "gd_tickler"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ], 40, ["onSubmit"])
          ])) : createCommentVNode("", true),
          _ctx.page === 3 ? (openBlock(), createBlock("div", { key: 3 }, [
            createVNode("p", { class: "mx-32 text-green-400" }, "Success! Your account " + toDisplayString(_ctx.form.username) + " has been linked.", 1),
            createVNode("h6", { class: "underline text-center" }, [
              createVNode(_component_Link, { href: "/" }, {
                default: withCtx(() => [
                  createTextVNode("Return Home")
                ]),
                _: 1
              })
            ])
          ])) : createCommentVNode("", true),
          _ctx.page !== 3 ? (openBlock(), createBlock("div", {
            key: 4,
            class: "mt-4 flex flex-row justify-between"
          }, [
            _ctx.page !== 0 ? (openBlock(), createBlock("button", {
              key: 0,
              onClick: ($event) => _ctx.page--,
              class: "rounded bg-gray-100 py-1 px-2 shadow hover:shadow-md transition-shadow"
            }, "< Back", 8, ["onClick"])) : (openBlock(), createBlock("button", {
              key: 1,
              disabled: "",
              class: "rounded text-white py-1 px-2"
            }, "< Back")),
            createVNode("span", null, "Step " + toDisplayString(_ctx.page + 1), 1),
            _ctx.page === 2 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
              _ctx.stage[2] ? (openBlock(), createBlock("button", {
                key: 0,
                onClick: _ctx.submit,
                class: "select-none rounded bg-green-400 text-white py-1 px-2"
              }, "Finish", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                key: 1,
                disabled: "",
                class: "rounded bg-gray-200 text-gray-400 py-1 px-2 shadow hover:shadow-md transition-shadow"
              }, "Finish"))
            ], 64)) : (openBlock(), createBlock(Fragment, { key: 3 }, [
              _ctx.stage[_ctx.page] ? (openBlock(), createBlock("button", {
                key: 0,
                onClick: ($event) => _ctx.page++,
                class: "rounded bg-gray-100 py-1 px-2 shadow hover:shadow-md transition-shadow"
              }, "Next >", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                key: 1,
                disabled: "",
                class: "rounded bg-gray-200 text-gray-400 py-1 px-2"
              }, "Next >"))
            ], 64))
          ])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Link/Link.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const Link = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["ssrRender", _sfc_ssrRender$c]]);
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Link
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = defineComponent({
  components: {
    Link: Link$1,
    DocumentHead: Head
  },
  props: {
    profile: Object
  }
});
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "flex flex-col justify-center items-center min-h-screen",
    style: { "background": "linear-gradient(#004A63, #00222D)" }
  }, _attrs))}><div class="flex flex-col space-y-4 rounded-lg p-4 text-white" style="${ssrRenderStyle({ "background-color": "rgba(0, 0, 0, 0.6)" })}"><h1 class="font-bold text-3xl">${ssrInterpolate(_ctx.profile.username)}</h1>`);
  if (!!_ctx.profile.plus) {
    _push(`<!--[-->`);
    if (_ctx.profile.plus.bio) {
      _push(`<p class="rounded p-2" style="${ssrRenderStyle({ "background-color": "rgba(255, 255, 255, 0.25)" })}">${ssrInterpolate(_ctx.profile.plus.bio)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="flex flex-row space-x-4 justify-center">`);
    if (_ctx.profile.plus.pronouns) {
      _push(`<span class="flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(_ctx.profile.plus.pronouns)}</span>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.profile.plus.location) {
      _push(`<span class="flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> ${ssrInterpolate(_ctx.profile.plus.location)}</span>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.profile.plus.website) {
      _push(`<span class="flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg> ${ssrInterpolate(_ctx.profile.plus.website)}</span>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.profile.plus.discord) {
      _push(`<span class="flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg> ${ssrInterpolate(_ctx.profile.plus.discord)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="flex flex-row justify-between">`);
  if (_ctx.profile.plus.video) {
    _push(`<iframe src="https://www.youtube-nocookie.com/embed/gzF7aHxk4Y4" title="YouTube" frameborder="0" allow="clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<img style="${ssrRenderStyle({ "height": "200px" })}" alt="card"${ssrRenderAttr("src", "https://i.profile.gd/" + _ctx.profile.username + ".png")}></div></div>`);
  _push(ssrRenderComponent(_component_document_head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.profile.username)}</title><meta property="og:title"${ssrRenderAttr("content", _ctx.profile.username + "'s Profile")}${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:url"${ssrRenderAttr("content", "https://profile.gd/" + _ctx.profile.username)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", "https://i.profile.gd/" + _ctx.profile.username.toLowerCase() + ".png")}${_scopeId}>`);
        if (!!_ctx.profile.plus.bio) {
          _push2(`<meta property="og:description"${ssrRenderAttr("content", _ctx.profile.plus.bio)}${_scopeId}>`);
        } else {
          _push2(`<meta property="og:description"${ssrRenderAttr("content", "This user has no bio")}${_scopeId}>`);
        }
        _push2(`<meta name="twitter:card" content="summary_large_image"${_scopeId}>`);
      } else {
        return [
          createVNode("title", null, toDisplayString(_ctx.profile.username), 1),
          createVNode("meta", {
            property: "og:title",
            content: _ctx.profile.username + "'s Profile"
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:type",
            content: "website"
          }),
          createVNode("meta", {
            property: "og:url",
            content: "https://profile.gd/" + _ctx.profile.username
          }, null, 8, ["content"]),
          createVNode("meta", {
            property: "og:image",
            content: "https://i.profile.gd/" + _ctx.profile.username.toLowerCase() + ".png"
          }, null, 8, ["content"]),
          !!_ctx.profile.plus.bio ? (openBlock(), createBlock("meta", {
            key: 0,
            property: "og:description",
            content: _ctx.profile.plus.bio
          }, null, 8, ["content"])) : (openBlock(), createBlock("meta", {
            key: 1,
            property: "og:description",
            content: "This user has no bio"
          })),
          createVNode("meta", {
            name: "twitter:card",
            content: "summary_large_image"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Link/Profile.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const Profile$1 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["ssrRender", _sfc_ssrRender$b]]);
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "ResourceTicket",
  __ssrInlineRender: true,
  props: {
    mod: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link$1), mergeProps({
        href: _ctx.route("mods.show", __props.mod)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y rounded !p-0 overflow-hidden relative hover:shadow-lg transition-shadow delay-0"${_scopeId}><div class="x bg-neutral-300/60 dark:bg-ui-900 justify-center py-8 bg-center bg-cover" style="${ssrRenderStyle(`background-image:url('${__props.mod.banner_url}');`)}"${_scopeId}><div class="${ssrRenderClass([{ "invisible": __props.mod.banner_url }, "bg-neutral-100/60 dark:bg-ui-800 !bg-opacity-60 rounded-full p-8"])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"${_scopeId}></path></svg></div></div><div class="bg-white/60 dark:bg-ui-800 w-full"${_scopeId}><div class="px-4 py-2"${_scopeId}><div class="x items-center"${_scopeId}><h2 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.mod.name)}</h2><span style="${ssrRenderStyle(Math.floor(Math.random() * 2) === 0 ? null : { display: "none" })}" class="x ml-2 items-center font-bold text-green-400 bg-neutral-200 dark:bg-ui-900 rounded-full px-2 aspect-square"${_scopeId}>$</span></div><p class="text-lg"${_scopeId}>${ssrInterpolate(__props.mod.author)}</p><div${_scopeId}><span class="rounded bg-neutral-200 dark:bg-ui-900 text-sm px-2 py-0.5"${_scopeId}>Standalone</span></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "y rounded !p-0 overflow-hidden relative hover:shadow-lg transition-shadow delay-0" }, [
                createVNode("div", {
                  class: "x bg-neutral-300/60 dark:bg-ui-900 justify-center py-8 bg-center bg-cover",
                  style: `background-image:url('${__props.mod.banner_url}');`
                }, [
                  createVNode("div", {
                    class: [{ "invisible": __props.mod.banner_url }, "bg-neutral-100/60 dark:bg-ui-800 !bg-opacity-60 rounded-full p-8"]
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      class: "w-16 h-16"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                      })
                    ]))
                  ], 2)
                ], 4),
                createVNode("div", { class: "bg-white/60 dark:bg-ui-800 w-full" }, [
                  createVNode("div", { class: "px-4 py-2" }, [
                    createVNode("div", { class: "x items-center" }, [
                      createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(__props.mod.name), 1),
                      withDirectives(createVNode("span", { class: "x ml-2 items-center font-bold text-green-400 bg-neutral-200 dark:bg-ui-900 rounded-full px-2 aspect-square" }, "$", 512), [
                        [vShow, Math.floor(Math.random() * 2) === 0]
                      ])
                    ]),
                    createVNode("p", { class: "text-lg" }, toDisplayString(__props.mod.author), 1),
                    createVNode("div", null, [
                      createVNode("span", { class: "rounded bg-neutral-200 dark:bg-ui-900 text-sm px-2 py-0.5" }, "Standalone")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResourceTicket.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const Index_vue_vue_type_style_index_0_lang = "";
const _sfc_main$z = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    mods: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    ref(null);
    let sortBy = props.filters.sortBy;
    const sortByNames = [
      "ID",
      "Rating",
      "Download Count",
      "Review Count"
    ];
    let sortDir = props.filters.sortDir;
    const sortDirNames = [
      "Descending",
      "Ascending"
    ];
    let filter = props.filters.filter;
    const filterNames = [
      "All",
      "Reviewed",
      "Purchased"
    ];
    function setSortBy(value) {
      sortBy = value;
      search();
    }
    function setSortDir(value) {
      sortDir = value;
      search();
    }
    function setFilter(value) {
      filter = value;
      search();
    }
    const search = () => {
      router.get(route$1("mods.index") + "?" + new URLSearchParams({
        sortBy,
        sortDir,
        filter
      }).toString());
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Mods" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("mods.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Mods`);
                } else {
                  return [
                    createTextVNode("Mods")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("mods.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Mods")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-full"${_scopeId}><div class="x justify-between items-center"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Mods</h2><div class="x space-x-4 items-center"${_scopeId}><div class="x space-x-2 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize"${_scopeId2}>${ssrInterpolate(sortByNames[unref(sortBy)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", { class: "capitalize" }, toDisplayString(sortByNames[unref(sortBy)]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"${_scopeId2}>ID</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"${_scopeId2}>Rating</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"${_scopeId2}>Downloads</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"${_scopeId2}>Review Count</div>`);
                } else {
                  return [
                    createVNode("div", {
                      onClick: ($event) => setSortBy(0),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"
                    }, "ID", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(1),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"
                    }, "Rating", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(2),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"
                    }, "Downloads", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(5),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"
                    }, "Review Count", 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (_ctx.$page.props.auth) {
              _push2(`<div class="x space-x-2 items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
                trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize"${_scopeId2}>${ssrInterpolate(filterNames[unref(filter)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                        createVNode("span", { class: "capitalize" }, toDisplayString(filterNames[unref(filter)]), 1),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]))
                      ])
                    ];
                  }
                }),
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"${_scopeId2}>All</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"${_scopeId2}>Reviewed</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"${_scopeId2}>Unreviewed</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        onClick: ($event) => setFilter(0),
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"
                      }, "All", 8, ["onClick"]),
                      createVNode("div", {
                        onClick: ($event) => setFilter(1),
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"
                      }, "Reviewed", 8, ["onClick"]),
                      createVNode("div", {
                        onClick: ($event) => setFilter(2),
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"
                      }, "Unreviewed", 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="x space-x-2 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(sortDirNames[unref(sortDir)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", null, toDisplayString(sortDirNames[unref(sortDir)]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"${_scopeId2}>Descending</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"${_scopeId2}>Ascending</div>`);
                } else {
                  return [
                    createVNode("div", {
                      onClick: ($event) => setSortDir(0),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"
                    }, "Descending", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortDir(1),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"
                    }, "Ascending", 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.mods }, null, _parent2, _scopeId));
            if (__props.mods.total === 0) {
              _push2(`<div class="pane italic"${_scopeId}><span class="opacity-50"${_scopeId}>No mods here, chief.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${ssrRenderAttrs({
              "enter-from-class": "opacity-0 -translate-x-6",
              "enter-to-class": "opacity-100 translate-x-0",
              appear: "",
              name: "fade",
              class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            })}>`);
            ssrRenderList(__props.mods.data, (mod, index) => {
              _push2(ssrRenderComponent(_sfc_main$A, {
                mod,
                class: "col-span-1",
                key: mod.id,
                style: `transition-delay: ${index * 65}ms;`
              }, null, _parent2, _scopeId));
            });
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.mods }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-full" }, [
                createVNode("div", { class: "x justify-between items-center" }, [
                  createVNode("h2", { class: "font-bold text-2xl" }, "Mods"),
                  createVNode("div", { class: "x space-x-4 items-center" }, [
                    createVNode("div", { class: "x space-x-2 items-center" }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize" }, toDisplayString(sortByNames[unref(sortBy)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setSortBy(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"
                          }, "ID", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"
                          }, "Rating", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(2),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"
                          }, "Downloads", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(5),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"
                          }, "Review Count", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _ctx.$page.props.auth ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "x space-x-2 items-center"
                    }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize" }, toDisplayString(filterNames[unref(filter)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setFilter(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"
                          }, "All", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setFilter(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700"
                          }, "Reviewed", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setFilter(2),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"
                          }, "Unreviewed", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "x space-x-2 items-center" }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", null, toDisplayString(sortDirNames[unref(sortDir)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setSortDir(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t"
                          }, "Descending", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortDir(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b"
                          }, "Ascending", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode(_sfc_main$1t, { list: __props.mods }, null, 8, ["list"]),
                __props.mods.total === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pane italic"
                }, [
                  createVNode("span", { class: "opacity-50" }, "No mods here, chief.")
                ])) : createCommentVNode("", true),
                createVNode(TransitionGroup, {
                  "enter-from-class": "opacity-0 -translate-x-6",
                  "enter-to-class": "opacity-100 translate-x-0",
                  appear: "",
                  name: "fade",
                  tag: "div",
                  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.mods.data, (mod, index) => {
                      return openBlock(), createBlock(_sfc_main$A, {
                        mod,
                        class: "col-span-1",
                        key: mod.id,
                        style: `transition-delay: ${index * 65}ms;`
                      }, null, 8, ["mod", "style"]);
                    }), 128))
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$1t, { list: __props.mods }, null, 8, ["list"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Mods/Index.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    mod: Object,
    review: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      rating_gameplay: props.review ? props.review.rating_gameplay : 5,
      rating_difficulty: props.review ? props.review.rating_difficulty : 5,
      rating_visuals: props.review ? props.review.rating_visuals : 5,
      rating_overall: props.review ? props.review.rating_overall : 5,
      body: props.review ? props.review.review : "",
      mod_id: props.mod.id
    });
    const submit = () => {
      form.post(route$1("reviews.store"), {
        preserveScroll: true
      });
    };
    const post = ref({
      id: 1,
      author_id: 1,
      user: {
        id: 1,
        name: 0
      },
      body: "<p>Welcome the the world famous Sum Attempts mod</p><blockquote>The best mod on da market<br/>&mdash; yer baby</blockquote><p><b>so water you waiting for? throw money at your screen already!</b></p>",
      media: [],
      reactions: [
        {
          id: 1,
          reacter_id: 1,
          reacter: {
            id: 1,
            name: "Admin"
          },
          created_at: "2023-03-17T00:01:02.000000Z"
        }
      ],
      created_at: "2023-03-17T00:01:02.000000Z",
      updated_at: "2023-03-17T00:01:02.000000Z"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Mods" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("mods.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Mods`);
                } else {
                  return [
                    createTextVNode("Mods")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("mods.show", __props.mod)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.mod.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.mod.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("mods.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Mods")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode(unref(Link$1), {
                href: unref(route$1)("mods.show", __props.mod)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.mod.name), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 md:w-3/4"${_scopeId}><div class="x items-center justify-between"${_scopeId}><div class="x items-center gap-2"${_scopeId}><span class="p-6 bg-blue-500 rounded-full"${_scopeId}></span><div class="y"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.mod.name)}<span class="opacity-50 text-lg ml-2"${_scopeId}>1.0.0</span></h1><span class="text-sm"${_scopeId}>${ssrInterpolate(__props.mod.blurb)}</span></div></div><div class="y cursor-pointer items-center leading-none rounded h-fit bg-white/60 dark:bg-neutral-900/60 px-3 py-1"${_scopeId}><span class="font-bold text-sm"${_scopeId}>Download Now</span><span class="text-xs -mt-1"${_scopeId}>12.83 KB .geode</span></div></div><div${_scopeId}><div class="x space-x-1 px-4"${_scopeId}><div class="bg-white/60 dark:bg-neutral-900/60 px-2 py-1 rounded-t text-sm"${_scopeId}>Content</div><div class="bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm"${_scopeId}>Files</div><div class="bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm"${_scopeId}>Updates (4)</div><div class="bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm"${_scopeId}>Reviews (70)</div><div class="bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm"${_scopeId}>Discussion</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$K, {
              class: "border-none",
              postbit: false,
              user: post.value.user,
              post: post.value
            }, null, _parent2, _scopeId));
            _push2(`</div><h2 class="font-bold text-2xl"${_scopeId}>Images</h2>`);
            {
              _push2(ssrRenderComponent(_sfc_main$N, {
                images: [{ url: __props.mod.banner_url }]
              }, null, _parent2, _scopeId));
            }
            _push2(`<h2 class="font-bold text-2xl"${_scopeId}>Reviews</h2>`);
            if (_ctx.$page.props.auth) {
              _push2(`<form class="x pane gap-4"${_scopeId}><div class="space-y-2 w-full"${_scopeId}><div class="x justify-between"${_scopeId}><h2 class="text-xl"${_scopeId}>${ssrInterpolate(props.review ? "Edit Your" : "Submit")} Rating</h2><div class="relative whitespace-nowrap h-fit"${_scopeId}><div class="x"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"${_scopeId}><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"${_scopeId}><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"${_scopeId}><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"${_scopeId}></path></svg></div><input class="opacity-50 w-full absolute bottom-0"${ssrRenderAttr("value", unref(form).rating_overall)} type="range" min="0" max="10" step="1"${_scopeId}></div></div><textarea class="resize-none resize-y w-full pane border-none"${_scopeId}>${ssrInterpolate(unref(form).body)}</textarea>`);
              _push2(ssrRenderComponent(_sfc_main$1R, {
                class: "w-fit",
                onClick: submit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.review ? "Edit Your" : "Submit")} Rating`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.review ? "Edit Your" : "Submit") + " Rating", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else {
              _push2(`<div class="y pane"${_scopeId}><h2 class="text-xl"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link$1), {
                class: "underline",
                href: unref(route$1)("auth::login")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Log in`);
                  } else {
                    return [
                      createTextVNode("Log in")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` to submit a review</h2></div>`);
            }
            {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList([], (review) => {
              _push2(`<div class="x items-center pane"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                class: "w-8 h-8 mr-4",
                user: review.author
              }, null, _parent2, _scopeId));
              _push2(`<div class="y w-full"${_scopeId}><div class="x justify-between items-center space-x-2"${_scopeId}><h2${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$10, {
                user: review.author
              }, null, _parent2, _scopeId));
              _push2(`</h2><span${_scopeId}>${ssrInterpolate(review.rating_overall / 2)}/5</span></div><p${_scopeId}>${ssrInterpolate(review.review)}</p></div></div>`);
            });
            _push2(`<!--]--></div><div class="y space-y-2 md:w-1/4"${_scopeId}><span class="font-bold text-2xl"${_scopeId}>Author</span><div class="x space-x-4 items-center pane"${_scopeId}><span class="p-6 bg-blue-500 rounded-full"${_scopeId}></span><span class="text-2xl"${_scopeId}>${ssrInterpolate(__props.mod.author)}</span></div><div class="pane text-sm space-y-1"${_scopeId}><div class="flex justify-between text-sm"${_scopeId}><span${_scopeId}>Ratings:</span><div class="x items-center text-sm"${_scopeId}><span class="mr-1"${_scopeId}>(33)</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"${_scopeId}></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"${_scopeId}></path></svg></div></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Price:</span><span${_scopeId}>FREE</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Downloads:</span><span${_scopeId}>194</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Views:</span><span${_scopeId}>1.2k</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Last Updated:</span><span${_scopeId}>09/09/2022</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>First Created:</span><span${_scopeId}>09/09/2022</span></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$_, null, null, _parent2, _scopeId));
            _push2(`<div class="x items-center pane"${_scopeId}><a href="#" class="mr-1 underline"${_scopeId}>Documentation</a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"${_scopeId}></path><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"${_scopeId}></path></svg></div><div class="x items-center pane"${_scopeId}><a href="#" class="mr-1 underline"${_scopeId}>Source Code</a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"${_scopeId}></path><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"${_scopeId}></path></svg></div><div class="x items-center pane"${_scopeId}><a href="#" class="mr-1 underline"${_scopeId}>Support</a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"${_scopeId}></path><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"${_scopeId}></path></svg></div><div class="x items-center pane"${_scopeId}><a href="#" class="mr-1 underline"${_scopeId}>Issues/Bug Reports</a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"${_scopeId}></path><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"${_scopeId}></path></svg></div></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 md:w-3/4" }, [
                createVNode("div", { class: "x items-center justify-between" }, [
                  createVNode("div", { class: "x items-center gap-2" }, [
                    createVNode("span", { class: "p-6 bg-blue-500 rounded-full" }),
                    createVNode("div", { class: "y" }, [
                      createVNode("h1", { class: "text-2xl font-bold" }, [
                        createTextVNode(toDisplayString(__props.mod.name), 1),
                        createVNode("span", { class: "opacity-50 text-lg ml-2" }, "1.0.0")
                      ]),
                      createVNode("span", { class: "text-sm" }, toDisplayString(__props.mod.blurb), 1)
                    ])
                  ]),
                  createVNode("div", { class: "y cursor-pointer items-center leading-none rounded h-fit bg-white/60 dark:bg-neutral-900/60 px-3 py-1" }, [
                    createVNode("span", { class: "font-bold text-sm" }, "Download Now"),
                    createVNode("span", { class: "text-xs -mt-1" }, "12.83 KB .geode")
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "x space-x-1 px-4" }, [
                    createVNode("div", { class: "bg-white/60 dark:bg-neutral-900/60 px-2 py-1 rounded-t text-sm" }, "Content"),
                    createVNode("div", { class: "bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm" }, "Files"),
                    createVNode("div", { class: "bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm" }, "Updates (4)"),
                    createVNode("div", { class: "bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm" }, "Reviews (70)"),
                    createVNode("div", { class: "bg-neutral-100/60 dark:bg-neutral-800/60 px-2 py-1 rounded-t text-sm" }, "Discussion")
                  ]),
                  createVNode(_sfc_main$K, {
                    class: "border-none",
                    postbit: false,
                    user: post.value.user,
                    post: post.value
                  }, null, 8, ["user", "post"])
                ]),
                createVNode("h2", { class: "font-bold text-2xl" }, "Images"),
                (openBlock(), createBlock(_sfc_main$N, {
                  key: 1,
                  images: [{ url: __props.mod.banner_url }]
                }, null, 8, ["images"])),
                createVNode("h2", { class: "font-bold text-2xl" }, "Reviews"),
                _ctx.$page.props.auth ? (openBlock(), createBlock("form", {
                  key: 2,
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "x pane gap-4"
                }, [
                  createVNode("div", { class: "space-y-2 w-full" }, [
                    createVNode("div", { class: "x justify-between" }, [
                      createVNode("h2", { class: "text-xl" }, toDisplayString(props.review ? "Edit Your" : "Submit") + " Rating", 1),
                      createVNode("div", { class: "relative whitespace-nowrap h-fit" }, [
                        createVNode("div", { class: "x" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            class: "w-6 h-6"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            class: "w-6 h-6"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            class: "w-6 h-6"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "w-6 h-6"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            })
                          ])),
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "w-6 h-6"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            })
                          ]))
                        ]),
                        withDirectives(createVNode("input", {
                          class: "opacity-50 w-full absolute bottom-0",
                          "onUpdate:modelValue": ($event) => unref(form).rating_overall = $event,
                          type: "range",
                          min: "0",
                          max: "10",
                          step: "1"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).rating_overall]
                        ])
                      ])
                    ]),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).body = $event,
                      class: "resize-none resize-y w-full pane border-none"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).body]
                    ]),
                    createVNode(_sfc_main$1R, {
                      class: "w-fit",
                      onClick: submit
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.review ? "Edit Your" : "Submit") + " Rating", 1)
                      ]),
                      _: 1
                    })
                  ])
                ], 40, ["onSubmit"])) : (openBlock(), createBlock("div", {
                  key: 3,
                  class: "y pane"
                }, [
                  createVNode("h2", { class: "text-xl" }, [
                    createVNode(unref(Link$1), {
                      class: "underline",
                      href: unref(route$1)("auth::login")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Log in")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createTextVNode(" to submit a review")
                  ])
                ])),
                createCommentVNode("", true),
                (openBlock(), createBlock(Fragment, null, renderList([], (review) => {
                  return createVNode("div", { class: "x items-center pane" }, [
                    createVNode(_sfc_main$1D, {
                      class: "w-8 h-8 mr-4",
                      user: review.author
                    }, null, 8, ["user"]),
                    createVNode("div", { class: "y w-full" }, [
                      createVNode("div", { class: "x justify-between items-center space-x-2" }, [
                        createVNode("h2", null, [
                          createVNode(_sfc_main$10, {
                            user: review.author
                          }, null, 8, ["user"])
                        ]),
                        createVNode("span", null, toDisplayString(review.rating_overall / 2) + "/5", 1)
                      ]),
                      createVNode("p", null, toDisplayString(review.review), 1)
                    ])
                  ]);
                }), 64))
              ]),
              createVNode("div", { class: "y space-y-2 md:w-1/4" }, [
                createVNode("span", { class: "font-bold text-2xl" }, "Author"),
                createVNode("div", { class: "x space-x-4 items-center pane" }, [
                  createVNode("span", { class: "p-6 bg-blue-500 rounded-full" }),
                  createVNode("span", { class: "text-2xl" }, toDisplayString(__props.mod.author), 1)
                ]),
                createVNode("div", { class: "pane text-sm space-y-1" }, [
                  createVNode("div", { class: "flex justify-between text-sm" }, [
                    createVNode("span", null, "Ratings:"),
                    createVNode("div", { class: "x items-center text-sm" }, [
                      createVNode("span", { class: "mr-1" }, "(33)"),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-4 h-4"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-4 h-4"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-4 h-4"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-4 h-4"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-4 h-4"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", null, "Price:"),
                    createVNode("span", null, "FREE")
                  ]),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", null, "Downloads:"),
                    createVNode("span", null, "194")
                  ]),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", null, "Views:"),
                    createVNode("span", null, "1.2k")
                  ]),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", null, "Last Updated:"),
                    createVNode("span", null, "09/09/2022")
                  ]),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", null, "First Created:"),
                    createVNode("span", null, "09/09/2022")
                  ])
                ]),
                createVNode(_sfc_main$_),
                createVNode("div", { class: "x items-center pane" }, [
                  createVNode("a", {
                    href: "#",
                    class: "mr-1 underline"
                  }, "Documentation"),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-4 h-4"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z",
                      "clip-rule": "evenodd"
                    }),
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ]),
                createVNode("div", { class: "x items-center pane" }, [
                  createVNode("a", {
                    href: "#",
                    class: "mr-1 underline"
                  }, "Source Code"),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-4 h-4"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z",
                      "clip-rule": "evenodd"
                    }),
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ]),
                createVNode("div", { class: "x items-center pane" }, [
                  createVNode("a", {
                    href: "#",
                    class: "mr-1 underline"
                  }, "Support"),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-4 h-4"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z",
                      "clip-rule": "evenodd"
                    }),
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ]),
                createVNode("div", { class: "x items-center pane" }, [
                  createVNode("a", {
                    href: "#",
                    class: "mr-1 underline"
                  }, "Issues/Bug Reports"),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-4 h-4"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z",
                      "clip-rule": "evenodd"
                    }),
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Mods/Show.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const playlist = useForm({
      title: "",
      description: ""
    });
    const submitPlaylist = () => {
      playlist.post(route$1("playlists.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Create Playlist" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("playlists.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Playlists`);
                } else {
                  return [
                    createTextVNode("Playlists")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Create</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("playlists.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Playlists")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Create")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="y space-y-4 md:w-3/4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Create a New Playlist</h2><form class="y pane space-y-2"${_scopeId}><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Name</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(playlist).title,
              "onUpdate:modelValue": ($event) => unref(playlist).title = $event,
              type: "text",
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Short Description</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(playlist).description,
              "onUpdate:modelValue": ($event) => unref(playlist).description = $event,
              type: "text",
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create Playlist`);
                } else {
                  return [
                    createTextVNode("Create Playlist")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "y space-y-4 md:w-3/4" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Create a New Playlist"),
                  createVNode("form", {
                    onSubmit: withModifiers(submitPlaylist, ["prevent"]),
                    class: "y pane space-y-2"
                  }, [
                    createVNode("label", { class: "y" }, [
                      createVNode("span", { class: "my-1" }, "Name"),
                      createVNode(_sfc_main$1M, {
                        modelValue: unref(playlist).title,
                        "onUpdate:modelValue": ($event) => unref(playlist).title = $event,
                        type: "text",
                        placeholder: "Required"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("label", { class: "y" }, [
                      createVNode("span", { class: "my-1" }, "Short Description"),
                      createVNode(_sfc_main$1M, {
                        modelValue: unref(playlist).description,
                        "onUpdate:modelValue": ($event) => unref(playlist).description = $event,
                        type: "text",
                        placeholder: "Required"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                        return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                      }), 128))
                    ]),
                    createVNode(_sfc_main$1R, { class: "w-fit" }, {
                      default: withCtx(() => [
                        createTextVNode("Create Playlist")
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Playlists/Create.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    playlists: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Playlists" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.props.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Playlists`);
                } else {
                  return [
                    createTextVNode("Playlists")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.$page.props.url
              }, {
                default: withCtx(() => [
                  createTextVNode("Playlists")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 md:w-3/4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Playlists</h2><!--[-->`);
            ssrRenderList(__props.playlists, (playlist) => {
              _push2(ssrRenderComponent(unref(Link$1), {
                href: _ctx.route("playlists.show", playlist.id),
                class: "block y pane"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="x items-center justify-between"${_scopeId2}><h1 class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(playlist.title)}</h1><span${_scopeId2}></span></div><div class="x items-center justify-between"${_scopeId2}><p${_scopeId2}>${ssrInterpolate(playlist.description)}</p><span${_scopeId2}></span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "x items-center justify-between" }, [
                        createVNode("h1", { class: "text-xl font-bold" }, toDisplayString(playlist.title), 1),
                        createVNode("span")
                      ]),
                      createVNode("div", { class: "x items-center justify-between" }, [
                        createVNode("p", null, toDisplayString(playlist.description), 1),
                        createVNode("span")
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="y space-y-4 md:w-1/4"${_scopeId}><h2 class="font-bold text-2xl mx-2"${_scopeId}>More</h2>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("playlists.create"),
              class: "rounded text-neutral-100 px-4 py-2 shadow border border-neutral-300 dark:border-neutral-700 bg-cyan-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create a Playlist `);
                } else {
                  return [
                    createTextVNode(" Create a Playlist ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1c, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 md:w-3/4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Playlists"),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.playlists, (playlist) => {
                  return openBlock(), createBlock(unref(Link$1), {
                    href: _ctx.route("playlists.show", playlist.id),
                    class: "block y pane"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "x items-center justify-between" }, [
                        createVNode("h1", { class: "text-xl font-bold" }, toDisplayString(playlist.title), 1),
                        createVNode("span")
                      ]),
                      createVNode("div", { class: "x items-center justify-between" }, [
                        createVNode("p", null, toDisplayString(playlist.description), 1),
                        createVNode("span")
                      ])
                    ]),
                    _: 2
                  }, 1032, ["href"]);
                }), 256))
              ]),
              createVNode("div", { class: "y space-y-4 md:w-1/4" }, [
                createVNode("h2", { class: "font-bold text-2xl mx-2" }, "More"),
                createVNode(unref(Link$1), {
                  href: _ctx.route("playlists.create"),
                  class: "rounded text-neutral-100 px-4 py-2 shadow border border-neutral-300 dark:border-neutral-700 bg-cyan-400"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Create a Playlist ")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$1c)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Playlists/Index.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    playlist: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: __props.playlist.title
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("playlists.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Playlists`);
                } else {
                  return [
                    createTextVNode("Playlists")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.props.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.playlist.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.playlist.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("playlists.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Playlists")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode(unref(Link$1), {
                href: _ctx.$page.props.url
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.playlist.title), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="y space-y-4 w-full"${_scopeId}><div class="x items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>${ssrInterpolate(__props.playlist.title)}</h2><span class="text-sm"${_scopeId}>Created by `);
            _push2(ssrRenderComponent(_sfc_main$10, {
              user: __props.playlist.owner
            }, null, _parent2, _scopeId));
            _push2(`, ${ssrInterpolate(new Date(__props.playlist.created_at).toISOString().replace("T", ", ").replace(".000Z", ""))}, Playlist ID: ${ssrInterpolate(__props.playlist.id)}</span></div><div class="x space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("roulette") + `?type=playlist&id=${__props.playlist.id}&seed=${Math.floor(Math.random() * (99999 - 1e4) + 99999)}`,
              class: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Roulette`);
                } else {
                  return [
                    createTextVNode("Roulette")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("playlists.edit", __props.playlist),
              class: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Edit`);
                } else {
                  return [
                    createTextVNode("Edit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("submissions.create", __props.playlist),
              class: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit Level`);
                } else {
                  return [
                    createTextVNode("Submit Level")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><p class="pane"${_scopeId}>${ssrInterpolate((_a = __props.playlist.description) != null ? _a : "This playlist has no description")}</p>`);
            if (__props.playlist.submissions.length === 0) {
              _push2(`<div class="pane"${_scopeId}>This playlist has no levels</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.playlist.submissions, (submission) => {
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("levels.show", submission.level.id),
                class: "block y pane"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="x justify-between"${_scopeId2}><h1 class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(submission.level.name)}</h1><div${_scopeId2}><span${_scopeId2}>Submitted By: ${ssrInterpolate(submission.submitter ? submission.submitter.name : "Anonymous")}</span></div></div><h6 class="text-sm"${_scopeId2}>${ssrInterpolate(submission.level.creator)}</h6><p${_scopeId2}>${ssrInterpolate(submission.level.description)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "x justify-between" }, [
                        createVNode("h1", { class: "text-xl font-bold" }, toDisplayString(submission.level.name), 1),
                        createVNode("div", null, [
                          createVNode("span", null, "Submitted By: " + toDisplayString(submission.submitter ? submission.submitter.name : "Anonymous"), 1)
                        ])
                      ]),
                      createVNode("h6", { class: "text-sm" }, toDisplayString(submission.level.creator), 1),
                      createVNode("p", null, toDisplayString(submission.level.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-full" }, [
                createVNode("div", { class: "x items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "font-bold text-2xl" }, toDisplayString(__props.playlist.title), 1),
                    createVNode("span", { class: "text-sm" }, [
                      createTextVNode("Created by "),
                      createVNode(_sfc_main$10, {
                        user: __props.playlist.owner
                      }, null, 8, ["user"]),
                      createTextVNode(", " + toDisplayString(new Date(__props.playlist.created_at).toISOString().replace("T", ", ").replace(".000Z", "")) + ", Playlist ID: " + toDisplayString(__props.playlist.id), 1)
                    ])
                  ]),
                  createVNode("div", { class: "x space-x-2" }, [
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("roulette") + `?type=playlist&id=${__props.playlist.id}&seed=${Math.floor(Math.random() * (99999 - 1e4) + 99999)}`,
                      class: "button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Roulette")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("playlists.edit", __props.playlist),
                      class: "button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link$1), {
                      href: unref(route$1)("submissions.create", __props.playlist),
                      class: "button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Submit Level")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("p", { class: "pane" }, toDisplayString((_b = __props.playlist.description) != null ? _b : "This playlist has no description"), 1),
                __props.playlist.submissions.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pane"
                }, "This playlist has no levels")) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.playlist.submissions, (submission) => {
                  return openBlock(), createBlock(unref(Link$1), {
                    href: unref(route$1)("levels.show", submission.level.id),
                    class: "block y pane"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "x justify-between" }, [
                        createVNode("h1", { class: "text-xl font-bold" }, toDisplayString(submission.level.name), 1),
                        createVNode("div", null, [
                          createVNode("span", null, "Submitted By: " + toDisplayString(submission.submitter ? submission.submitter.name : "Anonymous"), 1)
                        ])
                      ]),
                      createVNode("h6", { class: "text-sm" }, toDisplayString(submission.level.creator), 1),
                      createVNode("p", null, toDisplayString(submission.level.description), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"]);
                }), 256))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Playlists/Show.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    post: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      body: props.post.body,
      signature: !(!usePage().props.auth || !usePage().props.user.signature)
    });
    const submit = () => {
      form.post(route$1("posts.update", props.post.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("forums.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Edit Post</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("forums.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Forums")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Edit Post")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Edit Post</h2>`);
            if (_ctx.$page.props.errors.length > 0) {
              _push2(`<ul class="list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.errors, (error, key) => {
                _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$J, {
              modelValue: unref(form),
              "onUpdate:modelValue": ($event) => isRef(form) ? form.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`<div class="x justify-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              disabled: unref(form).processing,
              onClick: submit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Edit Post`);
                } else {
                  return [
                    createTextVNode("Edit Post")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Edit Post"),
                _ctx.$page.props.errors.length > 0 ? (openBlock(), createBlock("ul", {
                  key: 0,
                  class: "list-disc list-inside text-sm text-red-600"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$J, {
                  modelValue: unref(form),
                  "onUpdate:modelValue": ($event) => isRef(form) ? form.value = $event : null
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "x justify-center gap-2" }, [
                  createVNode(_sfc_main$1R, {
                    disabled: unref(form).processing,
                    onClick: submit
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Edit Post")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Posts/Edit.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    profile: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: props.profile.name
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.props.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(props.profile.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.profile.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.$page.props.url
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.profile.name), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 w-full"${_scopeId}><h2 class="mx-2 font-bold text-3xl"${_scopeId}>${ssrInterpolate(props.profile.name)}</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 w-full" }, [
                createVNode("h2", { class: "mx-2 font-bold text-3xl" }, toDisplayString(props.profile.name), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profiles/Show.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    type: Number,
    id: Number
  },
  setup(__props) {
    const report = useForm({
      title: "",
      content: "",
      model: null,
      id: null
    });
    const submit = () => {
      report.post(route$1("reports.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "New Report" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.props.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Report`);
                } else {
                  return [
                    createTextVNode("New Report")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.$page.props.url
              }, {
                default: withCtx(() => [
                  createTextVNode("New Report")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="y space-y-4 md:w-3/4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Create a New Report</h2><form class="y pane space-y-2"${_scopeId}><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Subject</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              modelValue: unref(report).title,
              "onUpdate:modelValue": ($event) => unref(report).title = $event,
              type: "text",
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label><label class="y"${_scopeId}><span class="my-1"${_scopeId}>Details</span><textarea placeholder="Required" class="resize-none resize-y pane w-full placeholder-neutral-400 dark:placeholder-neutral-600 border-none"${_scopeId}>${ssrInterpolate(unref(report).content)}</textarea><span class="x items-center text-neutral-500 text-sm mt-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-0.5"${_scopeId}><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"${_scopeId}></path></svg> Please be as specific as possible </span></label><ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { class: "w-fit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit Report`);
                } else {
                  return [
                    createTextVNode("Submit Report")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "y space-y-4 md:w-3/4" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Create a New Report"),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "y pane space-y-2"
                  }, [
                    createVNode("label", { class: "y" }, [
                      createVNode("span", { class: "my-1" }, "Subject"),
                      createVNode(_sfc_main$1M, {
                        modelValue: unref(report).title,
                        "onUpdate:modelValue": ($event) => unref(report).title = $event,
                        type: "text",
                        placeholder: "Required"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("label", { class: "y" }, [
                      createVNode("span", { class: "my-1" }, "Details"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(report).content = $event,
                        placeholder: "Required",
                        class: "resize-none resize-y pane w-full placeholder-neutral-400 dark:placeholder-neutral-600 border-none"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(report).content]
                      ]),
                      createVNode("span", { class: "x items-center text-neutral-500 text-sm mt-1" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          class: "w-4 h-4 mr-0.5"
                        }, [
                          createVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
                            "clip-rule": "evenodd"
                          })
                        ])),
                        createTextVNode(" Please be as specific as possible ")
                      ])
                    ]),
                    createVNode("ul", { class: "mt-3 list-disc list-inside text-sm text-red-600" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                        return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                      }), 128))
                    ]),
                    createVNode(_sfc_main$1R, { class: "w-fit" }, {
                      default: withCtx(() => [
                        createTextVNode("Submit Report")
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Reports/Create.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "Roulette",
  __ssrInlineRender: true,
  props: {
    levels: Array,
    progress: Number,
    playlist: Object
  },
  setup(__props) {
    const props = __props;
    const progress = ref(props.progress);
    const finished = ref(false);
    const won = ref(false);
    const newSeed = () => {
      let params = new URLSearchParams(usePage().url);
      params.set("seed", Math.floor(Math.random() * (99999 - 1e4) + 99999).toString());
      return params.toString().substring(3).replace("%3F", "?");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Roulette" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Roulette`);
                } else {
                  return [
                    createTextVNode("Roulette")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.$page.url
              }, {
                default: withCtx(() => [
                  createTextVNode("Roulette")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-2 md:w-2/3"${_scopeId}><h1 class="mx-2 text-center font-bold text-4xl"${_scopeId}>${ssrInterpolate(finished.value ? "Results" : "Level Roulette")}</h1><div class="x self-center space-x-2"${_scopeId}><span class="pane !py-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("playlists.show", __props.playlist.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.playlist.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.playlist.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` by `);
            _push2(ssrRenderComponent(_sfc_main$10, {
              user: __props.playlist.owner
            }, null, _parent2, _scopeId));
            _push2(`</span><span class="pane !py-1" style="${ssrRenderStyle(!finished.value ? null : { display: "none" })}"${_scopeId}>Current Progress: ${ssrInterpolate(progress.value)}</span></div>`);
            if (finished.value) {
              _push2(`<div class="y space-y-2 text-center"${_scopeId}><span class="pane !py-1 self-center"${_scopeId}>${ssrInterpolate(progress.value)} Level${ssrInterpolate(progress.value === 1 ? "" : "s")} Passed</span><div class="x justify-center space-x-2"${_scopeId}><span class="pane !py-1 cursor-pointer"${_scopeId}>Reset</span>`);
              _push2(ssrRenderComponent(unref(Link$1), {
                href: newSeed(),
                class: "pane !py-1 cursor-pointer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`New Seed`);
                  } else {
                    return [
                      createTextVNode("New Seed")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(__props.levels, (level, index) => {
                _push2(`<div style="${ssrRenderStyle(index <= progress.value ? null : { display: "none" })}" class="x pane justify-between"${_scopeId}><div class="x items-center space-x-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>${ssrInterpolate(level.name)}</span><span class="text-sm"${_scopeId}>by ${ssrInterpolate(level.creator)}</span></div><div class="x space-x-2 items-center" style="${ssrRenderStyle(index === progress.value ? null : { display: "none" })}"${_scopeId}><span${_scopeId}>At least ${ssrInterpolate(index + 1)}%</span><span class="pane !py-1 cursor-pointer"${_scopeId}>Done</span><span class="pane !py-1 cursor-pointer"${_scopeId}>Give Up</span></div></div>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div><div class="y space-y-2 md:w-1/3"${_scopeId}><h1 class="mx-2 font-bold text-2xl"${_scopeId}>About</h1><p class="pane"${_scopeId}>This game was inspired by <a class="underline" href="https://github.com/matcool/" target="_blank"${_scopeId}>matcool</a>&#39;s <a class="underline" href="https://matcool.github.io/extreme-demon-roulette/" target="_blank"${_scopeId}>Extreme Demon Roulette</a> website with the original idea by <a class="underline" href="https://youtu.be/nv_9FkfGRsc" target="_blank"${_scopeId}>npesta</a></p></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-2 md:w-2/3" }, [
                createVNode("h1", { class: "mx-2 text-center font-bold text-4xl" }, toDisplayString(finished.value ? "Results" : "Level Roulette"), 1),
                createVNode("div", { class: "x self-center space-x-2" }, [
                  createVNode("span", { class: "pane !py-1" }, [
                    createVNode(unref(Link$1), {
                      href: _ctx.route("playlists.show", __props.playlist.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.playlist.title), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createTextVNode(" by "),
                    createVNode(_sfc_main$10, {
                      user: __props.playlist.owner
                    }, null, 8, ["user"])
                  ]),
                  withDirectives(createVNode("span", { class: "pane !py-1" }, "Current Progress: " + toDisplayString(progress.value), 513), [
                    [vShow, !finished.value]
                  ])
                ]),
                finished.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "y space-y-2 text-center"
                }, [
                  createVNode("span", { class: "pane !py-1 self-center" }, toDisplayString(progress.value) + " Level" + toDisplayString(progress.value === 1 ? "" : "s") + " Passed", 1),
                  createVNode("div", { class: "x justify-center space-x-2" }, [
                    createVNode("span", {
                      class: "pane !py-1 cursor-pointer",
                      onClick: ($event) => {
                        progress.value = 0;
                        finished.value = false;
                        won.value = false;
                      }
                    }, "Reset", 8, ["onClick"]),
                    createVNode(unref(Link$1), {
                      href: newSeed(),
                      class: "pane !py-1 cursor-pointer"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("New Seed")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.levels, (level, index) => {
                  return withDirectives((openBlock(), createBlock("div", {
                    key: index,
                    class: "x pane justify-between"
                  }, [
                    createVNode("div", { class: "x items-center space-x-2" }, [
                      createVNode("span", { class: "font-bold text-xl" }, toDisplayString(level.name), 1),
                      createVNode("span", { class: "text-sm" }, "by " + toDisplayString(level.creator), 1)
                    ]),
                    withDirectives(createVNode("div", { class: "x space-x-2 items-center" }, [
                      createVNode("span", null, "At least " + toDisplayString(index + 1) + "%", 1),
                      createVNode("span", {
                        class: "pane !py-1 cursor-pointer",
                        onClick: ($event) => progress.value++
                      }, "Done", 8, ["onClick"]),
                      createVNode("span", {
                        class: "pane !py-1 cursor-pointer",
                        onClick: ($event) => finished.value = true
                      }, "Give Up", 8, ["onClick"])
                    ], 512), [
                      [vShow, index === progress.value]
                    ])
                  ])), [
                    [vShow, index <= progress.value]
                  ]);
                }), 128))
              ]),
              createVNode("div", { class: "y space-y-2 md:w-1/3" }, [
                createVNode("h1", { class: "mx-2 font-bold text-2xl" }, "About"),
                createVNode("p", { class: "pane" }, [
                  createTextVNode("This game was inspired by "),
                  createVNode("a", {
                    class: "underline",
                    href: "https://github.com/matcool/",
                    target: "_blank"
                  }, "matcool"),
                  createTextVNode("'s "),
                  createVNode("a", {
                    class: "underline",
                    href: "https://matcool.github.io/extreme-demon-roulette/",
                    target: "_blank"
                  }, "Extreme Demon Roulette"),
                  createTextVNode(" website with the original idea by "),
                  createVNode("a", {
                    class: "underline",
                    href: "https://youtu.be/nv_9FkfGRsc",
                    target: "_blank"
                  }, "npesta")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Roulette.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const searchType = ref(props.filters.searchType);
    const searchTypeNames = [
      "Forum Posts",
      "Reviews",
      "Profile Comments",
      "User"
    ];
    const sortBy = ref(props.filters.sortBy);
    const sortByNames = [
      [
        "ID",
        "Title",
        "Content",
        "Date"
      ],
      [
        "ID",
        "Author",
        "Rating"
      ],
      [
        "ID",
        "Username",
        "Rating Count"
      ],
      [
        "ID",
        "Username",
        "Rating Count"
      ]
    ];
    const sortDir = ref(props.filters.sortDir);
    const sortDirNames = [
      "Descending",
      "Ascending"
    ];
    const setSearchType = (value) => {
      searchType.value = value;
      sortBy.value = 0;
    };
    const setSortBy = (value) => {
      sortBy.value = value;
    };
    const setSortDir = (value) => {
      sortDir.value = value;
    };
    const search = () => {
      router.get(route$1("users.index") + "?" + new URLSearchParams({
        sortBy,
        sortDir
      }).toString());
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Search" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Search</span>`);
          } else {
            return [
              createVNode("span", null, "Search")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col space-y-4 md:w-1/4"${_scopeId}><div class="space-y-2"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Search</h2><div class="y pane space-y-2"${_scopeId}><div class="y space-y-1"${_scopeId}><span class="text-sm"${_scopeId}>Search</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "text",
              placeholder: "Search"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="y space-y-1"${_scopeId}><span class="text-sm"${_scopeId}>Search Type</span>`);
            _push2(ssrRenderComponent(Dropdown, {
              align: "left",
              class: "w-full",
              "container-classes": "mt-0",
              "content-classes": "select-none rounded-t-none border-t-0 -mt-1",
              width: "full"
            }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize select-none"${_scopeId2}>${ssrInterpolate(searchTypeNames[searchType.value])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", { class: "capitalize select-none" }, toDisplayString(searchTypeNames[searchType.value]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(searchTypeNames, (option, index) => {
                    _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"${_scopeId2}>${ssrInterpolate(searchTypeNames[index])}</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(searchTypeNames, (option, index) => {
                      return createVNode("div", {
                        onClick: ($event) => setSearchType(index),
                        key: index,
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                      }, toDisplayString(searchTypeNames[index]), 9, ["onClick"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="y space-y-1"${_scopeId}><span class="text-sm"${_scopeId}>Sort By</span>`);
            _push2(ssrRenderComponent(Dropdown, {
              align: "left",
              class: "w-full",
              "container-classes": ["mt-0"],
              "content-classes": ["select-none", "rounded-t-none", "border-t-0", "-mt-1"],
              width: "full"
            }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize select-none"${_scopeId2}>${ssrInterpolate(sortByNames[searchType.value][sortBy.value])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", { class: "capitalize select-none" }, toDisplayString(sortByNames[searchType.value][sortBy.value]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(sortByNames[searchType.value], (option, index) => {
                    _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"${_scopeId2}>${ssrInterpolate(sortByNames[searchType.value][index])}</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(sortByNames[searchType.value], (option, index) => {
                      return openBlock(), createBlock("div", {
                        onClick: ($event) => setSortBy(index),
                        key: index,
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                      }, toDisplayString(sortByNames[searchType.value][index]), 9, ["onClick"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="y space-y-1"${_scopeId}><span class="text-sm"${_scopeId}>Sort Direction</span>`);
            _push2(ssrRenderComponent(Dropdown, {
              align: "left",
              class: "w-full",
              "container-classes": "mt-0",
              "content-classes": "select-none rounded-t-none border-t-0 -mt-1",
              width: "full"
            }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize select-none"${_scopeId2}>${ssrInterpolate(sortDirNames[sortDir.value])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", { class: "capitalize select-none" }, toDisplayString(sortDirNames[sortDir.value]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(sortDirNames, (option, index) => {
                    _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"${_scopeId2}>${ssrInterpolate(sortDirNames[index])}</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(sortDirNames, (option, index) => {
                      return createVNode("div", {
                        onClick: ($event) => setSortDir(index),
                        key: index,
                        class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                      }, toDisplayString(sortDirNames[index]), 9, ["onClick"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: "w-fit",
              onClick: search
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Search`);
                } else {
                  return [
                    createTextVNode("Search")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex flex-col space-y-4 md:w-3/4"${_scopeId}><div class="space-y-2"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Results</h2><div class="pane"${_scopeId}><p class="opacity-50 italic"${_scopeId}>No Results</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col space-y-4 md:w-1/4" }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Search"),
                  createVNode("div", { class: "y pane space-y-2" }, [
                    createVNode("div", { class: "y space-y-1" }, [
                      createVNode("span", { class: "text-sm" }, "Search"),
                      createVNode(_sfc_main$1M, {
                        type: "text",
                        placeholder: "Search"
                      })
                    ]),
                    createVNode("div", { class: "y space-y-1" }, [
                      createVNode("span", { class: "text-sm" }, "Search Type"),
                      createVNode(Dropdown, {
                        align: "left",
                        class: "w-full",
                        "container-classes": "mt-0",
                        "content-classes": "select-none rounded-t-none border-t-0 -mt-1",
                        width: "full"
                      }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize select-none" }, toDisplayString(searchTypeNames[searchType.value]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(searchTypeNames, (option, index) => {
                            return createVNode("div", {
                              onClick: ($event) => setSearchType(index),
                              key: index,
                              class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                            }, toDisplayString(searchTypeNames[index]), 9, ["onClick"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "y space-y-1" }, [
                      createVNode("span", { class: "text-sm" }, "Sort By"),
                      createVNode(Dropdown, {
                        align: "left",
                        class: "w-full",
                        "container-classes": ["mt-0"],
                        "content-classes": ["select-none", "rounded-t-none", "border-t-0", "-mt-1"],
                        width: "full"
                      }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize select-none" }, toDisplayString(sortByNames[searchType.value][sortBy.value]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(sortByNames[searchType.value], (option, index) => {
                            return openBlock(), createBlock("div", {
                              onClick: ($event) => setSortBy(index),
                              key: index,
                              class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                            }, toDisplayString(sortByNames[searchType.value][index]), 9, ["onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "y space-y-1" }, [
                      createVNode("span", { class: "text-sm" }, "Sort Direction"),
                      createVNode(Dropdown, {
                        align: "left",
                        class: "w-full",
                        "container-classes": "mt-0",
                        "content-classes": "select-none rounded-t-none border-t-0 -mt-1",
                        width: "full"
                      }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize select-none" }, toDisplayString(sortDirNames[sortDir.value]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(sortDirNames, (option, index) => {
                            return createVNode("div", {
                              onClick: ($event) => setSortDir(index),
                              key: index,
                              class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                            }, toDisplayString(sortDirNames[index]), 9, ["onClick"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_sfc_main$1R, {
                      class: "w-fit",
                      onClick: search
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Search")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode("div", { class: "flex flex-col space-y-4 md:w-3/4" }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Results"),
                  createVNode("div", { class: "pane" }, [
                    createVNode("p", { class: "opacity-50 italic" }, "No Results")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Search.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:col-span-1 flex justify-between" }, _attrs))}><div class="px-4 sm:px-0"><h3 class="text-lg font-medium text-gray-900">`);
  ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
  _push(`</h3><p class="mt-1 text-sm text-gray-600">`);
  ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
  _push(`</p></div><div class="px-4 sm:px-0">`);
  ssrRenderSlot(_ctx.$slots, "aside", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/SectionTitle.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const JetSectionTitle = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$o = {
  __name: "FormSection",
  __ssrInlineRender: true,
  emits: ["submitted"],
  setup(__props) {
    const hasActions = computed(() => !!useSlots().actions);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:grid md:grid-cols-3 md:gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(JetSectionTitle, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "title")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "description", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "description")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="mt-5 md:mt-0 md:col-span-2"><form><div class="${ssrRenderClass([unref(hasActions) ? "sm:rounded-tl-md sm:rounded-tr-md" : "sm:rounded-md", "px-4 py-5 bg-white sm:p-6 shadow"])}"><div class="grid grid-cols-6 gap-6">`);
      ssrRenderSlot(_ctx.$slots, "form", {}, null, _push, _parent);
      _push(`</div></div>`);
      if (unref(hasActions)) {
        _push(`<div class="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">`);
        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div>`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/FormSection.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = defineComponent({
  components: {
    JetActionMessage: _sfc_main$1S,
    JetButton: _sfc_main$1R,
    JetFormSection: _sfc_main$o,
    JetInput: _sfc_main$1M,
    JetInputError: _sfc_main$1K,
    JetLabel: _sfc_main$1J,
    JetSecondaryButton: _sfc_main$1I,
    Link: Link$1,
    DocumentHead: Head,
    AppLayout: AppLayout$1
  },
  props: ["user"],
  data() {
    return {
      form: this.$inertia.form({
        _method: "PUT",
        email: this.user.email
      })
    };
  },
  methods: {
    updateProfileInformation() {
      this.form.post(route("auth::user-profile-information.update"), {
        errorBag: "updateProfileInformation",
        preserveScroll: true
      });
    }
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  const _component_jet_label = resolveComponent("jet-label");
  const _component_jet_input = resolveComponent("jet-input");
  const _component_jet_input_error = resolveComponent("jet-input-error");
  const _component_jet_action_message = resolveComponent("jet-action-message");
  const _component_jet_button = resolveComponent("jet-button");
  _push(ssrRenderComponent(_component_app_layout, _attrs, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/email",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`email`);
            } else {
              return [
                createTextVNode("email")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings/email",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("email")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="mx-32"${_scopeId}>Change Email</span><form${_scopeId}>`);
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "email",
          value: "Email",
          class: "text-left"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "email",
          type: "email",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.email,
          "onUpdate:modelValue": ($event) => _ctx.form.email = $event
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.email,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`<span class="text-sm text-gray-300"${_scopeId}>Note: if you change your email, you must verify it again</span><div class="flex items-center justify-between mt-4 align-middle"${_scopeId}><span class="underline text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/settings" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span><div class="text-right flex flex-row"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_jet_action_message, {
          on: _ctx.form.recentlySuccessful,
          class: "mr-3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Saved. `);
            } else {
              return [
                createTextVNode(" Saved. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_button, {
          class: { "opacity-25": _ctx.form.processing },
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Save `);
            } else {
              return [
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></form>`);
      } else {
        return [
          createVNode("span", { class: "mx-32" }, "Change Email"),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.updateProfileInformation, ["prevent"])
          }, [
            createVNode(_component_jet_label, {
              for: "email",
              value: "Email",
              class: "text-left"
            }),
            createVNode(_component_jet_input, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.email,
              "onUpdate:modelValue": ($event) => _ctx.form.email = $event
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.email,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode("span", { class: "text-sm text-gray-300" }, "Note: if you change your email, you must verify it again"),
            createVNode("div", { class: "flex items-center justify-between mt-4 align-middle" }, [
              createVNode("span", { class: "underline text-center" }, [
                createVNode(_component_Link, { href: "/settings" }, {
                  default: withCtx(() => [
                    createTextVNode("Go Back")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "text-right flex flex-row" }, [
                createVNode(_component_jet_action_message, {
                  on: _ctx.form.recentlySuccessful,
                  class: "mr-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Saved. ")
                  ]),
                  _: 1
                }, 8, ["on"]),
                createVNode(_component_jet_button, {
                  class: { "opacity-25": _ctx.form.processing },
                  disabled: _ctx.form.processing
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Save ")
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ])
            ])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Email.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const Email = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$9]]);
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Email
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = defineComponent({
  components: {
    AppLayout: AppLayout$1,
    DocumentHead: Head,
    Link: Link$1
  },
  methods: {
    logout() {
      this.$inertia.post(route("auth::logout"));
    }
  }
});
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Home" }, null, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="mx-32"${_scopeId}>User Settings</div><div class="flex flex-col space-y-4 text-center m-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/email",
          class: "shadow bg-gray-50 rounded py-1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Change Email`);
            } else {
              return [
                createTextVNode("Change Email")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/password",
          class: "shadow bg-gray-50 rounded py-1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Change Password`);
            } else {
              return [
                createTextVNode("Change Password")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/2fa",
          class: "shadow bg-gray-50 rounded py-1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Two-Factor Authentication`);
            } else {
              return [
                createTextVNode("Two-Factor Authentication")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/sessions",
          class: "shadow bg-gray-50 rounded py-1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Browser Sessions`);
            } else {
              return [
                createTextVNode("Browser Sessions")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<a href="#" class="shadow bg-gray-50 rounded py-1 text-red-500"${_scopeId}>Log Out</a><span class="underline text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span></div>`);
      } else {
        return [
          createVNode("div", { class: "mx-32" }, "User Settings"),
          createVNode("div", { class: "flex flex-col space-y-4 text-center m-4" }, [
            createVNode(_component_Link, {
              href: "/settings/email",
              class: "shadow bg-gray-50 rounded py-1"
            }, {
              default: withCtx(() => [
                createTextVNode("Change Email")
              ]),
              _: 1
            }),
            createVNode(_component_Link, {
              href: "/settings/password",
              class: "shadow bg-gray-50 rounded py-1"
            }, {
              default: withCtx(() => [
                createTextVNode("Change Password")
              ]),
              _: 1
            }),
            createVNode(_component_Link, {
              href: "/settings/2fa",
              class: "shadow bg-gray-50 rounded py-1"
            }, {
              default: withCtx(() => [
                createTextVNode("Two-Factor Authentication")
              ]),
              _: 1
            }),
            createVNode(_component_Link, {
              href: "/settings/sessions",
              class: "shadow bg-gray-50 rounded py-1"
            }, {
              default: withCtx(() => [
                createTextVNode("Browser Sessions")
              ]),
              _: 1
            }),
            createVNode("a", {
              href: "#",
              onClick: _ctx.logout,
              class: "shadow bg-gray-50 rounded py-1 text-red-500"
            }, "Log Out", 8, ["onClick"]),
            createVNode("span", { class: "underline text-center" }, [
              createVNode(_component_Link, { href: "/" }, {
                default: withCtx(() => [
                  createTextVNode("Go Back")
                ]),
                _: 1
              })
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Index.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const Index$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$8]]);
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = defineComponent({
  components: {
    AppLayout: AppLayout$1,
    JetActionMessage: _sfc_main$1S,
    JetButton: _sfc_main$1R,
    JetFormSection: _sfc_main$o,
    JetInput: _sfc_main$1M,
    JetInputError: _sfc_main$1K,
    JetLabel: _sfc_main$1J,
    DocumentHead: Head,
    Link: Link$1
  },
  data() {
    return {
      form: this.$inertia.form({
        current_password: "",
        password: "",
        password_confirmation: ""
      })
    };
  },
  methods: {
    updatePassword() {
      this.form.put(route("auth::user-password.update"), {
        errorBag: "updatePassword",
        preserveScroll: true,
        onSuccess: () => this.form.reset(),
        onError: () => {
          if (this.form.errors.password) {
            this.form.reset("password", "password_confirmation");
            this.$refs.password.focus();
          }
          if (this.form.errors.current_password) {
            this.form.reset("current_password");
            this.$refs.current_password.focus();
          }
        }
      });
    }
  }
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  const _component_jet_label = resolveComponent("jet-label");
  const _component_jet_input = resolveComponent("jet-input");
  const _component_jet_input_error = resolveComponent("jet-input-error");
  const _component_jet_action_message = resolveComponent("jet-action-message");
  const _component_jet_button = resolveComponent("jet-button");
  _push(ssrRenderComponent(_component_app_layout, _attrs, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/password",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`password`);
            } else {
              return [
                createTextVNode("password")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings/password",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("password")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="mx-32"${_scopeId}>Change Password</span><form${_scopeId}>`);
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "current_password",
          value: "Current Password",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "current_password",
          type: "password",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.current_password,
          "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.current_password,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "password",
          value: "New Password",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "password",
          type: "password",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.password,
          "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
          ref: "password",
          autocomplete: "new-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.password,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "password_confirmation",
          value: "Confirm Password",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "password_confirmation",
          type: "password",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.password_confirmation,
          "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
          autocomplete: "new-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.password_confirmation,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`<div class="flex items-center justify-between pt-4"${_scopeId}><span class="underline mt-2 text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/settings" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span><div class="flex flex-row align-middle text-right"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_jet_action_message, {
          on: _ctx.form.recentlySuccessful,
          class: "mr-3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Saved. `);
            } else {
              return [
                createTextVNode(" Saved. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_button, {
          class: { "opacity-25": _ctx.form.processing },
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Save `);
            } else {
              return [
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></form>`);
      } else {
        return [
          createVNode("span", { class: "mx-32" }, "Change Password"),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.updatePassword, ["prevent"])
          }, [
            createVNode(_component_jet_label, {
              for: "current_password",
              value: "Current Password",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "current_password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.current_password,
              "onUpdate:modelValue": ($event) => _ctx.form.current_password = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.current_password,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "password",
              value: "New Password",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.password,
              "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
              ref: "password",
              autocomplete: "new-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.password,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "password_confirmation",
              value: "Confirm Password",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.password_confirmation,
              "onUpdate:modelValue": ($event) => _ctx.form.password_confirmation = $event,
              autocomplete: "new-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.password_confirmation,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode("div", { class: "flex items-center justify-between pt-4" }, [
              createVNode("span", { class: "underline mt-2 text-center" }, [
                createVNode(_component_Link, { href: "/settings" }, {
                  default: withCtx(() => [
                    createTextVNode("Go Back")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex flex-row align-middle text-right" }, [
                createVNode(_component_jet_action_message, {
                  on: _ctx.form.recentlySuccessful,
                  class: "mr-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Saved. ")
                  ]),
                  _: 1
                }, 8, ["on"]),
                createVNode(_component_jet_button, {
                  class: { "opacity-25": _ctx.form.processing },
                  disabled: _ctx.form.processing
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Save ")
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ])
            ])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Password.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const Password = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$7]]);
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Password
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = defineComponent({
  components: {
    AppLayout: AppLayout$1,
    JetActionMessage: _sfc_main$1S,
    JetButton: _sfc_main$1R,
    JetFormSection: _sfc_main$o,
    JetInput: _sfc_main$1M,
    JetInputError: _sfc_main$1K,
    JetLabel: _sfc_main$1J,
    DocumentHead: Head,
    Link: Link$1
  },
  props: {},
  data() {
    return {
      form: this.$inertia.form({
        profile_name: this.$page.props.user.linked_accounts[0].name,
        plus_bio: this.$page.props.user.linked_accounts[0].plus_bio,
        plus_discord: this.$page.props.user.linked_accounts[0].plus_discord,
        plus_website: this.$page.props.user.linked_accounts[0].plus_website,
        plus_video: this.$page.props.user.linked_accounts[0].plus_video,
        plus_email: this.$page.props.user.linked_accounts[0].plus_email,
        plus_pronouns: this.$page.props.user.linked_accounts[0].plus_pronouns,
        plus_location: this.$page.props.user.linked_accounts[0].plus_location,
        plus_avatar: null,
        plus_background: null
      })
    };
  },
  methods: {
    updateProfile() {
      this.form.post("/settings/profile", {
        errorBag: "updateProfile",
        preserveScroll: true,
        onSuccess: () => {
        },
        onError: () => {
        }
      });
    }
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  const _component_jet_label = resolveComponent("jet-label");
  const _component_jet_input = resolveComponent("jet-input");
  const _component_jet_input_error = resolveComponent("jet-input-error");
  const _component_jet_action_message = resolveComponent("jet-action-message");
  const _component_jet_button = resolveComponent("jet-button");
  _push(ssrRenderComponent(_component_app_layout, _attrs, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/profile",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`profile`);
            } else {
              return [
                createTextVNode("profile")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings/profile",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("profile")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="mx-32"${_scopeId}>Custom Profile</span><form${_scopeId}><input type="file"${_scopeId}>`);
        if (_ctx.form.progress) {
          _push2(`<progress${ssrRenderAttr("value", _ctx.form.progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(_ctx.form.progress.percentage)}% </progress>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<input type="file"${_scopeId}>`);
        if (_ctx.form.progress) {
          _push2(`<progress${ssrRenderAttr("value", _ctx.form.progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(_ctx.form.progress.percentage)}% </progress>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "plus_bio",
          value: "Bio",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_bio",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.plus_bio,
          "onUpdate:modelValue": ($event) => _ctx.form.plus_bio = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_bio,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "",
          value: "Discord",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_discord",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.plus_discord,
          "onUpdate:modelValue": ($event) => _ctx.form.plus_discord = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_discord,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "",
          value: "Website",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_website",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.plus_website,
          "onUpdate:modelValue": ($event) => _ctx.form.plus_website = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_website,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "",
          value: "Video",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_video",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.plus_video,
          "onUpdate:modelValue": ($event) => _ctx.form.plus_video = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_video,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "",
          value: "Email",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_email",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.plus_email,
          "onUpdate:modelValue": ($event) => _ctx.form.plus_email = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_email,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "",
          value: "Pronouns",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_pronouns",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.plus_pronouns,
          "onUpdate:modelValue": ($event) => _ctx.form.plus_pronouns = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_pronouns,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_label, {
          for: "",
          value: "Location",
          class: "text-left mt-2"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input, {
          id: "plus_location",
          type: "text",
          class: "mt-1 block w-full",
          modelValue: _ctx.form.location,
          "onUpdate:modelValue": ($event) => _ctx.form.location = $event,
          ref: "current_password",
          autocomplete: "current-password"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_input_error, {
          message: _ctx.form.errors.plus_location,
          class: "mt-2"
        }, null, _parent2, _scopeId));
        _push2(`<div class="flex items-center justify-between pt-4"${_scopeId}><span class="underline mt-2 text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span><div class="flex flex-row align-middle text-right"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_jet_action_message, {
          on: _ctx.form.recentlySuccessful,
          class: "mr-3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Saved. `);
            } else {
              return [
                createTextVNode(" Saved. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_button, {
          class: { "opacity-25": _ctx.form.processing },
          disabled: _ctx.form.processing
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Save `);
            } else {
              return [
                createTextVNode(" Save ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div></form>`);
      } else {
        return [
          createVNode("span", { class: "mx-32" }, "Custom Profile"),
          createVNode("form", {
            onSubmit: withModifiers(_ctx.updateProfile, ["prevent"])
          }, [
            createVNode("input", {
              type: "file",
              onInput: ($event) => _ctx.form.plus_avatar = $event.target.files[0]
            }, null, 40, ["onInput"]),
            _ctx.form.progress ? (openBlock(), createBlock("progress", {
              key: 0,
              value: _ctx.form.progress.percentage,
              max: "100"
            }, toDisplayString(_ctx.form.progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
            createVNode("input", {
              type: "file",
              onInput: ($event) => _ctx.form.plus_background = $event.target.files[0]
            }, null, 40, ["onInput"]),
            _ctx.form.progress ? (openBlock(), createBlock("progress", {
              key: 1,
              value: _ctx.form.progress.percentage,
              max: "100"
            }, toDisplayString(_ctx.form.progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
            createVNode(_component_jet_label, {
              for: "plus_bio",
              value: "Bio",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_bio",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.plus_bio,
              "onUpdate:modelValue": ($event) => _ctx.form.plus_bio = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_bio,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "",
              value: "Discord",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_discord",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.plus_discord,
              "onUpdate:modelValue": ($event) => _ctx.form.plus_discord = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_discord,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "",
              value: "Website",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_website",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.plus_website,
              "onUpdate:modelValue": ($event) => _ctx.form.plus_website = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_website,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "",
              value: "Video",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_video",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.plus_video,
              "onUpdate:modelValue": ($event) => _ctx.form.plus_video = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_video,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "",
              value: "Email",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_email",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.plus_email,
              "onUpdate:modelValue": ($event) => _ctx.form.plus_email = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_email,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "",
              value: "Pronouns",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_pronouns",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.plus_pronouns,
              "onUpdate:modelValue": ($event) => _ctx.form.plus_pronouns = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_pronouns,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode(_component_jet_label, {
              for: "",
              value: "Location",
              class: "text-left mt-2"
            }),
            createVNode(_component_jet_input, {
              id: "plus_location",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: _ctx.form.location,
              "onUpdate:modelValue": ($event) => _ctx.form.location = $event,
              ref: "current_password",
              autocomplete: "current-password"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
            createVNode(_component_jet_input_error, {
              message: _ctx.form.errors.plus_location,
              class: "mt-2"
            }, null, 8, ["message"]),
            createVNode("div", { class: "flex items-center justify-between pt-4" }, [
              createVNode("span", { class: "underline mt-2 text-center" }, [
                createVNode(_component_Link, { href: "/" }, {
                  default: withCtx(() => [
                    createTextVNode("Go Back")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex flex-row align-middle text-right" }, [
                createVNode(_component_jet_action_message, {
                  on: _ctx.form.recentlySuccessful,
                  class: "mr-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Saved. ")
                  ]),
                  _: 1
                }, 8, ["on"]),
                createVNode(_component_jet_button, {
                  class: { "opacity-25": _ctx.form.processing },
                  disabled: _ctx.form.processing
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Save ")
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ])
            ])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Profile.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Profile = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$6]]);
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "ActionSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:grid md:grid-cols-3 md:gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(JetSectionTitle, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "title")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "description", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "description")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="mt-5 md:mt-0 md:col-span-2"><div class="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ActionSection.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = defineComponent({
  props: ["sessions"],
  components: {
    JetActionMessage: _sfc_main$1S,
    JetActionSection: _sfc_main$j,
    JetButton: _sfc_main$1R,
    JetDialogModal: _sfc_main$1N,
    JetInput: _sfc_main$1M,
    JetInputError: _sfc_main$1K,
    JetSecondaryButton: _sfc_main$1I,
    DocumentHead: Head,
    AppLayout: AppLayout$1,
    Link: Link$1
  },
  data() {
    return {
      confirmingLogout: false,
      form: this.$inertia.form({
        password: ""
      })
    };
  },
  methods: {
    confirmLogout() {
      this.confirmingLogout = true;
      setTimeout(() => this.$refs.password.focus(), 250);
    },
    logoutOtherBrowserSessions() {
      this.form.delete(route("settings::sessions.destroy"), {
        preserveScroll: true,
        onSuccess: () => this.closeModal(),
        onError: () => this.$refs.password.focus(),
        onFinish: () => this.form.reset()
      });
    },
    closeModal() {
      this.confirmingLogout = false;
      this.form.reset();
    }
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_document_head = resolveComponent("document-head");
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  const _component_jet_button = resolveComponent("jet-button");
  const _component_jet_action_message = resolveComponent("jet-action-message");
  const _component_jet_dialog_modal = resolveComponent("jet-dialog-modal");
  const _component_jet_input = resolveComponent("jet-input");
  const _component_jet_input_error = resolveComponent("jet-input-error");
  const _component_jet_secondary_button = resolveComponent("jet-secondary-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_document_head, { title: "Home" }, null, _parent));
  _push(ssrRenderComponent(_component_app_layout, null, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/sessions",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`sessions`);
            } else {
              return [
                createTextVNode("sessions")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings/sessions",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("sessions")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h6 class="mx-32"${_scopeId}>Other Browser Sessions</h6>`);
        if (_ctx.sessions.length > 0) {
          _push2(`<div class="mt-2 space-y-6"${_scopeId}><!--[-->`);
          ssrRenderList(_ctx.sessions, (session, i) => {
            _push2(`<div class="flex items-center"${_scopeId}><div${_scopeId}>`);
            if (session.agent.is_desktop) {
              _push2(`<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8 text-gray-500"${_scopeId}><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-gray-500"${_scopeId}><path d="M0 0h24v24H0z" stroke="none"${_scopeId}></path><rect x="7" y="4" width="10" height="16" rx="1"${_scopeId}></rect><path d="M11 5h2M12 17v.01"${_scopeId}></path></svg>`);
            }
            _push2(`</div><div class="ml-3"${_scopeId}><div class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(session.agent.platform ? session.agent.platform : "Unknown")} - ${ssrInterpolate(session.agent.browser ? session.agent.browser : "Unknown")}</div><div${_scopeId}><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(session.ip_address)}, `);
            if (session.is_current_device) {
              _push2(`<span class="text-green-500 font-semibold"${_scopeId}>This device</span>`);
            } else {
              _push2(`<span${_scopeId}>Last active ${ssrInterpolate(session.last_active)}</span>`);
            }
            _push2(`</div></div></div></div>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="flex flex-col items-center mt-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_jet_button, { onClick: _ctx.confirmLogout }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log Out Other Browser Sessions `);
            } else {
              return [
                createTextVNode(" Log Out Other Browser Sessions ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_jet_action_message, {
          on: _ctx.form.recentlySuccessful,
          class: "mt-4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Done. `);
            } else {
              return [
                createTextVNode(" Done. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><span class="underline text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/settings" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</span>`);
        _push2(ssrRenderComponent(_component_jet_dialog_modal, {
          show: _ctx.confirmingLogout,
          onClose: _ctx.closeModal
        }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Log Out Other Browser Sessions `);
            } else {
              return [
                createTextVNode(" Log Out Other Browser Sessions ")
              ];
            }
          }),
          content: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. <div class="mt-4"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_jet_input, {
                type: "password",
                class: "mt-1 block w-3/4",
                placeholder: "Password",
                ref: "password",
                modelValue: _ctx.form.password,
                "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                onKeyup: _ctx.logoutOtherBrowserSessions
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_jet_input_error, {
                message: _ctx.form.errors.password,
                class: "mt-2"
              }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createTextVNode(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. "),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_component_jet_input, {
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: "Password",
                    ref: "password",
                    modelValue: _ctx.form.password,
                    "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                    onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                  createVNode(_component_jet_input_error, {
                    message: _ctx.form.errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ];
            }
          }),
          footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_jet_secondary_button, { onClick: _ctx.closeModal }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Cancel `);
                  } else {
                    return [
                      createTextVNode(" Cancel ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_jet_button, {
                class: ["ml-3", { "opacity-25": _ctx.form.processing }],
                onClick: _ctx.logoutOtherBrowserSessions,
                disabled: _ctx.form.processing
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Log Out Other Browser Sessions `);
                  } else {
                    return [
                      createTextVNode(" Log Out Other Browser Sessions ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_jet_secondary_button, { onClick: _ctx.closeModal }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_jet_button, {
                  class: ["ml-3", { "opacity-25": _ctx.form.processing }],
                  onClick: _ctx.logoutOtherBrowserSessions,
                  disabled: _ctx.form.processing
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Log Out Other Browser Sessions ")
                  ]),
                  _: 1
                }, 8, ["onClick", "class", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h6", { class: "mx-32" }, "Other Browser Sessions"),
          _ctx.sessions.length > 0 ? (openBlock(), createBlock("div", {
            key: 0,
            class: "mt-2 space-y-6"
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sessions, (session, i) => {
              return openBlock(), createBlock("div", {
                class: "flex items-center",
                key: i
              }, [
                createVNode("div", null, [
                  session.agent.is_desktop ? (openBlock(), createBlock("svg", {
                    key: 0,
                    fill: "none",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    class: "w-8 h-8 text-gray-500"
                  }, [
                    createVNode("path", { d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })
                  ])) : (openBlock(), createBlock("svg", {
                    key: 1,
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    "stroke-width": "2",
                    stroke: "currentColor",
                    fill: "none",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    class: "w-8 h-8 text-gray-500"
                  }, [
                    createVNode("path", {
                      d: "M0 0h24v24H0z",
                      stroke: "none"
                    }),
                    createVNode("rect", {
                      x: "7",
                      y: "4",
                      width: "10",
                      height: "16",
                      rx: "1"
                    }),
                    createVNode("path", { d: "M11 5h2M12 17v.01" })
                  ]))
                ]),
                createVNode("div", { class: "ml-3" }, [
                  createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(session.agent.platform ? session.agent.platform : "Unknown") + " - " + toDisplayString(session.agent.browser ? session.agent.browser : "Unknown"), 1),
                  createVNode("div", null, [
                    createVNode("div", { class: "text-xs text-gray-500" }, [
                      createTextVNode(toDisplayString(session.ip_address) + ", ", 1),
                      session.is_current_device ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-green-500 font-semibold"
                      }, "This device")) : (openBlock(), createBlock("span", { key: 1 }, "Last active " + toDisplayString(session.last_active), 1))
                    ])
                  ])
                ])
              ]);
            }), 128))
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "flex flex-col items-center mt-4" }, [
            createVNode(_component_jet_button, { onClick: _ctx.confirmLogout }, {
              default: withCtx(() => [
                createTextVNode(" Log Out Other Browser Sessions ")
              ]),
              _: 1
            }, 8, ["onClick"]),
            createVNode(_component_jet_action_message, {
              on: _ctx.form.recentlySuccessful,
              class: "mt-4"
            }, {
              default: withCtx(() => [
                createTextVNode(" Done. ")
              ]),
              _: 1
            }, 8, ["on"])
          ]),
          createVNode("span", { class: "underline text-center" }, [
            createVNode(_component_Link, { href: "/settings" }, {
              default: withCtx(() => [
                createTextVNode("Go Back")
              ]),
              _: 1
            })
          ]),
          createVNode(_component_jet_dialog_modal, {
            show: _ctx.confirmingLogout,
            onClose: _ctx.closeModal
          }, {
            title: withCtx(() => [
              createTextVNode(" Log Out Other Browser Sessions ")
            ]),
            content: withCtx(() => [
              createTextVNode(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. "),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_component_jet_input, {
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  ref: "password",
                  modelValue: _ctx.form.password,
                  "onUpdate:modelValue": ($event) => _ctx.form.password = $event,
                  onKeyup: withKeys(_ctx.logoutOtherBrowserSessions, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_component_jet_input_error, {
                  message: _ctx.form.errors.password,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ]),
            footer: withCtx(() => [
              createVNode(_component_jet_secondary_button, { onClick: _ctx.closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_jet_button, {
                class: ["ml-3", { "opacity-25": _ctx.form.processing }],
                onClick: _ctx.logoutOtherBrowserSessions,
                disabled: _ctx.form.processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log Out Other Browser Sessions ")
                ]),
                _: 1
              }, 8, ["onClick", "class", "disabled"])
            ]),
            _: 1
          }, 8, ["show", "onClose"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Sessions.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const Sessions = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$5]]);
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sessions
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  __name: "ConfirmsPassword",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Confirm Password"
    },
    content: {
      type: String,
      default: "For your security, please confirm your password to continue."
    },
    button: {
      type: String,
      default: "Confirm"
    }
  },
  emits: ["confirmed"],
  setup(__props, { emit }) {
    const confirmingPassword = ref(false);
    const form = reactive({
      password: "",
      error: "",
      processing: false
    });
    const passwordInput = ref(null);
    const confirmPassword = () => {
      form.processing = true;
      axios.post(route("password.confirm"), {
        password: form.password
      }).then(() => {
        form.processing = false;
        closeModal();
        nextTick().then(() => emit("confirmed"));
      }).catch((error) => {
        form.processing = false;
        form.error = error.response.data.errors.password[0];
        passwordInput.value.focus();
      });
    };
    const closeModal = () => {
      confirmingPassword.value = false;
      form.password = "";
      form.error = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}><span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
      _push(ssrRenderComponent(_sfc_main$1N, {
        show: confirmingPassword.value,
        onClose: closeModal
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.title), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.content)} <div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: form.password,
              "onUpdate:modelValue": ($event) => form.password = $event,
              type: "password",
              class: "mt-1 block w-3/4",
              placeholder: "Password",
              onKeyup: confirmPassword
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1K, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.content) + " ", 1),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_sfc_main$1M, {
                  ref_key: "passwordInput",
                  ref: passwordInput,
                  modelValue: form.password,
                  "onUpdate:modelValue": ($event) => form.password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  onKeyup: withKeys(confirmPassword, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_sfc_main$1K, {
                  message: form.error,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1I, { onClick: closeModal }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, {
              class: ["ml-3", { "opacity-25": form.processing }],
              disabled: form.processing,
              onClick: confirmPassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.button)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.button), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1I, { onClick: closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1R, {
                class: ["ml-3", { "opacity-25": form.processing }],
                disabled: form.processing,
                onClick: confirmPassword
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.button), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ConfirmsPassword.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = defineComponent({
  components: {
    JetActionSection: _sfc_main$j,
    JetButton: _sfc_main$1R,
    JetConfirmsPassword: _sfc_main$h,
    JetDangerButton: _sfc_main$1O,
    JetSecondaryButton: _sfc_main$1I,
    Link: Link$1,
    DocumentHead: Head,
    AppLayout: AppLayout$1
  },
  data() {
    return {
      enabling: false,
      disabling: false,
      qrCode: null,
      recoveryCodes: []
    };
  },
  methods: {
    enableTwoFactorAuthentication() {
      this.enabling = true;
      this.$inertia.post(route("auth::2fa.enable"), {}, {
        preserveScroll: true,
        onSuccess: () => Promise.all([
          this.showQrCode(),
          this.showRecoveryCodes()
        ]),
        onFinish: () => this.enabling = false
      });
    },
    showQrCode() {
      return axios.get(route("auth::2fa.qr")).then((response) => {
        this.qrCode = response.data.svg;
      });
    },
    showRecoveryCodes() {
      return axios.get(route("auth::2fa.recovery")).then((response) => {
        this.recoveryCodes = response.data;
      });
    },
    regenerateRecoveryCodes() {
      axios.post(route("auth::2fa.recovery")).then((response) => {
        this.showRecoveryCodes();
      });
    },
    disableTwoFactorAuthentication() {
      this.disabling = true;
      this.$inertia.delete(route("auth::2fa.disable"), {
        preserveScroll: true,
        onSuccess: () => this.disabling = false
      });
    }
  },
  computed: {
    twoFactorEnabled() {
      return !this.enabling && this.$page.props.user.two_factor_enabled;
    }
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_app_layout = resolveComponent("app-layout");
  const _component_Link = resolveComponent("Link");
  const _component_jet_confirms_password = resolveComponent("jet-confirms-password");
  const _component_jet_button = resolveComponent("jet-button");
  const _component_jet_secondary_button = resolveComponent("jet-secondary-button");
  const _component_jet_danger_button = resolveComponent("jet-danger-button");
  _push(ssrRenderComponent(_component_app_layout, _attrs, {
    breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`settings`);
            } else {
              return [
                createTextVNode("settings")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(` / `);
        _push2(ssrRenderComponent(_component_Link, {
          href: "/settings/2fa",
          class: "underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`2fa`);
            } else {
              return [
                createTextVNode("2fa")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("settings")
            ]),
            _: 1
          }),
          createTextVNode(" / "),
          createVNode(_component_Link, {
            href: "/settings/2fa",
            class: "underline"
          }, {
            default: withCtx(() => [
              createTextVNode("2fa")
            ]),
            _: 1
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.twoFactorEnabled) {
          _push2(`<h3 class="text-lg font-medium text-gray-900"${_scopeId}> You have enabled two factor authentication. </h3>`);
        } else {
          _push2(`<h3 class="text-lg font-medium text-gray-900"${_scopeId}> You have not enabled two factor authentication. </h3>`);
        }
        _push2(`<div class="mt-3 max-w-xl text-sm text-gray-600"${_scopeId}><p${_scopeId}> When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone&#39;s Google Authenticator application. </p></div>`);
        if (_ctx.twoFactorEnabled) {
          _push2(`<div${_scopeId}>`);
          if (_ctx.qrCode) {
            _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-sm text-gray-600"${_scopeId}><p class="font-semibold"${_scopeId}> Two factor authentication is now enabled. Scan the following QR code using your phone&#39;s authenticator application. </p></div><div class="flex flex-row justify-center mt-4"${_scopeId}>${_ctx.qrCode}</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (_ctx.recoveryCodes.length > 0) {
            _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-sm text-gray-600"${_scopeId}><p class="font-semibold"${_scopeId}> Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. </p></div><div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.recoveryCodes, (code) => {
              _push2(`<div${_scopeId}>${ssrInterpolate(code)}</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="mt-5"${_scopeId}>`);
        if (!_ctx.twoFactorEnabled) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_jet_confirms_password, { onConfirmed: _ctx.enableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_jet_button, {
                  type: "button",
                  class: { "opacity-25": _ctx.enabling },
                  disabled: _ctx.enabling
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(` Enable `);
                    } else {
                      return [
                        createTextVNode(" Enable ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_jet_button, {
                    type: "button",
                    class: { "opacity-25": _ctx.enabling },
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Enable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_jet_confirms_password, { onConfirmed: _ctx.regenerateRecoveryCodes }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.recoveryCodes.length > 0) {
                  _push3(ssrRenderComponent(_component_jet_secondary_button, { class: "mr-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Regenerate Recovery Codes `);
                      } else {
                        return [
                          createTextVNode(" Regenerate Recovery Codes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  _ctx.recoveryCodes.length > 0 ? (openBlock(), createBlock(_component_jet_secondary_button, {
                    key: 0,
                    class: "mr-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Regenerate Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_jet_confirms_password, { onConfirmed: _ctx.showRecoveryCodes }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.recoveryCodes.length === 0) {
                  _push3(ssrRenderComponent(_component_jet_secondary_button, { class: "mr-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Show Recovery Codes `);
                      } else {
                        return [
                          createTextVNode(" Show Recovery Codes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  _ctx.recoveryCodes.length === 0 ? (openBlock(), createBlock(_component_jet_secondary_button, {
                    key: 0,
                    class: "mr-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Show Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_jet_confirms_password, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_jet_danger_button, {
                  class: { "opacity-25": _ctx.disabling },
                  disabled: _ctx.disabling
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(` Disable `);
                    } else {
                      return [
                        createTextVNode(" Disable ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_jet_danger_button, {
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Disable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`</div>`);
        }
        _push2(`</div><p class="underline mt-2 text-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, { href: "/settings" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Go Back`);
            } else {
              return [
                createTextVNode("Go Back")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</p>`);
      } else {
        return [
          _ctx.twoFactorEnabled ? (openBlock(), createBlock("h3", {
            key: 0,
            class: "text-lg font-medium text-gray-900"
          }, " You have enabled two factor authentication. ")) : (openBlock(), createBlock("h3", {
            key: 1,
            class: "text-lg font-medium text-gray-900"
          }, " You have not enabled two factor authentication. ")),
          createVNode("div", { class: "mt-3 max-w-xl text-sm text-gray-600" }, [
            createVNode("p", null, " When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application. ")
          ]),
          _ctx.twoFactorEnabled ? (openBlock(), createBlock("div", { key: 2 }, [
            _ctx.qrCode ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode("div", { class: "mt-4 max-w-xl text-sm text-gray-600" }, [
                createVNode("p", { class: "font-semibold" }, " Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application. ")
              ]),
              createVNode("div", {
                class: "flex flex-row justify-center mt-4",
                innerHTML: _ctx.qrCode
              }, null, 8, ["innerHTML"])
            ])) : createCommentVNode("", true),
            _ctx.recoveryCodes.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
              createVNode("div", { class: "mt-4 max-w-xl text-sm text-gray-600" }, [
                createVNode("p", { class: "font-semibold" }, " Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. ")
              ]),
              createVNode("div", { class: "grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.recoveryCodes, (code) => {
                  return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "mt-5" }, [
            !_ctx.twoFactorEnabled ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode(_component_jet_confirms_password, { onConfirmed: _ctx.enableTwoFactorAuthentication }, {
                default: withCtx(() => [
                  createVNode(_component_jet_button, {
                    type: "button",
                    class: { "opacity-25": _ctx.enabling },
                    disabled: _ctx.enabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Enable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["onConfirmed"])
            ])) : (openBlock(), createBlock("div", { key: 1 }, [
              createVNode(_component_jet_confirms_password, { onConfirmed: _ctx.regenerateRecoveryCodes }, {
                default: withCtx(() => [
                  _ctx.recoveryCodes.length > 0 ? (openBlock(), createBlock(_component_jet_secondary_button, {
                    key: 0,
                    class: "mr-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Regenerate Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"]),
              createVNode(_component_jet_confirms_password, { onConfirmed: _ctx.showRecoveryCodes }, {
                default: withCtx(() => [
                  _ctx.recoveryCodes.length === 0 ? (openBlock(), createBlock(_component_jet_secondary_button, {
                    key: 0,
                    class: "mr-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Show Recovery Codes ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onConfirmed"]),
              createVNode(_component_jet_confirms_password, { onConfirmed: _ctx.disableTwoFactorAuthentication }, {
                default: withCtx(() => [
                  createVNode(_component_jet_danger_button, {
                    class: { "opacity-25": _ctx.disabling },
                    disabled: _ctx.disabling
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Disable ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["onConfirmed"])
            ]))
          ]),
          createVNode("p", { class: "underline mt-2 text-center" }, [
            createVNode(_component_Link, { href: "/settings" }, {
              default: withCtx(() => [
                createTextVNode("Go Back")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/TwoFactorAuthentication.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const TwoFactorAuthentication = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$4]]);
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TwoFactorAuthentication
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Stencils/Create.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$3]]);
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Stencils/Fonts.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const Fonts = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$2]]);
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fonts
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Stencils/Index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$1]]);
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Stencils/Show.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender]]);
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    playlist: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      level_id: ""
    });
    const submit = () => {
      form.post(route("submissions.store", props.playlist));
    };
    const validID = ref(null);
    const searchResult = ref(null);
    const searchID = async () => {
      let res = await fetch("/api/level/" + form.level_id).then((data) => data.json());
      if (res === -1) {
        validID.value = false;
      } else {
        validID.value = true;
        searchResult.value = res;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("playlists.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Playlists`);
                } else {
                  return [
                    createTextVNode("Playlists")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("playlists.show", __props.playlist)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.playlist.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.playlist.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Submit</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.route("playlists.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Playlists")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode(unref(Link$1), {
                href: _ctx.route("playlists.show", __props.playlist)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.playlist.title), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Submit")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Submit Level to ${ssrInterpolate(__props.playlist.title)}</h2><div class="flex flex-col space-y-2 pane"${_scopeId}><label class="flex flex-col"${_scopeId}><span class="my-1"${_scopeId}>ID</span>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              type: "number",
              modelValue: unref(form).level_id,
              "onUpdate:modelValue": ($event) => unref(form).level_id = $event,
              placeholder: "Required"
            }, null, _parent2, _scopeId));
            _push2(`</label>`);
            if (validID.value === true) {
              _push2(`<!--[--><span class="text-green-500"${_scopeId}>Valid ID!</span><h1 class="font-bold text-xl"${_scopeId}>${ssrInterpolate(searchResult.value.name)}</h1><span${_scopeId}>By ${ssrInterpolate(searchResult.value.author)}</span><p${_scopeId}>${ssrInterpolate(searchResult.value.description)}</p><!--]-->`);
            } else if (validID.value === false) {
              _push2(`<span class="text-red-500"${_scopeId}>Invalid ID!</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="rounded w-fit cursor-pointer border border-neutral-700 px-2 py-1 bg-neutral-800"${_scopeId}>Check</div></div><div class="flex justify-center gap-2"${_scopeId}><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded px-2 py-1 w-fit select-none cursor-pointer hover:opacity-50 transition bg-neutral-800 border border-neutral-600"${_scopeId}>Submit Level</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Submit Level to " + toDisplayString(__props.playlist.title), 1),
                createVNode("div", { class: "flex flex-col space-y-2 pane" }, [
                  createVNode("label", { class: "flex flex-col" }, [
                    createVNode("span", { class: "my-1" }, "ID"),
                    createVNode(_sfc_main$1M, {
                      type: "number",
                      modelValue: unref(form).level_id,
                      "onUpdate:modelValue": ($event) => unref(form).level_id = $event,
                      placeholder: "Required"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  validID.value === true ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("span", { class: "text-green-500" }, "Valid ID!"),
                    createVNode("h1", { class: "font-bold text-xl" }, toDisplayString(searchResult.value.name), 1),
                    createVNode("span", null, "By " + toDisplayString(searchResult.value.author), 1),
                    createVNode("p", null, toDisplayString(searchResult.value.description), 1)
                  ], 64)) : validID.value === false ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-red-500"
                  }, "Invalid ID!")) : createCommentVNode("", true),
                  createVNode("div", {
                    onClick: searchID,
                    class: "rounded w-fit cursor-pointer border border-neutral-700 px-2 py-1 bg-neutral-800"
                  }, "Check")
                ]),
                createVNode("div", { class: "flex justify-center gap-2" }, [
                  createVNode("button", {
                    disabled: unref(form).processing,
                    onClick: submit,
                    class: "rounded px-2 py-1 w-fit select-none cursor-pointer hover:opacity-50 transition bg-neutral-800 border border-neutral-600"
                  }, "Submit Level", 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Submissions/Create.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tags: Array
  },
  setup(__props) {
    const form = useForm({
      tag: ""
    });
    const submit = () => {
      form.post(route$1("tags.store"), {
        onFinish: () => form.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Tags" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.$page.props.url
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tags`);
                } else {
                  return [
                    createTextVNode("Tags")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.$page.props.url
              }, {
                default: withCtx(() => [
                  createTextVNode("Tags")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-3/4"${_scopeId}><h2 class="font-bold text-2xl capitalize"${_scopeId}>Levels Tags</h2><div class="y space-y-2"${_scopeId}>`);
            if (__props.tags.length === 0) {
              _push2(`<span class="pane"${_scopeId}>There are no tags</span>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(__props.tags, (tag) => {
                _push2(ssrRenderComponent(unref(Link$1), {
                  class: "pane text-xl",
                  href: unref(route$1)("tags.show", tag.id)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(tag.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(tag.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div></div>`);
            if (_ctx.$page.props.auth && _ctx.$page.props.user.roles.includes("admin")) {
              _push2(`<div class="y space-y-4 w-1/4"${_scopeId}><h2 class="font-bold text-2xl capitalize"${_scopeId}>Add Tag</h2><form class="pane space-y-2"${_scopeId}><label${_scopeId}> Tag Name: `);
              _push2(ssrRenderComponent(_sfc_main$1M, {
                type: "text",
                placeholder: "...",
                modelValue: unref(form).tag,
                "onUpdate:modelValue": ($event) => unref(form).tag = $event
              }, null, _parent2, _scopeId));
              _push2(`</label>`);
              _push2(ssrRenderComponent(_sfc_main$1R, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Add`);
                  } else {
                    return [
                      createTextVNode("Add")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</form></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-3/4" }, [
                createVNode("h2", { class: "font-bold text-2xl capitalize" }, "Levels Tags"),
                createVNode("div", { class: "y space-y-2" }, [
                  __props.tags.length === 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "pane"
                  }, "There are no tags")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.tags, (tag) => {
                    return openBlock(), createBlock(unref(Link$1), {
                      class: "pane text-xl",
                      href: unref(route$1)("tags.show", tag.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(tag.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["href"]);
                  }), 256))
                ])
              ]),
              _ctx.$page.props.auth && _ctx.$page.props.user.roles.includes("admin") ? (openBlock(), createBlock("div", {
                key: 0,
                class: "y space-y-4 w-1/4"
              }, [
                createVNode("h2", { class: "font-bold text-2xl capitalize" }, "Add Tag"),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "pane space-y-2"
                }, [
                  createVNode("label", null, [
                    createTextVNode(" Tag Name: "),
                    createVNode(_sfc_main$1M, {
                      type: "text",
                      placeholder: "...",
                      modelValue: unref(form).tag,
                      "onUpdate:modelValue": ($event) => unref(form).tag = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(_sfc_main$1R, null, {
                    default: withCtx(() => [
                      createTextVNode("Add")
                    ]),
                    _: 1
                  })
                ], 40, ["onSubmit"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tags/Index.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    tag: Object,
    levels: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("levels.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tags`);
                } else {
                  return [
                    createTextVNode("Tags")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(__props.tag.name)}</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: _ctx.route("levels.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Tags")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, toDisplayString(__props.tag.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y space-y-4 w-3/4"${_scopeId}><h2 class="font-bold text-2xl capitalize"${_scopeId}>Levels Tagged <span class="pane !px-2 !py-0.5"${_scopeId}>${ssrInterpolate(__props.tag.name)}</span></h2>`);
            if (__props.levels.data.length === 0) {
              _push2(`<span class="pane"${_scopeId}>There are no levels with this tag</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<template${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.levels }, null, _parent2, _scopeId));
            _push2(`<div class="y pane"${_scopeId}><!--[-->`);
            ssrRenderList(__props.levels.data, (level) => {
              _push2(ssrRenderComponent(unref(Link$1), {
                class: "text-xl",
                href: _ctx.route("levels.show", level.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(level.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(level.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></template></div><div class="y space-y-4 w-1/4"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "y space-y-4 w-3/4" }, [
                createVNode("h2", { class: "font-bold text-2xl capitalize" }, [
                  createTextVNode("Levels Tagged "),
                  createVNode("span", { class: "pane !px-2 !py-0.5" }, toDisplayString(__props.tag.name), 1)
                ]),
                __props.levels.data.length === 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "pane"
                }, "There are no levels with this tag")) : createCommentVNode("", true),
                createVNode("template", null, [
                  createVNode(_sfc_main$1t, { list: __props.levels }, null, 8, ["list"]),
                  createVNode("div", { class: "y pane" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.levels.data, (level) => {
                      return openBlock(), createBlock(unref(Link$1), {
                        class: "text-xl",
                        href: _ctx.route("levels.show", level.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(level.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 256))
                  ])
                ])
              ]),
              createVNode("div", { class: "y space-y-4 w-1/4" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tags/Show.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    forum_id: [Number, String]
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: "",
      forum_id: props.forum_id
    });
    const postData = ref({
      body: "<p></p>",
      signature: !(!usePage().props.auth || !usePage().props.user.signature),
      rich: false
    });
    const submit = () => {
      form.transform((data) => ({
        ...data,
        post: postData.value
      })).post(route$1("threads.create"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("forums.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Create Thread</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("forums.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Forums")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Create Thread")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}>`);
            if (_ctx.$page.props.errors.length > 0) {
              _push2(`<ul class="mt-3 list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.errors, (error, key) => {
                _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h2 class="mx-2 font-bold text-2xl"${_scopeId}>Create a New Thread</h2>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              class: "p-2",
              type: "text",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: "Title (Required)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$J, {
              modelValue: postData.value,
              "onUpdate:modelValue": ($event) => postData.value = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="x justify-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, { onclick: "alert('wip feature')" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save Draft`);
                } else {
                  return [
                    createTextVNode("Save Draft")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1R, {
              disabled: unref(form).processing,
              onClick: submit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Post Thread`);
                } else {
                  return [
                    createTextVNode("Post Thread")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                _ctx.$page.props.errors.length > 0 ? (openBlock(), createBlock("ul", {
                  key: 0,
                  class: "mt-3 list-disc list-inside text-sm text-red-600"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Create a New Thread"),
                createVNode(_sfc_main$1M, {
                  class: "p-2",
                  type: "text",
                  modelValue: unref(form).title,
                  "onUpdate:modelValue": ($event) => unref(form).title = $event,
                  placeholder: "Title (Required)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$J, {
                  modelValue: postData.value,
                  "onUpdate:modelValue": ($event) => postData.value = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "x justify-center gap-2" }, [
                  createVNode(_sfc_main$1R, { onclick: "alert('wip feature')" }, {
                    default: withCtx(() => [
                      createTextVNode("Save Draft")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1R, {
                    disabled: unref(form).processing,
                    onClick: submit
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Post Thread")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Threads/Create.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    thread: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.thread.title
    });
    const submit = () => {
      form.post(route$1("threads.update", props.thread.slug));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Home" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("forums.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Edit Thread</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("forums.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Forums")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Edit Thread")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><h2 class="mx-2 font-bold text-2xl"${_scopeId}>Edit Thread</h2><ul class="list-disc list-inside text-sm text-red-600"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.errors, (error, key) => {
              _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_sfc_main$1M, {
              class: "p-2",
              type: "text",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: "Title (Required)"
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Trying to edit your post? Click the <span class="p-1.5 uppercase tracking-widest select-none text-xs bg-neutral-200 dark:bg-neutral-800 rounded"${_scopeId}>Edit</span> button on the post itself.</p><div class="x justify-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1R, {
              disabled: unref(form).processing,
              onClick: submit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Post Thread`);
                } else {
                  return [
                    createTextVNode("Post Thread")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("h2", { class: "mx-2 font-bold text-2xl" }, "Edit Thread"),
                createVNode("ul", { class: "list-disc list-inside text-sm text-red-600" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                    return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                  }), 128))
                ]),
                createVNode(_sfc_main$1M, {
                  class: "p-2",
                  type: "text",
                  modelValue: unref(form).title,
                  "onUpdate:modelValue": ($event) => unref(form).title = $event,
                  placeholder: "Title (Required)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("p", null, [
                  createTextVNode("Trying to edit your post? Click the "),
                  createVNode("span", { class: "p-1.5 uppercase tracking-widest select-none text-xs bg-neutral-200 dark:bg-neutral-800 rounded" }, "Edit"),
                  createTextVNode(" button on the post itself.")
                ]),
                createVNode("div", { class: "x justify-center gap-2" }, [
                  createVNode(_sfc_main$1R, {
                    disabled: unref(form).processing,
                    onClick: submit
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Post Thread")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Threads/Edit.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    thread: Object
  },
  setup(__props) {
    const props = __props;
    const reply = useForm({
      body: "",
      thread_id: props.thread.id,
      signature: !(!usePage().props.auth || !usePage().props.user.signature)
    });
    const postKey = ref(0);
    const sendReply = () => {
      reply.post(route$1("posts.create"), {
        data: reply,
        preserveScroll: true,
        onSuccess: () => {
          reply.body = "";
          postKey.value++;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: __props.thread.title
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("forums.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forums`);
                } else {
                  return [
                    createTextVNode("Forums")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("forums.show", __props.thread.forum.slug)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.thread.forum.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.thread.forum.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(__props.thread.title)}</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("forums.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Forums")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode(unref(Link$1), {
                href: unref(route$1)("forums.show", __props.thread.forum.slug)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.thread.forum.name), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, toDisplayString(__props.thread.title), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="y w-full space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>${ssrInterpolate(__props.thread.title)}</h2><span class="text-sm"${_scopeId}>Posted by ${ssrInterpolate(__props.thread.author.name)}, ${ssrInterpolate(new Date(__props.thread.created_at).toISOString().replace("T", ", ").replace(".000Z", ""))}, Thread ID: ${ssrInterpolate(__props.thread.id)}</span></div><div class="space-x-2"${_scopeId}>`);
            if (_ctx.$page.props.auth && _ctx.$page.props.user.id === __props.thread.author_id) {
              _push2(ssrRenderComponent(unref(Link$1), {
                class: "button",
                href: unref(route$1)("threads.edit", __props.thread.slug)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Edit Thread`);
                  } else {
                    return [
                      createTextVNode("Edit Thread")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<a href="#reply" class="button"${_scopeId}>Reply</a></div></div>`);
            if (__props.thread.posts && __props.thread.posts.length === 0) {
              _push2(`<div class="pane text-center italic text-neutral-400 dark:text-neutral-500"${_scopeId}>Strangely, this thread doesn&#39;t have a post...</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.thread.posts, (post, index) => {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_sfc_main$K, {
                post,
                op: __props.thread.author.id
              }, null, _parent2, _scopeId));
              if (index === 0) {
                _push2(`<a class="text-center hidden"${_scopeId}><img class="inline" src="https://via.placeholder.com/970x90" alt="Advertisement"${_scopeId}></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
            if (_ctx.$page.props.auth) {
              _push2(`<!--[--><h2 id="reply" class="font-bold text-2xl"${_scopeId}>Reply to This Thread</h2>`);
              if (Object.keys(_ctx.$page.props.errors).length > 0) {
                _push2(`<ul class="list-disc list-inside text-sm text-red-500"${_scopeId}><!--[-->`);
                ssrRenderList(_ctx.$page.props.errors, (error, key) => {
                  _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$J, {
                key: postKey.value,
                submit: sendReply,
                modelValue: unref(reply),
                "onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<div id="reply"${_scopeId}> Log in to post a reply </div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "y w-full space-y-4" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "font-bold text-2xl" }, toDisplayString(__props.thread.title), 1),
                    createVNode("span", { class: "text-sm" }, "Posted by " + toDisplayString(__props.thread.author.name) + ", " + toDisplayString(new Date(__props.thread.created_at).toISOString().replace("T", ", ").replace(".000Z", "")) + ", Thread ID: " + toDisplayString(__props.thread.id), 1)
                  ]),
                  createVNode("div", { class: "space-x-2" }, [
                    _ctx.$page.props.auth && _ctx.$page.props.user.id === __props.thread.author_id ? (openBlock(), createBlock(unref(Link$1), {
                      key: 0,
                      class: "button",
                      href: unref(route$1)("threads.edit", __props.thread.slug)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit Thread")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true),
                    createVNode("a", {
                      href: "#reply",
                      class: "button"
                    }, "Reply")
                  ])
                ]),
                __props.thread.posts && __props.thread.posts.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pane text-center italic text-neutral-400 dark:text-neutral-500"
                }, "Strangely, this thread doesn't have a post...")) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.thread.posts, (post, index) => {
                  return openBlock(), createBlock(Fragment, { key: index }, [
                    createVNode(_sfc_main$K, {
                      post,
                      op: __props.thread.author.id
                    }, null, 8, ["post", "op"]),
                    index === 0 ? (openBlock(), createBlock("a", {
                      key: 0,
                      class: "text-center hidden"
                    }, [
                      createVNode("img", {
                        class: "inline",
                        src: "https://via.placeholder.com/970x90",
                        alt: "Advertisement"
                      })
                    ])) : createCommentVNode("", true)
                  ], 64);
                }), 128)),
                _ctx.$page.props.auth ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("h2", {
                    id: "reply",
                    class: "font-bold text-2xl"
                  }, "Reply to This Thread"),
                  Object.keys(_ctx.$page.props.errors).length > 0 ? (openBlock(), createBlock("ul", {
                    key: 0,
                    class: "list-disc list-inside text-sm text-red-500"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.errors, (error, key) => {
                      return openBlock(), createBlock("li", { key }, toDisplayString(error), 1);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  (openBlock(), createBlock(_sfc_main$J, {
                    key: postKey.value,
                    submit: sendReply,
                    modelValue: unref(reply),
                    "onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                ], 64)) : (openBlock(), createBlock("div", {
                  key: 2,
                  id: "reply"
                }, " Log in to post a reply "))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Threads/Show.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    let sortBy = props.filters.sortBy;
    const sortByNames = [
      "ID",
      "Username",
      "Rating Count"
    ];
    let sortDir = props.filters.sortDir;
    const sortDirNames = [
      "Descending",
      "Ascending"
    ];
    function setSortBy(value) {
      sortBy = value;
      search();
    }
    function setSortDir(value) {
      sortDir = value;
      search();
    }
    const search = () => {
      router.get(route$1("users.index") + "?" + new URLSearchParams({
        sortBy,
        sortDir
      }).toString());
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Users" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("users.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Users`);
                } else {
                  return [
                    createTextVNode("Users")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("users.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Users")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col space-y-2 md:w-3/4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Users</h2>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.users }, null, _parent2, _scopeId));
            _push2(`<div class="flex space-x-4 items-center"${_scopeId}><div class="flex space-x-2 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer"${_scopeId2}><span class="capitalize"${_scopeId2}>${ssrInterpolate(sortByNames[unref(sortBy)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", { class: "capitalize" }, toDisplayString(sortByNames[unref(sortBy)]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t"${_scopeId2}>ID</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"${_scopeId2}>Username</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b"${_scopeId2}>Review Count</div>`);
                } else {
                  return [
                    createVNode("div", {
                      onClick: ($event) => setSortBy(0),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t"
                    }, "ID", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(1),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                    }, "Username", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortBy(2),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b"
                    }, "Review Count", 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex space-x-2 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(Dropdown, { align: "left" }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(sortDirNames[unref(sortDir)])}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                      createVNode("span", null, toDisplayString(sortDirNames[unref(sortDir)]), 1),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t"${_scopeId2}>Descending</div><div class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b"${_scopeId2}>Ascending</div>`);
                } else {
                  return [
                    createVNode("div", {
                      onClick: ($event) => setSortDir(0),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t"
                    }, "Descending", 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => setSortDir(1),
                      class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b"
                    }, "Ascending", 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="y space-y-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.users.data, (user) => {
              _push2(`<div class="x pane transition shadow hover:shadow-lg hover:bg-opacity-75 justify-between items-center px-4 py-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$10, { user }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(user.reviews_count)} Reviews</span></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col space-y-2 md:w-3/4" }, [
                createVNode("div", { class: "flex justify-between items-center" }, [
                  createVNode("h2", { class: "font-bold text-2xl" }, "Users"),
                  createVNode(_sfc_main$1t, { list: __props.users }, null, 8, ["list"]),
                  createVNode("div", { class: "flex space-x-4 items-center" }, [
                    createVNode("div", { class: "flex space-x-2 items-center" }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", { class: "capitalize" }, toDisplayString(sortByNames[unref(sortBy)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setSortBy(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t"
                          }, "ID", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800"
                          }, "Username", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortBy(2),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b"
                          }, "Review Count", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex space-x-2 items-center" }, [
                      createVNode(Dropdown, { align: "left" }, {
                        trigger: withCtx(() => [
                          createVNode("div", { class: "flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer" }, [
                            createVNode("span", null, toDisplayString(sortDirNames[unref(sortDir)]), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-4 w-4",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 9l-7 7-7-7"
                              })
                            ]))
                          ])
                        ]),
                        content: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => setSortDir(0),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t"
                          }, "Descending", 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => setSortDir(1),
                            class: "px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b"
                          }, "Ascending", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "y space-y-1" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (user) => {
                    return openBlock(), createBlock("div", { class: "x pane transition shadow hover:shadow-lg hover:bg-opacity-75 justify-between items-center px-4 py-2" }, [
                      createVNode(_sfc_main$10, { user }, null, 8, ["user"]),
                      createVNode("span", null, toDisplayString(user.reviews_count) + " Reviews", 1)
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Names",
  __ssrInlineRender: true,
  props: {
    profile: Object,
    names: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Username History" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("users.show", __props.profile.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.profile.name)}&#39;s Profile`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.profile.name) + "'s Profile", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Username History</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("users.show", __props.profile.id)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.profile.name) + "'s Profile", 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Username History")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col space-y-2 md:w-3/4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>${ssrInterpolate(__props.profile.name)}&#39;s Username History</h2></div>`);
            if (__props.names.length > 0) {
              _push2(`<div class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.names, (change) => {
                _push2(`<div class="block justify-between flex items-center px-4 py-2"${_scopeId}><span${_scopeId}>From ${ssrInterpolate(change.from)} to ${ssrInterpolate(change.to)}</span><span class="text-sm text-neutral-400 dark:text-neutral-600"${_scopeId}>${ssrInterpolate(new Date(change.created_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }))}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div${_scopeId}>No name changes have been logged</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col space-y-2 md:w-3/4" }, [
                createVNode("div", { class: "flex justify-between items-center" }, [
                  createVNode("h2", { class: "font-bold text-2xl" }, toDisplayString(__props.profile.name) + "'s Username History", 1)
                ]),
                __props.names.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.names, (change) => {
                    return openBlock(), createBlock("div", { class: "block justify-between flex items-center px-4 py-2" }, [
                      createVNode("span", null, "From " + toDisplayString(change.from) + " to " + toDisplayString(change.to), 1),
                      createVNode("span", { class: "text-sm text-neutral-400 dark:text-neutral-600" }, toDisplayString(new Date(change.created_at).toLocaleString([], { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })), 1)
                    ]);
                  }), 256))
                ])) : (openBlock(), createBlock("div", { key: 1 }, "No name changes have been logged"))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Names.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Reputation",
  __ssrInlineRender: true,
  props: {
    profile: Object,
    reps: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Reputation Log" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("users.show", __props.profile.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.profile.name)}&#39;s Profile`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.profile.name) + "'s Profile", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>Reputation Log</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("users.show", __props.profile.id)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.profile.name) + "'s Profile", 1)
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, "Reputation Log")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="flex flex-col space-y-2 md:w-3/4"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>${ssrInterpolate(__props.profile.name)}&#39;s Reputation</h2>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.reps }, null, _parent2, _scopeId));
            _push2(`<div class="pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.reps.data, (rep) => {
              var _a;
              _push2(`<div class="x items-center py-4 px-4"${_scopeId}><div class="${ssrRenderClass([{ "!bg-red-500": rep.reputation < 0, "!bg-green-500": rep.reputation > 0, "!text-white": rep.reputation !== 0 }, "x items-center font-bold p-2 w-8 h-8 rounded mr-4 bg-neutral-200 dark:bg-neutral-800"])}"${_scopeId}><span class="text-center w-full"${_scopeId}>${ssrInterpolate(rep.reputation > 0 ? "+" : "")}${ssrInterpolate(rep.reputation)}</span></div><div class="y"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$10, {
                class: "text-xs",
                user: rep.sender
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm"${_scopeId}>${ssrInterpolate((_a = rep.reason) != null ? _a : "none")}</span></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "flex flex-col space-y-2 md:w-3/4" }, [
                  createVNode("h2", { class: "font-bold text-2xl" }, toDisplayString(__props.profile.name) + "'s Reputation", 1),
                  createVNode(_sfc_main$1t, { list: __props.reps }, null, 8, ["list"]),
                  createVNode("div", { class: "pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.reps.data, (rep) => {
                      var _a;
                      return openBlock(), createBlock("div", { class: "x items-center py-4 px-4" }, [
                        createVNode("div", {
                          class: ["x items-center font-bold p-2 w-8 h-8 rounded mr-4 bg-neutral-200 dark:bg-neutral-800", { "!bg-red-500": rep.reputation < 0, "!bg-green-500": rep.reputation > 0, "!text-white": rep.reputation !== 0 }]
                        }, [
                          createVNode("span", { class: "text-center w-full" }, toDisplayString(rep.reputation > 0 ? "+" : "") + toDisplayString(rep.reputation), 1)
                        ], 2),
                        createVNode("div", { class: "y" }, [
                          createVNode(_sfc_main$10, {
                            class: "text-xs",
                            user: rep.sender
                          }, null, 8, ["user"]),
                          createVNode("span", { class: "text-sm" }, toDisplayString((_a = rep.reason) != null ? _a : "none"), 1)
                        ])
                      ]);
                    }), 256))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Reputation.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    decorate: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const currentTab = ref(0);
    const slots = useSlots().default();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "y gap-2" }, _attrs))}><div class="text-center pane !px-1 !py-3 !rounded-lg select-none"><div class="x font-bold text-sm uppercase justify-around items-center relative"><!--[-->`);
      ssrRenderList(unref(slots), (tab, index) => {
        var _a;
        _push(`<!--[--><label class="${ssrRenderClass([{ "cursor-pointer": parseInt(currentTab.value) !== index }, "z-10 grow"])}"${ssrRenderAttr("for", `tab-${index}`)}>${ssrInterpolate((_a = unref(slots)[index].props["data-tab-name"]) != null ? _a : "Tab")}</label><input class="hidden"${ssrRenderAttr("value", index)} type="radio"${ssrRenderAttr("id", `tab-${index}`)} name="tab"><!--]-->`);
      });
      _push(`<!--]--><div class="z-0 bg-neutral-900/60 absolute glider left-0 rounded-lg py-2 transition-transform ease-out duration-200" style="${ssrRenderStyle(`width: calc(100% / ${unref(slots).length}); transform: translateX(calc(100% * ${currentTab.value}));`)}">\xA0</div></div></div><!--[-->`);
      ssrRenderList(unref(slots), (tab, index) => {
        _push(`<!--[-->`);
        if (parseInt(currentTab.value) === index) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab), null, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Tabs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    profile: Object,
    comments: Object,
    reviews: Object
  },
  setup(__props) {
    const props = __props;
    const newComment = useForm({
      body: "",
      user_id: props.profile.id
    });
    const postComment = () => {
      newComment.post(route$1("user.comments.store", props.profile.id), {
        preserveScroll: true,
        onSuccess: () => {
          newComment.body = "";
        }
      });
    };
    const isOnline = (time) => {
      const now = new Date();
      const then = new Date(time);
      return now - then <= 3e5;
    };
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({
        title: "Home",
        background: __props.profile.banner_url,
        decorations: false
      }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("users.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Users`);
                } else {
                  return [
                    createTextVNode("Users")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId}><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(__props.profile.id)}</span>`);
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("users.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Users")
                ]),
                _: 1
              }, 8, ["href"]),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                class: "w-4 h-4"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
                  "clip-rule": "evenodd"
                })
              ])),
              createVNode("span", null, toDisplayString(__props.profile.id), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="x h-64 justify-center lg:max-w-5xl xl:max-w-6xl w-full w-full bg-cover bg-center"${_scopeId}><div class="y justify-between w-full lg:max-w-5xl xl:max-w-6xl p-4"${_scopeId}><div class="${ssrRenderClass([{ "justify-end": !_ctx.$page.props.auth || __props.profile.id === _ctx.$page.props.user.id, "justify-between": _ctx.$page.props.auth && __props.profile.id !== _ctx.$page.props.user.id }, "x w-full gap-2"])}"${_scopeId}>`);
            if (_ctx.$page.props.auth && __props.profile.id !== _ctx.$page.props.user.id) {
              _push2(`<div class="x gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link$1), {
                href: unref(route$1)("inbox.create") + "?to=" + __props.profile.id,
                class: "transition-colors cursor-pointer text-xs rounded bg-neutral-300 dark:bg-neutral-800 !bg-opacity-75 px-2 pb-1 pt-1.5 uppercase"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Message`);
                  } else {
                    return [
                      createTextVNode("Message")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="x gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("reports.create") + `?type=user&id=${__props.profile.idr}`,
              class: "transition-colors cursor-pointer text-xs rounded bg-neutral-300 dark:bg-neutral-800 !bg-opacity-75 px-2 pb-1 pt-1.5 uppercase"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Report`);
                } else {
                  return [
                    createTextVNode("Report")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="x items-end justify-between"${_scopeId}><div class="x items-end"${_scopeId}><div class="x shrink-0 shadow-lg justify-center items-center rounded-full w-40 h-40 -mb-16 z-10 mr-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1D, { user: __props.profile }, null, _parent2, _scopeId));
            _push2(`</div><div class="leading-none text-neutral-200"${_scopeId}><h1 class="font-bold text-2xl"${_scopeId}>${ssrInterpolate(__props.profile.name)}</h1><span class="text-sm"${_scopeId}>Junior Member</span></div></div><div class="x text-neutral-200"${_scopeId}><div class="x items-center gap-2 px-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"${_scopeId}><path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd"${_scopeId}></path></svg><div class="y"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.profile.posts_count)}</span><span class="uppercase text-xs opacity-75 tracking-widest"${_scopeId}>Posts</span></div></div><div class="x items-center gap-2 px-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"${_scopeId}><path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z"${_scopeId}></path><path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z"${_scopeId}></path></svg><div class="y"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.profile.threads_count)}</span><span class="uppercase text-xs opacity-75 tracking-widest"${_scopeId}>Threads</span></div></div><div class="x items-center gap-2 px-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"${_scopeId}><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"${_scopeId}></path></svg><div class="y"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.reviews.total)}</span><span class="uppercase text-xs opacity-75 tracking-widest"${_scopeId}>Reviews</span></div></div></div></div></div></div><div class="x justify-center pane !py-0 lg:max-w-5xl xl:max-w-6xl w-full w-full"${_scopeId}><div class="x w-full justify-between px-4 py-2"${_scopeId}><div class="mt-12 sm:mt-0 sm:ml-44 z-10"${_scopeId}><span class="${ssrRenderClass([isOnline() ? "text-green-500" : "text-red-500", "text-sm font-bold mr-1 uppercase"])}"${_scopeId}>${ssrInterpolate(isOnline(__props.profile.last_seen) ? "ON" : "OFF")}LINE</span> Last seen `);
            _push2(ssrRenderComponent(_sfc_main$11, {
              time: __props.profile.last_seen
            }, null, _parent2, _scopeId));
            _push2(`<br${_scopeId}><span${_scopeId}>Time spent online: `);
            _push2(ssrRenderComponent(_sfc_main$11, {
              time: __props.profile.time_online,
              length: true
            }, null, _parent2, _scopeId));
            _push2(`</span></div><div${_scopeId}></div></div></div><div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4"${_scopeId}><div class="flex flex-col space-y-4 md:w-1/4"${_scopeId}><div class="y pane text-sm !px-2"${_scopeId}><div class="x justify-between p-2"${_scopeId}><span${_scopeId}>Reputation:</span>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("reputation.show", __props.profile.id),
              class: "text-black dark:text-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.profile.reputation)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.profile.reputation), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="x justify-between p-2"${_scopeId}><span${_scopeId}>Credits:</span><span${_scopeId}>${ssrInterpolate(__props.profile.credits)}</span></div><div class="x justify-between p-2"${_scopeId}><span${_scopeId}>Username Changes:</span>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("names.show", __props.profile.id),
              class: "text-black dark:text-white"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.profile.names_count)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.profile.names_count), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="x justify-between p-2"${_scopeId}><span${_scopeId}>Member Since:</span><span${_scopeId}>${ssrInterpolate(new Date(__props.profile.created_at).toLocaleDateString())}</span></div></div></div><div class="flex flex-col space-y-4 md:w-3/4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { decorate: false }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-tab-name="About" class="y gap-2"${_scopeId2}><div class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId2}><div class="transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1"${_scopeId2}> Bio </div>`);
                  if (__props.profile.bio) {
                    _push3(`<p class="px-4 py-2 text-sm whitespace-pre-wrap"${_scopeId2}>${ssrInterpolate(__props.profile.bio)}</p>`);
                  } else {
                    _push3(`<span class="opacity-50 italic px-4 py-2"${_scopeId2}>This user didn&#39;t write anything</span>`);
                  }
                  _push3(`</div><div class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700"${_scopeId2}><div class="transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1"${_scopeId2}> Signature </div>`);
                  if (__props.profile.signature) {
                    _push3(`<p class="px-4 py-2 whitespace-pre-wrap"${_scopeId2}>${ssrInterpolate(__props.profile.signature)}</p>`);
                  } else {
                    _push3(`<span class="opacity-50 italic px-4 py-2"${_scopeId2}>This user has no signature</span>`);
                  }
                  _push3(`</div></div><div data-tab-name="Comments" class="y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50"${_scopeId2}><div class="transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1"${_scopeId2}>Profile Comments</div>`);
                  if (__props.comments.data.length === 0) {
                    _push3(`<div class="px-4 py-2"${_scopeId2}> Nobody has commented on ${ssrInterpolate(__props.profile.name)}&#39;s profile yet. `);
                    if (_ctx.$page.props.auth) {
                      _push3(`<span${_scopeId2}>Be the first!</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.comments.data, (comment) => {
                      _push3(`<div class="x gap-4 items-center justify-between p-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$1D, {
                        class: "w-8",
                        user: comment.commenter
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="y w-full"${_scopeId2}><div class="x justify-between mb-1 text-xs"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link$1), {
                        href: unref(route$1)("users.show", comment.commenter_id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(comment.commenter.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(comment.commenter.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>${ssrInterpolate(new Date(comment.created_at).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }))}</span></div><p class="text-sm"${_scopeId2}>${ssrInterpolate(comment.body)}</p></div></div>`);
                    });
                    _push3(`<!--]-->`);
                  }
                  _push3(`<div class="px-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1t, {
                    class: "py-2",
                    list: __props.comments
                  }, null, _parent3, _scopeId2));
                  if (_ctx.$page.props.auth) {
                    _push3(`<div class="y items-center gap-2 pb-2"${_scopeId2}><textarea style="${ssrRenderStyle({ "min-height": "4rem !important" })}" class="resize-none !min-h-16 resize-y h-fit w-full placeholder-neutral-400 dark:placeholder-neutral-500 pane border-none" placeholder="Comment..."${_scopeId2}>${ssrInterpolate(unref(newComment).body)}</textarea>`);
                    _push3(ssrRenderComponent(_sfc_main$1R, {
                      onClick: postComment,
                      class: "w-fit"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Submit Comment`);
                        } else {
                          return [
                            createTextVNode("Submit Comment")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div data-tab-name="Activity"${_scopeId2}><div class="y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50"${_scopeId2}><div class="transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1"${_scopeId2}> Recent Reviews </div>`);
                  if (__props.reviews.data.length === 0) {
                    _push3(`<div class="px-4 py-2"${_scopeId2}> User has not written any reviews </div>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.reviews.data, (review) => {
                      _push3(ssrRenderComponent(unref(Link$1), {
                        href: unref(route$1)("levels.show", review.level.id),
                        class: "y justify-between px-4 py-2"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<h2 class="font-bold"${_scopeId3}>${ssrInterpolate(review.level.name)}</h2><span class="text-xs"${_scopeId3}>by\xA0<span class="font-bold"${_scopeId3}>${ssrInterpolate(review.level.creator)}</span></span><div class="x flex-wrap gap-x-4 lg:gap-x-2 items-center justify-between"${_scopeId3}><span class="text-xs"${_scopeId3}>DIFF:\xA0${ssrInterpolate(review.rating_difficulty ? Math.round(review.rating_difficulty / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId3}>GAME:\xA0${ssrInterpolate(review.rating_gameplay ? Math.round(review.rating_gameplay / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId3}>VIS:\xA0${ssrInterpolate(review.rating_visuals ? Math.round(review.rating_visuals / 2 * 100) / 100 : "N/A")}</span><span class="text-xs"${_scopeId3}>ALL:\xA0${ssrInterpolate(review.rating_overall ? Math.round(review.rating_overall / 2 * 100) / 100 : "N/A")}</span></div><p class="text-sm"${_scopeId3}>${ssrInterpolate(review.review)}</p>`);
                          } else {
                            return [
                              createVNode("h2", { class: "font-bold" }, toDisplayString(review.level.name), 1),
                              createVNode("span", { class: "text-xs" }, [
                                createTextVNode("by\xA0"),
                                createVNode("span", { class: "font-bold" }, toDisplayString(review.level.creator), 1)
                              ]),
                              createVNode("div", { class: "x flex-wrap gap-x-4 lg:gap-x-2 items-center justify-between" }, [
                                createVNode("span", { class: "text-xs" }, "DIFF:\xA0" + toDisplayString(review.rating_difficulty ? Math.round(review.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                                createVNode("span", { class: "text-xs" }, "GAME:\xA0" + toDisplayString(review.rating_gameplay ? Math.round(review.rating_gameplay / 2 * 100) / 100 : "N/A"), 1),
                                createVNode("span", { class: "text-xs" }, "VIS:\xA0" + toDisplayString(review.rating_visuals ? Math.round(review.rating_visuals / 2 * 100) / 100 : "N/A"), 1),
                                createVNode("span", { class: "text-xs" }, "ALL:\xA0" + toDisplayString(review.rating_overall ? Math.round(review.rating_overall / 2 * 100) / 100 : "N/A"), 1)
                              ]),
                              createVNode("p", { class: "text-sm" }, toDisplayString(review.review), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$1t, {
                    class: "py-2",
                    list: __props.reviews
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "data-tab-name": "About",
                      class: "y gap-2"
                    }, [
                      createVNode("div", { class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                        createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, " Bio "),
                        __props.profile.bio ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "px-4 py-2 text-sm whitespace-pre-wrap"
                        }, toDisplayString(__props.profile.bio), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "opacity-50 italic px-4 py-2"
                        }, "This user didn't write anything"))
                      ]),
                      createVNode("div", { class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                        createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, " Signature "),
                        __props.profile.signature ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "px-4 py-2 whitespace-pre-wrap"
                        }, toDisplayString(__props.profile.signature), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "opacity-50 italic px-4 py-2"
                        }, "This user has no signature"))
                      ])
                    ]),
                    createVNode("div", {
                      "data-tab-name": "Comments",
                      class: "y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50"
                    }, [
                      createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, "Profile Comments"),
                      __props.comments.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "px-4 py-2"
                      }, [
                        createTextVNode(" Nobody has commented on " + toDisplayString(__props.profile.name) + "'s profile yet. ", 1),
                        _ctx.$page.props.auth ? (openBlock(), createBlock("span", { key: 0 }, "Be the first!")) : createCommentVNode("", true)
                      ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.comments.data, (comment) => {
                        return openBlock(), createBlock("div", { class: "x gap-4 items-center justify-between p-4" }, [
                          createVNode(_sfc_main$1D, {
                            class: "w-8",
                            user: comment.commenter
                          }, null, 8, ["user"]),
                          createVNode("div", { class: "y w-full" }, [
                            createVNode("div", { class: "x justify-between mb-1 text-xs" }, [
                              createVNode(unref(Link$1), {
                                href: unref(route$1)("users.show", comment.commenter_id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(comment.commenter.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("span", null, toDisplayString(new Date(comment.created_at).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })), 1)
                            ]),
                            createVNode("p", { class: "text-sm" }, toDisplayString(comment.body), 1)
                          ])
                        ]);
                      }), 256)),
                      createVNode("div", { class: "px-2" }, [
                        createVNode(_sfc_main$1t, {
                          class: "py-2",
                          list: __props.comments
                        }, null, 8, ["list"]),
                        _ctx.$page.props.auth ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "y items-center gap-2 pb-2"
                        }, [
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(newComment).body = $event,
                            style: { "min-height": "4rem !important" },
                            class: "resize-none !min-h-16 resize-y h-fit w-full placeholder-neutral-400 dark:placeholder-neutral-500 pane border-none",
                            placeholder: "Comment..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(newComment).body]
                          ]),
                          createVNode(_sfc_main$1R, {
                            onClick: postComment,
                            class: "w-fit"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Submit Comment")
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { "data-tab-name": "Activity" }, [
                      createVNode("div", { class: "y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50" }, [
                        createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, " Recent Reviews "),
                        __props.reviews.data.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "px-4 py-2"
                        }, " User has not written any reviews ")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.reviews.data, (review) => {
                          return openBlock(), createBlock(unref(Link$1), {
                            href: unref(route$1)("levels.show", review.level.id),
                            class: "y justify-between px-4 py-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "font-bold" }, toDisplayString(review.level.name), 1),
                              createVNode("span", { class: "text-xs" }, [
                                createTextVNode("by\xA0"),
                                createVNode("span", { class: "font-bold" }, toDisplayString(review.level.creator), 1)
                              ]),
                              createVNode("div", { class: "x flex-wrap gap-x-4 lg:gap-x-2 items-center justify-between" }, [
                                createVNode("span", { class: "text-xs" }, "DIFF:\xA0" + toDisplayString(review.rating_difficulty ? Math.round(review.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                                createVNode("span", { class: "text-xs" }, "GAME:\xA0" + toDisplayString(review.rating_gameplay ? Math.round(review.rating_gameplay / 2 * 100) / 100 : "N/A"), 1),
                                createVNode("span", { class: "text-xs" }, "VIS:\xA0" + toDisplayString(review.rating_visuals ? Math.round(review.rating_visuals / 2 * 100) / 100 : "N/A"), 1),
                                createVNode("span", { class: "text-xs" }, "ALL:\xA0" + toDisplayString(review.rating_overall ? Math.round(review.rating_overall / 2 * 100) / 100 : "N/A"), 1)
                              ]),
                              createVNode("p", { class: "text-sm" }, toDisplayString(review.review), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"]);
                        }), 256)),
                        createVNode(_sfc_main$1t, {
                          class: "py-2",
                          list: __props.reviews
                        }, null, 8, ["list"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "x h-64 justify-center lg:max-w-5xl xl:max-w-6xl w-full w-full bg-cover bg-center" }, [
                createVNode("div", { class: "y justify-between w-full lg:max-w-5xl xl:max-w-6xl p-4" }, [
                  createVNode("div", {
                    class: ["x w-full gap-2", { "justify-end": !_ctx.$page.props.auth || __props.profile.id === _ctx.$page.props.user.id, "justify-between": _ctx.$page.props.auth && __props.profile.id !== _ctx.$page.props.user.id }]
                  }, [
                    _ctx.$page.props.auth && __props.profile.id !== _ctx.$page.props.user.id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "x gap-2"
                    }, [
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("inbox.create") + "?to=" + __props.profile.id,
                        class: "transition-colors cursor-pointer text-xs rounded bg-neutral-300 dark:bg-neutral-800 !bg-opacity-75 px-2 pb-1 pt-1.5 uppercase"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Message")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "x gap-2" }, [
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("reports.create") + `?type=user&id=${__props.profile.idr}`,
                        class: "transition-colors cursor-pointer text-xs rounded bg-neutral-300 dark:bg-neutral-800 !bg-opacity-75 px-2 pb-1 pt-1.5 uppercase"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Report")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ], 2),
                  createVNode("div", { class: "x items-end justify-between" }, [
                    createVNode("div", { class: "x items-end" }, [
                      createVNode("div", { class: "x shrink-0 shadow-lg justify-center items-center rounded-full w-40 h-40 -mb-16 z-10 mr-4" }, [
                        createVNode(_sfc_main$1D, { user: __props.profile }, null, 8, ["user"])
                      ]),
                      createVNode("div", { class: "leading-none text-neutral-200" }, [
                        createVNode("h1", { class: "font-bold text-2xl" }, toDisplayString(__props.profile.name), 1),
                        createVNode("span", { class: "text-sm" }, "Junior Member")
                      ])
                    ]),
                    createVNode("div", { class: "x text-neutral-200" }, [
                      createVNode("div", { class: "x items-center gap-2 px-4" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          class: "w-6 h-6"
                        }, [
                          createVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z",
                            "clip-rule": "evenodd"
                          })
                        ])),
                        createVNode("div", { class: "y" }, [
                          createVNode("span", null, toDisplayString(__props.profile.posts_count), 1),
                          createVNode("span", { class: "uppercase text-xs opacity-75 tracking-widest" }, "Posts")
                        ])
                      ]),
                      createVNode("div", { class: "x items-center gap-2 px-4" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          class: "w-6 h-6"
                        }, [
                          createVNode("path", { d: "M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" }),
                          createVNode("path", { d: "M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" })
                        ])),
                        createVNode("div", { class: "y" }, [
                          createVNode("span", null, toDisplayString(__props.profile.threads_count), 1),
                          createVNode("span", { class: "uppercase text-xs opacity-75 tracking-widest" }, "Threads")
                        ])
                      ]),
                      createVNode("div", { class: "x items-center gap-2 px-4" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          class: "w-6 h-6"
                        }, [
                          createVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                            "clip-rule": "evenodd"
                          })
                        ])),
                        createVNode("div", { class: "y" }, [
                          createVNode("span", null, toDisplayString(__props.reviews.total), 1),
                          createVNode("span", { class: "uppercase text-xs opacity-75 tracking-widest" }, "Reviews")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "x justify-center pane !py-0 lg:max-w-5xl xl:max-w-6xl w-full w-full" }, [
                createVNode("div", { class: "x w-full justify-between px-4 py-2" }, [
                  createVNode("div", { class: "mt-12 sm:mt-0 sm:ml-44 z-10" }, [
                    createVNode("span", {
                      class: ["text-sm font-bold mr-1 uppercase", isOnline() ? "text-green-500" : "text-red-500"]
                    }, toDisplayString(isOnline(__props.profile.last_seen) ? "ON" : "OFF") + "LINE", 3),
                    createTextVNode(" Last seen "),
                    createVNode(_sfc_main$11, {
                      time: __props.profile.last_seen
                    }, null, 8, ["time"]),
                    createVNode("br"),
                    createVNode("span", null, [
                      createTextVNode("Time spent online: "),
                      createVNode(_sfc_main$11, {
                        time: __props.profile.time_online,
                        length: true
                      }, null, 8, ["time"])
                    ])
                  ]),
                  createVNode("div")
                ])
              ]),
              createVNode("div", { class: "flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4" }, [
                createVNode("div", { class: "flex flex-col space-y-4 md:w-1/4" }, [
                  createVNode("div", { class: "y pane text-sm !px-2" }, [
                    createVNode("div", { class: "x justify-between p-2" }, [
                      createVNode("span", null, "Reputation:"),
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("reputation.show", __props.profile.id),
                        class: "text-black dark:text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.profile.reputation), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "x justify-between p-2" }, [
                      createVNode("span", null, "Credits:"),
                      createVNode("span", null, toDisplayString(__props.profile.credits), 1)
                    ]),
                    createVNode("div", { class: "x justify-between p-2" }, [
                      createVNode("span", null, "Username Changes:"),
                      createVNode(unref(Link$1), {
                        href: unref(route$1)("names.show", __props.profile.id),
                        class: "text-black dark:text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.profile.names_count), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "x justify-between p-2" }, [
                      createVNode("span", null, "Member Since:"),
                      createVNode("span", null, toDisplayString(new Date(__props.profile.created_at).toLocaleDateString()), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col space-y-4 md:w-3/4" }, [
                  createVNode(_sfc_main$2, { decorate: false }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        "data-tab-name": "About",
                        class: "y gap-2"
                      }, [
                        createVNode("div", { class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                          createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, " Bio "),
                          __props.profile.bio ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "px-4 py-2 text-sm whitespace-pre-wrap"
                          }, toDisplayString(__props.profile.bio), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "opacity-50 italic px-4 py-2"
                          }, "This user didn't write anything"))
                        ]),
                        createVNode("div", { class: "y pane !px-0 !py-0 divide-y dark:divide-neutral-700" }, [
                          createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, " Signature "),
                          __props.profile.signature ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "px-4 py-2 whitespace-pre-wrap"
                          }, toDisplayString(__props.profile.signature), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "opacity-50 italic px-4 py-2"
                          }, "This user has no signature"))
                        ])
                      ]),
                      createVNode("div", {
                        "data-tab-name": "Comments",
                        class: "y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50"
                      }, [
                        createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, "Profile Comments"),
                        __props.comments.data.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "px-4 py-2"
                        }, [
                          createTextVNode(" Nobody has commented on " + toDisplayString(__props.profile.name) + "'s profile yet. ", 1),
                          _ctx.$page.props.auth ? (openBlock(), createBlock("span", { key: 0 }, "Be the first!")) : createCommentVNode("", true)
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.comments.data, (comment) => {
                          return openBlock(), createBlock("div", { class: "x gap-4 items-center justify-between p-4" }, [
                            createVNode(_sfc_main$1D, {
                              class: "w-8",
                              user: comment.commenter
                            }, null, 8, ["user"]),
                            createVNode("div", { class: "y w-full" }, [
                              createVNode("div", { class: "x justify-between mb-1 text-xs" }, [
                                createVNode(unref(Link$1), {
                                  href: unref(route$1)("users.show", comment.commenter_id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(comment.commenter.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("span", null, toDisplayString(new Date(comment.created_at).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })), 1)
                              ]),
                              createVNode("p", { class: "text-sm" }, toDisplayString(comment.body), 1)
                            ])
                          ]);
                        }), 256)),
                        createVNode("div", { class: "px-2" }, [
                          createVNode(_sfc_main$1t, {
                            class: "py-2",
                            list: __props.comments
                          }, null, 8, ["list"]),
                          _ctx.$page.props.auth ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "y items-center gap-2 pb-2"
                          }, [
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(newComment).body = $event,
                              style: { "min-height": "4rem !important" },
                              class: "resize-none !min-h-16 resize-y h-fit w-full placeholder-neutral-400 dark:placeholder-neutral-500 pane border-none",
                              placeholder: "Comment..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(newComment).body]
                            ]),
                            createVNode(_sfc_main$1R, {
                              onClick: postComment,
                              class: "w-fit"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Submit Comment")
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { "data-tab-name": "Activity" }, [
                        createVNode("div", { class: "y pane !px-0 !py-0 divide-y divide-neutral-100/50 dark:divide-neutral-700/50" }, [
                          createVNode("div", { class: "transition-colors rounded-t bg-neutral-100 dark:bg-neutral-800 !bg-opacity-50 px-2 py-1" }, " Recent Reviews "),
                          __props.reviews.data.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "px-4 py-2"
                          }, " User has not written any reviews ")) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.reviews.data, (review) => {
                            return openBlock(), createBlock(unref(Link$1), {
                              href: unref(route$1)("levels.show", review.level.id),
                              class: "y justify-between px-4 py-2"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "font-bold" }, toDisplayString(review.level.name), 1),
                                createVNode("span", { class: "text-xs" }, [
                                  createTextVNode("by\xA0"),
                                  createVNode("span", { class: "font-bold" }, toDisplayString(review.level.creator), 1)
                                ]),
                                createVNode("div", { class: "x flex-wrap gap-x-4 lg:gap-x-2 items-center justify-between" }, [
                                  createVNode("span", { class: "text-xs" }, "DIFF:\xA0" + toDisplayString(review.rating_difficulty ? Math.round(review.rating_difficulty / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "GAME:\xA0" + toDisplayString(review.rating_gameplay ? Math.round(review.rating_gameplay / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "VIS:\xA0" + toDisplayString(review.rating_visuals ? Math.round(review.rating_visuals / 2 * 100) / 100 : "N/A"), 1),
                                  createVNode("span", { class: "text-xs" }, "ALL:\xA0" + toDisplayString(review.rating_overall ? Math.round(review.rating_overall / 2 * 100) / 100 : "N/A"), 1)
                                ]),
                                createVNode("p", { class: "text-sm" }, toDisplayString(review.review), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 256)),
                          createVNode(_sfc_main$1t, {
                            class: "py-2",
                            list: __props.reviews
                          }, null, 8, ["list"])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Show.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    videos: Object
  },
  setup(__props) {
    const form = useForm({
      level_id: null,
      video_id: ""
    });
    const submit = () => {
      form.transform((data) => ({
        ...data,
        video_id: getYouTubeID(form.video_id)
      })).post(route$1("videos.store"), {
        onFinish: () => form.reset("video_id", "level_id")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1w, mergeProps({ title: "Videos" }, _attrs), {
        breadcrumbs: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Link$1), {
              href: unref(route$1)("videos.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Videos`);
                } else {
                  return [
                    createTextVNode("Videos")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Link$1), {
                href: unref(route$1)("videos.index")
              }, {
                default: withCtx(() => [
                  createTextVNode("Videos")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col space-y-4 md:w-3/4"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Videos</h2>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.videos }, null, _parent2, _scopeId));
            if (__props.videos.total === 0) {
              _push2(`<div class="pane text-center italic text-neutral-400 dark:text-neutral-500"${_scopeId}>No Videos ;(</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.videos.data, (video) => {
              _push2(ssrRenderComponent(Lightbox, { class: "w-full" }, {
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="y space-y-2"${_scopeId2}><iframe class="rounded box !px-0 !py-0 aspect-video h-[60vh]"${ssrRenderAttr("src", "https://www.youtube-nocookie.com/embed/" + video.video_id)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen${_scopeId2}></iframe><div class="x gap-2 justify-between dark:text-neutral-200"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Link$1), {
                      onClick: () => {
                      },
                      href: unref(route$1)("levels.show", video.level_id),
                      class: "box !py-1 !px-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Level Page`);
                        } else {
                          return [
                            createTextVNode("Level Page")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<a${ssrRenderAttr("href", `https://youtube.com/watch?v=${video.video_id}`)} target="_blank" class="x items-center space-x-1 box !py-1 !px-3"${_scopeId2}><span${_scopeId2}>YouTube Video</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"${_scopeId2}><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"${_scopeId2}></path><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"${_scopeId2}></path></svg></a></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "y space-y-2" }, [
                        createVNode("iframe", {
                          class: "rounded box !px-0 !py-0 aspect-video h-[60vh]",
                          src: "https://www.youtube-nocookie.com/embed/" + video.video_id,
                          frameborder: "0",
                          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                          allowfullscreen: ""
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "x gap-2 justify-between dark:text-neutral-200" }, [
                          createVNode(unref(Link$1), {
                            onClick: withModifiers(() => {
                            }, ["stop"]),
                            href: unref(route$1)("levels.show", video.level_id),
                            class: "box !py-1 !px-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Level Page")
                            ]),
                            _: 2
                          }, 1032, ["onClick", "href"]),
                          createVNode("a", {
                            onClick: withModifiers(() => {
                            }, ["stop"]),
                            href: `https://youtube.com/watch?v=${video.video_id}`,
                            target: "_blank",
                            class: "x items-center space-x-1 box !py-1 !px-3"
                          }, [
                            createVNode("span", null, "YouTube Video"),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 20 20",
                              fill: "currentColor",
                              class: "w-4 h-4"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z",
                                "clip-rule": "evenodd"
                              }),
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z",
                                "clip-rule": "evenodd"
                              })
                            ]))
                          ], 8, ["onClick", "href"])
                        ])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="w-full aspect-video object-cover rounded glass" loading="lazy"${ssrRenderAttr("src", `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`)} alt="Thumbnail"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "w-full aspect-video object-cover rounded glass",
                        loading: "lazy",
                        src: `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`,
                        alt: "Thumbnail"
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { list: __props.videos }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col space-y-4 md:w-1/4"${_scopeId}><h2 class="font-bold text-2xl"${_scopeId}>Submit Video</h2>`);
            if (_ctx.$page.props.auth) {
              _push2(`<div class="glass p-4"${_scopeId}><form class="space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1M, {
                modelValue: unref(form).video_id,
                "onUpdate:modelValue": ($event) => unref(form).video_id = $event,
                type: "text",
                placeholder: "YouTube Video Link",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1M, {
                modelValue: unref(form).level_id,
                "onUpdate:modelValue": ($event) => unref(form).level_id = $event,
                type: "text",
                placeholder: "Level ID",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1R, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Add`);
                  } else {
                    return [
                      createTextVNode("Add")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</form></div>`);
            } else {
              _push2(`<div class="pane"${_scopeId}><span${_scopeId}>You must `);
              _push2(ssrRenderComponent(unref(Link$1), {
                class: "underline",
                href: unref(route$1)("auth::login")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`log in`);
                  } else {
                    return [
                      createTextVNode("log in")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` to submit a video</span></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col space-y-4 md:w-3/4" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Videos"),
                createVNode(_sfc_main$1t, { list: __props.videos }, null, 8, ["list"]),
                __props.videos.total === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pane text-center italic text-neutral-400 dark:text-neutral-500"
                }, "No Videos ;(")) : createCommentVNode("", true),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.videos.data, (video) => {
                    return openBlock(), createBlock(Lightbox, { class: "w-full" }, {
                      content: withCtx(() => [
                        createVNode("div", { class: "y space-y-2" }, [
                          createVNode("iframe", {
                            class: "rounded box !px-0 !py-0 aspect-video h-[60vh]",
                            src: "https://www.youtube-nocookie.com/embed/" + video.video_id,
                            frameborder: "0",
                            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                            allowfullscreen: ""
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "x gap-2 justify-between dark:text-neutral-200" }, [
                            createVNode(unref(Link$1), {
                              onClick: withModifiers(() => {
                              }, ["stop"]),
                              href: unref(route$1)("levels.show", video.level_id),
                              class: "box !py-1 !px-3"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Level Page")
                              ]),
                              _: 2
                            }, 1032, ["onClick", "href"]),
                            createVNode("a", {
                              onClick: withModifiers(() => {
                              }, ["stop"]),
                              href: `https://youtube.com/watch?v=${video.video_id}`,
                              target: "_blank",
                              class: "x items-center space-x-1 box !py-1 !px-3"
                            }, [
                              createVNode("span", null, "YouTube Video"),
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 20 20",
                                fill: "currentColor",
                                class: "w-4 h-4"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z",
                                  "clip-rule": "evenodd"
                                }),
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ], 8, ["onClick", "href"])
                          ])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("img", {
                          class: "w-full aspect-video object-cover rounded glass",
                          loading: "lazy",
                          src: `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`,
                          alt: "Thumbnail"
                        }, null, 8, ["src"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 256))
                ]),
                createVNode(_sfc_main$1t, { list: __props.videos }, null, 8, ["list"])
              ]),
              createVNode("div", { class: "flex flex-col space-y-4 md:w-1/4" }, [
                createVNode("h2", { class: "font-bold text-2xl" }, "Submit Video"),
                _ctx.$page.props.auth ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "glass p-4"
                }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-2"
                  }, [
                    createVNode(_sfc_main$1M, {
                      modelValue: unref(form).video_id,
                      "onUpdate:modelValue": ($event) => unref(form).video_id = $event,
                      type: "text",
                      placeholder: "YouTube Video Link",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1M, {
                      modelValue: unref(form).level_id,
                      "onUpdate:modelValue": ($event) => unref(form).level_id = $event,
                      type: "text",
                      placeholder: "Level ID",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1R, null, {
                      default: withCtx(() => [
                        createTextVNode("Add")
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "pane"
                }, [
                  createVNode("span", null, [
                    createTextVNode("You must "),
                    createVNode(unref(Link$1), {
                      class: "underline",
                      href: unref(route$1)("auth::login")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("log in")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createTextVNode(" to submit a video")
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Videos/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
createServer((page) => createInertiaApp({
  page,
  render: renderToString,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/API/Index.vue": __vite_glob_0_0, "./Pages/API/Partials/ApiTokenManager.vue": __vite_glob_0_1, "./Pages/Admin/Forums.vue": __vite_glob_0_2, "./Pages/Admin/Home.vue": __vite_glob_0_3, "./Pages/Admin/Settings.vue": __vite_glob_0_4, "./Pages/Admin/Users.vue": __vite_glob_0_5, "./Pages/Auth/ConfirmPassword.vue": __vite_glob_0_6, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_7, "./Pages/Auth/Login.vue": __vite_glob_0_8, "./Pages/Auth/Register.vue": __vite_glob_0_9, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_10, "./Pages/Auth/TwoFactorChallenge.vue": __vite_glob_0_11, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_12, "./Pages/Contests/Create.vue": __vite_glob_0_13, "./Pages/Contests/Index.vue": __vite_glob_0_14, "./Pages/Dashboard/Account.vue": __vite_glob_0_15, "./Pages/Dashboard/Home.vue": __vite_glob_0_16, "./Pages/Dashboard/Profile.vue": __vite_glob_0_17, "./Pages/Docs/Help.vue": __vite_glob_0_18, "./Pages/Docs/Index.vue": __vite_glob_0_19, "./Pages/Docs/PrivacyPolicy.vue": __vite_glob_0_20, "./Pages/Docs/TermsOfService.vue": __vite_glob_0_21, "./Pages/Forge.vue": __vite_glob_0_22, "./Pages/Forums.vue": __vite_glob_0_23, "./Pages/Forums/Show.vue": __vite_glob_0_24, "./Pages/Home.vue": __vite_glob_0_25, "./Pages/Inbox/Create.vue": __vite_glob_0_26, "./Pages/Inbox/Index.vue": __vite_glob_0_27, "./Pages/Inbox/Show.vue": __vite_glob_0_28, "./Pages/Levels.vue": __vite_glob_0_29, "./Pages/Levels/Edit.vue": __vite_glob_0_30, "./Pages/Levels/Images.vue": __vite_glob_0_31, "./Pages/Levels/Index.vue": __vite_glob_0_32, "./Pages/Levels/Show.vue": __vite_glob_0_33, "./Pages/Levels/Tags.vue": __vite_glob_0_34, "./Pages/Link/Connections.vue": __vite_glob_0_35, "./Pages/Link/Developers.vue": __vite_glob_0_36, "./Pages/Link/Home.vue": __vite_glob_0_37, "./Pages/Link/Layout.vue": __vite_glob_0_38, "./Pages/Link/Link.vue": __vite_glob_0_39, "./Pages/Link/Profile.vue": __vite_glob_0_40, "./Pages/Mods/Index.vue": __vite_glob_0_41, "./Pages/Mods/Show.vue": __vite_glob_0_42, "./Pages/Playlists/Create.vue": __vite_glob_0_43, "./Pages/Playlists/Index.vue": __vite_glob_0_44, "./Pages/Playlists/Show.vue": __vite_glob_0_45, "./Pages/Posts/Edit.vue": __vite_glob_0_46, "./Pages/Profiles/Show.vue": __vite_glob_0_47, "./Pages/Reports/Create.vue": __vite_glob_0_48, "./Pages/Roulette.vue": __vite_glob_0_49, "./Pages/Search.vue": __vite_glob_0_50, "./Pages/Settings/Email.vue": __vite_glob_0_51, "./Pages/Settings/Index.vue": __vite_glob_0_52, "./Pages/Settings/Password.vue": __vite_glob_0_53, "./Pages/Settings/Profile.vue": __vite_glob_0_54, "./Pages/Settings/Sessions.vue": __vite_glob_0_55, "./Pages/Settings/TwoFactorAuthentication.vue": __vite_glob_0_56, "./Pages/Stencils/Create.vue": __vite_glob_0_57, "./Pages/Stencils/Fonts.vue": __vite_glob_0_58, "./Pages/Stencils/Index.vue": __vite_glob_0_59, "./Pages/Stencils/Show.vue": __vite_glob_0_60, "./Pages/Submissions/Create.vue": __vite_glob_0_61, "./Pages/Tags/Index.vue": __vite_glob_0_62, "./Pages/Tags/Show.vue": __vite_glob_0_63, "./Pages/Threads/Create.vue": __vite_glob_0_64, "./Pages/Threads/Edit.vue": __vite_glob_0_65, "./Pages/Threads/Show.vue": __vite_glob_0_66, "./Pages/Users/Index.vue": __vite_glob_0_67, "./Pages/Users/Names.vue": __vite_glob_0_68, "./Pages/Users/Reputation.vue": __vite_glob_0_69, "./Pages/Users/Show.vue": __vite_glob_0_70, "./Pages/Videos/Index.vue": __vite_glob_0_71 })),
  setup({ app, props, plugin }) {
    return createSSRApp({
      render: () => h(app, props)
    }).use(plugin).mixin({ methods: { route: window.route } });
  }
}));

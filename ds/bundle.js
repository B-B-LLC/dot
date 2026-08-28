'use client';
/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin. Kaynak: _ds_bundle.js
   Yeniden üretmek için: npm run gen:ds */

import * as React from 'react';

/* Icon bileşeni ikonları window.lucide.createIcons ile çiziyor ve ikon kümesini
   kendisi geçmiyor — tarayıcı sürümünde küme pakete gömülü olduğu için. npm
   paketinde küme ayrı geldiğinden burada tamamlanıyor.

   Küme ~400 KB. Sayfada Icon kullanılmazsa hiç indirilmemesi için erişim anında
   yükleniyor: Icon, window.lucide dolana kadar 120 ms'de bir yeniden deniyor. */
let __lucide;
let __lucideIstendi = false;

const __ds_window = {
  VerdantDentalDesignSystem_954de0: {},
  get lucide() {
    if (__lucide) return __lucide;
    if (!__lucideIstendi) {
      __lucideIstendi = true;
      import('lucide').then(({ createIcons, icons }) => {
        __lucide = { createIcons: (secenekler) => createIcons({ icons, ...secenekler }) };
      });
    }
    return undefined;
  }
};

(function (window) {
/* @ds-bundle: {"format":4,"namespace":"VerdantDentalDesignSystem_954de0","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"ba270e72bc3e","components/core/Button.jsx":"473d638ad5ab","components/core/Card.jsx":"6ebad96af285","components/core/Icon.jsx":"20fe6c835e87","components/core/IconButton.jsx":"bcfd9af19a85","components/core/Tag.jsx":"ef0bb4bcbac0","components/feedback/Dialog.jsx":"40070c88456e","components/feedback/Toast.jsx":"d539bf49782f","components/feedback/Tooltip.jsx":"e8d9813ff213","components/forms/Checkbox.jsx":"f4e47a672c3b","components/forms/Field.jsx":"0200bcbaa385","components/forms/Input.jsx":"e3f6cd0a4e04","components/forms/Radio.jsx":"6622f9d375bd","components/forms/Select.jsx":"b9a779e51e17","components/forms/Switch.jsx":"6d5a58ccb596","components/navigation/NavBar.jsx":"2723a2189289","components/navigation/Tabs.jsx":"96920223142b","ui_kits/website/BookingScreen.jsx":"6aa08a7396f3","ui_kits/website/HomeScreen.jsx":"967ad9ecd9ef","ui_kits/website/Shell.jsx":"6550f46d8e9b","ui_kits/website/TeamScreen.jsx":"1cfddf0e33d9","ui_kits/website/TreatmentsScreen.jsx":"c1b0c22f2d70"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VerdantDentalDesignSystem_954de0 = window.VerdantDentalDesignSystem_954de0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    bg: 'var(--sand-100)',
    fg: 'var(--text-body)',
    bd: 'var(--line-soft)'
  },
  brand: {
    bg: 'var(--emerald-100)',
    fg: 'var(--emerald-700)',
    bd: 'var(--emerald-200)'
  },
  accent: {
    bg: 'var(--amber-100)',
    fg: 'var(--amber-700)',
    bd: 'var(--amber-200)'
  },
  success: {
    bg: 'var(--status-success-bg)',
    fg: 'var(--status-success-fg)',
    bd: 'var(--emerald-200)'
  },
  warning: {
    bg: 'var(--status-warning-bg)',
    fg: 'var(--status-warning-fg)',
    bd: 'var(--amber-200)'
  },
  danger: {
    bg: 'var(--status-danger-bg)',
    fg: 'var(--status-danger-fg)',
    bd: '#f3cfcb'
  },
  info: {
    bg: 'var(--status-info-bg)',
    fg: 'var(--status-info-fg)',
    bd: '#cfe0ee'
  },
  onDark: {
    bg: 'rgba(255,255,255,.16)',
    fg: '#fff',
    bd: 'rgba(255,255,255,.28)'
  }
};

/** Small status pill — availability, plan tier, appointment state. */
function Badge({
  tone = 'neutral',
  dot = false,
  icon,
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: dot || icon ? '0 12px 0 10px' : '0 12px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '-.005em',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor',
      flex: '0 0 auto'
    }
  }), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    h: 36,
    px: 18,
    fs: 13.5,
    gap: 7,
    icon: 15
  },
  md: {
    h: 46,
    px: 24,
    fs: 15,
    gap: 9,
    icon: 18
  },
  lg: {
    h: 56,
    px: 32,
    fs: 17,
    gap: 10,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    background: 'linear-gradient(180deg,var(--emerald-500) 0%,var(--emerald-700) 100%)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.28)',
    shadow: 'var(--shadow-brand),var(--inner-glass-dark)',
    hoverShadow: '0 12px 30px rgba(10,97,66,.34),0 3px 8px rgba(10,97,66,.22),var(--inner-glass-dark)',
    specular: 'linear-gradient(180deg,rgba(255,255,255,.42) 0%,rgba(255,255,255,.06) 46%,rgba(255,255,255,0) 60%)'
  },
  accent: {
    background: 'linear-gradient(180deg,var(--amber-400) 0%,var(--amber-600) 100%)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.34)',
    shadow: 'var(--shadow-accent),var(--inner-glass-dark)',
    hoverShadow: '0 12px 30px rgba(226,121,14,.36),0 3px 8px rgba(226,121,14,.24),var(--inner-glass-dark)',
    specular: 'linear-gradient(180deg,rgba(255,255,255,.5) 0%,rgba(255,255,255,.08) 48%,rgba(255,255,255,0) 62%)'
  },
  glass: {
    background: 'var(--glass-tint-lighter)',
    color: 'var(--text-strong)',
    border: '1px solid var(--glass-border-light)',
    shadow: 'var(--shadow-2),var(--inner-glass)',
    hoverShadow: '0 4px 10px rgba(58,45,32,.06),0 16px 34px rgba(58,45,32,.10),var(--inner-glass)',
    specular: 'linear-gradient(180deg,rgba(255,255,255,.85) 0%,rgba(255,255,255,.18) 44%,rgba(255,255,255,0) 58%)',
    blur: true
  },
  glassDark: {
    background: 'var(--glass-tint-dark)',
    color: '#fff',
    border: '1px solid var(--glass-border-dark)',
    shadow: 'var(--shadow-3),var(--inner-glass-dark)',
    hoverShadow: '0 6px 14px rgba(5,32,20,.24),0 22px 44px rgba(5,32,20,.28),var(--inner-glass-dark)',
    specular: 'linear-gradient(180deg,rgba(255,255,255,.30) 0%,rgba(255,255,255,.04) 50%,rgba(255,255,255,0) 64%)',
    blur: true
  },
  cream: {
    background: 'linear-gradient(180deg,#fffdf9 0%,var(--sand-100) 100%)',
    color: 'var(--text-strong)',
    border: '1px solid rgba(255,255,255,.9)',
    shadow: 'var(--shadow-2),var(--inner-glass)',
    hoverShadow: '0 4px 10px rgba(58,45,32,.07),0 16px 34px rgba(58,45,32,.11),var(--inner-glass)',
    specular: 'linear-gradient(180deg,rgba(255,255,255,.9) 0%,rgba(255,255,255,.2) 46%,rgba(255,255,255,0) 60%)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-brand)',
    border: '1.5px solid var(--emerald-300)',
    shadow: 'none',
    hoverBackground: 'var(--emerald-50)',
    hoverShadow: '0 4px 12px rgba(10,97,66,.10)',
    specular: 'none'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-body)',
    border: '1px solid transparent',
    shadow: 'none',
    hoverBackground: 'rgba(26,23,20,.05)',
    hoverShadow: 'none',
    specular: 'none'
  }
};

/** Liquid-glass pill button: layered specular highlight, blurred backdrop, spring press. */
function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  loading = false,
  as = 'button',
  children,
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const Tag = as;
  const inactive = disabled || loading;
  const root = {
    position: 'relative',
    overflow: 'hidden',
    isolation: 'isolate',
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : undefined,
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}px`,
    fontFamily: 'var(--font-body)',
    fontSize: s.fs,
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '-.012em',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    borderRadius: 'var(--radius-pill)',
    border: v.border,
    background: hover && v.hoverBackground ? v.hoverBackground : v.background,
    color: v.color,
    boxShadow: press ? `${v.shadow === 'none' ? 'none' : v.shadow},var(--inner-press)` : hover && !inactive ? v.hoverShadow : v.shadow,
    backdropFilter: v.blur ? 'var(--glass-backdrop)' : undefined,
    WebkitBackdropFilter: v.blur ? 'var(--glass-backdrop)' : undefined,
    transform: press ? `scale(var(--press-scale))` : hover && !inactive ? 'translateY(-1px)' : 'none',
    transition: 'var(--transition-control)',
    cursor: inactive ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.42 : 1,
    textDecoration: 'none',
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: root,
    disabled: as === 'button' ? inactive : undefined,
    "aria-busy": loading || undefined,
    onClick: inactive ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => !inactive && setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), v.specular !== 'none' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: v.specular,
      pointerEvents: 'none',
      zIndex: 0
    }
  }), v.specular !== 'none' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '55%',
      left: hover && !inactive ? '78%' : '-60%',
      background: 'linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.34) 50%,rgba(255,255,255,0) 100%)',
      transform: 'skewX(-16deg)',
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'left var(--dur-slow) var(--ease-glass)'
    }
  }), loading ? /*#__PURE__*/React.createElement(Spinner, {
    size: s.icon
  }) : iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, children), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex'
    }
  }, iconRight));
}
function Spinner({
  size
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'relative',
      zIndex: 1,
      width: size,
      height: size,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      animation: 'vd-spin .7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes vd-spin{to{transform:rotate(360deg)}}'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  plain: {
    background: 'var(--surface-card)',
    color: 'var(--text-body)',
    border: '1px solid var(--line-hairline)',
    shadow: 'var(--shadow-2)'
  },
  cream: {
    background: 'var(--grad-cream)',
    color: 'var(--text-body)',
    border: '1px solid rgba(255,255,255,.9)',
    shadow: 'var(--shadow-2)'
  },
  glass: {
    background: 'var(--glass-tint-light)',
    color: 'var(--text-body)',
    border: '1px solid var(--glass-border-light)',
    shadow: 'var(--shadow-3),var(--inner-glass)',
    blur: true
  },
  emerald: {
    background: 'var(--grad-emerald)',
    color: 'var(--text-on-dark)',
    border: '1px solid rgba(255,255,255,.16)',
    shadow: 'var(--shadow-4)',
    sheen: 'emerald'
  },
  amber: {
    background: 'var(--grad-amber)',
    color: 'var(--text-on-dark)',
    border: '1px solid rgba(255,255,255,.3)',
    shadow: 'var(--shadow-4)',
    sheen: 'amber'
  },
  sunken: {
    background: 'var(--surface-sunken)',
    color: 'var(--text-body)',
    border: '1px solid transparent',
    shadow: 'none'
  }
};
const LAYOUT_KEYS = ['display', 'flexDirection', 'flexWrap', 'alignItems', 'alignContent', 'justifyContent', 'justifyItems', 'gap', 'rowGap', 'columnGap', 'gridTemplateColumns', 'gridTemplateRows', 'gridAutoFlow', 'textAlign'];

/** Rounded organic panel — the layout unit of every Verdant surface. */
function Card({
  tone = 'plain',
  padding = 'md',
  interactive = false,
  radius,
  contentStyle,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const t = TONES[tone] || TONES.plain;
  const pad = padding === 'none' ? 0 : padding === 'sm' ? 20 : padding === 'lg' ? 'var(--pad-card-lg)' : 'var(--pad-card)';

  // Layout declarations belong to the CHILDREN, not to the sheen/overlay stack.
  const inner = {};
  const outer = {};
  Object.entries(style || {}).forEach(([k, v]) => {
    (LAYOUT_KEYS.includes(k) ? inner : outer)[k] = v;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined,
    style: {
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
      borderRadius: radius || 'var(--radius-card)',
      background: t.background,
      color: t.color,
      border: t.border,
      boxShadow: hover ? 'var(--shadow-lift)' : t.shadow,
      backdropFilter: t.blur ? 'var(--glass-backdrop)' : undefined,
      WebkitBackdropFilter: t.blur ? 'var(--glass-backdrop)' : undefined,
      padding: pad,
      transform: hover ? 'var(--hover-lift)' : 'none',
      transition: 'var(--transition-surface)',
      cursor: interactive ? 'pointer' : undefined,
      ...outer
    }
  }, rest), t.sheen && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '-20%',
      right: '-20%',
      bottom: '-30%',
      height: '85%',
      background: t.sheen === 'emerald' ? 'radial-gradient(60% 100% at 50% 100%,rgba(126,240,196,.34) 0%,rgba(126,240,196,0) 70%)' : 'radial-gradient(60% 100% at 50% 100%,rgba(255,236,200,.5) 0%,rgba(255,236,200,0) 70%)',
      transform: 'rotate(-8deg)',
      pointerEvents: 'none',
      zIndex: 0
    }
  }), (tone === 'glass' || tone === 'cream') && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--grad-glass-top)',
      opacity: .5,
      pointerEvents: 'none',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      height: inner.display ? '100%' : undefined,
      ...inner,
      ...contentStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Thin wrapper over the Lucide icon set (loaded from CDN). See readme ICONOGRAPHY. */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const draw = () => {
      if (!window.lucide) return false;
      el.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      el.appendChild(i);
      window.lucide.createIcons({
        nameAttr: 'data-lucide',
        attrs: {
          width: size,
          height: size,
          stroke: color,
          'stroke-width': strokeWidth
        }
      });
      return true;
    };
    if (draw()) return;
    const t = setInterval(() => {
      if (draw()) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, [name, size, strokeWidth, color]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flex: '0 0 auto',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BOX = {
  sm: 36,
  md: 46,
  lg: 56
};

/** Circular liquid-glass button holding a single glyph. */
function IconButton({
  variant = 'glass',
  size = 'md',
  label,
  children,
  style,
  ...rest
}) {
  const d = BOX[size] || BOX.md;
  return /*#__PURE__*/React.createElement(__ds_scope.Button, _extends({
    variant: variant,
    size: size,
    "aria-label": label,
    title: label,
    style: {
      width: d,
      height: d,
      padding: 0,
      borderRadius: '50%',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Selectable filter chip — treatment categories, insurance filters. */
function Tag({
  selected = false,
  onRemove,
  icon,
  children,
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    role: onClick ? 'button' : undefined,
    tabIndex: onClick ? 0 : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 34,
      padding: onRemove ? '0 8px 0 14px' : '0 15px',
      borderRadius: 'var(--radius-pill)',
      background: selected ? 'linear-gradient(180deg,var(--emerald-500) 0%,var(--emerald-700) 100%)' : hover ? 'var(--sand-0)' : 'var(--sand-50)',
      color: selected ? '#fff' : 'var(--text-body)',
      border: selected ? '1px solid rgba(255,255,255,.28)' : '1px solid var(--line-soft)',
      boxShadow: selected ? 'var(--shadow-brand)' : hover ? 'var(--shadow-1)' : 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      fontWeight: 'var(--fw-medium)',
      letterSpacing: '-.008em',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'var(--transition-control)',
      userSelect: 'none',
      ...style
    }
  }, rest), icon, children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: selected ? 'rgba(255,255,255,.22)' : 'var(--sand-150)',
      fontSize: 13,
      lineHeight: 1,
      cursor: 'pointer'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Frosted-glass sheet over a blurred scrim — booking confirmations, forms. */
function Dialog({
  open = false,
  onClose,
  title,
  description,
  footer,
  width = 520,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'rgba(26,23,20,.28)',
      backdropFilter: 'blur(var(--blur-md)) saturate(120%)',
      WebkitBackdropFilter: 'blur(var(--blur-md)) saturate(120%)',
      animation: 'vd-fade var(--dur-base) var(--ease-glass)'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes vd-fade{from{opacity:0}to{opacity:1}}@keyframes vd-rise{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}'), /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: width,
      padding: 'var(--pad-card-lg)',
      borderRadius: 'var(--radius-sheet)',
      background: 'var(--glass-tint-lighter)',
      backdropFilter: 'var(--glass-backdrop)',
      WebkitBackdropFilter: 'var(--glass-backdrop)',
      border: '1px solid var(--glass-border-light)',
      boxShadow: 'var(--shadow-4),var(--inner-glass)',
      animation: 'vd-rise var(--dur-sheet) var(--ease-glass)',
      ...style
    }
  }, rest), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: 22,
      right: 22,
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: '1px solid var(--line-hairline)',
      background: 'rgba(255,255,255,.6)',
      color: 'var(--text-muted)',
      fontSize: 17,
      lineHeight: 1,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-control)'
    }
  }, "\xD7"), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--type-h2-size)',
      lineHeight: 'var(--type-h2-line)',
      letterSpacing: 'var(--type-h2-track)',
      fontWeight: 'var(--type-h2-weight)',
      marginBottom: description ? 8 : 20,
      paddingRight: 40
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginBottom: 24
    }
  }, description), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      marginTop: 28
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    accent: 'var(--sand-400)'
  },
  success: {
    accent: 'var(--emerald-500)'
  },
  warning: {
    accent: 'var(--amber-500)'
  },
  danger: {
    accent: 'var(--red-600)'
  }
};

/** Floating glass capsule confirmation. Bottom-centre, auto-dismissing. */
function Toast({
  tone = 'success',
  title,
  message,
  icon,
  onClose,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.success;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '14px 18px',
      minWidth: 280,
      maxWidth: 420,
      borderRadius: 'var(--radius-xl)',
      background: 'var(--glass-tint-lighter)',
      backdropFilter: 'var(--glass-backdrop)',
      WebkitBackdropFilter: 'var(--glass-backdrop)',
      border: '1px solid var(--glass-border-light)',
      boxShadow: 'var(--shadow-4),var(--inner-glass)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: t.accent,
      marginTop: 7,
      boxShadow: `0 0 0 4px ${t.accent}22`
    }
  }), icon, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)',
      letterSpacing: '-.01em'
    }
  }, title), message && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-faint)',
      fontSize: 16,
      cursor: 'pointer',
      lineHeight: 1,
      padding: 2
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dark glass hint on hover/focus. */
function Tooltip({
  label,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 9
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 9
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 9
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 9
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 60,
      ...pos,
      padding: '7px 12px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      background: 'rgba(8,44,30,.82)',
      color: '#fff',
      backdropFilter: 'var(--glass-backdrop-sm)',
      WebkitBackdropFilter: 'var(--glass-backdrop-sm)',
      border: '1px solid var(--glass-border-dark)',
      boxShadow: 'var(--shadow-3)',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 'var(--fw-medium)',
      letterSpacing: '-.004em',
      opacity: show ? 1 : 0,
      visibility: show ? 'visible' : 'hidden',
      transition: 'opacity var(--dur-fast) var(--ease-glass)',
      pointerEvents: 'none'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Rounded-square checkbox with an emerald glass fill when on. */
function Checkbox({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: 22,
      height: 22,
      marginTop: description ? 2 : 0,
      borderRadius: 7,
      background: checked ? 'linear-gradient(180deg,var(--emerald-500) 0%,var(--emerald-700) 100%)' : hover ? 'var(--sand-0)' : 'var(--sand-50)',
      border: checked ? '1px solid rgba(255,255,255,.3)' : '1.5px solid var(--line-strong)',
      boxShadow: checked ? 'var(--shadow-brand),var(--inner-glass-dark)' : 'inset 0 1px 2px rgba(58,45,32,.06)',
      transition: 'var(--transition-control)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 7,
      top: 3.5,
      width: 6,
      height: 11,
      borderRight: '2.2px solid #fff',
      borderBottom: '2.2px solid #fff',
      transform: checked ? 'rotate(42deg) scale(1)' : 'rotate(42deg) scale(.4)',
      opacity: checked ? 1 : 0,
      transition: 'all var(--dur-fast) var(--ease-spring)'
    }
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)',
      letterSpacing: '-.008em'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Label + hint + error shell shared by every form control. */
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-label-size)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--type-label-track)',
      color: 'var(--text-strong)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--amber-600)',
      marginLeft: 3
    }
  }, "*")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-caption-size)',
      lineHeight: 'var(--type-caption-line)',
      color: error ? 'var(--status-danger-fg)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: 40,
  md: 50,
  lg: 58
};

/** Soft-sunken text field on a cream fill with an emerald focus ring. */
function Input({
  size = 'md',
  invalid = false,
  iconLeft,
  iconRight,
  style,
  multiline = false,
  rows = 4,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const h = H[size] || H.md;
  const Tag = multiline ? 'textarea' : 'input';
  const shell = {
    display: 'flex',
    alignItems: multiline ? 'flex-start' : 'center',
    gap: 10,
    height: multiline ? undefined : h,
    padding: multiline ? '14px 18px' : '0 18px',
    borderRadius: multiline ? 'var(--radius-lg)' : 'var(--radius-pill)',
    background: focus ? 'var(--sand-0)' : hover ? '#fffdfa' : 'var(--sand-50)',
    border: `1.5px solid ${invalid ? 'var(--status-danger-fg)' : focus ? 'var(--emerald-500)' : 'var(--line-soft)'}`,
    boxShadow: focus ? invalid ? '0 0 0 3px rgba(197,55,44,.22)' : 'var(--ring-focus)' : 'inset 0 1px 2px rgba(58,45,32,.05)',
    transition: 'var(--transition-control)',
    color: 'var(--text-muted)',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: shell,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, iconLeft, /*#__PURE__*/React.createElement(Tag, _extends({
    rows: multiline ? rows : undefined,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: size === 'sm' ? 14 : 15.5,
      letterSpacing: '-.006em',
      color: 'var(--text-strong)',
      resize: multiline ? 'vertical' : undefined,
      lineHeight: multiline ? 1.6 : undefined,
      padding: 0
    }
  })), iconRight);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio group rendered as stacked cards or a compact inline row. */
function Radio({
  name,
  value,
  options = [],
  onChange,
  layout = 'card',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: layout === 'inline' ? 'row' : 'column',
      flexWrap: 'wrap',
      gap: layout === 'inline' ? 10 : 10,
      ...style
    }
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    const d = typeof o === 'string' ? null : o.description;
    const on = value === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      style: {
        display: 'flex',
        alignItems: d ? 'flex-start' : 'center',
        gap: 12,
        padding: layout === 'inline' ? '10px 16px' : '14px 18px',
        borderRadius: layout === 'inline' ? 'var(--radius-pill)' : 'var(--radius-lg)',
        background: on ? 'var(--emerald-50)' : 'var(--sand-50)',
        border: `1.5px solid ${on ? 'var(--emerald-400)' : 'var(--line-soft)'}`,
        boxShadow: on ? '0 4px 14px rgba(10,97,66,.10)' : 'none',
        cursor: 'pointer',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      value: v,
      checked: on,
      onChange: () => onChange && onChange(v),
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'relative',
        flex: '0 0 auto',
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: on ? 'linear-gradient(180deg,var(--emerald-500) 0%,var(--emerald-700) 100%)' : 'var(--sand-0)',
        border: on ? '1px solid rgba(255,255,255,.3)' : '1.5px solid var(--line-strong)',
        boxShadow: on ? 'var(--shadow-brand)' : 'inset 0 1px 2px rgba(58,45,32,.06)',
        marginTop: d ? 2 : 0,
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 5.5,
        borderRadius: '50%',
        background: '#fff',
        opacity: on ? 1 : 0,
        transition: 'opacity var(--dur-fast) var(--ease-glass)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        fontWeight: 'var(--fw-medium)',
        color: 'var(--text-strong)',
        letterSpacing: '-.008em'
      }
    }, l), d && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--text-muted)',
        lineHeight: 1.5
      }
    }, d)));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: 40,
  md: 50,
  lg: 58
};

/** Native select in a pill shell, with the brand chevron. */
function Select({
  size = 'md',
  invalid = false,
  options = [],
  placeholder,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = H[size] || H.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: h,
      padding: '0 18px',
      borderRadius: 'var(--radius-pill)',
      background: focus ? 'var(--sand-0)' : 'var(--sand-50)',
      border: `1.5px solid ${invalid ? 'var(--status-danger-fg)' : focus ? 'var(--emerald-500)' : 'var(--line-soft)'}`,
      boxShadow: focus ? 'var(--ring-focus)' : 'inset 0 1px 2px rgba(58,45,32,.05)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: size === 'sm' ? 14 : 15.5,
      letterSpacing: '-.006em',
      color: 'var(--text-strong)',
      paddingRight: 20,
      cursor: 'pointer'
    }
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 18,
      width: 9,
      height: 9,
      borderRight: '2px solid var(--text-muted)',
      borderBottom: '2px solid var(--text-muted)',
      transform: 'rotate(45deg) translateY(-2px)',
      borderRadius: 1,
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  sm: {
    w: 42,
    h: 24,
    k: 18
  },
  md: {
    w: 54,
    h: 31,
    k: 25
  }
};

/** Liquid-glass toggle — the pill capsule from the brand's hero artwork. */
function Switch({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  style,
  ...rest
}) {
  const s = SZ[size] || SZ.md;
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: s.w,
      height: s.h,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'linear-gradient(180deg,var(--emerald-500) 0%,var(--emerald-700) 100%)' : 'var(--sand-200)',
      border: checked ? '1px solid rgba(255,255,255,.28)' : '1px solid rgba(58,45,32,.06)',
      boxShadow: checked ? 'var(--shadow-brand),var(--inner-glass-dark)' : 'var(--inner-press)',
      transition: 'background var(--dur-base) var(--ease-glass),box-shadow var(--dur-base) var(--ease-glass)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: (s.h - s.k) / 2 - 1,
      left: checked ? s.w - s.k - 3 : 3,
      width: s.k,
      height: s.k,
      borderRadius: '50%',
      background: 'linear-gradient(180deg,#ffffff 0%,#f6f2ec 100%)',
      boxShadow: '0 2px 5px rgba(58,45,32,.22),0 0 0 .5px rgba(58,45,32,.06),inset 0 1px 0 #fff',
      transition: 'left var(--dur-base) var(--ease-glass)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)',
      letterSpacing: '-.008em'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Floating glass capsule header — the brand's signature navigation. */
function NavBar({
  brand,
  links = [],
  active,
  onNavigate,
  actions,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: 68,
      padding: '0 12px 0 28px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--glass-tint-lighter)',
      backdropFilter: 'var(--glass-backdrop)',
      WebkitBackdropFilter: 'var(--glass-backdrop)',
      border: '1px solid var(--glass-border-light)',
      boxShadow: 'var(--shadow-3),var(--inner-glass)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 'var(--fw-extrabold)',
      letterSpacing: '-.03em',
      color: 'var(--text-strong)',
      flex: '0 0 auto'
    }
  }, brand), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flex: 1
    }
  }, links.map(l => {
    const v = typeof l === 'string' ? l : l.value;
    const label = typeof l === 'string' ? l : l.label;
    const on = v === active;
    return /*#__PURE__*/React.createElement(l && l.adres ? "a" : "button", {
      key: v,
      href: l && l.adres ? l.adres : undefined,
      onClick: (ev) => onNavigate && onNavigate(v, ev),
      style: {
        height: 36,
        padding: '0 15px',
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        background: on ? 'rgba(13,122,83,.10)' : 'transparent',
        color: on ? 'var(--text-brand)' : 'var(--text-body)',
        fontFamily: 'var(--font-body)',
        fontSize: 14.5,
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        letterSpacing: '-.01em',
        cursor: 'pointer',
        transition: 'var(--transition-control)'
      }
    }, label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flex: '0 0 auto'
    }
  }, actions));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sliding-pill segmented control inside a sunken glass track. */
function Tabs({
  tabs = [],
  value,
  onChange,
  fullWidth = false,
  style,
  ...rest
}) {
  const idx = Math.max(0, tabs.findIndex(t => (typeof t === 'string' ? t : t.value) === value));
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      padding: 5,
      gap: 2,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--sand-100)',
      boxShadow: 'var(--inner-press)',
      border: '1px solid var(--line-hairline)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 5,
      bottom: 5,
      left: 5,
      width: `calc((100% - 10px) / ${tabs.length})`,
      transform: `translateX(${idx * 100}%)`,
      borderRadius: 'var(--radius-pill)',
      background: 'linear-gradient(180deg,#fff 0%,#f8f4ee 100%)',
      border: '1px solid rgba(255,255,255,.9)',
      boxShadow: 'var(--shadow-2),var(--inner-glass)',
      transition: 'transform var(--dur-base) var(--ease-glass)'
    }
  }), tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const l = typeof t === 'string' ? t : t.label;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        position: 'relative',
        zIndex: 1,
        flex: fullWidth ? 1 : undefined,
        height: 38,
        padding: '0 20px',
        border: 'none',
        background: 'transparent',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        letterSpacing: '-.01em',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast) var(--ease-glass)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BookingScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Field,
  Input,
  Select,
  Radio,
  Checkbox,
  Switch,
  Badge,
  Dialog,
  Toast,
  Icon,
  Tabs
} = window.VerdantDentalDesignSystem_954de0;
const SLOTS = {
  Mon: ['08:20', '10:20', '14:00'],
  Tue: ['09:00', '11:40', '15:20', '16:40'],
  Wed: ['08:40', '13:20'],
  Thu: ['10:00', '11:20', '14:40', '17:00'],
  Fri: ['09:20', '12:00']
};
function BookingScreen({
  go
}) {
  const [step, setStep] = React.useState('Details');
  const [visit, setVisit] = React.useState('new');
  const [day, setDay] = React.useState('Tue');
  const [slot, setSlot] = React.useState('11:40');
  const [sms, setSms] = React.useState(true);
  const [anx, setAnx] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.shellWrap,
      paddingTop: 118
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Booking"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--type-display-2-size)',
      lineHeight: 'var(--type-display-2-line)',
      letterSpacing: 'var(--type-display-2-track)',
      marginTop: 14,
      maxWidth: 620
    }
  }, "Pick a time that suits you.")), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr .9fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "plain",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Details', 'Time', 'Confirm'],
    value: step,
    onChange: setStep,
    fullWidth: true,
    style: {
      marginBottom: 30
    }
  }), step === 'Details' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name",
    required: true,
    htmlFor: "bn"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "bn",
    placeholder: "Amara Okafor"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone",
    required: true,
    hint: "We only call to confirm your slot.",
    htmlFor: "bp"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "bp",
    placeholder: "(555) 012 3456",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 17
    })
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "be"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "be",
    placeholder: "you@example.com",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 17
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Have you been before?"
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "visit",
    value: visit,
    onChange: setVisit,
    options: [{
      value: 'new',
      label: 'First visit',
      description: 'Includes a full assessment and digital x-rays.'
    }, {
      value: 'return',
      label: 'Returning patient',
      description: "We'll pull up your notes before you arrive."
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Reason for visit"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Choose a reason",
    options: ['Check-up & clean', 'Whitening consult', 'Tooth pain', 'Aligner assessment', 'Something else']
  })), /*#__PURE__*/React.createElement(Checkbox, {
    checked: anx,
    onChange: e => setAnx(e.target.checked),
    label: "I get anxious at the dentist",
    description: "We'll book a longer slot and go at your pace."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setStep('Time'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Choose a time"))), step === 'Time' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 22
    }
  }, Object.keys(SLOTS).map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => {
      setDay(d);
      setSlot(SLOTS[d][0]);
    },
    style: {
      flex: 1,
      height: 76,
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      background: day === d ? 'linear-gradient(180deg,var(--emerald-500),var(--emerald-700))' : 'var(--sand-50)',
      border: day === d ? '1px solid rgba(255,255,255,.28)' : '1.5px solid var(--line-soft)',
      boxShadow: day === d ? 'var(--shadow-brand)' : 'none',
      color: day === d ? '#fff' : 'var(--text-body)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      transition: 'var(--transition-control)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      opacity: .75
    }
  }, SLOTS[d].length, " free")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10
    }
  }, SLOTS[day].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setSlot(s),
    style: {
      height: 48,
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      background: slot === s ? 'var(--emerald-50)' : 'var(--sand-0)',
      border: slot === s ? '1.5px solid var(--emerald-400)' : '1.5px solid var(--line-soft)',
      boxShadow: slot === s ? '0 4px 14px rgba(10,97,66,.10)' : 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      fontWeight: 500,
      color: slot === s ? 'var(--emerald-700)' : 'var(--text-body)',
      transition: 'var(--transition-control)'
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setStep('Details')
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setStep('Confirm'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Review"))), step === 'Confirm' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, [['Appointment', visit === 'new' ? 'First visit · 45 min' : 'Returning patient · 30 min'], ['When', `${day}, ${slot}`], ['With', 'Dr Amara Okafor'], ['Fee', visit === 'new' ? '£68, agreed before we start' : '£68']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 14,
      borderBottom: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, v))), /*#__PURE__*/React.createElement(Switch, {
    checked: sms,
    onChange: e => {
      setSms(e.target.checked);
      setToast(true);
    },
    label: "Text me a reminder the day before"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setStep('Time')
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => setDone(true)
  }, "Confirm booking")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "cream",
    padding: "md"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true,
    style: {
      marginBottom: 14
    }
  }, "Accepting new patients"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h3-size)',
      letterSpacing: '-.012em'
    }
  }, "Prefer to talk?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, "Reception answers between 8am and 7pm. No phone tree."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    fullWidth: true,
    style: {
      marginTop: 18
    },
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  }, "020 7946 0112")), /*#__PURE__*/React.createElement(Card, {
    tone: "glass",
    padding: "md"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h3-size)',
      letterSpacing: '-.012em'
    }
  }, "What happens next"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginTop: 16
    }
  }, [['check', 'We confirm by text within the hour'], ['file-text', 'A short health form arrives by email'], ['map-pin', 'Arrive five minutes early — that\'s all']].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 11,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--emerald-600)',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-body)'
    }
  }, t)))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: done,
    onClose: () => setDone(false),
    title: "You're booked in",
    description: `${day} at ${slot} with Dr Amara Okafor. We'll text a confirmation shortly.`,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setDone(false)
    }, "Close"), /*#__PURE__*/React.createElement(Button, {
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-check",
        size: 18
      })
    }, "Add to calendar"))
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 28,
      transform: 'translateX(-50%)',
      zIndex: 80
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: sms ? 'Reminder set' : 'Reminder off',
    message: sms ? "We'll text you the day before." : 'You won\'t get a text.',
    onClose: () => setToast(false)
  })));
}
Object.assign(window, {
  BookingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BookingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Icon,
  Tabs
} = window.VerdantDentalDesignSystem_954de0;
const homeStat = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4
};
function HomeScreen({
  go
}) {
  const [aud, setAud] = React.useState('Adults');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.shellWrap,
      paddingTop: 118,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Blob, {
    variant: "stone",
    size: 150,
    style: {
      position: 'absolute',
      right: 26,
      top: 60,
      opacity: .95
    }
  }), /*#__PURE__*/React.createElement(Blob, {
    variant: "pea",
    size: 58,
    style: {
      position: 'absolute',
      right: 230,
      top: 168
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true,
    style: {
      marginBottom: 22
    }
  }, "Accepting new patients"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--type-display-1-size)',
      lineHeight: 'var(--type-display-1-line)',
      letterSpacing: 'var(--type-display-1-track)',
      fontWeight: 800
    }
  }, "Dentistry that", /*#__PURE__*/React.createElement("br", null), "takes its time."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--type-body-lg-size)',
      lineHeight: 'var(--type-body-lg-line)',
      color: 'var(--text-muted)',
      marginTop: 22,
      maxWidth: 520
    }
  }, "Forty-five unhurried minutes, the same clinician each visit, and a clear price before anything begins."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('book'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20
    })
  }, "Book a visit"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "cream",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 19
    })
  }, "020 7946 0112")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 44,
      marginTop: 48
    }
  }, [['4,100+', 'patients cared for'], ['Mon–Sat', '8am to 7pm'], ['48hrs', 'average wait']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: homeStat
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-.02em'
    }
  }, a), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-faint)'
    }
  }, b)))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.25fr 1fr 1fr',
      gridTemplateRows: 'auto auto',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "emerald",
    padding: "lg",
    style: {
      gridRow: 'span 2',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 400
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "brand"
  }, "Signature visit"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 'var(--type-display-3-size)',
      lineHeight: 1.1,
      letterSpacing: '-.028em',
      marginTop: 14
    }
  }, "The unhurried check-up"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-muted)',
      fontSize: 15.5,
      lineHeight: 1.65,
      marginTop: 14,
      maxWidth: 320
    }
  }, "Forty-five minutes. Digital x-rays if you need them. A written plan you keep, whether or not you book anything.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "glass",
    onClick: () => go('treatments'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "What's included"), /*#__PURE__*/React.createElement(Blob, {
    variant: "capsule",
    size: 52,
    style: {
      height: 108,
      marginRight: -6
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "amber",
    padding: "lg",
    style: {
      gridColumn: 'span 2',
      minHeight: 190,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "brand"
  }, "Same day"), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: '#fff',
      fontSize: 28,
      letterSpacing: '-.022em',
      marginTop: 10
    }
  }, "In pain today? Call before 10am."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.86)',
      fontSize: 15,
      marginTop: 8
    }
  }, "We keep two emergency slots free every weekday.")), /*#__PURE__*/React.createElement(Button, {
    variant: "glass",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 19
    })
  }, "Call now")), [['shield-check', 'Fees agreed first', 'Every treatment is priced in writing before we start. No surprises at reception.'], ['heart-handshake', 'Anxious patients welcome', 'Tell us and we slow everything down — longer slots, stop signals, no lectures.']].map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    tone: "cream",
    padding: "lg",
    interactive: true,
    style: {
      minHeight: 190
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 46,
      height: 46,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--emerald-100)',
      color: 'var(--emerald-700)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h3-size)',
      letterSpacing: '-.012em'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Who we see"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--type-display-3-size)',
      letterSpacing: '-.028em',
      marginTop: 12
    }
  }, "Care that fits the person")), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Adults', 'Children', 'Emergency'],
    value: aud,
    onChange: setAud
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, {
    Adults: [['Check-up & clean', '£68', '45 min'], ['Whitening', '£340', '2 visits'], ['Invisible aligners', 'from £1,850', '6–9 months']],
    Children: [['First visit, age 1–5', 'Free', '20 min'], ['Fluoride varnish', '£28', '15 min'], ['Fissure sealants', '£45', '30 min']],
    Emergency: [['Same-day assessment', '£55', '20 min'], ['Temporary filling', '£90', '30 min'], ['Extraction', 'from £150', '45 min']]
  }[aud].map(([t, p, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    tone: "plain",
    padding: "md",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h3-size)',
      letterSpacing: '-.012em'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--emerald-700)'
    }
  }, p)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 12,
      color: 'var(--text-faint)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 15
  }), d))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Card, {
    tone: "glass",
    padding: "lg",
    style: {
      display: 'flex',
      gap: 34,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Blob, {
    variant: "stone",
    size: 128
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 27,
      lineHeight: 1.35,
      letterSpacing: '-.022em',
      color: 'var(--text-strong)',
      maxWidth: '46ch'
    }
  }, "\u201CI'd avoided a dentist for nine years. They booked me a double slot, explained everything twice, and nobody made me feel stupid about it.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Rosa M. \xB7 patient since 2023")))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shell.jsx
try { (() => {
const {
  NavBar,
  Button,
  IconButton,
  Icon
} = window.VerdantDentalDesignSystem_954de0;
const shellPage = {
  minHeight: '100%',
  background: 'var(--grad-page)'
};
const shellWrap = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 var(--pad-page-x)'
};
function SiteHeader({
  route,
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 18,
      zIndex: 30,
      ...shellWrap,
      marginBottom: -68
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    brand: /*#__PURE__*/React.createElement("span", null, "Verdant", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--emerald-600)'
      }
    }, ".")),
    links: [{
      value: 'home',
      label: 'Home'
    }, {
      value: 'treatments',
      label: 'Treatments'
    }, {
      value: 'team',
      label: 'Our team'
    }, {
      value: 'book',
      label: 'Fees & booking'
    }],
    active: route,
    onNavigate: go,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      label: "Call 020 7946 0112",
      size: "sm",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 17
    })), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => go('book')
    }, "Book a visit"))
  }));
}
function SiteFooter({
  go
}) {
  const col = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  };
  const link = {
    fontSize: 14.5,
    color: 'var(--text-on-dark-muted)',
    cursor: 'pointer'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 96,
      background: 'var(--grad-emerald)',
      color: 'var(--text-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shellWrap,
      padding: '64px var(--pad-page-x) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: '-.035em',
      marginBottom: 12
    }
  }, "Verdant", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--emerald-300)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.65,
      color: 'var(--text-on-dark-muted)',
      maxWidth: 300
    }
  }, "A calm, unhurried dental practice on Rowan Street. Open Monday to Saturday.")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: '.14em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--emerald-300)',
      marginBottom: 2
    }
  }, "Practice"), /*#__PURE__*/React.createElement("span", {
    style: link,
    onClick: () => go('treatments')
  }, "Treatments"), /*#__PURE__*/React.createElement("span", {
    style: link,
    onClick: () => go('team')
  }, "Our team"), /*#__PURE__*/React.createElement("span", {
    style: link,
    onClick: () => go('book')
  }, "Fees")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: '.14em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--emerald-300)',
      marginBottom: 2
    }
  }, "Visit"), /*#__PURE__*/React.createElement("span", {
    style: link
  }, "14 Rowan Street"), /*#__PURE__*/React.createElement("span", {
    style: link
  }, "London N1 3QR"), /*#__PURE__*/React.createElement("span", {
    style: link
  }, "Mon\u2013Sat, 8am\u20137pm")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: '.14em',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'var(--emerald-300)',
      marginBottom: 2
    }
  }, "Talk to us"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...link,
      fontFamily: 'var(--font-mono)'
    }
  }, "020 7946 0112"), /*#__PURE__*/React.createElement("span", {
    style: link
  }, "hello@verdant.dental"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      paddingTop: 22,
      borderTop: '1px solid var(--line-on-dark)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--text-on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Verdant Dental Practice"), /*#__PURE__*/React.createElement("span", null, "GDC registered \xB7 CQC inspected"))));
}

/** Decorative organic form. Stands in for photography — no imagery was supplied. */
function Blob({
  variant = 'stone',
  size = 180,
  style
}) {
  const skins = {
    stone: {
      background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
      borderRadius: 'var(--radius-blob)',
      boxShadow: 'var(--shadow-3),inset -8px -10px 24px rgba(58,45,32,.07),inset 8px 10px 24px #fff'
    },
    leaf: {
      background: 'var(--grad-emerald)',
      borderRadius: '0 76% 0 76%',
      boxShadow: 'var(--shadow-4)'
    },
    pea: {
      background: 'var(--grad-amber)',
      borderRadius: '50%',
      boxShadow: 'var(--shadow-accent)'
    },
    capsule: {
      background: 'linear-gradient(160deg,#fff,#f2ece4)',
      borderRadius: 999,
      boxShadow: 'var(--shadow-3),inset 0 2px 0 #fff'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      flex: '0 0 auto',
      ...skins[variant],
      ...style
    }
  });
}
function Eyebrow({
  children,
  tone = 'accent'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--type-eyebrow-size)',
      letterSpacing: 'var(--type-eyebrow-track)',
      fontWeight: 'var(--type-eyebrow-weight)',
      textTransform: 'uppercase',
      color: tone === 'accent' ? 'var(--text-accent)' : 'var(--emerald-300)'
    }
  }, children);
}
function Section({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...shellWrap,
      paddingTop: 'var(--pad-section-y)',
      ...style
    }
  }, children);
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Blob,
  Eyebrow,
  Section,
  shellPage,
  shellWrap
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TeamScreen.jsx
try { (() => {
const {
  Card,
  Badge,
  Button,
  Icon,
  Tooltip
} = window.VerdantDentalDesignSystem_954de0;
const TEAM = [{
  name: 'Dr Amara Okafor',
  role: 'Principal dentist',
  reg: 'GDC 218 440',
  note: 'Restorative work and nervous patients. Fifteen years, most of them here.',
  blob: 'stone'
}, {
  name: 'Dr Ilya Petrov',
  role: 'Dentist',
  reg: 'GDC 264 019',
  note: 'Aligners and composite bonding. Explains everything twice, on purpose.',
  blob: 'stone'
}, {
  name: 'Naomi Baptiste',
  role: 'Hygienist',
  reg: 'GDC 190 773',
  note: 'Gum health and children\'s first visits. Famously gentle.',
  blob: 'stone'
}, {
  name: 'Tom Fairweather',
  role: 'Practice manager',
  reg: '—',
  note: 'Fees, plans and the person who calls you back.',
  blob: 'stone'
}];
function TeamScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.shellWrap,
      paddingTop: 118,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Blob, {
    variant: "leaf",
    size: 96,
    style: {
      position: 'absolute',
      right: 60,
      top: 96
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, null, "Our team"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--type-display-2-size)',
      lineHeight: 'var(--type-display-2-line)',
      letterSpacing: 'var(--type-display-2-track)',
      marginTop: 14,
      maxWidth: 660
    }
  }, "The same faces, visit after visit."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--type-body-lg-size)',
      lineHeight: 1.62,
      color: 'var(--text-muted)',
      marginTop: 18,
      maxWidth: 540
    }
  }, "Four of us, one practice, no rotating locums. You'll see the same clinician every time unless you ask otherwise.")), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 20
    }
  }, TEAM.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    tone: "cream",
    padding: "lg",
    interactive: true,
    style: {
      display: 'flex',
      gap: 22,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Blob, {
    variant: p.blob,
    size: 92
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h2-size)',
      letterSpacing: '-.018em'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, p.role), /*#__PURE__*/React.createElement(Tooltip, {
    label: "General Dental Council registration"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-faint)'
    }
  }, p.reg))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 12,
      maxWidth: '34ch'
    }
  }, p.note))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-faint)',
      marginTop: 16
    }
  }, "Portraits are placeholders \u2014 no photography was supplied with the brand materials.")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 20
    }
  }, [['map-pin', '14 Rowan Street', 'London N1 3QR. Two minutes from Highbury & Islington.'], ['clock', 'Monday to Saturday', '8am–7pm weekdays, 9am–2pm Saturdays.'], ['credit-card', 'Ways to pay', 'Card, plan, or 0% finance over six months.']].map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    tone: "plain",
    padding: "md"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--amber-100)',
      color: 'var(--amber-700)',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h3-size)',
      letterSpacing: '-.012em'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 7
    }
  }, d))))));
}
Object.assign(window, {
  TeamScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TeamScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TreatmentsScreen.jsx
try { (() => {
const {
  Card,
  Tag,
  Badge,
  Button,
  Icon,
  Input
} = window.VerdantDentalDesignSystem_954de0;
const TREATMENTS = [{
  cat: 'Hygiene',
  name: 'Check-up & clean',
  price: '£68',
  time: '45 min',
  desc: 'Full examination, scale and polish, and a written plan you keep.'
}, {
  cat: 'Hygiene',
  name: 'Deep clean (per quadrant)',
  price: '£110',
  time: '40 min',
  desc: 'For gums that bleed or pockets deeper than 4mm.'
}, {
  cat: 'Cosmetic',
  name: 'Home whitening',
  price: '£340',
  time: '2 visits',
  desc: 'Custom trays and two weeks of gentle gel. Done at home, at your pace.'
}, {
  cat: 'Cosmetic',
  name: 'Composite bonding',
  price: 'from £240',
  time: '60 min',
  desc: 'Chips and gaps reshaped in a single appointment.'
}, {
  cat: 'Restorative',
  name: 'White filling',
  price: 'from £145',
  time: '40 min',
  desc: 'Tooth-coloured composite, matched to the shade beside it.'
}, {
  cat: 'Restorative',
  name: 'Crown',
  price: 'from £695',
  time: '2 visits',
  desc: 'Scanned digitally — no impression putty.'
}, {
  cat: 'Alignment',
  name: 'Invisible aligners',
  price: 'from £1,850',
  time: '6–9 months',
  desc: 'Assessment, scan and refinements included.'
}, {
  cat: 'Children',
  name: 'First visit, age 1–5',
  price: 'Free',
  time: '20 min',
  desc: 'A ride in the chair, a count of the teeth, and a sticker.'
}];
function TreatmentsScreen({
  go
}) {
  const [cat, setCat] = React.useState('All');
  const [q, setQ] = React.useState('');
  const cats = ['All', 'Hygiene', 'Cosmetic', 'Restorative', 'Alignment', 'Children'];
  const rows = TREATMENTS.filter(t => (cat === 'All' || t.cat === cat) && t.name.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.shellWrap,
      paddingTop: 118
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Treatments & fees"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--type-display-2-size)',
      lineHeight: 'var(--type-display-2-line)',
      letterSpacing: 'var(--type-display-2-track)',
      marginTop: 14,
      maxWidth: 640
    }
  }, "Every price, written down, before we start."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--type-body-lg-size)',
      lineHeight: 1.62,
      color: 'var(--text-muted)',
      marginTop: 18,
      maxWidth: 560
    }
  }, "These are the fees we quote at reception. If a treatment turns out to need less, you pay less.")), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search treatments",
    value: q,
    onChange: e => setQ(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }),
    style: {
      width: 280
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: cat === c,
    onClick: () => setCat(c)
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 20
    }
  }, rows.map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.name,
    tone: "plain",
    padding: "md",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    style: {
      marginBottom: 12
    }
  }, t.cat), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--type-h3-size)',
      letterSpacing: '-.012em'
    }
  }, t.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 8,
      maxWidth: '40ch'
    }
  }, t.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 19,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-.02em'
    }
  }, t.price), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-faint)',
      marginTop: 3
    }
  }, t.time))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => go('book')
  }, "Book this")))), rows.length === 0 && /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    padding: "lg",
    style: {
      gridColumn: 'span 2',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }
  }, "Nothing matches \u201C", q, "\u201D. Call us on 020 7946 0112 and we'll tell you straight."))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Card, {
    tone: "emerald",
    padding: "lg",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 30,
      letterSpacing: '-.024em'
    }
  }, "Paying monthly"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-muted)',
      fontSize: 15.5,
      lineHeight: 1.65,
      marginTop: 10
    }
  }, "Our practice plan spreads check-ups, hygiene and a 20% treatment discount across the year. \xA321.50 a month, cancel whenever.")), /*#__PURE__*/React.createElement(Button, {
    variant: "glass",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 19
    })
  }, "See the plan"))));
}
Object.assign(window, {
  TreatmentsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TreatmentsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();

})(__ds_window);

const __ns = __ds_window.VerdantDentalDesignSystem_954de0;

const __eksik = ['Badge', 'Button', 'Card', 'Icon', 'IconButton', 'Tag', 'Dialog', 'Toast', 'Tooltip', 'Checkbox', 'Field', 'Input', 'Radio', 'Select', 'Switch', 'NavBar', 'Tabs'].filter((ad) => !__ns[ad]);
if (__eksik.length) {
  throw new Error('Tasarım sisteminden gelmeyen bileşenler: ' + __eksik.join(', '));
}

export const Badge = __ns.Badge;
export const Button = __ns.Button;
export const Card = __ns.Card;
export const Icon = __ns.Icon;
export const IconButton = __ns.IconButton;
export const Tag = __ns.Tag;
export const Dialog = __ns.Dialog;
export const Toast = __ns.Toast;
export const Tooltip = __ns.Tooltip;
export const Checkbox = __ns.Checkbox;
export const Field = __ns.Field;
export const Input = __ns.Input;
export const Radio = __ns.Radio;
export const Select = __ns.Select;
export const Switch = __ns.Switch;
export const NavBar = __ns.NavBar;
export const Tabs = __ns.Tabs;

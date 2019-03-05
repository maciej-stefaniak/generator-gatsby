export const isBrowser = (typeof window !== 'undefined' && window !== null)

export const isNode = !isBrowser

export const w = !isNode ? (window) : {}

export const isIE = () => {
  if (!isNode) {
    if (!w.isIE && !w.IEChecked) {
      const ua = w.navigator.userAgent
      const msie = ua ? ua.indexOf('MSIE ') : null
      if (
        (msie && msie > 0) ||
        !!navigator.userAgent.match(/Trident.*rv:11\./)
      ) {
        w.isIE = true
        document.documentElement.classList.add('is-ie')
      }
      // Treat Mircrosoft Edge like IE so no animations and so on
      if (!w.isIE) {
        w.isIE = !!w.StyleMedia
      }

      w.IEChecked = true
    }
    return w.isIE
  }

  return false
}

export const isRetina = () => {
  let retina = false
  if (!isNode) {
    if (w.isRetina) {
      retina = true
    } else {
      const mediaQuery =
        '(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)'
      if (
        w.devicePixelRatio > 1.25 ||
        (w.matchMedia && w.matchMedia(mediaQuery).matches)
      ) {
        retina = true
        w.isRetina = true
      }
    }
  }
  return retina
}
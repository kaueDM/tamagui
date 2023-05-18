import '@tamagui/core/reset.css'

// import '../lib/wdyr'
import '../app.css'
import '../public/fonts/fonts.css'

import {
  ColorScheme,
  NextThemeProvider,
  useRootTheme,
  useThemeSetting,
} from '@tamagui/next-theme'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { TamaguiProvider } from 'tamagui'

import { LoadInter900 } from '../components/LoadFont'
import config from '../tamagui.config'

Error.stackTraceLimit = Infinity

// for auto mode
// // santa mode
// if (isClient) {
//   const goXmas = setTimeout(() => {
//     setTintFamily('xmas')
//   }, 2500)

// prevent next.js from prefetching stuff
if (typeof navigator !== 'undefined') {
  try {
    // @ts-ignore
    navigator.connection = navigator.connection || {}
    // @ts-ignore
    navigator.connection['saveData'] = true
  } catch {
    // ignore err
  }
}

export default function App(props: AppProps) {
  const [theme, setTheme] = useRootTheme()

  // set up NextThemeProvider above AppContents so it can useThemeSetting

  return (
    <>
      <NextThemeProvider
        onChangeTheme={(next) => {
          setTheme(next as any)
        }}
      >
        <AppContents {...props} theme={theme} setTheme={setTheme} />
      </NextThemeProvider>
    </>
  )
}

function AppContents(
  props: AppProps & {
    theme: ColorScheme
    setTheme: React.Dispatch<React.SetStateAction<ColorScheme>>
  }
) {
  const [theme, setTheme] = useRootTheme()
  const [didInteract, setDidInteract] = useState(false)
  const themeSetting = useThemeSetting()!
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/takeout' && theme !== 'dark') {
      themeSetting.set('dark')
      setTheme('dark')
    }
  }, [router.pathname, theme])

  useEffect(() => {
    const onDown = () => {
      setDidInteract(true)
      unlisten()
    }
    const unlisten = () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onDown)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onDown)
    return unlisten
  }, [])

  return (
    <>
      <script
        key="tamagui-animations-mount"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          // avoid flash of animated things on enter
          __html: `document.documentElement.classList.add('t_unmounted')`,
        }}
      />

      {/* this will lazy load the font for /studio splash page */}
      {didInteract && (
        <>
          <LoadInter900 />
        </>
      )}

      <NextThemeProvider
        onChangeTheme={(next) => {
          setTheme(next as any)
        }}
      >
        <TamaguiProvider
          config={config}
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          <ContentInner {...props} />
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  )
}

function ContentInner({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page)

  return useMemo(() => {
    return getLayout(<Component {...pageProps} />, pageProps)
  }, [pageProps])
}

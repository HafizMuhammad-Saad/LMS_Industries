import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Auth } from '@supabase/auth-ui-react'
import { Link, Navigate } from "react-router";
import {  ThemeSupa } from '@supabase/auth-ui-shared'
import  ToggleButton  from "./ToggleButton";
import MenuIcon from "./MenuIcon";
import styles from './App.module.css'
import { useContext } from "react";
import '../auth.css'

import { Button } from 'react-bootstrap';


const classes = {
  'rgb(202, 37, 37)': styles['container-redshadow'],
  'rgb(65, 163, 35)': styles['container-greenshadow'],
  'rgb(8, 107, 177)': styles['container-blueshadow'],
  'rgb(235, 115, 29)': styles['container-orangeshadow'],
}

const colors = [
  'rgb(202, 37, 37)',
  'rgb(65, 163, 35)',
  'rgb(8, 107, 177)',
  'rgb(235, 115, 29)',
] 

const socialAlignments = ['horizontal', 'vertical'] 

const radii = ['5px', '10px', '20px'] 

const views = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
]

import {AuthContext} from "../context/Context";


export default function AuthSignIn() {
  const myContext = useContext(AuthContext)

  const {user, setUser, session, setSession} = myContext;

//   console.log('session', session)
// console.log('session', session.user.email);
  
  // const [session, setSession] = useState(null)
  const [brandColor, setBrandColor] = useState(colors[0])
  const [borderRadius, setBorderRadius] = useState(radii[0] )
  const [theme, setTheme] = useState('dark')
  const [socialLayout, setSocialLayout] = useState(socialAlignments[1])
  const [view, setView] = useState(views[0])

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)

      if (session?.user) {
        // Optional: check if user already exists before inserting
        const { error } = await supabase
          .from('profiles')
          .insert({
            userId: session.user.id,
            username: session.user.user_metadata?.username || 'anonymous',
            email: session.user.email,
          }, { onConflict: ['userId'] }) // this line prevents duplicate inserts if supported
          
        if (error) console.error('Insert error:', error)
      }
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Sign-out error:', error)
  }
//   async function loginWithGoogle() {
//     try {
//      const { user, session, error } = await supabase.auth.signInWithOAuth({
//          provider: 'google',
//          redirectTo: './dashboard'
//        })
//        if (error) throw error;
 
//        if (user) {
//          alert("Google Sign In Successfully" + user.email)
         
//        }
//     } catch (error) {
//      console.log(error + 'No user found');
     
//     }
//  }

//   async function loginWithGithub() {
//     try {
//       const { user, session, error } = await supabase.auth.signInWithOAuth({
//         provider: 'github',
//         redirectTo: 'http://localhost:3000/login-form.html'
//       })
//       if (error) throw error;
//     }
//    catch (error) {
//     console.log(error + 'No user found');
//   }
// }  
  if (!session) {
    return (
      <div className="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
      <div className="sm:py-18 gap container relative mx-auto grid grid-cols-12 px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20">
        <div className="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6">
          <div className="relative lg:mx-auto lg:max-w-md bg-zinc-900">
            <div className={classes[brandColor]}>
              <div className="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
                <div className="mb-6 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <h1 className="text-scale-1200 text-2xl">
                      LMS Industries
                    </h1>
                  </div>
                  <p className="text-scale-1100 text-auth-widget-test">
                    Sign in today for Get Loan
                  </p>
                </div>
                {view === 'sign_up' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
          />
        )}

                <Auth
                  supabaseClient={supabase}
                  view={view.id}
                  appearance={{
                    theme: ThemeSupa,
                    style: {
                      button: {
                        borderRadius: borderRadius,
                        borderColor: 'rgba(0,0,0,0)',
                      },
                    },
                    variables: {
                      default: {
                        colors: {
                          brand: brandColor,
                          brandAccent: `gray`,
                        },
                      },
                    },
                  }}
                  providers={['apple', 'google', 'github']}
                  socialLayout={socialLayout}
                  theme={theme}
                  redirectTo="http://localhost:5173/dashboard"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-6">
          {/* <div className="!max-w-md">
            <h3 className="text-2xl mb-8">Auth UI React</h3>
            <p className="!mb-0">
              Pre-built auth widgets to get started in minutes.
            </p>
            <p className="text-scale-900 mt-0">
              Customizable authentication UI component with custom themes and
              extensible styles to match your brand and aesthetic
            </p>
            <div className="mb-4 pt-6 flex items-center space-x-2">
              <small>Currently available in Svelte, Solid.js and React</small>
            </div>
          </div> */}

          <div className="grid gap-8 py-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">Brand color</div>
              <div className="flex items-center gap-3">
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[0]}
                  color={colors[0]}
                />
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[1]}
                  color={colors[1]}
                />
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[2]}
                  color={colors[2]}
                />
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[3]}
                  color={colors[3]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">Rounded corners</div>
              <div className="flex items-center gap-3">
                <ToggleButton
                  selected={borderRadius}
                  setSelected={(radius) => {
                    setBorderRadius(radius)
                  }}
                  defaultValue={radii[0]}
                  className="rounded-lg border-b-0 border-l-0"
                />
                <ToggleButton
                  selected={borderRadius}
                  setSelected={(radius) => {
                    setBorderRadius(radius)
                  }}
                  defaultValue={radii[1]}
                  className="rounded-xl border-b-0 border-l-0"
                />
                <ToggleButton
                  selected={borderRadius}
                  setSelected={(radius) => {
                    setBorderRadius(radius)
                  }}
                  defaultValue={radii[2]}
                  className="rounded-2xl border-b-0 border-l-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">
                Social Auth Layout
              </div>
              <div className="flex items-center gap-3">
                <ToggleButton
                  selected={socialLayout}
                  setSelected={(socialLayout) => {
                    setSocialLayout(socialLayout)
                  }}
                  defaultValue={socialAlignments[0]}
                  className="flex items-center justify-center"
                >
                  <MenuIcon className="text-scale-900 dark:text-scale-1100 w-6 rotate-90" />
                </ToggleButton>
                <ToggleButton
                  selected={socialLayout}
                  setSelected={(socialLayout) => {
                    setSocialLayout(socialLayout )
                  }}
                  defaultValue={socialAlignments[1]}
                  className="flex items-center justify-center"
                >
                  <MenuIcon className="text-scale-900 dark:text-scale-1100 w-6" />
                </ToggleButton>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">Component View</div>
              <div className="flex items-center gap-3">
                <div>
                  <div className="relative inline-flex self-center">
                    <select
                      defaultValue={view.id}
                      onChange={(e) => { 
                        const vw = views.filter(v => v.id === e.target.value).pop() ?? view
                        setView(vw)
                      }}
                      className="text-lg rounded border-2 border-blue-700 text-gray-600 pl-5 pr-10 h-12 bg-white hover:border-gray-400 appearance-none"
                    >
                      {views.map((v) => (
                        <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  }

  else {
    return <Navigate to="/dashboard" />
  }

}
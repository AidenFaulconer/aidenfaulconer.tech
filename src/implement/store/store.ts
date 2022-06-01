import React from 'react'
import create, {StateCreator} from 'zustand'
import {persist} from 'zustand/middleware'
import {coreTheme, elementTheme} from './theme'
import depeMerge from '@mui/utils/deepmerge'
import {getActorsSubscription} from '../queries/index'
import {gql, useSubscription} from '@apollo/client'
import deepmerge from '@mui/utils/deepmerge'
import {StoreActions} from '../types/store'
import {
    AppStore,
    Auth,
    Film,
    Guest,
    Light,
    Message,
    Messaging,
    NewActorInput,
    NewGuestInput,
    NewMessageInput,
    Online,
    Role,
    Theme,
    User,
    User2,
    Users,
    Who,
} from '../types/store'

//TODO: add types
// ========================================================================== //
// Extensible App theme configuration
// ========================================================================== //
const MAX_STORE_SAVES = 10
const EMPTY_OBJECT: object = {}
const EMPTY_ARRAY: Array<any> = []
const saveStore = (storeSnapshot: AppStore): void => {
    const storeLog = Array.from(
        localStorage?.getItem('storeLog')?.slice(0, MAX_STORE_SAVES) || EMPTY_ARRAY,
    )
    localStorage.setItem(
        'storeLog',
        JSON.stringify([Array.from(storeSnapshot), ...storeLog]),
    )
}
const loadStore = (): AppStore => {
    const appStore: string = localStorage?.getItem('storeLog')!
    return appStore !== null ? appStore[0] : JSON.parse(appStore[0])
}
const saveOnClose = (storeRef: AppStore): void => {
    window.addEventListener('close', (e: Event) => {
        saveStore(storeRef)
    })
}
export const clearStore = () => {
    localStorage.removeItem('storeLog')
}

//TODO: add ts-doc
//TODO: use immer produce to reduce new state https://github.com/pmndrs/zustand
export const useStore = create(
    // persist((set, get) => {
    (set) => {
        if (process.env.NODE_ENV !== 'production') {
            clearStore()
        }
        //TODO: have these actions availible through the store
        const actions: StoreActions = {
            //for input states, inputs are at the top level, to hold new data, use this to modify those inputs state
            changeFormData: function (source: string, input: any): void {
                        console.log(source,input)

                set((state: AppStore) => ({
                    ...state,
                    [source]: {
                        ...state[source],
                        ...input,
                    },
                }))
            },
            //for modifying non input states
            setAppContext: function <AppStore>(newAppContext: AppStore): void {
                set({ newAppContext })
            },
            setLight: function <Light>(newLight: Light): void {
                return set((state: AppStore) => {
                    return ({
                        ...state,
                        light: { ...newLight },
                    })
                })
            },
            toggleTheme: function (): void {
                set((state: AppStore) => ({
                    ...state,
                    theme: {
                        ...state.theme,
                        mode: state.theme.mode === 'light' ? 'dark' : 'light',
                    },
                }))
            },
            setTheme: function <Theme>(newTheme: Theme): void {
                return set((state: AppStore) => ({
                    ...state,
                    theme: newTheme,
                }))
            },
            setGuest: async function <Guest>(newGuest: Guest): Promise<void> {
                set((state: AppStore) => ({
                    ...state,
                    users: {
                        ...state.users,
                        guest: newGuest,
                    },
                }))
            },
            setActors: async function <NewActorInput>(moreActors: NewActorInput[]): Promise<void> {
                set((state: AppStore) => ({
                    ...state,
                    users: {
                        ...state.users,
                        actors: deepmerge(moreActors, state.users.actors),
                    },
                }))
            },
            setOnline: async function <NewGuestInput>(data: NewGuestInput): Promise<void> {
                set((state: AppStore) => ({
                    ...state,
                    messaging: {
                        ...state.messaging,
                        online: {
                            ...state.messaging.online,
                            who: Array.from([...state.messaging.online.who, data]),
                        },
                    },
                }))
            },
            setMessages: async function <NewMessageInput>(newMessage: NewMessageInput): Promise<void> {
                set((state: AppStore) => ({
                    ...state,
                    messaging: {
                        ...state.messaging,
                        messages: [
                            ...state.messaging.messages,
                            ...Array.from([...state.messaging.messages, newMessage]),
                        ],
                    },
                }))
            },
            getAuthToken: function (): string | null {
                return localStorage.getItem('token')
            },
        }
        //this is out model of all our apps high level business logic
        return {
            saveStore,
            actions: actions,

            isMobile: false,
            isTablet: false,
            isDesktop: false,
            isLargeDesktop: false,

            width: window.innerWidth,
            height: window.innerHeight,

            light: {
                brightness: 0,
                x: 0,
                y: 0,
                z: 0,
            },

            theme: {
                element: elementTheme,
                core: coreTheme,
                mode: 'light',
            },

            //users business logic
            users: {
                guest: {
                    id: null,
                    name: '',
                    email: '',
                    avatar: '',
                    isLoading: false,
                    isLoggedIn: false,
                    isLoggedOut: false,
                },
                newGuestInput: {
                    id: null,
                    name: '',
                    email: '',
                    avatar: '',
                },

                actors: [
                    {
                        loading: true,
                        error: false,

                        id: null,
                        firstname: '',
                        middlename: '',
                        lastname: '',
                        films: [
                            {
                                id: null,
                                title: '',
                                updated_at: null,
                                created_at: Date.now(),
                            },
                        ],
                        roles: [
                            {
                                id: null,
                                title: '',
                                updated_at: null,
                                created_at: Date.now(),
                            },
                        ],
                    },
                ],
            },
            //hold input for generic user actions **generic to user**
            userInput: {
                loading: true,
                error: false,

                fullname: 'enter full name',
                id: null,
                firstname: '',
                middlename: '',
                lastname: '',
                films: [
                    {
                        id: null,
                        title: '',
                        updated_at: null,
                        created_at: Date.now(),
                    },
                ],
                roles: [
                    {
                        id: null,
                        title: '',
                        updated_at: null,
                        created_at: Date.now(),
                    },
                ],
            },

            //messaging business logic
            messaging: {
                isLoading: false,

                online: {
                    loading: true,
                    error: false,
                    who: [
                        {
                            id: null,
                            name: '',
                            avatar: null,
                        },
                    ],
                },

                messages: [
                    {
                        body: 'Hello. 👋',
                        user: {
                            avatar: '🤖',
                            name: 'Bot',
                        },
                        timestamp: Date.now(),
                    },
                ],
            },
            //message input **generic to messaging**
            messagingInput: {
                body: 'Hello. 👋',
                user: {
                    avatar: '🤖',
                    name: 'Bot',
                },
                timestamp: Date.now(),
            },

            //authentication
            auth: {
                isLoading: false,
                isLoggedIn: false,
                isLoggedOut: false,
                isLoggedInAdmin: false,
                token: null,
                user: null,
                error: null,
            },

            //testForm 
            testForm: {
                someInput: '',
            }
        }
    },
    // ),
)

export const useTheme = () => {
    const theme = useStore((state: any) => state.theme)
    return theme
}

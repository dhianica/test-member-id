declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NODE_ENV: string
        readonly HOST: string
        readonly PORT: string
        
        readonly NEXT_PUBLIC_HOST: string
        readonly NEXT_PUBLIC_PORT: string
    }
}
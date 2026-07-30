import type { ServerFunctionClient } from 'payload'
import type { SanitizedConfig } from 'payload'
import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { importMap } from '../importMap'
import React from 'react'

// Server action that proxies all Payload admin server function calls
const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: config as unknown as SanitizedConfig,
    importMap,
  })
}

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) =>
  RootLayout({
    config: import('@payload-config') as unknown as Promise<SanitizedConfig>,
    importMap,
    serverFunction,
    children,
  })

export default Layout

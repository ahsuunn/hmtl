import type { ServerFunctionClient } from 'payload'
import configPromise from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './importMap'
import React from 'react'
import '@payloadcms/next/css'

// Server action that proxies all Payload admin server function calls
const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) =>
  RootLayout({
    config: configPromise,
    importMap,
    serverFunction,
    children,
  })

export default Layout

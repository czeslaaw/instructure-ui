/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import fs from 'fs'
import path from 'path'
import readPkgUp, { NormalizedReadResult, NormalizeOptions } from 'read-pkg-up'
//@ts-expect-error: no type declarations for this package
import { Package } from '@lerna/package'

type Options = Partial<NormalizeOptions>

function getPackage(options?: Options) {
  const result = readPackage(options)

  return new Package(result.packageJson, path.dirname(result.path))
}

function getPackageJSON(options?: Options): readPkgUp.PackageJson {
  const pkg = readPackage(options).packageJson

  return pkg
}

function getPackagePath(options: Options) {
  const packageJson = readPackage(options)

  return packageJson.path
}

type PackageJson = {
  pkg?: readPkgUp.PackageJson
} & NormalizedReadResult

function readPackage(options?: Options): PackageJson {
  // eslint-disable-next-line no-param-reassign
  const opts = {
    cwd: process.cwd(),
    normalize: false,
    ...options
  }

  const pkg = readPkgUp.sync({
    cwd: fs.realpathSync(opts.cwd),
    normalize: opts.normalize
  }) as PackageJson

  // for backwards compat:
  pkg.pkg = pkg?.packageJson

  return pkg
}

export { readPackage, getPackage, getPackageJSON, getPackagePath }
export type { PackageJson, Options }

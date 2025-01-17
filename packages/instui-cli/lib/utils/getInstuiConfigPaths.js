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

const path = require('path')
const fs = require('fs')
const semver = require('semver')

const parseMajorVersion = ({ version }) => {
  const semanticVersion = semver.coerce(version)
  return semanticVersion ? semanticVersion.major : version
}

/**
 * Reads every config file with the given name inside the given folder up
 * to the given version. e.g. getInstuiConfigPaths("a.json", "b", "v7")
 * returns "b/v5/a.json, b/v6/a.json, b/v7/a.json"
 * @param name the filename to find e.g. propNames.config.json
 * @param type the directory inside intstui-config to look e.g. codemod-configs
 * @param version optional only return config files up to this version
 * @return {*[]} an array of file paths
 */
module.exports = ({ name, type, version } = {}) => {
  const root = path.resolve(
    path.dirname(require.resolve('@instructure/instui-config/package.json')),
    type
  )

  const paths = []
  fs.readdirSync(root).forEach((dirName) => {
    if (
      !version ||
      parseMajorVersion({ version: dirName }) <= parseMajorVersion({ version })
    ) {
      const filePath = path.join(root, dirName, name)
      if (fs.existsSync(filePath)) {
        paths.push(filePath)
      }
    }
  })

  return paths
}

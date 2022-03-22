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

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { canvas } from '@instructure/ui-themes'
import { InstUISettingsProvider } from '@instructure/emotion'
import { Drilldown } from '@instructure/ui-drilldown'
import '../globals'

const DrillDownExample = () => {
  const ref = React.useRef()

  React.useEffect(() => {
    if (ref.current) {
      console.log(ref.current)
      console.log(ref.current.displayName)
    }
  }, [])
  const data = Array(5)
    .fill(0)
    .map((_v, ind) => ({
      label: `option ${ind}`,
      id: `opt_${ind}`
    }))

  const renderOptions = (page = '') => {
    return data.map((option) => (
      <Drilldown.Option id={option.id} key={option.id}>
        {option.label} {page ? ` - ${page}` : null}
      </Drilldown.Option>
    ))
  }
  return (
    <Drilldown rootPageId="page0">
      <Drilldown.Page id="page0" renderTitle={'Page 0'}>
        <Drilldown.Option id="opt0" subPageId="page1">
          To Page 1
        </Drilldown.Option>
      </Drilldown.Page>
      <Drilldown.Page id="page1" renderTitle={'Page 1'}>
        <Drilldown.Option id="opt5" subPageId="page2">
          To Page 2
        </Drilldown.Option>
        {renderOptions()}
      </Drilldown.Page>
      <Drilldown.Page id="page2" renderTitle="Page 2">
        {renderOptions('page 2')}
      </Drilldown.Page>
    </Drilldown>
  )
}

ReactDOM.render(
  <InstUISettingsProvider theme={canvas}>
    {/* <App /> */}
    <DrillDownExample></DrillDownExample>
  </InstUISettingsProvider>,
  document.getElementById('app')
)

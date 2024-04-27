import React, { useState } from 'react'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

import './home.css'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

const Home = (): React.ReactNode => {
  const [markdown, setMarkdown] = useState<string>(
    '# Marked in the browser\n\nRendered by **marked**.'
  )

  // const divRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  //   if (divRef.current) {
  //     // 将光标设置到最后
  //     const range = document.createRange()
  //     range.selectNodeContents(divRef.current)
  //     range.collapse(false)
  //     const selection = window.getSelection()
  //     selection?.removeAllRanges()
  //     selection?.addRange(range)
  //   }
  // }, [markdown])

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMarkdown(e.target.value)
  }

  return (
    <div className="hoem-wrapper">
      <div></div>
      <div>
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          style={{ width: '100%', height: '98vh', border: 'none' }}
        />
        {/* <div
          contentEditable
          ref={divRef}
          style={{ border: '1px solid #ccc', padding: '5px' }}
          onInput={handleMarkdownChange}
        >
          {markdown}
        </div> */}
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />
    </div>
  )
}

export default Home

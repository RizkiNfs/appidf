import type { JSONContent } from '@tiptap/vue-3'
import { Document, Image, Link, Page, Text, pdf } from '@react-pdf/renderer'
import { createElement as h } from 'react'

export function blobToBase64(blob: Blob): Promise<string>

export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

type Renderer = Record<string, (node: JSONContent) => any>
export const renderer: Renderer = {
  paragraph: (node: JSONContent) => {
    return h(Text, { style: { lineHeight: 1.5 } }, node?.content?.map(n => renderer.text?.(n)))
  },
  image: (node: JSONContent) => {
    return h(Image, { src: node.attrs?.src })
  },
  text: (node: JSONContent) => {
    const linkMark = node.marks?.find(mark => mark.type === 'link')
    if (linkMark) {
      return h(Link, { style: { textDecoration: 'underline' }, src: linkMark.attrs?.href }, node.text)
    }
    return h(Text, {}, node.text)
  },
}

export function createDocument(content: JSONContent) {
  return h(Document, {}, [
    h(Page, { key: 'page-1', size: 'A4' }, content?.content
      ?.map((node) => {
        if (node.type)
          return renderer[node.type]?.(node)
        return null
      })),
  ])
}

export async function renderDocToString(content: JSONContent) {
  const Doc = createDocument(content)

  const blob = await pdf(Doc).toBlob()

  return blobToBase64(blob)
}

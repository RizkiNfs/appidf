import { type JSONContent, useEditor } from '@tiptap/vue-3'
import Doc from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'

interface Props {
  content?: JSONContent
}

export function useDocEditor({ content }: Props) {
  const editor = useEditor({
    content,
    extensions: [
      Doc,
      Paragraph,
      Text,
      Bold,
      Strike,
      Highlight,
      Image,
      Dropcursor,
      Gapcursor,
      ListItem,
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-4',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-4',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Heading.configure({
        levels: [2, 3],
      }),
      History.configure({
        depth: 25,
        newGroupDelay: 1000,
      }),
    ],
  })

  return { editor }
}

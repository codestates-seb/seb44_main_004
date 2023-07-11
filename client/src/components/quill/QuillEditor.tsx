import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { MutableRefObject, memo, useMemo } from 'react';

type QuillEditorProps = {
  quillRef: MutableRefObject<unknown>;
  contentValue: string;
  setContentValue: (content: string) => void;
};

const QuillEditor = memo(({ quillRef, contentValue, setContentValue }: QuillEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
          ["image"],
        ],
      },
    }),
    []
  );

  return (
    <ReactQuill
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element.getEditor();
        }
      }}
      value={contentValue}
      onChange={setContentValue}
      modules={modules}
      theme= "bubble"
      placeholder="큐레이션의 내용을 입력해 주세요"
      style={{
        fontWeight: "100",
        marginBottom: '0.3rem',
        backgroundColor: '#f8f7f7',
        border: 'none',
        borderRadius: '0.3rem',
        height: '18.75rem',
      }}
    />
  );
});

export default QuillEditor;

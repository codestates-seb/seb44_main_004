import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { MutableRefObject, memo, useMemo } from 'react';

type QuillEditorProps = {
  quillRef: MutableRefObject<unknown>;
  curationContent: string;
  setcurationContent: (content: string) => void;
};

const QuillEditor = memo(({ quillRef, curationContent, setcurationContent }: QuillEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          ['code-block'],
          ['link', 'image'],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
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
      value={curationContent}
      onChange={setcurationContent}
      modules={modules}
      theme= "bubble"
      placeholder="큐레이션의 내용을 입력해 주세요"
      style={{
        marginBottom: '0.3rem',
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '0.3rem',
        height: '100px',
      }}
    />
  );
});

export default QuillEditor;

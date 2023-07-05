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
          [{ header: [1, 2, false] }],
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
      value={curationContent}
      onChange={setcurationContent}
      modules={modules}
      theme= "bubble"
      placeholder="큐레이션의 내용을 입력해 주세요"
      style={{
        marginBottom: '0.3rem',
        backgroundColor: '#f8f7f7',
        border: 'none',
        borderRadius: '0.3rem',
        height: '200px',
      }}
    />
  );
});

export default QuillEditor;
